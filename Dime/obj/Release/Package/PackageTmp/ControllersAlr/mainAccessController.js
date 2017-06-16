angular
    .module('dimeApp')
    .controller('mainAccessController', function ($scope, $http) {
        $scope.hello = "hello world";

        $scope.getType = function (x) {
            return typeof x;
        };
        $scope.isDate = function (x) {
            return x instanceof Date;
        };

        $scope.GetDataConvenioElectro = function () {
            $.ajax({
                type: "POST",
                url: appPath+"ConsultasAdmin/JsonConvenioElectronico",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ fechaInicio: $scope.dateIniString, fechaFin: $scope.dateFinString }),
                dataType: "json",
                success: function (result) {
                    var json = JSON.parse(result);
                    CargarGridDefault(json);
                }
            });
        }


        $scope.GetDataClaroVideo = function () {

            $http.get(appPath+'ConsultasAdmin/JsonClaroVideo', {
                params: {
                    fechaInicio: $scope.dateIniString,
                    fechaFin:  $scope.dateFinString
                }
            }).then(function (data) {
                var json = JSON.parse(data.data);
                CargarGridDefault(json);
            }, function (error, status) {
                console.log(error);
                alert("error:" + error + " "+ "status: "+ status);
            })

        }

        $scope.GetDocsisOverlap = function () {
            $http.get(appPath+'ConsultasAdmin/JsonDocsisOverlap', {
                params: {
                    fechaInicio: $scope.dateIniString,
                    fechaFin: $scope.dateFinString
                }
            }).then(function (data) {
                var json = JSON.parse(data.data);
                CargarGridDefault(json);
            }, function (error, status) {
            
            })

        }

        $scope.GetDataCierreCiclo = function () {
            $http.get(appPath + 'ConsultasAdmin/JsonCierreCiclo', {
                params: {
                    fechaInicio: $scope.dateIniString,
                    fechaFin: $scope.dateFinString
                }
            }).then(function (data) {
                var json = JSON.parse(data.data);
                CargarGridDefaultCierreCiclo(json);
            }, function (error, status) {

            })


        }


        function CargarGridDefault(data)
        {
            RemoveEmptyFieldsOfJsonArray(data)
            $("#gridViewConsulta").empty();
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
                }

            });

        }

        function CargarGridDefaultCierreCiclo(data) {
            $("#gridViewConsulta").empty();
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
                { field: "Id", title: "Id Iteracion", width: 70 },
                { field: "FechaGestion", title: "Fecha Gestion", width: 80, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #" },
                { field: "UsuarioGestion", title: "Usuario Gestión", width: 110 },
                { field: "AliadoGestion", title: "Aliado Gestión", width: 80 },
                { field: "Cuenta", title: "Cuenta", width: 80 },
                { field: "Ofrecimiento1", title: "Ofrecimiento 1", width: 80 },
                { field: "Ofrecimiento2", title: "Ofrecimiento 2", width: 80 },
                { field: "Ofrecimiento3", title: "Ofrecimiento 3", width: 80 },
                { field: "PServicio1", title: "Telefonía", width: 80 },
                { field: "PServicio2", title: "Televisión Análoga", width: 80 },
                { field: "PServicio3", title: "Televisión Avanzada", width: 80 },
                { field: "PServicio4", title: "Televisión Básica", width: 80 },
                { field: "PServicio5", title: "Televisión Satelital", width: 80 },
                { field: "PServicio6", title: "Upgrade Televisión", width: 80 },
                { field: "PServicio7", title: "Upgrade Internet", width: 80 },
                { field: "PServicio8", title: "Internet 3 Megas", width: 80 },
                { field: "PServicio9", title: "Internet 5 Megas", width: 80 },
                { field: "PServicio10", title: "Internet 10 Megas", width: 80 },
                { field: "PServicio11", title: "Internet 20 Megas", width: 80 },
                { field: "PServicio12", title: "Internet 50 Megas", width: 80 },
                { field: "PServicio13", title: "Internet 100 Megas", width: 80 },
                { field: "PServicio14", title: "Claro Video", width: 80 },
                { field: "PServicio15", title: "Fox +", width: 80 },
                { field: "PServicio16", title: "Golden Premier HD", width: 80 },
                { field: "PServicio17", title: "HBO", width: 80 },
                { field: "PServicio18", title: "HD", width: 80 },
                { field: "PServicio19", title: "Hot Pack", width: 80 },
                { field: "PServicio20", title: "Internet Móvil 1.5", width: 80 },
                { field: "PServicio21", title: "Internet Móvil 750", width: 80 },
                { field: "PServicio22", title: "Ip Fija", width: 80 },
                { field: "PServicio23", title: "Local Extendida", width: 80 },
                { field: "PServicio24", title: "Macafee", width: 80 },
                { field: "PServicio25", title: "Mini Fox", width: 80 },
                { field: "PServicio26", title: "Mini HBO", width: 80 },
                { field: "PServicio27", title: "Modem Adicional", width: 80 },
                { field: "PServicio28", title: "PVR", width: 80 },
                { field: "PServicio29", title: "PVR + HD", width: 80 },
                { field: "PServicio30", title: "Revista 15 Min.", width: 80 },
                { field: "PServicio31", title: "Segundo Módem", width: 80 },
                { field: "PServicio32", title: "UFC Network", width: 80 },
                { field: "PServicio33", title: "VOD", width: 80 },
                { field: "PServicio34", title: "Elegido Fijo Móvil", width: 80 },
                { field: "PServicio35", title: "Claro Video", width: 80 },
                { field: "PServicio36", title: "Convenio Electrónico", width: 80 },
                { field: "TipoContacto", title: "Tipo Contacto", width: 160 },
                { field: "Gestion", title: "Gestión", width: 110 },
                { field: "Cierre", title: "Cierre", width: 80 },
                { field: "Razon", title: "Razon", width: 120 },
                { field: "Obervaciones", title: "Obervaciones", width: 80 },
                { field: "Base", title: "Base", width: 160 },
                { field: "OperacionGestion", title: "Operacion Gestión", width: 110 },
                { field: "Motivo", title: "Motivo", width: 80 },
                { field: "Seguimiento", title: "Seguimiento", width: 80 },
                { field: "Obervaciones", title: "Obervaciones", width: 80 },
                { field: "FechaSeguimiento", title: "Fecha Seguimiento", width: 80, template: "#= kendo.toString(kendo.parseDate(FechaSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #" }

                ]

            });

        }



    })