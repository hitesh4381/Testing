


/*Third Step Module Data Get and Submit Third Step Record*/
  // Default option for messaging // 03-03-2017
  /* this function used for get all client data and interview process data */
  /* get client steps*/
  /*submit third form data*/
appinterview.controller('interviewControllerAgreement', function ($scope, $http, $routeParams,$timeout, $location, $localStorage, $filter,Appcues,$window) {

  $scope.step6Value = false;
  $scope.showLoader(0);
   Appcues.getResonse();
    // alert($localStorage.LocalMessage);
    $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
        {
          //console.log(view_as_client_data);
          if(view_as_client_data.id != view_as_client_data.original_id)
          {
            //if admin, then remove previous button
            $location.path('/step2');      
          }
          else
          {
            if(view_as_client_data.required_execution == 'Yes')
            {
              if(view_as_client_data.other_agrement_count > 0){

                // $scope.step6Value = true;
              }
            }
            else
            {
              $location.path('/step2');  
            }
            
          }
        });
    $scope.url =global_base_url;
    /* this function used for get all client data and interview process data */
    $http.get('ClientsController/client_getinfo_verify_interview/' + clientid).success(function (data) {
      if (data.response == 0) {
        alert('you have been logout12');
        location.href = global_base_url + 'logout';
      }
      $scope.clientdata = data.clientRecord;
      $scope.clientdata.tu_authflag = data.clientRecord.tu_authflag;
      $localStorage.first_name = $scope.clientdata.first_name;
      $scope.hideLoader();
        $http.get('ClientsController/check_client_step/' + clientid).success(function (data) {
        if(data.verifySteps == 1)
        {
          $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
                //
                //alert(data.response);
                if(data.response==1){
                  $scope.appliedClassTu = function(loaderVal){
                    if(loaderVal){
                      return 'modal-backdrop in';
                    }
                    else{
                     return  'modal-backdrop';
                   }
                 }
                 $scope.clientVerifySteps = data.verifySteps;
                  if(0 == $scope.clientVerifySteps.step_4 || 1 == $localStorage.firstUpdate)
                  {
                      $scope.hideLoader();
                     //$location.path('/step1');
                     //$scope.hideLoader(); //comment on 31-07-2017
                  }
                  else if(0 == $scope.clientVerifySteps.step_1)
                  {
                    //$scope.showLoader(20);
                    $location.path('/step2');
                  }
                  else if(0 == $scope.clientVerifySteps.step_2)
                   {  $scope.showLoader(40);
                     $location.path('/step3');
                   }
                   else if(0 == $scope.clientVerifySteps.step_5)
                   {
                    $scope.showLoader(60, "{{first_name}}, we\'re generating your Credit Report Authentication questions.<br>This may take up to 30 seconds.");
                    $location.path('/step4');
                  }
                  else if(0 == $scope.clientVerifySteps.step_6)
                  {
                    $scope.showLoader(80);
                    $location.path('/step5');
                  }
                 }
               });
        }
      });
    });
    
   // console.log( $scope.clientVerifySteps);
    $scope.clientdata = [];
    $scope.interviewdata = 1;


    /* get client steps*/
   //  $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
   //    if(data.response==1){
   //     $scope.clientVerifySteps = data.verifySteps;
   //   }
   // });

    /*this function used for get all item  of client */
    $http.get('ClientsController/clientAgreementInterview/'+clientid).success(function($data){
      $scope.interviewdata = 2;
      $scope.client_agreementid    = $data.client_agreement_id;
      $scope.getDateAgreement    = $data.getDate;
      $scope.CurrentDate = $filter('date')(new Date(), 'hh:mm:ss a');
      $scope.getTimeAgreement    = $data.getTime;
      $scope.reAssignFlag = $data.reassign_flag;        
              
      var tmp = $data.incompleteform.replace(/(?:\r\n|\r|\n)/g, '');
      $('#hmlId').html(tmp);
         //
        if( -1 == $data.incompleteform.indexOf("signature_box"))
        {
          $scope.agreementExists = "0";
        }
        else{
          $scope.agreementExists = "1";
        }

        $scope.emptyAgreement = false;

        $scope.incompleteform = tmp;
        if($scope.incompleteform && $scope.incompleteform!=''){
           $scope.incmpleteAgreementMsg = true;
           $scope.modeladd1 = {
            display: "block"};

        }
        else
        {
          if($scope.client_agreement_id && $scope.client_agreement_id!=null)
          {
            $scope.incmpleteAgreementMsg = false;
            $http.get('ClientsController/getLatestSignedAgreement/'+clientid).success(function($data){
              $scope.latestagreement = $data.latestagreement;
              $scope.reAssignFlag = $data.reassign_flag;  
              if($scope.latestagreement == null)
              {
                  $scope.blankAgreement = true;
              }
              else{
                var tmp1 = $data.latestagreement.replace(/(?:\r\n|\r|\n)/g, '');
                $('#hmlId1').html(tmp1);
                $("#signature_box_wrapper").hide();
                  if($data.terms_and_conditions_checked ==1)
                  {
                     $scope.checked2 =    true ;  
                  } else{
                      $scope.checked2 =    false ;  
                  }
              }
              if($scope.latestagreement && $scope.latestagreement){
                 $scope.blankAgreement = false;
                 $scope.lagreementMsg = true;
                 $scope.someValue=1;
                 $scope.modeladd = {
                  display: "block",
                }
              }
              else{
                $scope.lagreementMsg = false;
              }
              $scope.appliedClass = function(myObj) {
                if (myObj) {
                  return "interviever_agreement_section showimg";
                } else {
                  return "interviever_agreement_section"; // Or even "", which won't add any additional classes to the element
                }
              }
            });
          }
          else
          {
            $location.path('/step2'); /*move on next second step */
            // $scope.emptyAgreement = true;
            // $timeout(function(){
            //   $scope.emptyAgreement = false;
            //   $location.path('/step2'); /*move on next second step */
            // }, 3000);
          }
        }
    });

    $scope.submitFourthFormData = function (form)
    {
      $scope.showLoader(20);
      $scope.clientdata.tu_authflag=0;
      if (form.$invalid) {
        return;
      }
      else {
              // check if first name is set in local storage
              if(!$localStorage.first_name)
              {
                $localStorage.first_name = $scope.clientdata.first_name;
              }
              //  var interview_agreement_terms = $scope.clientdata.interview_agreement_terms;

               //$scope.checked =     $scope.clientdata.interview_agreement_terms ;
              var interview_agreement_terms =  $('#terms').val();

              var step_4 = $('#stepFourth').val();
              var agreementid = $('#agreementid').val();
              $('#hmlId').find('canvas').remove();
              $('#hmlId').find('clear_signatiure').remove();
              $('#hmlId').find('table').removeAttr("width").attr('width', '100%');
              $('#hmlId').find('td').removeAttr("width") ;
              var formDataAgreement = $('#hmlId').html();
              formDataAgreement = formDataAgreement.replace(/(?:\r\n|\r|\n)/g,'');
              var arrData = {};
              var arrData = {interview_agreement_terms: interview_agreement_terms, step_4: 4};
              $http.post('ClientsController/submitClientDataInterviewFourthStep/' + clientid, arrData).success(function ($data) {
                if ($data.success == 1) {
                     var arrDataimg = {};
                     var arrDataimg = {imagedata:formDataAgreement};

                     // Does not wait for the response
                     // $http.post('ClientsController/upload_agreement_signature/' + clientid, arrDataimg);
                     var arrDataimgform = [];
                     var arrDataimgform = {agreement_data: formDataAgreement , terms_and_conditions_checked : interview_agreement_terms  };
                     if(agreementid == '' || typeof(agreementid) == 'undefined' ) {
                       agreementid = 0;
                     }

                     // Does not wait for the response                    
                    $http.post('ClientsController/edit_client_agreement/' + agreementid + '/' + clientid, arrDataimgform).success(function (response){
                       if(response == 2)
                       {
                         $location.path('/interview_successfull');
                       }
                       else
                       {
                         $location.path('/step2'); /*move on next second step */
                       }
                    });
                     /* GTM Datalayer */
                        /*var dataLayer = window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                          clientAccNo: $scope.clientdata.id,
                          clientEmail: $scope.clientdata.email,
                          event: 'Client_Interviewer_Step1'
                        });*/
                    
                  } else {
                    $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                    <button type="button" class="close close-sm" data-dismiss="alert">\
                    <i class="fa fa-times"></i>\
                    </button>\
                    <strong>Ooops!</strong> Data Saving Failed.\
                    </div>';
                  }
                });
            }
          }
          $scope.logout = function () {
           $localStorage.firstUpdate = 2;
         }
         $scope.appliedClassTu = function(loaderVal){
          if(loaderVal){
            return 'modal-backdrop in';
          }
          else{
           return  'modal-backdrop';
         }
       }
      //  $scope.goToPrevStep = function(){
      //   $scope.prev_step_4 = true;
      //   $scope.showLoader(20);
      //   $location.path('/step2');
      // };
});

