
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
    $("#gridTipificaciones").kendoGrid({
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
              { text: "Editar", click: ActualizarTipificacion, imageClass: "k-icon k-i-pencil", },
              { text: "Eliminar", click: EliminarTipificacion, imageClass: "k-icon k-i-delete", }
            ], title: "Acciones", width: "80px"
        },
        { field: "Id", title: "Cod", width: 40 },
        { field: "Nombre", title: "Nombre", width: 120 },
        { field: "Activo", title: "Activo", width: 55, },
        { field: "Nivel1", title: "Contencion", width: 70 },
        { field: "Nivel2", title: "Retencion", width: 65 },
        { field: "Nivel3", title: "Recuperacion", width: 80 },
        { field: "Registro", title: "F. Actualizado", width: 90, type: 'date', format: "{0:dd/MM/yyyy HH:mm}", },
        ]

    });
}

ActualizarTipificacion = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarTipificacion?id=' + dataItem.Id;
}
EliminarTipificacion = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EliminarTipificacion?id=' + dataItem.Id;
}