﻿
$(document).ready(function () {
    ListaDeArboles();
});

function ListaDeArboles() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var IdPadre = $('#IdPadre').val();
    $.ajax({
        type: "POST",
        url: urlListaArbolesActualesAdmin,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
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
    $("#gridViewConsultaArbolesMidas").kendoGrid({
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
        { command: { text: " Editar", click: ActualizarProceso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "50px" },
        { command: { text: "Dependencia", click: ActualizarProceso2, imageClass: "fa fa-fw fa-plus-square text-green", }, title: "Agregar", width: "70px" },
        { field: "IdArbol", title: "Id Arbol", width: 50 },
        { field: "IdPadre", title: "Id Padre", width: 50 },
        { field: "Descripcion", title: "Descripcion", width: 200 },
        { field: "EstadoArbol", title: "Estado Arbol", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    //e.preventDefault();
    //var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //window.location.href = 'AdministrarArboles?IdPadre=' + dataItem.IdPadre + '&IdArbol=' + dataItem.IdArbol;

};

function ActualizarProceso2(e) {
    //e.preventDefault();
    //var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    //window.location.href = 'ListaArboles?IdPadre=' + dataItem.IdArbol;

};