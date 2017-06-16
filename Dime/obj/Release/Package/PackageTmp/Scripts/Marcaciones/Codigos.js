CodigosGrid();

function CodigosGrid(){
    console.log(listaCodigos);
    $("#codigosGridView").kendoGrid({
        dataSource: {
            data: listaCodigos,
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
        { command: { text: "Editar", click: ActualizarCodigoCierre, imageClass: "k-icon k-i-pencil", }, title: "Actualizar", width: "80px" },
       { field: "Id", title: "Id", width: 50 },
       { field: "CodigoCierre", title: "Código Cierre", width: 150 },
       { field: "Clase", title: "Clase", width: 150 },
       { field: "CodigoRr", title: "Codigo RR", width: 150 },
       { field: "Producto", title: "Producto", width: 130 },
       { field: "Razon", title: "Razon", width: 150 },
       { field: "SubRazon", title: "Subrazón", width: 150 },
       { field: "ReporteSic", title: "Reporte SIC", width: 150 },
       { command: { text: " ", click: EliminarCodigoCierre, imageClass: "fa fa-fw fa-trash-o", }, title: "Eliminar", width: "70px" },
        ]
    });

}

function ActualizarCodigoCierre(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AgregarActuCodigoCierre?idCierre=' + dataItem.Id;

};

function EliminarCodigoCierre(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EliminarCodigoCierre?id=' + dataItem.Id

};