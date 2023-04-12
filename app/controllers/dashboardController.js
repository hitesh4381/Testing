//define dashboardController 
app.controller('dashboardController', function(Page, $scope, $http, $window,$rootScope, $sce,$location,$filter) {
    //30 march add code for client status data
    //use for get account status data
    $scope.year_ = false;
    $('body').css('pointer-events', 'none');
    $('body').css('opacity', '0.5');
    $('.la-anim-10').show();

    $scope.openImage = function(path,type){    
    if(path!='')
    {
        if(type==2){          
          $window.open(path, 'New Window','width=screen.width,height=screen.height');
        }
        else{            
            $window.open(path, '_self');
        }        
    }    
  }


  /*line graph*/
$http.get('ClientsController/get_itemScore/'+clientid).success(function(data) {
            
            $scope.count = data.count;
           
            $scope.equifax = data.equifax;
            $scope.experian = data.experian;
            $scope.transunion = data.transunion;
            $scope.month= data.month;

           // console.log(data);


zingchart.render({
  id: 'myChartnew',
  data:  {
  "type": "line",
  "utc": true,
  "plotarea": {
    "margin": "dynamic 45 60 dynamic",
  },
  "legend": {
    "layout": "float",
    "background-color": "none",
    "border-width": 0,
    "shadow": 0,
    "align": "center",
    "adjust-layout": true,
    "font-weight": "bold",
    "toggle-action": "remove",
    "item": {
      "padding": 7,
      "marginRight": 17,
      "cursor": "hand"
    }
  },

   "scale-x":{
            "values": $scope.month,            
            "label":{
                "text":"",
                "font-size":"14px"
            }
        },
  "scale-y": {
    "line-color": "#f6f7f8",
    "shadow": 0,

    "guide": {
      "line-style": "dashed"
    },
    "tick": {
        "visible": false,
    },
    "minor-ticks": 0,
    "thousands-separator": ","
  },
  "crosshair-x": {
    "line-color": "#e5e5e5",
    "plot-label": {
      "border-radius": "5px",
      "border-width": "1px",
      "border-color": "#f6f7f8",
      "padding": "10px",
      "font-weight": "bold"
    },
    "scale-label": {
      "font-color": "#000",
      "background-color": "#eef2f5",
      "border-radius": "5px",
      "font-size": "12px",
      "font-weight": "600"
    }
  },
  "tooltip": {
    "visible": true
  },
  "plot": {
    "highlight": true,
    "tooltip-text": "%t views: %v<br>%k",
    "shadow": 0,
    "line-width": "3px",
    "marker": {
      "type": "circle",
      "size": 3
    },
    "highlight-state": {
      "line-width": 3
    },
    "animation": {
      "effect": 1,
      "sequence": 2,
      "speed": 100,
    }
  },
  "series": [{
      "values":$scope.transunion,
      "text": "Transunion",
      "line-color": "#00a2cf",
      "legend-item": {
        "background-color": "#ffffff",
        "font-color": "#00a2cf",
        "font-size": 15,
        "font-weight": 'bold'
      },
      "legend-marker": {
        "visible": true
      },
      "marker": {
        "background-color": "#00a2cf",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#00a2cf"
      },
      "highlight-marker": {
        "size": 4,
        "background-color": "#00a2cf",
      }
    },
    {
      "values": $scope.equifax,
      "text": "Equifax",
      "line-color": "#dd173b",
      "legend-item": {
        "font-color": "#dd173b",
        "background-color": "white",
        "font-size": 15,
        "font-weight": 'bold',
      },
      "legend-marker": {
        "visible": true
      },
      "marker": {
        "background-color": "#dd173b",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#dd173b"
      },
      "highlight-marker": {
        "size": 4,
        "background-color": "#dd173b",
      }
    },
    {
      "values": $scope.experian,
      "text": "Experian",
      "line-color": "#6cb65c",
      "legend-item": {
        "font-color": "#6cb65c",
        "background-color": "white",
        "font-weight": "bold",
        "font-size": 15
      },
      "legend-marker": {
        "visible": true
      },
      "marker": {
        "background-color": "#6cb65c",
        "border-width": 1,
        "shadow": 0,
        "border-color": "#6cb65c"
      },
      "highlight-marker": {
        "size": 4,
        "background-color": "#6cb65c",
      }
    }
  ]
},
  height: '100%',
  width: '100%'
});

});

/*line graph*/

    var myEl3 = '';
    myEl3 = angular.element( document.querySelector( '#centerContent' ) );
    myEl3.html($rootScope.centerContent);

    $scope.lodingslider=true;
    //====================================
    // Slick Slider Single
    //====================================
    $scope.autoplayslider = true;
    $scope.sliderSpeed = 3000;
    $http.get('ClientsController/getsliderImgValue').success(function(data) {

        $scope.sliderimgData=[];
        $scope.sliderimgData = data.slider;
        $scope.lodingslider=false;
        if(data.sliderSpeedRecord)
        {
            $scope.sliderSpeed = parseInt(data.sliderSpeedRecord.sliderSpeed);
            $scope.sliderScrollStatus = parseInt(data.sliderSpeedRecord.sliderSpeedStatus);
            if($scope.sliderScrollStatus===1){
                $scope.autoplayslider = true;
            }
            else{
                 $scope.autoplayslider=false;
            }
        }
        $scope.slickCurrentIndex = 0;
        $scope.slickConfig = {
          dots: false,
          autoplay: $scope.autoplayslider,
          adaptiveHeight: true,
          respondTo : 'slider',
          adaptiveHeight: true,
         // initialSlide: 3,
         // infinite: true,
          autoplaySpeed: $scope.sliderSpeed,
          method: {},
          event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
              //console.log('before change', Math.floor((Math.random() * 10) + 100));
              
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
              $scope.slickCurrentIndex = currentSlide;
            },
            breakpoint: function (event, slick, breakpoint) {
              //console.log('breakpoint');
            },
            destroy: function (event, slick) {
              //console.log('destroy');
            },
            edge: function (event, slick, direction) {
              //console.log('edge');
            },
            reInit: function (event, slick) {
              //console.log('re-init');
            },
            init: function (event, slick) {
              //console.log('init');
            },
            setPosition: function (evnet, slick) {
              //console.log('setPosition');
               
            },
            swipe: function (event, slick, direction) {
              //console.log('swipe');
            }
          }
        };
        // alert($scope.autoplayslider+'hi');
        // alert($scope.sliderScrollStatus+'hello');
        // alert($scope.autoplayslider);
    });
   // $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.slickConfig1Loaded = true;
    $scope.updateNumber1 = function () {
      $scope.slickConfig1Loaded = false;
      $scope.number1[2] = '123';
      $scope.number1.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig1Loaded = true;
      }, 5);
    };

    // Check client status
    $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
        $scope.clientAccountStatus = data.clientStatusData;
        $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
        $scope.title = data.clientStatusData.title;
        $scope.statushold = data.clientStatusData.alert_hold_client_enable;

        if (data.clientStatusData.alert_hold_client_enable == '1' && data.clientStatusData.id == '9') {
            //warning popup
            $scope.popupCondtion = '1';
            $scope.showModalwarning = true;

            setInterval(function() {
                $('.modal-backdrop').remove();
                $("#myModal").fadeIn("fast");
                $("#myModal").animate({
                    top: '250px'
                });
            }, 500);
        } else {
            $scope.popupCondtion = '0';
            $scope.showModalwarning = false;
            if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
        }
        }
    });

      if (tokenID != 0) {
        //window.location.href('https://dev.thecreditpros.com/clients#/Transunion/client_credit_report');
        location.href = base_url + 'clients#/Transunion/client_credit_report';
    } else {

        Page.setTitle("Client Dashboard");
        $scope.dashboarddata = [];

        $http.get('ClientsController/clientCreditReportData/' + clientid).success(function($data) {
            //console.log($data.tusummery.OpenAccounts);
            $scope.tusummerypast = $data['transunion'][1];
            $scope.tusummerylatest = $data['transunion'][0];
            $scope.efxsummerypast = $data['equifax'][1];
            $scope.efxsummerylatest = $data['equifax'][0];
            $scope.expsummerypast = $data['experian'][1];
            $scope.expsummerylatest = $data['experian'][0];
        });



        //$scope.myData = [1,4,5,5,10];
        $scope.leadToclientUpsell = 0;
        $scope.ProgramUpsell = 0;

        $http.get('ClientsController/get_itemstatus').success(function($data) {
            //console.log($data);
            //console.log( $data.status );
            if(  $data.status=="error" )
             { 
                 var prev_class =  $("#credit_progress").attr("class");
                 var prev_class2 =  $("#custom-overlay").attr("class");
                 var prev_class3 =  $("#custom-overlay-IDP").attr("class");

                 var prev_class_IDP =  $(".IDP").attr("class");
                 $(".IDP").attr("class" , prev_class_IDP + " blurred" );

                 $("#credit_progress").attr("class" , prev_class + " blurred" );
                 $("#custom-overlay").attr("class" , "custom-overlay" );
                 $("#custom-overlay-IDP").attr("class" , "custom-overlay" );

                $scope.leadToclientUpsell = $data.lead_to_client_status;
                $scope.ProgramUpsell = $data.program_type_status;
             }  
            $scope.itemnegative = $data.itemnegative;
            $scope.itemNegativeBureaus = {
                globals: {
                    fontFamily: 'sans-serif',
                },
                title: {
                  textAlign: 'center',
                  text: "Negative Items",
                  fontSize: 16,
                  fontWeight: 'bold !important',
                  fontColor: "#000",
                  margin: '10%'
                },
                type: "pie3d",
                backgroundColor: "#fff",
                "plotarea": {
                    "adjust-layout": true // For automatic margin adjustment.
                },
                legend:{
                  verticalAlign: 'bottom',
                  toggleAction: 'disabled',
                  marginRight: "20%",
                  alpha: 0.1,
                  borderWidth: 0,
                  highlightPlot: true,
                  item:{
                    fontColor: "#373a3c",
                    fontSize: 12
                  }
                },
                plotarea:{ 
                  margin: '0px 0px 2px 0px', //margin: 'dynamic' will also work
                  //alternative syntax
                  _marginTop: '0px',
                  _marginRight: '0px',
                  _marginBottom: '2px',
                  _marginLeft: '0px',
                //note you can set some margins to be dynamic and other to be pixels or %
                  backgroundColor:'#fff'
                },
                plot:{
                    "offset-r":"1%",
                    refAngle: 270,
                    detach: true,
                    valueBox:{
                        fontColor: "#fff",
                        placement: "in",
                        text: "%v",
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    "tooltip":{
                      "text":"%t: %v",
                      "font-color": "white",
                      "font-size": 20,
                      "font-weight": "bold",
                      "font-style": "normal",
                      "padding": "2% 10%",
                      "border-radius": "5px"
                    },
                    
                },
                palette:["#00B2E3","#ED193F","#74C262"],
                series: $scope.itemnegative
            };
            $scope.itempositive = $data.itempositive;
            $scope.itemdeleted = $data.itemdeleted;
            $scope.itemdeletedBureaus = {
                globals: {
                    fontFamily: 'sans-serif',
                },
                title: {
                  textAlign: 'center',
                  text: "Deleted Items",
                  fontSize: 16,
                  fontWeight: 'bold !important',
                  fontColor: "#000",
                  margin: '10%'
                },
                type: "pie3d",
                backgroundColor: "#fff",
                "plotarea": {
                    "adjust-layout": true // For automatic margin adjustment.
                },
                legend:{
                  verticalAlign: 'bottom',
                  toggleAction: 'disabled',
                  marginRight: "20%",
                  alpha: 0.1,
                  borderWidth: 0,
                  highlightPlot: true,
                  item:{
                    fontColor: "#373a3c",
                    fontSize: 12
                  }
                },
                plotarea:{ 
                  margin: '0px 0px 2px 0px', //margin: 'dynamic' will also work
                  //alternative syntax
                  _marginTop: '0px',
                  _marginRight: '0px',
                  _marginBottom: '2px',
                  _marginLeft: '0px',
                //note you can set some margins to be dynamic and other to be pixels or %
                  backgroundColor:'#fff'
                },
                plot:{
                    "offset-r":"1%",
                    refAngle: 270,
                    detach: true,
                    valueBox:{
                        fontColor: "#fff",
                        placement: "in",
                        text: "%v",
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    "tooltip":{
                      "text":"%t: %v",
                      "font-color": "white",
                      "font-size": 20,
                      "font-weight": "bold",
                      "font-style": "normal",
                      "padding": "2% 10%",
                      "border-radius": "5px"
                    },
                    
                },
                palette:["#00B2E3","#ED193F","#74C262"],
                series: $scope.itemdeleted
            };
            $scope.itemrepaired = $data.itemrepaired;
            $scope.itemrepairedBureaus = {
                globals: {
                    fontFamily: 'sans-serif',
                },
                title: {
                  textAlign: 'center',
                  text: "Repaired Items",
                  fontSize: 16,
                  fontWeight: 'bold !important',
                  fontColor: "#000",
                  margin: '10%'
                },
                type: "pie3d",
                backgroundColor: "#fff",
                "plotarea": {
                    "adjust-layout": true // For automatic margin adjustment.
                },
                legend:{
                  verticalAlign: 'bottom',
                  toggleAction: 'disabled',
                  marginRight: "20%",
                  alpha: 0.1,
                  borderWidth: 0,
                  highlightPlot: true,
                  item:{
                    fontColor: "#373a3c",
                    fontSize: 12
                  }
                },
                plotarea:{ 
                  margin: '0px 0px 2px 0px', //margin: 'dynamic' will also work
                  //alternative syntax
                  _marginTop: '0px',
                  _marginRight: '0px',
                  _marginBottom: '2px',
                  _marginLeft: '0px',
                //note you can set some margins to be dynamic and other to be pixels or %
                  backgroundColor:'#fff'
                },
                plot:{
                    "offset-r":"1%",
                    refAngle: 270,
                    detach: true,
                    valueBox:{
                        fontColor: "#fff",
                        placement: "in",
                        text: "%v",
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    "tooltip":{
                      "text":"%t: %v",
                      "font-color": "white",
                      "font-size": 20,
                      "font-weight": "bold",
                      "font-style": "normal",
                      "padding": "2% 10%",
                      "border-radius": "5px"
                    },
                    
                },
                palette:["#00B2E3","#ED193F","#74C262"],
                series: $scope.itemrepaired
            };

            $scope.iteminquires = $data.iteminquires;
            $scope.iteminquiresBureaus = {
                globals: {
                    fontFamily: 'sans-serif',
                },
                title: {
                  textAlign: 'center',
                  text: "Inquiries",
                  fontSize: 16,
                  fontWeight: 'bold !important',
                  fontColor: "#000",
                  margin: '10%'
                },
                type: "pie3d",
                backgroundColor: "#fff",
                "plotarea": {
                    "adjust-layout": true // For automatic margin adjustment.
                },
                legend:{
                  verticalAlign: 'bottom',
                  toggleAction: 'disabled',
                  marginRight: "20%",
                  alpha: 0.1,
                  borderWidth: 0,
                  highlightPlot: true,
                  item:{
                    fontColor: "#373a3c",
                    fontSize: 12
                  }
                },
                plotarea:{ 
                  margin: '0px 0px 2px 0px', //margin: 'dynamic' will also work
                  //alternative syntax
                  _marginTop: '0px',
                  _marginRight: '0px',
                  _marginBottom: '2px',
                  _marginLeft: '0px',
                //note you can set some margins to be dynamic and other to be pixels or %
                  backgroundColor:'#fff',
                },
                plot:{
                    "offset-r":"1%",
                    refAngle: 270,
                    detach: true,
                    valueBox:{
                        fontColor: "#fff",
                        placement: "in",
                        text: "%v",
                        fontSize: 18,
                        fontWeight: 'bold',
                    },
                    "tooltip":{
                      "text":"%t: %v",
                      "font-color": "white",
                      "font-size": 20,
                      "font-weight": "bold",
                      "font-style": "normal",
                      "padding": "2% 10%",
                      "border-radius": "5px"
                    },
                    
                },
                palette:["#00B2E3","#ED193F","#74C262"],
                series: $scope.iteminquires
            };
        });

        var currentTime = new Date();
        var prevYear = currentTime.getFullYear()- 1;

        $http.get('ClientsController/get_totalitemtype/'+currentTime.getFullYear()).success(function($data) {

            // if($data.scoreavgjan == undefined && $data.scoreavgfeb == undefined && $data.scoreavgmar == undefined 
            //     && $data.scoreavgapr == undefined && $data.scoreavgmay == undefined && $data.scoreavgjune == undefined
            //     && $data.scoreavgjuly == undefined && $data.scoreavgaug == undefined && $data.scoreavgsep == undefined
            //     && $data.scoreavgoct == undefined && $data.scoreavgnov == undefined && $data.scoreavgdec == undefined
            //     )
            // {

                // var currentTime = new Date();
                // var prevYear = currentTime.getFullYear()- 1;

                // $scope.data = {year : ''+prevYear+''};

        //var currentTime = new Date();
        //var prevYear = currentTime.getFullYear()- 1;        
                
        //$http.get('ClientsController/get_totalitemtype/'+currentTime.getFullYear()).success(function($data) {
            
            $scope.original = $data.original;
            $scope.collection = $data.collection;
            $scope.inquries = $data.inquries;
            $scope.publicrecord = $data.publicrecord;
            $scope.other = $data.other;

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

            // for line graph interval and range
            $scope.min_common = $data.min_common;
            $scope.max_common = $data.max_common;
            $scope.interval_common = $data.interval_common;
            
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

            // score change
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

            // highest score
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
                plot: {
                    size: '100%',
                    valueBox: {
                        placement: 'center',
                        text: '%v',
                        fontSize: 55,
                        fontWeight: 300,
                        fontFamily: "ProximaNovaT-Thin",
                        //fontWeight:100,
                        rules: [{
                                rule: '%v >= 700',
                                text: '%data-scorechange<br>%v<br><span style="font-size:16px !important;">%data-lastupdated</span>'
                            },
                            {
                                rule: '%v < 700 && %v > 640',
                                text: '%data-scorechange<br>%v<br><span style="font-size:16px !important;">%data-lastupdated</span>'
                            },
                            {
                                rule: '%v < 640 && %v > 580',
                                text: '%data-scorechange<br>%v<br><span style="font-size:16px !important;">%data-lastupdated</span>'
                            },
                            {
                                rule: '%v < 580 && %v > 4',
                                text: '%data-scorechange<br>%v<br><span style="font-size:16px !important;">%data-lastupdated</span>'
                            },
                            {
                                rule: '%v == 4',
                                fontSize: 13.5,
                                padding:4,
                                placement: 'center',
                                text: '<p>&nbsp;</p> <br><span>Insufficient Data to Build Score</span>',
                                fontColor: "#333",
                                fontFamily: "ProximaNovaA-Semibold",
                                fontWeight: 'normal',
                                
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
                        method: 1,
                        sequence: 4,
                        speed: 2000
                    },
                }]
            };



            // for equifax gauge graph
            $scope.higestscoreequifax = {
                type: "gauge",
                plot: {
                    size: '100%',
                    valueBox: {
                        placement: 'center',
                        text: '%v',
                        fontSize: 55,
                        fontWeight: 300,
                        fontFamily: "ProximaNovaT-Thin",
                        //fontWeight:100,
                        rules: [{
                                rule: '%v >= 700',
                                text: '%data-scorechangeequifax<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedequifax</span>'
                            },
                            {
                                rule: '%v < 700 && %v > 640',
                                text: '%data-scorechangeequifax<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedequifax</span>'
                            },
                            {
                                rule: '%v < 640 && %v > 580',
                                text: '%data-scorechangeequifax<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedequifax</span>'
                            },
                            {
                                rule: '%v < 580 && %v > 4',
                                text: '%data-scorechangeequifax<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedequifax</span>'
                            },
                            {
                                rule: '%v == 4',
                                fontSize: 13.5,
                                padding:4,
                                placement: 'center',
                                text: '<p>&nbsp;</p> <br><span>Insufficient Data to Build Score</span>',
                                fontColor: "#333",
                                fontFamily: "ProximaNovaA-Semibold",
                                fontWeight: 'normal',
                                
                                
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
                        // lineColor : '#ffffff'
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

            // for experian gauge graph
            $scope.higestscoreexperian = {
                type: "gauge",
                plot: {
                    size: '100%',
                    valueBox: {
                        placement: 'center',
                        text: '%v',
                        fontSize: 55,
                        fontWeight: 300,
                        fontFamily: "ProximaNovaT-Thin",
                        //fontWeight:100,
                        rules: [{
                                rule: '%v >= 700',
                                text: '%data-scorechangeexperian<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedexperian</span>'
                            },
                            {
                                rule: '%v < 700 && %v > 640',
                                text: '%data-scorechangeexperian<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedexperian</span>'
                            },
                            {
                                rule: '%v < 640 && %v > 580',
                                text: '%data-scorechangeexperian<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedexperian</span>'
                            },
                            {
                                rule: '%v < 580 && %v > 4',
                                text: '%data-scorechangeexperian<br>%v<br><span style="font-size:16px !important;">%data-lastupdatedexperian</span>'
                            },
                            {
                                rule: '%v == 4',
                                fontSize: 13.5,
                                padding:4,
                                placement: 'center',
                                text: '<p>&nbsp;</p> <br><span>Insufficient Data to Build Score</span>',
                                fontColor: "#333",
                                fontFamily: "ProximaNovaA-Semibold",
                                fontWeight: 'normal',                                
                               
                                

                                
                                
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

                //for score array
                var newVal = [];
                var arrayLength = $scope.scoredata_xval.length;
                for (var i = 0; i < arrayLength; i++) 
                {
                    var temp = [];
                    temp.push($scope.scoredata_xval[i]);
                    temp.push(parseInt($scope.scoredata_yval[i]));
                    newVal.push(temp);
                }
                
                //for dates array
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

            // console.log(Math.floor(newVal[0][0])); console.log(zoom_to_val); console.log(zoom_to_one); console.log(zoom_to_two);

            zoom_to_val = Math.min(zoom_to_valtu, zoom_to_valefx, zoom_to_valexp);
            zoom_to_one = Math.min(zoom_to_onetu, zoom_to_oneefx, zoom_to_oneexp);
            zoom_to_two = Math.max(zoom_to_twotu, zoom_to_twoefx, zoom_to_twoexp);
            cur_month_index = Math.max(cur_month_indextu, cur_month_indexefx, cur_month_indexexp);

                // console.log(Math.floor(newVal[0][0])); console.log(zoom_to_val); console.log(zoom_to_one); console.log(zoom_to_two);

                if(zoom_to_one > 9) { zoom_to_one = 9; }
                if(zoom_to_two < 4) { if(zoom_to_val < 0 || cur_month_index != -1) { zoom_to_one = 9; zoom_to_two = 13; } else {zoom_to_two = 4; } }
            

            $scope.mydata = {
                "type": "line",
                 "utc": true,
                "scroll-x":{      
                },
                "scroll-y":{                  
                },
                "scale-x": {
                    //"values": "0:13:1",
                     "shadow": 0,
                    "minor-ticks": 0,
                    "values" : [13,12,11,10,9,8,7,6,5,4,3,2,1,0],
                    "labels": MOnth,
                    "item": {
                        "max-chars": 6,
                        "font-size": 14,
                        "font-weight": 900,
                    },
                    "zooming":true,
                    "zoom-to":[zoom_to_one,zoom_to_two],
                    //"zoom-to":[0,6],
                    "guide": {
                      "lineStyle": 'solid',
                      "lineWidth": 1,
                      "visible": true
                    }
                },
                "scale-y": {
                    //"values": "300:900:110",
                   "minValue": $scope.min_common,
                    "maxValue": $scope.max_common,
                    "step": $scope.interval_common,
                    "item": {
                        "font-size": 14,
                        "font-weight": 900,
                    },  
                    "guide": {
                          "visible": false
                        }                   
                },
                "plotarea": {
                    "adjust-layout": true  //For automatic margin adjustment. 
                  },
                "plot": {
                     "highlight": true,
                    "shadow": 0,
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
                    "highlight-state": {
                      "line-width": 3
                    },
                    "animation": {
                      "effect": 1,
                      "sequence": 2,
                      "speed": 100,
                    },
                    "tooltip": {
                      "text": " %data-custom <br> %v",
                      "font-color": "white",
                      "font-size": 14,
                      "font-weight" : "bold", 
                      "stickyTracking": false,                  
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
                    "text": "Transunion",
                      "line-color": "#00a2cf",
                      "legend-item": {
                        "background-color": "#ffffff",
                        "font-color": "#00a2cf",
                        "font-size": 15
                      },
                      "legend-marker": {
                        "visible": true
                      },
                      "marker": {
                        "background-color": "#00a2cf",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                      },
                      "highlight-marker": {
                        "size": 5,
                        "background-color": "#00a2cf",
                      }
                  },
                  {
                      "values": newValEquifax,
                      "data-custom": newdateEquifax,
                      "text": "Equifax",
                      "line-color": "#dd173b",
                      "legend-item": {
                        "font-color": "#dd173b",
                        "background-color": "white",
                        "font-size": 15,
                        "font-weight": 'bold',
                      },
                      "legend-marker": {
                        "visible": true
                      },
                      "marker": {
                        "background-color": "#dd173b",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69f2d0"
                      },
                      "highlight-marker": {
                        "size": 5,
                        "background-color": "#dd173b",
                      }
                  },
                  {
                      "values": newValExperian,
                      "data-custom": newdateExperian,
                      "text": "Experian",
                      "line-color": "#6cb65c",
                      "legend-item": {
                        "font-color": "#6cb65c",
                        "background-color": "white",
                        "font-weight": "bold",
                        "font-size": 15
                      },
                      "legend-marker": {
                        "visible": true
                      },
                      "marker": {
                        "background-color": "#6cb65c",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#faa39f"
                      },
                      "highlight-marker": {
                        "size": 5,
                        "background-color": "#6cb65c",
                      }
                  }
                ]
            };

               



            $scope.myJson = {
                type: "pie",
                tooltip: {
                    visible: false
                },
                plot: {
                    slice: "110", //to make a donut
                    detach: "0",
                    "value-box": {
                        "placement": ""
                    }
                },
                series: [{
                    values: [$scope.collection],
                    backgroundColor: "#123F58",

                }, {
                    values: [$scope.inquries],
                    backgroundColor: "#74C262",
                }, {
                    values: [$scope.original],
                    backgroundColor: "#00B2E3",
                }, {
                    values: [$scope.publicrecord],
                    backgroundColor: "#FFD324",
                }, {
                    values: [$scope.other],
                    backgroundColor: "#ED193F",
                }]
            };                    
           
        //});        
        });

        $scope.clientStatusData = [];
        getClientStatus();

        function getClientStatus() {
            $scope.clientStatusData = '';
            $http.get('ClientsController/get_clientActiveStatus').success(function($data) {
                $('body').css('pointer-events', 'auto');
                $('body').css('opacity', '1');
                $('.la-anim-10').hide();
                $scope.response = $data.response;
                if ($scope.response == 0) {
                    alert('you have been logout');
                    location.href = global_base_url + 'logout';
                }


                //        console.log($data);
                $scope.noStatus = $data;
                var modalVal = $scope.noStatus;
                $scope.clientStatusData = $data;
                //console.log($data.value);
                modalShow(modalVal);
                if ($data.remove_close_btn == 1) {
                    $scope.warningclose = function() {
                        return false;
                        $scope.showClientModalwarning = false;
                    };
                }

                if ($data == 0) {

                    $scope.showModal = false;
                    $scope.showClientModalwarning = false;
                    $scope.warningopen = function() {
                        $scope.showClientModalwarning = false;
                        //          $scope.warningopen();
                        return false;
                    };

                }

            });

            function modalShow(modalVal) {

                if (modalVal != 0 || modalVal == 1) {
                    $scope.showClientModalwarning = true;
                    $scope.warningopen = function() {

                        $scope.showClientModalwarning = true;
                    };

                    $scope.warningclose = function() {
                        $scope.showClientModalwarning = false;
                    };

                    $scope.showModal = false;

                    $scope.ok = function() {
                        $scope.showModal = false;
                    };

                    $scope.cancel = function() {
                        $scope.showModal = false;
                    };
                }
            }
        };

    /******************************************/
  /**                                       ** 
  *   Upgrade packages using billing status *
  *   Billing status id : 66 & 73           *
  **                                        **
  /******************************************/
  $scope.email_regex = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
  $scope.enrollSpousePopup_ = false;
  
    $scope.discountPrice = 0; 
    $scope.newCost = 0;
  $scope.upgradePackageforspousestep1 = function (billing_status_id) {
        $http.get('ClientsController/getFamilyUpsellDiscount').success(function(response) {
            var res = response; 
            $scope.discountPrice = res.newPrice;
            $scope.newCost = res.newCost;
        });
    $scope.enrollSpousePopup_ = true;
    $('#spousePopup').fadeIn(200);
    $('.modal-backdrop').fadeIn(100);
  }
  $scope.enrollSpousePopupForm_ = false;
  $scope.congratulationspouse__ = false;    
    $scope.addSpouseForm = function () {
        $http.get('ClientsController/getFamilyUpsellDiscount').success(function(response) {
            var res = response; 
            $scope.discountPrice = res.newPrice;
            $scope.newCost = res.newCost;
        });
        $scope.enrollSpousePopup_ = false;
        $scope.enrollSpousePopupForm_ = true;    
        $('#spousePopupForm').fadeIn(200);
        $('.modal-backdrop').fadeIn(100);
    }

  $scope.autoFetchAddress = function()
  {
    $scope.addressFetch = $('#Spouse_Street_Address__c').val();
    var data = {'address' :$scope.addressFetch };
    $http.post('ClientsController/autoAddress',data).success(function(response) {
       //console.log(response);
    })
  }
  
    $scope.sameAddress = function(){
        $("#addresError").remove();
        if($('#same_as').prop("checked") == true){
            $http.get('ClientsController/getClientLoginData').success(function(response) {
                // var res = $.parseJSON(response); 
                var res = response; 
                if(res != null)
                {
                    $("#Spouse_Street_Address__c").attr("readonly", true); 
                    $('#Spouse_Street_Address__c').val(res.address_one);
                    $('#addressVal').val(res.address_one);
                    $('#Spouse_City__c').val(res.city);
                    $('#Spouse_State__c').val(res.state);
                    $('#Spouse_Zip_Code__c').val(res.zipcode);
                    $('#Spouse_Country__c').val(res.mailing_country);
                }
                else{
                    $("#Spouse_Street_Address__c").attr("readonly", false); 
                    $('#Spouse_Street_Address__c').val('');
                    $('#Spouse_City__c').val('');
                    $('#Spouse_State__c').val('');
                    $('#Spouse_Zip_Code__c').val('');
                    $('#Spouse_Country__c').val('');
                }
            });
        }
        else if($('#same_as').prop("checked") == false){
            $("#Spouse_Street_Address__c").attr("readonly", false); 
            $('#Spouse_Street_Address__c').val('');
            $('#Spouse_City__c').val('');
            $('#Spouse_State__c').val('');
            $('#Spouse_Zip_Code__c').val('');
            $('#Spouse_Country__c').val('');
        }
    }
  
  $scope.spouseForm = {};
  
  /* function for submit spouse data and assign agreement for logged in client*/
    $(document).on('submit','#spouseUpdate',function(e){
            $('body').css('pointer-events', 'none');
            $('body').css('opacity', '0.5');
            $('.la-anim-10').show();
            e.preventDefault(); 
            var form = $(this)[0];
            var formData = new FormData(form);
            $('#spousePopupForm .modal-body p').each(function() {
                      $(this).remove();
            });
            
            $scope.firstName = $('#Spouse_First_Name__c').val();
            var date = new Date();
            $scope.currentDate =  ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + date.getFullYear();
            // $scope.currentDate = new Date();
            $.ajax({
                url: 'clientsController/addSpouseData',
                data: formData,
                type: 'POST',
                contentType: false, 
                processData: false, 
                beforeSend:function(){
                    $('body').css('pointer-events', 'none');
                    $('body').css('opacity', '0.5');
                    $('.la-anim-10').show();
                },
                success:function(response){
                    var res = $.parseJSON(response);  
                    if(typeof(res.status) != "undefined" && typeof(res.message) != "undefined" && res.message != ''){
                        if(res.status == true) {                        
                            toastr.success(res.message);
                            var resData = res.data;
                            $scope.planPrice = resData.price;
                            
                            // $http.post('ClientsController/assign_client_agreementUpsell/' + resData.client_id +'/60',).success(function($data){
                            //     $http.get('ClientsController/clientAgreementInterviewUpsell/'+ resData.client_id +'/60').success(function($data){            
                            //         var tmp = $data.incompleteform.replace(/(?:\r\n|\r|\n)/g, '');
                            //         $scope.incompleteform = tmp;              
                            //         var agreement_data = {'agreement_data' : $scope.incompleteform,'terms_and_conditions_checked': '1'};
                            //         $http.post('ClientsController/edit_client_agreementUpsell/' + $data.client_agreement_id + '/' + resData.client_id+'/spouse' , agreement_data).success(function (response){
                                        $('#spouseUpdate')[0].reset();
                                        $scope.enrollSpousePopupForm_ = false;
                                        $('body').css('pointer-events', 'auto');
                                        $('body').css('opacity', '1');
                                        $('.la-anim-10').hide(); 
                                        $scope.congratulationspouse__ = true;    
                                        $('#spousePopupForm').fadeIn(200);
                                        $('.modal-backdrop').fadeIn(100);
                            //         });
                            //     });
                            // });
                            
                        } else {
                            toastr.error(res.message);
                            $('body').css('pointer-events', 'auto');
                            $('body').css('opacity', '1');
                            $('.la-anim-10').hide();                            
                        }
                    }
                    else{
                        $('body').css('pointer-events', 'auto');
                        $('body').css('opacity', '1');
                        $('.la-anim-10').hide();  
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
    
    /* start lead upgrade process*/
    $scope.currentYear = new Date().getFullYear();
    $scope.currentMonth = new Date().getMonth() + 1;
    // $scope.months = $.map($(Array(12)), function (val, i) { return i + 1; });

    var all_months = [{'id' : '01', 'month_name' : 'January'}, {'id' : '02', 'month_name' : 'February'}, {'id' : '03', 'month_name' : 'March'}, {'id' : '04', 'month_name' :  'April'}, {'id' : '05', 'month_name' : 'May'}, {'id' : '06', 'month_name' : 'June',},{'id' : '07', 'month_name' : 'July'}, {'id' : '08', 'month_name' :  'August'}, {'id' : '09', 'month_name' : 'September'}, {'id' : '10', 'month_name' : 'October'}, {'id' : '11', 'month_name' : 'November'}, {'id' : '12', 'month_name' : 'December'}];

    var first_to_current = all_months;
    var current_to_last = first_to_current.splice($scope.currentMonth);
    all_months =  first_to_current.concat(current_to_last);

    $scope.months = all_months;
    $scope.ccinfo = {credit_card_type:undefined};

    // Function fired on change in year dropdown list
    // If current year is selected, display only months starting from the next month to the end of the year
    // If current year is not selected, display all months
    $scope.ccinfo_expYearChanged = function() {
        if($scope.ccinfo.credit_card_expire_year == $scope.currentYear)
        {          
          $scope.months = current_to_last;
        }
        else
        {          
          $scope.months = all_months;
        }
    }
    $scope.enrollLeadNewPopup_ = false;
    $scope.upgradePackageLeadstep1 = function () {
        $scope.enrollLeadNewPopup_ = true;
        //$('#myModalPopupLead').fadeIn(200);
        $('#myModalPopupLeadDetails').fadeIn(200);
        $('.modal-backdrop').fadeIn(100);
    }
    $scope.enrollLeadDetailsPopup_ = false;
    $scope.upgradeLeadPackagestep1_1 = function (billing_status_id,plan,planReference)
    {
        $scope.enrollLeadNewPopup_ = false;
        $scope.enrollLeadDetailsPopup1_ = true;
        $scope.enrollLeadDetailsPopup_ = true;
        $('#myModalPopupLeadDetails').fadeIn(200);
        $('.modal-backdrop').fadeIn(100);
        $scope.ccinfo.billing_status = billing_status_id;
        $scope.ccinfo.plan = plan;
        $scope.ccinfo.reference = planReference;       
    }
    
    $scope.save = function(data){
        var date = new Date();
        $scope.currentDate =  ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + date.getFullYear();
            
        if(data.credit_card_number && data.credit_card_cvv && data.credit_card_expire_year && data.credit_card_expire_month)
        {            
            $('body').css('pointer-events','none');                                         
            $('body').css('opacity','0.5');                                         
            $('.la-anim-10').show();
                  
            $http.post('ClientsController/upgradeLeadPlan',data).success(function($data){            
                
                $('body').css('pointer-events','auto');                                         
                $('body').css('opacity','1');                                       
                $('.la-anim-10').hide();
                
                if($data.salesforcemessage.returnCode ){                
                    toastr.success($data.salesforcemessage.message);
                    $scope.enrollLeadDetailsPopup_ = false;
                    $('body').css('pointer-events', 'auto');
                    $('body').css('opacity', '1');
                    $('.la-anim-10').hide(); 
                    //$window.location.reload();
                    $scope.congratulationLead__ = true;    
                    $('#myModalPopupLead_').fadeIn(200);
                    $('.modal-backdrop').fadeIn(100);
                  
                }else{
                    toastr.error($data.salesforcemessage.message);
                    $('body').css('pointer-events', 'auto');
                    $('body').css('opacity', '1');
                    $('.la-anim-10').hide(); 
                }      
            });
        }
    }

    $scope.upgradeLeadPackagestep1_2 = function (billing_status_id,plan,planReference)
    {
        var requestData = {'billing_status' : billing_status_id, 'plan': plan, 'reference' : planReference};
        $http.post('ClientsController/upgradeLeadPlan',requestData).success(function(data) {
        })
    }
      
    /* end  lead upgrade process*/

  $scope.upgradePackageforspousestep1_1 = function (billing_status_id, dataUpsell) {}

  $scope.enrollNewPopupIDP_ = false;
  $scope.enrollNewPopupIDP = function () {
    
    $scope.enrollNewPopupIDP_ = true;
    $('#myModalPopupIDP').fadeIn(200);
    $('.modal-backdrop').fadeIn(100);
  }
    var myBackup = $('#myModalPopupLeadDetails').clone();
    $scope.master = {credit_card_type:undefined};

    $scope.reset = function() {
        //console.log('hi');
        $scope.enrollLeadDetailsPopup_ = false;
        $window.location.reload();     
    }

  $scope.closeModal = function (val) {   
    $('#spousePopupForm .modal-body p').each(function() {
        $(this).remove();
    });

    if(val == 0){
      //formone.reset();
      //paymentForm.reset();
      //$scope.paymentForm.$setPristine();
      //$scope.paymentForm.submitAttempt = false;
    }
    $scope.ccinfo = {credit_card_type:undefined};
    $scope.enrollNewPopupIDP_ = false;
    $scope.enrollSpousePopup_ = false;
    $scope.enrollSpousePopupForm_ = false;
    $scope.enrollNewPopup_ = false;
    $scope.enrollLeadNewPopup_ = false;
    $scope.enrollLeadDetailsPopup_ = false;
    $scope.showModalwarning_ = false;
    $scope.enrollLeadDetailsPopup1_ = false;
  }
  
  $scope.enrollNewPopup_ = false;
  $scope.upgradePackagestep1 = function () {
    
        $http.get('ClientsController/enrollNew').success(function(data) {
        $scope.enrollNewPopup_ = true;
        $('#myModalPopup').fadeIn(200);
        $('.modal-backdrop').fadeIn(100);
        $scope.negativeItem = data.data.negativeItem;  
    });
  }

 
 
  $scope.item_ = false;
  $scope.upgradePackagestep1_1 = function (billing_status_id,plan,planReference) {  
  $('body').css('pointer-events','none');                                         
  $('body').css('opacity','0.5');                                       
  $('.la-anim-10').show();
  $scope.plan = plan;
  $scope.planReference = planReference;
  $scope.item_ = false;
  $scope.enrollNewPopup_ = false;
  $scope.aggrement_ = false;
  $scope.url =global_base_url;
  $scope.tuauthflag =0;
  //  alert(tuauthflag);
  $scope.clientdata = [];
  $scope.itemdata = [];
  $scope.step6Value = false;
  if(billing_status_id == 66){
   $scope.planValue = 119;
  }else if(billing_status_id == 73){
    $scope.planValue = 149;
  }
  
  /*this function used for get all item  of client */
  $http.get('ClientsController/get_manage_allitem_module_interview_clientUpsell/' + clientid).success(function ($data) {
    $scope.response = $data.response;
    if ($scope.response == 0 || $scope.response == '') {
      alert('you have been logout');
      location.href = global_base_url + 'logout';
    }
    $('body').css('pointer-events','auto');                                         
    $('body').css('opacity','1');                                       
    $('.la-anim-10').hide();
    $scope.items = $data.itemData.items;

    angular.forEach($scope.items,function(value,key){
    value.conditions = true;        
    });

    if($data.itemData.items.length != 0){
      $scope.item_types = $data.itemData.item_types;
      $scope.attestValue = $data.itemData.attestValue;
      $scope.selectedLevel = $data.itemData.attestValue[0].id;
      $scope.selected = $scope.attestValue[0];
      $scope.item_ = true;
    }
    else{
      $scope.item_ = false;
      $scope.enrollNewPopup_ = false;
      $scope.aggrement_ = true;
      $scope.submitSixthFormData();
    }
  });

  $http.get('ClientsController/view_as_client_check/' + clientid).success(function (view_as_client_data) 
    {
      if(view_as_client_data.id != view_as_client_data.original_id)
      {
           $scope.buttonValue = 'Ok, GOT IT!';
      }
      else
      {           
          if(view_as_client_data.required_execution == 'Yes')
          {
              $scope.buttonValue = 'Ok, GOT IT!';
          }
          else
          {
              $scope.buttonValue = 'Ok, GOT IT!';
          }
      }      
    });

  $scope.submitSixthFormData = function (obj){
    $scope.btn_submit_step5 = true;
    var step_6 = $('#stepSixth').val();
    var arrData = {};
    var aggrement = '';
  
    $scope.fifthStepdata = [];
    angular.forEach($scope.items,function(value,key){
        var newVariable = parseInt(value.reason_attest)+'_'+value.id+'_'+value.conditions;
        $scope.fifthStepdata.push(newVariable);
    })
    var arrData = {fifthStepdata: $scope.fifthStepdata, step_6: step_6};

    $scope.aggrement_ = false;
  
    $http.post('ClientsController/submitClientDataInterviewFifthStepUpsell/' + clientid, arrData).success(function ($data) {
    if ($data.success == 1) {    
      $scope.aggrement_ = true;
      $scope.item_ = false;
      $scope.enrollNewPopup_ = false;
      $scope.clientdata = [];
      $scope.interviewdata = 1;

      if(billing_status_id == 66){
        aggrement = 75;
      }else if(billing_status_id == 73){
        aggrement = 75;
      }

      $http.post('ClientsController/assign_client_agreementUpsell/' + clientid+'/'+ aggrement).success(function($data){

           if($data == 1){
                  $http.get('ClientsController/getLatestSignedAgreementUpsell/'+clientid+'/' + aggrement).success(function($data){
                  $scope.latestagreement = $data.latestagreement;
                  $scope.reAssignFlag = $data.reassign_flag;
                  $scope.client_agreementid    = $data.client_agreement_id;
                  $scope.getDateAgreement    = $data.getDate;
                  $scope.CurrentDate = $filter('date')(new Date(), 'hh:mm:ss a');
                  $scope.getTimeAgreement    = $data.getTime;
                  
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
           }else{
                  $scope.incompleteform = true;
                  $scope.incmpleteAgreementMsg = true;
                  $http.get('ClientsController/clientAgreementInterviewUpsell/'+clientid+'/'+ aggrement).success(function($data){
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
                  });
           } 
      });

    $scope.submitFourthFormData = function (form)
    {
      $scope.clientdata.tu_authflag=0;
      if (form.$invalid) {
        return;
      }
      else {
            var date = new Date();
            $scope.currentDate =  ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) + '-' + date.getFullYear();
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
                     $scope.aggrement_ = false;
                     $scope.congratulation_ = true;
                     // Does not wait for the response
                     var arrDataimgform = [];
                     var arrDataimgform = {agreement_data: formDataAgreement , terms_and_conditions_checked : interview_agreement_terms ,planReference :$scope.planReference};
                     if(agreementid == '' || typeof(agreementid) == 'undefined' ) {
                       agreementid = 0;
                     }
                    $http.post('ClientsController/assignBillingStatus/' + $rootScope.clientidP,billing_status_id).success(function ($data) {
                    });
                    // Does not wait for the response                    
                    $http.post('ClientsController/edit_client_agreementUpsell/' + agreementid + '/' + clientid, arrDataimgform).success(function (response){
                       if(response == 2)
                       {
                        $scope.aggrement_ = false;
                        $scope.congratulation_ = true;
                       }
                       else
                       {
                       }
                    });
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
         }
         $scope.appliedClassTu = function(loaderVal){
          if(loaderVal){
            return 'modal-backdrop in';
          }
          else{
           return  'modal-backdrop';
         }
       }
      }
      else {
     }
    });
  }
  }
}

});



//define trainingController 
app.controller('trainingController', function(Page,$scope,$sce,$http,$location){
  Page.setTitle("Client Training");
  $scope.trainingdata = []; 
  
  $('body').css('pointer-events','none');                                       
  $('body').css('opacity','0.5');                                       
  $('.la-anim-10').show();
  
    //30 march add code for client status data
    //use for get account status data   
    $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }   
    });
    
  
    //for portalpermission
    $scope.portalpermission = [];

//      $http.get('ClientsController/commonportalpermission/'+pagetitle).success(function($data) {
//          
//           $scope.response=$data.response;
//            if($scope.response==0) {
//                alert('you have been logout');
//                location.href = global_base_url+'logout';
//            }
//            
//       if($data.portal_category) {
//         $scope.portalpermission = $data.portal_category[0].link;
//       }
//     });
    
    $scope.s3url = 'https://tcp-salesforce.s3.amazonaws.com/'; 

    $scope.showModal = false;
    $scope.sendurl = '';
    $scope.open = function(type, mainurl, pdfurl) {
      $scope.showModal = true;
      if(type=='img'){
        $scope.type = 'img';
        $scope.sendurl = '<img src="'+mainurl+pdfurl+'"  />';
      }
      if(type=='youtube'){
        $scope.type = 'youtube';
        $scope.sendurl = mainurl+pdfurl;
      }
      if(type=='pdf'){
        $scope.type = 'pdf';
        $scope.sendurl = $sce.trustAsResourceUrl(mainurl+pdfurl);
      }
      
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

    
    
    $http.get('ClientsController/training').success(function($data){ 
        //console.log($data);
        $('body').css('pointer-events','auto');                                         
        $('body').css('opacity','1');                                       
        $('.la-anim-10').hide();
        $scope.trainingdata=$data; 

      });
    
  });




//define messagingController 
app.controller('messagingController', function(Page,$scope,$sce,$http,$location){
  Page.setTitle("Support Center");
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
     //30 march add code for client status data
     //use for get account status data   
     $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }   
    });
  
    //for portalpermission
         
    
    //$scope.deskdotcomdata = [];      
    $http.get('deskdotcom/deskindex/'+clientid).success(function($data){
            $('body').css('pointer-events','auto');                                         
            $('body').css('opacity','1');                                       
            $('.la-anim-10').hide(); 
            $scope.response=$data.response;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }
            
        //console.log($data);
        $scope.deskdotcomdata = $sce.trustAsResourceUrl($data);

      });
    
});

//define activitiesController 
app.controller('activitiesController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder,$location){
  Page.setTitle("Activity Logs");
    //$scope.deskdotcomdata = []; 
    
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show(); 
    
     //30 march add code for client status data
         //use for get account status data   
       $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
            $scope.url = $location.absUrl().split('/')[4];
            if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
            {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }   
    });
    
    $("body").on('click', '.dataTables_paginate a',function (e) {
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
        setTimeout(function(){
             $('body').css('pointer-events','auto');                                        
             $('body').css('opacity','1');                                      
             $('.la-anim-10').hide(); 
        },1500);
    });
    
    //for portalpermission
      
    var vm9 = this;
    vm9.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('ajax', {
     // Either you specify the AjaxDataProp here
     // dataSrc: 'data',
     url: 'ClientsController/get_account_activities/'+clientid,
     type: 'POST',
     beforeSend : function()
         {
             $('body').css('pointer-events','none');
              $('body').css('opacity','0.5');
              $('.la-anim-10').show(); 
         },
     complete:function($data){
          setTimeout(function(){ if ($('table th').hasClass("sorting")) {
              $("body").on('click', 'table th',function (e) {
                $('body').css('pointer-events','none');                                         
                $('body').css('opacity','0.5');                                         
                $('.la-anim-10').show();
              });
            }}, 3000);
          $('body').css('pointer-events','auto');                                       
          $('body').css('opacity','1');                                         
          $('.la-anim-10').hide();
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }   
         }
     })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('lengthMenu', false)
        .withOption('DisplayLength', 5)
        .withOption('order', [2, 'desc'])
        .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
        .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
        .withOption('PaginationType','full_numbers"')
        .withOption('Destroy',true)
        .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
        vm9.dtColumns = [
            DTColumnBuilder.newColumn('activity').withTitle('Activity'),
            DTColumnBuilder.newColumn('type').withTitle('Type'),
            DTColumnBuilder.newColumn('date').withTitle('Date'),            
        ];
    
  });


//define notesController 
app.controller('notesController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnDefBuilder,$location){
  Page.setTitle("Notes");
    //$scope.deskdotcomdata = []; 
    
    $('body').css('pointer-events','none');                                         
    $('body').css('opacity','0.5');                                         
    $('.la-anim-10').show(); 
    
    //30 march add code for client status data
    //use for get account status data   
    $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }
    });
    
     //for portalpermission
    
    
    $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('order', [3, 'desc']) // Replace 2 with the index of your `date` column
    .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
    .withOption('processing', true)
    .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'});


    $http.get('ClientsController/get_unique_account_notes/'+unique_account_id).success(function($data){ 
            $('body').css('pointer-events','auto');                                         
            $('body').css('opacity','1');                                       
            $('.la-anim-10').hide();
            $scope.response=$data.response;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }
            
        //console.log($data);
        $scope.notes = $data.aaData;

      });
    
  });


//define documentsController 
app.controller('newnotesController', function(Page,$scope,$window,$sce,$http, DTOptionsBuilder, DTColumnBuilder,$rootScope,$location){  
  $('body').css('pointer-events','none');                                        
     $('body').css('opacity','0.5');                                        
     $('.la-anim-10').show();
     //30 march add code for client status data
     //use for get account status data   
     $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       } 
    });
  
     //for portalpermission   
    
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: 'ClientsController/get_client_notes/'+clientid,
         type: 'POST',
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
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0) {
            alert('you have been logout');
            location.href = global_base_url+'logout';
          }  
          
         },
     })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('order', [0, 'desc'])
        .withOption('serverSide', true)
        .withOption('lengthMenu', false)
        .withOption('DisplayLength', 5) 
        .withOption('lengthMenu', [ [10, 25, 50, 100], [10, 25, 50, 100] ])
        .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
        .withOption('PaginationType','full_numbers"')
        .withOption('Destroy',true)
        .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
        .withOption('columnDefs', [
                         {
                            'targets': 0,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'ID'); 
                            }
                         },
                         {
                            'targets': 1,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Notes'); 
                            }
                         },
                         {
                            'targets': 2,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Author'); 
                            }
                         },
                         {
                            'targets': 3,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Date Created'); 
                            }
                         },
                         {
                            'targets': 4,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Flag'); 
                            }
                         }
                      ])
        vm.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('ID'),
            DTColumnBuilder.newColumn('note').withTitle('Notes'),
            DTColumnBuilder.newColumn('author').withTitle('Author'),
            DTColumnBuilder.newColumn('date_created').withTitle('Date Created'),
             DTColumnBuilder.newColumn('flag').withTitle('Flag')
            ];

    $scope.submitDataDocument = function()
    { 

        $scope.formdata.image_file = JSON.stringify($rootScope.pdfArray);
        if($('#new_doc_src').val() == ''){
            alert('Please upload document');
            return false;
        }
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                        
        $('.la-anim-10').show();
        $scope.formdata.location = document.getElementById("location").value;
        $scope.formdata.clientId = document.getElementById("ccid").value;
        $scope.formdata.pdfImages = document.getElementById("image_location").value;
        $http.post('ClientsController/edit_client_document',$scope.formdata).success(function($data){
            var dataLayer = window.dataLayer = window.dataLayer || [];
            dataLayer.push({
                'event': 'Uploaded_Document'
            });
            $('body').css('pointer-events','auto');                                         
            $('body').css('opacity','1');                                         
            $('.la-anim-10').hide();
            if($data.success)
            {
                alert('Document added successfully!');
                $window.location.reload();
            }
            else
            {
                alert('Document was corrupted please try again!');
            }
       });
      };

    $scope.showModalpreview = false;
    $scope.sendurlpreview = '';
    $scope.openpreview = function() {
        $scope.showModalpreview = true;
        $scope.sendurlpreview = $sce.trustAsResourceUrl(mainurl+pdfurl);
    };

    $scope.okpreview = function() {
      $scope.showModalpreview = false;
    };

    $scope.cancelpreview = function() {
      $scope.showModalpreview = false;
    };
    
  });

