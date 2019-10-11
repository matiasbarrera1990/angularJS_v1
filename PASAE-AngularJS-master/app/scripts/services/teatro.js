'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').service('TeatroService', ['$q','$http','$cookies','$httpParamSerializer','config',function($q,$http,$cookies,$httpParamSerializer,config) {

    return{
        crearTeatro : function(teatro){
                      var deferred = $q.defer();

                      $http.post(config.apiUrl+'web-module/teatro',teatro).then(function(successData){


                        var data = successData;

                        deferred.resolve(data);
                        },function(error){
                          deferred.reject(error);
                        });
                      return deferred.promise;
         },
         getTeatros : function(){
              var deferred = $q.defer();

              $http.get(config.apiUrl+'web-module/teatro/listadoteatros').then(function(successData){
                var data = successData;

                deferred.resolve(data);
                },function(error){
                  deferred.reject(error);
                });
              return deferred.promise;
          },

          getDataTeatro : function(idTeatro){
            var deferred = $q.defer();
                         $http.get(config.apiUrl+'web-module/teatro/' + idTeatro).then(function(successData){
                           var data = successData;

                           deferred.resolve(data);
                           },function(error){
                             deferred.reject(error);
                           });
                         return deferred.promise;



          },

          editarTeatro : function(idTeatro,teatro){

                                         var deferred = $q.defer();
                                         $http.post(config.apiUrl+'web-module/teatro/' + idTeatro + '/modificardatos', teatro).then(function(successData){
                                                    var data = successData;
                                                    deferred.resolve(data);

                                               },function(error){
                                                    deferred.reject(error);

                                       });
                                       return deferred.promise;

           },
           eliminarTeatro: function(idTeatro){

                                       var deferred = $q.defer();
                                       $http.post(config.apiUrl+'web-module/teatro/eliminar/' + idTeatro).then(function(successData){
                                                 var data = successData;
                                                  deferred.resolve(data);
                                               },function(error){
                                                    deferred.reject(error);


                                               }
                                        );
                                        return deferred.promise;



            },
            tieneEspectaculosAsociados: function(nombreTeatro){

                          var request;
                                                       if (window.XMLHttpRequest) {
                                                           request=new XMLHttpRequest();
                                                       } else if (window.ActiveXObject) {
                                                           request = new ActiveXObject("Microsoft.XMLHTTP");
                                                       } else {
                                                           throw new Error("Your browser don't support XMLHttpRequest");
                                                        }

                                                        request.open('GET',config.apiUrl+'web-module/espectaculo/espectaculosdeteatro/'+ nombreTeatro, false);
                                                        request.send(null);

                                                           if (request.status === 200) {
                                                             return request.responseText;
                                                           }
            }




    }
   }]);
