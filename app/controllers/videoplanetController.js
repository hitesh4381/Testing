//define videodashboardController 
app.controller('videodashboardController', function(Page,$scope,$timeout,$http) {

Page.setTitle("Video Planet"); 
   
    
    $scope.callurl = 'video/index';
});

//define popularlistingController 
app.controller('popularlistingController', function(Page,$scope,$timeout,$http) {

    Page.setTitle("Popular Video");  
    
    //for portalpermission
    $scope.callurl = 'video/listing/popular';
    
});

//define recentvideoController 
app.controller('recentvideoController', function(Page,$scope,$timeout,$http) {

    Page.setTitle("Recent Video");  
    
    
    $scope.callurl = 'video/listing/recent';
});

//define videoplaylistController 
app.controller('videoplaylistController', function(Page,$scope,$timeout,$http) {

    Page.setTitle("Recent Video");  
    
   
    
    $scope.callurl = 'video/playlist';
    
});
//define videoplayController 
app.controller('videoplayController', function(Page,$scope,$routeParams, $http) {

    Page.setTitle("Video");  
    //for portalpermission
    
     

    $scope.id = $routeParams.id;
    $scope.videoname = $routeParams.videoname;
    //alert($scope);
    //
    $scope.callurl = 'video/play/'+$scope.id+'/'+$scope.videoname;
    
});
//define playlistdetailController 
app.controller('playlistdetailController', function(Page,$scope,$routeParams, $http) {

    Page.setTitle("Play List Detail");  
    //for portalpermission

    $scope.id = $routeParams.id;
    $scope.playlistname = $routeParams.playlistname;
    //alert($scope);
    //
    $scope.callurl = 'video/playlist/playlist_details/'+$scope.id+'/'+$scope.playlistname;
    
    
});


//define videosearchController 
app.controller('videosearchController', function(Page,$scope,$routeParams, $http) {

        Page.setTitle("Video Planet");  

        //$scope.id = $routeParams.id;
        $scope.searchtext = $routeParams.searchtext;
        //alert($scope);
        //
        $scope.callurl = 'video/search/'+$scope.searchtext;
        
        
  
});
//define videoplayController  for populer video pagination
app.controller('popularvideoPagination', function(Page,$scope,$timeout,$routeParams,$http) {
    Page.setTitle("Popular Video");  
    

    $scope.pageno = $routeParams.pageno;
    $scope.callurl = 'video/listing/popular/'+$scope.pageno;    
});

//define videoplayController  for recent video pagination
app.controller('recentvideoPagination', function(Page,$scope,$timeout,$routeParams,$http) {
    Page.setTitle("Recent Video");  
   

    $scope.pageno = $routeParams.pageno;
    $scope.callurl = 'video/listing/recent/'+$scope.pageno;    
});