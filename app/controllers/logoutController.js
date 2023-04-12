appinterview.controller('logoutController',function($location, $scope, $window,$localStorage,$http){
    $scope.url =global_base_url;
    $window.localStorage.clear();
    $localStorage.LocalMessage ='';
    $localStorage.firstUpdate = 2;
      $http.get('ClientsController/interview_logout').success(function (data) {
         location.href=  global_base_url;  
  });
});



