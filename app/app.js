var app =  angular.module('angularApp',['ngRoute','ngSanitize','ngAnimate','datatables','angularjs-gauge','ui.bootstrap.modal','ui.bootstrap','720kb.datepicker','angularUtils.directives.dirPagination','zingchart-angularjs','ui.grid', 'ui.grid.edit','chart.js','ngResource','slickCarousel','ui.tinymce']);

app.config(['$routeProvider',
    function($routeProvider,$sceDelegateProvider) {
        $routeProvider.
            when('/interview_verification', {
                title:'step 1',
                templateUrl: 'templates/interview_steps.html',
                controller: 'interviewController'
            }).
            when('/', {
                templateUrl: 'templates/dashboard.html', 
                controller: 'dashboardController',
                resolve: CheckPermission.resolve    
            }).
            when('/dashboard', {
                templateUrl: 'templates/dashboard.html', 
                controller: 'dashboardController',
                resolve: CheckPermission.resolve               
            }).
            when('/resume-generator', {
                templateUrl: 'templates/resume-generator.html', 
                controller: 'resumeGeneratorController',
                resolve: CheckPermission.resolve   
            }).
            when('/debt-payment-calculator', {
                templateUrl: 'templates/debt-payment-calculator.html', 
                controller: 'debtPaymentCalculatorController',
                resolve: CheckPermission.resolve                
            }).
            when('/education', {
                templateUrl: 'templates/education.html', 
                controller: 'educationController',
                resolve: CheckPermission.resolve                 
            }).
            when('/training', {
                templateUrl: 'templates/training.html', 
                controller: 'trainingController',
                resolve: CheckPermission.resolve                 
            }).
            when('/billing', {
                templateUrl: 'templates/payment_information.html', 
                controller: 'paymentSettingController',
                resolve: CheckPermission.resolve                 
            }).
            when('/messaging', {
                templateUrl: 'templates/deskdotcom.html', 
                controller: 'messagingController',
                resolve: CheckPermission.resolve                 
            }).
            when('/activities', {
                templateUrl: 'templates/activity_log.html', 
                controller: 'activitiesController',
                resolve: CheckPermission.resolve                 
            }).
            when('/notes', {
                templateUrl: 'templates/all_notes_new.html', 
                controller: 'newnotesController',
                resolve: CheckPermission.resolve                 
            }).
            when('/audit_reviews', {
                templateUrl: 'templates/audit_reviews.html', 
                controller: 'auditController',
                resolve: CheckPermission.resolve                 
            }).
            when('/dispute_letters', {
                templateUrl: 'templates/dispute_letters.html', 
                controller: 'disputelettersFurnisherController',
                resolve: CheckPermission.resolve                 
            }).
            when('/rent-reporting', {
                templateUrl: 'templates/rentReporting.html', 
                controller: 'rentReportingController',
                resolve: CheckPermission.resolve                 
            }).
            when('/item_manager', {
                templateUrl: 'templates/dispute_items.html', 
                controller: 'itemmanagerController',
                resolve: CheckPermission.resolve                 
            }).
            when('/timeline', {
                templateUrl: 'templates/timeline.html', 
                controller: 'timeline',
                resolve: CheckPermission.resolve                 
            }).
            when('/inquiryHelper', {
                templateUrl: 'templates/inquiryHelper.html', 
                controller: 'inquiryHelper',
                resolve: CheckPermission.resolve                 
            }).
            when('/Transunion/client_credit_report', {
                templateUrl: 'templates/credit_report.html', 
                controller: 'creditreportController',
                resolve: CheckPermission.resolve                 
            }).
            when('/documents', {
                templateUrl: 'templates/documents.html',
                controller: 'documentsController',
                resolve: CheckPermission.resolve
            }).
            when('/alert_settings', {
                templateUrl: 'templates/alert_setting.html', 
                controller: 'alertController',
                resolve: CheckPermission.resolve                 
            }).
            when('/powerwallet', {
                templateUrl: 'templates/powerwalletg.html', 
                controller: 'powerwalletController',
                resolve: CheckPermission.resolve                 
            }).
            when('/legal_agreements/:id', {
                templateUrl: 'templates/legal_agreement.html', 
                controller: 'legalAgreementController',
                resolve: CheckPermission.resolve                 
             }).  
            when('/alerts', {
                templateUrl: 'templates/client_monitoring_detail.html', 
                controller: 'clientMonitoringController',
                resolve: CheckPermission.resolve                 
             }).   
            when('/personal_information', {
                templateUrl: 'templates/personal_information.html',
                controller: 'personalInfoController',
                resolve: CheckPermission.resolve  
            }).
            when('/Transunion/client_credit_report', {
                templateUrl: 'templates/credit_report.html',
                controller: 'creditReportController',
                resolve: CheckPermission.resolve  
            }).
            when('/refer-a-friend', {
                templateUrl: 'templates/referafriend.html',
                controller: 'referafriendController',
                resolve: CheckPermission.resolve  
            })
            .
            when('/financialfitnessinfo', {
                templateUrl: 'templates/financialfitnessinfo.html',
                controller: 'financialfitnessinfoController',
                resolve: CheckPermission.resolve  
            }).
            when('/fitnesscontent', {
                templateUrl: 'templates/fitnesscontent.html',
                controller: 'fitnesscontentController',
                resolve: CheckPermission.resolve  
            }).
            when('/fitnessmilestones', {
                templateUrl: 'templates/fitnessmilestone.html',
                controller: 'fitnessmilestoneController',
                resolve: CheckPermission.resolve  
            }).
            when('/videodashboard', {
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'videodashboardController',
                resolve: CheckPermission.resolve  
            }).
            when('/popular-video', {
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'popularlistingController',
                resolve: CheckPermission.resolve   
            }).
            when('/popular-video/:pageno', {
                templateUrl: 'templates/videohtmlpage1.html',
                controller: 'popularvideoPagination',
                resolve: CheckPermission.resolve   
            }).
            when('/recent-video', { 
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'recentvideoController',
                resolve: CheckPermission.resolve   
            }).
             when('/facebook-post', { 
                templateUrl: 'templates/facebookpost.html',
                controller: 'facebookpostController',
                resolve: CheckPermission.resolve   
            }). // added for facebook posts on 23-05-2018
            when('/recent-video/:pageno', { 
                templateUrl: 'templates/videohtmlpage2.html',
                controller: 'recentvideoPagination',
                resolve: CheckPermission.resolve   
            }).
            when('/video-playlist', {
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'videoplaylistController',
                resolve: CheckPermission.resolve   
            }). 
            when('/contact-information', {
                templateUrl: 'templates/contactInformation.html',
                controller: 'contactInfoController',
                resolve: CheckPermission.resolve  
            }).
            when('/video-play/:id/:videoname', {
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'videoplayController',
                resolve: CheckPermission.resolve   
            }).
            when('/playlist-detail/:id/:playlistname', {
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'playlistdetailController',
                resolve: CheckPermission.resolve   
            }).
            when('/video/search/:searchtext', {
                templateUrl: 'templates/videohtmlpage.html',
                controller: 'videosearchController',
                resolve: CheckPermission.resolve   
            }).
            when('/scheduleanappointment', {
                templateUrl: 'templates/sheduleanappointment.html',
                controller: 'sheduleanController',
                resolve: CheckPermission.resolve  
            }).
			      when('/auto-loan-calculator', {
                templateUrl: 'templates/autoloancalculator.html',
                controller: 'autoloancalculator',
                resolve: CheckPermission.resolve  
            }).
			      when('/mortgage-loan-calculator', {
                templateUrl: 'templates/mortgageloancalculator.html',
                controller: 'mortgageloancalculator',
                resolve: CheckPermission.resolve  
            }).
			      when('/mortgage-tax-savings-calculator', {
                templateUrl: 'templates/mortgagetaxsavingscalculator.html',
                controller: 'mortgagetaxsavingscalculator',
                resolve: CheckPermission.resolve  
            }).
			      when('/health-insurance-estimator', {
                templateUrl: 'templates/insurance_estimator.html',
                controller: 'healthinsuranceestimator',
                resolve: CheckPermission.resolve  
            }).
			      when('/job-search', {
                templateUrl: 'templates/jobsearch.html',
                controller: 'jobsearchController',
                resolve: CheckPermission.resolve  
            }).
			when('/deb-snowball-system', {
                templateUrl: 'templates/snowballAndAvalancheRepaymentTool.html',
				controller: 'snowballAndAvalancheRepaymentToolController',
				resolve: CheckPermission.resolve  
            }).
			when('/credit-and-finance-news', {
                templateUrl: 'templates/credit-and-finance-news.html',
				controller: 'creditandfinancenewsController',
				resolve: CheckPermission.resolve  
            }).
            when('/logout', {
                controller: 'logoutController'
            }).
            when('/access-restricted', {
                templateUrl: 'templates/access_restricted.html',
                controller: 'accessRestrictedController'
            }).
            when('/letter-of-reference', {
                templateUrl: 'templates/letterofreference.html',
                controller: 'letterofreference'
            }).
			when('/build-credit', {
                templateUrl: 'templates/buildCredit.html',
                controller: 'buildCreditController',
				resolve: CheckPermission.resolve  
            }).
	        when('/student-loan-advice', {
                templateUrl: 'templates/studentloanAdvice.html',
                controller: 'studentloanAdviceController',
                resolve: CheckPermission.resolve  
            }).
            when('/shopping-card-trick', {
                templateUrl: 'templates/shoppingcardtrick.html',
                controller: 'shoppingcardtrick',
				resolve: CheckPermission.resolve
            }).
            when('/cashrules', {
                templateUrl: 'templates/pfm.html', 
                controller: 'pfaController',
                resolve: CheckPermission.resolve                 
            }).
            when('/tcp-legal-network', {
                templateUrl: 'templates/tcpLegalNetwork.html', 
                controller: 'tcpLegalNetworkController',
                resolve: CheckPermission.resolve                 
            }).
            when('/huttonChase', {
                templateUrl: 'templates/huttonChase.html',
                controller: 'huttonChase',
                resolve: CheckPermission.resolve  
            }).
            when('/slash-rx-discount', {
                templateUrl: 'templates/SlashRXDiscount.html', 
                controller: 'slashRXDiscountController',
                resolve: CheckPermission.resolve                 
            }).
            when('/financial-tools', {
                templateUrl: 'templates/FinancialTools.html', 
                controller: 'financialToolsController',
                resolve: CheckPermission.resolve                 
            }).
            when('/robocall-cash-system', {
                templateUrl: 'templates/robocallCashSystem.html',
                controller: 'robocallCashSystemController',
                resolve: CheckPermission.resolve
            }).
            when('/nationalCreditDirect', {
                templateUrl: 'templates/nationalCreditDirect.html',
                controller: 'nationalCreditDirect',
                resolve: CheckPermission.resolve  
            }).
            when('/experianBoost', {
                templateUrl: 'templates/experianBoost.html',
                controller: 'experianBoostController',
                resolve: CheckPermission.resolve
            }).
            when('/side-hustle', {
                templateUrl: 'templates/side-hustle.html',
                controller: 'sidehustle',
                resolve: CheckPermission.resolve
            }).
            when('/saveonInternet', {
                templateUrl: 'templates/saveonInternet.html',
                controller: 'saveonInternetController',
                resolve: CheckPermission.resolve  
            }).
            when('/divvy-homes', {
                templateUrl: 'templates/divvyHomes.html',
                controller: 'divvyHomesController',
                resolve: CheckPermission.resolve  
            }).
            when('/success-plus', {
                templateUrl: 'templates/successPlus.html',
                controller: 'successPlusController',
                resolve: CheckPermission.resolve  
            }).
            when('/rentReporting', {
                templateUrl: 'templates/testIframe.html',
                controller: 'IframeController',
                resolve: CheckPermission.resolve  
            }).
            when('/comparisonMethodology', {
                templateUrl: 'templates/comparisonMethodology.html',
                controller: 'comparisonMethodologyController',
                resolve: CheckPermission.resolve  
            }).when('/verco', {
                templateUrl: 'templates/rentReportingForm.html',
                controller: 'rentReportingFormController',
                resolve: CheckPermission.resolve  
            }).
            otherwise({
                    redirectTo: '/'
            });
            
}])

