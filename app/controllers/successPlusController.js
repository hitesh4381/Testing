app.controller('successPlusController', function(Page,$scope,$sce,$timeout,$http) {
	Page.setTitle("Success Plus"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);
    $http.get('ClientsController/success_plus/84').success(function($data) { 
    
         
          $scope.content = $sce.trustAsHtml($data.html);
    }); 

});