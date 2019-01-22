(function (window, angular, undefined) {
	'use strict';

	var urlBase = "/api/v1";
	var authHeader = 'authorization';

	/**
	 * @ngdoc overview
	 * @name lbServices
	 * @module
	 * @description
	 *
	 * The `lbServices` module provides services for interacting with
	 * the models exposed by the LoopBack server via the REST API.
	 *
	 */
	var module = angular.module("lbServices", ['ngResource']);

	/**
	 * @ngdoc object
	 * @name lbServices.Auth
	 * @header lbServices.Auth
	 * @object
	 *
	 * @description
	 *
	 * A $resource object for interacting with the `Auth` model.
	 *
	 * ## Example
	 *
	 * See
	 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
	 * for an example of using this object.
	 *
	 */
	module.factory(
		"Auth",
		['LoopBackResource', 'LoopBackAuth', '$injector', function (Resource, LoopBackAuth, $injector) {
			var R = Resource(
				urlBase + "/clientusers/:id",
				{'id': '@id'},
				{
					"_login": {
						url: urlBase + "/clientusers/clientLogin",
						method: "POST"
					},
					"_logout": {
						url: urlBase + "/clientusers/logout",
						method: "POST"
					},
                    "_signup": {
                        url: urlBase + "/clientusers/register",
                        method: "POST"
                    }
				}
			);
			R.modelName = "Auth";
			return R;
		}]);

    module.factory(
        "ClientUser",
        ['LoopBackResource', 'LoopBackAuth', '$injector', function (Resource, LoopBackAuth, $injector) {
            var R = Resource(
                urlBase + "/users/:id",
                {'id': '@id'},
                {
                    "getApiSettings": {
                        url: urlBase + "/clientusers/apiSettings",
                        method: "GET"
                    }
                }
            );

            R["destroyById"] = R["deleteById"];
            R["removeById"] = R["deleteById"];
            R.getCachedCurrent = function () {
                var data = LoopBackAuth.currentUserData;
                return data ? new R(data) : null;
            };
            R.getCurrentId = function () {
                return LoopBackAuth.currentUserId;
            };

            R.modelName = "ClientUser";

            return R;
        }]);

    module.factory(
        "Video",
        ['LoopBackResource', 'LoopBackAuth', '$injector', function (Resource, LoopBackAuth, $injector) {
            var R = Resource(
                urlBase + "/video/:id",
                {'id': '@id'},
                {
                    "getVideoDetails": {
                        url: urlBase + "/videoFiles/getVideoDetails",
                        method: "GET"
                    },
					"reportVideo": {
                        url: urlBase + "/videoFlags/reportContent",
                        method: "POST"
					},
					"flagVideo": {
                        url: urlBase + "/videoFlags/flagContent",
                        method: "POST"
					},
                    'uploadVideo': {
                        url: urlBase + "/videoFiles/uploadVideo?access_token=:access_token",
                        method: "POST",
                        params: {access_token:'@access_token'},
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    }
                }
            );
            R["destroyById"] = R["deleteById"];
            R["removeById"] = R["deleteById"];

            R.modelName = "Video";
            return R;
        }]);


	module
		.factory('LoopBackAuth', function () {
			var props = ['accessTokenId', 'currentUserId', 'roles'];
			var propsPrefix = '$LoopBack$';

			function LoopBackAuth() {
				var self = this;
				props.forEach(function (name) {
					self[name] = load(name);
				});
				this.rememberMe = undefined;
				this.currentUserData = null;
			}

			LoopBackAuth.prototype.save = function () {
				var self = this;
				var storage = this.rememberMe ? localStorage : sessionStorage;
				props.forEach(function (name) {
					save(storage, name, self[name]);
				});
			};

			LoopBackAuth.prototype.setUser = function (accessTokenId, userId, userData, roles) {
				this.accessTokenId = accessTokenId;
				this.currentUserId = userId;
				this.currentUserData = userData;
				this.roles = roles;
			}

			LoopBackAuth.prototype.clearUser = function () {
				this.accessTokenId = null;
				this.currentUserId = null;
				this.currentUserData = null;
			}

			LoopBackAuth.prototype.clearStorage = function () {
				props.forEach(function (name) {
					save(sessionStorage, name, null);
					save(localStorage, name, null);
				});
			};

			return new LoopBackAuth();

			// Note: LocalStorage converts the value to string
			// We are using empty string as a marker for null/undefined values.
			function save(storage, name, value) {
				var key = propsPrefix + name;
				if (value == null) value = '';
				storage[key] = value;
			}

			function load(name) {
				var key = propsPrefix + name;
				return localStorage[key] || sessionStorage[key] || null;
			}
		})
		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];
		}])
		.factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth', '$rootScope',
			function ($q, LoopBackAuth, $rootScope) {
				return {
					'request': function (config) {

						if (config.url.substr(0, urlBase.length) !== urlBase) {
							return config;
						}
						//  $rootScope.$broadcast("loader_show");
						config.headers['x-access-token'] = LoopBackAuth.accessTokenId;
						config.headers[authHeader] = LoopBackAuth.accessTokenId;
						return config || $q.when(config);
					},
					'response': function (response) {
						$rootScope.$broadcast("loader_hide");
						return response || $q.when(response);
					},
					'responseError': function (response) {
						$rootScope.$broadcast("loader_hide");
						return $q.reject(response);
					}
				}
			}])

		/**
		 * @ngdoc object
		 * @name lbServices.LoopBackResourceProvider
		 * @header lbServices.LoopBackResourceProvider
		 * @description
		 * Use `LoopBackResourceProvider` to change the global configuration
		 * settings used by all models. Note that the provider is available
		 * to Configuration Blocks only, see
		 * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
		 * for more details.
		 *
		 * ## Example
		 *
		 * ```js
		 * angular.module('app')
		 *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
		 * ```
		 */
		.provider('LoopBackResource', function LoopBackResourceProvider() {
			/**
			 * @ngdoc method
			 * @name lbServices.LoopBackResourceProvider#setAuthHeader
			 * @methodOf lbServices.LoopBackResourceProvider
			 * @param {string} header The header name to use, e.g. `X-Access-Token`
			 * @description
			 * Configure the REST transport to use a different header for sending
			 * the authentication token. It is sent in the `Authorization` header
			 * by default.
			 */
			this.setAuthHeader = function (header) {
				authHeader = header;
			};

			/**
			 * @ngdoc method
			 * @name lbServices.LoopBackResourceProvider#setUrlBase
			 * @methodOf lbServices.LoopBackResourceProvider
			 * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
			 * @description
			 * Change the URL of the REST API server. By default, the URL provided
			 * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
			 */
			this.setUrlBase = function (url) {
				urlBase = url;
			};

			this.$get = ['$resource', function ($resource) {
				return function (url, params, actions) {
					var resource = $resource(url, params, actions);

					// Angular always calls POST on $save()
					// This hack is based on
					// http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
					resource.prototype.$save = function (success, error) {
						// Fortunately, LoopBack provides a convenient `upsert` method
						// that exactly fits our needs.
						var result = resource.upsert.call(this, {}, this, success, error);
						return result.$promise || result;
					};
					return resource;
				};
			}];
		});

})(window, window.angular);
