'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description # RegisterController Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('RegisterCtrl',
		function($scope, $modal, $modalInstance, SessionService) {

			$scope.loading = false;

			$scope.register = function(user) {
				// Control de los input del usuario

				$scope.loading = true;
				SessionService.register(user).then(function(data) {

				     if(data.data.title == "error"){
               sweetAlert("Oops...",data.data.detail, "error");

				     }

					// aca okParam es lo que se devuelve en
					// deferred.resolve(DATA) desde el service
					$scope.login(user);
				}, function(error) {
					// el error funciona igual
					$scope.loading = false;
					console.log(error);
				});
			};

			$scope.close = function() {
				$modalInstance.dismiss('cancel');
			}

			$scope.login = function() {

				$modalInstance.close();

				$modalInstance.dismiss();

				var modalInstance = $modal.open({
					animation : false,
					templateUrl : 'views/login.html',
					controller : 'LoginCtrl',
				});
			};

			}
);
