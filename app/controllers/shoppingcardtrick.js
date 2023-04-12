// Added for shoping card trick
app.controller('shoppingcardtrick' , function(Page, $scope , $http, article, $window){
	Page.setTitle("Shopping Card Crick"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);



 //Added function added to load dynamic html content to  shopping_section_data
  $http.get('ClientsController/shoppingcardtrickData').success(function($data) {  
    	$scope.shopping_section_data = $data; 

  });  	
	
});
// Added for shoping card trick