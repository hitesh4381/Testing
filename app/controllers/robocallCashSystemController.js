// Added for robocall cash system - resource
app.controller('robocallCashSystemController' , function(Page, $scope , $http, article, $window, $sce){
	Page.setTitle("Robocall Cash System");
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

  $http.get('ClientsController/robocallCashSystemContent').success(function ($data) {
    	$scope.robocallCashSystemData = $sce.trustAsHtml($data); 
  });  	
	
});
