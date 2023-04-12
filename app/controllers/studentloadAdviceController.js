app.controller('studentloanAdviceController', function(Page,$scope,$sce,$timeout,$http) {
	Page.setTitle("Student Loan Advice"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);
    $scope.callurl = 'ClientsController/studentloan_advice';

    //use for get account status data   
    $http.get( 'ClientsController/getClientAccountStatusDataAlertPopup' ).success( function(data) {
        if( data.result !== 'status_id_not_found' ){
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

                },500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
            }
        }
    });

   $http.get('ClientsController/getClientAccountStatusDataAlertPopup').success(function(data) {
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
                },500);
            }
            else{
                 $scope.popupCondtion = '0';
                 $scope.showModalwarning = false;
            }
            
    });
});