//client interview verification controller all functionality interview here............//
/*First Step Module Data Get and Submit First Step Record*/
appinterview.controller('interviewControllerPersonalInfo', function ($scope, $http, $compile, $routeParams, $location,$timeout,$localStorage,Appcues,$window) {
  // $localStorage.$reset();
  // alert($localStorage.firstUpdate);

  $scope.showLoader(20);
  localStorage.setItem('stepFlag',0);
   Appcues.getResonse();
  // Regular expression used to validate email address
  $scope.email_regex = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

  $scope.clientdata = [];
  $scope.myPrompt = "Input your phone number here!";
  /* this function used for get all client data and interview process data */
  $http.get('ClientsController/client_getinfo_verify_interview/' + clientid).success(function (data) {
    if (data.response == 0) {
      alert('you have been logout123');
      location.href = global_base_url + 'logout';
    }
    if(data.response==1)
    {
      $scope.clientdata = data.clientRecord;
      console.log($scope.clientdata.ssn_);

      // Save the first name in local storage
      $localStorage.first_name = $scope.clientdata.first_name;
      //Date fo birth fix
      var dob = $scope.clientdata.dob;
      var check_if_exists = dob.search('-');
      if(check_if_exists != '-1'){
        var dob_arr = $scope.clientdata.dob.split('-');
        dob =  dob_arr[1] + dob_arr[2] +  dob_arr[0];
        // dob = dob.replace(/-/g, "");
      } else {
        var dob_arr = $scope.clientdata.dob.split('/');
        dob =  dob_arr[1] + dob_arr[2] +  dob_arr[0];
        // dob = dob.replace(/\//g, "");

      }
      $scope.clientdata.dob = dob;
      if($scope.clientdata.dob == '00-00-0000' || $scope.clientdata.dob == '00/00/0000' || $scope.clientdata.dob == '00000000'){
        $scope.clientdata.dob = '';
      }
      // $scope.ssn = $scope.clientdata.phone_work;
      $scope.phone_mobile = $scope.clientdata.phone_mobile;
    }
    $scope.step6Value = false;
        $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
        {
          //console.log(view_as_client_data);
          if(view_as_client_data.id != view_as_client_data.original_id)
          {
            //if admin, then remove previous button
            $scope.personalPreviousStatus = false;   
            $scope.stepCheckFunction();   
          }
          else
          {

            if(view_as_client_data.required_execution == 'Yes')
            {
              $scope.personalPreviousStatus = true;
              if(view_as_client_data.other_agrement_count > 0){                
                // $scope.step6Value = true;
              }
            }
            else
            {
              $scope.personalPreviousStatus = false;
              $scope.stepCheckFunction();
            }
          }
        });
        $scope.hideLoader();
      });

  $scope.stepCheckFunction = function()
  {
          $http.get('ClientsController/check_client_step/' + clientid).success(function (data) {
            if(data.verifySteps == 1)
            {
              //console.log(data.verifySteps);
              $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
                    //
                    //alert(data.response);
                    if(data.response==1){
                      $scope.appliedClassTu = function(loaderVal){
                        if(loaderVal){
                          return 'modal-backdrop in';
                        }
                        else{
                         return  'modal-backdrop';
                       }
                     }
                     //console.log(data.verifySteps);
                     //console.log($localStorage.secondUpdate);
                     $scope.clientVerifySteps = data.verifySteps;
                      if(0 == parseInt($scope.clientVerifySteps.step_1)  || 1 == $localStorage.secondUpdate)
                      {
                        // $scope.showLoader(20);
                        // $location.path('/step2');
                      }
                      else if(0 == parseInt($scope.clientVerifySteps.step_2))
                       {  $scope.showLoader(40);
                         $location.path('/step3');
                       }
                       else if(0 == parseInt($scope.clientVerifySteps.step_5))
                       {
                        $scope.showLoader(60, "{{first_name}}, we\'re generating your Credit Report Authentication questions.<br>This may take up to 30 seconds.");
                        $location.path('/step4');
                      }
                      else if(0 == parseInt($scope.clientVerifySteps.step_6))
                      {
                        $scope.showLoader(80);
                        $location.path('/step5');
                      }
                     }
                   });
            }
          });
  }

  /*to check whether view as a client by admin or not*/
  //$scope.personalPreviousStatus = true;
  // $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
  // {
  //   //console.log(view_as_client_data);
  //   if(view_as_client_data.id != view_as_client_data.original_id)
  //   {
  //     //if admin, then remove previous button
  //     $scope.personalPreviousStatus = false;   
  //     $scope.stepCheckFunction();   
  //   }
  //   else
  //   {
  //     if(view_as_client_data.required_execution == 'Yes')
  //     {
  //         $scope.personalPreviousStatus = true;
  //     }
  //     else
  //     {
  //       $scope.personalPreviousStatus = false;
  //       $scope.stepCheckFunction();
  //     }
  //   }
  // });
  // $scope.$watch('personalPreviousStatus',function(){
  //   if($scope.personalPreviousStatus == false)
  //   {
  //     $scope.stepCheckFunction();
  //   }
  // });
  //console.log($scope.personalPreviousStatus);
  /* get client steps*/
        $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
          if(data.response==1){
           $scope.clientVerifySteps = data.verifySteps;
           $scope.hideLoader();
         }
        });

        /*this function used for submit firstForm data*/
        $scope.submitFirstFormData = function (formValidated)
        {
        $scope.errormsg_forphone = false;
        if (formValidated) {
          // Disable the submit button
        $scope.sbtn = true;
        // Show the loader screen
        $scope.showLoader(40);

              var first_name = $scope.clientdata.first_name;
              var last_name = $scope.clientdata.last_name;
              var middle_name = $scope.clientdata.middle_name;
              var suffix = $("#suffix").val();
              var email = $scope.clientdata.email;
              var password = $scope.password;
              var ssn_pre = $scope.clientdata.ssn;
              var ssn = ssn_pre.trim();
              var dob = $("#dob").val();
              var repassword = $("#repassword").val();
              // Convert dob format to MySQL date format
              var dobArr = dob.split('/');
              dob = dobArr[2] + '-' + dobArr[0] + '-' + dobArr[1];

              var phone_mobile = $('#phone_mobile').val();
              var step_1 = $('#stepFirst').val();
              var arrData = {};
              var arrData = {first_name: first_name, middle_name: middle_name, last_name: last_name, suffix: suffix, ssn: ssn, dob: dob, email: email, phone_mobile: phone_mobile, step_1: step_1,password:password, repassword : repassword};
              //
              $http.post('ClientsController/submitClientDataInterviewFirstStep/' + clientid, arrData).success(function ($data) {
                //
                $scope.formsumitted = false;
                if ($data.success == 0) {

                    html = '<div class="alert alert-danger fade in"><strong>';
                  
                    for(var i = 0; i < $data.message.length; i++)
                    {
                      html += '' + $data.message[i] + '';
                    }
                    html += "</strong></div>";
                    $scope.server_errors = html;
                    $scope.server_returned_errors = true;

                    $timeout(function(){
                      $scope.server_returned_errors = false;
                    }, 3000);

                      // Enable the submit button
                      $scope.sbtn = false;
                      $scope.hideLoader();
                      return false;
                    }
                    if ($data.success == 1) {
                    //
                    $localStorage.first_name = first_name;
                    localStorage.setItem('stepFlag',1);
                    //$localStorage.stepFlag = 1;
                    //console.log($localStorage.stepFlag);
                    /* GTM Datalayer */
                      /*var dataLayer = window.dataLayer = window.dataLayer || [];
                      dataLayer.push({
                        clientAccNo: $scope.clientdata.id,
                        clientName: first_name+' '+last_name,
                        clientEmail: email,
                        clientStartingPlan: $scope.clientdata.name,
                        event: 'Client_Interviewer_Step2'
                      });*/

                    $location.path('/step3'); /* move on next second step */
                  } else {
                    //
                    $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                    <button type="button" class="close close-sm" data-dismiss="alert">\
                    <i class="fa fa-times"></i>\
                    </button>\
                    <strong>Ooops!</strong>Data Saving Failed.\
                    </div>';
                    $scope.hideLoader();
                      // Enable the submit button
                      $scope.sbtn = false;
                    }
                  });
            }
            else
            {
              // Show validation messages of all fields that have errors
              angular.forEach($scope.formone.$error, function(errorType) {
                angular.forEach(errorType, function(field) {
                  field.$setDirty();
                });
              });
            }
          }
          $scope.logout = function () {
           $localStorage.firstUpdate = 2;
           $localStorage.secondUpdate = 2;
         }

      //filter for Digits only for SSN on step One
      $scope.filterValue = function($event){
        if(isNaN(String.fromCharCode($event.keyCode))){
          $event.preventDefault();
        }
      };

       $scope.goToPrevStep = function(){
        $localStorage.firstUpdate = 1;
        $scope.prev_step_2 = true;
        $localStorage.secondUpdate = 2;               
        $scope.showLoader(0);
        $location.path('/step1');

        /*$scope.showLoader(0);
        $location.path('/step1');*/    //commented on 31-07-2017
      };
});

