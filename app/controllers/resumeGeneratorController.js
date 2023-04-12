//define dashboardController 

app.controller('resumeGeneratorController', function(Page,$scope,$timeout,$http) {
	// Show the loader animation
	toggle_loader();
  
	// Set the page title
    Page.setTitle("Resume Generator");
    
    // Variables to check if all HTTP requests have loaded
    var total_http_requests = 2;
   
    $('html').niceScroll();
    // Default values
    $scope.clientName = 'Full Name';
    $scope.phone1 = 'Phone 1';
    $scope.phone2 = 'Phone 2';
    $scope.phone3 = 'Phone 3';
    $scope.email = 'Email';
    $scope.addr1 = 'Address line 1';
    $scope.addr2 = 'Address line 2';
    $scope.addr3 = 'City, State Zipcode';

    $http.get('ClientsController/get_client_resume_info').success(function(data) {

    	if(data.client_info != 'NOT_FOUND')
    	{
    		// No need to repeat variable name
    		data = data.client_info;

    		// If middle name is not empty, append a space to it
    		if(data.middleName != '')
    			data.middleName = data.middleName + ' ';

    		// If suffix is not empty, prepend a space to it
    		if(data.suffix != '')
    			data.suffix = ' ' + data.suffix;

    		$scope.clientName = data.first_name + ' ' + data.middle_name + data.last_name + data.suffix;
		    $scope.phone1 = data.phone_home;
		    $scope.phone2 = data.phone_mobile;
		    $scope.phone3 = data.phone_work;
		    $scope.email = data.email;
		    $scope.addr1 = data.address_one;
		    $scope.addr2 = data.address_two;
		    $scope.addr3 = data.city + ', ' + data.state + ' ' + data.zipcode;
    	}
        
    	toggle_loader();
        
        $('html').niceScroll();
    });
    
    // Function to show/hide the loader animation
    function toggle_loader()
    {
    	// Check if loader is hidden or not
    	if($('.la-anim-10').is(':hidden'))
		{
    		// Show the loader
            $('body').css('pointer-events','none'); 										
        	$('body').css('opacity','0.5'); 										
        	$('.la-anim-10').show();
		}
    	else
		{
    		// Hide the loader
            $('body').css('pointer-events','auto'); 										
        	$('body').css('opacity','1'); 										
        	$('.la-anim-10').hide();
		}
    }
    
});