// Added for shoping card trick
app.controller('creditcardWizardController' , function(Page, $scope , $http, article, $window,$sce){
	Page.setTitle("Credit Card Wizard"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

 
   $http.get('ClientsController/creditcardWizardData/').success(function (data) {
    	$scope.credit_wizard_data = $sce.trustAsHtml(data.content); 
    });   
});
 