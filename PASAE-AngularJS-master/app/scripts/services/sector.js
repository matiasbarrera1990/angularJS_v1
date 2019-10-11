'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').service('SectorService', ['$q','$http','$cookies','$httpParamSerializer','config',function($q,$http,$cookies,$httpParamSerializer,config) {

    return{
    	crearSectores : function(sector){
            var deferred = $q.defer();
                $http.post(config.apiUrl+'web-module/sector/agregarsectoresparaespectaculo',sector).then(function(successData){
                  var data = successData;
                  deferred.resolve(data);
                  },function(error){
                    deferred.reject(error);
                  });
                return deferred.promise;
        },
    	 crearSector : function(sector){
             var deferred = $q.defer();
                 $http.post(config.apiUrl+'web-module/sector',sector).then(function(successData){
                   var data = successData;
                   deferred.resolve(data);
                   },function(error){
                     deferred.reject(error);
                   });
                 return deferred.promise;
         },
         getSector : function(sector){
             var deferred = $q.defer();
                 $http.get(config.apiUrl+'web-module/sector/getsector/'+sector).then(function(successData){
                   var data = successData;
                   deferred.resolve(data);
                   },function(error){
                     deferred.reject(error);
                   });
                 return deferred.promise;
         },
         getSectores : function(id){
             var deferred = $q.defer();
             $http.get(config.apiUrl+'web-module/sector/getsectores/'+id).then(function(successData){
               var data = successData;
               deferred.resolve(data);
               },function(error){
                 deferred.reject(error);
               });
             return deferred.promise;
         }
    }
   }]);
