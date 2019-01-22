'use strict';
import _ from 'lodash';

export default function (ngModule, options) {

	ngModule
		.factory('AuthService', function ($rootScope, toastr, Auth, LoopBackAuth, localStorageService, $state, $location) {
			LoopBackAuth.rememberMe = true;

			var authService = {
				userId: localStorageService.get('userId'),
				roles: localStorageService.get('roles') || [],
			};

			//wrap LoopbackAuth.save

			function save() {
				//persist as much as possible in localstorage to also persist our objects
				localStorageService.set('userId', authService.userId);
				localStorageService.set('roles', authService.roles);
				LoopBackAuth.save();
			};

			authService.get = function (name) {
				return localStorageService.get(name) || '';
			};

			authService.login = function (credentials) {
				return Auth._login(credentials).$promise
					.then(function (response) {
						if (response.error_code && response.error_code.code!="0") {
							return 'error';
						}

						var data = response.response;
						var userInfo = data.user;

						LoopBackAuth.accessTokenId = data.id;
						LoopBackAuth.roles = authService.roles = ['$authenticated','$everyone',userInfo.role];
						LoopBackAuth.currentUserId = authService.userId = userInfo.id;
						save();

                        $rootScope.$broadcast("loader_show");


					});
			};

			authService.fakeLogin=function(response, token){
				console.log(response);
				var data = response.response;
                var userInfo = data.user;
				LoopBackAuth.accessTokenId = token;
                LoopBackAuth.roles = authService.roles = ['$authenticated','$everyone',userInfo.role];
                LoopBackAuth.currentUserId = authService.userId = userInfo.id;

				save();

			};

			authService.signup = function (credentials) {
				return Auth._signup(credentials).$promise
					.then(function (response) {
						if (response.error_code.code > 0) {
                            toastr['error'](response.error_code.message);
							return false;
						} else {
                            var data = response.response;
                            return true;
						}
					});
			};

			authService.isAuthorized = function (authorizedRoles) {
				if (!authorizedRoles) return authService.isAuthenticated();

				if (!angular.isArray(authorizedRoles)) {
					authorizedRoles = [authorizedRoles];
				}
	
				return (authService.isAuthenticated() && _.intersection(authorizedRoles, authService.roles).length > 0);
			};

			authService.isAuthenticated = function () {
				return !!authService.userId && !!LoopBackAuth.currentUserId;
			};

			authService.logout = function () {
				authService.userId = null;
				return Auth._logout().$promise
					.finally(function (data) {
						LoopBackAuth.accessTokenId = false;
						LoopBackAuth.roles = authService.roles = [];
						LoopBackAuth.currentUserId = authService.userId = null;

						save();
						if($state.current.name == 'index.homepage') $state.reload();
						else $state.go('index.homepage');
					});
			};

			return authService;
		})
		/* intercept 401 and direct back to login */
		.factory('httpInterceptor', function ($q, $location, $rootScope, LoopBackAuth) {
			return {
				request: function (config) {
					$rootScope.$broadcast("loader_show");
					config.headers['x-access-token'] = LoopBackAuth.accessTokenId;
					return config || $q.when(config);
				},
				response: function (response) {
					$rootScope.$broadcast("loader_hide");
					return response || $q.when(response);

				},
				responseError: function (response) {
					$rootScope.$broadcast("loader_hide");
					if (response.status === 401) {
						LoopBackAuth.accessTokenId = false;
						LoopBackAuth.currentUserId = null;
						LoopBackAuth.roles =  [];
						LoopBackAuth.currentUserName =  '';
						LoopBackAuth.imageUrl =  '';
						LoopBackAuth.save();
						if ($location.path() !== '/index') {
							$location.nextAfterLogin = $location.path();
							$location.path('/index');
						}
					}
					return $q.reject(response);
				}
			};
		})
		.config(function ($httpProvider, $provide) {
			$httpProvider.interceptors.push('httpInterceptor');
		});

}