//define auditController 
app.controller('auditController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder,$location){
  Page.setTitle("Action Plan & Reviews");
    //$scope.deskdotcomdata = [];  
    $('body').css('pointer-events','none');                                         
    $('body').css('opacity','0.5');                                         
    $('.la-anim-10').show();
    $scope.review_a =false;
    $scope.review = function() {
        $scope.review_a = true;
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
        $.ajax({
         url: 'ClientsController/get_file_reviews9/'+clientid,
         type: 'POST',
         complete : function($data){
            setTimeout(function(){ if ($('table th').hasClass("sorting")) {
              $("body").on('click', 'table th',function (e) {
                $('body').css('pointer-events','none');
                $('body').css('opacity','0.5');
                $('.la-anim-10').show();
              });
            }}, 3000);
          $('body').css('pointer-events','auto');                                       
          $('body').css('opacity','1');                                         
          $('.la-anim-10').hide();
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          if(finalObj9.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
              } 
                var id = $('#mytabs9 tr:first-child td:nth-child(3)').text();
                var type = $('#mytabs9 tr:first-child td:nth-child(2)').text();
                $('#mytabs9 tr:first-child').addClass('tr');
                var tr = $('#mytabs9').closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_review_file_data/'+id;
                $http.get(path).success(function($data){
                    if($data!=''){
            $('#data').html($data);
          }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                }); 
            $('.click9').unbind().click( function(){ 
                var id = $(this).closest('td').prev('td').text();
                var type = $(this).closest('td').prev('td').prev('td').text();
                var tr = $('#mytabs9 tr').removeClass('tr');
                var tr = $(this).closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_review_file_data/'+id;
                $('.loading-spiner-holder').show();                             
                $http.get(path).success(function($data){
                    $('.loading-spiner-holder').hide();
          if($data!=''){
            $('#data').html($data);
            $('#data').niceScroll();
          }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                    
                });
            }); 
     }
     });    
     }
     
     $("body").on('click', '.dataTables_paginate a',function (e) {
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
        setTimeout(function(){
             $('body').css('pointer-events','auto');                                        
             $('body').css('opacity','1');                                      
             $('.la-anim-10').hide(); 
        },1500);
     });
     
     $("body").on('click', 'table th',function (e) {
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
    });
     
     $scope.audit = function() {
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
        $.ajax({
         
         url: 'ClientsController/get_audits_reviews9/'+clientid,
         type: 'POST',
         
         complete : function($data){
          $('body').css('pointer-events','auto');                                       
          $('body').css('opacity','1');                                         
          $('.la-anim-10').hide();   
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
              } 
                var id = $('#mytabs tr:first-child td:nth-child(3)').text();
                var type = $('#mytabs tr:first-child td:nth-child(2)').text();
                $('#mytabs tr:first-child').addClass('tr');
                var tr = $('#mytabs').closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_audit_review_file_data/'+id;
                $http.get(path).success(function($data){
                    if($data!=''){
            $('#data').html($data);
            $('#data').niceScroll();
          }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                }); 
            $('.click9').unbind().click( function(){ 
                var id = $(this).closest('td').prev('td').text();
                var type = $(this).closest('td').prev('td').prev('td').text();
                var tr = $('#mytabs tr').removeClass('tr');
                var tr = $(this).closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_review_file_data/'+id;
                $('.loading-spiner-holder').show();                             
                $http.get(path).success(function($data){
                    $('.loading-spiner-holder').hide();
          if($data!=''){
            $('#data').html($data);
            $('#data').niceScroll();
          }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                    
                });
            }); 
 }
     });    
     }
    //30 march add code for client status data
    
    //use for get account status data   
    $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }
    });
    
    //for portalpermission
   
    var vm9 = this;
    vm9.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: 'ClientsController/get_audits_reviews9/'+clientid,
         type: 'POST',
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
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
              } 
                var id = $('#mytabs tr:first-child td:nth-child(3)').text();
                var type = $('#mytabs tr:first-child td:nth-child(2)').text();
                $('#mytabs tr:first-child').addClass('tr');
                var tr = $('#mytabs').closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_audit_review_file_data/'+id;
                $http.get(path).success(function($data){
                if($data!='' && $data != 'No audit'){
                    $('#data').html($data);
            $('#data').niceScroll();
                }else if($data == 'No audit'){
                    $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Click on view button for download the audio file</p>');
                }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                });
            
              $('.click').unbind().click( function(){ 
                var id = $(this).closest('td').prev('td').text();
                var type = $(this).closest('td').prev('td').prev('td').text();
                var tr = $('#mytabs tr').removeClass('tr');
                var tr = $(this).closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_audit_review_file_data/'+id;
                $('.loading-spiner-holder').show();
                $http.get(path).success(function($data){
                    $('.loading-spiner-holder').hide();
            if($data!=''){
              $('#data').html($data);
              $('#data').niceScroll();
            }else{
              $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
            }
                    
                });
            });
      }
     })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('lengthMenu', false)
        .withOption('DisplayLength', 5)
        .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
        .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
        .withOption('PaginationType','full_numbers"')
        .withOption('Destroy',true)
        .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
        vm9.dtColumns = [
            DTColumnBuilder.newColumn('date').withTitle('Date'),
            DTColumnBuilder.newColumn('type').withTitle('Type'),
            DTColumnBuilder.newColumn('id').withTitle('').withOption('className', 'ng-hide'),
            DTColumnBuilder.newColumn('prew').withTitle('View').withOption('defaultContent','<img class="click" src="assets/clients/imagesA/view_icon.png">')
        ];    
    
  });
  
