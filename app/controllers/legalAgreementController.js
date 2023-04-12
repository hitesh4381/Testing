//legal Agreement Record Show.............//
app.controller('legalAgreementController',function(Page,$scope,$http,$routeParams,$sce,$filter,$window){
Page.setTitle("Legal Agreements") ;
$('body').css('pointer-events','none'); 										
$('body').css('opacity','0.5'); 
$('.la-anim-10').show();										


$scope.sortType = 'newDate';
$scope.sortReverse = true;

//for portalpermission

var client_id = $routeParams.id;
$scope.legalAgreementdata = [];


$http.get('ClientsController/legal_agreements/'+client_id).success(function($data){ 
$sce.trustAsHtml;
setTimeout(function(){ if ($("table th").hasClass("sorting")) {
$("body").on('click', 'table th',function (e) {
$('body').css('pointer-events','none'); 										
$('body').css('opacity','0.5'); 										
$('.la-anim-10').show();
});
}}, 3000);	
$('body').css('pointer-events','auto'); 										
$('body').css('opacity','1'); 										
$('.la-anim-10').hide();
$scope.response=$data.response;
if($scope.response==0) {
alert('you have been logout');
location.href = global_base_url+'logout';
}
var clientName = '';
$scope.clientDetails = $data.clientDetails;
console.log($scope.clientDetails);
var clientAddress = '';
if($scope.clientDetails)
{
clientName = $scope.clientDetails.first_name+' '+$scope.clientDetails.last_name;
if($scope.clientDetails.address_one == '') 
{
clientAddress = clientAddress + 'NA';
}
else
{ 
clientAddress = clientAddress + $scope.clientDetails.address_one;
}

// if($scope.clientDetails.address_two == '') 
// {
//     clientAddress = clientAddress + 'NA';
// }
// else {
//     clientAddress = clientAddress + $scope.clientDetails.address_two;
// }

if($scope.clientDetails.city == '') {
clientAddress = clientAddress + 'NA';
}
else {
clientAddress = clientAddress + ' '+$scope.clientDetails.city;
}

if($scope.clientDetails.state == '') {
clientAddress = clientAddress + ',NA';
}
else {
clientAddress = clientAddress + ','+$scope.clientDetails.state;
}

if($scope.clientDetails.zipcode == '') {
clientAddress = clientAddress + ',NA';
}
else {
clientAddress = clientAddress + ','+ $scope.clientDetails.zipcode;            
}
}
console.log(clientAddress);
// Remove signature box
for(var i = 0; i < $data.client_executed_agreement.length; i++)
{
var signed_date = new Date($data.client_executed_agreement[i].date_created);
var curr_date = signed_date.getDate();
var curr_month = signed_date.getMonth() + 1; //Months are zero based
var curr_year = signed_date.getFullYear();
var new_signed_date = curr_month + "/" + curr_date + "/" + curr_year;


if( ($data.client_executed_agreement[i].other_agreement)=='yes'){
var below_text = '<br><br>Client Agreement Signed<br>'+(new_signed_date)+'<br>'+clientName+'<br>'+$data.client_executed_agreement[i].ip_address;
}else{
var below_text = '<br><br>Client Agreement Signed<br>'+(new_signed_date)+'<br>'+clientName+'<br>'+clientAddress+'<br>'+$data.client_executed_agreement[i].ip_address;
}

$data.client_executed_agreement[i].form_data = $data.client_executed_agreement[i].form_data.replace(/<canvas.*<\/canvas>/, '')+below_text;

//Modified on 03_aprl_2018
// if( ($data.client_executed_agreement[i].other_agreement)=='yes'){
//    $data.client_executed_agreement[i].name = 'Other agreement';
// }else{
//    $data.client_executed_agreement[i].name = 'Client agreement signed';
// }
//Modified on 03_aprl_2018
$data.client_executed_agreement[i].newDate =new Date($filter('date')($data.client_executed_agreement[i].date_created,'yyyy-MM-ddTHH:mm:ss.sssZ')).getTime();;
}

$scope.legalAgreementdata = $data;

// Initialize nicescroll on all agreement divs

$scope.active = true;
$scope.active1 = true;

$scope.highlightTab = function($event) {
   // alert($event.target);
$('#mytabs tr').removeClass('tr');
var tr = $($event.target).parents('tr');
$(tr).toggleClass('tr');
var a = $($event.target).parent();

id = a.prop('href');

// Extract the id from the href
id = id.match('#.*');
//alert($(id).niceScroll());
};

});

$scope.Export = function (id,type,clientid) {
    $('body').css('pointer-events','none');                                         
    $('body').css('opacity','0.5'); 
    $('.la-anim-10').show();
    $http.get('ClientsController/get_legal_agreements/'+id+'/'+type+'/'+clientid).success(function($data){
        $scope.fileURL = $data.data;
        if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = $scope.fileURL;
        save.target = '_blank';
        var filename = $scope.fileURL.substring($scope.fileURL.lastIndexOf('/')+1);
        save.download = $scope.fileURL || $scope.fileName;
           if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
                document.location = save.href; 
            }else{
                var evt = new MouseEvent('click', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': false
                });
                save.dispatchEvent(evt);
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            }   
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, $scope.fileName || $scope.fileURL)
        _window.close();
    }
    $('body').css('pointer-events','unset');                                         
    $('body').css('opacity','1'); 
    $('.la-anim-10').hide();
    });
}

});