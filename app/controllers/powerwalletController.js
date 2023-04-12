//define widgetController 
app.controller('powerwalletController', function(Page,$scope,$sce,$http,$window){

    Page.setTitle("Powerwallet");
   
    
    $scope.trainingdata = []; 
	angular.element(document).ready(function () {
        $http.post('ClientsController/userLogin/').success(function($data){ 
            
            $scope.response=$data.response;
            //$scope.linktoopen=$sce.trustAsResourceUrl($data);
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }
        
		      openwindow($data);
		   });
    });
    
	$scope.getval = function() {
                $http.post('ClientsController/userLogin/').success(function($data){ 
                openwindow($data);
                 });
   }
      
      function openwindow($data){
        if($data.status){
            $window.open($data.msg, '_blank');
        }else{
            $('.btn-open-wallet').hide().after('<p class="text-danger">'+$data.msg+'</p>');
        }
    }
 
});
