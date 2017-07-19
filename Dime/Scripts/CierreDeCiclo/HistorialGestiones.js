$(document).ready(function () {
    console.log(predictivoModel);
    ShowGridGestiones(predictivoModel);

});



function ShowGridGestiones(data) {

    $("#gridViewResult").kendoGrid({

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
       { field: "Id", title: "Id", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Nombre", title: "Cliente", width: 100, headerAttributes: { style: "white-space: normal" } },
       { field: "MarcacionBd", title: "Macro proceso", width: 100, headerAttributes: { style: "white-space: normal" } },
       { field: "ProblemaDelEdificio", title: "Detalle Marcaciòn", width: 70, headerAttributes: { style: "white-space: normal" } },
       { field: "MarcacionBdIi", title: "Cargado", width: 70, headerAttributes: { style: "white-space: normal" } },
       { field: "EstadoInicial", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Verificado", title:"Opción", template: '#if (Verificado == false) { # <button value="asd" class="verificacion">Verificar</button> # } #'  }
          ]

    });

}



function ActualizarCaso(e) {
    e.preventDefault();
    var cuentaActual = $("#inputCuenta").val();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../Inbound/Actualizar?id=' + dataItem.Ingreso.IdIngreso + "&nombMarcacion=" + dataItem.Ingreso.Marcacion;
}