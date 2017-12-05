
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
    $("#gridRecursiva").kendoGrid({
        autoBind: true,
        dataSource: {
            data: data,
            pageSize: 10,
            group: { field: "Padre" },
        },
        groupable: true,
        scrollable: false,
        filterable: {
            extra: false,
            operators: {
                string: {

                    contains: 'Contiene',
                    eq: "Igual a",
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
        { command: { text: "Editar", click: ActualizarRecursiva, imageClass: "k-icon k-i-pencil", }, title: "Acciones", width: "70px" },
        { field: "Id", title: "Cod", width: 40 },
        { field: "Nombre", title: "Nombre", width: 120 },
        { field: "ParentName", title: "Padre", width: 65 },
        { field: "Nivel", title: "Nivel", width: 55, },
        { field: "VerNivel", title: "Niveles", width: 55, },
        { field: "Label", title: "Etiqueta", width: 70 },
        ]

    });
}

ActualizarRecursiva = function (e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarRecursiva?id=' + dataItem.Id;
}