//function for loading or show processing when data loaded into datatable
.run(initDT);
function initDT(DTDefaultOptions) {
    //DTDefaultOptions.setLoadingTemplate('Processing...');
    //DTDefaultOptions.setDOM('lpfrtip');
    DTDefaultOptions.setLoadingTemplate('<em>Fetching data</em> ...');
}

app.run(['$rootScope', '$http', '$window' , '$sce', '$location', function ($rootScope, $http , $window, $sce, $location) {
    var client_id = clientid;
    $rootScope.clientidP = clientid;
    $rootScope.showModalwarning_ = false;
    $http.post('ClientsController/get_client_data', client_id).success(function(data) { 

        console.log("Session data not checked"+data);

        if(data.response == 0)
        {
            $rootScope = '';

            alert('you have been logout');
            location.href = global_base_url+'logout';
        }

        $rootScope.inquiryhelperflag = data.inquiryhelperflag;
        $rootScope.inquiryhelperdate = data.inquiryhelperdate;
        $rootScope.family_upsell_flag = data.family_upsell_flag;

        // Extra information for contact page
        $rootScope.firstName = data.first_name;
        $rootScope.lastName = data.last_name;
        $rootScope.phone = data.phone_mobile;
        $rootScope.email = data.email;

        //condition for hide show IDP Section Exept from portal
        $rootScope.idp_for_portal = data.idp_for_portal;

        //for huttonchase flag and date
        $rootScope.huttonchaseflag = data.huttonchaseflag;
        $rootScope.huttonchasedate = data.huttonchasedate;

        //If client is logged in but user change the brand from billing status
        if( typeof(data.bill_brand_change)!='undefined' && data.bill_brand_change==false){
            alert('you have been logout');
            location.href = global_base_url+'logout';
        }

        $rootScope.candyWidget = data.refcandy;
        //hide show refcandy-poprocks plugin dynamically
        if(data.refcandy==true){ 
            angular.element('#refcandy-poprocks').css('display', 'block');
        }else{ 
            angular.element('#refcandy-poprocks').css('display', 'none'); 
        }
        //hide show refcandy-poprocks plugin dynamically

        $rootScope.fullName = data.first_name +' '+ data.last_name;
        if(data.adminStatus == false)
        {
            //For ID Monitoring status update
            var idp_monitoring_status = false;
            if(data.id_monitoring_status=='true'){
                idp_monitoring_status = true;
            }


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
            // $window.Appcues.start();
           // console.log('Run Console');
           // console.log(AppcuesData);
        }

        $http.post('ClientsController/checkForIDP/'+client_id).success(function(dataResult) {
            if(dataResult.upsellflag == true){
                if(dataResult.family_discount_status == 1){
                    $rootScope.spouse = true;
                    $rootScope.setData = dataResult.result;
                }else{
                $rootScope.spouse = false;
                $rootScope.setData = '';
            }
            }else{
                $rootScope.spouse = false;
                $rootScope.setData = '';
            }
        });
        

    });
    
    $rootScope.centerContent = '';
    $http.post('ClientsController/getadpluggData', client_id).success(function(data) {
        var responseData = data;
        if(responseData.adpluggflag != 0)
        {
            if(responseData.dataValue)
            {
                angular.forEach(responseData.dataValue, function(value, key) {
                    // console.log("on Load "+value.location_slug);
                     if(value.location_slug == 'header_ad')
                      {
                         myEl = angular.element( document.querySelector( '#headerContent' ) );
                         myEl.html(value.content);  
                      }
                      else if(value.location_slug == 'footer_ad')
                      {
                         myEl = angular.element( document.querySelector( '#footerContent' ) );
                         myEl.html(value.content);
                      }
                      else if(value.location_slug == 'left_ad')
                      {
                         myEl = angular.element( document.querySelector( '#leftContent' ) );
                         myEl.html(value.content);  
                      }
                      else if(value.location_slug == 'right_ad')
                      {
                         myEl = angular.element( document.querySelector( '#rightContent' ) );
                         myEl.html(value.content);  
                      }
                      else if(value.location_slug == 'center_ad')
                      {
                         $rootScope.centerContent = value.content;  
                      }
                });
            }
        }
    });

    //use for get account status data   
    $http.get( 'ClientsController/getClientAccountStatusDataAlertPopup' ).success( function(data) {
        $rootScope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($rootScope.url != '' && $rootScope.url != 'dashboard'))
        {
            $rootScope.clientAccountStatus = data.clientStatusData;
            $rootScope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $rootScope.titleT =  data.clientStatusData.title;
            $rootScope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1'){
                $rootScope.showModalwarning_ = false;
                //warning popup
                $rootScope.popupCondtion = '1';
                $rootScope.showModalwarning = true;
                  
                setInterval(function(){
                   $('.modal-backdrop').remove();
                   $("#myModal").fadeIn("fast");
                   $("#myModal").animate({top: '250px'});
                }, 500);
            }
            else{
                 $rootScope.popupCondtion = '0';
                 $rootScope.showModalwarning = false;

                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $rootScope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $rootScope.showModalwarning_ = true;                  
                        }else{
                            $rootScope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
        }
    });
}]);

