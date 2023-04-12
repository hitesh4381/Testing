//define widgetController 
app.controller('widgetController', function($scope,$http){
    $scope.widgetdata = [];    
    $scope.doSomething = function(widgetObject){
        
        $http.get('widget/'+widgetObject).success(function($data){ 
            
            $scope.response=$data.response;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }
            
            
            $scope.widgetdata=$data; 

        });
    }
});