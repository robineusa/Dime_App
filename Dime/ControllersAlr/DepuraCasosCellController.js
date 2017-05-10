﻿angular
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


           $scope.ChangeOnStateCase = function () {
               if ($scope.ingreso.IdEstado == "1") {
                   $scope.optionsAEscalar = [
                 { name: "CÉLULA AJUSTES", id: "CELULA AJUSTES" },
                 { name: "CÉLULA FACTURACION Y CARTERA", id: "CELULA FACTURACION Y CARTERA" },
                 { name: "CÉLULA OPERACIONES", id: "CELULA OPERACIONES" },
                 { name: "CÉLULA PQR", id: "CELULA PQR" },
                 { name: "CÉLULA ALTO VALOR", id: "CELULA ALTO VALOR" },
                 { name: "CÉLULA ALTO VALOR VIP", id: "CELULA ALTO VALOR VIP" }
                   ];
                   $scope.ingreso.NombreLineaEscalado = "CELULA AJUSTES";
               } else {
                   $scope.optionsAEscalar = [
                        { name: "", id: "" }, ];
                   $scope.ingreso.NombreLineaEscalado = $scope.optionsAEscalar[0];


               }

               if ($scope.ingreso.IdEstado.id == "3") {
                   $scope.optionsRazonSoporte = [];
                   $scope.optionsRazonSoporte.push({ name: "Seguimiento", id: 8 });
               } else {
                   SetRazonesSoporteDDL();
               }


           };
       

           $http.get(appPath + 'CasosCelula/AccesoACaso', {
               params: {
                   idIngreso: $routeParams.idIngreso
               }
           }).then(function (data) {
               var jsonData = JSON.parse(data.data);
               if (jsonData == false) {

                   $scope.CASO_ASIGNADO = "TRUE";
                   $('#labelMessage').text("Este caso ya ha sido asignado a otra Celula.");
               }else{

                   $scope.CASO_ASIGNADO = "FALSE";
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
                          cambiarfechas(jsonData);
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
               { name: "NO", id: "NO" },
               { name: "SI", id: "SI" },
           ];




           $scope.SubmitForm = function () {
               if ($scope.ingresoSoporte.TipoSegumiento == "Programacion de visita tecnica") {
                   $scope.ingresoSoporte.TipoSegumiento = "CELULA VISITA SOPORTE";
               }
               if ($scope.ingresoSoporte.TipoSegumiento == "Seguimiento por CCAA") {
                   $scope.ingresoSoporte.TipoSegumiento = "CELULA SEGUIMIENTO SOPORTE";
               }

                $http.post(appPath + 'CasosCelula/SubmitDataDepuraCasos', {
                       ingreso: $scope.ingreso,
                       observaciones: $scope.tbObservaciones,
                       aplicaRechazo: $scope.selectedAplicaRechazo.id,
                       razonRechazo: $scope.razonRechazo,
                       ingresoSoporte: $scope.ingresoSoporte,
                       razonSoporte: ($scope.Razon == null) ? "" : $scope.Razon.name,
                       subrazon1Soporte: ($scope.Subrazon1 == null) ? "" : $scope.Subrazon1.name,
                       subrazon2Soporte: ($scope.Subrazon2 == null) ? "" : $scope.Subrazon2.name
               }).then(function (data) {
                   $("#labelMessage").text(data.data);
                   window.location.href = 'CasosCelula/CasosAbiertos';
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

           function cambiarfechas(data) {
               for (var i = 0; i < data.length; i++) {
                   data[i].FechaNota = kendo.toString(kendo.parseDate(data[i].FechaNota, 'yyyy-MM-dd'), 'yyyy-MM-dd');
                   data[i].HoraNota = kendo.toString(kendo.parseDate(data[i].HoraNota, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');
                   //data[i].Ingreso.HoraUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].Ingreso.HoraUltimaActualizacion, 'HH:mm:ss'), 'HH:mm:ss');
               }

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
                   },
                   columns: [

                    { field: "CuentaCliente", title: "Cuenta", width: 50, headerAttributes: { style: "white-space: normal" } },
                    { field: "FechaNota", title: "Fecha Nota", width: 70, headerAttributes: { style: "white-space: normal" } },
                    { field: "HoraNota", title: "Hora Nota", width: 40, headerAttributes: { style: "white-space: normal" }, filterable: false },
                    { field: "IdEstado", title: "Estado", width: 70, headerAttributes: { style: "white-space: normal" } },
                    { field: "IdIngreso", title: "Id Ingreso", width: 50, headerAttributes: { style: "white-space: normal" } },
                    { field: "LlamadaCliente", title: "Llamada Cliente", width: 40, headerAttributes: { style: "white-space: normal" } },
                    { field: "NombreLineaNota", title: "Nombre Linea Nota", width: 90, headerAttributes: { style: "white-space: normal" } },
                    { field: "Nota", title: "Nota", width: 310, headerAttributes: { style: "white-space: normal" } },
                    { field: "PerfilUsuario", title: "Perfil Usuario", width: 60, headerAttributes: { style: "white-space: normal" } },
                    { field: "Ticket", title: "Ticket", width: 70, filterable: false },
                    { field: "Usuario", title: "Usuario", width: 60, headerAttributes: { style: "white-space: normal" } },
                    
                    //{ field: "HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
                  /*  { field: "UsuarioApertura", title: "Usr Apertura", width: 100 },
                    { field: "HoraUltimaActualizacion", title: "Fe. Ult Actualización", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
                    { field: "UsuarioUltimaActualizacion", title: "Usr. Ult Actualización", width: 120 },
                    { field: "Macroproceso", title: "Macroproceso", width: 100 },
                    { field: "Marcacion", title: "Marcación", width: 100 },
                    { field: "IdEstado", title: "Estado", width: 100 },
                   { field: "Semaforo", title: "Semaforo", width: 80 }*/
                   ]
               });


               var grid = $("#tablaHistorial").data("kendoGrid");
     
               var dsSort = [];
               dsSort.push({ field: "HoraNota", dir: "desc" });
               grid.dataSource.sort(dsSort);
           };


           function SetEstadoUltimoCaso()
           {


           }


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
               $scope.ingreso.IdEstado = String(json[0].IdEstado);
               if (String(json[0].IdEstado) == "1")
                   $scope.ingreso.NombreLineaEscalado = json[0].NombreLineaEscalado;
               else $scope.ChangeOnStateCase();
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




  