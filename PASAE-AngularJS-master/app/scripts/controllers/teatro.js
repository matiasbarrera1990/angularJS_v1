'use strict';

/**
 * @ngdoc function
 * @name pasaeAngularJsApp.controller:AboutCtrl
 * @description
 * # RegisterController
 * Controller of the pasaeAngularJsApp
 */
angular.module('pasaeAngularJsApp').controller('TeatroCtrl', function ($scope,$location,$stateParams,$modal,TeatroService,EspectaculoService) {

//   $scope.teatros=TeatroService.getTeatros();

 $scope.cantidadEspectaculos=function(nombre){
     TeatroService.tieneEspectaculosAsociados(nombre).then(

         function(data){
            $scope.cantidad=data.data;

         },
         function (error){
            $scope.loading=false;
            $scope.log(error);
          }
      );

 }




  var teatros= function(){
  TeatroService.getTeatros().then(

     function(data){

        $scope.teatros=data.data;

     },
     function (error){
        $scope.loading=false;

      }
  );
  }
  if($stateParams.idteatro != null){
  TeatroService.getDataTeatro($stateParams.idteatro).then(
   	function(data){
         				// los datos estan en data.data
          				$scope.teatro=data.data;

     },
      function(error){
          				 //el error funciona igual
          				$scope.loading = false;

  });
}
    $scope.editar=function(){
    $scope.loading = true;

              TeatroService.editarTeatro($stateParams.idteatro,$scope.teatro).then(
              		   function(){
                       console.log("edito teatro");
                       $location.path('/admin/listadoteatros');

              		  },
              			function(error){

              				$scope.loading = false;
              				console.log(error);


                   }
              );
    }

   $scope.eliminar = function(teatro){

            $scope.teatroSelected = teatro;
             $scope.modalInstance = $modal.open({
              animation: true,
              scope:$scope,
              templateUrl: 'views/eliminarTeatro.html'
            });
   }

  $scope.confirmDeleteTeatro = function(teatro){

   	var tieneEspectaculos=TeatroService.tieneEspectaculosAsociados(teatro.nombre);
   if(tieneEspectaculos != 0){
           sweetAlert("Oops...", "El teatro tiene espectaculos asociados", "error");
    }
     else{
         TeatroService.eliminarTeatro($scope.teatroSelected.id).then(
                                   function(data){
                                            console.log(data);
                                            var index = -1,i=0;
                                            while(index==-1 && i<=$scope.teatros.length-1){
                                                  if($scope.teatros[i].id==teatro.id){
                                                        index=i;
                                                 	}
                                                 	i++;
                                             }
                                             $scope.teatros.splice(index, 1 );
                                             $scope.modalInstance.close();
                                   },
                                   function(error){

                                       console.log(error);
                                       $scope.modalInstance.close();
                                   });



  }
}


 $scope.agregar = function () {
    	$scope.loading = true;

          TeatroService.crearTeatro($scope.teatro).then(
          		   function(data){

          		     console.log("agrego teatro");
                   if(data.data.title == "error"){
                         sweetAlert("Oops...",data.data.detail, "error");

                   }
                   $location.path('/admin/listadoteatros');


          		  },
          			function(error){

          				$scope.loading = false;
          				console.log(error);


               }
          );

  };

  $scope.cancel = function() {
  				$scope.modalInstance.close();
  };



 $scope.isCollapsed = true;
 teatros();



});
