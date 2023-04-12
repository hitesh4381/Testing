//define facebookpostController, for facebook posts, added on 23-05-2018
app.controller('facebookpostController', function(Page,$scope,$timeout,$http,$location) {

    $scope.tinymceOptions = {
          menubar: true,selector: '#message',
          menubar: true,
          plugins: 'link image hr anchor code textcolor paste',
          toolbar: "newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | cut copy paste | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image code | styleselect formatselect fontselect fontsizeselect",
          // enable title field in the Image dialog
          image_title: true, 
          // enable automatic uploads of images represented by blob or data URIs
          automatic_uploads: true,
          // add custom filepicker only to Image dialog
          file_picker_types: 'image',
          file_picker_callback: function(cb, value, meta) {
            var input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');

            input.onchange = function() {
              var file = this.files[0];
              var reader = new FileReader();
              
              reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime();
                var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                // call the callback and populate the Title field with the file name
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            
            input.click();
          }
    };
   

    Page.setTitle("Facebook Post");
    $scope.formsumitted = true;
    
      

    //to check status of fb connect of client
    $http.get('ClientsController/check_fb_connect_status').success(function(data) {
        if(data.result !== 'connected')
        {
            // Redirect the page to 'Restricted Access' page
            //$location.path('/access-restricted');
            $scope.formsumitted = false;
            $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                                                    <strong>Sorry! You are not authorized to post on facebook wall. Please go to the settings and enable faccebook wall post.</strong>\
                                                </div>';
            $scope.showGreeting = true;
        }
     });

    $scope.submitData = function (form)
    {
        var message = tinymce.get('message').getContent();
        
        var arrData = {message: message};
            
        $http.post('ClientsController/post_facebook',arrData).success(function($data){ 
            if( $data.returnCode == 1 ){
                
                $scope.formssubmissionmessage = '<div class="alert alert-success fade in">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        \
                                                    </button>\
                                                    <strong>'+$data.result+'</strong>\
                                                </div>';
            }else{
                $scope.formssubmissionmessage = '<div class="alert alert-danger fade in">\
                                                    <button type="button" class="close close-sm" data-dismiss="alert">\
                                                        \
                                                    </button>\
                                                    <strong>'+$data.result+'</strong>\
                                                </div>';
            }

            $scope.showGreeting = true;
            tinymce.get('message').setContent('');
            $timeout(function(){
               $scope.showGreeting = false;
            }, 3000);
            
        });
    };

});

