'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').service('VentaService', ['$q','$http','$cookies','$httpParamSerializer','config',function($q,$http,$cookies,$httpParamSerializer,config) {

 return {
        chequearMonto : function(sector,asientos){
            var deferred = $q.defer();
            $http.get(config.apiUrl+'web-module/venta/'+sector+'/'+asientos).then(function(successData){
              var data = successData;
              deferred.resolve(data);
              },function(error){
                deferred.reject(error);
              });
            return deferred.promise;
        },
        confirmarVenta : function(venta){
            var deferred = $q.defer();
            $http.post(config.apiUrl+'web-module/venta',venta).then(function(successData){
              var data = successData;
              deferred.resolve(data);
              },function(error){
                deferred.reject(error);
              });
            return deferred.promise;
        },
        comprasDeEspectador : function(username){

           var deferred = $q.defer();
                       $http.get(config.apiUrl+'web-module/venta/miscompras/'+ username ).then(function(successData){
                         var data = successData;
                         deferred.resolve(data);
                         },function(error){
                           deferred.reject(error);
                         });
                       return deferred.promise;

        },
        listadoVentas :function(){

                                  var deferred = $q.defer();
                                              $http.get(config.apiUrl+'web-module/venta/listado').then(function(successData){
                                                var data = successData;
                                                deferred.resolve(data);
                                                },function(error){
                                                  deferred.reject(error);
                                                });
                                  return deferred.promise;

        },
        espectaculosVendidos:function(){
                        var deferred = $q.defer();
                                     $http.get(config.apiUrl+'web-module/venta/listadoespectaculosvendidos').then(function(successData){
                                           var data = successData;
                                           deferred.resolve(data);
                                           },function(error){
                                                deferred.reject(error);
                                            });
                         return deferred.promise;




        }
  }
}]);
