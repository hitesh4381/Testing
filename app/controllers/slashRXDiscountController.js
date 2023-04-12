// Added for shoping card trick
app.controller('slashRXDiscountController' , function(Page, $scope , $http, article, $window,$sce){
	Page.setTitle("SlashRX Discount"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

 
  $url = 'https://www.slashrx.com/CreditPros/en/Home';   
  $scope.url = $sce.trustAsResourceUrl($url);   
});
// Added for shoping card trick