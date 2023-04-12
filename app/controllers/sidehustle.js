app.controller('sidehustle', function(Page,$scope,$sce,$timeout,$http) {	
	Page.setTitle("SideHustle");

  $('body').css('pointer-events','none');                     
  $('body').css('opacity','0.5');                     
  $('.la-anim-10').show();

  // to get list of companies for side hustle
  $http.get('ClientsController/get_sidehustle_data').success(function($data){
      $('body').css('pointer-events','auto');                     
      $('body').css('opacity','1');                     
      $('.la-anim-10').hide();
        
      $scope.response=$data.response;
      if($scope.response==0) {
          alert('you have been logout');
          location.href = global_base_url+'logout';
      }
      
      $scope.hustle_categories = $data.hustle_categories;
      $scope.sidehustledata = $data.sidehustledata;
      $scope.main_content = JSON.parse($data.page_data.content);
      $scope.header_content = $scope.main_content.header_content;
      $scope.footer_content = $scope.main_content.footer_content;
  });


	/*$('body').css('pointer-events','none'); 										
  	$('body').css('opacity','0.5'); 										
  	$('.la-anim-10').show();

    $scope.sidehustledataextra = {
	    description_top_1: "When it comes to paying down your student loans or credit card debt, there’s only so much you can do to cut back on your expenses. That’s why finding ways to increase your income is so important; it gives you more money to put towards your debt or savings each month.",
      description_top_2: "Side gigs or side hustles are great ways to increase your income on your own schedule. Most are scalable, so you increase or decrease your hours as your needs change. Working a side hustle can help you earn more money and accelerate your debt repayments, without committing to the schedule demands of a regular second job.",
      description_top_3: "Below, find potential side gig opportunities. From ride sharing to renting out rooms, you can find options that work for your lifestyle.",
      description_bottom_1: "By taking on one or more of these side gigs, you could increase your income and accelerate your student loan or credit card payments. Over time, you could save money in interest by prepaying your debt with your side hustle income.",
      description_bottom_2: "If you are looking to take charge of your debt and improve your financial outlook, consider launching a side hustle to bring in extra cash and pay down your balance."
	  };

  	setInterval(function(){
    	$('body').css('pointer-events','auto'); 										
    	$('body').css('opacity','1'); 										
    	$('.la-anim-10').hide();
    }, 2000);*/


    $scope.callurl = 'ClientsController/sidehustle';

});