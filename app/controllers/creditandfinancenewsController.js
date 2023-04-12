/* controller js for Credit And Finance News  */ 
app.controller('creditandfinancenewsController' , function(Page, $scope , $http, article, $window){
	Page.setTitle("Credit And Finance News"); 
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
	setInterval(function(){
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
    }, 3000);
	
	
	$scope.goto = function(id) {
		$http.get('ClientsController/update_article_count/' + id).success(function(data) {
			$window.open(data.article_url, '_blank');
    	});
	}
	$scope.start = start;
	$scope.feed_list = initialFeed;
	$scope.list = initialArticles;
	$scope.alert = '';
	$scope.loadMore = function(e) {
		article.query({
			start: $scope.start,
			desiredArticles: desiredArticles
		}, function(data) {
			if (data.length > 0) {
				$scope.start += data.length;
				$scope.list = $scope.list.concat(data);
			}
			else {
				$widget = angular.element(document.querySelector('#article'));
				$widgetHeader = angular.element(document.querySelector('.panel-heading9'));
				$button = angular.element(e.srcElement);
				$alert = angular.element('<p class="pull-center" style="font-weight: bold;color: #f00;">No more articles!</p>');
				$widgetHeader.prepend($alert);
				$button.remove();
				window.setTimeout(function() {
					$alert.remove();
				}, 4000);
			}
		});
	}
 
});