// Job search controller
app.controller('jobsearchController', function(Page, $scope, $location, $http, $anchorScroll) {
  
    // Show the loader
    toggle_loader();
   	
	// Set page title
    Page.setTitle("Job Search");
    
    
    // Categories to display    
    var categories = 'Accounting,Arts,Administrative,Advertising,Automotive,Banking,Biotech,College,Computer,Construction,Criminal Justice,Counselling,Design,Education,Engineering,Electrical Engineering,Entertainment,Entry Level,Executive,Finance,Franchise,Federal,Forensic science,General Labor,Graphic Designer,Government,Grocery,Healthcare,Hospitality,HVAC,Human Resources,Information Technology,Insurance,Inventory,Internet,Investment banking,Journalism,Law Enforcement,Legal,Management Consulting,MBA,Manufacturing,Marketing,Medical assistant,Medical billing,Medical transcription,Music industry,NHS,Nurse,Online Teaching,Operartions,Pharmaceutical,Paralegal,Plumbing,Project manager,Publishing,Psychology,Real Estate,Recruitment,Renewable Energy,Research,Restaurant,Retail,Sales,Science,Skilled Labor Trades,Software testing,Sports Management,Strategy Planning,Supply Chain,Telecommunications,Training,Transcription,Travel,Travel nursing,Travelling,Trucking,Truck driver,University,Veterinary,Warehouse,Web Design';
    
    // Convert to array
    categories = categories.split(',');
    
    // Divide into four columns
    $scope.categories = split_array(categories, 4);
    
    // Locations to display
    var locations = 'Alaska,Arizona,Arkansas,California,Colorado,Connecticut,Delaware,District of Columbia,Florida,Georgia,Hawaii,Idaho,Maine,Maryland,Massachusetts,Michigan,Minnesota,Mississippi,Missouri,Montana,Nebraska,Nevada,New Hampshire,New Jersey,New Mexico,New York,North Carolina,North Dakota,Ohio,Oklahoma,Oregon,Pennsylvania,Rhode Island,South Carolina,South Dakota,Tennessee,Texas,Utah,Vermont,Virginia,Washington,West Virginia,Wisconsin,Wyoming';

    // Convert to array
    locations = locations.split(',');
    
    // Divide into four columns
    $scope.locations = split_array(locations, 4);
    
    // Get all job listings
    $http.get('Jobsearch_Controller/get_all_listings').success(function(data) {
    	
    	// Job listings title
        $scope.job_listings_title = 'View latest posted job listings on job banks, job search engine sites and job directories.';
    	
    	// Pagination data and functions start
    	show_job_listings(data);
    });
    
    /*
     * Search functionality
     * 
     * @params
     * search_term - entered by user
     * search_location - entered by user
     * 
     * @return
     * Displays listings on the page and scrolls to it
     */
    $scope.search = function(search_term, search_state, search_city, search_zipcode){    
    	
    	// Show the loader
    	toggle_loader();
    	
    	// Scroll to the search results section
    	$anchorScroll('#jobresults');

        search_term = (search_term === undefined) ? '' : search_term;
        search_state = (search_state === undefined) ? '' : search_state;
        search_city = (search_city === undefined) ? '' : search_city;
        search_zipcode = (search_zipcode === undefined) ? '' : search_zipcode;
        search_location = search_city + ', ' + search_state + ' ' + search_zipcode;
        most_precise_location = (search_zipcode !== '') ? search_zipcode : ((search_city !== '') ? search_city : search_state);
    	
    	// Prepare the job listings title
		if(search_term != '' || search_location != '')
		{
			// Send search request to PHP controller
            var url = 'Jobsearch_Controller/search_listings?q=' + search_term + '&state=' + search_state + '&city=' + search_city + '&zipcode=' + search_zipcode;
        	$http.get(url).success(function(data) {
        		// Paginate and display the job listings
                
        		show_job_listings(data);
            });
        	
			if(search_term == '')
			{
				// Only search location is specified
				$scope.job_listings_title = 'View job listings in ' + most_precise_location;
				
				// Set page title
			    Page.setTitle("Job Search - Job listings in " + search_location);
			}
			else if(search_location == '')
			{
				// Only search term is specified
				$scope.job_listings_title = 'View job listings for "' + search_term + '"';
				
				// Set page title
			    Page.setTitle("Job Search - Job listings for " + search_term);
			}
			else
			{
				// Both search term and location is specified
				$scope.job_listings_title = 'View job listings for "' + search_term + '" in ' + most_precise_location;
				
				// Set page title
				Page.setTitle("Job Search - Job listings for " + search_term + " in " + search_location);
			}

            // Scroll to search results
            $('body, html').animate({scrollTop: $('#jobresults').offset().top});  

            // Fill the search input fields with these search terms
            $('#q').val(search_term);
            $('#state').val(search_state);
            $('#city').val(search_city);
            $('#zipcode').val(search_zipcode);
		}
		else
		{
			// Do not perform a search request since both parameters are empty
			// Both search term and search location are empty
		    $scope.job_listings_title = 'View latest posted job listings on job banks, job search engine sites and job directories.';
		    
		    // Set the default page title
		    Page.setTitle("Job Search");
		}    	
    };
    
    // Number of job listings per page
    $scope.items_per_page = 10;
    
    // Number of pager buttons to show
    $scope.max_size = 5;
    
    // Function to change the page number
    $scope.setPage = function (page_no, tab_no) {
    	// Set the current page number
        $scope.current_page[tab_no] = page_no;
        
        // Get current page's listings
        $scope.listings[tab_no].current_page_listings = $scope.listings[tab_no].feed.slice((($scope.current_page[tab_no]-1) * $scope.items_per_page), ($scope.current_page[tab_no] * $scope.items_per_page));
    };
    
    function show_job_listings(data)
    {
    	// Pagination data and functions end
    	// Array containing job listings from all sources 
    	var all_listings_arr = [];

    	// Loop over all job sources to get combine all job listings into one array
    	// This is done in order to display all job listings in the 'All' tab    	
    	for(var i = 0; i < data.length; i++)
		{
    		// Combine all job listings into a single array
    		all_listings_arr = all_listings_arr.concat(data[i].feed);
		}
    	
    	// Total number of items displayed in this tab
    	$scope.total_items = all_listings_arr.length;

    	// Listing object for all listings
    	var all_listings_obj = {
    		'title': 'All',
    		'feed': all_listings_arr
    	};
    	
    	// Set the listings array equal to all job listings array
    	$scope.listings = data;
    	
    	// Add the 'All listings' object to this array
    	$scope.listings.unshift(all_listings_obj);
    	$scope.current_page = [];
    	
    	// Loop over all the job listing tabs and set the first page and the default page
    	for(var i = 0; i < $scope.listings.length; i++)
		{
    		// Default page displayed on first load 
        	$scope.current_page[i] = 1;
        	
        	// By default display the first page
        	$scope.setPage(1, i);
		}
    	
    	// Show the loader
    	toggle_loader();
    }
    
    // Function to split array into 'n' arrays equally (or nearly equal)
    function split_array(arr, n) {
        var rest = arr.length % n, // how much to divide
            restUsed = rest, // to keep track of the division over the elements
            partLength = Math.floor(arr.length / n),
            result = [];

        for(var i = 0; i < arr.length; i += partLength) {
            var end = partLength + i,
                add = false;

            if(rest !== 0 && restUsed) { // should add one element for the division
                end++;
                restUsed--; // we've used one division element now
                add = true;
            }

            result.push(arr.slice(i, end)); // part of the array

            if(add) {
                i++; // also increment i in the case we added an extra element for division
            }
        }

        return result;
    }
    
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
    
    $scope.start_new_search = function(){
    	// Reset the search box
    	$('#q').val('');
    	
    	// Reset the locations box
    	$('#loc').val('');
    	
    	// Scroll to search box
    	$anchorScroll('q');
    };
   
});