/*Second Step Module Data Get and Submit Second Step Record*/
appinterview.controller('interviewControllerAddress', function ($scope, $http, $routeParams, $location, $timeout, $localStorage,Appcues,$window) {
  $scope.secondbtn = true;
  Appcues.getResonse();
  $scope.stepFlag = 0;
  // Hide server error message until a request fails
  $scope.serverError = false;

  $scope.step6Value = false;
    $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
    {
      //console.log(view_as_client_data);
      if(view_as_client_data.id != view_as_client_data.original_id)
      {
         //
      }
      else
      {

        if(view_as_client_data.required_execution == 'Yes')
        {           
          if(view_as_client_data.other_agrement_count > 0){  
            // $scope.step6Value = true;
          }
        }
        else
        {
          //
        }
      }
    });   

  // Zipcode is invalid until verified once
  $scope.validZipcode = false;
  $scope.showLoader(40);
  $scope.clientdata = [];
  //console.log($scope.clientdata);
  $scope.check=false;

  $scope.ignore_street = 0;

   /* added to check checkbox staus   */
  $scope.checkfun = function()
  {
    // alert($scope.check);
    //$scope.check = !$scope.check;
    if($scope.check)
    {
      $scope.clientdata.mailing_zipcode = $scope.clientdata.zipcode;
      $scope.clientdata.mailing_address_one = $scope.clientdata.address_one;
      $scope.clientdata.mailing_city = $scope.clientdata.city;
      $scope.clientdata.mailing_state = $scope.clientdata.state;
      
      $scope.mailing_state_short = $scope.billing_state_short;

      if($scope.clientdata.zipcode.length > 4)
      {
          $scope.loaderm = false;
          $scope.validZipcodem = true;
      }
      $scope.hide_mailing = false;
    }else{
        $scope.hide_mailing = true;
    }
  }

  //function called on changing value of address one and zip codes, to check billing and mailing address are same or not
  $scope.check_same_as_billing_add1 = function(){ 
      if($('#address').val() != $('#mailing_address').val() || $('#zipcode').val() != $('#mailing_zipcode').val() || $('#city').val() != $('#mailing_city').val() || $('#state').val() != $('#mailing_state').val() || $('#billing_state_short').val() != $('#mailing_state_short').val())
      {
         var is_chk = $scope.check;
         if(is_chk==true){  
            $scope.clientdata.mailing_address_one = $scope.clientdata.address_one;
            $scope.clientdata.mailing_zipcode = $scope.clientdata.zipcode;
            $scope.clientdata.mailing_city = $scope.clientdata.city;
            $scope.clientdata.mailing_state = $scope.clientdata.state;  
            $scope.check = true;
            $scope.hide_mailing = false;
         }else if(is_chk==false){
            $scope.check = false;
            $scope.hide_mailing = true;
         } 

      }

      //console.log($('#address').val() +'---'+ $('#mailing_address').val() +'---'+ $('#zipcode').val() +'---'+ $('#mailing_zipcode').val() +'---'+ $('#city').val() +'---'+ $('#mailing_city').val() +'---'+ $('#state').val() +'---'+ $('#mailing_state').val() +'---'+ $('#billing_state_short').val() +'---'+ $('#mailing_state_short').val());

      if($('#address').val() == $('#mailing_address').val() && $('#zipcode').val() == $('#mailing_zipcode').val() && $('#city').val() == $('#mailing_city').val() && $('#state').val() == $('#mailing_state').val() && $('#billing_state_short').val() == $('#mailing_state_short').val())
      {

         var is_chk = $scope.check;
         if(is_chk==true){ 
            $scope.clientdata.mailing_address_one = $scope.clientdata.address_one;
            $scope.clientdata.mailing_zipcode = $scope.clientdata.zipcode;
            $scope.clientdata.mailing_city = $scope.clientdata.city;
            $scope.clientdata.mailing_state = $scope.clientdata.state; 
            $scope.check = true;
            $scope.hide_mailing = false; 
         }else if(is_chk == false){  
            $scope.check = true;
            $scope.hide_mailing = false;
         }

      }
  } 

  //function called on changing value of address one and zip codes, to check billing and mailing address are same or not
  $scope.check_same_as_billing_add = function(){ 
      if($('#address').val() != $('#mailing_address').val() || $('#zipcode').val() != $('#mailing_zipcode').val() || $('#city').val() != $('#mailing_city').val() || $('#state').val() != $('#mailing_state').val() || $('#billing_state_short').val() != $('#mailing_state_short').val())
      { 
          if($scope.check==true){
            $scope.clientdata.mailing_address_one = $scope.clientdata.address_one;
          } 
      } 
      //console.log($('#address').val() +'---'+ $('#mailing_address').val() +'---'+ $('#zipcode').val() +'---'+ $('#mailing_zipcode').val() +'---'+ $('#city').val() +'---'+ $('#mailing_city').val() +'---'+ $('#state').val() +'---'+ $('#mailing_state').val() +'---'+ $('#billing_state_short').val() +'---'+ $('#mailing_state_short').val());
      if($('#address').val() == $('#mailing_address').val() && $('#zipcode').val() == $('#mailing_zipcode').val() && $('#city').val() == $('#mailing_city').val() && $('#state').val() == $('#mailing_state').val() && $('#billing_state_short').val() == $('#mailing_state_short').val())
      {
         if($scope.check==true){
            $scope.clientdata.mailing_address_one = $scope.clientdata.address_one;
         } 
      }
  }

  

  $scope.url =global_base_url;/*use for move on previous step */
  /* this function used for get all client data and interview process data */
  $http.get('ClientsController/client_getinfo_verify_interview/' + clientid).success(function (data) {
    if (data.response == 0) {
      alert('you have been logout456');
      location.href = global_base_url + 'logout';
    }

    $scope.ignore_street = 0;

    $scope.clientdata = data.clientRecord;
    $scope.stepFlag = localStorage.getItem('stepFlag');
    //console.log(localStorage.getItem('stepFlag'));
    localStorage.setItem('stepFlag',0);
    // If address is already present, verify it
    if($scope.clientdata.address_one !== '' && $scope.clientdata.zipcode !== '')
    {
      $scope.addressverify($scope.clientdata.address_one, $scope.clientdata.city, $scope.clientdata.state, $scope.clientdata.zipcode, $scope.clientdata.mailing_address_one, $scope.clientdata.mailing_city, $scope.clientdata.mailing_state, $scope.clientdata.mailing_zipcode);
    }


    if( ($scope.clientdata.address_one=='' && $scope.clientdata.city=='' 
      && $scope.clientdata.state=='' 
      && $scope.clientdata.zipcode=='')){
       $scope.check = true;
       $scope.hide_mailing = false;
    }

    var c = $scope.clientdata;  
    if( (c.zipcode!='' || c.address_ones!='') && (c.mailing_address_one=='' && c.mailing_city=='' && c.mailing_state=='' && c.mailing_zipcode=='') ){
        $scope.clientdata.mailing_address_one = $scope.clientdata.address_one;
        $scope.clientdata.mailing_city = $scope.clientdata.city;
        $scope.clientdata.mailing_state = $scope.clientdata.state;
        $scope.clientdata.mailing_zipcode = $scope.clientdata.zipcode;

        $scope.check = true;
        $scope.hide_mailing = false;
    }
    
    if($scope.clientdata.zipcode != ''){
      $scope.getCityStates();
    }
    
    if($scope.clientdata.mailing_zipcode != ''){
      $scope.clonegetCityStates();
    }
    
    $scope.hideLoader();
  })
  /* get client steps*/
  $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
    if(data.response==1){
     $scope.clientVerifySteps = data.verifySteps;
    }
  })
 
  $scope.getCityStates = function() {
      $scope.loader = true;
      $scope.validZipcode = false;

      $scope.clientdata.city = '';
      $scope.clientdata.state = '';

      if($scope.clientdata.zipcode === undefined)
      {
        return false;
      }

      //condition added on 23-11-2017, to call ziptastic for minimum 5 chars long zipcode 
      if($scope.clientdata.zipcode.length < 5)
      {
          return false;
      }

      $http({
        method: 'GET',
        url: '//zip.getziptastic.com/v3/US/' + $scope.clientdata.zipcode,
        headers: {
          'x-key': '764804fe21a421b1f9c1b71802010f1eaca6ef8c'
        }
      })
      .then(
        function(response) {
          $scope.loader = false;
          $scope.clientdata.city = response.data[0].city;
          $scope.clientdata.state = response.data[0].state;
          $scope.billing_state_short = response.data[0].state_short;
          $scope.validZipcode = true;
          $scope.zipnotfound = false;
          $timeout(function() {
              $scope.check_same_as_billing_add1();
          }, 100);
        },
      function(data) {

            $scope.validZipcode = true;
            $scope.loader = false;
            $scope.zipnotfound = true;
            $timeout(function() {
                $scope.check_same_as_billing_add1();
            }, 100);
        }
      );
    };

  /* added method to get city and state on zip for mailing address by mayur on (4-aug-2017) */
  $scope.clonegetCityStates = function() {
      $scope.loaderm = true;  
      $scope.validZipcodem = false;

      $scope.clientdata.mailing_city = '';
      $scope.clientdata.mailing_state = '';

      if($scope.clientdata.mailing_zipcode === undefined)
      {
        return false;
      }

      //condition added on 23-11-2017, to call ziptastic for minimum 5 chars long mailing_zipcode 
      if($scope.clientdata.mailing_zipcode.length < 5)
      {
          return false;
      }

      $http({
        method: 'GET',
        url: '//zip.getziptastic.com/v3/US/' + $scope.clientdata.mailing_zipcode,
        headers: {
          'x-key': '764804fe21a421b1f9c1b71802010f1eaca6ef8c'
        }
      }).then(
        function(response) {
          $scope.loaderm = false;
          $scope.clientdata.mailing_city = response.data[0].city;
          $scope.clientdata.mailing_state = response.data[0].state;
          $scope.mailing_state_short = response.data[0].state_short;
          $scope.validZipcodem = true;
          $scope.zipnotfoundm = false;
          $timeout(function() {
                $scope.check_same_as_billing_add1();
            }, 100);
        },
      function(data) {

            $scope.validZipcodem = true;
            $scope.loaderm = false;
            $scope.zipnotfoundm = true;
            $timeout(function() {
                $scope.check_same_as_billing_add1();
            }, 100);
        }
      );
    };

  /* submit second form data */
  $scope.submitSecondFormData = function (form)
  {
    if(form.$valid)
    {
      // Disable the submit button
      $scope.secondbtn = true;
      $scope.showLoader(60);
      //check if current is verified or not
      var address1 = $("#address").val();
      var city1 = $("#city").val();
      var state1 = $("#state").val();
      var zipcode1 = $("#zipcode").val();
      var address2 = $("#mailing_address").val();
      var city2 = $("#mailing_city").val();
      var state2 = $("#mailing_state").val();
      var country = $("#mailing_country").val();
      var zipcode2 = $("#mailing_zipcode").val();
      var ignore_street = $("#ignore_street").val();

      var arrDataAddress = {};
      var arrDataAddress = {address: address1, mailing_address: address2, city: city1, mailing_city: city2, state: state1, mailing_state: state2, mailing_country: country, zipcode: zipcode1, mailing_zipcode: zipcode2};
      var zip_len = $("#zipcode").val();

      $http.post('ClientsController/verifyStreetAddressClientInterview', arrDataAddress).success(function ($data) {
        if (($data.error == 1 || $data.error == 2 || $data.error == 3) && ignore_street != 1) //extra details added on 30-11-2017
            {
              // Address not verified
              $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
              <button type="button" class="close close-sm" data-dismiss="alert">\
              <i class="fa fa-times"></i>\
              </button>\
              <strong>' + $data.status + '</strong>\
              </div>';
              $scope.formsumitted = false;
              $scope.secondbtn = false;
              $scope.showGreeting = true;
                // Enable the submit button
                $scope.sbtn = true;
                
                $timeout(function() {
                    $scope.showGreeting = false;
                }, 2000);

                // Hide loader
                $scope.hideLoader();

            if($data.error == 1 || $data.error == 3)
            {
                var myelement = angular.element('#proceed_anyway_popup');
                $scope.warning_msg = $data.status;
                myelement.modal('show');
            }
              

                return false;

            }
            else if ($data.error == 0 || ignore_street == 1)
            {
               // Address verified
               $scope.formssubmissionmessage = '<div><div class="alert alert-success fade in">\
               <button type="button" class="close close-sm" data-dismiss="alert">\
               <i class="fa fa-times"></i>\
               </button>\
               <strong>' + $data.status + '</strong>\
               </div>';
               $scope.formsumitted = false;
               $scope.showGreeting = false;
                $scope.secondbtn = true;

                var address_one = $scope.clientdata.address_one;
                var mailing_address_one = $scope.clientdata.mailing_address_one;
                var mailing_city = $scope.clientdata.mailing_city;
                var mailing_state = $scope.mailing_state_short;
                var mailing_zipcode = $scope.clientdata.mailing_zipcode;
                var mailing_country = $('#mailing_country').val();
                var city = $scope.clientdata.city;
                //var city = $('#city').val();
                //alert($('#city').val());
                //var state = $("#final_state").val();
               // var state = $scope.clientdata.state;
                var state = $scope.billing_state_short;
                var zipcode = $scope.clientdata.zipcode;
                var phone_home = $scope.clientdata.phone_home;
                var step_2 = $('#stepSecond').val();
            
            var arrData = {};
            var arrData = {address_one: address_one, mailing_address_one: mailing_address_one, city: city, mailing_city: mailing_city, state: state, mailing_state: mailing_state, mailing_country: mailing_country, zipcode: zipcode, mailing_zipcode: mailing_zipcode, phone_home: phone_home, step_2: step_2};
            $http.post('ClientsController/submitClientDataInterviewSecondStep/' + clientid, arrData).success(function ($data) {
              $scope.ignore_street = 0;
              if ($data.success == 1) {
                    /*--------------------------- */
                        /* GTM Datalayer */
                          /*var dataLayer = window.dataLayer = window.dataLayer || [];
                          dataLayer.push({
                            clientAccNo: $scope.clientdata.id,
                            clientEmail: $scope.clientdata.email,
                            event: 'Client_Interviewer_Step3'
                          });*/
                        $http.get('ClientsController/client_getinfo_verify_interview/' + clientid).success(function (data)  
                          {
                            $scope.clientdata = data.clientRecord;
                            $scope.clientdata.tu_authflag = data.clientRecord.tu_authflag;
                            if($scope.clientdata.tu_authflag==1){

                             $scope.tupermission = true;
                             $scope.tubtn = false;

                             // Proceed directly to the fifth step if TU questions have been authenticated
                              $scope.showLoader(80);
                              $location.path('/step5');

                           }
                           else{
                              $scope.tupermission = false;
                              $scope.tubtn = true;
                              $scope.showLoader(60, "{{first_name}}, we\'re generating your Credit Report Authentication questions.<br>This may take up to 30 seconds.");
                              $location.path('/step4'); /*move on next fifth step */

                           }
                        });



                    /*--------------------*/
                  } else {
                    $scope.ignore_street = 0;
        $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                    <button type="button" class="close close-sm" data-dismiss="alert">\
                    <i class="fa fa-times"></i>\
                    </button>\
                    <strong>Ooops!</strong> Data Saving Failed.\
                    </div>';
                  }
                });
            }
      },
      // Error function for verify address request
      function(response){

        // Hide the loader
        $scope.hideLoader();
        $scope.ignore_street = 0;

        // Show an error message
        $scope.serverError = true;
        $timeout(function(){
          $scope.serverError = false;
        }, 3000);

      }
      );
    }
    else
    {
        $scope.ignore_street = 0;
        // Show validation messages of all fields that have errors
        angular.forEach(form.$error, function(errorType) {
          angular.forEach(errorType, function(field) {
            field.$setDirty();
          });
        });
    }

  }

  /*cancel force submit data*/
  $scope.cancelForceSubmit = function() {
    $scope.ignore_street = 0;
  };

  /*submit data of address form forcefully*/
  $scope.forceSubmitSecondFormData = function(form) {
    $scope.ignore_street = 1;
    
    //submit form_two forcefully, after 2 seconds
    $timeout( function(){
        $scope.submitSecondFormData(form);
    }, 1000 );
    
  };

  /* Address verification for client */
  $scope.addressverify = function (address, city, state, zipcode, mailing_address, mailing_city, mailing_state, mailing_zipcode) {
    $scope.secondbtn = true;
    var address1 = address;
    var city1 = city;
    var state1 = state;
    var zipcode1 = zipcode;
    var address2 = mailing_address;
    var city2 = mailing_city;
    var state2 = mailing_state;
    var zipcode2 = mailing_zipcode;
    var arrDataAddress = {};
    var arrDataAddress = {address: address1, mailing_address: address2, city: city1, mailing_city: city2, state: state1, mailing_state: state2, zipcode: zipcode1, mailing_zipcode: zipcode2};
    var zip_len = $("#zipcode").val();
      //if((zip_len.length) > 4)
      //{
        $http.post('ClientsController/verifyStreetAddressClientInterview', arrDataAddress).success(function ($data) {
            //alert("helllo");
          if ($data.error == 1 || $data.error == 2 || $data.error == 3) { //extra details added on 30-11-2017
              $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
              <button type="button" class="close close-sm" data-dismiss="alert">\
              <i class="fa fa-times"></i>\
              </button>\
              <strong>' + $data.status + '</strong>\
              </div>';
              $scope.formsumitted = false;
              $scope.showGreeting = true;
              $scope.secondbtn = true;
              
              $timeout(function() {
                  $scope.showGreeting = false;
              }, 2000);

                // Hide loader
                $scope.hideLoader();
                return false;
              }
              else if ($data.error == 0) {
                $scope.secondbtn = false;
                $scope.formssubmissionmessage = '<div><div class="alert alert-success fade in">\
                <button type="button" class="close close-sm" data-dismiss="alert">\
                <i class="fa fa-times"></i>\
                </button>\
                <strong>' + $data.status + '</strong>\
                </div>';
                $scope.formsumitted = false;
                $scope.showGreeting = false;
                $scope.secondbtn = false;
                // $timeout(function () {
                //     $scope.showGreeting = false;
                // }, 1000);

                return true;
              }
            },

            // Error handler
            function(response){

                // Hide loader
                $scope.hideLoader();
                return false;
            }
          );
    //}
  };
  $scope.updateFirstStep = function () {
    //$localStorage.firstUpdate = 1;
    // Disable the previous button so that user does not click on it repeatedly
    $scope.prev_btn_2 = true;
    $localStorage.secondUpdate = 1;
    $scope.showLoader(20);
    $location.path('/step2');
    console.log($localStorage.secondUpdate);
  }
  $scope.logout = function () {
    $localStorage.firstUpdate = 2;
    $localStorage.secondUpdate = 2;
  }
});

