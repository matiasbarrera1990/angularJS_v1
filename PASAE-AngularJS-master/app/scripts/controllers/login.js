'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description # RegisterController Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller(
		'LoginCtrl',
		function($scope, $modal, $modalInstance, SessionService, $rootScope,
				$cookies, $sessionStorage) {

			$scope.loading = false;

			$scope.register = function(user) {
				$modalInstance.close();

				$modalInstance.dismiss();

				var modalInstance = $modal.open({
					animation : false,
					templateUrl : 'views/register.html',
					controller : 'RegisterCtrl',
				});

			};

			$scope.close = function() {
				$modalInstance.dismiss('cancel');
			}

			$scope.login = function() {
				// SessionService.login();
				$scope.loading = true;
				SessionService.authenticate($scope.user).then(function(data) {
					$scope.loading = false;
					// aca okParam es lo que se devuelve en
					// deferred.resolve(DATA) desde el service
					// $cookies.authenticated = true;
					// $cookies.username = data.username;
					// $cookies.roles = data.roles;
					// $cookies.user = data.user;



					$sessionStorage.authenticated = true;
					$sessionStorage.username = data.username;
					$sessionStorage.roles = data.roles;
					$sessionStorage.user = data.user;
					$rootScope.$broadcast('loginEvent', true);
					$scope.error = false;
					$scope.errorMsg = {};
					$modalInstance.close();
				}, function(error) {
					// el error funciona igual
					$scope.loading = false;
					$sessionStorage.authenticated = false;
					$sessionStorage.username = {};
					$sessionStorage.roles = {};
					$sessionStorage.user = {};
					$rootScope.$broadcast('loginEvent', false);
					$scope.error = true;
					$scope.errorMsg = error;
					sweetAlert ("OOPS...",$scope.errorMsg.detail,"error");
				});
			};






		});
