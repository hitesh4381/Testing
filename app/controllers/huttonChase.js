app.controller('huttonChase', function(Page,$scope,$sce,$timeout,$http,$rootScope,$location,$route,$window) {
	Page.setTitle("HuttonChase");    

    $('body').css('pointer-events','none'); 										
  	$('body').css('opacity','0.5'); 										
  	$('.la-anim-10').show();
  	
    setInterval(function(){
    	$('body').css('pointer-events','auto'); 										
    	$('body').css('opacity','1'); 										
    	$('.la-anim-10').hide();
    }, 2000);
    
    $scope.callurl = 'ClientsController/huttonChase';
    //alert($rootScope.huttonchaseflag);
    if($rootScope.huttonchaseflag == 0){$scope.disabledButton = false;}else{$scope.disabledButton = true;}
    $scope.huttonchaseflagDate = $rootScope.huttonchasedate;

    $scope.loader = false;
    $scope.Processing = false;
    $scope.button = true;
    $scope.processed = false;
    $scope.huttonChase = function(){
        $scope.loader = true;
        $scope.button = false;
        $scope.Processing = true;
        if($rootScope.huttonchaseflag == 0){
            $http.get('ClientsController/huttonChaseTrigger/'+ clientid).success(function(data) {
                data = data[0];
            $timeout( function(){
                $scope.Processing = false;
            }, 1000 );
            $timeout( function(){
                if(data.huttonchaseflag == 0){ $scope.processed = false; $scope.notprocessed = true;}
                else{ $scope.processed = true; $scope.notprocessed = false;}
            }, 1200 );        
            //2 seconds delay
            $timeout( function(){
                $scope.processed = false; 
                $scope.notprocessed = false;            
                $scope.loader = false;
                $scope.button = true;
            }, 3000 );
        
            $http.post('ClientsController/get_client_data', clientid).success(function(data) {
            if(data.huttonchaseflag == 0){$scope.disabledButton = false;}else{$scope.disabledButton = true;}
            $scope.huttonchaseflagDate = data.huttonchasedate;
            });  
         });
        }
    };   

});