// For Review (10-04-2017)

//define reviewController 
app.controller('reviewController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder,$location){
  Page.setTitle("Action Plan & Reviews");
    //$scope.deskdotcomdata = [];  
     $('body').css('pointer-events','none');                                        
     $('body').css('opacity','0.5');                                        
     $('.la-anim-10').show();
    //30 march add code for client status data
    //use for get account status data   
    
    $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }   
    });
    
    //for portalpermission
   
        var vm9 = this;
         vm9.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: 'ClientsController/get_file_reviews9/'+clientid,
         type: 'POST',
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
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
              } 
                var id = $('#mytabs9 tr:first-child td:nth-child(3)').text();
                var type = $('#mytabs9 tr:first-child td:nth-child(2)').text();
                $('#mytabs9 tr:first-child').addClass('tr');
                var tr = $('#mytabs9').closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_review_file_data/'+id;
                $http.get(path).success(function($data){
                    if($data!=''){
            $('#data').html($data);
            $('#data').niceScroll();
          }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                }); 
            $('.click9').unbind().click( function(){ 
                var id = $(this).closest('td').prev('td').text();
                var type = $(this).closest('td').prev('td').prev('td').text();
                var tr = $('#mytabs9 tr').removeClass('tr');
                var tr = $(this).closest('tr');
                $(tr).toggleClass('tr');
                var path = 'ClientsController/get_review_file_data/'+id;
                $('.loading-spiner-holder').show();                             
                $http.get(path).success(function($data){
                    $('.loading-spiner-holder').hide();
          if($data!=''){
            $('#data').html($data);
            $('#data').niceScroll();
          }else{
            $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Records Not Found</p>');
          }
                    
                });
            });         
            }
     })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('lengthMenu', false)
        .withOption('DisplayLength', 5)
        .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
        .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
        .withOption('PaginationType','full_numbers"')
        .withOption('Destroy',true)
        .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
        vm9.dtColumns = [
            DTColumnBuilder.newColumn('date').withTitle('Date'),
            DTColumnBuilder.newColumn('type').withTitle('Type'),
            DTColumnBuilder.newColumn('id').withTitle('').withOption('className', 'ng-hide'),
            DTColumnBuilder.newColumn('').withOption('defaultContent','<img src="assets/clients/imagesA/view_icon.png" class="click9">'),
        ];    
    
  });

