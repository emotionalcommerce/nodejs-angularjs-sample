import angular from 'angular';

export default function (ngModule, config) {

    function createComponent() {

        //the controller part
        function controllerLogic($rootScope, $scope, AuthService, Video, $stateParams, localStorageService, toastr, $http) {
            var self = this;
            $scope.gift = {};
            $scope.gift.status = false;
            $rootScope.video = {};
            $scope.videoLoaded = false;
            $scope.showQr = false;

            $scope.videoSelected = function() {
               if($rootScope.video.file) {
                    $scope.videoLoaded = true;
               }
            };

            $scope.cancelVideo = function() {
                $rootScope.video.file = null;
                $scope.videoLoaded = false;
            };

            $scope.showImageQr = function(image) {
                if(image) return 'https://s3.amazonaws.com/emotional-commerce-video-transcoded-prod/' + image;
            };

            $scope.uploadVideo = function() {
                $scope.showQr = false;
                var formData = new FormData();
                formData.append('file', $rootScope.video.file);
                $scope.uploadData = {};
                $http.get("getToken")
                    .then(function(response) {
                        var accessToken = response.data;
                        $scope.uploadData.access_token = accessToken;
                        Video.uploadVideo($scope.uploadData, formData).$promise.then(function(res) {
                            if(res.response) {
                                toastr['success']('Video will be available after it is processed.');
                                $scope.uploadedVideo = res.response;
                                $scope.qrCode = res.response.codeURL;
                                $scope.showQr = true;
                            } else {
                                toastr['error'](res.error_code.message);
                            }
                        }).catch(function(err){
                            toastr['error']('Something went wrong.');
                        });
                    });

            };

        }

        return {
            bindings: {
                successState: '@successState',
                failState: '@failState',
                config: '=config'
            },
            controller: controllerLogic,
            templateUrl: config.baseUrl + '/component.html'
        }
    }

    ngModule.component('homepage', createComponent());
}
