appAgreement.controller('agreementController', function ($scope, $http, $routeParams, $location, $localStorage, $filter,Appcues,$window) {
  	
  	Appcues.getResonse();
     $http.get('ClientsController/clientAgreementInterview/'+clientid).success(function($data){
      $scope.interviewdata = 2;
      $scope.client_agreementid    = $data.client_agreement_id;
      $scope.getDateAgreement    = $data.getDate;
      $scope.CurrentDate = $filter('date')(new Date(), 'hh:mm:ss a');
      $scope.getTimeAgreement    = $data.getTime;
             
       var tmp = $data.incompleteform.replace(/(?:\r\n|\r|\n)/g, '');
      $('#hmlId').html(tmp);
         //
        if( -1 == $data.incompleteform.indexOf("signature_box"))
        {
          $scope.agreementExists = '0';
        }
        else{
          $scope.agreementExists = '1';
        }
        $scope.incompleteform = tmp;
        if($scope.incompleteform && $scope.incompleteform!=''){
         $scope.incmpleteAgreementMsg = true;
         $scope.modeladd1 = {
          display: "block"};
        }
        else
        {
         $scope.incmpleteAgreementMsg = false;
         $http.get('ClientsController/getLatestSignedAgreement/'+clientid).success(function($data){
           $scope.latestagreement = $data.latestagreement;
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
    });
    $http.get('ClientsController/client_getinfo_verify_interview/' + clientid).success(function (data) {
      if (data.response == 0) {
        alert('you have been logout');
        location.href = global_base_url + 'logout';
      }
      $scope.clientdata = data.clientRecord;
      $scope.clientdata.tu_authflag = data.clientRecord.tu_authflag;
      $localStorage.first_name = $scope.clientdata.first_name;
    });

    $scope.submitFourthFormData = function (form)
    {
      $scope.showLoader(20);
      $scope.clientdata.tu_authflag=0;
      if (form.$invalid) {
        return;
      }
      else 
      {
              // check if first name is set in local storage
              if(!$localStorage.first_name)
              {
                $localStorage.first_name = $scope.clientdata.first_name;
              }

             
              var interview_agreement_terms =  $('#terms').val();

              var step_4 = $('#stepFourth').val();
              var agreementid = $('#agreementid').val();
              var formDataAgreement = $('#hmlId').html();
              formDataAgreement = formDataAgreement.replace(/(?:\r\n|\r|\n)/g,'');
              var arrData = {};
              var arrData = {interview_agreement_terms: interview_agreement_terms, step_4: 4};
              $http.post('ClientsController/submitClientDataInterviewFourthStep/' + clientid+'/reassign', arrData).success(function ($data) {
                if ($data.success == 1) {
                     var arrDataimg = {};
                     var arrDataimg = {imgData:formDataAgreement};
                     $(formDataAgreement).find('canvas').remove();

                     // Does not wait for the response
                     $http.post('ClientsController/upload_agreement_signature/' + clientid, arrDataimg);
                     var arrDataimgform = [];
                     var arrDataimgform = {agreement_data: formDataAgreement , terms_and_conditions_checked : interview_agreement_terms  };
                     if(agreementid == '' || typeof(agreementid) == 'undefined' ) {
                       agreementid = 0;
                     }

                     // Does not wait for the response
                     $http.post('ClientsController/edit_client_agreement/' + agreementid + '/' + clientid+'/reassign', arrDataimgform).success(function ($data){
                     	  location.href= global_base_url + 'clients'; /*move on next fifth step */
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

//     var VLogin = angular.module('angularApp',[]);
//    VLogin.controller('agreementController', ['$scope',function($scope) {

   $scope.clickede = function(){
        alert("Clicked");
    }
// }]);

    // $scope.createPdf = function () {
    //   console.log(asf);
    //alert();
    // html2canvas(document.getElementById('exportthis'), {
    //     onrendered: function (canvas) {
    //         var data = canvas.toDataURL();
    //         var docDefinition = {
    //             content: [{
    //                 image: data,
    //                 width: 500,
    //             }]
    //         };
    //         pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
    //     }
    // }); 
   // }


});


appAgreement.controller('logoutController',function($location, $scope, $window,$localStorage,$http,Appcues){
  $scope.url =global_base_url;
  $window.localStorage.clear();
  $localStorage.LocalMessage ='';
  $localStorage.firstUpdate = '';
  $localStorage.secondUpdate = '';
  $http.get('ClientsController/interview_logout').success(function (data) {
   location.href=  global_base_url+'logout';
 });
});