function check_session($http,$window) {
    $http.post('ClientsController/check_session').success(function($data){ 
        if($data.response==0){
            alert('You have logged Out!.');
            $window.location.href=base_url;
        }
    });
}
 
app.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',   // trust all resources from the same origin
        '*://www.youtube.com/**'   // trust all resources from `www.youtube.com`
    ]);
});

app.config(function($sceProvider) {
  // Completely disable SCE.  For demonstration purposes only!
  // Do not use in new projects.
  $sceProvider.enabled(true);
});

app.service('Page', function($rootScope,$http,$window,$sce,$route,$location){
    var client_id = clientid;
    $rootScope.clientidP = clientid;
    $rootScope.$on('$routeChangeSuccess', function() {
       $rootScope.showModalwarning_ = false;
        // Get the URI after Angular's base URL
        var uri = $route.current.$$route.originalPath;
       // console.log(uri);
        
        $http.post('ClientsController/get_client_data ', client_id).success(function(data) { 

        //condition for hide show IDP Section Exept from portal
        $rootScope.idp_for_portal = data.idp_for_portal; 

            //Added for ID_Monitoring Status
            idp_monitoring_status = false;
            if(data.id_monitoring_status=='true'){
                idp_monitoring_status = true;
            }
            //Added for ID_Monitoring Status

            //If client is logged in but user change the brand from billing status
            if( typeof(data.bill_brand_change)!='undefined' && data.bill_brand_change==false){
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }
            $rootScope.candyWidget = data.refcandy;
            //hide show refcandy-poprocks plugin dynamically
            if(data.refcandy==true){ 
                angular.element('#refcandy-poprocks').css('display', 'block');
            }else{ 
                angular.element('#refcandy-poprocks').css('display', 'none'); 
            }   
           //hide show refcandy-poprocks plugin dynamically 
    
            $rootScope.inquiryhelperflag = data.inquiryhelperflag;
            $rootScope.inquiryhelperdate = data.inquiryhelperdate;

            $rootScope.fullName = data.first_name +' '+ data.last_name;

            //for hutton chase flag and date
            $rootScope.huttonchaseflag = data.huttonchaseflag;
            $rootScope.huttonchasedate = data.huttonchasedate;
            if(data.adminStatus == false)
            {
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
                        Last_Logged_In : data.Last_Logged_In,
                        Enrolled_HuttonChase : data.huttonchaseflag,
                        Enrolled_HuttonChase_Date : data.huttonchasedate,
                        HuttonChase_Not_Activated : data.ht_current_enroll_status,
                        ID_Monitoring:idp_monitoring_status,
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
                        ID_Monitoring:idp_monitoring_status,
                        onlineReference:data.onlineReference
                    };
                }
                /*console.log('Service Console');
                console.log(AppcuesData);*/
            }
            $http.post('ClientsController/checkForIDP/'+client_id).success(function(dataResult) {
            if(dataResult.upsellflag == true){
                if(dataResult.family_discount_status == 1){
                    $rootScope.spouse = true;
                    $rootScope.setData = dataResult.result;
                }else{
                $rootScope.spouse = false;
                $rootScope.setData = '';
            }
            }else{
                $rootScope.spouse = false;
                $rootScope.setData = '';
            }
        });
        });
        	

        //use for get account status data   
        $http.get( 'ClientsController/getClientAccountStatusDataAlertPopup' ).success( function(data) {
            $rootScope.url = $location.absUrl().split('/')[4];
            if( data.result !== 'status_id_not_found' && ($rootScope.url != '' && $rootScope.url != 'dashboard'))
            {
                $rootScope.clientAccountStatus = data.clientStatusData;
                $rootScope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
                $rootScope.titleT =  data.clientStatusData.title;
                $rootScope.statushold = data.clientStatusData.alert_hold_client_enable;
               
                if(data.clientStatusData.alert_hold_client_enable=='1'){
                    $rootScope.showModalwarning_ = false;
                    //warning popup
                    $rootScope.popupCondtion = '1';
                    $rootScope.showModalwarning = true;
                      
                    setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});
                    }, 500);
                }
                else{
                     $rootScope.popupCondtion = '0';
                     $rootScope.showModalwarning = false;
                     if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $rootScope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $rootScope.showModalwarning_ = true;                  
                        }else{
                            $rootScope.showModalwarning_ = false;          
                        }
                    });                    
                 }
                }
            }
        });

    });
    return {
       setTitle: function(title){
            $rootScope.title = title;
            $http.post('ClientsController/getBrandTitle').success(function(data) {
                $rootScope.footerCopyright = $sce.trustAsHtml(data.company_footer_title);
                $rootScope.metaTitle = $sce.trustAsHtml(data.company_title)+' - '+$rootScope.title;
                $rootScope.pageTitle = $sce.trustAsHtml(data.company_title);
            });   
       }
    }
});


