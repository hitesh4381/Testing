  app.controller('comparisonMethodologyController',function(Page,$scope,$http,$routeParams,DTOptionsBuilder, DTColumnBuilder){
  Page.setTitle("Comparison Methodology") ;
  		$('body').css('pointer-events','none'); 										
		$('body').css('opacity','0.5'); 										
		$('.la-anim-10').show();
 

  

      $('body').css('pointer-events','none');                                         
      $('body').css('opacity','0.5');                                       
      $('.la-anim-10').show();
      $http.get('ClientsController/comparisonMethodology/'+clientid).success(function($data){    

     
         
         /* if($scope.tu_items==0) {
              alert('you have been logout');
              location.href = global_base_url+'logout';
          }*/
          
          $scope.tu_items = $data.tu_items;
          $scope.efx_items = $data.efx_items;
          $scope.exp_items = $data.exp_items;

          $('body').css('pointer-events','auto');                     
          $('body').css('opacity','1');                     
          $('.la-anim-10').hide();

      });
   


    
});