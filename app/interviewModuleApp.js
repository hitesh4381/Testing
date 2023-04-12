//client interview verification controller all functionality interview here............//
var appinterview =  angular.module('angularAppinterview',['ngRoute','ngSanitize','ngStorage','720kb.datepicker','ui.bootstrap','ui.utils']);

appinterview.config(['$routeProvider',
    function($routeProvider,$sceDelegateProvider) { 
        $routeProvider.
            when('/', {
                templateUrl: 'templates/interview/interview_step_agreement.html',
                controller: 'interviewControllerAgreement'
            }).
            when('/step1', {
                templateUrl: 'templates/interview/interview_step_agreement.html',
                controller: 'interviewControllerAgreement'
            }).
           when('/step2', {
                templateUrl: 'templates/interview/interview_step_personalinfo.html',
                controller: 'interviewControllerPersonalInfo'
            }).
            when('/step3', {
                templateUrl: 'templates/interview/interview_step_address.html',
                controller: 'interviewControllerAddress'
            }).
                    
            when('/step4', {
                templateUrl: 'templates/interview/interview_step_tuauthentication.html',
                controller: 'interviewControllerTUAuthentication'
            }).        
            when('/step5', {
                templateUrl: 'templates/interview/interview_step_allItems.html',                
                controller: 'interviewControllerAllItem'
            }).  
            // when('/step6', {
            //     templateUrl: 'templates/interview/interview_adverse.html',                
            //     controller: 'interviewControllerAdverse'
            // }).        
              
             when('/interview_successfull/', {
                templateUrl: 'templates/interview/interview_success.html',
                controller: 'interviewControllerSuccess'
            }).
             when('/reassign', {
                templateUrl: 'templates/interview/interview_step_reagreement.html',
                controller: 'interviewControllerReAgreement'
            }).
            when('/logout', {
                templateUrl: 'templates/interview/logout.html',
                controller: 'logoutController'
            }).
            otherwise({
                    redirectTo: '/'
                 });
          
}])

//for Phone Number
appinterview.directive('formatPhone', function() {
            return {
                require: 'ngModel',
                restrict: 'EA',
                link: function(scope, elem, attrs, ctrl, ngModel) {
                         elem.add(phone_work).on('keyup', function(e) {
                      var  origVal = elem.val().replace(/\D/g,'');
//                         var origVal = elem.val().replace(/[^\w\s]/gi, '');
                  if(origVal==''){
                       ctrl.$setViewValue('');
                       ctrl.$render();
                       e.preventDefault();
                       scope.$apply();
                 }
                  else  if(origVal.length === 10) {
                       var str = origVal.replace(/(.{3})/g,"$1-");
                       var phone = str.slice(0, -2) + str.slice(-1);
                       ctrl.$setViewValue(phone);
                       ctrl.$render();
                       e.preventDefault();
                       scope.$apply();
                    }
                        });
                    }
                }
});

/* Prevent the more than five character on zip code in step2 */
appinterview.directive("limitTo", [function() {
    return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var limit = parseInt(attrs.limitTo);
            angular.element(elem).on("keypress", function(e) {
                if (this.value.length == limit) e.preventDefault();
            });
        }
    }
}]);

appinterview.directive('dateofbirthInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                value = $filter('dob')(value, false);
                $element.val(value);
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                var val = viewValue.replace(/[^0-9]/g, '').slice(0,10);
                return val;
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                var val = $filter('dob')(ngModelCtrl.$viewValue, false);
                $element.val(val);
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || key == 8 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    // if(key == 8){
                    //    var back = $element.val().replace(/\//g, '');
                    //    $element.val(back);
                    // }
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});

appinterview.filter('dob', function () {
    return function (tel) {

        if (!tel) { return ''; }

        var value = tel.trim();

        //if (value.match(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/g)) {
            var mm = value.slice(0,2);
                dd = value.slice(2,4);
                yy = value.slice(4,8);

        if(value.length <= 2){
            return mm;
        }

        if(value.length >= 3 && value.length < 5 ){
            return mm+'/'+dd;
        }

        if(value.length >= 5){
            return mm+'/'+dd+'/'+yy;
        }
        
    };
});

