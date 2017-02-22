angular
    .module('dimeApp')
    .controller('ConsultaGestionController', function ($scope, $http) {

        $scope.aliados = null;
        $http.get(appPath + 'ConsultasAdmin/JsonAliadosNames')
                        .then(function (data) {
                            $scope.aliados = JSON.parse(data.data);
                        });

        $scope.LoadTable = function () {

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
            })
        };



   


        function CargarGridDefault(data) {
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

    })