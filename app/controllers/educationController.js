//define educationController 
app.controller('educationController', function(Page,$scope,$timeout,$http) {

	$('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
    Page.setTitle("Education");
    $scope.educationdata = [];
    $scope.educationSection = [];
    $scope.formsumitted = true;
    
   
    
    
    
    $http.get('ClientsController/education').success(function($data){ 
	    $('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
        //
        $scope.response=$data.response;
        if($scope.response==0) {
            alert('you have been logout');
            location.href = global_base_url+'logout';
        }
        $scope.educationdata=$data.training_sections; 
        $scope.educationSection=$data.training_sections_title; 
    }); 

    $scope.getIframeSrc = function (videoId) {
      return 'https://www.youtube.com/embed/' + videoId;
    }; 
    
    $scope.submitData = function (form)
    {
		var subject = $('#subject').val();
        var message = $('#message').html();
		
		 var arrData = {subject: subject, message: message};
			
        $http.post('ClientsController/sendTrainingQuestion',arrData).success(function($data){ 
            
            if( $data.returnCode ){
                
                $scope.formssubmissionmessage = '<div class="alert alert-success fade in">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        <i class="fa fa-check"></i>\
                                                    </button>\
                                                    <strong>Success!</strong> You successfully sent a message.\
                                                </div>';
                $scope.formsumitted = false;
                
                $scope.showGreeting = true;
                $timeout(function(){
                   $scope.showGreeting = false;
                }, 3000);
                
            }else{
                $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        <i class="fa fa-times"></i>\
                                                    </button>\
                                                    <strong>Ooops!</strong> Message was not sent.\
                                                </div>';
            }
            
        });
    };

});