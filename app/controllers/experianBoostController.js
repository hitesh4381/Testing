// Added for experian boost - resource
app.controller('experianBoostController' , function(Page, $scope , $http, article, $window, $sce){
	Page.setTitle("Experian Boost"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

 //Added function added to load dynamic html content to experian boost
  $http.get('ClientsController/experianBoostContent').success(function($data) {  
    	$scope.experianBoostData = $sce.trustAsHtml($data); 

  });  	
	
});
// Added for shoping card trick