app.controller('disputelettersController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder, $location){
  $("html").niceScroll();
    $scope.$watch('$viewContentLoaded', function() {
      $("html").niceScroll();
    });

    Page.setTitle("Dispute Letters");
    //$scope.deskdotcomdata = []; 
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    //30 march add code for client status data
      //use for get account status data   
      $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
        $scope.clientAccountStatus = data.clientStatusData;
        $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
        $scope.title =  data.clientStatusData.title;
        $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
        if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9')
        {
          //warning popup
          $scope.popupCondtion = '1';
          $scope.showModalwarningdispute = true;
                  
          setInterval(function(){
            $('.modal-backdrop').remove();
            $("#myModal").fadeIn("fast");
            $("#myModal").animate({top: '250px'});
          }, 500);
        }
        else
        {
          $scope.popupCondtion = '0';
          $scope.showModalwarningdispute = false;
          if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
        }
      }
    });

      $('.sorting_disabled').css('pointer-events', 'none');
    
     //for portalpermission
   
   //warning popup
    $scope.showModalwarning = false;
    /*$scope.warningopen = function() {
      $scope.showModalwarning = true;
    };
    $scope.warningclose = function() {
      $scope.showModalwarning = false;
    };*/

    $scope.showModal = false;
    $scope.pdfurl = '';
    $scope.open = function(pdfurl) {
      $scope.showModal = true;
      $scope.pdfurl = base_url+pdfurl;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
  $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
  $('.la-anim-10').show();
  $("body").on('click', 'table th',function (e) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');
    $('.la-anim-10').show();
  });
  
  // Unbind all click events from count item column
  $("body").on('click', '.dataTables_paginate a',function (e) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    setTimeout(function(){
       $('body').css('pointer-events','auto');                     
       $('body').css('opacity','1');                    
       $('.la-anim-10').hide(); 
       
    },1500);
  });
  var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: 'ClientsController/view_letters/'+clientid,
         type: 'POST',
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
        
      setTimeout(function(){ if ($('table th').hasClass("sorting")) {
        $("body").on('click', 'table th',function (e) {
          alert('general controller');
        $('body').css('pointer-events','none');                     
        $('body').css('opacity','0.5');                     
        $('.la-anim-10').show();
        });
      }}, 3000);
      var myJson = JSON.stringify($data);
      var myJsonObj = JSON.parse(myJson);
      var finalObj = myJsonObj.responseText;
      var finalObj9 = JSON.parse(finalObj);
      
      if(finalObj9.response==0) {
        
        }
      
      $('iframe').contents().find('div#outerContainer').css('display','none');        
      $('.click').on('click',function(){
        $('.loading-spiner-holder').show();
        var filepath = $(this).closest('td').prev('td').text();
        var html_path = filepath.replace('pdf','html');
        var tr = $('#mytabs tr').removeClass('tr');
        var tr = $(this).closest('tr');
        $(tr).toggleClass('tr');
        $('.loading-spiner-holder').hide();
        $http.post('ClientsController/getUpdatedHtml1', {file_name : html_path}).success(function (data) {
          $('#data').html(data.html);
          $('#data').niceScroll();
        });
        //$('#data').html('<iframe src="/'+html_path+'" width="100%" height="612px" style="border:none;" scrolling="no"></iframe>');        
      });     
     }
     })
    
    // or here
    .withDataProp('data')
    .withOption('processing', true)
    .withOption('order', [0, 'desc'])
    .withOption('serverSide', true)
    .withOption('lengthMenu', false)
    .withOption('DisplayLength', 5)
    .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
    .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
    .withOption('PaginationType','full_numbers"')
    .withOption('Destroy',true)
    .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
    vm.dtColumns = [
      DTColumnBuilder.newColumn('timestamp').withTitle('Date'),
      DTColumnBuilder.newColumn(null).withTitle('Recipient').renderWith(function(data,type,full) {
          var furnisher_name =  data.furnisher_name;
          if(data.furnisher_name)
          {
            furnisher_name =  data.furnisher_name;
          }
          else
          {
            furnisher_name =  data.bureau;
          }
          
          return furnisher_name;
      }),
      //DTColumnBuilder.newColumn('items').withTitle('Item Count'),
      DTColumnBuilder.newColumn('location').withTitle('').withOption('className', 'ng-hide'),
      DTColumnBuilder.newColumn('').withOption('defaultContent','<img src="assets/clients/imagesA/view_icon.png" class="click">'),
    ];
});

