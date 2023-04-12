app.controller('personalInfoController', function(Page, $scope, $http, $timeout, alertClientAccountStatus) {

    Page.setTitle("Personal Information");
    $('body').css('pointer-events', 'none');
    $('body').css('opacity', '0.5');
    $('.la-anim-10').show();
	$('#scroll_dashboard').getNiceScroll().hide();
    $('.audit_review_inner_section_right').getNiceScroll().hide();

    // Regular expression used to validate email address
    $scope.email_regex = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

    
   

    /*code for fb_connect_setting, added on 25-05-2018*/
    $scope.fb_connect_setting = function ($event, client_id) {

        if ($event !== undefined) {

            var checkbox = $event.target;
            var response = 'Changes has not been done. Please try again.';
            //if checkbox is checked
            if (checkbox.checked) {

                var status = 'no';

                var ok = window.confirm('Are you sure you want to connect to facebook?');

                if (ok) {
                    var arrData = {};
                    var arrData = {client_id: client_id, status: status};

                    $http.post('ClientsController/fb_connect_setting', arrData).success(function ($data) {
                    if ($data.message == 'success') { 
                            response = 'Your account has been successfully connected to facebook.';
                            alert(response);
                        }
                        else
                        {
                            alert(response);
                        }
                      }
                    );
                }
                else
                {
                    $scope.fb_connect = false;
                }
            }
            else
            {
                var status = 'yes';

                var ok_ = window.confirm('Are you sure you want to disconnect to facebook?');

                if (ok_) {
                    var arrData = {};
                    var arrData = {client_id: client_id, status: status};

                    $http.post('ClientsController/fb_connect_setting', arrData).success(function ($data) {
                    if ($data.message == 'success') { 
                            response = 'Your account has been successfully disconnected to facebook.';
                            alert(response);
                        }
                        else
                        {
                            alert(response);
                        }
                      }
                    );
                }
                else
                {
                    $scope.fb_connect = true;
                }
            }

        }
    }

    $scope.personalinfodata = [];
    $scope.personalinfodatastate = [];
    $scope.personalinfodatamonitoringsite = [];
    $scope.personalinfodataaffiliates = [];
    $scope.personalinfodatabillingstatus = [];
    $scope.password = [];
    $scope.formsumitted = true;
    $scope.fb_connect = true;

    $scope.ignore_street = 0;

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

        // Validate the zipcode
        $scope.getCityStates();
        $scope.clonegetCityStates();

        $scope.personalinfodata[0].address_one;
        $scope.personalinfodata[0].city;
        $scope.personalinfodata[0].state;

         $scope.personalinfodata[0].mailing_zipcode;
        $scope.personalinfodata[0].mailing_address_one;
        $scope.personalinfodata[0].mailing_city;
        $scope.personalinfodata[0].mailing_state;

        $scope.personalinfodata[0].password = '';

        $scope.ignore_street = 0;

        if($data[0].fb_disconnect == 'yes')
        {
            $scope.fb_connect = false;
        }
        else
        {
            $scope.fb_connect = true;
        }

        
        var dob = $scope.personalinfodata[0].dob;
        var check_if_exists = dob.search('-');
        if (check_if_exists != '-1') {
            var dob_arr = $scope.personalinfodata[0].dob.split('-');
            dob = dob_arr[1] +dob_arr[2] +dob_arr[0];
        } 
        else {
            var dob_arr = $scope.personalinfodata[0].dob.split('/');
            dob = dob_arr[1] + dob_arr[2] + dob_arr[0];
        }
        // console.log(dob);

        $scope.personalinfodata[0].dob = dob;
        if ($scope.personalinfodata[0].dob == '00-00-0000' || $scope.personalinfodata[0].dob == '00/00/0000' || $scope.personalinfodata[0].dob == '00000000') {
            $scope.personalinfodata[0].dob = '';
        }
    });

    



    $scope.addressverify = function(address, city, state, zipcode) {
        address = $('#address_one').val();
        city = $('#city').val();
        state = $('#change_state_name').val();
        zipcode = $('#zipcode').val();

        $http.post('ClientsController/verifyStreetAddress/' + address + '/' + city + '/' + state + '/' + zipcode).success(function($data) {
            $scope.formsumitted = false;
            if ($data.status) {
                if ($data.error == 1) {
                    $("#person_info").prop('disabled', true);
                } else {

                    $("#person_info").prop('disabled', false);
                }

                if ($data.error == 1) {
                    $scope.formssubmissionmessage = '<div class="alert alert-danger fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        <i class="fa fa-times"></i>\
                                                    </button>\
                                                    <strong>' + $data.status + '</strong>\
                                                </div>';
                } else {
                    $scope.formssubmissionmessage = '<div class="alert alert-success fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        <i class="fa fa-check"></i>\
                                                    </button>\
                                                    <strong>' + $data.status + '</strong>\
                                                </div>';
                }
                $scope.formsumitted = false;

                $scope.showGreeting = true;
                $timeout(function() {
                    $scope.showGreeting = false;
                }, 3000);
            }
        });
    };

    $scope.addressverifybyzipkeyup = function(address, city, state, zipcode) {
        var duration = 500;

        var elements = {
            country: $('#country'),
            state: $('#fstate'),
            state_short: $('#state'),
            city: $('#city'),
            zip: $('.zipcodetoaddress')
        }


        // Initialize the ziptastic and bind to the change of zip code
        var options = {
            "key": "764804fe21a421b1f9c1b71802010f1eaca6ef8c",
            //"reverseGeo": true,
            "country": "US"
        }

        elements.zip.ziptastic(options)
            .on('zipChange', function(evt, country, state, state_short, city, zip) {
                //  alert('asdf');
                // Country
                //$("#city").val(city);
                // var test = $('#state option').filter(function () { return $(this).html() == state; }).val();
                //$("#state").val(test);

                elements.country.val(country).parent().show(duration);

                // State
                elements.state_short.val(state_short).parent().show(duration);
                elements.state.val(state).parent().show(duration);

                // City
                elements.city.val(city).parent().show(duration);
            });

        var state = $("#change_state_name").val();

        $http.post('ClientsController/verifyStreetAddress/' + address + '/' + city + '/' + state + '/' + zipcode).success(function($data) {
            $scope.formsumitted = false;
            if ($data.status) {
                $scope.formssubmissionmessage = '<div class="alert alert-danger fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        <i class="fa fa-times"></i>\
                                                    </button>\
                                                    <strong>' + $data.status + '</strong>\
                                                </div>';
                $scope.formsumitted = false;

                $scope.showGreeting = true;
                $timeout(function() {
                    $scope.showGreeting = false;
                }, 5000);
            }
        });
    };

		
    $scope.getstates = function(personalinfodatastate) {
        $http.get('ClientsController/getstates').success(function($data) {
            $scope.personalinfodatastate = $data;
        });
    };

    $scope.monitoringsite = function(personalinfodatamonitoringsite) {
        $http.get('ClientsController/monitoringsite').success(function($data) {
            $scope.personalinfodatamonitoringsite = $data;
        });
    };

    $scope.affiliates = function(personalinfodataaffiliates) {
        $http.get('ClientsController/getaffiliates').success(function($data) {
            $scope.personalinfodataaffiliates = $data;
        });
    };

    $scope.billingstatus = function(personalinfodatabillingstatus) {
        $http.get('ClientsController/getbillingstatus').success(function($data) {
            $scope.personalinfodatabillingstatus = $data;
        });
    };

    $scope.checkfun = function(){
        //$scope.check = !$scope.check;
        if($scope.check)
        {
            $scope.personalinfodata[0].mailing_zipcode = $scope.personalinfodata[0].zipcode;
            $scope.personalinfodata[0].mailing_address_one = $scope.personalinfodata[0].address_one;;
            $scope.personalinfodata[0].mailing_city = $scope.personalinfodata[0].city;
            $scope.personalinfodata[0].mailing_state = $scope.personalinfodata[0].state;

            $('#mailing_change_state_name').val($('#change_state_name').val());

            if($scope.personalinfodata[0].mailing_zipcode.length > 4)
            {
                $scope.formone.mailing_zipcode.$setValidity('mailing_zipcode', true);
            }
        }   
    }

    //function called on changing value of address one and zip codes, to check billing and mailing address are same or not
    $scope.check_same_as_billing_add = function(){
        if($('#address_one').val() != $('#mailing_address_one').val() || $('#zipcode').val() != $('#mailing_zipcode').val() || $('#city').val() != $('#mailing_city').val() || $('#state').val() != $('#mailing_state').val() || $('#change_state_name').val() != $('#mailing_change_state_name').val())
        {
            $scope.check = false;
        }

        if($('#address_one').val() == $('#mailing_address_one').val() && $('#zipcode').val() == $('#mailing_zipcode').val() && $('#city').val() == $('#mailing_city').val() && $('#state').val() == $('#mailing_state').val() && $('#change_state_name').val() == $('#mailing_change_state_name').val())
        {
            $scope.check = true;
        }
    }

    $scope.submitData = function(formValidated) {
	  if(formValidated)
        { 
            // Disable the submit button
           $scope.formone.submit_button = {
                isDisabled: true
            };

            $scope.loader = true;
                    $scope.appliedClassprofile = function(loader) {
                        if (loader) {
                            return 'modal-backdrop in';
                        } else {
                            return 'modal-backdrop';
                        }
                    }

            var address1 = $("#address_one").val();
            var city1 = $("#city").val();
            var state1 = $("#state").val();
            var zipcode1 = $("#zipcode").val();
            var address2 = $("#mailing_address_one").val();
            var city2 = $("#mailing_city").val();
            var state2 = $("#mailing_state").val();
            var zipcode2 = $("#mailing_zipcode").val();
            var ignore_street = $("#ignore_street").val();
            var arrDataAddress = {};
            var arrDataAddress = {
                address: address1,
                city: city1,
                state: state1,
                zipcode: zipcode1,
                mailing_address: address2,
                mailing_city: city2,
                mailing_state: state2,
                mailing_zipcode: zipcode2
            };
            var zip_len = $("#zipcode").val();
            $http.post('ClientsController/verifyStreetAddressClientInterview', arrDataAddress).success(function($data) {
                if (($data.error == 1 || $data.error == 2 || $data.error == 3) && ignore_street != 1) { //extra details added on 30-11-2017
                    $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                                                        <button type="button" class="close close-sm" data-dismiss="alert">\
                                                            <i class="fa fa-times"></i>\
                                                        </button>\
                                                        <strong>' + $data.status + '</strong>\
                                                    </div>';
                    $scope.formsumitted = false;
                    $scope.showGreeting = true;
                    $scope.secondbtn = true;
                    $scope.sbtn = true;

                    $timeout(function() {
                        $scope.showGreeting = false;
                    }, 2000);
                    $scope.loader = false;

                    if($data.error == 1 || $data.error == 3)
                    {
                        var myelement = angular.element('#proceed_anyway_popup');
                        $scope.warning_msg = $data.status;
                        myelement.modal('show');
                    }

                    return false;
                } else if ($data.error == 0 || ignore_street == 1) {
                    $scope.secondbtn = false;

                    if(ignore_street != 1) {
                        $scope.formssubmissionmessage = '<div><div class="alert alert-success fade in">\
                                                        <button type="button" class="close close-sm" data-dismiss="alert">\
                                                            <i class="fa fa-check"></i>\
                                                        </button>\
                                                        <strong>' + $data.status + '</strong>\
                                                    </div>';
                    }
                    else
                    {
                        $scope.formssubmissionmessage = '<div></div>';
                    }
                    $scope.formsumitted = false;
                    
                    $scope.showGreeting = true;

                    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    var homevalid = $('#phone_home').val();
                    
                    $scope.errormsg_forphone = false;                    
                    var personalinfodatas = $('#porsonalinformationform').serializeArray();
                    var zipcode = $("#zipcode").val();
                    var ssn = $("#ssn1").val();
                    var state = $("#change_state_name").val();
                    var mailing_state = $("#mailing_change_state_name").val();
                    
                    $http.post('ClientsController/submitpersonalinfo', {
                        'postdata': personalinfodatas,
                        'zipcode': zipcode,
                        'ssn': ssn,
                        'state': state,
                        'city': $("#city").val(),
                        'mailing_state': mailing_state,
                        'mailing_city': $("#mailing_city").val()
                    }).success(function($data) {
                        $scope.formsumitted = false;
                        if ($data.message) {
                            $scope.loader = false;

                            $scope.formssubmissionmessage = '<div class="alert alert-danger fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                         <button type="button" class="close close-sm" data-dismiss="alert">\
                                                             <i class="fa fa-times"></i>\
                                                         </button>\
                                                         <strong>' + $data.message + '</strong>\
                                                     </div>';
                            $scope.formsumitted = false;

                            $scope.showGreeting = true;
                            $timeout(function() {
                                $scope.errormsg_foremail = false;
                            }, 5000);

                            if ($data.ssn == 1) {
                                $scope.forssn = '<div class="alert alert-danger fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                        <button type="button" class="close close-sm" data-dismiss="alert">\
                                                            <i class="fa fa-times"></i>\
                                                        </button>\
                                                        <strong>' + $data.message + '</strong>.\
                                                    </div>';
                                $scope.forssn9 = true;
                                $timeout(function() {
                                    $scope.forssn9 = false;
                                }, 10000);
                            }

                            return false;
                        }

                        if ($data.success) {
                            $scope.loader = false;
                            $scope.formssubmissionmessage = '<br><div class="alert alert-success fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                        <button type="button" class="close close-sm" data-dismiss="alert">\
                                                            <i class="fa fa-check"></i>\
                                                        </button>\
                                                        Profile has been successfully updated.\
                                                    </div>';

                            $timeout(function() {
                                $scope.formssubmissionmessage = '';
                            }, 5000);

                        } else {
                            $scope.formssubmissionmessage = '<div class="alert alert-danger fade in" style="z-index: 1; position: fixed; top: 50%; width: 38%;">\
                                                        <button type="button" class="close close-sm" data-dismiss="alert">\
                                                            <i class="fa fa-times"></i>\
                                                        </button>\
                                                        <strong>Ooops!</strong> Message was not sent.\
                                                    </div>';
                        }
                    });
                    $scope.ignore_street = 0;
                }
            });

           $scope.formone.submit_button = {
                isDisabled: false
            };
        }
    }


      /*cancel force submit data*/
      $scope.cancelForceSubmit = function() {
        $scope.ignore_street = 0;
      };

      /*submit data of address form forcefully*/
      $scope.forceSubmitSecondFormData = function(formValidated) {
        $scope.ignore_street = 1;
        
        //submit form_two forcefully, after 2 seconds
        $timeout( function(){
            $scope.submitData(formValidated);
        }, 1000 );
        
      };

    // For image crop in edit profile section
    $scope.imageCropResult = null;
    $scope.showImageCropper = false;


  $scope.getCityStates = function() {

        $scope.formone.zipcode.$setValidity('zipcode', false);

        $scope.personalinfodata[0].city = '';
        $scope.personalinfodata[0].state = '';

        if($scope.personalinfodata[0].zipcode === undefined)
        {
          return false;
        }

        //condition added on 23-11-2017, to call ziptastic for minimum 5 chars long zipcode 
        if($scope.personalinfodata[0].zipcode.length < 5)
        {
            return false;
        } 

        $http({
          method: 'GET',
          url: '//zip.getziptastic.com/v3/US/' + $scope.personalinfodata[0].zipcode,
          headers: {
            'x-key': '764804fe21a421b1f9c1b71802010f1eaca6ef8c'
          }
        })
        .then(
          function(response) {
            $scope.personalinfodata[0].city = response.data[0].city;
            $scope.personalinfodata[0].state = response.data[0].state;
            $scope.billing_state_short = response.data[0].state_short;
            $scope.formone.zipcode.$setValidity('zipcode', true);
            $timeout(function() {
                    $scope.check_same_as_billing_add();
                }, 100);
          }
        );
      };

  /* added method to get city and state on zip by mayur on (4-aug-2017) */
  $scope.clonegetCityStates = function() {

        $scope.formone.mailing_zipcode.$setValidity('mailing_zipcode', false);

        $scope.personalinfodata[0].mailing_city = '';
        $scope.personalinfodata[0].mailing_state = '';

        if($scope.personalinfodata[0].mailing_zipcode === undefined)
        {
          return false;
        }

        //condition added on 23-11-2017, to call ziptastic for minimum 5 chars long mailing_zipcode 
        if($scope.personalinfodata[0].mailing_zipcode.length < 5)
        {
            return false;
        }     

        $http({
          method: 'GET',
          url: '//zip.getziptastic.com/v3/US/' + $scope.personalinfodata[0].mailing_zipcode,
          headers: {
            'x-key': '764804fe21a421b1f9c1b71802010f1eaca6ef8c'
          }
        })
        .then(
          function(response) {
            $scope.personalinfodata[0].mailing_city = response.data[0].city;
            $scope.personalinfodata[0].mailing_state = response.data[0].state;
            $scope.mailing_state_short = response.data[0].state_short;
            $scope.formone.mailing_zipcode.$setValidity('mailing_zipcode', true);
            $timeout(function() {
                    $scope.check_same_as_billing_add();
                }, 100);
          }
        );
      };


});