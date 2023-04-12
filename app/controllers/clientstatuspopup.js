/* controller js for timeline  */ 
app.controller('clientstatuspopup' , function($rootScope , $http, $location){
	
    $rootScope.pastduedata=[];
     /*past due data popup show here 28-oct-2017 */
    $rootScope.showModalPastDue = true;
    $rootScope.hideModalPastDue = function(){
        
        $rootScope.showModalPastDue = false;
        $('.modal-backdrop').remove();
        $rootScope.showModalwarningPastDue = false;
    }
	$rootScope.paymentinfoPastDue = function(){
	    $rootScope.paymentStatusFlag = true;
	    $location.path('/billing');
    }
  if($rootScope.paymentStatusFlag == true)
  {
	    $rootScope.showModalPastDue = false;
	    $('.modal-backdrop').remove();
	    $rootScope.showModalwarningPastDue = false;
  }
  else{
    // Check client status
	    $rootScope.pastduedata=[];
	    $http.get('ClientsController/getClientPastDueStatus').success(function(data) {
	      
	        $rootScope.pastduedata = data;
	        if(data.result !== 'status_id_not_found')
	        {
	            $rootScope.pastduedata = data.clientStatusData;	            
	            if (data.clientStatusData.alert_enable_client == '1' && data.clientStatusData.id == '7' && data.clientStatusData.enable_client == '0') {
	                $rootScope.clientAccountStatus = data.clientStatusData;
	                $rootScope.alert_enable_client = data.clientStatusData.alert_enable_client;
	                $rootScope.title = data.clientStatusData.title;
	                $rootScope.alert_subtitle_client = data.clientStatusData.alert_subtitle_client;
	                $rootScope.payment_btn = data.clientStatusData.payment_btn;
	                //warning popup
	                $('.modal-backdrop').remove();
	                $rootScope.popupCondtionPastDue = '1';
	                $rootScope.showModalwarningPastDue = true;
	            } else {
	                $rootScope.popupCondtionPastDue = '0';
	                $rootScope.showModalwarningPastDue = false;
	            }
	            if($location.url() == '/billing' && data.clientStatusData.payment_btn==0)
                {
                    $rootScope.payment_btn = 1;
                     $rootScope.popupCondtionPastDue = '0';
                    $rootScope.showModalwarningPastDue = false;
                }
	            
	        }
	    });
  }
});