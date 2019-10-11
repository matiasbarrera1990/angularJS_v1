'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description # RegisterController Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('CategoriaCtrl',
		function($scope, CategoriaService) {

			$scope.categorias = CategoriaService.getCategorias();

		});
