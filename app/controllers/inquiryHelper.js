app.controller('inquiryHelper', function(Page,$scope,$sce,$timeout,$http,$rootScope,$location,$route,$window) {
	Page.setTitle("Inquiry Helper");    

    $('body').css('pointer-events','none'); 										
  	$('body').css('opacity','0.5'); 										
  	$('.la-anim-10').show();
  	
    setInterval(function(){
    	$('body').css('pointer-events','auto'); 										
    	$('body').css('opacity','1'); 										
    	$('.la-anim-10').hide();
    }, 2000);

    $scope.callurl = 'ClientsController/inquiryHelper';
    if($rootScope.inquiryhelperflag == 0){$scope.disabledButton = false;}else{$scope.disabledButton = true;}
    $scope.inquiryhelperflagDate = $rootScope.inquiryhelperdate;

    $scope.loader = false;
    $scope.Processing = false;
    $scope.button = true;
    $scope.processed = false;
    $scope.inquiryHelper = function(){
    $scope.loader = true;
    $scope.button = false;
    $scope.Processing = true;
    if($rootScope.inquiryhelperflag == 0){
    $http.get('ClientsController/inquiryHelperTrigger/'+ clientid).success(function(data) {
        $timeout( function(){
            $scope.Processing = false;
        }, 1000 );
        $timeout( function(){
            $scope.processed = true;
        }, 1200 );        
        //2 seconds delay
        $timeout( function(){
            $scope.processed = false;            
            $scope.loader = false;
            $scope.button = true;
        }, 3000 );
    
        $http.post('ClientsController/get_client_data', clientid).success(function(data) {
        if(data.inquiryhelperflag == 0){$scope.disabledButton = false;}else{$scope.disabledButton = true;}
        $scope.inquiryhelperflagDate = data.inquiryhelperdate;
        });  
     });
    }
    };

});