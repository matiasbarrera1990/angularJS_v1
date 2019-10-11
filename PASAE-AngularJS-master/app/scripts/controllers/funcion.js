/**
 * Created by EzequielPanoff on 9/3/17.
 */
'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('FuncionCtrl', function ($scope,FuncionService) {

  FuncionService.getDataFunction.then(function(data) {
      $scope.funcion = data.data;
    },
    function(error) {
      $scope.loading = false;
    });





});
