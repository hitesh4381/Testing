/* controller js for loan calculator.  */ 
app.controller('snowballAndAvalancheRepaymentToolController' , function(Page, $scope , $http ){
	Page.setTitle("Snowball and Avalanche Repayment Tool"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

    
});