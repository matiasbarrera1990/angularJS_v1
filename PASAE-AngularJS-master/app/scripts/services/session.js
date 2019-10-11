'use strict';

angular.module('pasaeAngularJsApp').service( 'SessionService', ['$q','$http','$cookies','$httpParamSerializer','config',function($q,$http,$cookies,$httpParamSerializer,config){
	return {
		register : function(user){
			var deferred = $q.defer();
			$http.post(config.apiUrl+'web-module/espectador', user).then(function(successData){
				var data = successData;
				// se registra exitosamente el usuario devuelvo la informacion para logearlo
				deferred.resolve(data);
				},function(error){
					deferred.reject(error);
				});
			return deferred.promise;
		},
		logout : function(user){
			var deferred = $q.defer();
			$http.post(config.apiUrl+'web-module/logout',{}).then(function(successData){
				var data = successData;
				// se registra exitosamente el usuario devuelvo la informacion para logearlo
				deferred.resolve(data);
				},function(error){
					deferred.reject(error);
				});
			return deferred.promise;
		},
		authenticate : function(credentials){
			var deferred = $q.defer();

			//Defino el header
//			var headers = credentials ? {authorization : 'Basic ' + btoa(credentials.username + ":" + credentials.password)
//		    } : {};

			$http.post(config.apiUrl+'web-module/login', $httpParamSerializer(credentials), {
			    headers: {
			        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			        },
			    ignore401: true,
			    withCredentials:true
				}).success(function(data) {
//					$cookies.authenticated = true;
//					$cookies.token = data.token;
					deferred.resolve(data);
			    }).error(function(error) {
//					$cookies.authenticated = false;
//					console.log(data);
//					console.log(status);
//					console.log(headers);
//					console.log(config);
					deferred.reject(error);
			    })
			return deferred.promise;
//		    var headers = {
//					'Access-Control-Allow-Origin' : '*',
//					'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
//					'Content-Type': 'application/x-www-form-urlencoded',
//					'Accept': 'application/json'
//				};
//
//				return $http({
//					method: "POST",
//					headers: headers,
//		            url: 'http://localhost:8080/web-module/login',
//					data: {"email":"my@email.com","password":"secret"}
//		    }).success(function(result) {
//						console.log("Auth.signin.success!")
//						console.log(result);
//		    }).error(function(data, status, headers, config) {
//						console.log("Auth.signin.error!")
//		        console.log(data);
//		        console.log(status);
//		        console.log(headers);
//		        console.log(config);
//		    });
		},




//		login :  function() {
//		      authenticate($scope.credentials, function() {
//		          if ($cookie.authenticated) {
//		            $location.path("/");
//		            $scope.error = false;
//		          } else {
//		            $location.path("/login");
//		            $scope.error = true;
//		          }
//		        });
//		    };
	};
}]);
