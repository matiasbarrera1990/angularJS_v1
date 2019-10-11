'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').service('CategoriaService', ['$q','$http','$cookies','$httpParamSerializer','config',function($q,$http,$cookies,$httpParamSerializer,config) {

      return{
           getCategorias : function(){
                var deferred = $q.defer();

                $http.get(config.apiUrl+'web-module/categoria/listadocategorias').then(function(successData){
                  var data = successData;

                  deferred.resolve(data);
                  },function(error){
                    deferred.reject(error);
                  });
                return deferred.promise;
            }
      }


   }]);
