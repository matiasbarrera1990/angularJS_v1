'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('ReservaCtrl', function ($scope,EspectaculoService,SectorService,$state,$stateParams,VentaService) {

	console.log('reserva instanciado');

	$scope.reserva = {asientos : []};

	$scope.data = {error:{active:false}};

	$scope.disableStep2=true;

	$scope.disableStep3=true;

	$scope.seatsQty=0;

	if($stateParams.funcion!=null){
		$scope.data.espectaculo = $stateParams.espectaculo;
		$scope.reserva.funcionId = $stateParams.funcion.id;
		$scope.data.funcion = $stateParams.funcion;
		SectorService.getSectores($scope.reserva.funcionId).then(
				function(data){
					$scope.data.sectores = data.data;
				},
				function(error){
					console.log(error);
				}
		);
	}else{
		$state.go('home');
	}



	$scope.reserva.monto = 0 ;

	if($scope.reserva.sector){
		$scope.asientos = SectorService.getSector(sector);
	}

	$scope.getStatus = function(asiento) {
     		var index = $scope.reserva.asientos.indexOf(asiento);
             if(index > -1 && asiento.ocupado ) {
                 return 'selected';
             } else if(index == -1 && asiento.ocupado ) {
                 return 'reserved';
             }else{
             	return 'available';
             }
    }

	var actualizarMonto = function(){
		$scope.data.error.active = false;
		VentaService.chequearMonto($scope.data.sector.id,$scope.reserva.asientos.length).then(
				function(data){
					$scope.reserva.monto = data.data.monto;
				},
				function(error){
					console.log(error);
				}
		);
	}


    $scope.seatClicked = function(asiento,fila) {
    	$scope.data.error.active = false;
    	var index = $scope.reserva.asientos.indexOf(asiento);

    	if(asiento.ocupado  &&  index!= -1 ){
    		$scope.reserva.asientos.splice(index, 1);
    		asiento.ocupado = false;
//    		$scope.reserva.monto -= $scope.sector.monto;
    		$scope.reserva.asientos.length > 0 ? actualizarMonto() : $scope.reserva.monto = 0;


    	}else{
    		if( !asiento.ocupado ){
    			asiento.ocupado = true;
    			$scope.reserva.asientos.push(asiento);
//    			$scope.reserva.monto += $scope.data.sector.monto;
    			$scope.reserva.asientos.length > 0 ? actualizarMonto() : $scope.reserva.monto = 0;
    		}
    	}
    }


	$scope.processForm= function(){
		$scope.data.error.active = false;
		VentaService.confirmarVenta($scope.reserva).then(
				function(data){
					if(data.data.title == 'error'){
						$scope.data.error.detail = data.data.detail;
						$scope.data.error.active = true;

					}else{

		       $state.go('reserva.confirmada');


					}
					console.log(data);
				},
				function(error){
					console.log(error);
				}
		);
	}


	$scope.incSeatsSelected=function() {
	  var cantidad=$scope.seatsQty;
	  $scope.seatsQty+=1;
	}

	$scope.decSeatsSelected=function() {
  	  $scope.seatsQty-=1;
  }

  $scope.seatsSelected=function() {
      return ($scope.seatsQty > 0);
  }

	$scope.controlSlider = function () {
  	  if($state.current.name == 'reserva.seleccion')
  	    $scope.disableStep2=false;
  	  else if ($state.current.name == 'reserva.metodo')
  	    $scope.disableStep3=false;


  };



});
