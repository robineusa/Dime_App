﻿
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: urlListaKendo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            //console.log(json);
            ShowGrid(json);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
});

function ShowGrid(data) {
    $("#gridSubmotivos").kendoGrid({
        autoBind: true,
        dataSource: {
            data: data,
            pageSize: 10,
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
        {
            command: [
              { text: "Editar", click: ActualizarSubmotivo, imageClass: "k-icon k-i-pencil", },
              { text: "Elimiar", click: EliminarSubmotivo, imageClass: "k-icon k-i-delete", }
            ], title: "Acciones", width: "70px"
        },
        { field: "Id", title: "Codigo", width: 50 },
        { field: "Submotivo", title: "Submotivo", width: 120 },
        { field: "Registro", title: "Creacion", width: 90, type: 'date', format: "{0:dd/MM/yyyy HH:mm}", },
        { field: "NombreMotivo", title: "Motivo", width: 110 },
        ]

    });
}

ActualizarSubmotivo = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarSubmotivoCancelacion?id=' + dataItem.Id;
}
EliminarSubmotivo = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EliminarSubmotivoCancelacion?id=' + dataItem.Id;
}