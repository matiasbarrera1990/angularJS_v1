'use strict';

angular.module('pasaeAngularJsApp').service('EspectaculoService', ['$q','$http','$cookies','$httpParamSerializer','config',function($q,$http,$cookies,$httpParamSerializer,config){
    return {
        crearEspectaculo : function(archivo,archivo2,espectaculo){
             var deferred = $q.defer();
             var json={"nombre":espectaculo.nombre,"descripcion":espectaculo.descripcion,"categoriaId":espectaculo.categoriaId,"teatroId":espectaculo.teatroId }
             var formData = new FormData();
                  formData.append("imagen", archivo);
                  formData.append("imagen_portada",archivo2);
                  formData.append("datos",JSON.stringify(json));//important: convert to string JSON!
                       var req = {
                         url: config.apiUrl+'web-module/espectaculo',
                         method: 'POST',
                         transformRequest: angular.identity,
                         headers: {'Content-Type': undefined},
                         data: formData

                       }


              $http(req).then(function(successData){


                var data = successData;

                deferred.resolve(data);
                },function(error){
                  deferred.reject(error);
                });
              return deferred.promise;
        },

        getEspectaculos : function(){

            var deferred = $q.defer();

                   $http.get(config.apiUrl+'web-module/espectaculo/listadoespectaculos').then(function(successData){
                      		var data = successData;

                      		deferred.resolve(data);
                      		},function(error){
                      					deferred.reject(error);

                      		});
                      		return deferred.promise;

         },
         getDataEspectaculo : function(idEspectaculo){

            var deferred = $q.defer();
                            $http.get(config.apiUrl+'web-module/espectaculo/' + idEspectaculo).then(function(successData){
                                  		var data = successData;

                                  		deferred.resolve(data);
                                  		},function(error){
                                  					deferred.reject(error);

                                  		});
                                  		return deferred.promise;

         },
         editarEspectaculo : function(idEspectaculo,espectaculo){

                               var deferred = $q.defer();
                               $http.post(config.apiUrl+'web-module/espectaculo/' + idEspectaculo + '/modificardatos', espectaculo).then(function(successData){
                                          var data = successData;
                                          deferred.resolve(data);

                                     },function(error){
                                          deferred.reject(error);

                             });
                             return deferred.promise;

         },
         eliminarEspectaculo: function(idEspectaculo){

                            var deferred = $q.defer();
                            $http.post(config.apiUrl+'web-module/espectaculo/eliminar/' + idEspectaculo).then(function(successData){
                                      var data = successData;
                                       deferred.resolve(data);
                                    },function(error){
                                         deferred.reject(error);


                                    }
                             );
                             return deferred.promise;



         },
         getFuncionesEspectaculo : function(idEspectaculo){

                       var deferred = $q.defer();
                       $http.get(config.apiUrl+'web-module/espectaculo/' + idEspectaculo + '/listadofunciones').then(function(successData){
                                var data = successData;

                                deferred.resolve(data);
                       },function(error){
                             deferred.reject(error);

                       });
                       return deferred.promise;

         },

         listadoEspectaculoSegunCategoria : function(categoria){

                      var deferred = $q.defer();
                      $http.get(config.apiUrl+'web-module/espectaculo/listadoespectaculosporcategoria/' + categoria).then(function(successData){
                            var data = successData;

                            deferred.resolve(data);
                       },function(error){
                            deferred.reject(error);

                       });
                       return deferred.promise;
          },
          listadoEspectaculosFiltrado : function(nombreEspectaculo){
               var deferred = $q.defer();
                                    $http.get(config.apiUrl+'web-module/espectaculo/filtrarespectaculospornombre/' + nombreEspectaculo).then(function(successData){
                                          var data = successData;

                                          deferred.resolve(data);
                                     },function(error){
                                          deferred.reject(error);

                                     });
                                     return deferred.promise;
          },


         listadoEspectaculosFiltradoPorFechas: function(fechaInferior,fechaSuperior){
               var deferred = $q.defer();
                                     $http.get(config.apiUrl+'web-module/espectaculo/listadoespectaculosentrefechas/'+ fechaInferior + '/' + fechaSuperior).then(function(successData){
                                          var data = successData;
                                          deferred.resolve(data);
                                      },function(error){
                                          deferred.reject(error);

                                      });
                                       return deferred.promise;


        },

        getCantidadFunciones : function(idEspectaculo){
        var request;
                     if (window.XMLHttpRequest) {
                         request=new XMLHttpRequest();
                     } else if (window.ActiveXObject) {
                         request = new ActiveXObject("Microsoft.XMLHTTP");
                     } else {
                         throw new Error("Your browser don't support XMLHttpRequest");
                      }

                      request.open('GET',config.apiUrl+'web-module/espectaculo/funcionesasociadas/'+ idEspectaculo, false);
                      request.send(null);

                         if (request.status === 200) {
                           return request.responseText;
                         }



        }





       }

}]);


