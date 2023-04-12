/*

AngularJS Controllers for Debt Payment Calculator

*/

app.controller('debtPaymentCalculatorController', ['Page', '$scope', '$filter', '$http', function(Page, $scope, $filter, $http) {

    // Show the loader animation
    

    Page.setTitle("Credit Card Debt Payment Calculator");
    

    $scope.numAccounts      = 0;
    $scope.monthlyPayment   = null;
    $scope.accounts         = [];
    $scope.payment          = 0;
    $scope.timeToZeroDebt   = "";
    $scope.amountSaved      = 0;
    $scope.timeSaved        = 0;
    $scope.totalPayments    = 0;
    $scope.totalInterest    = 0;
    $scope.dateZeroDebt     = "";
    $scope.startingMessage  = "Add an account and enter a monthly payment to get started.";


    $scope.loadMessage = function(message) {

        if (message == null) {
            message = $scope.startingMessage;
        }

        $scope.message = message;
    }

    $scope.loadMessage();

    $scope.inputDecimal = function(event, position) {

        keyCode = event.which;
        
        if (keyCode >= 96 && keyCode <= 105) {
            // Numpad keys
            keyCode -= 48;
        }

        var number,
            input = String.fromCharCode(keyCode),

            controlKeys = [8,9,37,38,39,40]; //tab

        if (input.match(/[0-9]/)) {

            //remove decimal and commas and append input, calculate position
            number = event.target.value.replace(/[.,$]/g, "") + input;
            number = number.replace(/^[0]+/g, "");
            number = $scope.padNumber(number, position + 1);

            if (event.target.hasAttribute('maxlength') && number.length > event.target.maxLength) {
                number = number.slice(1);
            }

            position = number.length - position;

            // re-add decimal
            number = [number.slice(0, position), ".", number.slice(position)].join('');

            number = $filter('currency')(parseFloat(number),'');

            // change value of input field
            event.target.value = number;
            event.preventDefault();

        } else if (controlKeys.indexOf(keyCode) < 0) {
            // Don't enter any value
            event.preventDefault();
        }
    }

    $scope.padNumber = function(num, length) {

        while (num.length < length) {
            num = "0" + num;
        }

        return num;
    }

    $scope.stringToFloat = function(str) {
        return parseFloat(str.replace(',', ''));
    }


    $scope.calculate = function(event) {

        $scope.monthlyPayment   = $scope.stringToFloat($('input[name="monthlyPayment"]').val());
        $scope.totalPayments    = 0;
        $scope.totalInterest    = 0;
        $scope.updateContent();

    };

    $scope.addAccount = function(event) {

        var account = {
            name    : $('input[name="accountName"]').val(),
            balance : $scope.stringToFloat($('input[name="accountBalance"]').val()),
            apr     : $scope.stringToFloat($('input[name="accountApr"]').val()) * 100
        };

        $scope.accounts.push(account);

        $('.no-accounts').hide();
        $('#addAccountModal').modal('hide');

    };

    $scope.updateContent = function() {

        // Hide the loader animation
      
        $('.summary').hide();
        $('.monthly-payments').hide();

        if ($scope.accounts.length == 0 && $scope.monthlyPayment != null) {

            $scope.loadMessage("Add an account to calculate your plan.");

        } else if ($scope.accounts.length > 0){

            if ($scope.monthlyPayment === null) {

                $scope.loadMessage("Enter a monthly payment to calculate your plan.");

            } else {

                var monthlyPayments = $scope.generateMonthlyPayments();

                if (monthlyPayments === false) return false;

                // Update Summary info
                $scope.updateSummaryInfo(monthlyPayments);

                // Update Payments table
                //$scope.updatePaymentsTable(monthlyPayments);

                $scope.loadMessage("Check out your payment plan below.");
                $('.summary').show();
                $('.monthly-payments').show();

            }

        }
    }

    $scope.generateMonthlyPayments = function() {

        var totalDebt           = $scope.getTotalDebt(),
            // months               = [undefined, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            months              = [undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            monthlyPayments     = [],
            date                = new Date(),
            currentMonth        = date.getMonth() + 1,
            currentYear         = date.getFullYear(),
            totalBalances       = 0,
            accountsByPriority  = [],
            topApr;

        

        // Set totalBalances and accountsByPriority
        for (var i = 0; i < $scope.accounts.length; i++) {

            totalBalances += parseFloat($scope.accounts[i].balance);

            if (i == 0) {
                accountsByPriority.push(i);
            } else {

                for (var j = 0; j < accountsByPriority.length; j++) {
                    if (parseFloat($scope.accounts[i].apr) > parseFloat($scope.accounts[accountsByPriority[j]].apr)) {
                        // Add before, this item has a higher priority
                        accountsByPriority.splice(j, 0, i);
                        break;
                    } else if (j == accountsByPriority.length - 1) {
                        // Add to the end (there is nothing left to compare to)
                        accountsByPriority.push(i);
                        break;
                    }
                }
            }

        }

        var firstRun = true;

        

        // Calculate account balance, interest, and payment each month until total debt is zero
        while (totalBalances > 0) {

            var availableFunds      = $scope.monthlyPayment;
            var accountDetails      = [];
            var newTotalBalances    = 0;
            var totalPayments       = 0;
            var totalInterest       = 0;

            // Calculate interest and get minimum payment for each account

            for (var i = 0; i < $scope.accounts.length; i++) {

                var apr         = parseFloat($scope.accounts[i].apr),
                    interest,
                    balance,
                    minPayment;

                // Use account balances provided by the userfor the first run,
                // then calculate new balances for the following months
                if (firstRun) {
                    balance     = parseFloat($scope.accounts[i].balance);
                    interest    = balance * (apr / 100 / 12);
                } else {
                    prevBalance = monthlyPayments[monthlyPayments.length-1].accounts[i].balance;
                    prevPayment = monthlyPayments[monthlyPayments.length-1].accounts[i].payment;
                    interest    = (prevBalance - prevPayment) * (apr / 100 / 12);
                    balance     = prevBalance - prevPayment + interest;
                }

                totalInterest += interest;
                $scope.totalInterest += interest;

                newTotalBalances += balance;

                minPayment = $scope.calculateMinimumPayment(interest, balance);

                accountDetails[i] = {
                    'balance'       : balance,
                    'interest'      : interest,
                    'minPayment'    : minPayment,
                    'payment'       : minPayment
                };

                availableFunds -= minPayment;
            }

            // Check to see if there are sufficient funds from the monthly payment to cover all min payments

            if (availableFunds < 0) {
                
                var min = Math.abs(availableFunds) + $scope.monthlyPayment;
                
                $scope.loadMessage("You need to pay at least $" + Math.ceil(min) + " each month to avoid any late fees. Please enter another amount.");
                return false;
            }

            // Begin allocating funds from highest to lowest priority account

            for (var i = 0; i < accountsByPriority.length; i++) {
                var accountId   = accountsByPriority[i];
                var minPayment  = accountDetails[accountId].minPayment;
                var balance     = accountDetails[accountId].balance;
                var payment     = availableFunds + minPayment;

                // Don't pay more than the balance
                if (payment > balance) {
                    payment = balance;
                }

                // Reduce the available funds
                availableFunds -= payment - minPayment;

                // Set the payment and adjust the balance
                // Payment will remain minimum if no additional funds are available
                accountDetails[accountId].payment = payment;
                totalPayments += payment;
                $scope.totalPayments += payment;
                //accountDetails[accountId].balance = balance - payment;

            }

            totalBalances = newTotalBalances;

            var stats = {
                balances : totalBalances,
                interest : totalInterest,
                payments : totalPayments,
            }

            var dateString = months[currentMonth] + " " + currentYear;
            var data = {'date' : dateString, 'accounts' : accountDetails, 'stats' : stats};

            //

            monthlyPayments.push(data);

            // Increment by one month
            if (currentMonth == 12) {
                currentMonth = 1;
                currentYear++;
            } else {
                currentMonth++;
            }

            firstRun = false;
        }

        
        return monthlyPayments;
    }

    $scope.calculateMinimumPayment = function(interest, balance) {
        var minPayment = (interest * 2 < 15) ? 15 : interest * 2;

        if (minPayment >= balance) {
            return balance;
        } else {
            return minPayment;
        }
    }

    $scope.getTotalDebt = function() {
        var totalDebt = 0;

        for (var i = 0; i < $scope.accounts.length; i++) {
            totalDebt += parseFloat($scope.accounts[i].balance);
        }

        return totalDebt;

    }

    $scope.updateSummaryInfo = function(monthlyPayments) {

        var numYears = Math.floor(monthlyPayments.length/12);
        var numMonths = monthlyPayments.length%12;

        $scope.dateZeroDebt = monthlyPayments.slice(-1)[0].date;

        if (numYears) {
            $scope.timeToZeroDebt = numYears == 1 ? numYears + " year" : numYears + " years";
            $scope.timeToZeroDebt += numMonths ? " and " + numMonths + " month" : '';
            $scope.timeToZeroDebt += numMonths <= 1 ? '' : 's';
        } else {
            $scope.timeToZeroDebt = numMonths + " months";
        }

    }

    $scope.updatePaymentsTable = function(monthlyPayments) {

        // Get table and clear contents
        var table = $('.payments-table');
        table.empty();

        // Add headers and data to table

        // Create first header row
        var row1 = $("<tr></tr>");

        row1.append('<th rowspan="2">Month</th>');

        // Add one cell for each account
        for (var j = 0; j < $scope.accounts.length; j++) {

            row1.append('<th colspan="3">' + $scope.accounts[j].name + '</th>');

        }

        row1.append('<th colspan="3">Monthly Statistics</th>');

        table.append(row1);

        // Create second header row
        var row2 = $("<tr></tr>");

        // Add 3 header cells for each account
        for (var j = 0; j < $scope.accounts.length; j++) {

            row2.append('<th>Balance</th>');
            row2.append('<th>Interest</th>');
            row2.append('<th>Payment</th>');

        }

        // Add 3 header cells for stats
        row2.append('<th>Total Balances</th>');
        row2.append('<th>Total Interest</th>');
        row2.append('<th>Total Payments</th>');

        table.append(row2);

        // Begin adding data rows
        for (var j = 0; j < monthlyPayments.length; j++) {
            var data        = monthlyPayments[j];
            var dataRow     = $("<tr></tr>");
            var dollarSign  = '<i class="fa fa-usd" aria-hidden="true"></i>';
            var downArrow   = '<i class="fa fa-arrow-down" aria-hidden="true"></i>';
            var upArrow     = '<i class="fa fa-arrow-up" aria-hidden="true"></i>';

            // Add Month and Year
            dataRow.append("<td>" + data.date + "</td>");

            // Add 3 cells for each account
            for (var a = 0; a < data.accounts.length; a++) {
                dataRow.append("<td>" + dollarSign + " " + data.accounts[a].balance.toFixed(2) + "</td>");
                dataRow.append("<td>" + data.accounts[a].interest.toFixed(2) + " " + upArrow + "</td>");
                dataRow.append("<td>" + data.accounts[a].payment.toFixed(2) + " " + downArrow + "</td>");
            }

            // Add 3 cells for stats
            dataRow.append("<td>" + data.stats.balances.toFixed(2) + "</td>");
            dataRow.append("<td>" + data.stats.interest.toFixed(2) + "</td>");
            dataRow.append("<td>" + data.stats.payments.toFixed(2) + "</td>");

            table.append(dataRow);
        }
    }

    $scope.updateContent();
    
    
    // Function to show/hide the loader animation
    function toggle_loader()
    {
        // Check if loader is hidden or not
        if($('.la-anim-10').is(':hidden'))
        {
            // Show the loader
            $('body').css('pointer-events','none');                                         
            $('body').css('opacity','0.5');                                         
            $('.la-anim-10').show();
        }
        else
        {
            // Hide the loader
            $('body').css('pointer-events','auto');                                         
            $('body').css('opacity','1');                                       
            $('.la-anim-10').hide();
        }
    }

}]);
