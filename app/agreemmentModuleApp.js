//client interview verification controller all functionality interview here............//
var appAgreement =  angular.module('agreementAppinterview',['ngRoute','ngSanitize','ngStorage','720kb.datepicker','ui.bootstrap','ui.utils']);

appAgreement.config(['$routeProvider',
    function($routeProvider,$sceDelegateProvider) { 
        $routeProvider.
            when('/', {
                templateUrl: 'templates/agreement/interview_step_reagreement.html',
                controller: 'agreementController'
            }).
            when('/logout', {
                templateUrl: 'templates/agreement/logout.html',
                controller: 'logoutController'
            }).
            otherwise({
                    redirectTo: '/'
                 });
          
}])

appAgreement.run(function($rootScope, $localStorage, $window, $http) {
	//alert('RUN');
    var client_id = clientid;
    $http.post('ClientsController/get_client_data', client_id).success(function(data) {
        // Call Appcues.identify()
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
                Last_Logged_In : data.Last_Logged_In
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
                admin : data.adminStatus
            };
        }
        console.log(AppcuesData);
        Appcues.identify(data.id, {
            AppcuesData
            // Additional user properties.
        }); 
        
        $window.Appcues.start();
    });

    // $rootScope.$on('$routeChangeStart', function (event, next) {
    //     console.log($location.path());
    //     if($location.path() == '/' || $location.path() == '/step1')
    //     {
    //         $http.get('ClientsController/view_as_client_check/' + clientid).success(function (result) {
    //             console.log(result);
    //                 if(result.link != '')
    //                 {
    //                   $location.path(result.link);
    //                 }
    //         });
    //     }
    // });
    
    /*$rootScope.$on('$routeChangeSuccess', function() {
        $http.post('ClientsController/get_client_data', client_id).success(function(data) {
            // Call Appcues.identify()
            if(data.status_id == '3'){statusData = 'Active';}else if(data.status_id == '7'){statusData = 'Past_Due';}else if(data.status_id == '8'){statusData = 'Canceled';}else if(data.status_id == '9'){statusData = 'ON_HOLD';} 
            Appcues.identify(data.id, {
                name: data.first_name + ' ' +data.last_name,
                email: data.email,
                created_at: (new Date()).getTime() / 100,
                status: statusData
                // Additional user properties.
            }); 
            $window.Appcues.start();
        });
        
    });*/

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
appAgreement.service('Appcues', function($rootScope,$http,$window){
    var client_id = clientid;
    var statusData='';
    $rootScope.$on('$routeChangeSuccess', function() {
        $http.post('ClientsController/get_client_data', client_id).success(function(data) {
            // Call Appcues.identify()
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
                    Last_Logged_In : data.Last_Logged_In
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
                    admin : data.adminStatus
                };
            }
            console.log(AppcuesData);
            Appcues.identify(data.id, {
                AppcuesData
                // Additional user properties.
            }); 
            
            $window.Appcues.start();
        });
    });
    return {
       getResonse: function(){
           //console.log('done');
       }
    }
  /*var client_id = clientid;
  $http.post('ClientsController/get_client_data', client_id).success(function(data) {
		  // Call Appcues.identify()
		if(data.status_id == '3'){statusData = 'Active';}else if(data.status_id == '7'){statusData = 'Past_Due';}else if(data.status_id == '8'){statusData = 'Canceled';}else if(data.status_id == '9'){statusData = 'ON_HOLD';} 
        Appcues.identify(data.id, {
			name: data.first_name + ' ' +data.last_name,
			email: data.email,
			created_at: (new Date()).getTime() / 100,
            status: statusData
			// Additional user properties.
	   	}); 
       if ($window.Appcues) {	  		  
          $window.Appcues.start();
		  //$window.Appcues.debug();
        }
   });
  $rootScope.$on('$routeChangeSuccess', function() {
	  $http.post('ClientsController/get_client_data', client_id).success(function(data) {
		  // Call Appcues.identify()
		if(data.status_id == '3'){statusData = 'Active';}else if(data.status_id == '7'){statusData = 'Past_Due';}else if(data.status_id == '8'){statusData = 'Canceled';}else if(data.status_id == '9'){statusData = 'ON_HOLD';} 
        Appcues.identify(data.id, {
			name: data.first_name + ' ' +data.last_name,
			email: data.email,
			created_at: (new Date()).getTime() / 100,
            status: statusData
			// Additional user properties.
	   	}); 
       if ($window.Appcues) {	  		  
          $window.Appcues.start();
		  //$window.Appcues.debug();
        }
   });		
  });*/
});

/*
Directive to validate a form field by comparing it with another form field

@return
If both form fields' values are equal, returns true
Else, returns false

@params
Use as HTML attribute with value equal to other form field
*/
appAgreement.directive('compareTo', function() {
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


/* added directive for footer template */
appAgreement.directive("interviewFooterCopyright", function() {
  return {
    restrict: 'A',
    templateUrl: 'templates/agreement/interview_copyright_footer.html',
    scope: true,
    transclude : false
  };
});
