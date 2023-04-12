app.controller('creditReportController', function(Page,$scope,$http,$location) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    $scope.getdate = '';
    $scope.getdate_efx = '';
    $scope.getdate_exp = '';
    $scope.bureauType = 'transunion';
    $scope.allNullData='';
      
    if(tokenID==1) {
         tokenID='0';
         $http.get('ClientsController/updateflag/'+clientid).success(function($data) {
          });
    }
      
     Page.setTitle("Credit Report");
     $scope.creditreport = [];
     $scope.creditreport_efx = [];
     $scope.creditreport_exp = []; 
     $scope.SB168Frozen = [];
     $scope.tradelinepartition = [];
     $scope.inquirypartition = [];
     $scope.publicrecordattr = [];
     $scope.TradeLinePartitionnegative = []; 
     $scope.TradeLinePartitionpositive = [];
     $scope.transunionDescription = [];
     $scope.creditreportdata = [];
     $scope.creditreport2 =[];
     $scope.creditreport2_efx =[];
     $scope.creditreport2_exp =[];
     $scope.accountType = ["Credit Card","Line of credit","Charge account" ];
     
    $scope.clientID = clientid;
      
    $scope.activeTab = 'home';
    $scope.response_type = '';

    // to show graphs
    showScoreGraph('transunion');

    // to fill dates dropdown
    credit_report_dates('transunion');

    $scope.updateActiveTab = function(activeTab)
    {
      $scope.activeTab = activeTab;
      $scope.negativeAccountNo = '';
      $scope.positiveAccountNo = '';
    }
    $scope.negativeAccountNo = '';
    $scope.setNegativeItem = function(value,postion)
    {

      $('body').css('pointer-events','none');                                       
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
         $scope.negativeAccountNo = value+'-'+postion;
         console.log($scope.negativeAccountNo);
         var timeset=2000;
         if(postion==0){
            var timeset=4000;
         }
      setTimeout( function(){ 
       $('body').css('pointer-events','unset');                    
              $('body').css('opacity','1');                     
              $('.la-anim-10').hide();
      }  , timeset );

    }
    $scope.unSetNegativeItem = function()
    {
      $scope.negativeAccountNo = '';
            
    }

    $scope.positiveAccountNo = '';
    $scope.setPositiveItem = function(value,postion)
    {
      $scope.positiveAccountNo = value+'-'+postion;
    }

    $scope.unSetPositiveItem = function()
    {
      $scope.positiveAccountNo = '';
    }
    $scope.creditdate = [];
    $scope.creditime = [];
    
    function credit_report_dates(bureauType = 'transunion') {
        $http.get('ClientsController/credit_report/'+bureauType).success(function($data) {
          var ajaxTime= new Date().getTime();
          $('body').css('pointer-events','unset');                    
          $('body').css('opacity','1');                     
          $('.la-anim-10').hide();
                $scope.response=$data.response;
                if($scope.response==0) {
                    alert('you have been logout');
                    location.href = global_base_url+'logout';
                }
                $scope.creditreport=$data.tu;
                if($scope.creditreport.length > 0)
                {
                  $scope.getdate = $scope.creditreport[0].datetime;
                }
                
                $scope.creditreport_efx=$data.efx;
                if($scope.creditreport_efx.length > 0)
                {
                  $scope.getdate_efx = $scope.creditreport_efx[0].datetime;
                }

                $scope.creditreport_exp=$data.exp;
                if($scope.creditreport_exp.length > 0)
                {
                  $scope.getdate_exp = $scope.creditreport_exp[0].datetime;
                }
                var totalTime = new Date().getTime()-ajaxTime;
                console.log('credit report dates'+totalTime);

        });
    };

    $scope.reportdata = function(valdate,bureauType='transunion') {      
          var ajaxTime= new Date().getTime();
 
          $scope.partitionattr=[];
          $scope.TradeLinePartitionnegative=[];
          $scope.SB168Frozen=[];
          $scope.tradelinepartition=[];
          $scope.inquirypartition=[];
          $scope.TradeLinePartitionpositive=[];
          $scope.creditreport2=[];
          $scope.creditreport2_efx=[];
          $scope.creditreport2_exp=[];
          $scope.response_type = '';
          $scope.bureauType = '';
          $scope.messageForData = '';
          $('body').css('pointer-events','none');                     
          $('body').css('opacity','0.5');                     
          $('.la-anim-10').show();
          $http.get('ClientsController/report/'+valdate+'/'+bureauType).success(function($data) {
        
            $('body').css('pointer-events','unset');                    
            $('body').css('opacity','1');                     
            $('.la-anim-10').hide();

            if(valdate == 'nodate') credit_report_dates(bureauType);

            console.log($data);
          
            $scope.partitionattr=$data.publicrecordattr;
            $scope.TradeLinePartitionnegative=$data.TradeLinePartitionnegative;
            $scope.SB168Frozen=$data.SB168Frozen;
            $scope.tradelinepartition=$data.tradelinepartition;
            $scope.inquirypartition=$data.inquirypartition;
            $scope.TradeLinePartitionpositive=$data.TradeLinePartitionpositive;
            $scope.creditreport2=$data.creditreport1;
            $scope.creditreport2_efx=$data.creditreport1_efx;
            $scope.creditreport2_exp=$data.creditreport1_exp;
            if($data.creditreport1) $scope.getdate=$data.creditreport1;
            if($data.creditreport1_efx) $scope.getdate_efx=$data.creditreport1_efx;
            if($data.creditreport1_exp) $scope.getdate_exp=$data.creditreport1_exp;
            $scope.response_type = $data.response_type;
            $scope.bureauType = bureauType;
            $scope.messageForData = $data.messageForData;
                  
            if($data.publicrecordattr=='' && $data.TradeLinePartitionnegative==''){
                $scope.negativenoresult='No Result';
            }
            
            if($data.TradeLinePartitionpositive==null) {
                $scope.positivenoresult='No Result';
            }

            if($data.inquirypartition==null) {
                $scope.inquirynoresult='No Result';
            }

            // if($data.publicrecordattr=='' && $data.TradeLinePartitionnegative=='' && $data.TradeLinePartitionpositive=='' && $data.inquirypartition==null){
            if($data.allNullData == 'show') {    
                $scope.allNullData='show';
            }
            else
            {
                $scope.allNullData='';
            }
             var totalTime = new Date().getTime()-ajaxTime;
            console.log("reportdata"+totalTime);
          });
       
     };
     
    $scope.getreportdata = function(valdate,bureauType='transunion') {        
        $http.get('ClientsController/report/'+valdate+'/'+bureauType).success(function($data) {
            console.log($data);
              var ajaxTime= new Date().getTime();

            console.log('inside second');
            if(valdate == 'nodate') credit_report_dates(bureauType);
            $scope.partitionattr=$data.publicrecordattr;
            $scope.TradeLinePartitionnegative=$data.TradeLinePartitionnegative;
            $scope.SB168Frozen=$data.SB168Frozen;
            $scope.tradelinepartition=$data.tradelinepartition;
            $scope.inquirypartition=$data.inquirypartition;
            $scope.TradeLinePartitionpositive=$data.TradeLinePartitionpositive;
            $scope.creditreport2=$data.creditreport1;
            $scope.creditreport2_efx=$data.creditreport1_efx;
            $scope.creditreport2_exp=$data.creditreport1_exp;
            if($data.creditreport1) $scope.getdate=$data.creditreport1;
            if($data.creditreport1_efx) $scope.getdate_efx=$data.creditreport1_efx;
            if($data.creditreport1_exp) $scope.getdate_exp=$data.creditreport1_exp;
            $scope.response_type = $data.response_type;
            $scope.messageForData = $data.messageForData;
            $scope.bureauType = bureauType;
            
               if($data.publicrecordattr=='' && $data.TradeLinePartitionnegative==''){
                  $scope.negativenoresult='No Result';
              }
              
              if($data.TradeLinePartitionpositive==null) {
                  $scope.positivenoresult='No Result';
              }

              if($data.inquirypartition==null) {
                  $scope.inquirynoresult='No Result';
              }

            // if($data.publicrecordattr=='' && $data.TradeLinePartitionnegative=='' && $data.TradeLinePartitionpositive=='' && $data.inquirypartition==null){
            if($data.allNullData == 'show') {    
                $scope.allNullData='show';
            }
            else
            {
                $scope.allNullData='';
            }
            var totalTime = new Date().getTime()-ajaxTime;

            console.log("getreportdata"+totalTime);
                  
        });
          
    }
     
     
    //warning popup
    $scope.showModalwarningdispute = false;
    $scope.warningopen = function() {
      $scope.showModalwarningdispute = true;
    };
    $scope.warningclose = function() {
      $scope.showModalwarningdispute = false;
    };

    $scope.showModal = false;
    $scope.open = function() {
      $scope.showModal = true;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
    //
    
    
    $scope.downloadreport = function(getdate, id) {
        $http.get('ClientsController/get_transunion_report_pdf/'+getdate+'/'+id).success(function($data) {
            alert('fdsfdf');
            //$scope.pdfview=$data;
            $scope.pdfview=pdfMake.createPdf($data).open();

            // pdfDocGenerator.getDataUrl((dataUrl)=>{
            //     const targetElement=document.querySelector('#iframeContainer');
            //     const iframe=document.createElement('iframe');
            //     iframe.src=dataUrl;
            //     targetElement.appendChild(iframe);
            // });

            // $location.path('/openpdf'+pdfview);
            // return $data;

            // $window.open("data:application/pdf," + escape($data));

            // currentBlob = new Blob($data, {type: 'application/pdf'});
            // $scope.pdfUrl = URL.createObjectURL(currentBlob);

            // var file = new Blob([result.data], {type: 'application/pdf'});
            // alert(file);
            // var fileURL = window.URL.createObjectURL(file);

            // a.href = fileURL;
            // a.download = fileName;
            // a.click();

         });
    }
    
    
     
    $scope.IsHidden = true;
    $scope.reportaccordion = function($scope) {
        $scope.IsHidden = $scope.IsHidden === false ? true: false;
    }


    $scope.changeormaskaccountnumber = function(accountnumber){
        if(accountnumber.length > 7){
            //• Account numbers that are greater than seven digits long shall have the last four digits masked with an asterisk.
            changedaccountnumber = accountnumber.substr(0, accountnumber.length-4) + new Array(accountnumber.length-(accountnumber.length-5)).join('x') ;
        }else if(accountnumber.length > 3 && accountnumber.length <= 7){
            //• Account numbers that are more than three digits long and less than or equal to seven digits long shall have the last two digits masked with an asterisk.
            changedaccountnumber = accountnumber.substr(0, accountnumber.length-2) + new Array(accountnumber.length-(accountnumber.length-3)).join('x') ;
        }else{
            //• Account numbers that are less than or equal to three digits long shall not have any digits masked. 
            changedaccountnumber = accountnumber;
        }

        return changedaccountnumber; 
    }

    function showScoreGraph(bureauType = 'transunion') {
        // for score graphs
        var currentTime = new Date();
        var prevYear = currentTime.getFullYear()- 1;

        $http.get('ClientsController/get_totalitemtype/'+currentTime.getFullYear()).success(function($data) {
                    
           $http.get('ClientsController/get_totalitemtype/'+currentTime.getFullYear()).success(function($data) {
                var ajaxTime= new Date().getTime();


                $scope.itemtypetotal_str = $data.itemtypetotal_str;
                $scope.scoredata_xval = $data.scoredata_xval;
                $scope.scoredata_yval = $data.scoredata_yval;
                $scope.scoredata_date = $data.scoredata_date;

                $scope.scoredata_xvalefx = $data.scoredata_xvalefx;
                $scope.scoredata_yvalefx = $data.scoredata_yvalefx;
                $scope.scoredata_dateefx = $data.scoredata_dateefx;

                $scope.scoredata_xvalexp = $data.scoredata_xvalexp;
                $scope.scoredata_yvalexp = $data.scoredata_yvalexp;
                $scope.scoredata_dateexp = $data.scoredata_dateexp;

                // for line graph interval and range for tu
                $scope.min_transunion = $data.min_transunion;
                $scope.max_transunion = $data.max_transunion;
                $scope.interval = $data.interval;
    
                // for line graph interval and range for efx
                $scope.min_equifax = $data.min_equifax;
                $scope.max_equifax = $data.max_equifax;
                $scope.interval_equifax = $data.interval_equifax;
        
                // for line graph interval and range for exp
                $scope.min_experian = $data.min_experian;
                $scope.max_experian = $data.max_experian;
                $scope.interval_experian = $data.interval_experian;
                
                // for line graph interval and range common
                $scope.min_common = $data.min_common;
                $scope.max_common = $data.max_common;
                $scope.interval_common = $data.interval_common;
                
                // for tu
                if($data.higestscore !== null && $data.higestscore !== undefined){
                    $scope.higestscoreval = $data.higestscore.transunion;
                }
                else{
                    $scope.higestscoreval = 0;
                }

                // for efx
                if($data.higestscoreequifax !== null && $data.higestscoreequifax !== undefined){
                    $scope.higestscorevalequifax = $data.higestscoreequifax.equifax;
                }
                else{
                    $scope.higestscorevalequifax = 0;
                }

                // for exp
                if($data.higestscoreexperian !== null && $data.higestscoreexperian !== undefined){
                    $scope.higestscorevalexperian = $data.higestscoreexperian.experian;
                }
                else{
                    $scope.higestscorevalexperian = 0;
                }

                // score change for tu
                if($data.scorechange !== null && $data.scorechange !== undefined){
                    $scope.scorechange = $data.scorechange;
                }
                else{
                    $scope.scorechange = '';
                }

                // score change for efx
                if($data.scorechangeequifax !== null && $data.scorechangeequifax !== undefined){
                    $scope.scorechangeequifax = $data.scorechangeequifax;
                }
                else{
                    $scope.scorechangeequifax = '';
                }

                // score change for exp
                if($data.scorechangeexperian !== null && $data.scorechangeexperian !== undefined){
                    $scope.scorechangeexperian = $data.scorechangeexperian;
                }
                else{
                    $scope.scorechangeexperian = '';
                }
                // highest score lastupdated for tu
                if($data.higestscore_date !== null && $data.higestscore_date !== undefined && $data.higestscore_date !== ''){
                    $scope.lastupdated = $data.higestscore_date;
                }
                else{
                    $scope.lastupdated = '';
                }

                // highest score lastupdated for efx
                if($data.higestscore_date_equifax !== null && $data.higestscore_date_equifax !== undefined && $data.higestscore_date_equifax !== ''){
                    $scope.lastupdated_equifax = $data.higestscore_date_equifax;
                }
                else{
                    $scope.lastupdated_equifax = '';
                }

                // highest score lastupdated for exp
                if($data.higestscore_date_experian !== null && $data.higestscore_date_experian !== undefined && $data.higestscore_date_experian !== ''){
                    $scope.lastupdated_experian = $data.higestscore_date_experian;
                }
                else{
                    $scope.lastupdated_experian = '';
                }

                if($data.scoredata_xval == undefined)
                {
                    $scope.scoredata_xval = [];
                }

                if($data.scoredata_yval == undefined)
                {
                    $scope.scoredata_yval = [];
                }

                if($data.scoredata_date == undefined)
                {
                    $scope.scoredata_date = [];
                }

                // for equifax
                if($data.scoredata_xvalefx == undefined)
                {
                    $scope.scoredata_xvalefx = [];
                }

                if($data.scoredata_yvalefx == undefined)
                {
                    $scope.scoredata_yvalefx = [];
                }

                if($data.scoredata_dateefx == undefined)
                {
                    $scope.scoredata_dateefx = [];
                }

                // for experian
                if($data.scoredata_xvalexp == undefined)
                {
                    $scope.scoredata_xvalexp = [];
                }

                if($data.scoredata_yvalexp == undefined)
                {
                    $scope.scoredata_yvalexp = [];
                }

                if($data.scoredata_dateexp == undefined)
                {
                    $scope.scoredata_dateexp = [];
                }

                window.feed = function(callback) {
                    var tick = {};
                    tick.plot0 = Math.ceil($scope.higestscoreval);
                    callback(JSON.stringify(tick));
                };

                window.feed_equifax = function(callback) {
                    var tick = {};
                    tick.plot0 = Math.ceil($scope.higestscorevalequifax);
                    callback(JSON.stringify(tick));
                };

                window.feed_experian = function(callback) {
                    var tick = {};
                    tick.plot0 = Math.ceil($scope.higestscorevalexperian);
                    callback(JSON.stringify(tick));
                };
                $scope.higestscore = {
                    type: "gauge",

                    plotarea: {
                        marginTop: 40,
                        marginLeft: 40,
                        width: 275,
                    },
                    plot: {
                        size: '100%',
                        valueBox: {
                            placement: 'center',
                            text: '%v',
                            fontSize: 75,
                            fontWeight: 300,
                            fontFamily: "ProximaNovaT-Thin",
                            //fontWeight:100,
                            rules: [{
                                    rule: '%v >= 700',
                                    text: '%data-scorechange<br>%v<br><span style="font-size:25px !important;">%data-lastupdated</span>'
                                },
                                {
                                    rule: '%v < 700 && %v > 640',
                                    text: '%data-scorechange<br>%v<br><span style="font-size:25px !important;">%data-lastupdated</span>'
                                },
                                {
                                    rule: '%v < 640 && %v > 580',
                                    text: '%data-scorechange<br>%v<br><span style="font-size:25px !important;">%data-lastupdated</span>'
                                },
                                {
                                    rule: '%v < 580 && %v > 4',
                                    text: '%data-scorechange<br>%v<br><span style="font-size:25px !important;">%data-lastupdated</span>'
                                },
                                {
                                    rule: '%v == 4',
                                    fontSize: 16,
                                    padding:5,
                                    placement: 'center',
                                    text: 'Insufficient Data to Build Score',
                                    fontColor: "#333",
                                    fontFamily: "ProximaNovaA-Semibold",
                                    fontWeight: 'bold'
                                    
                                }
                            ]
                        }
                    },
                    tooltip: {
                        borderRadius: 5
                    },
                    scaleR: {
                        aperture: 200,
                        minValue: 300,
                        maxValue: 850,
                        step: 50,
                        center: {
                            visible: false
                        },
                        tick: {
                            visible: false,
                            /*lineColor : '#ffffff'*/
                        },
                        item: {
                            offsetR: 0,
                            rules: [{
                                rule: '%i == 9',
                                offsetX: 0
                            }]
                        },
                        labels: ['300', '', '', '', '', '', '580', '640', '700', '750', '', '850'],
                        ring: {
                            size: 7,
                            rules: [{
                                    rule: '%v <= 580',
                                    backgroundColor: '#ED193F'
                                },
                                {
                                    rule: '%v > 580 && %v < 640',
                                    backgroundColor: '#073750'
                                },
                                {
                                    rule: '%v >= 640 && %v < 700',
                                    backgroundColor: '#FFD324'
                                },
                                {
                                    rule: '%v >= 700 && %v < 750',
                                    backgroundColor: '#00B2E3'
                                },
                                {
                                    rule: '%v >= 750',
                                    backgroundColor: '#74C262'
                                }
                            ]
                        }
                    },
                    refresh: {
                        type: "feed",
                        transport: "js",
                        url: "feed()",
                        interval: 2,
                        resetTimeout: 1
                    },
                    series: [{
                        values: [$scope.higestscoreval], // starting value
                        "data-scorechange": [$scope.scorechange], // custom value
                        "data-lastupdated": [$scope.lastupdated], // custom value
                        backgroundColor: 'black',
                        indicator: [7, 7, 7, 7, 0.99],
                        animation: {
                            effect: 2,
                            method: 4,
                            sequence: 4,
                            speed: 2000
                        },
                    }]
                };

                $scope.higestscoreequifax = {
                    type: "gauge",

                    plotarea: {
                        marginTop: 40,
                        marginLeft: 40,
                        width: 275,
                    },
                    plot: {
                        size: '100%',
                        valueBox: {
                            placement: 'center',
                            text: '%v',
                            fontSize: 75,
                            fontWeight: 300,
                            fontFamily: "ProximaNovaT-Thin",
                            //fontWeight:100,
                            rules: [{
                                    rule: '%v >= 700',
                                    text: '%data-scorechangeequifax<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedequifax</span>'
                                },
                                {
                                    rule: '%v < 700 && %v > 640',
                                    text: '%data-scorechangeequifax<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedequifax</span>'
                                },
                                {
                                    rule: '%v < 640 && %v > 580',
                                    text: '%data-scorechangeequifax<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedequifax</span>'
                                },
                                {
                                    rule: '%v < 580 && %v > 4',
                                    text: '%data-scorechangeequifax<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedequifax</span>'
                                },
                                {
                                    rule: '%v == 4',
                                    fontSize: 16,
                                    padding:5,
                                    placement: 'center',
                                    text: 'Insufficient Data to Build Score',
                                    fontColor: "#333",
                                    fontFamily: "ProximaNovaA-Semibold",
                                    fontWeight: 'bold'
                                    
                                }
                            ]
                        }
                    },
                    tooltip: {
                        borderRadius: 5
                    },
                    scaleR: {
                        aperture: 200,
                        minValue: 300,
                        maxValue: 850,
                        step: 50,
                        center: {
                            visible: false
                        },
                        tick: {
                            visible: false,
                            /*lineColor : '#ffffff'*/
                        },
                        item: {
                            offsetR: 0,
                            rules: [{
                                rule: '%i == 9',
                                offsetX: 0
                            }]
                        },
                        labels: ['300', '', '', '', '', '', '580', '640', '700', '750', '', '850'],
                        ring: {
                            size: 7,
                            rules: [{
                                    rule: '%v <= 580',
                                    backgroundColor: '#ED193F'
                                },
                                {
                                    rule: '%v > 580 && %v < 640',
                                    backgroundColor: '#073750'
                                },
                                {
                                    rule: '%v >= 640 && %v < 700',
                                    backgroundColor: '#FFD324'
                                },
                                {
                                    rule: '%v >= 700 && %v < 750',
                                    backgroundColor: '#00B2E3'
                                },
                                {
                                    rule: '%v >= 750',
                                    backgroundColor: '#74C262'
                                }
                            ]
                        }
                    },
                    refresh: {
                        type: "feed",
                        transport: "js",
                        url: "feed_equifax()",
                        interval: 2,
                        resetTimeout: 1
                    },
                    series: [{
                        values: [$scope.higestscorevalequifax], // starting value
                        "data-scorechangeequifax": [$scope.scorechangeequifax], // custom value
                        "data-lastupdatedequifax": [$scope.lastupdated_equifax], // custom value
                        backgroundColor: 'black',
                        indicator: [7, 7, 7, 7, 0.99],
                        animation: {
                            effect: 2,
                            method: 4,
                            sequence: 4,
                            speed: 2000
                        },
                    }]
                };

                $scope.higestscoreexperian = {
                    type: "gauge",

                    plotarea: {
                        marginTop: 40,
                        marginLeft: 40,
                        width: 275,
                    },
                    plot: {
                        size: '100%',
                        valueBox: {
                            placement: 'center',
                            text: '%v',
                            fontSize: 75,
                            fontWeight: 300,
                            fontFamily: "ProximaNovaT-Thin",
                            //fontWeight:100,
                            rules: [{
                                    rule: '%v >= 700',
                                    text: '%data-scorechangeexperian<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedexperian</span>'
                                },
                                {
                                    rule: '%v < 700 && %v > 640',
                                    text: '%data-scorechangeexperian<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedexperian</span>'
                                },
                                {
                                    rule: '%v < 640 && %v > 580',
                                    text: '%data-scorechangeexperian<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedexperian</span>'
                                },
                                {
                                    rule: '%v < 580 && %v > 4',
                                    text: '%data-scorechangeexperian<br>%v<br><span style="font-size:25px !important;">%data-lastupdatedexperian</span>'
                                },
                                {
                                    rule: '%v == 4',
                                    fontSize: 16,
                                    padding:5,
                                    placement: 'center',
                                    text: 'Insufficient Data to Build Score',
                                    fontColor: "#333",
                                    fontFamily: "ProximaNovaA-Semibold",
                                    fontWeight: 'bold'
                                    
                                }
                            ]
                        }
                    },
                    tooltip: {
                        borderRadius: 5
                    },
                    scaleR: {
                        aperture: 200,
                        minValue: 300,
                        maxValue: 850,
                        step: 50,
                        center: {
                            visible: false
                        },
                        tick: {
                            visible: false,
                            /*lineColor : '#ffffff'*/
                        },
                        item: {
                            offsetR: 0,
                            rules: [{
                                rule: '%i == 9',
                                offsetX: 0
                            }]
                        },
                        labels: ['300', '', '', '', '', '', '580', '640', '700', '750', '', '850'],
                        ring: {
                            size: 7,
                            rules: [{
                                    rule: '%v <= 580',
                                    backgroundColor: '#ED193F'
                                },
                                {
                                    rule: '%v > 580 && %v < 640',
                                    backgroundColor: '#073750'
                                },
                                {
                                    rule: '%v >= 640 && %v < 700',
                                    backgroundColor: '#FFD324'
                                },
                                {
                                    rule: '%v >= 700 && %v < 750',
                                    backgroundColor: '#00B2E3'
                                },
                                {
                                    rule: '%v >= 750',
                                    backgroundColor: '#74C262'
                                }
                            ]
                        }
                    },
                    refresh: {
                        type: "feed",
                        transport: "js",
                        url: "feed_experian()",
                        interval: 2,
                        resetTimeout: 1
                    },
                    series: [{
                        values: [$scope.higestscorevalexperian], // starting value
                        "data-scorechangeexperian": [$scope.scorechangeexperian], // custom value
                        "data-lastupdatedexperian": [$scope.lastupdated_experian], // custom value
                        backgroundColor: 'black',
                        indicator: [7, 7, 7, 7, 0.99],
                        animation: {
                            effect: 2,
                            method: 4,
                            sequence: 4,
                            speed: 2000
                        },
                    }]
                };

                var Mon = [];
                var MOnth = [];
                var Val = [];
                var Years = [];
                var allMonths = ['Jan','Feb','Mar', 'Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var d = new Date();
                var n = d.getMonth();

                var d9 = new Date();
                var cur_year = d9.getFullYear().toString().substr(-2);
                var n9 = parseInt(cur_year);

                currentMonth = n+2;

                Mon.push(currentMonth);

                for (var i=0; i<13; i++) {

                    if(currentMonth < 1){  
                        Years.push(n9);
                    }else{
                        Mon1 = currentMonth - 1;
                        Year1 = n9;

                        if(Mon1 != 0){
                            Mon.push(Mon1); 
                            Years.push(Year1);
                        }else{
                            currentMonth = 12;
                            Mon1 = currentMonth;
                            Mon.push(currentMonth);
                            Year1 = n9-1;
                            Years.push(Year1);
                        }
                        currentMonth = Mon1; 
                        n9 = Year1;                       
                    }

                }
                
                currentMonth = n+2;
                currentMonthH = currentMonth*2;

                for (var i=13; i>=0; i--) {
                    switch(Mon[i]) {
                    case 1:
                        MOnth.push("jan");
                        break;
                    case 2:
                        MOnth.push("feb");
                        break;
                    case 3:
                        MOnth.push("mar");
                        break;
                    case 4:
                        MOnth.push("apr");
                        break;
                    case 5:
                        MOnth.push("may");
                        break;
                    case 6:
                        MOnth.push("jun");
                        break;
                    case 7:
                        MOnth.push("jul");
                        break;
                    case 8:
                        MOnth.push("aug");
                        break;
                    case 9:
                        MOnth.push("sep");
                        break;
                    case 10:
                        MOnth.push("oct");
                        break;
                    case 11:
                        MOnth.push("nov");
                        break;
                    case 12:
                        MOnth.push("dec");
                        break;
                    }
                }

                //for tu score array
                var newVal = [];
                var arrayLength = $scope.scoredata_xval.length;
                for (var i = 0; i < arrayLength; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_xval[i]);
                    temp.push(parseInt($scope.scoredata_yval[i]));
                    newVal.push(temp);
                }
                
                //for tu dates array
                var newdate = [];
                var arrayLengthd = $scope.scoredata_date.length;
                for (var i = 0; i < arrayLengthd; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_date[i]);
                    newdate.push(temp);
                }
                

                newVal.reverse();
                newdate.reverse();
                Years.reverse();

                //for efx score array
                var newValEquifax = [];
                var arrayLengthefx = $scope.scoredata_xvalefx.length;
                for (var i = 0; i < arrayLengthefx; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_xvalefx[i]);
                    temp.push(parseInt($scope.scoredata_yvalefx[i]));
                    newValEquifax.push(temp);
                }
                    
                //for efx dates array
                var newdateEquifax = [];
                var arrayLengthdefx = $scope.scoredata_dateefx.length;
                for (var i = 0; i < arrayLengthdefx; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_dateefx[i]);
                    newdateEquifax.push(temp);
                }
            
                newValEquifax.reverse();
                newdateEquifax.reverse();

                //for exp score array
                var newValExperian = [];
                var arrayLengthexp = $scope.scoredata_xvalexp.length;
                for (var i = 0; i < arrayLengthexp; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_xvalexp[i]);
                    temp.push(parseInt($scope.scoredata_yvalexp[i]));
                    newValExperian.push(temp);
                }
                    
                //for exp dates array
                var newdateExperian = [];
                var arrayLengthdexp = $scope.scoredata_dateexp.length;
                for (var i = 0; i < arrayLengthdexp; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_dateexp[i]);
                    newdateExperian.push(temp);
                }
                
                newValExperian.reverse();
                newdateExperian.reverse();
            
                if(MOnth[12] == "dec")
                {
                    MOnth.push("jan");
                    Years.push(parseInt(d9.getFullYear().toString().substr(-2))+1);
                }
                else
                {
                    Years.push(parseInt(d9.getFullYear().toString().substr(-2)));
                }

                //add years in x axis labels array
                for(var k=0; k < MOnth.length; k++)
                {
                    MOnth[k] = MOnth[k]+'-'+Years[k];
                }

                //console.log(newVal);
                //console.log(newdate);
                //console.log(MOnth);
                //console.log(Mon);
                //console.log(Years);

                
                if(arrayLength > 0 && arrayLengthd > 0)
                {
                    var zoom_to_valtu = 13-(Math.floor(newVal[0][0]));
                    var zoom_to_onetu = zoom_to_valtu-1;
                    var zoom_to_twotu = zoom_to_valtu+3;
                    var cur_month_indextu = newdate[0][0].indexOf(moment().subtract(1, "month").startOf("month").format('MMM'));
                }
                else
                {
                    var zoom_to_valtu = -1;
                    var zoom_to_onetu = 0;
                    var zoom_to_twotu = 0;
                    var cur_month_indextu = 0;
                }

                if(zoom_to_onetu > 9) { zoom_to_onetu = 9; }
                if(zoom_to_twotu < 4) { if(zoom_to_valtu < 0 || cur_month_indextu != -1) { zoom_to_onetu = 9; zoom_to_twotu = 13; } else {zoom_to_twotu = 4; } }

                // zoom values using efx
                if(arrayLengthefx > 0 && arrayLengthdefx > 0)
                {
                    var zoom_to_valefx = 13-(Math.floor(newValEquifax[0][0]));
                    var zoom_to_oneefx = zoom_to_valefx-1;
                    var zoom_to_twoefx = zoom_to_valefx+3;
                    var cur_month_indexefx = newdateEquifax[0][0].indexOf(moment().subtract(1, "month").startOf("month").format('MMM'));
                }
                else
                {
                    var zoom_to_valefx = -1;
                    var zoom_to_oneefx = 0;
                    var zoom_to_twoefx = 0;
                    var cur_month_indexefx = 0;
                }

                if(zoom_to_oneefx > 9) { zoom_to_oneefx = 9; }
                if(zoom_to_twoefx < 4) { if(zoom_to_valefx < 0 || cur_month_indexefx != -1) { zoom_to_oneefx = 9; zoom_to_twoefx = 13; } else {zoom_to_twoefx = 4; } }

                // zoom values using exp
                if(arrayLengthexp > 0 && arrayLengthdexp > 0)
                {
                    var zoom_to_valexp = 13-(Math.floor(newValExperian[0][0]));
                    var zoom_to_oneexp = zoom_to_valexp-1;
                    var zoom_to_twoexp = zoom_to_valexp+3;
                    var cur_month_indexexp = newdateExperian[0][0].indexOf(moment().subtract(1, "month").startOf("month").format('MMM'));
                }
                else
                {
                    var zoom_to_valexp = -1;
                    var zoom_to_oneexp = 0;
                    var zoom_to_twoexp = 0;
                    var cur_month_indexexp = 0;
                }

                if(zoom_to_oneexp > 9) { zoom_to_oneexp = 9; }
                if(zoom_to_twoexp < 4) { if(zoom_to_valexp < 0 || cur_month_indexexp != -1) { zoom_to_oneexp = 9; zoom_to_twoexp = 13; } else {zoom_to_twoexp = 4; } }

                // console.log(Math.floor(newVal[0][0])); console.log(zoom_to_val); console.log(zoom_to_one); console.log(zoom_to_two);

                $scope.mydata = {
                    "type": "line",
                    "scroll-x":{      
                    },
                    "scroll-y":{                  
                    },
                    // "scroll-x": {
                    //     "bar": {
                    //         "background-color": "#DCEDC8",
                    //         "alpha": 0.5
                    //     },
                    //     "handle": {
                    //         "background-color": "#8BC34A"
                    //     }
                    // },
                    "scale-x": {
                        //"values": "0:13:1",
                        "values" : [13,12,11,10,9,8,7,6,5,4,3,2,1,0],
                        "labels": MOnth,
                        "item": {
                            "max-chars": 6,
                            "font-size": 14,
                            "font-weight": 900,
                        },
                        "zooming":true,
                        "zoom-to":[zoom_to_onetu,zoom_to_twotu],
                        //"zoom-to":[8,13],
                        "guide": {
                          "lineStyle": 'solid',
                          "lineWidth": 1,
                          "visible": true
                        }
                    },
                    "scale-y": {
                        //"values": "300:900:110",
                        "minValue": $scope.min_transunion,
                        "maxValue": $scope.max_transunion,
                        "step": $scope.interval,

                        "item": {
                            "font-size": 14,
                            "font-weight": 900,
                        },  
                        "guide": {
                              "visible": false
                            }                   
                    },
                    "plotarea": {
                        "adjust-layout": true // For automatic margin adjustment.
                      },
                    "plot": {
         
                        "line-width": "10px",
                        "marker": {
                            "type": "circle",
                            "size": 9,
                            "background-color": "#7DC46C",
                            "borderColor": "#000000",
                            "borderWidth": "2",
                            "rules" : [  
                                {
                                    'rule': '%v <= 580',
                                    'backgroundColor': '#ED193F'
                                },
                                {
                                    'rule': '%v > 580 && %v < 640',
                                    'backgroundColor': '#073750'
                                },
                                {
                                    'rule': '%v >= 640 && %v < 700',
                                    'backgroundColor': '#FFD324'
                                },
                                {
                                    'rule': '%v >= 700 && %v < 750',
                                    'backgroundColor': '#00B2E3'
                                },
                                {
                                    'rule': '%v >= 750',
                                    'backgroundColor': '#74C262'
                                } 
                            ]
                        },
                        "tooltip": {
                          "text": " %data-custom <br> %v",
                          "font-color": "white",
                          "font-size": 14,
                          "font-weight" : "bold",                   
                          "callout": true,
                          "background-transparent": true,  
                          "background-repeat": false,  
                          "rules" : [  
                                {
                                    'rule': '%v <= 580',
                                    'backgroundColor': '#ED193F',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v > 580 && %v < 640',
                                    'backgroundColor': '#073750',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 640 && %v < 700',
                                    'backgroundColor': '#FFD324',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 700 && %v < 750',
                                    'backgroundColor': '#00B2E3',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 750',
                                    'backgroundColor': '#74C262',
                                    'borderColor' : '#000000'
                                } 
                            ]
                        }
                    }
                    ,
                    "series": [
                    {
                        "values": newVal,
                        "data-custom": newdate,
                    }
                    ]
                };

                $scope.mydataequifax = {
                    "type": "line",
                    "scroll-x":{      
                    },
                    "scroll-y":{                  
                    },
                    // "scroll-x": {
                    //     "bar": {
                    //         "background-color": "#DCEDC8",
                    //         "alpha": 0.5
                    //     },
                    //     "handle": {
                    //         "background-color": "#8BC34A"
                    //     }
                    // },
                    "scale-x": {
                        //"values": "0:13:1",
                        "values" : [13,12,11,10,9,8,7,6,5,4,3,2,1,0],
                        "labels": MOnth,
                        "item": {
                            "max-chars": 6,
                            "font-size": 14,
                            "font-weight": 900,
                        },
                        "zooming":true,
                        "zoom-to":[zoom_to_oneefx,zoom_to_twoefx],
                        //"zoom-to":[8,13],
                        "guide": {
                          "lineStyle": 'solid',
                          "lineWidth": 1,
                          "visible": true
                        }
                    },
                    "scale-y": {
                        //"values": "300:900:110",
                        "minValue": $scope.min_equifax,
                        "maxValue": $scope.max_equifax,
                        "step": $scope.interval_equifax,

                        "item": {
                            "font-size": 14,
                            "font-weight": 900,
                        },  
                        "guide": {
                              "visible": false
                            }                   
                    },
                    "plotarea": {
                        "adjust-layout": true // For automatic margin adjustment.
                      },
                    "plot": {
         
                        "line-width": "10px",
                        "marker": {
                            "type": "circle",
                            "size": 9,
                            "background-color": "#7DC46C",
                            "borderColor": "#000000",
                            "borderWidth": "2",
                            "rules" : [  
                                {
                                    'rule': '%v <= 580',
                                    'backgroundColor': '#ED193F'
                                },
                                {
                                    'rule': '%v > 580 && %v < 640',
                                    'backgroundColor': '#073750'
                                },
                                {
                                    'rule': '%v >= 640 && %v < 700',
                                    'backgroundColor': '#FFD324'
                                },
                                {
                                    'rule': '%v >= 700 && %v < 750',
                                    'backgroundColor': '#00B2E3'
                                },
                                {
                                    'rule': '%v >= 750',
                                    'backgroundColor': '#74C262'
                                } 
                            ]
                        },
                        "tooltip": {
                          "text": " %data-customequifax <br> %v",
                          "font-color": "white",
                          "font-size": 14,
                          "font-weight" : "bold",                   
                          "callout": true,
                          "background-transparent": true,  
                          "background-repeat": false,  
                          "rules" : [  
                                {
                                    'rule': '%v <= 580',
                                    'backgroundColor': '#ED193F',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v > 580 && %v < 640',
                                    'backgroundColor': '#073750',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 640 && %v < 700',
                                    'backgroundColor': '#FFD324',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 700 && %v < 750',
                                    'backgroundColor': '#00B2E3',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 750',
                                    'backgroundColor': '#74C262',
                                    'borderColor' : '#000000'
                                } 
                            ]
                        }
                    }
                    ,
                    "series": [
                    {
                        "values": newValEquifax,
                        "data-customequifax": newdateEquifax,
                    }
                    ]
                };

                $scope.mydataexperian = {
                    "type": "line",
                    "scroll-x":{      
                    },
                    "scroll-y":{                  
                    },
                    // "scroll-x": {
                    //     "bar": {
                    //         "background-color": "#DCEDC8",
                    //         "alpha": 0.5
                    //     },
                    //     "handle": {
                    //         "background-color": "#8BC34A"
                    //     }
                    // },
                    "scale-x": {
                        //"values": "0:13:1",
                        "values" : [13,12,11,10,9,8,7,6,5,4,3,2,1,0],
                        "labels": MOnth,
                        "item": {
                            "max-chars": 6,
                            "font-size": 14,
                            "font-weight": 900,
                        },
                        "zooming":true,
                        "zoom-to":[zoom_to_oneexp,zoom_to_twoexp],
                        //"zoom-to":[8,13],
                        "guide": {
                          "lineStyle": 'solid',
                          "lineWidth": 1,
                          "visible": true
                        }
                    },
                    "scale-y": {
                        //"values": "300:900:110",
                        "minValue": $scope.min_experian,
                        "maxValue": $scope.max_experian,
                        "step": $scope.interval_experian,

                        "item": {
                            "font-size": 14,
                            "font-weight": 900,
                        },  
                        "guide": {
                              "visible": false
                            }                   
                    },
                    "plotarea": {
                        "adjust-layout": true // For automatic margin adjustment.
                      },
                    "plot": {
         
                        "line-width": "10px",
                        "marker": {
                            "type": "circle",
                            "size": 9,
                            "background-color": "#7DC46C",
                            "borderColor": "#000000",
                            "borderWidth": "2",
                            "rules" : [  
                                {
                                    'rule': '%v <= 580',
                                    'backgroundColor': '#ED193F'
                                },
                                {
                                    'rule': '%v > 580 && %v < 640',
                                    'backgroundColor': '#073750'
                                },
                                {
                                    'rule': '%v >= 640 && %v < 700',
                                    'backgroundColor': '#FFD324'
                                },
                                {
                                    'rule': '%v >= 700 && %v < 750',
                                    'backgroundColor': '#00B2E3'
                                },
                                {
                                    'rule': '%v >= 750',
                                    'backgroundColor': '#74C262'
                                } 
                            ]
                        },
                        "tooltip": {
                          "text": " %data-customexperian <br> %v",
                          "font-color": "white",
                          "font-size": 14,
                          "font-weight" : "bold",                   
                          "callout": true,
                          "background-transparent": true,  
                          "background-repeat": false,  
                          "rules" : [  
                                {
                                    'rule': '%v <= 580',
                                    'backgroundColor': '#ED193F',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v > 580 && %v < 640',
                                    'backgroundColor': '#073750',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 640 && %v < 700',
                                    'backgroundColor': '#FFD324',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 700 && %v < 750',
                                    'backgroundColor': '#00B2E3',
                                    'borderColor' : '#000000'
                                },
                                {
                                    'rule': '%v >= 750',
                                    'backgroundColor': '#74C262',
                                    'borderColor' : '#000000'
                                } 
                            ]
                        }
                    }
                    ,
                    "series": [
                    {
                        "values": newValExperian,
                        "data-customexperian": newdateExperian,
                    }
                    ]
                };  
             });
        });
    };

});