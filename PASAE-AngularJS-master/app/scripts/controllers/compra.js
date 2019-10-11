'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('CompraCtrl', function ($scope,$state,$stateParams,VentaService,$sessionStorage) {




	    VentaService.comprasDeEspectador($sessionStorage.username).then(function(data) {
	        $scope.compras = data.data;
      	},
      	function(error) {
      	  $scope.loading = false;

        });















});
