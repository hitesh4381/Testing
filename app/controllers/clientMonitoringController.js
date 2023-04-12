  app.controller('clientMonitoringController',function(Page,$scope,$http,$routeParams,DTOptionsBuilder, DTColumnBuilder){
  Page.setTitle("Client Monitoring Detail") ;
  		$('body').css('pointer-events','none'); 										
		$('body').css('opacity','0.5'); 										
		$('.la-anim-10').show();
   
 
  $http.get('ClientsController/getdateforthecreditmonitoring/'+clientid+'/').success(function($sdata){
    $scope.datetimes = $sdata.datetimes;
  });
  
    $scope.relodethedata = function(datetime, page_number) {
      //
      $http.get('ClientsController/modal_credit_report/' + clientid + '/' + datetime).success(function($data){
		    $('body').css('pointer-events','auto');
			  $('body').css('opacity','1'); 										
			  $('.la-anim-10').hide(); 
        
            $scope.response=$data.response;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }

            

        $scope.monitoring_username = $data.monitoring_username;

        $scope.monitoring_password = $data.monitoring_password;
        $scope.monitoring_site_login_url = $data.monitoring_site_login_url;
        $scope.clientmonitoring = $data.clientmonitoring;
        $scope.total_items = $data.clientmonitoring.total_items;
        //
        
        //
        $scope.address = $data.address;
        $scope.inquirername = $data.inquirername;
        $scope.phone = $data.phone;
        $scope.publicrecord = $data.publicrecord;
        $scope.clientsummary = $data.clientsummary;

        //added om 24-08-2017 for other types of details
        $scope.derogaddress = $data.derogaddress;
        $scope.derogavailabledate = $data.derogavailabledate;
        $scope.derogcreditorname = $data.derogcreditorname;

        $scope.newtradeaddress = $data.newtradeaddress;
        $scope.newtradeavailabledate = $data.newtradeavailabledate;
        $scope.newtradecreditorname = $data.newtradecreditorname;
        $scope.newtradeAccountNumber = $data.newtradeAccountNumber;
        $scope.newtradeIndustryType = $data.newtradeIndustryType;

        $scope.improvedaddress = $data.improvedaddress;
        $scope.improvedavailabledate = $data.improvedavailabledate;
        $scope.improvedcreditorname = $data.improvedcreditorname;
        $scope.improvedphone = $data.improvedphone;

        $scope.newaccountaddress = $data.newaccountaddress;
        $scope.newaccountavailabledate = $data.newaccountavailabledate;
        $scope.newaccountcreditorname = $data.newaccountcreditorname;
        $scope.newaccountphone = $data.newaccountphone;

        $scope.delinqaddress = $data.delinqaddress;
        $scope.delinqavailabledate = $data.delinqavailabledate;
        $scope.delinqcreditorname = $data.delinqcreditorname;
        $scope.delinqphone = $data.delinqphone;

        $scope.bankavailabledate = $data.bankavailabledate;
        $scope.bankcreditorname = $data.bankcreditorname;

        $scope.newaddressaddress = $data.newaddressaddress;
        $scope.newaddressavailabledate = $data.newaddressavailabledate;

        $scope.employaddress = $data.employaddress;
        $scope.employavailabledate = $data.employavailabledate;
        $scope.employcreditorname = $data.employcreditorname;
        $scope.employphone = $data.employphone;

        $scope.frauddatereported = $data.frauddatereported;
        $scope.fraudcomments = $data.fraudcomments;

        //get the client score values
        $scope.score_note = $data.score_note;


      });
    }

    
    
     $scope.IsHidden = true;
     $scope.reportaccordion = function($scope) {
           $scope.IsHidden = $scope.IsHidden === false ? true: false;
     }
     
     $scope.custom = true;
    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true: false;
    };

    $scope.changeAlertBureau = function(bureau_type = 'transunion') {
        $('#bureau_type_al').val(bureau_type);
        $('#mytabs').DataTable().draw();
    };
     var vm9 = this;
     var datatable_data = '';
     var  bureau_type_al = $('#bureau_type_al').val();
     vm9.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         //dataSrc: 'data',
         url: 'ClientsController/modal_credit_report_paginated/' + clientid,
         type: 'POST',
         data: function (d) {
            d.bureau_type = $('#bureau_type_al').val();
            console.log(d.bureau_type);
          }, 
         beforeSend : function()
         {
             $('body').css('pointer-events','none');
              $('body').css('opacity','0.5');
              $('.la-anim-10').show(); 
         },         
        complete : function($data){
            $('body').css('pointer-events','auto');                    
            $('body').css('opacity','1');                     
            $('.la-anim-10').hide(); 
            
            datatable_data = JSON.parse($data.responseText);
            datatable_data = datatable_data.data;

            setTimeout(function(){ 
              if ($('table th').hasClass("sorting")) {
              
                $("body").on('click', 'table th',function (e) {
                  
                  $('body').css('pointer-events','none');
                  $('body').css('opacity','0.5');
                  $('.la-anim-10').show();               

                });
              }
            }, 3000);

           
            //console.log('Inside complete function');

            // Unbind click events from the rows
            $("#mytabs tbody").unbind('click');
            $("#mytabs tbody td").unbind('click');

            // Add on click handlers to each row
            $("#mytabs tbody").on("click", ".tableActions", function(e) {
              var tr = $(this).closest('tr');
              //console.log('table row clicked');

              // Get the datatables object
              var datatable = $('#mytabs').DataTable();

              // Get the datatable row object
              var row = datatable.row(tr);
              if(tr.hasClass("shown"))
              {
                $(".childrow").remove();
                $('tr').removeClass('shown');
                $('tr').find('td:last').html('<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">+</span>');
                row.child.hide();
                tr.removeClass('shown');
              }
              else
              {
                $(".childrow").remove();
                $('tr').removeClass('shown');
                $('tr').find('td:last').html('<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">+</span>');
                tr.find('td:last').html('<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">-</span>');
                if(tr.hasClass("odd"))
                {
                  row.child(format(row.data(), row.index()), 'childrow odd').show();
                }
                else
                {
                  row.child(format(row.data(), row.index()), 'childrow even').show();
                }
                tr.addClass('shown');
              }

              e.preventDefault();
              e.stopPropagation();
            });

            var trFirst = $('.row-border').find('.odd').first();
            // Get the datatables object
            var datatableFirst = $('#mytabs').DataTable();
            if(datatableFirst)
            {
              // Get the datatable row object
              var rowFirst = datatableFirst.row(trFirst);
              if(datatable_data.clientmonitoring.length > 0)
              {
                if(rowFirst.child.isShown())
                {
                  $(".childrow").remove();
                  $('tr').removeClass('shown');
                  $('tr').find('td:last').html('<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">+</span>');
                  rowFirst.child.hide();
                  trFirst.removeClass('shown');
                }
                else
                {
                  $(".childrow").remove();
                  $('tr').removeClass('shown');
                  $('tr').find('td:last').html('<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">+</span>');
                  trFirst.find('td:last').html('<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">-</span>');
                  rowFirst.child(format(rowFirst.data(), rowFirst.index()), 'childrow odd').show();
                  trFirst.addClass('shown');
                }
              }
            }

            $('.sorting_disabled').css('pointer-events', 'none');          
            var myJson = JSON.stringify($data);
            $scope.client_monitoring_data = myJson.data;
            $('html').niceScroll(); 
        },

     })
     // or here
    .withDataProp('data.clientmonitoring')
    .withOption('processing', true)
    .withOption('order', [1, 'desc'])
    .withOption('serverSide', true)
    .withOption('lengthMenu', false)
    .withOption('DisplayLength', 10)
    .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"] ])
    .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
    .withOption('PaginationType','full_numbers"')
    .withOption('Destroy',true)
    .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
    vm9.dtColumns = [
      DTColumnBuilder.newColumn('date_created').withTitle('Date'),
      DTColumnBuilder.newColumn('alert_type').withTitle('Type'),
      DTColumnBuilder.newColumn('alert_title').withTitle('Description'),
      DTColumnBuilder.newColumn('').withOption('defaultContent','<span style="background: #31bce2;border-radius: 50%;height: 25px;padding: 6px 10px;color: #fff;" id="view_icon" class="tableActions">+</span>'),
      DTColumnBuilder.newColumn('client_monitoring').withTitle('Client Monitoring').notVisible()
    ];

    

    function format(data, i)
    { 
    // Return html
      var html = '';

      var bureau_type_al=$("#bureau_type_al").val();
     // alert(bureau_type_al);

      
      // Check alert type
      switch(data.alert_type)
      {
        case 'New Employment':
        case 'New Public <span style="display:none;">New Employment</span>':

          html = '<div class="client_alerttypesdes_container">' +
                        '<div class="client_alerttype_description">' +
                            '<p class="tu_alert_description">An account provider sent TransUnion the name of an employer that' +
                            'TransUnion previously did not have on your credit file. Account providers ' +
                            'can take up to 6 months to update the credit bureau with new employer ' +
                            'details.' +
                            '</p>' +
                        '</div>' +
                        '<div class="alerttype_blank">' +
                        '</div>' +
                        '<div class="client_alerttype_details">' +
                            '<div class="client_alerttype_details_container">' +
                                '<p><b>Employer Name : </b> '+datatable_data.employcreditorname[i]+'</p>' +
                                '<p><b>Address : </b> ' + datatable_data.employaddress[i] + '</p>' +
                                '<p><b>Phone: tel : </b> ' + datatable_data.employphone[i] + '</p>' +
                                '<p><b>Available Date : </b> ' + datatable_data.employavailabledate[i] + '</p>' +
                            '</div>' +
                        '</div>';

        break;

        case 'New Inquiry':
        case 'NewInquiry':
       
        if(bureau_type_al=='transunion'){
           html = '<div class="client_alerttype_description">' +
                        '<p class="tu_alert_description">A potential creditor, lender, or employer reported a pulled copy of your credit file because you applied for credit or services with them.</p>' +
                    '</div>' +
                    '<div class="alerttype_blank">' +
                    '</div>' +
                    '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.inquirername[i]+'</p>' +
                            '<p><b>Subscriber Address : </b> ' + datatable_data.inquirysubscriberAddres[i] + '</p>' +

                            '<p><b>Type : </b> n/a</p>' +
                            '<p><b>Phone: tel : </b> ' + datatable_data.phone[i] + '</p>' +
                             '<p><b>Industry Type : </b>  ' + datatable_data.inquireridustrytype[i] + '</p>' +
                            '<p><b>Inquiry Address : </b> ' + datatable_data.address[i] + '</p>' +
                            '<p><b>Inquiry Date : </b> '+datatable_data.inquiryDate[i]+'</p>' +
                            
                        '</div>' +
                    '</div>';

        break;
        }else if(bureau_type_al=='experian'){

        

          html = '<div class="client_alerttype_description">' +
                        '<p class="tu_alert_description">A potential creditor, lender, or employer reported a pulled copy of your credit file because you applied for credit or services with them.</p>' +
                    '</div>' +
                    '<div class="alerttype_blank">' +
                    '</div>' +
                    '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.inquirername[i]+'</p>' +
                            '<p><b> Address : </b> ' + datatable_data.address[i] + '</p>' +
                            '<p><b>Phone: tel : </b> ' + datatable_data.phone[i] + '</p>' +
                            '<p><b>Inquiry Date : </b> '+datatable_data.inquiryDate[i]+'</p>' +
                            '<p><b>Business Type : </b> ' + datatable_data.businessType[i] + '</p>' +
                            '<p><b>Alert Date: tel : </b> ' + datatable_data.alertDate[i] + '</p>' +
                            '<p><b>Type : </b> n/a</p>' +
                        '</div>' +
                    '</div>';

        break;

        }else{
            html = '<div class="client_alerttype_description">' +
                        '<p class="tu_alert_description">A potential creditor, lender, or employer reported a pulled copy of your credit file because you applied for credit or services with them.</p>' +
                    '</div>' +
                    '<div class="alerttype_blank">' +
                    '</div>' +
                    '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.inquirername[i]+'</p>' +
                            '<p><b>Subscriber Address : </b> ' + datatable_data.inquirysubscriberAddres[i] + '</p>' +

                            '<p><b>Type : </b> n/a</p>' +
                            '<p><b>Phone: tel : </b> ' + datatable_data.phone[i] + '</p>' +
                             '<p><b>Industry Type : </b> ' + datatable_data.inquireridustrytype[i] + '</p>' +
                            '<p><b>Inquiry Address : </b> ' + datatable_data.address[i] + '</p>' +
                            '<p><b>Inquiry Date : </b> '+datatable_data.inquiryDate[i]+'</p>' +
                            
                        '</div>' +
                    '</div>';


        break;
        }
        
        case 'Score Change':

          html = '<div class="client_alerttype_description">'+
                        '<p class="tu_alert_description">' + String(data.monitoring_response).replace(/<[^>]+>/gm, '') + '</p>'+
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';

        break;
        
        case 'NewPublic':
        case 'New Public':
        case 'NewPublicRecord':
        case 'New Public Record':
        case 'Public Record':

         if(bureau_type_al=='experian'){

          html =  '<div class="client_alerttype_description">' +
                  '<p class="tu_alert_description">A court reported a new public record in your name. Each record type will. stay on your credit file for a different length of time.' + 
                          '</p>' +
                  '</div>' +
                  '<div class="alerttype_blank">' +
                  '</div>' +
                  '<div class="client_alerttype_details">' +
                      '<div class="client_alerttype_details_container">' +
                          '<p><b>Court Name  : </b> ' + datatable_data.D3P1COURTNAME[i]+ '</p>' +
                          '<p><b>Status:</b> ' + datatable_data.D3P1STATUS[i] + '</p>' +
                          '<p><b>Liability Amount:</b> ' + datatable_data.D3P1LIABILITYAMOUNT[i] + '</p>' +
                          '<p><b>Reference No:</b> ' + datatable_data.D3P1REFERENCENUMBER[i] + '</p>' +
                          '<p><b>Type :</b> ' + datatable_data.D3P1PUBLICRECORDTYPE[i] + '</p>' +
                          '<p><b>Available Date : </b> ' + datatable_data.DateReported[i] + '</p>' +
                      '</div>' +
                  '</div>';
            }else if(bureau_type_al=='transunion'){
               html =  '<div class="client_alerttype_description">' +
                  '<p class="tu_alert_description">A court reported a new public record in your name. Each record type will. stay on your credit file for a different length of time.' + 
                          '</p>' +
                  '</div>' +
                  '<div class="alerttype_blank">' +
                  '</div>' +
                  '<div class="client_alerttype_details">' +
                      '<div class="client_alerttype_details_container">' +
                          '<p><b>Court Name  : </b> ' + datatable_data.D3P1COURTNAME[i]+ '</p>' +
                          '<p><b>Status:</b> ' + datatable_data.D3P1STATUS[i] + '</p>' +
                          '<p><b>Liability Amount:</b> ' + datatable_data.D3P1LIABILITYAMOUNT[i] + '</p>' +
                          '<p><b>Reference No:</b> ' + datatable_data.D3P1REFERENCENUMBER[i] + '</p>' +
                          '<p><b>Type :</b> ' + datatable_data.D3P1PUBLICRECORDTYPE[i] + '</p>' +
                          '<p><b>Date Reported  : </b> ' + datatable_data.DateReported[i] + '</p>' +
                          '<p><b>Available Date : </b> ' + datatable_data.publicavailabledate[i] + '</p>' +
                      '</div>' +
                  '</div>';
            }else if(bureau_type_al=='equifax'){
               html =  '<div class="client_alerttype_description">' +
                  '<p class="tu_alert_description">A court reported a new public record in your name. Each record type will. stay on your credit file for a different length of time.' + 
                          '</p>' +
                  '</div>' +
                  '<div class="alerttype_blank">' +
                  '</div>' +
                  '<div class="client_alerttype_details">' +
                      '<div class="client_alerttype_details_container">' +
                          '<p><b>Creditor Name  : </b> ' + datatable_data.equifaxcourtName[i]+ '</p>' +
                          '<p><b>Case Number:</b> ' + datatable_data.equifaxcaseNumber[i] + '</p>' +
                          '<p><b>Filed Date:</b> ' + datatable_data.equifaxdateFiled[i] + '</p>' +
                          '<p><b>Changed Type :</b> ' + datatable_data.D3P1PUBLICRECORDTYPE[i] + '</p>' +
                         
                      '</div>' +
                  '</div>';
            }
        break;
        
        case 'New Account':
        case 'NewAccount':




        html =  '<div class="client_alerttype_description">' +
                  '<p class="tu_alert_description">An account provider reported that a new account opened in your name.' + 
                          '</p>' +
                  '</div>' +
                  '<div class="alerttype_blank">' +
                  '</div>' +
                  '<div class="client_alerttype_details">' +
                      '<div class="client_alerttype_details_container">' +
                           '<p><b>Account : </b> '+datatable_data.newaccountcreditorname[i]+'</p>' +
                            '<p><b>Address : </b> ' + datatable_data.newaccountaddress[i] + '</p>' +
                            '<p><b>Payment Status : </b> ' + datatable_data.newaccountpayment[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.newaccountamount[i] + '</p>' +
                           
                            '<p><b>Phone: tel : </b> ' + datatable_data.newaccountphone[i] + '</p>' +
                             '<p><b>Account Number : </b> ' + datatable_data.newaccountnumber[i] + '</p>' +
                              '<p><b>Industry Type : </b> ' + datatable_data.improvedindustryType[i] + '</p>' +
                             
                           
                            '<p><b>Account Balance : </b> ' + datatable_data.improvedaccountBalance[i] + '</p>' +
                             '<p><b>Creditor Preferred Contact: </b> ' + datatable_data.improvedcreditorPreferredContact[i] + '</p>' +
                             '<p><b>Available Date : </b> ' + datatable_data.newaccountavailabledate[i] + '</p>' +
                           
                      '</div>' +
                  '</div>';
        break;

        
        
        case 'Delinquent Account':
        case 'DelinquentAccount':
        case 'Potential Negative <span style="display:none;">DelinquentAccount</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.delinqcreditorname[i]+'</p>' +
                            '<p><b>Address : </b> ' + datatable_data.delinqaddress[i] + '</p>' +
                            '<p><b>Payment Status : </b> ' + datatable_data.delinqpayment[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.delinqamount[i] + '</p>' +                            
                            '<p><b>Phone: tel : </b> ' + datatable_data.delinqphone[i] + '</p>' +
                            '<p><b>Account Number : </b> ' + datatable_data.delinqaccountnumber[i] + '</p>' +
                            '<p><b>Industry Type : </b> ' + datatable_data.delinqindustrytype[i] + '</p>' +
                            '<p><b>Creditor Preferred Contact: </b> ' + datatable_data.delinqcreditorPreferredContact[i] + '</p>' +
                            '<p><b>Consumer Statement : </b> ' + datatable_data.delinqConsumerStatement[i] + '</p>' +
                            
                            '<p><b>Available Date : </b> ' + datatable_data.delinqavailabledate[i] + '</p>' +
                           
                        '</div>' +
                    '</div>';

        break;

        //added om 24-08-2017 for other types of details
        case 'Derogatory Trade':
        case 'DerogatoryTrade':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Name : </b> '+datatable_data.derogcreditorname[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.derogAccountNumber[i]+'</p>' +
                            '<p><b>Industry Type : </b> '+datatable_data.derogIndustryType[i]+'</p>' +
                            '<p><b>Alert Sub Type : </b> '+datatable_data.derogalertSubtypeName[i]+'</p>' +
                            
                            '<p><b>Payment Status : </b> ' + datatable_data.derogpayment[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.derogamount[i] + '</p>' +
                            '<p><b>Address : </b> ' + datatable_data.derogaddress[i] + '</p>' +
                            '<p><b>Phone: tel : </b> n/a</p>' +
                            '<p><b>Available Date : </b> ' + datatable_data.derogavailabledate[i] + '</p>' +
                        '</div>' +
                    '</div>';

        break;

        case 'New Trade':
        case 'NewTrade':
        case 'New Account <span style="display:none;">NewTrade</span>':

       // alert(datatable_data);

         if(bureau_type_al=='experian'){
         // console.log(datatable_data);

          html =  '<div class="client_alerttype_description">' +
                  '<p class="tu_alert_description">An account provider reported that a new account opened in your name.' + 
                          '</p>' +
                  '</div>' +
                  '<div class="alerttype_blank">' +
                  '</div>' +
                  '<div class="client_alerttype_details">' +
                      '<div class="client_alerttype_details_container">' +
                           '<p><b>Name : </b> '+datatable_data.newaccountcreditorname[i]+'</p>' +
                            '<p><b>Address : </b> ' + datatable_data.newaccountaddress[i] + '</p>' +
                            '<p><b>Payment Status : </b> ' + datatable_data.newaccountpayment[i] + '</p>' +
                            '<p><b>Businness Type : </b>'+datatable_data.newaccountbusinessType+'</p>'+
                            '<p><b>Amount : </b> ' + datatable_data.newaccountamount[i] + '</p>' +                           
                            '<p><b>Phone: tel : </b> ' + datatable_data.newaccountphone[i] + '</p>' +
                            '<p><b>Alert Sub Type : </b> '+datatable_data.experianalertSubtypeName[i]+'</p>' +                        
                            '<p><b>Account Balance : </b> ' + datatable_data.improvedaccountBalance[i] + '</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.newaccountavailabledate[i] + '</p>' +
                            '<p><b>Open Date : </b> ' + datatable_data.newaccountopenDate[i] + '</p>' +
                           
                      '</div>' +
                  '</div>';



         }else{


          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Name : </b> '+datatable_data.newtradecreditorname[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.newtradeAccountNumber[i]+'</p>' +
                            '<p><b>Industry Type : </b> '+datatable_data.newtradeIndustryType[i]+'</p>' +
                            '<p><b>Alert Sub Type : </b> '+datatable_data.experianalertSubtypeName[i]+'</p>' +
                            
                            '<p><b>Payment Status : </b> ' + datatable_data.newtradepayment[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.newtradeamount[i] + '</p>' +
                            '<p><b>Address : </b> ' + datatable_data.newtradeaddress[i] + '</p>' +
                            '<p><b>Phone: tel : </b> n/a</p>' +
                            '<p><b>Available Date : </b> ' + datatable_data.newtradeavailabledate[i] + '</p>' +
                        '</div>' +
                    '</div>';
          }

        break;

        case 'Improved Trade':
        case 'ImprovedTrade':
        case 'ImprovedAccount':
        case 'Improved Account':

       // alert(bureau_type_al);

         if(bureau_type_al=='experian'){

                  html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Name : </b> '+datatable_data.improvedcreditorname[i]+'</p>' +
                             '<p><b>Address : </b> ' + datatable_data.improvedaddress[i] + '</p>' +
                            '<p><b>Payment Status : </b> ' + datatable_data.improvedpayment[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.improvedamount[i] + '</p>' +                           
                            '<p><b>Phone: tel : </b> ' + datatable_data.improvedphone[i] + '</p>' +
                             '<p><b>Account Number : </b> ' + datatable_data.improvedaccountNumber[i] + '</p>' +
                            '<p><b>Account Balance : </b> ' + datatable_data.improvedaccountBalance[i] + '</p>' +
                            '<p><b>Business Type : </b> ' + datatable_data.improvedbusinessType[i] + '</p>' +
                            '<p><b>Available Date : </b> ' + datatable_data.improvedavailabledate[i] + '</p>' +
                        '</div>' +
                    '</div>';
          }else{


                    html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Name : </b> '+datatable_data.improvedcreditorname[i]+'</p>' +
                             '<p><b>Address : </b> ' + datatable_data.improvedaddress[i] + '</p>' +
                            '<p><b>Payment Status : </b> ' + datatable_data.improvedpayment[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.improvedamount[i] + '</p>' +
                           
                            '<p><b>Phone: tel : </b> ' + datatable_data.improvedphone[i] + '</p>' +
                             '<p><b>Account Number : </b> ' + datatable_data.improvedaccountNumber[i] + '</p>' +
                            '<p><b>Industry Type : </b> ' + datatable_data.improvedindustryType[i] + '</p>' +
                            '<p><b>Account Balance : </b> ' + datatable_data.improvedaccountBalance[i] + '</p>' +
                            '<p><b>Creditor Preferred Contact : </b> ' + datatable_data.improvedcreditorPreferredContact[i] + '</p>' +
                            '<p><b>Consumer Statement : </b> ' + datatable_data.improvedconsumerStatement[i] + '</p>' +
                            '<p><b>business Type : </b> ' + datatable_data.newaccountbusinessType[i] + '</p>' +

                            '<p><b>Available Date : </b> ' + datatable_data.improvedavailabledate[i] + '</p>' +
                        '</div>' +
                    '</div>';


          }

        break;

        case 'Trade Bankrupt':
        case 'NewBankruptcy':
        case 'New Bankruptcy':
        case 'New Public <span style="display:none;">Trade Bankrupt</span>':


         if(bureau_type_al=='experian'){
            
            html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.bankcreditorname[i]+'</p>' +
                            '<p><b>Available Date : </b> ' + datatable_data.bankavailabledate[i] + '</p>' +
                            '<p><b>Case Number : </b> ' + datatable_data.bankcaseNumber[i] + '</p>' +
                            '<p><b>Description : </b> ' + datatable_data.bankdescription[i] + '</p>' +
                            '<p><b>Filed Date : </b> ' + datatable_data.bankfiledDate[i] + '</p>' +
                        '</div>' +
                    '</div>';

        }else{
                html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.bankcreditorname[i]+'</p>' +
                            '<p><b>Industry Type : </b> ' + datatable_data.bankindustrytype[i] + '</p>' +
                            '<p><b>Available Date : </b> ' + datatable_data.bankavailabledate[i] + '</p>' +
                           
                        '</div>' +
                    '</div>';
        }

       
        break;

        case 'New Address':
        case 'NewAddress':
        if(bureau_type_al=='experian'){
          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Address : </b>' + datatable_data.newaddressaddress[i] + '</p>' +
                            '<p><b>Old Address : </b>' + datatable_data.newaddressaddressold[i] + '</p>' +
                            '<p><b>Available Date : </b>' + datatable_data.newaddressavailabledate[i] + '</p>' +
                            '<p><b>Move Date : </b>' + datatable_data.newaddressmoveDate[i] + '</p>' +
                        '</div>' +
                    '</div>';
          }else if(bureau_type_al=='equifax'){
              html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Previous Address : </b> ' + datatable_data.equifaxaddress[i] + '</p>' +
                            '<p><b>New Address : </b> ' + datatable_data.equifaxaddress2[i] + '</p>' +
                             '<p><b>Change Type : </b> CHANGE </p>' +
                            
                            '</div>' +
                    '</div>';

          }else{
             html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Address : </b> ' + datatable_data.equifaxaddress[i] + '</p>' +
                            '<p><b>Available Date : </b> ' + datatable_data.newaddressavailabledate[i] + '</p>' +
                            '</div>' +
                    '</div>';
          }

        break;

        case 'Fraud Statement':
        case 'FraudAlert':
        case 'Fraud Alert':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>DateReported : </b> ' + datatable_data.frauddatereported[i] + '</p>' +
                            '<p><b>Comments : </b> ' + datatable_data.fraudcomments[i] + '</p>' +
                        '</div>' +
                    '</div>';

        break;

        case 'Potentially Negative':
        case 'PotentiallyNegative':
       
        if(bureau_type_al=='experian'){
          /* html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                         '<p><b>Delinq Creditor Name : </b> ' + datatable_data.delinqcreditorname[i] + '</p>' +
                          '<p><b>Business Type : </b> ' + datatable_data.delinqbusinessType[i] + '</p>' +
                           '<p><b>Is Collection : </b> ' + datatable_data.delinqisCollection[i] + '</p>' +
                            '<p><b>Balance Amount : </b> ' + datatable_data.newaccountamount[i] + '</p>' +
                            '<p><b>Address : </b> ' + datatable_data.address[i] + '</p>' +
                            '<p><b>Phone: tel : </b> ' + datatable_data.phone[i] + '</p>' +

                             '<p><b>Alert Sub Type : </b> ' + datatable_data.alertSubType[i] + '</p>' +
                            '<p><b>Opened Date : </b> ' + datatable_data.newaccountopenDate[i] + '</p>' +
                            '<p><b>Status Date : </b> ' + datatable_data.newaccountstatusDate[i] + '</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.alertDate[i] + '</p>' +
                        '</div>' +
                    '</div>';*/

                      html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.experianName[i]+'</p>' +
                            '<p><b>Address : </b> '+datatable_data.experianaddress[i]+'</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.experianalertDate[i] + '</p>' +
                            '<p><b>Phone : </b> ' + datatable_data.experianphone[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.experianbalanceAmount[i] + '</p>' +
                            '<p><b>Opened Date : </b> '+datatable_data.experianopenDate[i]+'</p>' +
                            '<p><b>Status Date : </b> '+datatable_data.experianstatusDate[i]+'</p>' +
                            '<p><b>Payment : </b> ' + datatable_data.experianpaymentStatus[i] + '</p>' +
                            '<p><b>Is Collection : </b> ' + datatable_data.experianisCollection[i] + '</p>' +
                            '<p><b>Business Type : </b> ' + datatable_data.experianbusinessType[i] + '</p>' +
                            '</div>' +
                    '</div>';

        }else if(bureau_type_al=='transunion')
        { 
          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>DateReported : </b> ' + datatable_data.frauddatereported[i] + '</p>' +
                            '<p><b>Comments : </b> ' + datatable_data.fraudcomments[i] + '</p>' +
                        '</div>' +
                    '</div>';
        } else{

          if(datatable_data.equifaxchangeType[i]=='NEW'){
           html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                         '<p><b>Client Name and Number : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Customer Name : </b> ' + datatable_data.equifaxcustomerName[i] + '</p>' +
                            '<p><b>Original Amount : </b> ' + datatable_data.equifaxamount[i] + '</p>' +
                            '<p><b>Change Type : </b> ' + datatable_data.equifaxchangeType[i] + '</p>' +
                            '<p><b>Assigned Date : </b> ' + datatable_data.equifaxassignedDate[i] + '</p>' +                        


                            '</div>' +
                    '</div>';
                }else{
                 
                 var ht='';
                 if(datatable_data.equifaxassignedDate[i]){
                  ht='<p><b>Assigned Date : </b> ' + datatable_data.equifaxassignedDate[i] + '</p>' ;
                 }
                   html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                         '<p><b>Client Name and Number : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                           ht
                           +
                            '<p><b>Narrative : </b> '+datatable_data.equifaxnarrativesStr[i]+'</p>' +
                           ht
                           +                         
                           
                           '<p><b>Change Type : </b> ' + datatable_data.equifaxchangeType[i] + '</p>' +
                            '<p><b>Open Date : </b> ' + datatable_data.equifaxdateOpened[i] + '</p>' +

                            '</div>' +
                    '</div>';
                  
                }

        }
         

        break;

        case 'CriminalData':

         html = '<div class="client_alerttype_description">'+
                        '<p class="tu_alert_description">' + data.monitoring_response + '</p>'+
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';
                   
        break;

        case 'ChangeAddress':

         html = '<div class="client_alerttype_description">'+
                        '<p class="tu_alert_description">' + data.monitoring_response + '</p>'+
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';
                   
        break;

        case 'DarkWeb':

         html = '<div class="client_alerttype_description">'+ data.monitoring_response +
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';
                   
        break;

        case 'NameChange':

         html = '<div class="client_alerttype_description">'+
                        '<p class="tu_alert_description">' + data.monitoring_response + '</p>'+
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';
                   
        break;

        case 'AccountNarrativeChangeAlert':
        case 'Account Narrative Change Alert':
       // case 'Potential Negative <span style="display:none;">AccountNarrativeChangeAlert</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Narratives : </b> ' + datatable_data.equifaxnarrativesStr[i] + '</p>' +
                            '<p><b>Opened Date : </b> ' + datatable_data.equifaxdateOpened[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'AccountActivityDesignatorChangeAlert':
        case 'Account Activity Designator Change Alert':
        case 'Potential Negative <span style="display:none;">AccountActivityDesignatorChangeAlert</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Change Type : </b> '+datatable_data.equifaxchangeType[i]+'</p>' +
                            '<p><b>Designator : </b> ' + datatable_data.equifaxdescription[i] + '</p>' +
                            '<p><b>Opened Date : </b> ' + datatable_data.equifaxdateOpened[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'AccountStatusChangeAlert':
        case 'Account Status Change Alert':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Address : </b> ' + datatable_data.equifaxaddress[i] + '</p>' +
                            '<p><b>Description : </b> ' + datatable_data.equifaxdescription[i] + '</p>' +
                            '<p><b>Opened Date : </b> ' + datatable_data.equifaxdateOpened[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'AccountStatusChange':
        case 'Account Status Change':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Address : </b> ' + datatable_data.equifaxaddress[i] + '</p>' +
                            '<p><b>Description : </b> ' + datatable_data.equifaxdescription[i] + '</p>' +
                            '<p><b>Opened Date : </b> ' + datatable_data.equifaxdateOpened[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'AddressAlert':
        case 'Address Alert':
        case 'New Address <span style="display:none;">Address Alert</span>':


          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Previous Address : </b> ' + datatable_data.equifaxaddress[i] + '</p>' +
                            '<p><b>New Address : </b> ' + datatable_data.equifaxaddress2[i] + '</p>' +
                             '<p><b>Change Type : </b> ' + datatable_data.addressAlertchangeType[i] + '</p>' +
                            
                            '</div>' +
                    '</div>';

        break;

        case 'BankruptcyAlert':
        case 'Bankruptcy Alert':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Court Name : </b> '+datatable_data.equifaxcourtName[i]+'</p>' +
                            '<p><b>Case Number : </b> '+datatable_data.equifaxcaseNumber[i]+'</p>' +
                            '<p><b>Filed Date : </b> ' + datatable_data.equifaxdateFiled[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'CollectionAlert':
        case 'Collection Alert':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Customer Name : </b> ' + datatable_data.equifaxcustomerName[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.equifaxamount[i] + '</p>' +
                            '<p><b>Assigned Date : </b> ' + datatable_data.equifaxassignedDate[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'InquiryAlert':
        case 'Inquiry Alert':
        case 'Inquiry':
        case 'New Inquiry <span style="display:none;">Inquiry</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Customer Name : </b> '+datatable_data.inquirername[i]+'</p>' +
                            '<p><b>Industry : </b> '+datatable_data.equifaxdescription[i]+'</p>' +
                            '<p><b>Phone : </b> ' + datatable_data.phone[i] + '</p>' +
                            '<p><b>Change Type : </b> ' + datatable_data.improvedindustryType[i] + '</p>' +
                            '<p><b>Address : </b> ' + datatable_data.address[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'NameAlert':
        case 'Credit <span style="display:none;">Name Alert</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Previous Name : </b> '+datatable_data.address[i]+'</p>' +
                            '<p><b>New Name : </b> '+datatable_data.equifaxaddress2[i]+'</p>' +
                            '<p><b>Change Type : </b> '+datatable_data.inquirychangetype[i]+'</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'TaxLienAlert':
        case 'TaxLien Alert':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Court Name : </b> '+datatable_data.equifaxcourtName[i]+'</p>' +
                            '<p><b>Case Number : </b> '+datatable_data.equifaxcaseNumber[i]+'</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.equifaxamount[i] + '</p>' +
                            '<p><b>Filed Date : </b> ' + datatable_data.equifaxdateFiled[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'TradeLineAlert':
        case 'TradeLine Alert':
        case 'New Account <span style="display:none;">TradeLine Alert</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.equifaxcreditorName[i]+'</p>' +
                            '<p><b>Account Number : </b> '+datatable_data.equifaxaccountNumber[i]+'</p>' +
                            '<p><b>Account Type : </b> ' + datatable_data.equifaxaccountType[i] + '</p>' +
                            '<p><b>Designator : </b> ' + datatable_data.equifaxdescription[i] + '</p>' +
                            '<p><b>Opened Date : </b> ' + datatable_data.equifaxdateOpened[i] + '</p>' +
                             '<p><b>Change Type : </b> ' + datatable_data.inquirychangetype[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'BankruptcyChange':
        case 'Bankruptcy Change':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Court Name : </b> '+datatable_data.experiancourtName[i]+'</p>' +
                            '<p><b>Case Number : </b> '+datatable_data.experiancaseNumber[i]+'</p>' +
                            '<p><b>Description : </b> ' + datatable_data.experiandescription[i] + '</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.experianalertDate[i] + '</p>' +
                            '<p><b>Filed Date : </b> ' + datatable_data.experianfiledDate[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'ChangeOfAddress':
        case 'Change Of Address':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Old Address : </b> '+datatable_data.experianaddress[i]+'</p>' +
                            '<p><b>Current Address : </b> '+datatable_data.experianaddress2[i]+'</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.experianalertDate[i] + '</p>' +
                            '<p><b>Move Date : </b> ' + datatable_data.experianmoveDate[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'PublicRecordBankruptcy':
        case 'Public Record Bankruptcy':
        case 'New Public <span style="display:none;">Public Record Bankruptcy</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.experianName[i]+'</p>' +
                            '<p><b>Address : </b> '+datatable_data.experianaddress[i]+'</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.experianalertDate[i] + '</p>' +
                            '<p><b>Filed Date : </b> ' + datatable_data.experianfiledDate[i] + '</p>' +
                            '<p><b>Phone : </b> ' + datatable_data.experianphone[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.experianbalanceAmount[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'Settlement':
         case 'New Public <span style="display:none;">Settlement</span>':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.experianName[i]+'</p>' +
                            '<p><b>Address : </b> '+datatable_data.experianaddress[i]+'</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.experianalertDate[i] + '</p>' +
                            '<p><b>Filed Date : </b> ' + datatable_data.experianfiledDate[i] + '</p>' +
                            '<p><b>Phone : </b> ' + datatable_data.experianphone[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.experianbalanceAmount[i] + '</p>' +
                            '<p><b>Opened Date : </b> '+datatable_data.experianopenDate[i]+'</p>' +
                            '<p><b>Status Date : </b> '+datatable_data.experianstatusDate[i]+'</p>' +
                            '<p><b>Payment : </b> ' + datatable_data.experianpaymentStatus[i] + '</p>' +
                            '<p><b>Is Collection : </b> ' + datatable_data.experianisCollection[i] + '</p>' +
                            '<p><b>Business Type : </b> ' + datatable_data.experianbusinessType[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'AccountInformation': case 'Account Information':
        case 'CardOverLimit': case 'Card Over Limit':
        case 'CollectionChange': case 'Collection Change':
        case 'Deceased':
        case 'LostOrStolenCard': case 'Lost Or Stolen Card':
        case 'MajorDerogatory': case 'Major Derogatory':
        case 'NewCollection': case 'New Collection':
        case 'SkipCannotLocate': case 'Skip Cannot Locate':
        case 'TradelineBankruptcy': case 'Tradeline Bankruptcy':
        case 'Delinquent':

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Account : </b> '+datatable_data.experianName[i]+'</p>' +
                            '<p><b>Address : </b> '+datatable_data.experianaddress[i]+'</p>' +
                            '<p><b>Alert Date : </b> ' + datatable_data.experianalertDate[i] + '</p>' +
                            '<p><b>Phone : </b> ' + datatable_data.experianphone[i] + '</p>' +
                            '<p><b>Amount : </b> ' + datatable_data.experianbalanceAmount[i] + '</p>' +
                            '<p><b>Opened Date : </b> '+datatable_data.experianopenDate[i]+'</p>' +
                            '<p><b>Status Date : </b> '+datatable_data.experianstatusDate[i]+'</p>' +
                            '<p><b>Payment : </b> ' + datatable_data.experianpaymentStatus[i] + '</p>' +
                            '<p><b>Is Collection : </b> ' + datatable_data.experianisCollection[i] + '</p>' +
                            '<p><b>Business Type : </b> ' + datatable_data.experianbusinessType[i] + '</p>' +
                            '</div>' +
                    '</div>';

        break;

        case 'IDPAlert': 

        if(datatable_data.idpclassName[i]=='COA' || datatable_data.idpclassName[i]=='coa'){      

          html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Class : </b> '+datatable_data.idpclassName[i]+'</p>' +
                            '<p><b>Status : </b> '+datatable_data.idpStatus[i]+'</p>' +
                            '<p><b>ID : </b> ' + datatable_data.idpID[i] + '</p>' + 
                            '<p><b>First Name : </b> '+datatable_data.idpfirstname[i]+'</p>' +
                            '<p><b>Last Name  : </b> '+datatable_data.idplastname[i]+'</p>' +
                            '<p><b>Full Name : </b> ' + datatable_data.idpnameFull[i] + '</p>' +   
                            '<p><b>Friendly Move Date : </b> '+datatable_data.idpfriendlyMoveDate[i]+'</p>' +
                            '<p><b>New Address : </b> '+datatable_data.idpnewAddress[i]+'</p>' +
                            '<p><b>Original Address : </b> ' + datatable_data.idporiginalAddress[i] + '</p>' +   
                            '<p><b>Create Date : </b> '+datatable_data.idpcreateDate[i]+'</p>' +
                            '<p><b>Updated Date : </b> '+datatable_data.idpupdatedDate[i]+'</p>' +
                            '<p><b>Alert Center Msg : </b> ' + datatable_data.idpalertCenterMsg[i] + '</p>' + 
                            '<p><b>Email Msg : </b> '+datatable_data.idpemailMsg[i]+'</p>' +
                            '<p><b>Email Subject : </b> '+datatable_data.idpemailSubject[i]+'</p>' +
                            '<p><b>Sms Msg : </b> ' + datatable_data.idpsmsMsg[i] + '</p>' +                               
                            '</div>' +
                    '</div>';

          }else if(datatable_data.idpclassName[i]=='PIM' || datatable_data.idpclassName[i]=='pim'){

          	html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                            '<p><b>Class : </b> '+datatable_data.idpclassName[i]+'</p>' +
                            '<p><b>Status : </b> '+datatable_data.idpStatus[i]+'</p>' +
                            '<p><b>ID : </b> ' + datatable_data.idpID[i] + '</p>' + 
                            '<p><b>Type : </b> '+datatable_data.idpType[i]+'</p>' +
                            '<p><b>Date Found  : </b> '+datatable_data.idpdateFound[i]+'</p>' +
                            '<p><b>Password Found : </b> ' + datatable_data.idppasswordFound[i] + '</p>' +   
                            '<p><b>Description : </b> '+datatable_data.idpDescription[i]+'</p>' +
                            '<p><b>Recommendations : </b> '+datatable_data.idpRecommendations[i]+'</p>' +
                            '<p><b>Source : </b> '+datatable_data.idpSource[i]+'</p>' +
                            '<p><b>Locale : </b> ' + datatable_data.idporiginalAddress[i] + '</p>' +  
                            '<p><b>Address : </b> ' + datatable_data.idpnewAddress[i] + '</p>' +   
                            '<p><b>City : </b> '+datatable_data.idpcity[i]+'</p>' +
                            '<p><b>State : </b> '+datatable_data.idpstate[i]+'</p>' +
                            '<p><b>Zip Code : </b> '+datatable_data.idpzipCode[i]+'</p>' +
                            '<p><b>Email Address : </b> ' + datatable_data.idpemailAddress[i] + '</p>' +   
                            '<p><b>Create Date : </b> '+datatable_data.idpcreateDate[i]+'</p>' +
                            '<p><b>Updated Date : </b> '+datatable_data.idpupdatedDate[i]+'</p>' +
                            '<p><b>Alert Center Msg : </b> ' + datatable_data.idpalertCenterMsg[i] + '</p>' + 
                            '<p><b>Email Msg : </b> '+datatable_data.idpemailMsg[i]+'</p>' +
                            '<p><b>Email Subject : </b> '+datatable_data.idpemailSubject[i]+'</p>' +
                            '<p><b>Sms Msg : </b> ' + datatable_data.idpsmsMsg[i] + '</p>' +                               
                            '</div>' +
                    '</div>';

          }else if(datatable_data.idpclassName[i]=='SSN' || datatable_data.idpclassName[i]=='ssn'){


          		html = '<div class="client_alerttype_details">' +
                        '<div class="client_alerttype_details_container">' +
                             '<p><b>Class : </b> '+datatable_data.idpclassName[i]+'</p>' +
                            '<p><b>Status : </b> '+datatable_data.idpStatus[i]+'</p>' +
                            '<p><b>ID : </b> ' + datatable_data.idpID[i] + '</p>' + 
                            '<p><b>First Name : </b> '+datatable_data.idpfirstname[i]+'</p>' +
                            '<p><b>Last Name  : </b> '+datatable_data.idplastname[i]+'</p>' +
                            '<p><b>UseCase : </b> ' + datatable_data.idpuseCase[i] + '</p>' +   
                            '<p><b>Public Acct Name : </b> '+ datatable_data.publicAcctName[i]+'</p>' +
                            '<p><b>Channel : </b> '+ datatable_data.idpchannel[i]+'</p>' +
                            '<p><b>Result : </b> ' + datatable_data.idpresult[i] + '</p>' + 
                            '<p><b>Failure Reason : </b> ' + datatable_data.idpfailureReason[i] + '</p>' +   
                            '<p><b>Create Date : </b> '+datatable_data.idpcreateDate[i]+'</p>' +
                            '<p><b>Updated Date : </b> '+datatable_data.idpupdatedDate[i]+'</p>' +
                            '<p><b>Alert Center Msg : </b> ' + datatable_data.idpalertCenterMsg[i] + '</p>' + 
                            '<p><b>Email Msg : </b> '+datatable_data.idpemailMsg[i]+'</p>' +
                            '<p><b>Email Subject : </b> '+datatable_data.idpemailSubject[i]+'</p>' +
                            '<p><b>Sms Msg : </b> ' + datatable_data.idpsmsMsg[i] + '</p>' +                               
                            '</div>' +
                    '</div>';

          }else{

          	 html = '<div class="client_alerttype_description">'+
                        '<p class="tu_alert_description">' + String(data.monitoring_response).replace(/<[^>]+>/gm, '') + '</p>'+
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';

          }

        break;
        default : 


        html = '<div class="client_alerttype_description">'+
                        '<p class="tu_alert_description">' + String(data.monitoring_response).replace(/<[^>]+>/gm, '') + '</p>'+
                    '</div>'+
                    '<div class="alerttype_blank">'+
                    '</div>';
                    break;
      }
    
      return html;
    }
  });