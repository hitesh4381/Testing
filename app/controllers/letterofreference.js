/* controller js for Credit And Finance News  */ 
app.controller('letterofreference' , function(Page, $scope , $http, article, $window){
	Page.setTitle("Letter of reference"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

    
	$scope.sendEmail = function(){
		$http.post('ClientsController/email_attachemnet/',clientid,$scope.path1).success(function($data){
                alert("Success");
        });
      
	}    

	$http.get('ClientsController/get_letter_by_refrence/'+140).success(function(data) {
		var path = data.replace(/[\r\n\x0B\x0C\u0085\u2028\u2029]+/g," ");
		$scope.path1 = path;
		$('#data').append('<script>$("#me").click(function() { window.open("'+path+'"); });</script><div><div class="mobile-iframe1"></div><iframe src="'+path+'" width="100%" height="615px" style="border:none;" scrolling="no"></iframe></div>');
	});	
});