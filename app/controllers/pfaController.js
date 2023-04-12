//define widgetController 
app.controller('pfaController', function(Page,$scope,$sce,$http,$window){

    Page.setTitle("PFA");
    
   
    $scope.show = true; 

     
    
        //for portalpermission
        
    
    $scope.trainingdata = []; 
	angular.element(document).ready(function () {
        $http.post('ClientsController/userLoginPfa/').success(function($data){ 
            $scope.show = true;
            $scope.response=$data.response;
           // $scope.linktoopen=$sce.trustAsResourceUrl($data);//sk
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }
          openwindow($data);
		   });
    });
      
    function openwindow($data){
      if($data.status){
          $scope.show = true;
          $window.open($data.msg, '_self');
      }else{
          $scope.show = false;
          $scope.message = $data.msg;
      }
    }
 
});
