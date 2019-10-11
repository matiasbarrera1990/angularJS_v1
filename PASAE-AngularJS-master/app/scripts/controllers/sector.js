'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('SectorCtrl', function ($scope,SectorService,EspectaculoService,$state) {


	EspectaculoService.getEspectaculos().then(
				function(data){
					$scope.espectaculos =  data.data;
				},
				function(error){
					console.log(error);
				}
	);



	$scope.teatro  = {};

	$scope.data = {};

	$scope.disableStep2=true;

	$scope.disableStep3=true;


	var filtrarJson = function(teatro){
						teatro.sectores.forEach(function(sector) {
						    delete sector.nFilas;
						    sector.filas.forEach(function(fila){
						    	delete fila.nAsientos;
						    });
						});
						return teatro;
					 };

	$scope.controlSlider = function () {
	  if($state.current.name == 'sector-crear.sectores')
	    $scope.disableStep2=false;
	  else if ($state.current.name == 'sector-crear.filas')
	    $scope.disableStep3=false;


	}

	$scope.crearSectores = function(){
		$scope.teatro.sectores = [];
		for (var i = 0; i < $scope.data.nSectores; i++)
			$scope.teatro.sectores.push({"espectaculoId":$scope.teatro.espectaculoId});
	};

	$scope.crearFilas = function(sector){
		sector.filas = [];
		for (var i = 0; i < sector.nFilas; i++)
			sector.filas.push({"nro_fila": i+1});
//		delete sector.nFilas;
	};

	$scope.crearAsientos = function(fila){
		fila.asientos = [];
		for (var i = 0; i < fila.nAsientos; i++)
			fila.asientos.push({"numero": i+1});

	}

	$scope.processForm= function(){
		SectorService.crearSectores(filtrarJson($scope.teatro)).then(
				function(data){
					$scope.espectaculos =  data.data;
					$state.go('home');
				},
				function(error){
					console.log(error);
				}
		);
	};
	
	$scope.teatro.espectaculoId = $stateParams .idespectaculo;

//	if($state.current.name == 'teatro-crear'){
		$state.go('sector-crear.sectores');
//	}






	console.log('Sector ctrl instanciado');

});