appinterview.controller('interviewControllerTUAuthentication', function ($scope, $compile, $http, $routeParams, $location, $localStorage,$sessionStorage, $window, $timeout,Appcues,$rootScope) {
  
  $scope.tuRecorderror = '';
  $scope.step6Value = false;  

  resourceType = $location.absUrl().split('/')[3];
  
  /* OTP Logic */

  $scope.methodChange = '0';

  $scope.request = function(obj){

    if(obj == 'Security Questions'){
      $scope.valueChange = 'KBA';      
    }else{
      $scope.valueChange = 'otp';
    }
  }

  $scope.kba = function(obj){
  $scope.otpRequest = false;
  $scope.passcodeRequest = false;
  $scope.kbaRequest = true;
  $scope.otpRequest = 1;
  $scope.kbaRequest = 0;
  $scope.passcodeRequest = 0;
  $scope.showLoader(60,"{{first_name}}, we\'re generating your Credit Report Authentication questions with another methods .<br>This may take up to 30 seconds.");
  $http.get('ClientsController/transunionQues_client/' + clientid + '/OTP/'+resourceType).success(function ($data1) {
    $scope.tuRecord = $data1.tuRecord;

    if($scope.tuRecord.methodChange == 'OTPMETHOD'){
      $scope.methodChange = '1';
    }

    $scope.tuVal = $data1.tuVal;
    // Hide loader again
    $scope.hideLoader();
    });
  }
  /* OTP Logic */

  $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
  {
    //console.log(view_as_client_data);
    if(view_as_client_data.id != view_as_client_data.original_id)
    {
       //
    }
    else
    {

      if(view_as_client_data.required_execution == 'Yes')
      {    
        if(view_as_client_data.other_agrement_count > 0){         
          // $scope.step6Value = true;
        }
      }
      else
      {
        //
      }
    }
  });
  $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (dataresponse) {
    Appcues.getResonse(); 
    /* this function used for get all client data and interview process data */
    if(dataresponse.response==1){
        $scope.clientVerifySteps = dataresponse.verifySteps;
        var tuauthflag = '';
        if($scope.clientVerifySteps.step_1 == 1 && $scope.clientVerifySteps.step_2 == 2)
        {
          $scope.first_name = $localStorage.first_name;
          $scope.showLoader(60, "{{first_name}}, we\'re generating your Credit Report Authentication questions.<br>This may take up to 30 seconds.");
          $scope.loading_questions = true;
          $scope.loading_submit_questions = false;
          $http.get('ClientsController/client_getinfo_verify_interview/' + clientid).success(function (data) {
            if (data.response == 0) {
             alert('you have been logout789');
             location.href = global_base_url + 'logout';
            }
            $scope.clientdata = data.clientRecord;
            tuauthflag = data.clientRecord.tu_authflag;

            if($localStorage.LocalMessage=='yes'){
              // If this step is complete then proceed directly to the next step
              $scope.showLoader(80);
              $location.path('/step5');

            }
            else
            {

              $scope.url =global_base_url;
              if(tuauthflag==0)
              {
                  $scope.transuniondata = [];
                   /*this function used for get all item  of client */

                  // if($rootScope.phone_mobile != 'NULL' && $rootScope.phone_mobile != 'undefined' && $rootScope.phone_mobile != '')
                  // {
                  //   alert('HERE');
                  //   $scope.req = 'OTP';
                    /* OTP Logic */

                    // $scope.otpRequest = 1;
                    // $scope.kbaRequest = 0;
                    // $scope.passcodeRequest = 0;

                    /* OTP Logic */
                  // }else
                  // {
                    // alert('HERE1');
                    $scope.req = 'KBA';
                    /* OTP Logic */

                    $scope.otpRequest = 0;
                    $scope.kbaRequest = 1;
                    $scope.passcodeRequest = 0;

                    /* OTP Logic */
                  // }

                  $http.get('ClientsController/transunionQues_client/' + clientid + '/'+ $scope.req+'/'+resourceType).success(function ($data) {
                       //$timeout(function(){
                        $scope.tuRecord = $data.tuRecord;
                        $scope.source = $data.source;

                        if($scope.tuRecord.methodChange == 'OTPMETHOD'){
                          $scope.methodChange = '1';
                        }

                        $scope.tuVal = $data.tuVal;
                        $scope.hideLoader();
                      //}, 3000);
                        //check if questions are not coming and if error occure then redirect to next step after five seconds
                    if($data.tuRecord.jsondata.hasOwnProperty("error"))
                    {
                      if($data.tuRecord.jsondata.error == 'Action Code [D] Target Group [Fail Verification]'){
                        $data.tuRecord.jsondata.error = 'We were able to locate your credit file, but key personal information you provided did not fully match the information on your credit file, or your file may not be eligible for Identity Verification. <br/> You may want to try again using the exact SSN, name, address, and other personal information that creditors would have in their files for your credit account(s) or credit applications.';
                      }else if($data.tuRecord.jsondata.error == 'Action Code [D] Target Group [No Data]'){
                        $data.tuRecord.jsondata.error = 'We were able to locate your credit file, but it did not contain sufficient recent credit activity for us to generate questions to confirm your identity. <br/> If you do not have recently active credit, you may want to try again at a time when your credit file shows recent charge or payment activity. <br/> If you believe your credit file has multiple recent active accounts, then you may want to try again using the same name, address, and personal information that creditors would have in their files for your credit account(s) or credit applications.';
                      }else if($data.tuRecord.jsondata.error == 'Action Code [D] Target Group [Duplicate]'){
                        $data.tuRecord.jsondata.error = 'Our records indicate you have attempted multiple times recently to enroll in this product or a similar one. <br/>To help ensure the security of your information, our systems limit repeat enrollment attempts. Please wait 30 days and then retry. If you need access to your credit information urgently, please request your free annual credit report at www.annualcreditreport.com.';
                      }else if($data.tuRecord.jsondata.error == 'Action Code [E] Target Group []'){
                        $data.tuRecord.jsondata.error = 'A system involved in the enrollment process is currently unavailable. Outages usually result from routine maintenance or security updates and last less than 4 hours. Please wait 1-4 hours and try again later.';
                      }else if($data.tuRecord.jsondata.error == 'Action Code [R] Target Group [null]'){
                        $data.tuRecord.jsondata.error = 'Our system encountered a problem when attempting to process your request. <br/>Please check to make sure you entered no special characters or symbols in your information, and try again. If the problem persists, please contact us for assistance.';
                      }else if($data.tuRecord.jsondata.error == 'The creator of this fault did not specify a Reason.'){
                        $scope.showLoader(60, 'We experienced an error.  Please wait a moment while we reattempt.');
                        $window.location.reload();
                      }else{
                        // Check if TU record contains button with class "reattemptclass"
                        if($data.tuRecord.jsondata.error.indexOf('reattemptclass') !== -1)
                        {
                          // Assign on click event on the button
                          $('body').on('click','.reattemptclass', function(){
                            $window.location.reload();
                          });

                          // Compile the element
                          $compile($('.reattemptclass'))($scope);
                        }
                        $timeout(function(){

                          // Check if previous button or skip button has not been clicked already
                          if($scope.prev_btn_6 != true && $scope.btn_step_6 != true)
                          {
                            // Not clicked; Redirect
                            $localStorage.LocalMessage = 'yes';
                            $location.path('/step5');
                          }
                          else
                          {
                            // Previous or skip button have been clicked
                          }
                        }, 5000);
                      }
                    }
                  });

                  // $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
                  //   if(data.response==1){
                  //     $scope.clientVerifySteps = data.verifySteps;
                  //   }
                  // });

                  $scope.filterText = function(obj){
                    $scope.text = obj.replace('?', ' ');
                    return $scope.text;
                  };

                  $scope.submitFifthFormData = function (obj)
                  {
                    $scope.isDisabled = true;
                    // $scope.input_box_hide= 1;
                    // $scope.input_box = 0;
                    // $scope.input_box_repeat = 0;

                    // Show loader when submitting TU questions
                    $scope.showLoader(80, "{{first_name}}, we\'re generating your credit Report authentication and score now. <br>This may take up to 30 seconds.");

                    var arrData = {};
                    var SixthStepdata = $(obj.target).serializeArray();
                    console.log(SixthStepdata);
                    
                    var arrData = {SixthStepdata: SixthStepdata};
                    var i = 0;
                    $http.post('ClientsController/submitClientDataInterviewSixthStep/' + clientid, arrData).success(function (data) {

                      $scope.source = data.source;

                      if(data.sameReq == '1'){
                          $scope.otpRequest = 0;
                          $scope.kbaRequest = 1;
                          $scope.passcodeRequest = 0;
                          $scope.showLoader();
                        
                      }


                      if(data.otpHandled == 1)
                      {
                            $http.get('ClientsController/transunionQues_client/' + clientid + '/otpinsert/'+resourceType).success(function ($data1) {
                              $scope.tuRecord = $data1.tuRecord;


                              if($scope.tuRecord.methodChange == 'OTPMETHOD'){
                                $scope.methodChange = '1';
                              }

                              $scope.tuVal = $data1.tuVal;
                              // Hide loader again
                              $scope.hideLoader();
                            });
                            $scope.otpRequest = 0;
                            $scope.kbaRequest = 0;
                            $scope.passcodeRequest = 1;
                      }
                      else{

                      if(data.inprogess==1 && data.otpHandled != 'undefined'){
                          //$scope.loading_submit_questions = false;
                          //$scope.loading_questions_fail = true;
                          //$scope.loading_questions_fail_message = 'Sorry! Authentication is in progress please try again';
                          //  alert("Sorry! Authentication is in progress please try again");
                          $scope.tuRecord = data.tuRecord;

                          $scope.source = $data.source;

                          $scope.tuVal = 0;

                          // alert(data.tuRecord.jsondata[0]['FullQuestionText']);
                          // alert(data.OTP);
                          // alert(data.count);

                          /* OTP Logic */
                          if(data.tuRecord.jsondata[0]['FullQuestionText']=='Enter the passcode you received')
                            {
                              i++;
                              //alert(i+ 'o');
                              $scope.otpRequest = 0;
                              $scope.kbaRequest = 0;
                              $scope.passcodeRequest = 1;
                            }
                            else if(data.OTP == 'failed3')
                              {
                                $http.get('ClientsController/transunionQues_client/' + clientid + '/OTP/'+resourceType).success(function ($data1) {
                                  $scope.tuRecord = $data1.tuRecord;
                                  $scope.source = $data1.source;

                                  if($scope.tuRecord.methodChange == 'OTPMETHOD'){
                                    $scope.methodChange = '1';
                                  }

                                  $scope.tuVal = $data1.tuVal;
                                  // Hide loader again
                                  $scope.hideLoader();
                                });
                                $scope.otpRequest = 0;
                                $scope.kbaRequest = 0;
                                $scope.passcodeRequest = 1;
                              }
                              else{
                                // $scope.otpRequest = 0;
                                // $scope.kbaRequest = 0;
                                // $scope.passcodeRequest = 0;
                              }
                          /* OTP Logic */
                          
                          $scope.hideLoader();
                          if(data.tuRecord.jsondata.hasOwnProperty("error"))
                          {
                            $timeout(function(){
                              $localStorage.LocalMessage = 'yes';
                              $location.path('/step5');
                            }, 8000);
                          }
                          else
                          {
                            $scope.isDisabled = false;
                          }
                      }else{
                        $scope.isDisabled = false;

                        if(data.OTP == 'failed'){
                          $scope.showLoader(80, 'Sorry! Authentication failed. We are populating other options to authenticate.');
                          /*this function used for get all item  of client */
                          $http.get('ClientsController/transunionQues_client/' + clientid + '/KBA/'+resourceType).success(function ($data1) {
                            $scope.tuRecord = $data1.tuRecord;
                            $scope.source = $data1.source;
                            
                            if($scope.tuRecord.methodChange == 'OTPMETHOD'){
                              $scope.methodChange = '1';
                            }

                            $scope.tuVal = $data1.tuVal;

                            // Hide loader again
                            $scope.hideLoader();
                          });
                        }

                        if (data.successmsg == '0') {

                          /* OTP Logic */
                          $scope.otpRequest = 0;
                          $scope.kbaRequest = 1;
                          $scope.passcodeRequest = 0;
                          /* OTP Logic */


                          // Show loader when TU authentication failed
                          $scope.showLoader(80, 'Sorry! Authentication failed. We are populating other options to authenticate.');
                          // alert("Sorry! Authentication failed please try again");

                          /*this function used for get all item  of client */
                          $http.get('ClientsController/transunionQues_client/' + clientid+ '/KBA/'+resourceType).success(function ($data1) {
                            $scope.tuRecord = $data1.tuRecord;
                            $scope.source = $data1.source;

                            if($scope.tuRecord.methodChange == 'OTPMETHOD'){
                              $scope.methodChange = '1';
                            }
    
                            $scope.tuVal = $data1.tuVal;

                            // Hide loader again
                            $scope.hideLoader();
                          });
                        } 
                        else if(data.successmsgsend == 1)
                        {
                          $localStorage.LocalMessage = 'yes';
                          var dataLayer = window.dataLayer = window.dataLayer || [];
                                  dataLayer.push({
                                    clientAccNo: $scope.clientdata.id,
                                    clientEmail: $scope.clientdata.email,
                                    event: 'Client_Interviewer_Step4'
                          });
                          $location.path('/step5');
                        }
                      }
                    }
                    });
                  }
              }
              else{
                // TU already authenticated
                $scope.showLoader(80);
                $location.path('/step5');
              }
            }
          });
        }
        else{
          $scope.tuRecorderror = 'Please first fill your personal information and address, and try again.';
          $timeout(function(){

                          // Check if previous button or skip button has not been clicked already
                          if($scope.prev_btn_6 != true && $scope.btn_step_6 != true)
                          {
                            // Not clicked; Redirect
                            $localStorage.LocalMessage = 'yes';
                            $location.path('/step5');
                          }
                          else
                          {
                            // Previous or skip button have been clicked
                          }
                        }, 5000);
        }
    }
  });

  $scope.enableButton = function(){
    $scope.isDisabled = false;
  };
  
  $scope.logout = function () {
    $localStorage.firstUpdate = 2;
    $localStorage.secondUpdate = 2;
  }

  $scope.goToPrevStep = function(){
    $scope.prev_btn_6 = true;
    $scope.showLoader(40);
    $location.path('/step3');
  };

  $scope.btn_step_6 = false;
  $scope.skiptustep = function(val){

    // Show loader when skipping TU questions and proceeding to the next step
    $scope.showLoader(80);

    $scope.btn_step_6 = true;
    $localStorage.LocalMessage = val;
    $location.path('/step5');
  };
  $scope.appliedClassTu = function(loaderVal){
    if(loaderVal)
    {
      return 'modal-backdrop in';
    }
    else
    {
     return  'modal-backdrop';
    }
  };
    // $localStorage.LocalMessage='';
  console.log($scope.input_box_hide+' input_box_hide');
  console.log($scope.input_box+' input_box');

});
appinterview.controller('interviewControllerAllItem', function ($scope, $http, $routeParams, $location,$localStorage,Appcues,$window) {

  Appcues.getResonse(); 
  $scope.domnemsg = $localStorage.LocalMessage;
  $scope.first_name = $localStorage.first_name;
  // Show loader when starting to load this page
  $scope.showLoader(80);

  //     if($scope.domnemsg!='yes'){
  //          $location.path('/step1');
  //     }
  //    else{
  $scope.url =global_base_url;
  $scope.tuauthflag =0;
  //  alert(tuauthflag);
  $scope.clientdata = [];
  $scope.itemdata = [];
  $scope.step6Value = false;
        
  $http.get('ClientsController/client_getinfo_verify_interview/' + clientid+'/').success(function (data) {
    if (data.response == 0) {
      alert('you have been logout10');
      location.href = global_base_url + 'logout';
    }
    $scope.clientdata = data.clientRecord;
    $scope.interview = data.interview;
    $scope.tuauthFlag = data.clientRecord.tu_authflag;
    $scope.tuauthflag =1;
    if($scope.tuauthFlag==0){
      $scope.tupermission = true;
      $scope.tubtn = false;
      //location.href = global_base_url+'clientsinterview#/step5';
    }
    if($scope.domnemsg=='yes'){
     $scope.tupermission = false;
     $scope.tubtn = true;
    }else{
      $scope.tupermission = false;
      $scope.tubtn = true;
    }
    $scope.hideLoader();
  });
  /*this function used for get all item  of client */
  $http.get('ClientsController/get_manage_allitem_module_interview_client/' + clientid).success(function ($data) {
    $scope.response = $data.response;
    if ($scope.response == 0 || $scope.response == '') {
      alert('you have been logout11');
      location.href = global_base_url + 'logout';
    }
    $http.get('ClientsController/get_client_verification_step/' + clientid).success(function (data) {
      if(data.response==1){
       $scope.clientVerifySteps = data.verifySteps;
      }
    });
    // if($data.response==1){
      $scope.items = $data.itemData.items;
    angular.forEach($scope.items,function(value,key){
         value.conditions = true;
         
    });
      
    if($data.itemData.items.length != 0){
      $scope.item_types = $data.itemData.item_types;
      $scope.attestValue = $data.itemData.attestValue;
      $scope.selectedLevel = $data.itemData.attestValue[0].id;
      $scope.selected = $scope.attestValue[0];
    }      
    $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
    {
      console.log(view_as_client_data);
      if(view_as_client_data.id != view_as_client_data.original_id)
      {
           $scope.buttonValue = 'Ok, GOT IT!';
           $scope.nextStepValue = false;
      }
      else
      {           
          if(view_as_client_data.required_execution == 'Yes')
          {
            // if(view_as_client_data.other_agrement_count > 0){ 
            //   $scope.buttonValue = 'Next';
            //   $scope.nextStepValue = true;
            //   // $scope.step6Value = true;
            // }
            // else
            // {
              $scope.buttonValue = 'Ok, GOT IT!';
              $scope.nextStepValue = false;
            // }
          }
          else
          {
              $scope.buttonValue = 'Ok, GOT IT!';
              $scope.nextStepValue = false;
          }
          
        
      }
      if($scope.items.length==0){
        // $scope.showLoader(100, "<div class='interview_suc_success'><span>Well done!</span></div><br />{{first_name}}, we’re building your dashboard. This may take up to 60 seconds.");
        console.log($scope.step6Value);
        if($scope.nextStepValue == true)
            {
              $location.path('/step6');
              // $location.path('/interview_successfull');
            }
            else
            {
              $location.path('/interview_successfull');
            }
      }
    });
   
    
  });
  /*this function used for get all item  of client */
  /*this function used for submit sfifthForm data*/
  $scope.submitSixthFormData = function (obj)
  {
    //   alert($(obj.target).serialize());

    $scope.btn_submit_step5 = true;
    var step_6 = $('#stepSixth').val();
    var arrData = {};
    //var fifthStepdata = $(obj.target).serialize();
    //var arrData = {fifthStepdata: fifthStepdata, step_6: step_6};
  
    $scope.fifthStepdata = [];
    angular.forEach($scope.items,function(value,key){
        //id,reason, condition
        var newVariable = parseInt(value.reason_attest)+'_'+value.id+'_'+value.conditions;
        $scope.fifthStepdata.push(newVariable);
    })
    var arrData = {fifthStepdata: $scope.fifthStepdata, step_6: step_6};
  
    $http.post('ClientsController/submitClientDataInterviewFifthStep/' + clientid+'/'+$scope.domnemsg, arrData).success(function ($data) {
      if ($data.success == 1) {
        $scope.showLoader(100, "<div class='interview_suc_success'><span>Well done!</span></div><br />{{first_name}}, we’re building your dashboard. This may take up to 60 seconds.");
        /* GTM Datalayer */
              /*var dataLayer = window.dataLayer = window.dataLayer || [];
              dataLayer.push({
                clientAccNo: $scope.clientdata.id,
                clientEmail: $scope.clientdata.email,
                event: 'Client_Interviewer_Step5'
              });*/
          if($scope.nextStepValue == true)
              {
                console.log('nextStepValue is true and success is 1');
                $location.path('/step6');
                // $location.path('/interview_successfull');
              }
              else
              {
                console.log('nextStepValue is false and success is 1');
                $location.path('/interview_successfull');
              }
      }
      else {
        console.log('success is not 1');
        $location.path('/step6');
        // $location.path('/interview_successfull');
     }
    });
  }
  $scope.logout = function () {
   $localStorage.firstUpdate = 2;
   $localStorage.secondUpdate = 2;
  }
  $scope.showhidevariagble1 = 'false';
  $scope.hidePrefs = function( existingvalue ) {
   // var getstyle =  $('.'+existingvalue).attr('style')
   $('.'+existingvalue).toggle();
  }
  $scope.goToPrevStep = function(step, btn)
  {
    $location.path(step);
    btn = true;
    $scope.showLoader(60);
  }
//  }
});

