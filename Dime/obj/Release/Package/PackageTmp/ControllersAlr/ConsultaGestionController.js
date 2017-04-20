angular
    .module('dimeApp')
    .controller('ConsultaGestionController', function ($scope, $http) {
        $scope.dataLoading = false;
        $scope.aliados = null;
        $http.get(appPath + 'ConsultasAdmin/JsonAliadosNames')
                        .then(function (data) {
                            $scope.aliados = JSON.parse(data.data);
                        });

        $scope.LoadTable = function () {
            $scope.dataLoading = true;
            $http.get(appPath + 'ConsultasAdmin/JsonListaGestionAdmin', {
                params: {
                    fechaInicio: $scope.dateIniString,
                    fechaFin: $scope.dateFinString,
                    aliado: $scope.selectedAliado
                }
            }).then(function (data) {
                var json = JSON.parse(data.data);
                CargarGridDefault(json);
            }, function (error, status) {
                alert("error:" + error + " " + "status: " + status);
            }).finally(function () {
                $scope.dataLoading = false;
            });
        };






        function CargarGridDefault(data) {
            $("#gridViewConsulta").empty();
            function cambiarfechas() {
                for (var i = 0; i < data.length; i++) {
                    data[i].fechaInicio = kendo.toString(kendo.parseDate(data[i].fechaInicio, 'yyyy-MM-dd'), 'yyyy-MM-dd');
                    data[i].FechaApertura = kendo.toString(kendo.parseDate(data[i].FechaApertura, 'yyyy-MM-dd'), 'yyyy-MM-dd');
                    data[i].FechaCierre = kendo.toString(kendo.parseDate(data[i].FechaCierre, 'yyyy-MM-dd'), 'yyyy-MM-dd');
                    data[i].FechaNota = kendo.toString(kendo.parseDate(data[i].FechaNota, 'yyyy-MM-dd'), 'yyyy-MM-dd');
                    data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-dd'), 'yyyy-MM-dd');
                    //data[i].HoraApertura = kendo.toString(kendo.parseDate(data[i].HoraApertura, 'HH:mm:ss'), 'HH:mm:ss');
                    //data[i].HoraUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].HoraUltimaActualizacion, 'HH:mm:ss'), 'HH:mm:ss');
                    data[i].FechaInicio = kendo.toString(kendo.parseDate(data[i].FechaInicio, 'yyyy-MM-dd'), 'yyyy-MM-dd');

                }

            }
            if (data != null) {
                cambiarfechas();
            }
            $("#gridViewConsulta").kendoGrid({
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
            { field: "AliadoApertura", title: "Aliado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CuentaCliente", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaApertura", title: "Fecha Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaCierre", title: "Fecha Cierre", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaNota", title: "Fecha Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "HoraApertura", title: "Hora Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "HoraUltimaActualizacion", title: "Hora Ultima Actualizacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdEstado", title: "Id Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Marcacion", title: "Marcacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreLineaEscalado", title: "Nombre Linea Escalado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreLineaIngreso", title: "Nombre Linea Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Nota", title: "Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Ticket", title: "Ticket", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Usuario", title: "Usuario", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioCierre", title: "Usuario Cierre", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioUltimaActualizacion", title: "Usuario Ultima Actualizacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaInicio", title: "Fecha Inicio", width: 80, headerAttributes: { style: "white-space: normal" } },
                ]

            });

        }

    })