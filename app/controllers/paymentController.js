//define paymentSettingController 
app.controller('paymentSettingController', function(Page,$scope,$locale,$http,$timeout,$rootScope){
  Page.setTitle("Payment Information");
  
  		$('body').css('pointer-events','none'); 										
		$('body').css('opacity','0.5'); 										
		$('.la-anim-10').show();
		

  $scope.formsumitted = true;

  //get data from the salesforce if information already added
  $http.get('ClientsController/billing ').success(function($data){ 
  
 		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
		 $rootScope.paymentStatusFlag = false;
    //    
      $scope.response=$data.response;
      if($scope.response==0) {
          alert('you have been logout');
          location.href = global_base_url+'logout';
      }
          
    $scope.payementdata=$data.resultContact; 
    $scope.achandcreditform = $data.allow_credit_card;
    $scope.deuebalance = $data.deuebalance;
    $scope.nextpaymentdate = $data.nextpaymentdate;
    $scope.formsumitted = ($data.allow_credit_card=='0') ? false : true;
  });
  
  //
  $scope.currentYear = new Date().getFullYear();
  $scope.currentMonth = new Date().getMonth() + 1;
  // $scope.months = $.map($(Array(12)), function (val, i) { return i + 1; });
  
  var all_months = [{'id' : '1', 'month_name' : 'January'}, {'id' : '2', 'month_name' : 'February'}, {'id' : '3', 'month_name' : 'March'}, {'id' : '4', 'month_name' :  'April'}, {'id' : '5', 'month_name' : 'May'}, {'id' : '6', 'month_name' : 'June',},{'id' : '7', 'month_name' : 'July'}, {'id' : '8', 'month_name' :  'August'}, {'id' : '9', 'month_name' : 'September'}, {'id' : '10', 'month_name' : 'October'}, {'id' : '11', 'month_name' : 'November'}, {'id' : '12', 'month_name' : 'December'}];
  
  //var all_months = $locale.DATETIME_FORMATS.MONTH;
  
  var first_to_current = all_months;
  var current_to_last = first_to_current.splice($scope.currentMonth);
  all_months =  first_to_current.concat(current_to_last);
  
  //console.log(all_months9);
  //console.log(all_months);
  
  $scope.months = all_months;

  $scope.ccinfo = {credit_card_type:undefined};

  // Function fired on change in year dropdown list
  // If current year is selected, display only months starting from the next month to the end of the year
  // If current year is not selected, display all months
  $scope.ccinfo_expYearChanged = function() {
    
    if($scope.ccinfo.credit_card_expire_year == $scope.currentYear)
    {
      
      $scope.months = current_to_last;
    }
    else
    {
      
      $scope.months = all_months;
    }
  }
  
  //$scope.accinfo = { }
  $scope.save = function(data){
	  
    if(data.credit_card_number && data.credit_card_type && data.credit_card_security_code && data.credit_card_expire_year && data.credit_card_expire_month)
    {
		
	$('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
		  
	$http.post('ClientsController/addcreditcardinfotosalesforce',data).success(function($data){            
        
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
		
        if( $data.salesforcemessage.returnCode ){                
          $scope.formssubmissionmessage = '<div class="alert alert-success fade in">\
          <button type="button" class="close close-sm" data-dismiss="alert">\
          <i class="fa fa-check"></i>\
          </button>\
          '+$data.salesforcemessage.message+'</div>';
          $scope.formsumitted = false;
          $scope.showGreeting = true;
          setTimeout(function(){
           $scope.showGreeting = false;
           window.location.reload(1);
         }, 3000);
        //$scope.ccinfo = {};
          
        }else{
          $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
          <button type="button" class="close close-sm" data-dismiss="alert">\
          <i class="fa fa-times"></i>\
          </button>\
          '+$data.salesforcemessage.message+'</div>';
          $scope.formsumitted = true;
          $scope.showGreeting = true;
          /*setTimeout(function(){
           $scope.showGreeting = false;
         }, 5000);*/
		 //$scope.ccinfo = {};
        }      
      });
    }
  }
  $scope.saveaccount = function(data){
    if(data.bank_account_number)
    {  
      $('body').css('pointer-events','none');                     
      $('body').css('opacity','0.5');                     
      $('.la-anim-10').show();
      $http.post('ClientsController/addcreditcardinfotosalesforce',data).success(function($data){            
        
    		$('body').css('pointer-events','auto'); 										
    		$('body').css('opacity','1'); 										
    		$('.la-anim-10').hide();
		
        if( $data.salesforcemessage.returnCode ){                
          $scope.formssubmissionmessage = '<div class="alert alert-success fade in">\
          <button type="button" class="close close-sm" data-dismiss="alert">\
          <i class="fa fa-check"></i>\
          </button>\
          '+$data.salesforcemessage.message+'</div>';
          $scope.formsumitted = false;
          $scope.showGreeting = true;
          setTimeout(function(){
           $scope.showGreeting = false;
           window.location.reload(1);
         }, 3000);
        //$scope.ccinfo = {};
          
        }else{
		  $scope.url = global_base_url;
          $scope.formssubmissionmessage = '<div class="alert alert-danger fade in" style="width:60%;">\
          <button type="button" class="close close-sm" data-dismiss="alert">\
          <i class="fa fa-times"></i>\
          </button>\
          '+$data.salesforcemessage.message+'</div>';
          $scope.formsumitted = true;
          $scope.showGreeting = true;
          /*setTimeout(function(){
           $scope.showGreeting = false;
		   location.href = global_base_url + 'clients#/billing';
         }, 4000);*/
		 /*setTimeout(function(){
			 location.reload(); }, 2500);*/
        }    
      });
    }
  }
});
  app.directive( 'creditCardType', function(){
      var directive ={ require: 'ngModel', 
      link: function(scope, elm, attrs, ctrl){
        ctrl.$parsers.unshift(function(value){
          /*
              * Old regex - Commented out by Navkar Jain
              *
              scope.ccinfo.credit_card_type =
              (/^5[1-5]/.test(value)) ? "mastercard"
              : (/^4/.test(value)) ? "visa"
              : (/^3[47]/.test(value)) ? 'amex'
              : (/^6011|65|64[4-9]|622(1(2[6-9]|[3-9]\d)|[2-8]\d{2}|9([01]\d|2[0-5]))/.test(value)) ? 'discover'
              : undefined
          */
          
          // New RegEx according to credit card type rules defined at https://www.cybersource.com/developers/getting_started/test_and_manage/best_practices/card_type_id/
          // Edit: only Visa and Master cards are accepted. Therefore code for American Express and Discover cards is commented out
          scope.ccinfo.credit_card_type =
          (/(^5[1-5])|(^2(221|720))/.test(value)) ? "mastercard"
          : (/^4/.test(value)) ? "visa"
          : (/^3[47]/.test(value)) ? 'amex'
          // : (/^(6011(0|2|3|4|7(4|[7-9])|8[6-9]|9))|644|65/.test(value)) ? 'discover'
          : undefined

          ctrl.$setValidity('invalid',!!scope.ccinfo.credit_card_type);
          
          return value;
        })
      }
    }
    return directive
  } );

  app.directive( 'cardExpiration', function(){
      var directive ={ 
        require: 'ngModel', 
        link: function(scope, elm, attrs, ctrl){
          scope.$watch('[ccinfo.credit_card_expire_month,ccinfo.credit_card_expire_year]',function(value){
          ctrl.$setValidity('invalid',true)
          if ( scope.ccinfo.credit_card_expire_year == scope.currentYear
           && scope.ccinfo.credit_card_expire_month <= scope.currentMonth
           ) {
            ctrl.$setValidity('invalid',false)
          }
          return value
        },true)
      }
    }
    return directive
  } );

  app.filter( 'range', function() {
    var filter =  function(arr, lower, upper) {
      for (var i = lower; i <= upper; i++) arr.push(i)
        return arr
    }
    return filter
  });


  
