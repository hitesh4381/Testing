//define financialfitnessinfoController 
app.controller('financialfitnessinfoController', function(Page,$scope,$sce,$http){
   Page.setTitle("Financial Fitness Message of the Week");
  
    $('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5');
	$('.la-anim-10').show();
  
  
       
    
    //$scope.linkofffi = [];      
    $http.get('ClientsController/financialfitnessinfo/'+clientid).success(function($data){ 
	        $('body').css('pointer-events','auto'); 										
		    $('body').css('opacity','1'); 										
		    $('.la-anim-10').hide();
            $scope.response=$data.response;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }            
        //
        $scope.linkofffi = $sce.trustAsResourceUrl('https://thecreditpros.financialfitnessinfo.com/index.aspx?loginguid='+$data.LoginGUID);
      });

});


//define fitnesscontentController 
  app.controller('fitnesscontentController', function(Page,$scope,$sce,$http){

    Page.setTitle("Financial Fitness Content");
    
          $('body').css('pointer-events','none');                     
      $('body').css('opacity','0.5');                     
      $('.la-anim-10').show();
    
      
      //$scope.linkofffi = [];    
      $scope.monthval = '';  
      $http.get('ClientsController/financialfitnessinfo/'+clientid).success(function($data){ 
        $('body').css('pointer-events','auto');                    
      $('body').css('opacity','1');                     
      $('.la-anim-10').hide();
              $scope.LoginGUID=$data.LoginGUID;
              if($scope.response==0) {
                  alert('you have been logout');
                  location.href = global_base_url+'logout';
              }            
          //
          $scope.monthval = $data.month_limit;
          if($data.month_limit=='no'){
              $scope.linkofffc = 'no';
          }else{            
              $scope.linkofffc = $sce.trustAsResourceUrl('https://thecreditpros.financialfitnessinfo.com/monthlycontent.aspx?loginguid='+$data.LoginGUID+'&m='+$data.month_limit);
          }
          
      });

      $scope.reloadthecontent = function(monthvalue){
          $scope.monthval = monthvalue; 
           
          $scope.linkofffc = $sce.trustAsResourceUrl('https://thecreditpros.financialfitnessinfo.com/monthlycontent.aspx?loginguid='+$scope.LoginGUID+'&m='+monthvalue);
      }

});

//define fitnessmilestoneController 
app.controller('fitnessmilestoneController', function(Page,$scope,$sce,$http){

  Page.setTitle("Financial Fitness Milestone");
  
        $('body').css('pointer-events','none');                     
    $('body').css('opacity','0.5');                     
    $('.la-anim-10').show();
  
    
             
    
    //$scope.linkofffi = [];    
    $scope.monthval = '';  
    $http.get('ClientsController/financialfitnessinfo/'+clientid).success(function($data){ 
  
      $('body').css('pointer-events','auto');                    
    $('body').css('opacity','1');                     
    $('.la-anim-10').hide();
    
            $scope.LoginGUID=$data.LoginGUID;
            if($scope.response==0) {
                alert('you have been logout');
                location.href = global_base_url+'logout';
            }            
        //
        $scope.linkofffm = $sce.trustAsResourceUrl('https://thecreditpros.financialfitnessinfo.com/milestones.aspx?loginguid='+$data.LoginGUI);
    });
   
});