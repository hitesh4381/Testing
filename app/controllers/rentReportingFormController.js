app.controller('rentReportingFormController', function(Page,$scope,$sce,$timeout,$http) {
  Page.setTitle("Rent Reporting Form"); 
    $('body').css('pointer-events','none');                     
  $('body').css('opacity','0.5');                     
  $('.la-anim-10').show();
  setInterval(function(){
    $('body').css('pointer-events','auto');                     
    $('body').css('opacity','1');                     
    $('.la-anim-10').hide();
    }, 3000);



  $http.get('ClientsController/personal_information').success(function($data) {
        $('body').css('pointer-events', 'unset');
        $('body').css('opacity', '1');
        $('.la-anim-10').hide();
        $scope.response = $data.response;
        // alert($data.response);
        if ($scope.response == 0) {
            alert('you have been logout');
            location.href = global_base_url + 'logout';
        }

        $scope.one = true; // setting the first div visible when the page loads
        $scope.two = false; // hidden
        $scope.three = false; // hidden
        $scope.step = '1';
        //$scope.profileImageChk = $data[0].profile_image;
        //$scope.profile_image = 'https://tcp-salesforce.s3.amazonaws.com/client_image/' + $data[0].profile_image;
        $scope.personalinfodata = $data;
        $scope.personalinfodata[0].zipcode;

      
        $scope.personalinfodata[0].address_one;
        $scope.personalinfodata[0].city;
        $scope.personalinfodata[0].state;

         $scope.personalinfodata[0].mailing_zipcode;
        $scope.personalinfodata[0].mailing_address_one;
        $scope.personalinfodata[0].mailing_city;
        $scope.personalinfodata[0].mailing_state;

        $scope.personalinfodata[0].password = '';

        $scope.ignore_street = 0;

       
        

        $scope.personalinfodata[0].dob;
        $scope.personalinfodata[0].ssn;

        $scope.personalinfodata[0].phone_mobile;

       

    });




  /* submit second form data */
  $scope.submitRentingFormData = function (form)
  {

        $('body').css('pointer-events','none');                     
        $('body').css('opacity','0.5');                     
        $('.la-anim-10').show();
       var fromDate=$('form').serializeArray();

    //   console.log("form submited Data"+fromDate);
      $http.post('ClientsController/rentReportingForm/' + clientid, fromDate).success(function ($data) {


         $('body').css('pointer-events','auto');                    
        $('body').css('opacity','1');                     
        $('.la-anim-10').hide();

        console.log($data);
        $(".inputError").css('border','1px solid #ccc');

        $(".errormsg").html('');

        if($data.status==true){
          
            $("#successMsg").html('<p style="color:green;font-size: 20px;text-align: center;">'+$data.msg+'</p>');
            $("#successMsg").scrollTop();
            window.scrollTo(0, 0);

          
        }else{
        //  console.log($data.httpcode);
          if($data.httpcode==409){
            $("#successMsg").html('<p style="color:red;font-size: 20px;text-align: center;">'+$data.curlerror+'</p>');
            $("#successMsg").scrollTop();
            window.scrollTo(0, 0);

          }else{

            var errorResult= $.parseJSON($data.curlerror);
            console.log(errorResult.length);
            console.log(errorResult.curlerror);

            for(var i=0;i<=errorResult.length;i++){

              console.log(errorResult[i]);

              $("#error_"+errorResult[i]['key']).html('<p style="color:red;">'+errorResult[i]['msg']+'</p>');

              $("#"+errorResult[i]['key']).css('border','1px solid #f11111');
          }

          }
        }
                
      });

  }
      

});