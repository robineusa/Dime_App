angular
       .module('dimeApp')
       .controller('AdminCasosController', function ($scope, $routeParams, $http) {


           $scope.optionsAEscalar = [
         { name: "-Seleccione-", id: "0" },
        { name: "CÉLULA AJUSTES", id: "CELULA AJUSTES" },
        { name: "CÉLULA AJUSTES", id: "CELULA AJUSTES" },
        { name: "CÉLULA FACTURACION Y CARTERA", id: "CELULA FACTURACION Y CARTERA" },
        { name: "CÉLULA OPERACIONES", id: "CELULA OPERACIONES" },
        { name: "CÉLULA PQR", id: "CELULA PQR" },
        { name: "CÉLULA ALTO VALOR", id: "CELULA ALTO VALOR" },
        { name: "CÉLULA ALTO VALOR VIP", id: "CELULA ALTO VALOR VIP" }
           ];


           $scope.optionsEstados = [
                 { name: "-Seleccione-", id: "0" },
          { name: "ABIERTO", id: "1" },
          { name: "CERRADO", id: "2" },
          { name: "SEGUIMIENTO", id: "3" }
           ];


           CargarOpcionesCambiarCelula();
           CargarInformacionBasicaDeCaso();
           $scope.NombreLineaEscalado = $scope.optionsAEscalar[0];

           $scope.IdEstado = $scope.optionsEstados[0];

           function CargarOpcionesCambiarCelula() {
               $http.get(appPath + 'CasosAdmin/GetUsuariosCelula')
                    .then(function (data) {
                        var jsonData = JSON.parse(data.data);
                        DarOpcionesUsuariosCelula(jsonData);
                    });
           };
           function DarOpcionesUsuariosCelula(data) {
               $scope.optionsUsuariosCelula = [];
               $scope.optionsUsuariosCelula.push({ name: "-Seleccione-", id: "0" });
               for (var i = 0; i < data.length; i++) {
                   $scope.optionsUsuariosCelula.push({ name: data[i].Nombre, id: data[i].Id });
               }

               $scope.UsuarioBackoffice = $scope.optionsUsuariosCelula[0];
           };




           function CargarInformacionBasicaDeCaso() {
               $http.get(appPath + 'CasosAdmin/GetInfoCaso', {
                   params: {
                       idIngreso: $routeParams.idIngreso
                   }
               })
                  .then(function (data) {
                      var jsonData = JSON.parse(data.data);
                      $scope.ingreso = jsonData;
                  });

           }



           $scope.GuardarCambioCaso = function () {
               $scope.cambioHecho = "";
               if ($scope.Checked == 3) {
                   $scope.cambioHecho = "ESTADO";

               }
               else {
                   if ($scope.Checked == 2) {
                       $scope.cambioHecho = "USUARIO";

                   } else {
                       if ($scope.Checked == 1) {
                           $scope.cambioHecho = "ESCALAR";
                       } else { alert("Seleccione una Modificación a Realizar"); }
                   }
               }
               if ($scope.cambioHecho != "") {
                   if ($scope.notas != undefined) {
                       if ($scope.cambioHecho == "ESCALAR" && $scope.NombreLineaEscalado.id != 0) {
                           $http.post(appPath + 'CasosAdmin/GuardarCambioIngreso', {
                               ingreso: $scope.ingreso,
                               notas: $scope.notas,
                               cambioHecho: $scope.cambioHecho,
                               lineaEscalado: $scope.NombreLineaEscalado.id,
                               usuarioCambiado: $scope.UsuarioBackoffice.id,
                               estadoNuevo: $scope.IdEstado.id
                           }).then(function (data) {
                               //$("#labelMessage").text(data.data);
                               alert((data.data).toString());
                               window.location.href = "../Consultas/ConsultaCasosAbiertos";
                           });
                       } else {
                           if ($scope.cambioHecho == "ESTADO" && $scope.IdEstado.id != 0) {
                               $http.post(appPath + 'CasosAdmin/GuardarCambioIngreso', {
                                   ingreso: $scope.ingreso,
                                   notas: $scope.notas,
                                   cambioHecho: $scope.cambioHecho,
                                   lineaEscalado: $scope.NombreLineaEscalado.id,
                                   usuarioCambiado: $scope.UsuarioBackoffice.id,
                                   estadoNuevo: $scope.IdEstado.id
                               }).then(function (data) {
                                   //$("#labelMessage").text(data.data);
                                   alert((data.data).toString());
                                   window.location.href = "../Consultas/ConsultaCasosAbiertos";
                               });
                           } else {
                               if ($scope.cambioHecho == "USUARIO" && $scope.UsuarioBackoffice.id != 0) {
                                   $http.post(appPath + 'CasosAdmin/GuardarCambioIngreso', {
                                       ingreso: $scope.ingreso,
                                       notas: $scope.notas,
                                       cambioHecho: $scope.cambioHecho,
                                       lineaEscalado: $scope.NombreLineaEscalado.id,
                                       usuarioCambiado: $scope.UsuarioBackoffice.id,
                                       estadoNuevo: $scope.IdEstado.id
                                   }).then(function (data) {
                                       //$("#labelMessage").text(data.data);
                                       alert((data.data).toString());
                                       window.location.href = "../Consultas/ConsultaCasosAbiertos";
                                   });
                               } else { alert("Seleccione una Célula, UsuarioBack o Estado según corresponda"); }
                           }
                       }
                       
                       

                   } else { alert("Digite una Nota"); }
               } else { }

           }





       })