app.controller('nationalCreditDirect', function(Page,$scope,$sce,$timeout,$http,$rootScope,$location,$route,$window) {
	Page.setTitle("NationalCreditDirect");    

    $('body').css('pointer-events','none'); 										
  	$('body').css('opacity','0.5'); 										
  	$('.la-anim-10').show();
  	
    setInterval(function(){
    	$('body').css('pointer-events','auto'); 										
    	$('body').css('opacity','1'); 										
    	$('.la-anim-10').hide();
    }, 2000);
    
   // $scope.callurl = 'ClientsController/nationalCreditDirect';
    //alert($rootScope.huttonchaseflag);
    $http.get('ClientsController/NcdStatusTrigger/' + clientid + '/get').success(function(data) {
                $scope.ncdflag = data.status;
                //console.log(data);
                //console.log(data.status);
                if(data.status == 1)
                {
                    $scope.ncdEnrollDate = data.createdDate;
                }
                //console.log('sdfs'); console.log($scope.ncdflag);
                if($scope.ncdflag == 0){$scope.disabledButton = false;}else{$scope.disabledButton = true;}    
            });  
      
     
    // $scope.huttonchaseflagDate = $rootScope.huttonchasedate;
//console.log($scope.ncdflag); console.log($scope.disabledButton);
    $scope.respError = false;
    $scope.respErrorMsg = '';
    $scope.loader = false;
    $scope.Processing = false;
    $scope.button = true;
    $scope.processed = false;
    $scope.ncdEvent = function(){
        $scope.loader = true;
        $scope.button = false;
        $scope.Processing = true;
        //if($scope.ncdflag == 0){
         //    $http.get('ClientsController/NcdStatusTrigger/' + clientid + '/change').success(function(data) {
         //        //data = data[0];
         //    $timeout( function(){
         //        $scope.Processing = false;
         //    }, 1000 );
         //    $timeout( function(){
         //        if(data.status == 0){ $scope.processed = false; $scope.notprocessed = true;}
         //        else{ $scope.processed = true; $scope.notprocessed = false;}
         //    }, 1200 );        
         //    //2 seconds delay
         //    $timeout( function(){
         //        $scope.processed = false; 
         //        $scope.notprocessed = false;            
         //        $scope.loader = false;
         //        $scope.button = true;
         //    }, 3000 );
         //     $timeout( function(){
         //      $scope.ncdflag = data.status;
         //        if(data.status == 1)
         //        {
         //            $scope.ncdEnrollDate = data.enrollDate;
         //            $scope.respError = false;
         //            $scope.respErrorMsg = '';
         //        }
         //        else
         //        {
         //            $scope.respError = true;
         //            $scope.respErrorMsg = data.message;
         //        }  
         //        if($scope.ncdflag == 0){$scope.disabledButton = false;}else{$scope.disabledButton = true;}   
         //       },200);    
         // });
        //}
    };   

});