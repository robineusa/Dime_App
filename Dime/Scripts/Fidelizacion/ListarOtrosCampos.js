
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
    $("#gridOtrosCampos").kendoGrid({
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
              { text: "Editar", click: ActualizarCampos, imageClass: "k-icon k-i-pencil" },
              { text: "Eliminar", click: EliminarCampos, imageClass: "k-icon k-i-delete" },
            ], title: "Acciones", width: "70px"
        },
        { field: "Id", title: "Codigo", width: 50 },
        { field: "Nombre", title: "Campo", width: 120 },
        { field: "Tipo", title: "Tipo", width: 70 },
        { field: "Opciones", title: "Opciones", width: 90 },
        { field: "Nivel", title: "Aplica Nivel", width: 110 },
        ]

    });
}

ActualizarCampos = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarOtrosCampos?id=' + dataItem.Id;
}
EliminarCampos = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EliminarOtrosCampos?id=' + dataItem.Id;
}