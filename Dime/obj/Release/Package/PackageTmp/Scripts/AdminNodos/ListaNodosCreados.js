
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: urlListaKendo,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            if (json != null) {
                cambiarfechas(json);

            }


            ShowGrid(json);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
});


function cambiarfechas(jsonMNodos) {
    for (var i = 0; i < jsonMNodos.length; i++) {
        jsonMNodos[i].FechaCreacion = kendo.toString(kendo.parseDate(jsonMNodos[i].FechaCreacion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}




function ShowGrid(data)
{
    $("#gridViewNodos").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "Export.xlsx",
        },
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
        { command: { text: "Editar", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "90px" },
        { field: "IdNodo", title: "Id Nodo", width: 100 },
        { field: "Nodo", title: "Nodo", width: 150 },
        { field: "NombreNodo", title: "Nombre Nodo", width: 100 },
        { field: "Div", title: "Div", width: 50 },
        { field: "Com", title: "Com", width: 50 },
        { field: "Divisional", title: "Divisional", width: 80 },
        { field: "Area", title: "Area", width: 50 },
        { field: "Distrito", title: "Distrito", width: 70 },
        { field: "Ugestion", title: "Ugestion", width: 70 },
        { field: "Usuario", title: "Usuario", width: 100 },
        { field: "FechaCreacion", title: "Fecha Creacion", width: 150 },
        { field: "Estado", title: "Estado", width: 50 },
        { field: "Red", title: "Red", width: 100 },
        { field: "Aliado", title: "Aliado", width: 100 },
        { field: "NombreComunidad", title: "Nombre Comunidad", width: 100 },
        { field: "Departamento", title: "Departamento", width: 100 }
        ]

    });
}





function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarNodo?id=' + dataItem.IdNodo;
}