appinterview.directive('allowedcharsInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('allowedch')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('allowedch')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || key == 8 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
});

appinterview.filter('allowedch', function () {
    return function (tel) {

        if (!tel) { 
            return ''; 
        }
        
        var value = tel.trim();
        if(value.length <=9){
            return value;
        } else {
            return value.slice(0,9);
        }
        
    };
});


appinterview.run(function($rootScope, $localStorage, $window, $http, $sce) {
	//alert('RUN');
    var client_id = clientid;
    $http.post('ClientsController/get_client_data', client_id).success(function(data) {
        // Call Appcues.identify()
        $rootScope.phone_mobile = data.phone_mobile;
        if(data.adminStatus == false)
        {
    	    var statusData='';
            if(data.status_id == '3')
            {
                    statusData = 'Active';
            }else if(data.status_id == '7')
            {
                statusData = 'Past_Due';
            }else if(data.status_id == '8'){
                statusData = 'Canceled';
            }else if(data.status_id == '9'){
                statusData = 'ON_HOLD';
            }
            else
            {
                statusData = '';
            }
            //For ID Monitoring status update
            var idp_monitoring_status = false;
            if(data.id_monitoring_status=='true'){
                idp_monitoring_status = true;
            }            
            if(data.segmantationStatus == 1)
            {
                var AppcuesData = {
                    name: data.first_name + ' ' +data.last_name,
                    email: data.email,
                    created_at: (new Date()).getTime() / 100,
                    status: statusData,
                    billing_status_id : data.billing_status_id,
                    admin : data.adminStatus,
                    Credit_Score : data.creditscore,
                    number_of_creditcard_accounts : data.credit_card_accounts,
                    Revolving_Credit_Card_Balance : data.credit_card_account_balance,
                    number_of_auto_accounts : data.auto_loan_accounts,
                    number_of_mortgage_accounts : data.mortgage_accounts,
                    Number_of_Taxlien_with_Balance_Accounts__c : data.tax_lien_with_balance,
                    number_of_studentloan_accounts__c : data.student_loan_accounts,
                    Starting_Credit_Score : data.Starting_Credit_Score,
                    ID_Doc_Uploaded : data.ID_Doc_Uploaded,
                    TU_Authenticated : data.TU_Authenticated,
                    Last_Logged_In : data.Last_Logged_In,
                    Enrolled_HuttonChase : data.huttonchaseflag,
                    Enrolled_HuttonChase_Date : data.huttonchasedate,
                    HuttonChase_Not_Activated : data.ht_current_enroll_status,
                    ID_Monitoring: idp_monitoring_status,
                    onlineReference:data.onlineReference
                }; 


            }
            else
            {
                var AppcuesData = {
                    name: data.first_name + ' ' +data.last_name,
                    email: data.email,
                    created_at: (new Date()).getTime() / 100,
                    status: statusData,
                    billing_status_id : data.billing_status_id,
                    admin : data.adminStatus,
                    Enrolled_HuttonChase : data.huttonchaseflag,
                    Enrolled_HuttonChase_Date : data.huttonchasedate,
                    HuttonChase_Not_Activated : data.ht_current_enroll_status,
                    ID_Monitoring: idp_monitoring_status,
                    onlineReference:data.onlineReference
                };
            }
            
            // for(var i in AppcuesData){
            //   AppcuesData[i] = parseInt(AppcuesData[i]);
            // }
            // const obj = Object.entries(AppcuesData)
            //      .reduce((r, v) => (r[v[0]] = +v[1], r), {});
            console.log('Run Console');
            console.log(AppcuesData);
            // Appcues.identify(data.id, {
            //     AppcuesData
            //     // Additional user properties.
            // }); 
            
            // $window.Appcues.start();
        }
    });  


    $http.post('ClientsController/getBrandTitle').success(function(data) {
        $rootScope.metaTitle = $sce.trustAsHtml(data.company_title)+' - Interview Section';
        $rootScope.pageTitle = $sce.trustAsHtml(data.company_title);
        $rootScope.footerCopyright = $sce.trustAsHtml(data.company_footer_title);
    });  
    $rootScope.showLoader = function(progressPercent, msg) {

        // Show the loader
        $rootScope.loader = true;
        $rootScope.loader_progress = progressPercent;

        // Show the message
        if(msg !== undefined && msg !== '')
        {
            // Replace the first name in the message
            msg = msg.replace('{{first_name}}', $localStorage.first_name);
            $rootScope.show_loader_msg = true;
            $rootScope.loader_msg = msg;
        }
        else
        {
            $rootScope.show_loader_msg = false;
        }
    };
	
	$rootScope.hideLoader = function(progressPercent, msg) {
        $rootScope.loader = false;
        $rootScope.show_loader_msg = false;
    };
});


