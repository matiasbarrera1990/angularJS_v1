'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description # AboutCtrl Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller(
		'HeaderCtrl',
		function($scope, $modal, $log, $rootScope, $cookies, $sessionStorage,
				$filter, $location, EspectaculoService,SessionService) {

			var checkLogin = function() {
				if ($sessionStorage.authenticated) {
					$scope.username = $sessionStorage.username;
					$scope.authenticated = true;
					$scope.roles = $sessionStorage.roles[0].authority;
				} else {
					$scope.authenticated = false;
				}
			}


			$scope.logout = function(){
				SessionService.logout().then(
					function(data){
						$rootScope.$broadcast('logOut', true);
					},
					function(error){
						console.log(error);
					}
			)}

			checkLogin();

			$scope.login = function() {
				var modalInstance = $modal.open({
					animation : false,
					templateUrl : 'views/login.html',
					controller : 'LoginCtrl',
					size : 4,
					resolve : {
						items : function() {
							return $scope.items;
						}
					}
				});
			};

      $scope.register = function() {

				var modalInstance = $modal.open({
					animation : false,
					templateUrl : 'views/register.html',
					controller : 'RegisterCtrl',
					size : 4,
					resolve : {
						items : function() {
							return $scope.items;
						}
					}
				});
			};

			$scope.open = function(size) {

				$scope.modalInstance = $modal.open({
					animation : true,

					size : size,
					scope : $scope,
					templateUrl : 'views/espectaculosFiltradosEntreFechas.html'
				});
			}



			$scope.buscarEspectaculosEntreFechas = function(fecha1, fecha2) {

				var fechaInferior = $filter('date')(fecha1, "dd-MM-yyyy");
				var fechaSuperior = $filter('date')(fecha2, "dd-MM-yyyy");
			 if ((fechaInferior != null) && (fechaSuperior != null)){

				$scope.cancel();
				$location.path('/busquedaespectaculosfiltradosporfecha/'
									+ fechaInferior + '/'+ fechaSuperior);
        }


			}

			$scope.cancel = function() {
				$scope.modalInstance.close();
			};

			$scope.$on('loginEvent', function(event, data) {
				checkLogin();
			});
			$scope.$on('logOut', function(event, data) {
             delete $sessionStorage.authenticated;
            delete $scope.authenticated;
       			delete	$scope.roles;
       			delete $sessionStorage.roles;
       			delete 	$scope.username;
       			});
       		});
