$(document).ready(function () {

    CargarArboles();

});

function CargarArboles() {
    $.ajax({
        type: "POST",
        url: urlListaArboles,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(result);
            CargaArbolesGrilla(json);

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    
}

function CargaArbolesGrilla(data)
{
    $("#GridArboles").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "Arboles.xlsx",
            allPages: true
        },
        dataSource: {
            data: data,
            pageSize: 10,
            schema: {
                model: {

                }
            },
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
            { command: { text: "Edit", click: EditaArbol, imageClass: "k-icon k-i-pencil", }, title: "Editar", width: "90px" },
            { field: "Id", title: "Id", headerAttributes: { style: "white-space: normal" }, width: 80 },
       { field: "NombreArbol", title: "Nombre Árbol", headerAttributes: { style: "white-space: normal" }, width: 150 },
            //{ field: "CodigoHtml", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Estado", title: "Estado", headerAttributes: { style: "white-space: normal" }, width: 150 }, 
       
        ]
    });
}

function EditaArbol(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../Procesos/EditarArbol?IdArbol=' + dataItem.Id;

}