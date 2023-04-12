app.controller('saveonInternetController', function(Page,$scope,$sce,$timeout,$http) {
  Page.setTitle("Save on Internet"); 
    $('body').css('pointer-events','none');                     
  $('body').css('opacity','0.5');                     
  $('.la-anim-10').show();
  setInterval(function(){
    $('body').css('pointer-events','auto');                     
    $('body').css('opacity','1');                     
    $('.la-anim-10').hide();
    }, 3000);
  
    //$scope.callurl = 'ClientsController/save_on_internet';
    
      $http.get('ClientsController/save_on_internet').success(function($data) {  
          $scope.iframe_link = $sce.trustAsResourceUrl($data.iframe_link); 
          $scope.content = $sce.trustAsHtml($data.content);
         // $scope.iframe = $data.iframe_link; 

      });  
    

});