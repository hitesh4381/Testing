app.controller('IframeController', function(Page,$scope,$sce,$timeout,$http) {
  Page.setTitle("Test Iframe"); 
    $('body').css('pointer-events','none');                     
  $('body').css('opacity','0.5');                     
  $('.la-anim-10').show();
  setInterval(function(){
    $('body').css('pointer-events','auto');                     
    $('body').css('opacity','1');                     
    $('.la-anim-10').hide();
    }, 3000);
  
    //$scope.callurl = 'ClientsController/save_on_internet';
    
      $http.get('ClientsController/iframe_test').success(function($data) {  
        console.log($data.client_id);
          $scope.client_id = $data.client_id; 
          $scope.first_name = $data.firstname;
          $scope.last_name = $data.last_name; 
          $scope.email = $data.email;
          $scope.phone_mobile = $data.phone_mobile;
          $scope.iframe_link=$sce.trustAsResourceUrl("https://rentinfo.wpengine.com/tvc-signup-embed/?aid=1&customer_id="+$scope.client_id+"&embedd=1&email_address="+$scope.email+"&fname="+$scope.first_name+"&lname="+$scope.last_name+"&phone_number="+$scope.phone_mobile);
          $scope.content = $sce.trustAsHtml($data.content);
      });  
    

});