app.controller('studentloanAdviceController', function(Page,$scope,$sce,$timeout,$http) {
	Page.setTitle("Student Loan Advice"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);
    $scope.callurl = 'ClientsController/studentloan_advice';
   
});