
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: urlListaKendo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            ShowGrid(json);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
});

function ShowGrid(data) {
    $("#gridMotivos").kendoGrid({
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
              { text: "Editar", click: ActualizarMotivo, imageClass: "k-icon k-i-pencil" },
              { text: "Eliminar", click: EliminarMotivo, imageClass: "k-icon k-i-delete" },
            ], title: "Acciones", width: "70px"
        },
        { field: "Id", title: "Codigo", width: 50 },
        { field: "Motivo", title: "Motivo Cancelacion", width: 120 },
        { field: "Registro", title: "Creacion", width: 90, type: 'date', format: "{0:dd/MM/yyyy HH:mm}", },
        { field: "OtrosCampos", title: "Campos Adicionales", width: 110 },
        { field: "OtrosOfrecimientos", title: "Ver Otros Ofrecimientos", width: 120 },
        ]

    });
}

ActualizarMotivo = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarMotivoCancelacion?id=' + dataItem.Id;
}
EliminarMotivo = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EliminarMotivos?id=' + dataItem.Id;
}