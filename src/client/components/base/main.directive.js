import authService from 'services/backend/auth.service.js';

export default function (ngModule, options) {

    function createDirective() {

        //the controller part
        function controllerLogic($scope, $rootScope, toastr, $filter, $window, AuthService, $timeout, $location, localStorageService,$state, $stateParams ) {
            this.BASEPATH = $scope.BASEPATH = BASEPATH;
            this.APIPATH = $rootScope.APIPATH = APIPATH;
            $rootScope.state = $state;
            this.config = angular.merge({
                showLeftNav: true,
                showTopNav: true,
                showFooter: false,
            }, options.parts || {});
            this.authService = AuthService;
            this.nextUrl="../";
            $rootScope.wH = angular.element($window).height();
            $rootScope.showMenu = false;

            var self = this;

            $rootScope.fileUpload = function() {
                angular.element('#fileInput').trigger('click');
            };


        }

        return {
            controller: controllerLogic,
            controllerAs: '$main'
        }
    }

    ngModule.directive('main', createDirective);
    createDirective.inject = ['$rootScope', 'AuthService'];

}

