angular
       .module('dimeApp')
       .controller('DepuraCasosCellController', function ($scope, $routeParams,  $http) {


           SetRazonesSoporteDDL();

           function SetRazonesSoporteDDL() {

               $http.get(appPath + 'CasosCelula/RazonesSoporteIngresos')
           .then(function (data) {
               var jsonData = JSON.parse(data.data);
               console.log(jsonData);

               $scope.optionsRazonSoporte = [];

               for (var i = 0; i < jsonData.length; i++) {
                   $scope.optionsRazonSoporte.push({ name: jsonData[i].Nombre, id: jsonData[i].Id});
               }
           });

           }
       

           $http.get(appPath + 'CasosCelula/AccesoACaso', {
               params: {
                   idIngreso: $routeParams.idIngreso
               }
           }).then(function (data) {
               var jsonData = JSON.parse(data.data);
               if(jsonData == false)
               {
                   window.location.href = 'CasosCelula/CasosAbiertos';
               }
           });


           $http.get(appPath + 'CasosCelula/LineaLogeado')
               .then(function (data) {
               var jsonData = JSON.parse(data.data);
               $scope.LINEA_LOGEADO = jsonData;
           });

           $http.get(appPath + 'CasosCelula/JsonListHistorialCaso', {
               params:{
                   idIngreso: $routeParams.idIngreso
                      }
                   })
                      .then(function (data) {
                          var jsonData = JSON.parse(data.data);
                          SetearEstadoHistoricos(jsonData);
                          CargarGridHistorial(jsonData);
                      });

           $http.get(appPath + 'Consultas/ConsultaCasosAbiertosPorIdIngreso', {
               params: {
                   idIngreso: $routeParams.idIngreso
                     }
           }) .then(function (data) {
                         var jsonData = JSON.parse(data.data);
                         CargarInformaciónCreacion(jsonData);
                         CargarDatoServicioAfectado(jsonData);
           });

           


           $scope.optionsAEscalar = [
               { name: "CÉLULA AJUSTES", id: "CELULA AJUSTES" },
               { name: "CÉLULA FACTURACION Y CARTERA", id: "CELULA FACTURACION Y CARTERA" },
               { name: "CÉLULA OPERACIONES", id: "CELULA OPERACIONES" },
               { name: "CÉLULA PQR", id: "CELULA PQR" },
               { name: "CÉLULA ALTO VALOR", id: "CELULA ALTO VALOR" },
               { name: "CÉLULA ALTO VALOR VIP", id: "CELULA ALTO VALOR VIP" }
           ];

           $scope.optionsEstados = [
                { name: "ABIERTO", id: "1" },
                { name: "CERRADO", id: "2" },
                { name: "SEGUIMIENTO", id: "3" }
           ];

           $scope.optionsAplicaRechazo = [
               { name: "SI", id: "SI" },
               { name: "NO", id: "NO" },
           ];


           $scope.ChangeOnStateCase = function () {
               if ($scope.ingreso.IdEstado.id == "1")
               {
                   $scope.optionsAEscalar = [
                 { name: "CÉLULA AJUSTES", id: "CELULA AJUSTES" },
                 { name: "CÉLULA FACTURACION Y CARTERA", id: "CELULA FACTURACION Y CARTERA" },
                 { name: "CÉLULA OPERACIONES", id: "CELULA OPERACIONES" },
                 { name: "CÉLULA PQR", id: "CELULA PQR" },
                 { name: "CÉLULA ALTO VALOR", id: "CELULA ALTO VALOR" },
                 { name: "CÉLULA ALTO VALOR VIP", id: "CELULA ALTO VALOR VIP" }
                   ];
                   $scope.ingreso.NombreLineaEscalado = $scope.optionsAEscalar[0];
               } else {
                   $scope.optionsAEscalar = [
                        { name: "", id: "" }, ];
                   $scope.ingreso.NombreLineaEscalado = $scope.optionsAEscalar[0];
              

               }
                      
                          if($scope.ingreso.IdEstado.id == "3")
                            {
                              $scope.optionsRazonSoporte = [];
                              $scope.optionsRazonSoporte.push({ name: "Seguimiento", id: 8 });
                            } else {
                                      SetRazonesSoporteDDL();
                                    }
                  
                   
           };


           $scope.SubmitForm = function () {
               if ($scope.ingresoSoporte.TipoSegumiento == "Programacion de visita tecnica") {
                   $scope.ingresoSoporte.TipoSegumiento = "CELULA VISITA SOPORTE";
               }
               if ($scope.ingresoSoporte.TipoSegumiento == "Seguimiento por CCAA") {
                   $scope.ingresoSoporte.TipoSegumiento = "CELULA SEGUIMIENTO SOPORTE";
               }
               console.log($scope.ingreso.IdEstado.id + $scope.ingreso.NombreLineaEscalado.id + $scope.razonRechazo);
               $scope.ingreso.IdEstado = $scope.ingreso.IdEstado.id;
               $scope.ingreso.NombreLineaEscalado = $scope.ingreso.NombreLineaEscalado.id;
               $http.post(appPath + 'CasosCelula/SubmitDataDepuraCasos', {
                       ingreso: $scope.ingreso,
                       observaciones: $scope.tbObservaciones,
                       aplicaRechazo: $scope.selectedAplicaRechazo.id,
                       razonRechazo: $scope.razonRechazo,
                       ingresoSoporte: $scope.ingresoSoporte,
                       razonSoporte: ($scope.Razon.name == null) ? "" : $scope.Razon.name,
                       subrazon1Soporte: ($scope.Subrazon1.name == null) ? "" : $scope.Subrazon1.name,
                       subrazon2Soporte: ($scope.Subrazon2.name == null) ? "" : $scope.Subrazon2.name
               }).then(function (data) {
          
                   $("#labelMessage").text(data.data);

               });
           };


           $scope.ChangeOnRazonSoporte = function () {
               $http.get(appPath + 'CasosCelula/Subrazones1DeRazonSoporteIngresos', {
                   params: {
                       idRazon: $scope.Razon.id
                   }
               }).then(function (data) {
                   var jsonData = JSON.parse(data.data);
                   $scope.optionsSubrazon1Soporte = [];
                   for (var i = 0; i < jsonData.length; i++) {
                       $scope.optionsSubrazon1Soporte.push({ name: jsonData[i].Nombre, id: jsonData[i].Id });
                   }
               });
             }


           $scope.ChangeOnSubrazon1Soporte = function () {
               $http.get(appPath + 'CasosCelula/Subrazones2DeSubrazonSoporteIngresos', {
                   params: {
                       idSubrazon1: $scope.Subrazon1.id
                   }
               }).then(function (data) {
                   var jsonData = JSON.parse(data.data);
                   $scope.optionsSubrazon2Soporte = [];
                   for (var i = 0; i < jsonData.length; i++) {
                       $scope.optionsSubrazon2Soporte.push({ name: jsonData[i].Nombre, id: jsonData[i].Id });
                   }
               });
           }



           function SetearEstadoHistoricos(dataUp) {
               for (var i = 0; i < dataUp.length; i++) {
                   if (dataUp[i].IdEstado == 1) {
                       dataUp[i].IdEstado = "ABIERTO";
                   } else {
                       if (dataUp[i].IdEstado == 2) {
                           dataUp[i].IdEstado = "CERRADO";
                       } else {
                           dataUp[i].IdEstado = "SEGUIMIENTO";
                       }
                   }
               }
           };

           function CargarGridHistorial(data) {
               $("#tablaHistorial").kendoGrid({
                   autoBind: true,
                   toolbar: ["excel"],
                   excel: {
                       fileName: "Export.xlsx",
                   },
                   dataSource: {
                       data: data,
                       schema: {
                           model: {
                           }
                       },
                       pageSize: 10
                   },
                   scrollable: true,
                   filterable: {
                       extra: false,
                       operators: {
                           string: {
                               eq: "Es igual a"
                           }
                       }
                   },
                   sortable: true,
                   pageable: {
                       refresh: true,
                       pageSizes: true,
                       buttonCount: 5
                   }
               });

               var grid = $("#tablaHistorial").data("kendoGrid");
               grid.dataSource.sort({ field: "FechaNota", dir: "desc" });
           };


           function CargarDatoServicioAfectado(json)
           {
               switch(json[0].IdServicio)
               {
                   case 1:
                       $scope.tbServicioAfectado = "TV";
                       $scope.tbServicioAfectadoVal = 1;
                       break;
                   case 2:
                       $scope.tbServicioAfectado = "@";
                       $scope.tbServicioAfectadoVal = 2;
                       break;
                   case 3:
                       $scope.tbServicioAfectado = "VOZ";
                       $scope.tbServicioAfectadoVal = 3;
                       break;
                   case 4:
                       $scope.tbServicioAfectado = "TV-VOZ";
                       $scope.tbServicioAfectadoVal = 4;
                       break;
                   case 5:
                       $scope.tbServicioAfectado = "TV - @";
                       $scope.tbServicioAfectadoVal = 5;
                       break;
                   case 6:
                       $scope.tbServicioAfectado = "VOZ - @" ;
                       $scope.tbServicioAfectadoVal = 6;
                       break;
                   case 7:
                       $scope.tbServicioAfectado = "TV - @ - VOZ";
                       $scope.tbServicioAfectadoVal = 7;
                       break;
                   default:


               }
           }

           function CargarInformaciónCreacion(json) {
               $scope.ingreso = json[0];
               $scope.tbIdIngreso = json[0].IdIngreso;
               $scope.tbCuentaCliente = json[0].Cuenta;
               $scope.tbNoTicketRR = json[0].Ticket;
               $scope.tbFechaApertura = json[0].FechaApertura;
               $scope.tbHoraApertura = json[0].HoraApertura;
               $scope.tbUsuarioApertura = json[0].UsuarioApertura;
               $scope.tbAliadoApertura = json[0].AliadoApertura;
               $scope.tbFechaActualizacion = json[0].FechaUltimaActualizacion,
               $scope.tbUsuarioActualizacion = json[0].UsuarioUltimaActualizacion;
               $scope.tbHoraActualizacion = json[0].HoraUltimaActualizacion;
               $scope.ingreso.NombreLineaEscalado = $scope.optionsAEscalar[0];
               $scope.ingreso.IdEstado = $scope.optionsEstados[0];
               $scope.selectedAplicaRechazo = $scope.optionsAplicaRechazo[0];
               CargarInformacionClienteYMarcacion();
               CargarInformacionIngresoSoporte();

           };
      
           function CargarInformacionIngresoSoporte()
           {
               $http.get(appPath + 'CasosCelula/InformacionSoporteIngreso', {
                   params: {
                       idIngreso: $routeParams.idIngreso
                   }
               }).then(function (data) {
                   var jsonData = JSON.parse(data.data);
                   console.log(jsonData);
                   $scope.ingresoSoporte = jsonData;
                   if( $scope.ingresoSoporte.TipoSegumiento  == "CELULA VISITA SOPORTE" )
                   {
                       $scope.ingresoSoporte.TipoSegumiento = "Programacion de visita tecnica";
                   }
                   if ($scope.ingresoSoporte.TipoSegumiento == "CELULA SEGUIMIENTO SOPORTE")
                   {
                       $scope.ingresoSoporte.TipoSegumiento = "Seguimiento por CCAA";
                   }
               });


           }


           function CargarInformacionClienteYMarcacion() {

               $http.get(appPath + 'CasosCelula/JsonDatosClienteYMarcacion', {
                   params: {
                       cuenta: $scope.tbCuentaCliente,
                       marcacion: $routeParams.marcacion
                   }
               }).then(function (data) {
                   var jsonData = JSON.parse(data.data);
                   $scope.clienteInfo = jsonData.clienteInfo;
                   $scope.marcacionInfo = jsonData.marcacionInfo;
                   $("#lbQueHacer").append($scope.marcacionInfo.QueHacerHtml);
                   SetTextCodigosCierre($scope.marcacionInfo.Subrazon);


               });

           };


           function SetTextCodigosCierre(subrazon) {
               $("#lbCodigosCierre").empty();
               $.ajax({
                   type: "POST",
                   url: "Marcaciones/CodigosDeCierre",
                   contentType: "application/json; charset=utf-8",
                   data: JSON.stringify({ submarcacion: subrazon }),
                   dataType: "json",
                   success: function (result) {
                       var json = JSON.parse(result);

                       for (var i = 0; i < json.length; i++) {
                           $("#lbCodigosCierre").append("-" + json[i] + "</br>")
                       }
                   },
                   error: function (request, status, error) {
                       alert(request.responseText + " " + status + "  " + error);
                   }

               });

           }
         

       })




  