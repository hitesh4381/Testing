//define itemmanagerController 
app.controller('itemmanagerController', function($rootScope, Page,$scope,$sce,$http, DTOptionsBuilder, DTColumnDefBuilder){
    Page.setTitle("Dispute Items");
    
	$('body').css('pointer-events','none'); 										
	$('body').css('opacity','0.5'); 										
	$('.la-anim-10').show();
  $scope.viewId = '';

    /*code for stop all disputes, added on 13-03-2018*/
    $scope.stop_all_disputes = function ($event, client_id, item_id) {

        if ($event !== undefined) {

            var checkbox = $event.target;
            var response = 'Changes has not been done. Please try again.';
            //if checkbox is checked
            if (checkbox.checked) {

                var status = '0';

                var ok = window.confirm('Are you sure you want to stop all credit bureaus and creditors dispute on this item?');

                if (ok) {
                    var arrData = {};
                    var arrData = {client_id: client_id, item_id: item_id, status: status};

                    $http.post('ClientsController/mark_as_dontdispute_item', arrData).success(function ($data) {
                    if ($data.message.indexOf('success') !== -1) { 
                            response = 'Item has been marked as Do Not Dispute.';
                            //$scope.class = "dont_dispute";
                            $scope.dontdispute_class[item_id] = 'dont_dispute';
                            $scope.attestestionreason[item_id].attestation_id = 0;
                            
                            alert(response);
                        }
                        else
                        {
                            alert(response);
                        }
                      }
                    );
                }
                else
                {
                    $scope.dontdispute[item_id] = false;
                }
            }
            else
            {
                var status = '1';

                var ok_ = window.confirm('Are you sure you want to dispute this item?');

                if (ok_) {
                    var arrData = {};
                    var arrData = {client_id: client_id, item_id: item_id, status: status};

                    $http.post('ClientsController/mark_as_dontdispute_item', arrData).success(function ($data) {
                    if ($data.message.indexOf('success') !== -1) { 
                            response = 'Item has been Disputed.';
                            var str = $data.message.split("||");
                            
                            //$scope.class = "";
                            $scope.dontdispute_class[item_id] = '';
                            $scope.attestestionreason[item_id].attestation_id = 1;
                            $scope.attestestionreason[item_id].attestation_section_value = str[1];

                            alert(response);
                        }
                        else
                        {
                            alert(response);
                        }
                      }
                    );
                }
                else
                {
                    $scope.dontdispute[item_id] = true;
                }
            }

        }
    }

    $scope.sortKey = 'id';
    $scope.reverse = 'true';
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    
    /* Code for filter in disputed item list based on item type*/ 

    $scope.bureauType = 'TU';$scope.all_beauro = ''; $scope.all_items = [];

    $scope.changeBureauType = function($type)
    {
      $('body').css('pointer-events','none');                                         
      $('body').css('opacity','0.5');                                       
      $('.la-anim-10').show();
      $http.get('ClientsController/get_manage_item_module/'+clientid+'/'+$type).success(function($data){    

      
          $scope.response=$data.response;
          if($scope.response==0) {
              alert('you have been logout');
              location.href = global_base_url+'logout';
          }
          
          $scope.items = $data.items;
          $scope.item_types = $data.item_types;
          $scope.all_beauro = '';
          //$scope.notes = $data.notes;
          $scope.attestestionreason = $data.attestestionreason;
          $scope.dontdispute = $data.dontdispute;
          $scope.dontdispute_class = $data.dontdispute_class;
          $('body').css('pointer-events','auto');                     
          $('body').css('opacity','1');                     
          $('.la-anim-10').hide();

      });
    }

    $scope.all_beauro = '';$scope.all_items = [];
    $scope.changeBureauMethodology = function()
    {
      $('body').css('pointer-events','none');                                         
      $('body').css('opacity','0.5');                                       
      $('.la-anim-10').show();

      $scope.vm_ = {};
      $scope.vm_.dtInstance_ = {};
      $scope.vm_.columns_ = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
      $scope.vm_.dtOptions_ = DTOptionsBuilder.newOptions()
      .withOption('paging', true)
      .withOption('searching', true)
      .withOption('order', [2, 'desc'])
      .withOption('processing', true)
      .withOption('lengthMenu', [[5, 10, 20, -1], [5, 10, 20, "All"]])
      .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
      .withLanguage({ 'sLengthMenu': '_MENU_ Records Per Page', 'sSearch': '', 'searchPlaceholder': 'Search...' });    
      
      
      $http.get('ClientsController/get_manage_all_items_module/'+clientid).success(function($data){    

      
          $scope.response=$data.response;
          if($scope.response==0) {
              alert('you have been logout');
              location.href = global_base_url+'logout';
          }
          
          $scope.all_items = $data.all_items;
          $scope.items = [];
         // $scope.item_types = $data.item_types;

          //$scope.notes = $data.notes;
          $scope.attestestionreason = $data.attestestionreason;
          $scope.dontdispute = $data.dontdispute;
          $scope.dontdispute_class = $data.dontdispute_class;
          $scope.all_beauro = $data.all_beauro;
          $('body').css('pointer-events','auto');                     
          $('body').css('opacity','1');                     
          $('.la-anim-10').hide();

      });
    }

    /*$scope.filterBureauType = function(items)
    {
      var ret = [];   
      if(items.bureauType){
        var bureaV=items.bureauType;
      if(bureaV.indexOf($scope.bureauType) === -1)
      {
          return true; // this will be listed in the results
      }
    }

      return false; // otherwise it won't be within the results
    }

*/
    $scope.itemType = 'All';
    $scope.typeValue = '';
    $scope.allsubitem = 1;
    $scope.changeType = function($type,$typeValue)
    {
      $scope.itemType = $type;
      $scope.typeValue = $typeValue;
      $scope.itemSubType = 'All';
      $scope.allsubitem = 1;
      $scope.viewId = '';
      /*console.log('HI test1');
      var activeId = $('#mainTab > li.active').attr('data-id');
      console.log(activeId);
      console.log("TU12");
        if(activeId=='equifax_tab') {           
            var bureauType1 = 'EFX';
        }else if(activeId=='experian_tab'){
            var bureauType1 = 'EXP';
        }else{
            var bureauType1 = 'TU';
        }
        console.log("TU1");
        $scope.bureauType = bureauType1;
        console.log(bureauType1);*/

      
      

    }

    $scope.filterSubTypeList = function(item_type)
    {
      if($scope.typeValue != 'All')
      {
        if(item_type.parent == $scope.typeValue)
        {
            return true; // this will be listed in the results
        }

        return false; // otherwise it won't be within the results
      }
      else
      {
        return true; // this will be listed in the results
      }  
    }

    $scope.filterItemType = function(items)
    {
      if($scope.itemType != 'All')
      {
        if(items.item_type_name == $scope.itemType)
        {
            return true; // this will be listed in the results
        }

        return false; // otherwise it won't be within the results
      }
      else
      {
        return true; // this will be listed in the results
      }  
    }

    $scope.itemSubType = 'All';

    $scope.changeSubType = function($type)
    {
      $scope.itemSubType = $type;
      $scope.viewId = '';
    }
    $scope.filterItemSubType = function(items)
    {
      if($scope.itemSubType != 'All')
      {
        if(items.child_type_id == $scope.itemSubType)
        {
            return true; // this will be listed in the results
        }

        return false; // otherwise it won't be within the results
      }
      else
      {
        return true; // this will be listed in the results
      }  
    }
    
    $scope.dtOptions = DTOptionsBuilder.newOptions()
    .withOption('order', [2, 'desc']) // Replace 2 with the index of your `date` column
    .withOption('lengthMenu', [ [5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"] ])
    .withOption('processing', true)
    .withLanguage({'sLengthMenu':'_MENU_ Records Per Page','sSearch':'','searchPlaceholder':'Search...'});

    $http.get('ClientsController/get_manage_item_module/'+clientid).success(function($data){ 
		$('body').css('pointer-events','auto'); 										
		$('body').css('opacity','1'); 										
		$('.la-anim-10').hide();
        //
        $scope.response=$data.response;
        if($scope.response==0) {
            alert('you have been logout');
            location.href = global_base_url+'logout';
        }
        
        $scope.items = $data.items;
        $scope.item_types = $data.item_types;
        //$scope.notes = $data.notes;
        $scope.attestestionreason = $data.attestestionreason;
        $scope.dontdispute = $data.dontdispute;
        $scope.dontdispute_class = $data.dontdispute_class;

    });
    
    
     $scope.IsHidden = true;
     $scope.reportaccordion = function($scope) {
           $scope.IsHidden = $scope.IsHidden === false ? true: false;
     }
     
     
    $scope.changeormaskaccountnumber = function(accountnumber){
        if(accountnumber.length > 7){
            //• Account numbers that are greater than seven digits long shall have the last four digits masked with an asterisk.
            changedaccountnumber = accountnumber.substr(0, accountnumber.length-4) + new Array(accountnumber.length-(accountnumber.length-5)).join('x') ;
        }else if(accountnumber.length > 3 && accountnumber.length <= 7){
            //• Account numbers that are more than three digits long and less than or equal to seven digits long shall have the last two digits masked with an asterisk.
            changedaccountnumber = accountnumber.substr(0, accountnumber.length-2) + new Array(accountnumber.length-(accountnumber.length-3)).join('x') ;
        }else{
            //• Account numbers that are less than or equal to three digits long shall not have any digits masked. 
            changedaccountnumber = accountnumber;
        }

        return changedaccountnumber; 
  }
  $scope.activityList = [];
  $scope.futureActivityList = [];
  $scope.openDetails = function(type, itemId, clientId = null)
  { 
      $scope.activityList = [];
      $scope.futureActivityList = [];
     if(type == 'open')
      {
        $scope.viewId = itemId;
        $scope.getFutureSequences(itemId, clientId);
        $scope.getItemActivity(itemId, clientId);
        //$scope.getDisputeActivity(itemId, clientId);
      }
      else
      {
        $scope.viewId = '';
      }

  }

  $scope.disputeInvesitigationResult = false;

  $scope.disputeInvesitigationResultt = function(){
    $scope.disputeInvesitigationResult = false;
  }

  $scope.investigationDetails = function()
  { 
      $scope.getDisputeActivity();
  }

  $scope.getDisputeActivity = function (clientId = null) {
    $('body').css('pointer-events', 'none');
    $('body').css('opacity', '0.5');
    $('.la-anim-10').show();
    $http.get("ClientsController/get_items_dispute_activities/front?client_id=" + $rootScope.clientidP+"")
      .success(function($data) {
        $('body').css('pointer-events', 'auto');
        $('body').css('opacity', '1');
        $('.la-anim-10').hide();
        $scope.disputeInvesitigationResult = true;
        $scope.disputeActivityList = $sce.trustAsHtml($data);
        if ($scope.disputeActivityList == 0) {
          $scope.disputeInvesitigationResult = false;
          alert('We do not have any dispute investigation results matches with your records');
          
          // alert('you have been logout');
          // location.href = global_base_url + 'logout';
        }
    });
  }

  $scope.getFutureSequences = function (itemId, clientId = null) {
    $scope.vm = {};
    $scope.vm.dtInstance = {};
    $scope.vm.columns = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
      .withOption('paging', true)
      .withOption('searching', true)
      .withOption('order', [2, 'asc'])
      .withOption('processing', true)
      .withOption('lengthMenu', [[5, 10, 20, -1], [5, 10, 20, "All"]])
      .withOption("zeroRecords","No future events scheduled")
      .withLanguage({ 'sLengthMenu': '_MENU_ Records Per Page', 'sSearch': '', 'searchPlaceholder': 'Search...' });

    $http.get("Ajax/get_items_future_activities/front?item_id=" + itemId + "&client_id=" + clientId + "&unique_account_id=" + unique_account_id + "")
      .then(function (response) {
        $('body').css('pointer-events', 'auto');
        $('body').css('opacity', '1');
        $('.la-anim-10').hide();
        var responseData = JSON.stringify(response);
        responseData = JSON.parse(responseData);
        $scope.futureActivityList = responseData;
        if ($scope.futureActivityList == 0) {
          alert('you have been logout');
          location.href = global_base_url + 'logout';
        }
    });
  }

  $scope.getItemActivity = function (itemId, clientId = null) {
    $scope.vm_ = {};
    $scope.vm_.dtInstance_ = {};
    $scope.vm_.columns_ = [DTColumnDefBuilder.newColumnDef(2).notSortable()];
    $scope.vm_.dtOptions_ = DTOptionsBuilder.newOptions()
      .withOption('paging', true)
      .withOption('searching', true)
      .withOption('order', [2, 'desc'])
      .withOption('processing', true)
      .withOption('lengthMenu', [[5, 10, 20, -1], [5, 10, 20, "All"]])
      .withOption('Dom',"<'row'<'col-lg-6'l><'col-lg-6'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>")
      .withLanguage({ 'sLengthMenu': '_MENU_ Records Per Page', 'sSearch': '', 'searchPlaceholder': 'Search...' });    
      
    $http.get("ClientsController/get_item_activities/" + itemId + "")
      .then(function (response) {
        $('body').css('pointer-events', 'auto');
        $('body').css('opacity', '1');
        $('.la-anim-10').hide();
        var responseData = JSON.stringify(response);
        responseData = JSON.parse(responseData);
        $scope.activityList = responseData;
        console.log($scope.activityList.data.aaData.length);
        if ($scope.activityList == 0) {
          alert('you have been logout');
          location.href = global_base_url + 'logout';
        }
    });
  }
     

    
});