/*
  Check permissions object
  Checks portal permissions for current page before loading the page
  Called as a resolve for routeProvider
*/
CheckPermission = {};
CheckPermission.resolve = {
    permission : function($q, $http, $route, $location) {

        // Get the URI after Angular's base URL
        var uri = $route.current.$$route.originalPath;

        // Check if the URI is root
        if(uri == '/')
        {
            // This will point to the default URI
            uri = '/dashboard';
        }
        
		if((uri.indexOf("playlist-detail") != 1 && uri.indexOf("video") != 1) && uri.indexOf("playlist-detail") != 1 && uri.indexOf("video-playlist") != 1){
		if (uri.indexOf("ajax") >= 0 || uri.indexOf("Transunion") >= 0){
			uri = uri.replace('/', '');
			// Replace forward slashes with dashes in order to pass full URI
			uri = uri.replace('/', '--');}
		else{
			uri = uri.replace('/', '');
			}
			
			
        var deferred = $q.defer();

        // Get user's permission for this URI
        $http({method: 'GET', url: 'ClientsController/commonportalpermission/' + uri})
            .success(function(data) {
                deferred.resolve(data.link);


                if(data.response == 0 || data.logout)
                {
                    $rootScope = '';

                    alert('you have been logout');
                    location.href = global_base_url+'logout';
                }



                // Check if user has access to this URI
                if(data.link == '0')
                {
                  // Redirect the page to 'Restricted Access' page
                  $location.path('/access-restricted');
                }
            })
        return deferred.promise;
		}
    }
};

//new custom filters
/* stripTags filter for the remove html tags from the text*/
app.filter('stripTags', function() {
    return function(text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});
/* highlight filter to add highlighted class when search string matched */
app.filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>');
      return $sce.trustAsHtml(text);
    }
});


/******filter for unique value********/
app.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});


/*****Directives for loader image***************/
app.directive('loading',   ['$http' ,function ($http)
    {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if(v){
                        elm.show();
                    }else{
                        elm.hide();
                    }
                });
            }
        };

    }]);




//for Phone Number
app.directive('formatPhone', function() {
            return {
                require: 'ngModel',
                restrict: 'A',
                link: function(scope, elem, attrs, ctrl, ngModel) {
                         elem.add(phone_home).on('keyup', function() {
                         var origVal = elem.val().replace(/[^\w\s]/gi, '');
                         
                         if(origVal.length === 10) {
                            var str = origVal.replace(/(.{3})/g,"$1-");
                            var phone = str.slice(0, -2) + str.slice(-1);
                            jQuery("#phone_home").val(phone);
                            }
                        });
                    }
                }
        });
        
        
        
    app.directive('formatMobile', function() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function(scope, elem, attrs, ctrl, ngModel) {
                     elem.add(phone_mobile).on('keyup', function() {
                     var origVal = elem.val().replace(/[^\w\s]/gi, '');
                     if(origVal.length === 10) {
                      var str = origVal.replace(/(.{3})/g,"$1-");
                      var phone = str.slice(0, -2) + str.slice(-1);
                      jQuery("#phone_mobile").val(phone);
                         }
                    });
                }
            }
    });
        
        
app.directive('formatWork', function() {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl, ngModel) {
                 elem.add(phone_work).on('keyup', function() {
                 var origVal = elem.val().replace(/[^\w\s]/gi, '');
                 if(origVal.length === 10) {
                  var str = origVal.replace(/(.{3})/g,"$1-");
                  var phone = str.slice(0, -2) + str.slice(-1);
                  jQuery("#phone_work").val(phone);
                     }
                });
            }
        }
});
       
       
       


// for SSN
app.directive('maskInput', function() {
 
    return {
           require: "ngModel",
           replace: true,
           transclude:false,
           restrict: "AE",
            scope: {
                ngModel: '=',
             },
            link: function(scope, elem, attrs) {
              var orig = scope.ngModel;
              var edited = $('#ssn').attr('my');
              
              scope.ngModel = edited.slice(-3).replace(/\d/g, 'x') + '-' +edited.slice(-3).replace(/\d/g, 'x') + '-'+ edited.slice(-3);
              $("#ssn").on("focus", function(){
                //var unmasked = $("#ssn1").val(); 
                //console.log(unmasked);
                //$("#ssn").val('');
               // $("#ssn").val(unmasked); 
              })       
              var temp;
              orig  = elem.val();
              temp = elem.val();
              var ssn_val = $("#ssn").val();
              elem.val(temp.slice(-3).replace(/\d/g, 'x') + '-' + temp.slice(-3).replace(/\d/g, 'x') + '-' +temp.slice(-3));
              elem.bind("blur", function() {
              var temp;
              orig  = elem.val();
              temp = elem.val();
              if(temp.length < 9){
                alert('SSN should be at least 9 digit');
                return false;
                }
                      
                       elem.val(temp.slice(-3).replace(/\d/g, 'x') + '-' + temp.slice(-3).replace(/\d/g, 'x') + '-' +temp.slice(-3));
                      var isnum = /^\d+$/.test(temp);
                      if(isnum)
                      $('#ssn1').val(temp);
                });
               
              elem.bind("focus", function() {
                  var temp;
                orig  = elem.val();
                temp = elem.val();
                if(temp.length < 9){
                  
                  return false;
                }
                                
                    
                       elem.val(temp.slice(-3).replace(/\d/g, 'x') + '-' + temp.slice(-3).replace(/\d/g, 'x') + '-' +temp.slice(-3));
                      var isnum = /^\d+$/.test(temp);
                      if(isnum)
                      $('#ssn1').val(temp);
               });  
            }
      };
   })