/*for investigation result (in tab)*/
app.controller('disputelettersInvestigationController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder,$location){
    
    Page.setTitle("Dispute Letters");
    
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    
    //warning popup
    $scope.showModalwarningdispute = false;
    
    $scope.warningopen = function() {
      $scope.showModalwarningdispute = true;
    };

    $scope.warningclose = function() {
      $scope.showModalwarningdispute = false;
    };

    $scope.showModal = false;
    $scope.pdfurl = '';

    $scope.open = function(pdfurl) {
      $scope.showModal = true;
      $scope.pdfurl = base_url + pdfurl;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

  $('body').css('pointer-events','none');                     
  $('body').css('opacity','0.5');
  $('.la-anim-10').show();

  $("body").on('click', 'table th',function (e) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
  });

  $("body").on('click', '.dataTables_paginate a',function (e) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    setTimeout(function(){
      $('body').css('pointer-events','auto');
      $('body').css('opacity','1');
      $('.la-anim-10').hide();
    }, 1500);
  });

  $('.sorting_disabled').css('pointer-events', 'none');
    
  // Unbind all click events from count item column
  $('table th.sorting_disabled').unbind('click');

  var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
        url: 'ClientsController/view_investigation_results/'+clientid,
        type: 'POST',
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
        setTimeout(function(){ if ($('table th').hasClass("sorting")) {
          $("body").on('click', 'table th',function (e) {
          $('body').css('pointer-events','none');
          $('body').css('opacity','0.5');
          $('.la-anim-10').show();
          });
        }}, 3000);

        var myJson = JSON.stringify($data);
        var myJsonObj = JSON.parse(myJson);
        var finalObj = myJsonObj.responseText;
        var finalObj9 = JSON.parse(finalObj);
      
      if(finalObj9.response==0) {
          
      } 
      $('.loading-spiner-holder').show();
      var tu_activity_id = $('#mytabsinvestigation tr:first-child td:nth-child(3)').text();
      $('#mytabsinvestigation tr:first-child').addClass('tr');
      var tr = $('#mytabsinvestigation').closest('tr');
      $(tr).toggleClass('tr');
      $('.loading-spiner-holder').hide();
      
      $('.clickInvestigation').on('click',function(){
        $('#data').html('');
        $('.loading-spiner-holder').show();
        var tu_activity_id = $(this).closest('td').prev('td').text();
        var tr = $('#mytabsinvestigation tr').removeClass('tr');
        var tr = $(this).closest('tr');
        $(tr).toggleClass('tr');
        $('.loading-spiner-holder').hide();
        $http.get("ClientsController/get_items_dispute_activities/front?client_id=" + clientid+"&tu_activity_id=" + tu_activity_id)
          .success(function($data) {
            $('#data').html($data);
            $('#data').niceScroll();
        });
      });     
     }
     })
    
    // or here
    .withDataProp('data')
    .withOption('processing', true)
    .withOption('order', [0, 'desc'])
    .withOption('serverSide', true)
    .withOption('lengthMenu', false)
    .withOption('DisplayLength', 5)
    .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
    .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
    .withOption('PaginationType','full_numbers"')
    .withOption('Destroy',true)
    .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
    
    vm.dtColumns = [
      DTColumnBuilder.newColumn('datetime').withTitle('Date'),
      DTColumnBuilder.newColumn(null).withTitle('Recipient').renderWith(function(data,type,full) {
          return 'Transunion';
      }),
      
      DTColumnBuilder.newColumn('id').withTitle('').withOption('className', 'ng-hide'),
      DTColumnBuilder.newColumn('').withOption('defaultContent','<img src="assets/clients/imagesA/view_icon.png" style="cursor: pointer;" class="clickInvestigation">'),
    ];

    $('.tu_investigate').on('click',function(){
        $('#data').html('');
        $('html').niceScroll();
        $('.loading-spiner-holder').show();
        var tu_activity_id = $('#mytabsinvestigation tr.tr td:nth-child(3)').text();
        $('#mytabsinvestigation tr.tr').addClass('tr');
        var tr = $('#mytabsinvestigation').closest('tr');
        $(tr).toggleClass('tr');
        $('.loading-spiner-holder').hide();
        $http.get("ClientsController/get_items_dispute_activities/front?client_id=" + clientid+"&tu_activity_id=" + tu_activity_id)
          .success(function($data) {
            $('#data').html($data);
            $('#data').niceScroll();
        });
        
    });

});

