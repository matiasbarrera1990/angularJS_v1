'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:UsuarioCtrl
 * @description # RegisterController Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller(
		'UsuarioCtrl',
		function($scope, $modal, $location, UsuarioService) {

			var listadoUsuarios = function() {
				if ($scope.rol === 'espectador') {
					UsuarioService.getListadoEspectadores().then(

					function(data) {
						$scope.usuarios = data.data;
					}, function(error) {
						$loading = false;
						console.log(error);
					});
				} else {
					UsuarioService.getListadoEmpleados().then(

					function(data) {
						$scope.usuarios = data.data;
					}, function(error) {
						loading = false;
						console.log(error);
					});
				};

			};

			var listadoUsuariosFiltrado = function() {
				if ($scope.rol === 'espectador') {
					UsuarioService.getListadoEspectadoresFiltrado(
							$scope.searchValue).then(

					function(data) {
						$scope.usuarios = data.data;
					}, function(error) {
						$loading = false;
						console.log(error);
					});
				} else {
					UsuarioService.getListadoEmpleadosFiltrado(
							$scope.searchValue).then(

					function(data) {
						$scope.usuarios = data.data;
					}, function(error) {
						loading = false;
						console.log(error);
					});
				}
				;

			};

			$scope.search = function() {
				if (!$scope.searchValue) {
					listadoUsuarios();

				} else {
					listadoUsuariosFiltrado();
				}
			};

			$scope.sort = function(keyname) {
				$scope.sortKey = keyname; // set the sortKey to the param
											// passed
				$scope.reverse = !$scope.reverse; // if true make it false and
													// vice versa
			};

			$scope.agregarEmpleado = function() {
				$scope.loading = true;
				UsuarioService.agregarEmpleado($scope.usuario).then(

				function(data) {


					console.log("agrego empleado");
					if(data.data.title == "error"){
                sweetAlert("Oops...",data.data.detail, "error");

         }
					listadoUsuarios();


					$location.path("/admin/listadoempleados");

				},

				function(error) {

					$scope.loading = false;
					console.log(error);
				});

			};


				$scope.confirmarDeshabilitarUsuario = function(usuario) {

      				$scope.usuarioSeleccionado = usuario;
      				$scope.modalInstance = $modal.open({
      					animation : true,
      					scope : $scope,
      					templateUrl : 'views/deshabilitarUsuario.html'
      				});
        };

        $scope.close = function() {
        		$scope.modalInstance.close();
        };


			$scope.habilitarUsuario = function(usuario) {
				$scope.loading = true;
				usuario.estado = 'activo';
				if ($scope.rol === 'espectador') {
					UsuarioService.modificarEstadoEspectador(usuario).then(

					function() {
						console.log("modifico estado espectador");
					},

					function(error) {
						$scope.loading = false;
						console.log(error);

					});

				} else {

					UsuarioService.modificarEstadoEmpleado(usuario).then(

					function() {
						console.log("modifico estado empleado");
					},

					function(error) {
						$scope.loading = false;
						console.log(error);

					});

				}

			};

			$scope.deshabilitarUsuario = function(usuario) {
				$scope.loading = true;
				usuario.estado = 'inactivo';
				if ($scope.rol === 'espectador') {
					UsuarioService.modificarEstadoEspectador(usuario).then(

					function() {
						console.log("modifico estado espectador");
					},

					function(error) {
						$scope.loading = false;
						console.log(error);

					});

				} else {

					UsuarioService.modificarEstadoEmpleado(usuario).then(

					function() {
						console.log("modifico estado empleado");
					},

					function(error) {
						$scope.loading = false;
						console.log(error);

					});

				}
				$scope.close();

			};

			if ($location.url() === "/admin/listadoespectadores")
				$scope.rol = "espectador";
			else
				$scope.rol = "empleado";

			listadoUsuarios();

		});