//dropzone
app.directive('dropZone', function($http,$rootScope,$filter) {
    $rootScope.pdfArray = [];
    var __PDF_DOC,
    __CURRENT_PAGE,
    __TOTAL_PAGES,
    __PAGE_RENDERING_IN_PROGRESS = 0;
    return function(scope, element, attrs) {
      element.dropzone({ 
        url: "/ClientsController/add_client_documents/"+clientid,
        // maxFilesize: 2,
        maxFiles: 1,
        addRemoveLinks : true,
        dictRemoveFile : 'Remove',
        dictDefaultMessage: "Drop files here to upload",
        paramName: "uploadfile",
        maxThumbnailFilesize: 5,
		thumbnailWidth: 256,
		thumbnailHeight: 256,
        acceptedFiles: ".png,.jpg,.jpeg,.gif,.pdf,.doc,.docx,.xls,.txt,.html,.xlsx",

        init: function() {
          var dropzone = this;
          scope.files = [];  
          scope.files.push({file: 'added'}); // here works
          this.removeAllFiles(true);

          this.on('success', function(file, json) 
          {
                /*------------------ */
                
                
                $rootScope.pdfArray = [];
                //if(file.type != 'application/pdf') {
                    
                $('.dz-details').children('img').show(); //changes from hide() to show() on 17-june-2017 by vivek
                $("#loadingImg").hide();
                $('.dz-image').hide();
                $(".dz-progress").hide();
                $(".drag_drop_doc1").hide();
                $(".or_drag_drop").hide();
                $(".select_files_upload").hide();
                $(".dz-success-mark").hide();
                $(".dz-error-mark").hide();
                $(".fa-cloud-upload").hide();
                $(".dz-filename").hide();
                $(".dz-size").hide();
                $(".dz-remove").before('</br>');
                $(".dz-remove").css('font-size','20px');
                $("#hide9").hide();
           

                /*------------- */
                var utype = file.type;
                var splitval = $filter('uppercase')(utype.split("/"));
                
                scope.client_document = JSON.parse(json);
                $rootScope.canvasUrl = scope.client_document.client_document_Preview;
                var fileExtension = $filter('uppercase')(scope.client_document.client_document_Preview.replace(/^.*\./, ''));
                
                document.getElementById("ccid").value = clientid;
                document.getElementById("location").value = scope.client_document.client_document_path;
                //document.getElementById("image_location").value = scope.client_document.pdf_images;
                document.getElementById("new_doc_src").value = scope.client_document.client_document_Preview;
                if(fileExtension != 'pdf' )
                {
                    var imageNameIcon = '';
                    if(fileExtension == 'doc' || fileExtension == 'DOC')
                    {
                        imageNameIcon = '/assets/images/doc_l.png';
                    }
                    else if(fileExtension == 'docx' || fileExtension == 'DOCX')
                    {
                        imageNameIcon = '/assets/images/docx_l.png';
                    }
                    else if(fileExtension == 'pdf' || fileExtension == 'PDF')
                    {
                        imageNameIcon = '/uploads/client_documents/defaultPdfImage/defaultpdf.png';
                    }
                    else if(fileExtension == 'txt' || fileExtension == 'TXT')
                    {
                        imageNameIcon = '/assets/images/txt_l.png';
                    }
                    else if(fileExtension == 'html' || fileExtension == 'HTML')
                    {
                        imageNameIcon = '/assets/images/html_l.png';
                    }
                    else if(splitval[1] == 'xls' || splitval[1] == 'xlsx' || fileExtension == 'XLS' || fileExtension == 'XLSX')
                    {
                        imageNameIcon = '/assets/images/xls_l.png';
                    }
                    if(imageNameIcon == '') 
                    {
                        document.getElementById("edit_image").style.display = "block";
                        $("#imagePreview").attr('src', '');
                        $('.dz-image').show();
                        // var images = $('#imagePreview').attr('src');
                        // if(images == '' || images == undefined)
                        // {
                            document.getElementById("imagePreview").style.width = "220px";
                            $("#imagePreview").attr('src', scope.client_document.client_document_Preview);
                        // }
                    }
                    else
                    {
                        $("#pdfimage").attr('src', imageNameIcon);
                        $("#view_pdf").attr('href', scope.client_document.client_document_Preview );
                        document.getElementById("view_pdf").style.display = "block";
                        $("#view_pdf").show();
                    }
                }    
               // document.getElementById("edit_image").style.display = "block";
                //$(".fa-cloud-upload").hide();
    			/* code added to show the link of uploaded pdf. by vivek on (17-june-2017) */
    			if( fileExtension == 'pdf' )
                {
                    
                    $("#view_pdf").attr('href', scope.client_document.client_document_Preview );
                    document.getElementById("view_pdf").style.display = "block";
    				$("#view_pdf").show();
                    //document.getElementById("pdfimage").src=scope.client_document.pdf_first_images;
                }
    			
                scope.client_document = [];
                scope.clientid = clientid;
    
          });
          this.on('error', function(file, json) {
                
                $(".dz-progress").hide();
                $("#loadingImg").hide();
                $(".dz-error").hide();
                alert(json);
                // console.log($(".dz-success").find('.dz-details'));
                if($(".dz-success").find('.dz-details').length >= 1)
                {
                    //
                }
                else
                {
                    $('.dz-details').children('img').hide();
                }
          });          
          this.on('addedfile', function(file) {
                $("#loadingImg").show();
                $('.dz-image').hide();
                scope.$apply(function(){
                    //console.log(file);
                     scope.files.push({file: 'added'});
                });
          });
          
            this.on('drop', function(file) {
                //alert('file');
                $(".dz-progress").hide();
            });

           
           
           
          
            this.on('removedfile', function(file) {
            //x = confirm('Do you want to delete?');
            //if(!x)  return false;
            $rootScope.pdfArray = [];
            $("#loadingImg").hide();
            $("#edit_image").hide();
            $("#canvas_pdf").hide();
            $(".dz-progress").hide();
			$("#view_pdf").hide(); /* code to remove link of pdf on remove. Added by vivek (17-june-2017) */
            $(".fa-cloud-upload").show();
            $(".drag_drop_doc1").show();
            $(".or_drag_drop").show();
            $(".select_files_upload").show();
			$("#hide9").show();
            $("#pdf-contents").hide();
            $("#pdf-canvas").hide();
            document.getElementById("location").value = '';
            document.getElementById("new_doc_src").value = '';
            if(document.getElementById('canvas1'))
            {
                document.getElementById('canvas1').remove();
            }

          });
          
        },
        accept: function (file, done) {
            $('.dz-progress').show();
            $('.dz-message').hide();

            $('#upload_spinner_box').removeClass('collapse');
            if(document.getElementById('doc_type').value == 'id_document')
            {
                var utype = file.type;
                var splitval = $filter('uppercase')(utype.split("/"));
                if(splitval[1] == 'pdf' || splitval[1] == 'PDF' || splitval[0] == 'image')
                {
                    done();
                }
                else
                {
                    this.removeAllFiles(true);
                    $("#loadingImg").hide();
                    $('.dz-details').children('img').hide();
                    $("#loadingImg").hide();
                    $("#hide9").show();
                    alert('You can upload only pdf and images for id document');
                    done();
                    $(".dz-error").hide();
                }
            }
            else
            {
                done();
            }
            
        },
        uploadprogress: function(file, progress, bytesSent) {
            var node, _i, _len, _ref, _results;
            if (file.previewElement) {
              _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                node = _ref[_i];
                if (node.nodeName === 'PROGRESS') {
                  _results.push(node.value = progress);
                } else {
                  _results.push(node.style.width = "" + progress + "%");
                  $("#progress-text").html(Math.round(progress) + "%");
                }
              }
              return _results;
            }
        },
        previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img id=\"imagePreview\" data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress><span class=\"progress-text\" id=\"progress-text\"></span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n <span>✔</span></div>\n  <div class=\"dz-error-mark\">\n  <span>✘</span>  </div>\n</div>"
        
      });
     
    }
  });
  