//new custom services for Appcues
appinterview.service('Appcues', function($rootScope,$http,$window){
    var client_id = clientid;
    var statusData='';
    $rootScope.$on('$routeChangeSuccess', function() {
        $http.post('ClientsController/get_client_data', client_id).success(function(data) {
            // Call Appcues.identify()
            if(data.adminStatus == false)
            {
                var statusData='';
                if(data.status_id == '3')
                {
                        statusData = 'Active';
                }else if(data.status_id == '7')
                {
                    statusData = 'Past_Due';
                }else if(data.status_id == '8'){
                    statusData = 'Canceled';
                }else if(data.status_id == '9'){
                    statusData = 'ON_HOLD';
                }
                else
                {
                    statusData = '';
                }
                //For ID Monitoring status update
                var idp_monitoring_status = false;
                if(data.id_monitoring_status=='true'){
                    idp_monitoring_status = true;
                }
                //console.log(data.huttonchaseflag);
                if(data.segmantationStatus == 1)
                {
                     var AppcuesData = {
                        name: data.first_name + ' ' +data.last_name,
                        email: data.email,
                        created_at: (new Date()).getTime() / 100,
                        status: statusData,
                        billing_status_id : data.billing_status_id,
                        admin : data.adminStatus,
                        Credit_Score : data.creditscore,
                        number_of_creditcard_accounts : data.credit_card_accounts,
                        Revolving_Credit_Card_Balance : data.credit_card_account_balance,
                        number_of_auto_accounts : data.auto_loan_accounts,
                        number_of_mortgage_accounts : data.mortgage_accounts,
                        Number_of_Taxlien_with_Balance_Accounts__c : data.tax_lien_with_balance,
                        number_of_studentloan_accounts__c : data.student_loan_accounts,
                        Starting_Credit_Score : data.Starting_Credit_Score,
                        ID_Doc_Uploaded : data.ID_Doc_Uploaded,
                        TU_Authenticated : data.TU_Authenticated,
                        Last_Logged_In : data.Last_Logged_In,
                        Enrolled_HuttonChase : data.huttonchaseflag,
                        Enrolled_HuttonChase_Date : data.huttonchasedate,
                        HuttonChase_Not_Activated : data.ht_current_enroll_status,
                        ID_Monitoring: idp_monitoring_status,
                        onlineReference:data.onlineReference
                    }; 

                }
                else
                {
                     var AppcuesData = {
                        name: data.first_name + ' ' +data.last_name,
                        email: data.email,
                        created_at: (new Date()).getTime() / 100,
                        status: statusData,
                        billing_status_id : data.billing_status_id,
                        admin : data.adminStatus,
                        Enrolled_HuttonChase : data.huttonchaseflag,
                        Enrolled_HuttonChase_Date : data.huttonchasedate,
                        HuttonChase_Not_Activated : data.ht_current_enroll_status,
                        ID_Monitoring: idp_monitoring_status,
                        onlineReference:data.onlineReference
                    };
                }


                console.log('Service Console');
                console.log(AppcuesData);
                // Appcues.identify(data.id, {
                //     AppcuesData
                //     // Additional user properties.
                // }); 
                
                // $window.Appcues.start();
            }
        });
    });
    return {
       getResonse: function(){
           //console.log('done');
       }
    }
});