app.controller('disputelettersFurnisherController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder, $location){
    
    $scope.$watch('$viewContentLoaded', function() {
      $("html").niceScroll();
    });

    //Page.setTitle("Dispute Letters");
    //$scope.deskdotcomdata = []; 
      $('body').css('pointer-events','none');                                       
      $('body').css('opacity','0.5');                                       
      $('.la-anim-10').show();
    
    $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
    //for portalpermission
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9')
            {
              $scope.popupCondtion = '1';
              $scope.showModalwarningdispute = true;

              setInterval(function(){
                $('.modal-backdrop').remove();
                $("#myModal").fadeIn("fast");
                $("#myModal").animate({top: '250px'});
            }, 500);
          }
          else
          {
              $scope.popupCondtion = '0';
              $scope.showModalwarningdispute = false;
              if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
          }
      }
  });
   
    //warning popup
    $scope.showModalwarning = false;
    
    $scope.warningopen = function() {
      $scope.showModalwarning = true;
    };
    
    $scope.warningclose = function() {
      $scope.showModalwarning = false;
    };

    $scope.showModal = false;
    $scope.pdfurl = '';
    
    $scope.open = function(pdfurl) {
      $scope.showModal = true;
      $scope.pdfurl = base_url+pdfurl;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

    $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
      $('.la-anim-10').show();
      $("body").on('click', 'table th', function (e) {
            $('body').css('pointer-events','none');
            $('body').css('opacity','0.5');
            $('.la-anim-10').show();
      });

    $("body").on('click', '.dataTables_paginate a', function (e) {
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                         
        $('.la-anim-10').show();
        setTimeout(function(){
             $('body').css('pointer-events','auto');
             $('body').css('opacity','1');                  
             $('.la-anim-10').hide();
        },1500);
    });
    
    // Unbind all click events from count item column
    $('table th.sorting_disabled').unbind('click');
      
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: 'ClientsController/view_letters_furnisher/'+clientid,
         type: 'POST',
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
          setTimeout(function(){ if ($('table th').hasClass("sorting")) {
              $("body").on('click', 'table th',function (e) {
                $('body').css('pointer-events','none');
                $('body').css('opacity','0.5');
                $('.la-anim-10').show();
              });
            }}, 3000);

      $('.sorting_disabled').css('pointer-events', 'none');
    
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0)
      {
                
            }   
      $('html').niceScroll();
            $('.loading-spiner-holder').show();
            var filepath = $('#mytabs tr:first-child td:nth-child(3)').text();
            $('#mytabs tr:first-child').addClass('tr');
            var tr = $('#mytabs').closest('tr');
            $(tr).toggleClass('tr');
            $('.loading-spiner-holder').hide();
            var html_path = filepath.replace('pdf','html');
      if(html_path!=''){
        
        // $http.get(html_path).success(function(data) {
        //   $('#data').html(data);
        //   $('#data').niceScroll();
        // });

        $http.post('ClientsController/getUpdatedHtml1', {file_name : html_path}).success(function (data) {
          $('#data').html(data.html);
          $('#data').niceScroll();
        });
        
        //$('#data').html('<iframe src="/'+html_path+'" width="100%" height="612px" style="border:none;" scrolling="yes"></iframe>');
      }else{
        $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Letter Not Found</p>');
      }
            
            //$('iframe').contents().find('div#outerContainer').css('display','none');          
            $('.click').on('click',function(){
                $('.loading-spiner-holder').show();
                var filepath = $(this).closest('td').prev('td').text();
                var html_path = filepath.replace('pdf','html');
                var tr = $('#mytabs tr').removeClass('tr');
                var tr = $(this).closest('tr');
                $(tr).toggleClass('tr');
                $('.loading-spiner-holder').hide();
        // $http.get(html_path).success(function(data) {
        //   $('#data').html(data);
        //   $('#data').niceScroll();

        // });
        $http.post('ClientsController/getUpdatedHtml1', {file_name : html_path}).success(function (data) {
          $('#data').html(data.html);
          $('#data').niceScroll();
        });
                //$('#data').html('<iframe src="/'+html_path+'" width="100%" height="612px" style="border:none;" scrolling="yes"></iframe>');               
            });         
         }
     })
     // or here
    .withDataProp('data')
    .withOption('processing', true)
    .withOption('order', [0, 'desc'])
    .withOption('serverSide', true)
        .withOption('lengthMenu', false)
        .withOption('DisplayLength', 5)
        .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
        .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
        .withOption('PaginationType','full_numbers"')
        .withOption('Destroy',true)
        .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
        vm.dtColumns = [
            DTColumnBuilder.newColumn('timestamp').withTitle('Date'),
            DTColumnBuilder.newColumn(null).withTitle('Recipient').renderWith(function(data,type,full) {
          var furnisher_name =  data.furnisher_name;
          return furnisher_name;
      }),
            //DTColumnBuilder.newColumn('items').withTitle('Item Count').withOption('orderable', false),
            DTColumnBuilder.newColumn('location').withTitle('').withOption('className', 'ng-hide'),
            DTColumnBuilder.newColumn('').withOption('defaultContent','<img src="assets/clients/imagesA/view_icon.png" class="click">'),
        ];

        $('.furnisher_link').on('click',function(){
        $('html').niceScroll();
        $('.loading-spiner-holder').show();
        var filepath = $('#mytabs tr.tr td:nth-child(3)').text();
        $('#mytabs tr.tr').addClass('tr');
        var tr = $('#mytabs').closest('tr');
        $(tr).toggleClass('tr');
        $('.loading-spiner-holder').hide();
        var html_path = filepath.replace('pdf','html');
        if(html_path!=''){
          $http.post('ClientsController/getUpdatedHtml1', {file_name : html_path}).success(function (data) {
          $('#data').html(data.html);
          $('#data').niceScroll();
        });
        }else{
          $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Letter Not Found</p>');
        }
    });
});