app.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
});

app.directive('imageCrop', ['$http', function($http) {
    return {
      template: '<div class="ng-image-crop ng-image-crop--{{ shape }}" ng-style="moduleStyles"><section ng-style="sectionStyles" ng-show="step==1" class="my"><input type="file" class="image-crop-filepicker" /></section><section ng-style="sectionStyles" ng-show="step==2"><canvas class="cropping-canvas" width="{{ canvasWidth }}" height="{{ canvasHeight }}" ng-mousemove="onCanvasMouseMove($event)" ng-mousedown="onCanvasMouseDown($event)" ng-mouseup="onCanvasMouseUp($event)"></canvas><div ng-style="croppingGuideStyles" class="cropping-guide"></div><div class="zoom-handle" ng-mousemove="onHandleMouseMove($event)" ng-mousedown="onHandleMouseDown($event)" ng-mouseup="onHandleMouseUp($event)"><span>&larr; zoom &rarr;</span></div><button ng-click="crop()" style="margin-top: -30px;">Crop</button></section><section ng-style="sectionStyles" class="section-final" ng-show="step==3"><img class="final-cropped-image" ng-src="{{ croppedDataUri }}" id="final-cropped-image"/><br><div id="ld" style="text-align:center;color:#ffffff;">Updating...</div><button ng-click="saveimg()" id="button_save" style="position: relative;left: 40%;margin-top: 10px;bottom: -15px;">Save</button></section></div>',
      replace: true,
      restrict: 'AE',
      scope: {
        width: '@',
        height: '@',
        shape: '@',
        result: '=',
        step: '='
      },
      link: function (scope, element, attributes) {
        scope.step = scope.step || 1;
        scope.shape = scope.shape || 'circle';
        scope.width = parseInt(scope.width, 10) || 300;
        scope.height = parseInt(scope.height, 10) || 300;

        scope.canvasWidth = scope.width + 100;
        scope.canvasHeight = scope.height + 100;
        
        var $input = element.find('input[type=file]');
        var $canvas = element.find('canvas')[0];
        var $handle = document.getElementsByClassName('zoom-handle')[0];
        var $finalImg = document.getElementsByClassName('final-cropped-image')[0];
        var $img = new Image();
        var fileReader = new FileReader();

        var maxLeft = 0, minLeft = 0, maxTop = 0, minTop = 0, imgLoaded = false, imgWidth = 0, imgHeight = 0;         
        var currentX = 0, currentY = 0, dragging = false, startX = 0, startY = 0, zooming = false;
        var newWidth = imgWidth, newHeight = imgHeight;
        var targetX = 0, targetY = 0;
        var zoom = 1;
        var maxZoomGestureLength = 0;
        var maxZoomedInLevel = 0, maxZoomedOutLevel = 2;
        var minXPos = 0, maxXPos = 50, minYPos = 0, maxYPos = 50; // for dragging bounds

        var zoomWeight = .4;
        var ctx = $canvas.getContext('2d');
        var exif = null;
        var files = [];

        // ---------- INLINE STYLES ----------- //
        scope.moduleStyles = {
          width: (scope.width + 100) + 'px',
          height: (scope.height + 100) + 'px'
        };

        scope.sectionStyles = {
          width: (scope.width + 100) + 'px',
          height: (scope.height + 100) + 'px'
        };

        scope.croppingGuideStyles = {
          width: scope.width + 'px',
          height: scope.height + 'px',
          top: '50px',
          left: '50px'
        };

        // ---------- EVENT HANDLERS ---------- //
        fileReader.onload = function(e) {
          $img.src = this.result;
          scope.step = 2;
          scope.$apply();

          var byteString = atob(this.result.split(',')[1]);
          //var binary = new BinaryFile(byteString, 0, byteString.length);
          //exif = EXIF.readFromBinaryFile(binary);

        };

        function reset() {
          files = [];
          zoom = 1;
          ctx.clearRect(0, 0, $canvas.width, $canvas.height);
          document.getElementsByClassName('image-crop-filepicker')[0].value = null;
          $img.src = '';
      document.getElementById("button_save").style.display = "block";
        }
        
        element.on('change', function(e){
          files = e.target.files;
          fileReader.readAsDataURL(files[0]);
         });
        
        
        $img.onload = function() {
          ctx.drawImage($img, 0, 0);

          imgWidth = $img.width;
          imgHeight = $img.height;

          if (exif && exif.Orientation) {

            // change mobile orientation, if required
            switch(exif.Orientation){
              case 1:
                  // nothing
                  break;
              case 2:
                  // horizontal flip
                  ctx.translate(imgWidth, 0);
                  ctx.scale(-1, 1);
                  break;
              case 3:
                  // 180 rotate left
                  ctx.translate(imgWidth, imgHeight);
                  ctx.rotate(Math.PI);
                  break;
              case 4:
                  // vertical flip
                  ctx.translate(0, imgHeight);
                  ctx.scale(1, -1);
                  break;
              case 5:
                  // vertical flip + 90 rotate right
                  ctx.rotate(0.5 * Math.PI);
                  ctx.scale(1, -1);
                  break;
              case 6:
                  // 90 rotate right
                  ctx.rotate(0.5 * Math.PI);
                  ctx.translate(0, -imgHeight);
                  break;
              case 7:
                  // horizontal flip + 90 rotate right
                  ctx.rotate(0.5 * Math.PI);
                  ctx.translate(imgWidth, -imgHeight);
                  ctx.scale(-1, 1);
                  break;
              case 8:
                  // 90 rotate left
                  ctx.rotate(-0.5 * Math.PI);
                  ctx.translate(-imgWidth, 0);
                  break;
              default:
                  break;
            }
          }
          
          minLeft = (scope.width + 100) - this.width;
          minTop = (scope.height + 100) - this.height;
          newWidth = imgWidth;
          newHeight = imgHeight;

          // console.log('canvas width', $canvas.width);
          // console.log('image width', imgWidth);

          maxZoomedInLevel = ($canvas.width - 100) / imgWidth;
          // console.log('maxZoomedInLevel', maxZoomedInLevel);

          maxZoomGestureLength = to2Dp(Math.sqrt(Math.pow($canvas.width, 2) + Math.pow($canvas.height, 2)));
          // console.log('maxZoomGestureLength', maxZoomGestureLength);
          
          
          updateDragBounds();

        };
        
        // ---------- PRIVATE FUNCTIONS ---------- //
        function moveImage(x, y) {        

          if ((x < minXPos) || (x > maxXPos) || (y < minYPos) || (y > maxYPos)) {
            // new position is out of bounds, would show gutter
            return;
          }
          targetX = x;
          targetY = y;
          ctx.clearRect(0, 0, $canvas.width, $canvas.height);
          ctx.drawImage($img, x, y, newWidth, newHeight);
        }

        function to2Dp(val) {
          return Math.round(val * 1000) / 1000;
        }

        function updateDragBounds() {
          // $img.width, $canvas.width, zoom
          
          minXPos = $canvas.width - ($img.width * zoom) - 50;
          minYPos = $canvas.height - ($img.height * zoom) - 50;
          
        }
        
        function zoomImage(val) {

          if (!val) {
            return;
          }
          

          var proposedZoomLevel = to2Dp(zoom + val);        

          if ((proposedZoomLevel < maxZoomedInLevel) || (proposedZoomLevel > maxZoomedOutLevel)) {
            // image wont fill whole canvas
            // or image is too far zoomed in, it's gonna get pretty pixelated!
            return;
          }

          zoom = proposedZoomLevel;
          // console.log('zoom', zoom);
          
          updateDragBounds();

          //  do image position adjustments so we don't see any gutter
          if (proposedZoomLevel === maxZoomedInLevel) {
            // image fills canvas perfectly, let's center it
            ctx.clearRect(0, 0, $canvas.width, $canvas.height);
            ctx.drawImage($img, 0, 0, $canvas.width, $canvas.height);
            return;
          }

          newWidth = $img.width * zoom;
          newHeight = $img.height * zoom;

          var newXPos = currentX * zoom;
          var newYPos = currentY * zoom;        

          // check if we've exposed the gutter
          if (newXPos < minXPos) {
            newXPos = minXPos;
          } else if (newXPos > maxXPos) {
            newXPos = maxXPos;
          }

          if (newYPos < minYPos) {
            newYPos = minYPos;
          } else if (newYPos > maxYPos) {
            newYPos = maxYPos;
          }        

          // check if image is still going to fit the bounds of the box
          ctx.clearRect(0, 0, $canvas.width, $canvas.height);
          ctx.drawImage($img, newXPos, newYPos, newWidth, newHeight);
        }
        
        function calcZoomLevel(diffX, diffY) {
          
          var hyp = Math.sqrt( Math.pow(diffX, 2) + Math.pow(diffY, 2) );        
          var zoomGestureRatio = to2Dp(hyp / maxZoomGestureLength);        
          var newZoomDiff = to2Dp((maxZoomedOutLevel - maxZoomedInLevel) * zoomGestureRatio * zoomWeight);
          return diffX > 0 ? -newZoomDiff : newZoomDiff;
        }
        
        // ---------- SCOPE FUNCTIONS ---------- //

        $finalImg.onload = function() {
          var tempCanvas = document.createElement('canvas');
          tempCanvas.width = this.width - 100;
          tempCanvas.height = this.height - 100;
          tempCanvas.style.display = 'none';
          // console.log('tempCanvas.width', tempCanvas.width, tempCanvas.height);

          var tempCanvasContext = tempCanvas.getContext('2d');
          // console.log('tempCanvasContext', tempCanvasContext);
          tempCanvasContext.drawImage($finalImg, -50, -50);

          document.getElementsByClassName('section-final')[0].appendChild(tempCanvas);
          scope.result = tempCanvas.toDataURL();
      scope.$apply();
      reset();
        };
    
    scope.saveimg = function(){
      document.getElementById("ClientID").value = clientid;
      scope.id = clientid;
      var profiledata = {'image': document.getElementById("final-cropped-image").src, 'id': scope.id };
        document.getElementById("ld").style.display = "block";
      $http.post('ClientsController/submitpersonalprofilepicture',profiledata).success(function($data){   
          document.getElementById("button_save").style.display = "none";
        document.getElementById("ld").style.display = "none";       
      });     
    }

        scope.crop = function() {
          scope.croppedDataUri = $canvas.toDataURL();
      scope.step = 3;
      document.getElementById("ld").style.display = "none";    
        };
        
        scope.onCanvasMouseUp = function(e) {

          if (!dragging) {
            return;
          }

          e.preventDefault();
          e.stopPropagation(); // if event was on canvas, stop it propagating up

          startX = 0;
          startY = 0;
          dragging = false;
          currentX = targetX;
          currentY = targetY;

          removeBodyEventListener('mouseup', scope.onCanvasMouseUp);
          removeBodyEventListener('touchend', scope.onCanvasMouseUp);
          removeBodyEventListener('mousemove', scope.onCanvasMouseMove);
          removeBodyEventListener('touchmove', scope.onCanvasMouseMove);
        };

        $canvas.addEventListener('touchend', scope.onCanvasMouseUp, false);

        scope.onCanvasMouseDown = function(e) {
          startX = e.type === 'touchstart' ? e.changedTouches[0].clientX : e.clientX;
          startY = e.type === 'touchstart' ? e.changedTouches[0].clientY : e.clientY;
          zooming = false;
          dragging = true;          

          addBodyEventListener('mouseup', scope.onCanvasMouseUp);
          addBodyEventListener('mousemove', scope.onCanvasMouseMove);
        };

        $canvas.addEventListener('touchstart', scope.onCanvasMouseDown, false);

        function addBodyEventListener(eventName, func) {
          document.documentElement.addEventListener(eventName, func, false);
        }

        function removeBodyEventListener(eventName, func) {
          document.documentElement.removeEventListener(eventName, func);
        }
        
        scope.onHandleMouseDown = function(e) {          

          e.preventDefault();
          e.stopPropagation(); // if event was on handle, stop it propagating up

          startX = lastHandleX = (e.type === 'touchstart') ? e.changedTouches[0].clientX : e.clientX;
          startY = lastHandleY = (e.type === 'touchstart') ? e.changedTouches[0].clientY : e.clientY;
          dragging = false;
          zooming = true;

          addBodyEventListener('mouseup', scope.onHandleMouseUp);
          addBodyEventListener('touchend', scope.onHandleMouseUp);
          addBodyEventListener('mousemove', scope.onHandleMouseMove);
          addBodyEventListener('touchmove', scope.onHandleMouseMove);
        };

        $handle.addEventListener('touchstart', scope.onHandleMouseDown, false);
        
        scope.onHandleMouseUp = function(e) {

          // this is applied on the whole section so check we're zooming
          if (!zooming) {
            return;
          }

          e.preventDefault();
          e.stopPropagation(); // if event was on canvas, stop it propagating up

          startX = 0;
          startY = 0;
          zooming = false;
          currentX = targetX;
          currentY = targetY;        

          removeBodyEventListener('mouseup', scope.onHandleMouseUp);
          removeBodyEventListener('touchend', scope.onHandleMouseUp);
          removeBodyEventListener('mousemove', scope.onHandleMouseMove);
          removeBodyEventListener('touchmove', scope.onHandleMouseMove);
        };

        $handle.addEventListener('touchend', scope.onHandleMouseUp, false);

        
        scope.onCanvasMouseMove = function(e) {

          e.preventDefault();
          e.stopPropagation();
          
          if (!dragging) {
            return;
          }

          
                  
          var diffX = startX - ((e.type === 'touchmove') ? e.changedTouches[0].clientX : e.clientX); // how far mouse has moved in current drag
          var diffY = startY - ((e.type === 'touchmove') ? e.changedTouches[0].clientY : e.clientY); // how far mouse has moved in current drag
          /*targetX = currentX - diffX; // desired new X position
          targetY = currentY - diffY; // desired new X position*/
          
          moveImage(currentX - diffX, currentY - diffY);
          
        };

        $canvas.addEventListener('touchmove', scope.onCanvasMouseMove, false);


        var lastHandleX = null, lastHandleY = null;
        
        scope.onHandleMouseMove = function(e) {

          e.stopPropagation();
          e.preventDefault();
          
          // this is applied on the whole section so check we're zooming
          if (!zooming) {
            return false;
          }
                  
          var diffX = lastHandleX - ((e.type === 'touchmove') ? e.changedTouches[0].clientX : e.clientX); // how far mouse has moved in current drag
          var diffY = lastHandleY - ((e.type === 'touchmove') ? e.changedTouches[0].clientY : e.clientY); // how far mouse has moved in current drag
          
          lastHandleX = (e.type === 'touchmove') ? e.changedTouches[0].clientX : e.clientX;
          lastHandleY = (e.type === 'touchmove') ? e.changedTouches[0].clientY : e.clientY;

          var zoomVal = calcZoomLevel(diffX, diffY);
          zoomImage(zoomVal);
                  
        };

        $handle.addEventListener('touchmove', scope.onHandleMouseMove, false);
        
      }
    };
}]);
app.controller('demoController', demoController);
    demoController.$inject = [];

    function demoController() {
        var vm = this;
        vm.data = 40;
}
app.directive('phoneInput99', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
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
app.filter('tel', function () {
    return function (tel) {

        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});


//define sheduleanController 
app.controller('sheduleanController', function(Page,$scope,$sce,$http){

    Page.setTitle("Shedule An Appointment"); 
    
    //$scope.linkofffi = [];      
    $http.get('ClientsController/sheduleanController/'+clientid).success(function($data){ 
            $scope.response=$data.response;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }     
        //$scope.scheduleanappointment = $sce.trustAsResourceUrl("https://thecreditpros.acuityscheduling.com/schedule.php?appointmentType=category:Client Portal Follow-Up Appointments&first_name="+$data.first_name+"&last_name="+$data.last_name+"&phone="+$data.phone_mobile+"&email="+$data.email+"&field:2703682="+$data.salesforce_id+"");
        $scope.scheduleanappointment = $sce.trustAsResourceUrl("https://thecreditpros.as.me/service?first_name="+$data.first_name+"&last_name="+$data.last_name+"&phone="+$data.phone_mobile+"&email="+$data.email+"&field:2703682="+$data.salesforce_id+"");
   });

});

/* start code for client account status data by using factory data*/
//27 march used for add account status data by using factory data
app.factory('alertClientAccountStatus', function($rootScope, $http) {
    var alertClientAccountStatus = {};
    alertClientAccountStatus.data = {};

    //Gets the list of nuclear weapons
    alertClientAccountStatus.getAcccountStatusData = function() {
        $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
            if(data.clientStatusData.alert_hold_client_enable =='1' && data.clientStatusData.id=='41'){
                alertClientAccountStatus.data.popupCondtion = '1';
            }
            else{
                  alertClientAccountStatus.data.popupCondtion = '0';
            }
            });

        return alertClientAccountStatus.data;
    };
    return alertClientAccountStatus;
});
/*-----------close-----------------------------------------------------------*/