appinterview.directive('numericInput', function() {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        var transformedInput = text.replace(/[^0-9]/g, '');
        if(transformedInput !== text ) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
        }
        return transformedInput;  // or return Number(transformedInput)
      }
      ngModelCtrl.$parsers.push(fromUser);
    }
  }; 
});

/*
Directive to validate a form field by comparing it with another form field

@return
If both form fields' values are equal, returns true
Else, returns false

@params
Use as HTML attribute with value equal to other form field
*/
appinterview.directive('compareTo', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        scope: {
            compareToValue: "=compareTo"
        },
        link: function(scope, elem, attrs, ctrl) {
            ctrl.$validators.compareTo = function(modelValue, viewValue) {
                if(scope.compareToValue == viewValue) {

                    // Fields matched
                    return true;
                }

                // Fields not matched
                return false;
            }
        }
    };
});

/*
Directive to format and validate phone number entered by the user
Restricts numeric input by the user
Model value contains the phone number without any formatting. Ex: 1111111111
View value contains the formatted phone number: Ex: (111) 111-1111
*/
appinterview.directive('phoneInput', function(){
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            /*
            Angular parser function
            @returns the model value
            @sets the formatted view value
            */
            function phoneNumberNgParser(viewValue)
            {

                // Format only if model value is not undefined
                if(viewValue === undefined)
                {
                    return '';
                }

                // Unformat the model value if it is already formatted. Also removes extra spaces
                modelValue = viewValue.replace(/[^0-9]/g, '');

                var phoneNumber = formatAndValidatePhoneNumber(modelValue);

                // Set the validation on the element
                ctrl.$setValidity('phoneNumberFormat', phoneNumber.validated);

                // Set the view value
                ctrl.$setViewValue(phoneNumber.formatted);

                // Update the view
                ctrl.$render();

                // Return the model value
                return modelValue;

            }

            /*
            Angular formatter function
            @returns the view value
            */
            function phoneNumberNgFormatter(modelValue)
            {

                if(!modelValue) return '';

                // Remove any characters other than digits
                modelValue = modelValue.replace(/[^0-9]/g, '');

                // Format the phone number
                var phoneNumber = formatAndValidatePhoneNumber(modelValue);

                // Set the validation on the element
                ctrl.$setValidity('phoneNumberFormat', phoneNumber.validated);

                // Return the view value
                return phoneNumber.formatted;

            }

            // Set the formatters and parsers
            ctrl.$formatters.push(phoneNumberNgFormatter);
            ctrl.$parsers.push(phoneNumberNgParser);
        }
    };
});

/*
Function to format phone number in the following format: (xxx) xxx-xxxx

@param: Ten digit unformatted phone number. Remove all characters except digits by using the regex /[^0-9]/g before passing a value to this function

@return: Object {
    'formatted': [string],
    'validated': [boolean]
    }
*/
function formatAndValidatePhoneNumber(unformatted) {

    var formatted = unformatted;
    var valid = false;

    // Phone number is valid if it is 10 digits
    if(unformatted.length == 10)
        valid = true;

    // Check if user has entered 3 or more digits
    if(unformatted.length > 3)
    {
        // Get the first group of 3 digits
        var firstGroup = unformatted.slice(0, 3);

        // Get the rest of the digits after the first three digits
        var restNumber = unformatted.slice(3);

        // By default, the second group of three digits is equal to the rest of the digits
        var secondGroup = restNumber;

        // Define the third group
        var thirdGroup = '';

        // Check if there are 3 or more digits left
        if(restNumber.length > 3)
        {
            // Get the next three digits
            secondGroup = restNumber.slice(0, 3);

            // Get the next four digits; Any more digits are ignored
            thirdGroup = restNumber.slice(3, 7);

            // Set the view value
            formatted = '(' + firstGroup + ') ' + secondGroup + '-' + thirdGroup;
        }
        else
        {
            // Set the view value
            formatted = '(' + firstGroup + ') ' + secondGroup;
        }                    
    }
    else
    {
        if(modelValue !== '')
        {
            // If less than three digits have been entered, just insert an opening parenthesis before it
            formatted = '(' + modelValue;
        }                    
    }

    return {formatted: formatted, validated: valid};
}

