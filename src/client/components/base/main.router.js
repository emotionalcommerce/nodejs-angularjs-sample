export default function (ngModule, options) {
    ngModule.config(configureStates);

    ngModule.run(function ($rootScope, localStorageService, AuthService, LoopBackAuth, $location, ClientUser) {
        $rootScope.isAdmin = false;
        $rootScope.pageTitle = 'Virtual Store';
        $rootScope.bodyClass = '';
        var login_url = '/',
            next_url = '/';

        $rootScope.$on('$stateChangeStart', function (event, next) {

            if(window.location.href.indexOf('www.') > -1){
                window.location.href=window.location.href.replace('www.','');
            }



            if(!localStorageService.get('fileStorage')) {
                ClientUser.getApiSettings().$promise.then(function(response) {
                    localStorageService.set('fileStorage', response.response.fileStorage.bucket);
                    localStorageService.set('thumbStorage', response.response.thumbStorage.bucket);
                    localStorageService.set('videoStorage', response.response.videoStorage.bucket);
                    localStorageService.set('watermarkStorage', response.response.watermarkStorage.bucket);
                }).catch(function(error) {
                    console.log(error);
                });
            }

            $rootScope.pageTitle = 'Virtual Store ' + next.data.pageTitle;
            $rootScope.bodyClass =  next.data.bodyClass;
            $rootScope.page = next.data.page;

            $rootScope.loginState = next.data.state;
            $rootScope.baseUrl = $location.$$protocol + '://' + $location.$$host;
            if ($location.$$port) $rootScope.baseUrl += ':' + $location.$$port;

            $rootScope.needAuth = next.data.auth;

            $rootScope.logout = false;

            $rootScope.isLogged = AuthService.isAuthenticated() || $rootScope.logged;
            if (typeof $rootScope.isLogged == 'undefined') $rootScope.isLogged = false;

            if (!AuthService.isAuthenticated() && next.name == login_url) {
                localStorageService.clearAll();
                $rootScope.logout = false;
                return;
            }

            if (AuthService.isAuthenticated() && (next.data.bodyClass == 'login' )) {
                //dont go to login when you are logged in
                $location.path(next_url);
                return;
            }

            if (!$rootScope.disableAuth) {
                var authorizedRoles = next.data && next.data.authorizedRoles;
                if (!authorizedRoles) return; //if route is not safe just let them pass
                if (AuthService.isAuthorized(authorizedRoles)) return;
                else $location.path('/');
            }

        });

        $rootScope.$on('$stateChangeSuccess', function (event, next) {	$rootScope.$state = next;   });

    });

    /**
     * Configure states for base routes
     *
     * @param $stateProvider
     */
    function configureStates($stateProvider, $urlRouterProvider, $locationProvider) {
        //set angular to html5 mode
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        });

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('index', {
                abstract: true,
                templateUrl: options.baseUrl + "/common/content.html",
                data: {pageTitle: 'Main'}
            })
            .state('index.homepage', {
                url: "/",
                templateUrl: options.baseUrl + "/homepage/main.html",
                data: {
                    pageTitle: 'Homepage'
                }
            })

    }

    // Inject dependencies
    configureStates.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

}

