'use strict';

angular.module('pasaeAngularJsApp').service( 'UsuarioService', ['$q','$http','$httpParamSerializer','$rootScope','config',function($q,$http,$httpParamSerializer,$rootScope,config){
  return {

	        agregarEmpleado : function(usuario){
                var deferred = $q.defer();
                  $http.post(config.apiUrl+'/web-module/empleado',usuario).then(function(successData){
                    var data = successData;
                    deferred.resolve(data);
                  },function(error){
                    deferred.reject(error);
                  });


                return deferred.promise;


          },


          getListadoEmpleados : function () {

                var deferred = $q.defer();
                $http.get(config.apiUrl+'web-module/empleado/listadoempleados').then(function(successData) {

                  var data = successData;
                  deferred.resolve(data);
                },function(error){
                  deferred.reject(error);
                });
                return deferred.promise;

          },

         getListadoEspectadores : function () {

                    var deferred = $q.defer();
                    $http.get(config.apiUrl+'web-module/espectador/listadoespectadores').then(function(successData) {

                      var data = successData;
                      deferred.resolve(data);
                    },function(error){
                      deferred.reject(error);
                    });
                    return deferred.promise;

          },

          getListadoEspectadoresFiltrado : function (searchValue) {

                    var deferred = $q.defer();
                    $http.get(config.apiUrl+'web-module/espectador/busquedaespectadores/' + searchValue).then(function(successData) {
                      var data = successData;
                      deferred.resolve(data);
                    },function(error){
                       deferred.reject(error);
                    });
                    return deferred.promise;

          },


           getListadoEmpleadosFiltrado : function (searchValue) {

                    var deferred = $q.defer();
                    $http.get(config.apiUrl+'web-module/empleado/busquedaempleados/' + searchValue).then(function(successData) {
                      var data = successData;
                      deferred.resolve(data);
                    },function(error){
                      deferred.reject(error);
                    });
                    return deferred.promise;

           },


                getDataAdministrador : function(idAdmin){

                          var deferred = $q.defer();
                          $http.get(config.apiUrl+'web-module/administador/' + idAdmin).then(function(successData){
                            var data = successData;
                            deferred.resolve(data);
                          },function(error){
                            deferred.reject(error);
                          });
                          return deferred.promise;

                     },


           getDataEspectador : function(idEspectador){

                var deferred = $q.defer();
                $http.get(config.apiUrl+'web-module/espectador/' + idEspectador).then(function(successData){
                  var data = successData;
                  deferred.resolve(data);
                },function(error){
                  deferred.reject(error);
                });
                return deferred.promise;

           },

           getDataEmpleado: function(idEmpleado){

                           var deferred = $q.defer();
                           $http.get(config.apiUrl+'web-module/empleado/' + idEmpleado).then(function(successData){
                             var data = successData;
                             deferred.resolve(data);
                           },function(error){
                             deferred.reject(error);
                           });
                           return deferred.promise;

           },

          modificarDatosEmpleado:function(usuario) {

                 var deferred = $q.defer();

                 $http.post(config.apiUrl+'web-module/empleado/cambiardatospersonales/'+ usuario.id,usuario).then(function(successData){

                    var data = successData;
                   	deferred.resolve(data);
                 },function(error){
                    deferred.reject(error);
                 });
                 return deferred.promise;
          },

              modificarDatosEspectador:function(usuario) {

                           var deferred = $q.defer();

                           $http.post(config.apiUrl+'web-module/espectador/cambiardatospersonales/'+ usuario.id,usuario).then(function(successData){
                              var data = successData;
                             	deferred.resolve(data);
                           },function(error){
                              deferred.reject(error);
                           });
                           return deferred.promise;
              },



              modificarEstadoEmpleado:function(usuario) {

                           var deferred = $q.defer();

                           $http.post(config.apiUrl+'web-module/empleado/cambiarestado/'+ usuario.id,usuario).then(function(successData){
                              var data = successData;
                             	deferred.resolve(data);
                           },function(error){
                              deferred.reject(error);
                           });
                           return deferred.promise;
              },

               modificarEstadoEspectador:function(usuario) {

                                         var deferred = $q.defer();

                                         $http.post(config.apiUrl+'web-module/espectador/cambiarestado/'+ usuario.id,usuario).then(function(successData){
                                            var data = successData;
                                           	deferred.resolve(data);
                                         },function(error){
                                            deferred.reject(error);
                                         });
                                         return deferred.promise;
                }
  }
}]);