app.controller('disputelettersBureauController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnBuilder, $location){
    
    Page.setTitle("Dispute Letters");
    
    //$scope.deskdotcomdata = []; 
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    
    //for portalpermission
   
    //warning popup
    $scope.showModalwarning = false;
    
    $scope.warningopen = function() {
      $scope.showModalwarning = true;
    };

    $scope.warningclose = function() {
      $scope.showModalwarning = false;
    };

    $scope.showModal = false;
    $scope.pdfurl = '';

    $scope.open = function(pdfurl) {
      $scope.showModal = true;
      $scope.pdfurl = base_url + pdfurl;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

  $('body').css('pointer-events','none');                     
  $('body').css('opacity','0.5');
  $('.la-anim-10').show();

  $("body").on('click', 'table th',function (e) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
  });

  $("body").on('click', '.dataTables_paginate a',function (e) {
    $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
    setTimeout(function(){
      $('body').css('pointer-events','auto');
      $('body').css('opacity','1');
      $('.la-anim-10').hide();
    }, 1500);
  });

  $('.sorting_disabled').css('pointer-events', 'none');
    
  // Unbind all click events from count item column
  $('table th.sorting_disabled').unbind('click');

  var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
        // Either you specify the AjaxDataProp here
        // dataSrc: 'data',
        url: 'ClientsController/view_letters_bureau/'+clientid,
        type: 'POST',
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
        setTimeout(function(){ if ($('table th').hasClass("sorting")) {
          $("body").on('click', 'table th',function (e) {
          $('body').css('pointer-events','none');
          $('body').css('opacity','0.5');
          $('.la-anim-10').show();
          });
        }}, 3000);

        var myJson = JSON.stringify($data);
        var myJsonObj = JSON.parse(myJson);
        var finalObj = myJsonObj.responseText;
        var finalObj9 = JSON.parse(finalObj);
      
      if(finalObj9.response==0) {
          
      } 
      $('.loading-spiner-holder').show();
      var filepath = $('#mytabs9 tr:first-child td:nth-child(4)').text();
      $('#mytabs9 tr:first-child').addClass('tr');
      var tr = $('#mytabs9').closest('tr');
      $(tr).toggleClass('tr');
      $('.loading-spiner-holder').hide();
      /*var html_path = filepath.replace('pdf','html');
      if(html_path!=''){
        //$('#data').html('<iframe src="/'+html_path+'" width="100%" height="612px" style="border:none;" scrolling="no"></iframe>');
      }else{
        //$('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Letter Not Found</p>');
      }*/
      
      //$('iframe').contents().find('div#outerContainer').css('display','none');        
      $('.clickBureau').on('click',function(){
        $('.loading-spiner-holder').show();
        var filepath = $(this).closest('td').prev('td').text();
        var html_path = filepath.replace('pdf','html');
        var tr = $('#mytabs9 tr').removeClass('tr');
        var tr = $(this).closest('tr');
        $(tr).toggleClass('tr');
        $('.loading-spiner-holder').hide();
        // $http.get(html_path).success(function(data) {
        //   $('#data').html(data);
        //   $('#data').niceScroll();
        // });
        $http.post('ClientsController/getUpdatedHtml1', {file_name : html_path}).success(function (data) {
          $('#data').html(data.html);
          $('#data').niceScroll();
        });
        //$('#data').html('<iframe src="/'+html_path+'" width="100%" height="612px" style="border:none;" scrolling="yes"></iframe>');     $('html').niceScroll();   
      });     
     }
     })
    
    // or here
    .withDataProp('data')
    .withOption('processing', true)
    .withOption('order', [0, 'desc'])
    .withOption('serverSide', true)
    .withOption('lengthMenu', false)
    .withOption('DisplayLength', 5)
    .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
    .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
    .withOption('PaginationType','full_numbers"')
    .withOption('Destroy',true)
    .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
    
    vm.dtColumns = [
      DTColumnBuilder.newColumn('timestamp').withTitle('Date'),
      DTColumnBuilder.newColumn(null).withTitle('Recipient').renderWith(function(data,type,full) {
          var furnisher_name =  data.bureau;
          return furnisher_name;
      }),
      //DTColumnBuilder.newColumn('items').withTitle('Item Count').withOption('orderable', false),
      DTColumnBuilder.newColumn('location').withTitle('').withOption('className', 'ng-hide'),
      DTColumnBuilder.newColumn('').withOption('defaultContent','<img src="assets/clients/imagesA/view_icon.png" class="clickBureau">'),
    ];

    $('.bureau_link').on('click',function(){
        $('html').niceScroll();
        $('.loading-spiner-holder').show();
        var filepath = $('#mytabs9 tr.tr td:nth-child(3)').text();
        $('#mytabs9 tr.tr').addClass('tr');
        var tr = $('#mytabs9').closest('tr');
        $(tr).toggleClass('tr');
        $('.loading-spiner-holder').hide();
        var html_path = filepath.replace('pdf','html');
        if(html_path!=''){
          $http.post('ClientsController/getUpdatedHtml1', {file_name : html_path}).success(function (data) {
          $('#data').html(data.html);
          $('#data').niceScroll();
        });
        }else{
          $('#data').html('<p style="color: red; padding: 2%; margin: 0%; font-weight: bold;">Letter Not Found</p>');
        }
    });
    
});

//define creditreportController 
app.controller('creditreportController', function(Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnDefBuilder, $location){
  Page.setTitle("Credit Reports");
  
});


