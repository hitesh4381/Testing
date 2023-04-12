app.controller('divvyHomesController', function(Page,$scope,$sce,$timeout,$http) {
	Page.setTitle("Divvy Homes"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);
    $http.get('ClientsController/divvy_homes').success(function($data) { 
    console.log($data); 
    	console.log($data.iframe_link);
          $scope.iframe_link = $sce.trustAsResourceUrl($data.iframe_link); 
          $scope.content = $sce.trustAsHtml($data.content);
    }); 

    

});