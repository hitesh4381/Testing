app.controller('contactInfoController', function(Page,$scope,$sce,$timeout,$http,$rootScope) {
	Page.setTitle("Contact Information"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);

$scope.display = false;
$scope.content = '';
//$scope.callurl = 'ClientsController/contactInformation';
$http.get('ClientsController/contactInformation').success(function(data) {
  	  if(data.tag_data == 147){
  			 $scope.display = true;
  		}
  		$scope.content = $sce.trustAsHtml(data.page_content);
  });

$scope.senddata = function () {
  $http.get('ClientsController/contactInformationdata').success(function(data) {});
}
});