/*
Directive to mask and validate SSN number entered by the user
Restricts numeric input by the user
Model value contains the SSN number without any formatting. Ex: 123456789
View value contains the masked SSN number: Ex: xxx-xx-6789
*/
appinterview.directive('ssn', function(){
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {

            // Hides the first five digits of SSN number
            elem.on('blur', function(e) {

                // Get the model value
                var ssn = ctrl.$modelValue;

                if(ssn === undefined)
                    return false;

                // Remove any character other than numbers from the string
                ssn = ssn.replace(/[^0-9]/g, '');

                // Mask the ssn if it is greater than or equal to 9 digits
                // Digits after the first 9 digits are ignored
                if(ssn.length >= 9)
                {
                    // Get the first nine digits (if there are more than nine digits)
                    ssn = ssn.slice(0, 9);

                    // Get the last four digits and hide the first five digits
                    ssn = 'xxx-xx-' + ssn.slice(-4);
                }

                // Set the view value
                ctrl.$viewValue = ssn;
                ctrl.$render();
            });

            // Shows the actual SSN number when the SSN input field is focused
            elem.on('focus', function(e) {

                var ssn = ctrl.$modelValue;
                if(ssn === undefined)
                    return false

                // Set the view value equal to the model value
                ctrl.$viewValue = ssn;
                ctrl.$render();
            });

            // Add a parser that validates the SSN field and prevents input of unwanted characters
            ctrl.$parsers.push(function(viewValue) {

                // Take the model value and remove all characters other than numbers from it
                if(viewValue.indexOf('xxx-xx-') !== -1)
                    modelValue = ctrl.$modelValue.replace(/[^0-9]/g, '');
                else
                    modelValue = viewValue.replace(/[^0-9]/g, '');

                // Check the length of the SSN number
                if(modelValue.length >= 9)
                {
                    // User can not enter more than 9 digits
                    modelValue = modelValue.slice(0, 9);

                    // Valid
                    ctrl.$setValidity('ssn', true);
                }
                else
                {
                    // Not valid
                    ctrl.$setValidity('ssn', false);
                }

                // Set the view value so that input is restricted to 9 digits only
                ctrl.$viewValue = modelValue;
                ctrl.$render();
                return modelValue;
            });

            // Add a formatter that validates and formats the SSN field on page load
            ctrl.$formatters.push(function(modelValue) {

                //console.log(modelValue);

                if(modelValue === undefined)
                    return '';

                // Take the model value and remove all characters other than numbers from it
                viewValue = modelValue.replace(/[^0-9]/g, '');

                // Check the length of the SSN number
                if(viewValue.length >= 9)
                {
                    // User can not enter more than 9 digits
                    viewValue = viewValue.slice(0, 9);

                    // Mask the ssn
                    viewValue = 'xxx-xx-' + viewValue.slice(-4);

                    // Valid
                    ctrl.$setValidity('ssn', true);
                }
                else
                {
                    // Not valid
                    ctrl.$setValidity('ssn', false);
                }

                // Return the (masked) view value
                return viewValue;
            });
        }
    };
});
/* added directive for footer template */
appinterview.directive("interviewFooterCopyright", function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/interview/interview_copyright_footer.html',
    scope: true,
    transclude : false
  };
});
