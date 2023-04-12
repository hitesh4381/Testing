/* controller js for refer a friend  */ 
app.controller('referafriendController' , function(Page, $scope , $http, article, $window , $window,$sce){
	Page.setTitle("Refer a friend"); 
  $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

      //30 march add code for client status data
      //use for get account status data   
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
    });

});