appinterview.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
appinterview.controller('interviewControllerSuccess', function ($scope, $http, $routeParams, $location,$timeout,$window,$localStorage,Appcues) {
  $scope.first_name = $localStorage.first_name;
  $scope.showLoader(100, "<div class='interview_suc_success'><span>Well done!</span></div><br />{{first_name}}, we’re building your dashboard. This may take up to 60 seconds.");
  $scope.url = global_base_url;
  $scope.view_as_client_data_id = '';
  $scope.view_as_client_data_original_id = '';
  Appcues.getResonse();
  //$scope.domnemsg = $localStorage.LocalMessage;
  //$scope.first_name = $localStorage.first_name;
  $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
  {
      //console.log(view_as_client_data);
      $scope.view_as_client_data_id = view_as_client_data.id;
      $scope.view_as_client_data_original_id = view_as_client_data.original_id;
      if(view_as_client_data.id != view_as_client_data.original_id)
      {
        //if admin, then remove previous button
        $scope.redirectPath = global_base_url + 'admin';
      }
      else
      {
        $scope.redirectPath = global_base_url + 'clients';
      }
      console.log('inside view_as_client_check');
  });
  $scope.domnemsg = $localStorage.LocalMessage;
  $http.get('ClientsController/get_client_interview_done/' + clientid+'/'+$scope.domnemsg).success(function (data) {
    if(data.response==1)
    {
      $localStorage.LocalMessage = '';
      $scope.clientVerifySteps = data.client_verify_interview.clientverifyStep;
      $scope.tuflagval = data.client_verify_interview.cliettuflagdone;
      $scope.totalItemverify = data.client_verify_interview.totalItemverify;
      if($scope.totalItemverify < 1)
      {
          
        $scope.url =global_base_url;
        $scope.goClients= $scope.redirectPath;
        
       /* GTM Datalayer */
                      /*var dataLayer = window.dataLayer = window.dataLayer || [];
                      dataLayer.push({
                        event: 'Client_Interviewer_Successful'
                      });*/
                      console.log('1');
                      console.log($scope.redirectPath);
                      console.log($scope.view_as_client_data_id);
                      console.log($scope.view_as_client_data_original_id);
        
        $timeout(function () {
          window.location.replace($scope.redirectPath);
        }, 1500);

      }
    //             else{
    //                 location.href=  global_base_url + 'clientsinterview#/step1#';
    //             }
    console.log('3');
    }
    else{
      console.log('2');
       $timeout(function () {
        window.location.replace($scope.redirectPath);
       }, 1500);
    }

  });
  $timeout(function () {

   // Added a trailing slash to prevent Angular from loading the URL twice
     window.location.replace($scope.redirectPath);
 // location.href=  global_base_url + 'clients#/';
  }, 5000);
});

appinterview.controller('logoutController',function($location, $scope, $window,$localStorage,$http,Appcues){
  $scope.url =global_base_url;
  $window.localStorage.clear();
  $localStorage.LocalMessage ='';
  $localStorage.firstUpdate = '';
  $localStorage.secondUpdate = '';
  $http.get('ClientsController/interview_logout').success(function (data) {
   location.href=  global_base_url+'logout';
 });
});