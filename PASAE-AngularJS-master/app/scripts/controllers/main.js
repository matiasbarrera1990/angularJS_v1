'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:MainCtrl
 * @description # MainCtrl Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('MainCtrl',function($scope, $cookies, $stateParams, $location, EspectaculoService,$sessionStorage, $modal,$state) {
			$scope.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma'

			];
			console.log("mainctrl instanciado");

			var checkLogin = function() {
				if ($sessionStorage.authenticated) {
					$scope.username = $sessionStorage.username;
					$scope.authenticated = true;
					$scope.roles = $sessionStorage.roles[0].authority;

       /*  if($stateParams.idespectaculo != null){
          //$location.path("/espectaculo/info/"+ $stateParams.idespectaculo);


          ;*/



        }
				else {
					$scope.authenticated = false;
				}
		 }

			checkLogin();


			$scope.$on('loginEvent', function(event, data) {
				checkLogin();


			});

			$scope.$on('logOut', function(event, data) {
				$scope.authenticated = false;
				$scope.roles = {};
				$scope.username = {};
			});

			var listadoEspectaculos = function() {

				EspectaculoService.getEspectaculos().then(function(data) {
					$scope.espectaculos = data.data;

				},

				function(error) {

					$scope.loading = false;
					console.log(error);
				});

			}

			$scope.eliminar = function(espectaculo) {

				$scope.espectaculoSelected = espectaculo;
				$scope.modalInstance = $modal.open({
					animation : true,
					scope : $scope,
					templateUrl : 'views/eliminarEspectaculo.html'
				});
			}

			$scope.confirmDeleteEspectaculo = function(espectaculo) {

			var tieneFunciones=EspectaculoService.getCantidadFunciones(espectaculo.id);

      if (tieneFunciones != 0){
               sweetAlert("Oops...", "El espectaculo tiene funciones asociadas", "error");
      }
      else{
			      EspectaculoService.eliminarEspectaculo(
						$scope.espectaculoSelected.id).then(function(data) {
					  console.log(data);
					  var index = -1, i = 0;
					  while (index == -1 && i <= $scope.espectaculos.length - 1) {
						if ($scope.espectaculos[i].id == espectaculo.id) {
							index = i;
						}
						i++;
					  }
					  $scope.espectaculos.splice(index, 1);
					  $scope.modalInstance.close();
				},
				function(error) {

				   	console.log(error);
					  $scope.modalInstance.close();
				});

			}
    }
			EspectaculoService.listadoEspectaculoSegunCategoria(
					$stateParams.categoria).then(

			function(data) {
        $scope.categoria=$stateParams.categoria;
				$scope.espectaculos2 = data.data;

			},

			function(error) {
				console.log(error);
			});

			var listadoEspectaculosFiltrado = function() {

				EspectaculoService.listadoEspectaculosFiltrado($stateParams.busqueda).then(function(data){

          $scope.busqueda=$stateParams.busqueda;
					$scope.espectaculos2 = data.data;


          }, function(error) {

					$scope.loading = false;
					console.log(error);
				}

				);

			};


  if (($stateParams.fecha1 != null) && ($stateParams.fecha2 != null)){

		  EspectaculoService.listadoEspectaculosFiltradoPorFechas(
           						$stateParams.fecha1, $stateParams.fecha2).then(
           						function(data) {

           							$scope.espectaculos2 = data.data;



           						}, function(error) {

           							$scope.loading = false;
           							console.log(error);
           						}

           				);
      }

		  $scope.search = function() {

				if (!$scope.busqueda) {
					listadoEspectaculos();

				} else {
              listadoEspectaculosFiltrado();
							$location.path('/busquedaespectaculosfiltrados/'+ $scope.busqueda);

				}

			}

		  $scope.cancel = function() {
      				$scope.modalInstance.close();
      };

  		$scope.isCollapsed = true;
			if ($location.url() === "/busquedaespectaculosfiltrados/"
					+ $stateParams.busqueda)
				  listadoEspectaculosFiltrado();

			else
				listadoEspectaculos();

		});
