app.controller('alertController', function(Page,$scope,$timeout,$http) {
	Page.setTitle("Alert Setting");
	$scope.change = {};
		
		$('body').css('pointer-events','none'); 										
		$('body').css('opacity','0.5'); 										
		$('.la-anim-10').show();
		
        
    

          $scope.formsumitted = true;
          $http.get('ClientsController/alertsData').success(function($data){ 
            $('body').css('pointer-events','auto'); 										
			$('body').css('opacity','1'); 										
			$('.la-anim-10').hide();
          	$scope.response=$data.response;
          	if($scope.response==0) {
          		alert('you have been logout');
          		location.href = global_base_url+'logout';
          	}

          	$scope.subscription=$data.subscription; 
          	$scope.powerwallet=$data.powerwallet;
			$scope.sms=$data.sms; 
          });  

          $scope.getPowerVal = function(data) {


          	$http.post('ClientsController/edit_client_powerwallet_alert?powerwallet=', data).success(function($data){ 
				$('body').css('pointer-events','auto'); 										
				$('body').css('opacity','1'); 										
				$('.la-anim-10').hide();
          		$scope.change=$data.returnPowCode; 
          		if( $data.returnPowCode == 1 ){
          			$scope.formssubmissionpowmessage = '<div class="alert alert-success fade in">\
          			<button type="button" class="close close-sm" data-dismiss="alert">\
          			<i class="fa fa-check"></i>\
          			</button>\
          			<strong>Success!</strong> You have successfully updated powerwallet alert.\
          			</div>';
          			$scope.formsumitted = false;

          			$scope.showGreeting = true;
          			$timeout(function(){
          				$scope.showGreeting = false;
          			}, 3000);
          		}else{
          			$scope.formssubmissionpowmessage = '<div class="alert alert-success fade in">\
          			<button type="button" class="close close-sm" data-dismiss="alert">\
          			<i class="fa fa-times"></i>\
          			</button>\
          			<strong>Success!</strong> You have successfully updated powerwallet alert.\
          			</div>';
          			$scope.showGreeting = true;
          			$timeout(function(){
          				$scope.showGreeting = false;
          			}, 3000);
          		}
          	});
          }
          $scope.getVal = function(data) {
          	
          	$http.post('ClientsController/edit_client_transunion_alert?tu_subscription=', data).success(function($data){ 
			    $('body').css('pointer-events','auto'); 										
				$('body').css('opacity','1'); 										
				$('.la-anim-10').hide();
          		$scope.change=$data.returnCode; 
          		if( $data.returnCode == 1 ){
          			$scope.formssubmissionmessage = '<div class="alert alert-success fade in">\
          			<button type="button" class="close close-sm" data-dismiss="alert">\
          			<i class="fa fa-check"></i>\
          			</button>\
          			<strong>Success!</strong> You have successfully updated transunion alert.\
          			</div>';
          			$scope.formsumitted = false;

          			$scope.showGreeting = true;
          			$timeout(function(){
          				$scope.showGreeting = false;
          			}, 3000);
          		}else{
          			$scope.formssubmissionmessage = '<div class="alert alert-success fade in">\
          			<button type="button" class="close close-sm" data-dismiss="alert">\
          			<i class="fa fa-times"></i>\
          			</button>\
          			<strong>Success!</strong> You have successfully updated transunion alert.\
          			</div>';

          			$scope.showGreeting = true;
          			$timeout(function(){
          				$scope.showGreeting = false;
          			}, 3000);
          		}

       // $scope.educationdata=$data.training_sections; 
   }); 



          }
		  
		  /****************************SMS ALERT 10-03-2017****************************************/
		  $scope.getSmsVal = function(data) {
			$http.post('ClientsController/edit_client_sms_alert?sms='+data, data).success(function($data){ 
			    $('body').css('pointer-events','auto'); 										
				$('body').css('opacity','1'); 										
				$('.la-anim-10').hide();
				$scope.change=$data.returnSmsCode; 
          		if( $data.returnSmsCode == 1 ){
          			$scope.formssubmissionsmsmessage = '<div class="alert alert-success fade in">\
          			<button type="button" class="close close-sm" data-dismiss="alert">\
          			<i class="fa fa-check"></i>\
          			</button>\
          			<strong>Success!</strong> You have successfully updated sms alert.\
          			</div>';
          			$scope.formsumitted = false;
          			$scope.showGreeting = true;
          			$timeout(function(){
          				$scope.showGreeting = false;
          			}, 3000);
          		}else{
          			$scope.formssubmissionsmsmessage = '<div class="alert alert-success fade in">\
          			<button type="button" class="close close-sm" data-dismiss="alert">\
          			<i class="fa fa-times"></i>\
          			</button>\
          			<strong>Success!</strong> You have successfully updated sms alert.\
          			</div>';
          			$scope.showGreeting = true;
          			$timeout(function(){
          				$scope.showGreeting = false;
          			}, 3000);
          		}
          	});
          }
		  /****************************SMS ALERT 10-03-2017****************************************/
      });



