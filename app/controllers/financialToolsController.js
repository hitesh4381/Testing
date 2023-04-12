// Added for shoping card trick
app.controller('financialToolsController' , function(Page, $scope , $http, article, $window){

	Page.setTitle("Financial Tools"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000); 
	
});
 