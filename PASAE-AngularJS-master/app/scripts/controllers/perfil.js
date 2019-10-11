'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('ProfileCtrl', function ($scope,$modal,UsuarioService) {

	$scope.loading = false;

  var roles=$sessionStorage.roles[0].authority;

  if (roles =="ROLE_ADMINISTRADOR")
   EspectaculoService.getDataAdministrador($routeParams.idespectador).then(
     	function(data){
           				// los datos estan en data.data
            				$scope.espectaculo=data.data;

       },
        function(error){
            				 //el error funciona igual
            				$scope.loading = false;
            				console.log(error);
      });






//    $scope.login = function () {
//
//    	$modalInstance.close();
//
//	    var modalInstance = $modal.open({
//	      animation: true,
//	      templateUrl: 'views/login.html',
//	      controller: 'LoginCtrl',
//	    });
// };

   });