app.filter('toTrusted', function ($sce) {
    return function (value) {
        return $sce.trustAsHtml(value);
    };
});

app.directive('dateofbirthInput', function($filter, $browser) {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, ngModelCtrl) {
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('dob')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('dob')(ngModelCtrl.$viewValue, false));
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

app.filter('dob', function () {
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
        console.log(dob);
    };
});

app.directive('allowedcharsInput', function($filter, $browser) {
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

app.filter('allowedch', function () {
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

/*
Directive to format and validate phone number entered by the user
Restricts numeric input by the user
Model value contains the phone number without any formatting. Ex: 1111111111
View value contains the formatted phone number: Ex: (111) 111-1111
*/
app.directive('phoneInput', function(){
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

    if(unformatted.length == 0)
    {
        valid = true;
        return {formatted: formatted, validated: valid};
    }

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
app.directive('ssn', function(){
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

                console.log(modelValue);

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

/*
Directive to validate a form field by comparing it with another form field

@return
If both form fields' values are equal, returns true
Else, returns false

@params
Use as HTML attribute with value equal to other form field
*/
app.directive('compareTo', function() {
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
Added factory to get more articles on load more
*/
app.factory('article', function($resource) {
	return $resource('/desiredArticles/:desiredArticles/:start', {}, {
		// Declaration of custom action that should extend the default set of resource actions
		query: {
			isArray: true,
			cache: false
		}
	});
});

/* added directive for footer template */
app.directive("footerCopyright", function() {
  return {
    restrict: 'A',
    templateUrl: '/templates/footer_copyright.html',
    scope: true,
    transclude : false
  };
});

/* Limit content */
app.filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                  //Also remove . and , so its gives a cleaner result.
                  if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                  }
                  value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
});

/*pastduestatus 28-oct-2017*/
app.directive('modal', function(){
        return {
            template: '<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true"><div class="modal-dialog modal-md"><div class="modal-content" ng-transclude><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">Modal title</h4></div></div></div></div>', 
            restrict: 'E',
            transclude: true,
            replace:true,
            scope:{visible:'=', onSown:'&', onHide:'&'},   
            link:function postLink(scope, element, attrs){
                //console.log(attrs);
                $(element).modal({
                    show: false, 
                    keyboard: false, 
                    backdrop: 'static',
                });
                
                scope.$watch(function(){return scope.visible;}, function(value){
                    
                    if(value == true){
                        $(element).modal('show');
                    }else{
                        $(element).modal('hide');
                    }
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                  });
                });
                
                $(element).on('shown.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onSown({});
                  });
                });

                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                  });
                });
                
                $(element).on('hidden.bs.modal', function(){
                  scope.$apply(function(){
                      scope.onHide({});
                  });
                });
            }
        };
    }
);

app.directive('modalHeader', function(){
    return {
        template:'<div class="modal-header"><h3 class="modal-title">{{title}}</h3></div>',
        replace:true,
        restrict: 'E',
        scope: {title:'@'}
    };
});

app.directive('modalBody', function(){
    return {
        template:'<div class="modal-body" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});

app.directive('modalFooter', function(){
    return {
        template:'<div class="modal-footer" ng-transclude></div>',
        replace:true,
        restrict: 'E',
        transclude: true
    };
});

app.filter('escape', function() {
  return window.encodeURIComponent;
});

app.config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
}]);