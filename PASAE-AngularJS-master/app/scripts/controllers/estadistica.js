'use strict';

 /**
  * @ngdoc function
  * @name pasaeAngularJsApp.controller:AboutCtrl
  * @description
  * # RegisterController
  * Controller of the pasaeAngularJsApp
  */
 angular.module('pasaeAngularJsApp').controller('EstadisticaCtrl', function ($scope,$state,$stateParams,$location,VentaService,$sessionStorage) {

 $scope.chartData = [ ];
 $scope.chartData2= [ ];


 $scope.array=[ ];
     $scope.chartConfig = {
             options: {
                 chart: {
                     type: 'column',
                     zoomType: 'x',
                     renderTo: 'contenedor2'
                 }
             },
             series: [ { name:"Cantidad", data:$scope.chartData} ],
             title: {
                 text: 'Ventas Generales'
             },
             xAxis: {
                     categories: $scope.chartData2
              },
              yAxis: {
                         title: {
                                  text: 'CANTIDAD VENDIDA'
                              },
                              plotLines: [{
                                      value: 0,
                                      width: 1,
                                      color: '#4572A7'
                                  }]
                          },
             loading: false

     }

     $scope.chartConfig1 = {
                options: {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        zoomType: 'x',
                        type:'pie',
                        renderTo: 'contenedor2'
                    }
                },


               series: [{
                         name:"Cantidad (en pesos)",
                          colorByPoint: true,
                           data: $scope.array

                       }],

               tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                title: {
                    text: 'Espectáculos vendidos segun la recaudación'
                },
                plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: true,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        }
                                    }
                                }
                },
          loading: false

        }
 var espectaculosVendidos=function(){
    VentaService.espectaculosVendidos().then(function(data) {
        $scope.espectaculos=data.data;
               for (var i=0; i< $scope.espectaculos.length;i++){
                  $scope.array.push([$scope.espectaculos[i].nombreEspectaculo,$scope.espectaculos[i].cantidad]);

               }
               },
                 function(error) {
             	  $scope.loading = false;

                });

}

 var ventasPorMes=function(){
        VentaService.listadoVentas().then(function(data) {

             $scope.ventas=data.data;

              angular.forEach($scope.ventas, function(venta){
                $scope.chartData.push(venta.cantidad);
                $scope.chartData2.push(venta.mes);
              })
        },
        function(error) {
          	  $scope.loading = false;

       });
 }
       if ($location.url() === "/estadistica/ventaspormes"){
              $scope.grafico="ventaspormes";
       			 ventasPorMes();
       }
       else{

           $scope.grafico="espectaculosvendidos";
           espectaculosVendidos();
       }


  });
