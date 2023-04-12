//define IDP Controller 
app.controller('idpController', function($scope,$http){

     $scope.openPopup = function(template) { 
             //Loader Show CSS
                $('body').css('pointer-events', 'none');
                $('body').css('opacity', '0.5');
                $('.la-anim-10').show();
             //Loader Show CSS
             $http.get('IdpController/getIDPtemplate/'+template).success(function(data) {             
                if( typeof(data.status)!='undefined' && data.status == true){ 
                      //Loader Hide CSS
                       $('body').css('pointer-events','auto');                     
                       $('body').css('opacity','1');                    
                       $('.la-anim-10').hide(); 
                      //Loader Hide CSS
                      $scope.modalpopupContent = data.html;
                      angular.element('#modalpopupContent').html(data.html);                 
                      var element = angular.element('#myModal2');
                       element.modal('show');  
                }else{
                  //Loader Hide CSS
                     $('body').css('pointer-events','auto');                     
                     $('body').css('opacity','1');                    
                     $('.la-anim-10').hide(); 
                   //Loader Hide CSS   
                   toastr.error(data.message); 
                }                  
             });               
      }  
});

  function loaderOn(){
     $('.loaderClass').css('display','block');
  }

  function loaderOff(){
     $('.loaderClass').fadeOut(1000); 
  }

  $(document).on('click','#addBtn',function(e){e.preventDefault();
     var curr = parseInt($('#CurrentAdded').val());
     var limit =parseInt($('#Addlimit').val());
     if(limit>curr){
       $('.text-validation').remove();
       $('.add_form').css('display','block');
       $('.edit_form').css('display','none');  
       $('.add_more_button').css('display','none');     
     }else{
        toastr.error('You can\'t add more than '+limit+' items'); 
     }
  });

 $(document).on('click','#back_btn',function(e){e.preventDefault();
      $('.text-validation').remove();
      $('.add_more_button').css('display','block');
      $('.edit_form').css('display','none');
      $('.add_form').css('display','none');
      // $('#addBtn').css('display','block');
 });


 $(document).on('click','.removeDiv',function(e){e.preventDefault();
     $(this).closest("div.form_elements").remove();
 });

 
 function loadLimit(){
       $.ajax({
          url: 'IdpController/getIDPcount', 
          type: 'GET',
          contentType: false, 
          processData: false, 
          beforeSend:function(){ 
          },
          success:function(response){
               var data = JSON.parse(response); 

                 //Check according to billing category hide show section code
                  if( typeof(data.idp_view)!='undefined' && data.idp_view=='1'){ 
                       $('#idp-custom-overlay').css('display','none');
                       $('.IDP').removeClass('idp-blur');
                  }else{ 
                       $('#myModal2').modal('hide');
                       $('#idp-custom-overlay').css('display','block');  
                       $('.IDP').addClass('idp-blur');                
                  }
                 //Check according to billing category hide show section code 

                 if( typeof(data.status)!='undefined' && data.status == true){  
                    var cc = JSON.parse(data.data); 
                    $.each(cc, function(key,val) {
                      // alert('#idplimit'+val.cattype+'====='+val.totCount);
                       $('#idplimit'+val.cattype).html(val.totCount);
                    });
                }                 
          } 
      }); 
 } 
 


