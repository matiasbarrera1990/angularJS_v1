'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description # AboutCtrl Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('ErrorCtrl',
		function($scope, $rootScope, $location) {

			// $scope.$on('errorStatus', function(event, data) {
			// console.log(data);
			// });
			//
			if ($rootScope.error != null) {
				$scope.error = {};
				$scope.error.code = $rootScope.error.code;
				$scope.error.status = $rootScope.error.status;
				$scope.error.msg = $rootScope.error.msg
			} else {
				$location.path('/');
			}
		});