//define documentsController 
app.controller('documentsController', function(Page,$scope,$window,$sce,$http, DTOptionsBuilder, DTColumnBuilder,$rootScope, $location){ 

     
     
     $('body').css('pointer-events','none');                                        
     $('body').css('opacity','0.5');                                        
     $('.la-anim-10').show();
     //30 march add code for client status data
     //use for get account status data   
     $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
        $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
        {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarning = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       } 
    });
  
     //for portalpermission
    
    
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
         // Either you specify the AjaxDataProp here
         // dataSrc: 'data',
         url: 'ClientsController/get_client_documents/'+clientid,
         type: 'POST',
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
          var myJson = JSON.stringify($data);
          var myJsonObj = JSON.parse(myJson);
          var finalObj = myJsonObj.responseText;
          var finalObj9 = JSON.parse(finalObj);
          
          if(finalObj9.response==0) {
            alert('you have been logout');
            location.href = global_base_url+'logout';
          }      
          $('.deleteme').on('click',function(){  
          var id = $(this).attr('lang'); 
          var response = confirm("Are you sure you want to delete this record!");
          if (response == true) {
            $http.post('ClientsController/delete_client_document/'+id).success(function($data){
                $window.location.reload();
            });
          } else {
            return false;      
          }
          });
          $('.viewme').on('click',function(){
                var fileName = $(this).attr('lang');
                /*************************/
                var filePart1 = fileName.split('.').pop();
                var filepart2 = filePart1.split('?');
                /*************************/
                var elem = fileName.split('/');
                if(elem.length > 3)
                {
                    if(elem[elem.length-1] == '')
                    {
                        var elemExt = elem[elem.length-2].substr((elem[elem.length-2].lastIndexOf('.') + 1));
                    }
                    else
                    {
                        var elemExt = elem[elem.length-1].substr((elem[elem.length-1].lastIndexOf('.') + 1));
                    }
                    if(elemExt == '')
                    {
                        var fileExtension = elemExt;
                    }
                    else
                    {
                        var fileExtension = elemExt.toLowerCase();
                    }
                }
                else
                {
                    var fileExtension = (fileName.substr((fileName.lastIndexOf('.') + 1))).toLowerCase();
                }

                fileExtension = filepart2[0];
                
                if(fileExtension == 'jpg' || fileExtension == 'png' || fileExtension == 'jpeg' || fileExtension == 'gif' || fileExtension == '')
                {
                    $('.training_popup_msg').show();
                    $('.modal-backdrop').addClass('in');
                    $('.modal-backdrop').show();
                    $('.training_popup_msg #con').html('<img id="edit-me" src="'+$(this).attr('lang')+'" style="width: 90%" height="20%">');
                   
                }
                else if(fileExtension == 'pdf' || fileExtension == 'PDF')
                {
                    $('.training_popup_msg').show();
                    $('.modal-backdrop').addClass('in');
                    $('.modal-backdrop').show();
                     $('.training_popup_msg #con').html('<iframe height= "550" width= "100%" frameborder="0" scrolling="auto" src="'+$(this).attr('lang')+'"></iframe>');
                }
                else if(fileExtension == 'wav' || fileExtension == 'mp3')
                {
                    //do nothing
                }
                else
                {
                    $window.open(fileName);
                }
            
          });
          $('.viewmeimage').on('click',function(){
                var fileIdName = $(this).attr('lang');
                $http.get('ClientsController/getDocumentDataImage/'+fileIdName).success(function(data) {
                    if(data){
                        $('.training_popup_msg').show();
                        $('.modal-backdrop').addClass('in');
                        $('.modal-backdrop').show();
                        $('.training_popup_msg #con').html('<div class="image-style">'+data+'</div>');
                    }
                });

          });
          $('.close').on('click',function(){
                $('.training_popup_msg').hide();
                $('.modal-backdrop').removeClass('in');
                $('.modal-backdrop').hide();
          });
         },
     })
     // or here
     .withDataProp('data')
        .withOption('processing', true)
        .withOption('order', [0, 'desc'])
        .withOption('serverSide', true)
        .withOption('lengthMenu', false)
        .withOption('DisplayLength', 5)
        .withOption('lengthMenu', [ [10, 25, 50, 100, -1], [10, 25, 50, 100, "All"] ])
        .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
        .withOption('PaginationType','full_numbers"')
        .withOption('Destroy',true)
        .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'})
        .withOption('columnDefs', [
                         {
                            'targets': 0,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Date'); 
                            }
                         },
                         {
                            'targets': 1,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Name/Description'); 
                            }
                         },
                         /*{
                            'targets': 2,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Author'); 
                            }
                         },*/
                         {
                            'targets': 3,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Type'); 
                            }
                         },
                          {
                            'targets': 4,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'Action'); 
                            }
                         },
                         {
                            'targets': 5,
                            'createdCell':  function (td, cellData, rowData, row, col) {
                               $(td).attr('data-title', 'View'); 
                            }
                         }
                      ])
        vm.dtColumns = [
            DTColumnBuilder.newColumn('date').withTitle('Date'),
            DTColumnBuilder.newColumn('name').withTitle('Name/Description'),
            //DTColumnBuilder.newColumn('author').withTitle('Author'),
            DTColumnBuilder.newColumn('type').withTitle('Type'),
            DTColumnBuilder.newColumn('').withTitle('Action').withOption('defaultContent','<img src="assets/clients/imagesA/view_icon.png" class="click">'),
            DTColumnBuilder.newColumn('prew').withTitle('View').withOption('defaultContent','<img class="viewme" src="assets/clients/imagesA/view_icon.png">')
        ];

    $scope.submitDataDocument = function()
    { 

        $scope.formdata.image_file = JSON.stringify($rootScope.pdfArray);
        if($('#new_doc_src').val() == ''){
            alert('Please upload document');
            return false;
        }
        $('body').css('pointer-events','none');                                         
        $('body').css('opacity','0.5');                                        
        $('.la-anim-10').show();
        $scope.formdata.location = document.getElementById("location").value;
        $scope.formdata.clientId = document.getElementById("ccid").value;
        $scope.formdata.pdfImages = document.getElementById("image_location").value;
        $http.post('ClientsController/edit_client_document',$scope.formdata).success(function($data){
            var dataLayer = window.dataLayer = window.dataLayer || [];
            dataLayer.push({                
                clientEmail: $data.clientemail,
                event: 'Uploaded_Document'
            });
            $('body').css('pointer-events','auto');                                         
            $('body').css('opacity','1');                                         
            $('.la-anim-10').hide();
            if($data.success)
            {
                alert('Document added successfully!');
                $window.location.reload();
            }
            else
            {
                alert('Document was corrupted please try again!');
            }
       });
      };

    // $rootScope.openPage  = function(pdfFile, pageNumber, context,canvas) {    
    //         var scale = 2;
    //         __PAGE_RENDERING_IN_PROGRESS = 1;
    //         __CURRENT_PAGE = pageNumber;
          
    //       // Fetch the page
    //         pdfFile.getPage(pageNumber).then(function(page) {
    //             // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
    //             var scale_required = canvas.width / page.getViewport(1).width;

    //             // Get viewport of the page at required scale
    //             var viewport = page.getViewport(scale_required);

    //             // Set canvas height
    //             canvas.height = viewport.height;

    //             var renderContext = {
    //               canvasContext: context,
    //               viewport: viewport
    //             };
                
    //             // Render the page contents in the canvas
    //             page.render(renderContext).then(function() {
    //               __PAGE_RENDERING_IN_PROGRESS = 0;

                  
    //               var canvas = document.getElementById('canvas'+pageNumber);
    //               $rootScope.pdfArray.push(canvas.toDataURL());
    //               if(pageNumber != 1)
    //               {
    //                 document.getElementById('canvas'+pageNumber).remove();
    //               }
    //                 document.getElementById("canvas1").onclick = function(e){
    //                     window.location.href = $rootScope.canvasUrl
    //                 };
                  
    //             });                           
               
    //         });
    // }  


    $scope.showModalpreview = false;
    $scope.sendurlpreview = '';
    $scope.openpreview = function() {
        $scope.showModalpreview = true;
        $scope.sendurlpreview = $sce.trustAsResourceUrl(mainurl+pdfurl);
    };

    $scope.okpreview = function() {
      $scope.showModalpreview = false;
    };

    $scope.cancelpreview = function() {
      $scope.showModalpreview = false;
    };
    
  });


//define WithAjaxCtrl angular js and datatablejs 
app.controller('WithAjaxCtrl', function(Page,$scope,$sce,$http,DTOptionsBuilder, DTColumnBuilder, $location){
  Page.setTitle("Activity Logs");

  //use for get account status data   
      $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
    $scope.url = $location.absUrl().split('/')[4];
        if( data.result !== 'status_id_not_found' && ($scope.url != '' && $scope.url != 'dashboard'))
    {
            $scope.clientAccountStatus = data.clientStatusData;
            $scope.onholdstatus = data.clientStatusData.alert_hold_client_subtitle;
            $scope.title =  data.clientStatusData.title;
            $scope.statushold = data.clientStatusData.alert_hold_client_enable;
           
            if(data.clientStatusData.alert_hold_client_enable=='1' && data.clientStatusData.id=='9'){
                //warning popup
                $scope.popupCondtion = '1';
                $scope.showModalwarningdispute = true;
                  
                setInterval(function(){
                       $('.modal-backdrop').remove();
                       $("#myModal").fadeIn("fast");
                       $("#myModal").animate({top: '250px'});

                }, 500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarningdispute = false;
                 if(data.client_status_=="3"){
                     $http.post('ClientsController/getReportPopup').success(function(dataPopup) {
                        if(dataPopup.reportcomparisonflag == true){
                            $scope.reportlightbox_ = $sce.trustAsHtml(dataPopup.html);
                            $scope.showModalwarning_ = true;                  
                        }else{
                            $scope.showModalwarning_ = false;          
                        }
                    });                    
                 }
            }
       }
    });
      
     $('body').css('pointer-events','none');                                        
     $('body').css('opacity','0.5');                                        
     $('.la-anim-10').show();
    //for portalpermission
    $scope.portalpermission = [];
    $scope.portal = function(pagetitle){
      $http.get('ClientsController/commonportalpermission/'+pagetitle).success(function($data) {
        $('body').css('pointer-events','auto');                                         
        $('body').css('opacity','1');                                       
        $('.la-anim-10').hide();
       if($data.portal_category) {
         $scope.portalpermission = $data.portal_category[0].link;
       }
     });
    };
    
    
    var vm = this;
    vm.dtOptions = DTOptionsBuilder.fromSource('ClientsController/get_account_activities/'+clientid)
    .withPaginationType('full_numbers');
    vm.dtColumns = [
    DTColumnBuilder.newColumn('activity').withTitle('Activiy'),
    DTColumnBuilder.newColumn('type').withTitle('Type'),
    DTColumnBuilder.newColumn('date_added').withTitle('Date Added')
    ];
    
  });

/*<div ng-controller="WithAjaxCtrl as showCase">
      <table datatable="" dt-options="showCase.dtOptions" dt-columns="showCase.dtColumns" class="row-border hover"></table>
  </div>*/
  
app.directive( 'creditCardType', function(){
      var directive ={ require: 'ngModel', 
      link: function(scope, elm, attrs, ctrl){
        ctrl.$parsers.unshift(function(value){
          // New RegEx according to credit card type rules defined at https://www.cybersource.com/developers/getting_started/test_and_manage/best_practices/card_type_id/
          // Edit: only Visa and Master cards are accepted. Therefore code for American Express and Discover cards is commented out
          scope.ccinfo.credit_card_type =
          (/(^5[1-5])|(^2(221|720))/.test(value)) ? "mastercard"
          : (/^4/.test(value)) ? "visa"
          : undefined
          ctrl.$setValidity('invalid',!!scope.ccinfo.credit_card_type);          
          return value;
        })
      }
    }
    return directive
  } );

  app.directive( 'cardExpiration', function(){
      var directive ={ 
        require: 'ngModel', 
        link: function(scope, elm, attrs, ctrl){
          scope.$watch('[ccinfo.credit_card_expire_month,ccinfo.credit_card_expire_year]',function(value){
          ctrl.$setValidity('invalid',true)
          if ( scope.ccinfo.credit_card_expire_year == scope.currentYear
           && scope.ccinfo.credit_card_expire_month <= scope.currentMonth
           ) {
            ctrl.$setValidity('invalid',false)
          }
          return value
        },true)
      }
    }
    return directive
  } );

   app.filter( 'range', function() {
    var filter =  function(arr, lower, upper) {
      for (var i = lower; i <= upper; i++) arr.push(i)
        return arr
    }
    return filter
  }); 