$(document).ready(function(){ 
   //Function for unlink records start
   unlinkData = function(id,type){  
       if(!confirm('Are you sure you want to delete?')){
        return false;
       }
        id = parseInt(id);
        if(id>0){           
              var CurrentAdded = parseInt($('#CurrentAdded').val());
              var Addlimit = parseInt($('#Addlimit').val()); 
              var newUpdate = CurrentAdded-1;   
              var formData = new FormData();
              formData.append('id',id);
              formData.append('type',type);
              $.ajax({
                  url: 'IdpController/idpUnlink',
                  data: formData,
                  type: 'POST',
                  contentType: false, 
                  processData: false, 
                  beforeSend:function(){
                     loaderOn();
                     $('.text-validation').remove();
                     $('.add_form').css('display','none');
                     $('.edit_form').css('display','none');
                  },
                  success:function(response){
                    loadLimit();
                    loaderOff();
                    var res = $.parseJSON(response);                   
                    if(typeof(res.status) != "undefined" && typeof(res.message) != "undefined" && res.message != ''){
                      if(res.status == true) {  
                        toastr.success(res.message); 
                         $('#CurrentAdded').val(newUpdate);
                         $('.loadTable').DataTable().ajax.reload();
                             if(newUpdate==0){
                               $('.add_form').css('display','block'); 
                               $('.add_more_button').css('display','none');
                             }else{
                               $('.add_more_button').css('display','block');
                             }
                      } else {
                        toastr.error(res.message); 
                      }
                    }
                  } 
              });         
        }else{
          toastr.error('Opps! Invalid Request...');  
        } 

       } 
   //Function for unlink records end


   //Function For Edit Records start
   editData = function(id,type){  
        id = parseInt(id);
        if(id>0){   
            var formData = new FormData();
              formData.append('id',id);
              formData.append('type',type);
              $.ajax({
                  url: 'IdpController/idpEdit',
                  data: formData,
                  type: 'POST',
                  contentType: false, 
                  processData: false, 
                  beforeSend:function(){
                     loaderOn();
                     $('.text-validation').remove();
                  },
                  success:function(response){                   
                  var res = $.parseJSON(response);                   
                    if(typeof(res.status) != "undefined" && typeof(res.message) != "undefined" && res.message != ''){
                      if(res.status == true) {  
                               var res2 = $.parseJSON(res.dprdata); 
                               var condtype = parseInt(type); 
                                switch (condtype) { 
                                    case 1: 
                                        $('#bank_account').val(res2.bank_account);
                                        break;
                                    case 2:
                                         $('#cc_type option[value='+res2.cc_type+']').attr('selected','selected');
                                         $('#cc_number').val(res2.cc_number);
                                        break;
                                    case 3:
                                         $('#medical_id').val(res2.medical_id);
                                         break;                                     
                                    case 4: 
                                         $('#phone_number').val(res2.phone_number);
                                        break;  
                                    case 5:
                                         $('#email').val(res2.email);
                                        break; 
                                    case 6:
                                         $('#driving_licence_number').val(res2.driving_licence_number);
                                        break; 
                                    case 7:
                                         $('#passport_number').val(res2.passport_number);
                                        break; 
                                    case 8:
                                         $('#username').val(res2.username);
                                        break; 
                                    case 9:
                                         $('#domain').val(res2.domain);
                                        break; 
                                    case 10:
                                         $('#company_name').val(res2.company_name);
                                        break; 
                                    case 11:
                                         $('#brand').val(res2.brand);
                                        break;
                                    case 12:
                                         $('#mothers_name').val(res2.mothers_name);
                                        break;
                                    case 13:
                                         $('#mothers_maiden_name').val(res2.mothers_maiden_name);
                                        break;
                                    case 14:
                                         $('#insurance_provider').val(res2.insurance_provider); 
                                        break;
                                    case 15: 
                                         $('#insurance_account_number').val(res2.insurance_account_number );
                                        break;
                                     
                                     default:  
                                        break;                                   
                                }
                               $('#edit_id').val(res2.id); 
                              $('.add_more_button,.add_form').css('display','none');
                              $('.edit_form').css('display','block'); 
                               loaderOff();
                      } else {
                        toastr.error(res.message);
                         loaderOff();
                      }
                    }
                  } 
              });         
        }else{
          toastr.error('Opps! Invalid Request');   
        } 

       }  
   //Function For Edit Records end
   
    }); 

   //Function for add_form code start   
  $(document).on('submit','#idp_form_save',function(e){e.preventDefault(); 
        var CurrentAdded = parseInt($('#CurrentAdded').val());
        var newCurrentAdded = parseInt(CurrentAdded+1);
        var Addlimit = parseInt($('#Addlimit').val());
        if(CurrentAdded>=Addlimit){ toastr.error('Sorry! you can\'t add more.'); return false; }
        var form = $(this)[0];
        var formData = new FormData(form);
          $.ajax({
              url: 'IdpController/idpSave',
              data: formData,
              type: 'POST',
              contentType: false, 
              processData: false, 
              beforeSend:function(){
                 loaderOn();
                 $('.text-validation').remove();
              },
              success:function(response){ 
                  var res = $.parseJSON(response);  
                    if(typeof(res.status) != "undefined" && typeof(res.message) != "undefined" && res.message != ''){
                      if(res.status == true) {  
                          loadLimit();
                          loaderOff();
                          $('#CurrentAdded').val( newCurrentAdded );  
                           if(newCurrentAdded<Addlimit){  
                             $('.add_more_button').css('display','block');
                           }

                          toastr.success(res.message); 
                          $('#idp_form_save')[0].reset();
                          $('.add_form').css('display','none');
                          $('.loadTable').DataTable().ajax.reload();
                      } else {
                        toastr.error(res.message);
                        loaderOff();
                      }
                    }
              },
              complete:function(response){  
              var res = $.parseJSON(response.responseText);  
              if(typeof(res.status) != 'undefined' && typeof(res.errors) != 'undefined') {
                $.each($.parseJSON(res.errors), function(key, value){ 
                  $('[name="'+key+'"]').closest('div').append('<p class="text-danger text-validation">'+value+'</p>');
                });
              } 
            }

          });                 
  });
   //Function for add_form code end


   //Function for add_form code start 
  $(document).on('submit','#idp_form_update',function(e){e.preventDefault(); 
        var form = $(this)[0];
        var formData = new FormData(form);
          $.ajax({
              url: 'IdpController/idpUpdate',
              data: formData,
              type: 'POST',
              contentType: false, 
              processData: false, 
              beforeSend:function(){
                 loaderOn();
                 $('.text-validation').remove();
              },
              success:function(response){
                  loadLimit();
                  loaderOff();
                  var res = $.parseJSON(response);  
                    if(typeof(res.status) != "undefined" && typeof(res.message) != "undefined" && res.message != ''){
                      if(res.status == true) {                        
                        toastr.success(res.message);
                        $('#idp_form_update')[0].reset();
                        $('.edit_form').css('display','none');
                        $('.add_more_button').css('display','block');
                        $('.loadTable').DataTable().ajax.reload();
                      } else {
                        toastr.error(res.message);
                      }
                    }
              },
              complete:function(response){  
              var res = $.parseJSON(response.responseText);  
              if(typeof(res.status) != 'undefined' && typeof(res.errors) != 'undefined') {
                $.each($.parseJSON(res.errors), function(key, value){ 
                  $('[name="'+key+'"]').closest('div').append('<p class="text-danger text-validation">'+value+'</p>');
                });
              } 
            }

          });                 
  });
   //Function for add_form code end
