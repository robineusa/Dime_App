﻿$(document).ready(function () {
    ListaDeOperaciones();

});

function ListaDeOperaciones() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: UrlListaDeOperaciones,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        dataSource: {
            data: data,
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
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
        { command: { text: "Editar", click: ActualizarProceso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "90px" },
        { field: "IdOperacion", title: "Id Operacion", width: 100 },
        { field: "NombreGerencia", title: "Nombre Gerencia", width: 100 },
        { field: "NombreAliado", title: "Nombre Aliado", width: 100 },
        { field: "NombreOperacion", title: "Nombre Operacion", width: 100 },
        { field: "Estado", title: "Estado", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AdministrarOperaciones?IdOperacion=' + dataItem.IdOperacion;

};
