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
       { field: "Id", title: "Id", width: 40, headerAttributes: { style: "white-space: normal" } },
       { field: "Cuenta", title: "Cuenta", width: 60, headerAttributes: { style: "white-space: normal" } },
       { field: "Nombre", title: "Cliente", width: 100, headerAttributes: { style: "white-space: normal" } },
       { field: "MarcacionBd", title: "Macro proceso", width: 90, headerAttributes: { style: "white-space: normal" } },
       { field: "ProblemaDelEdificio", title: "Detalle Marcaciòn", width: 130, headerAttributes: { style: "white-space: normal" } },
       { field: "MarcacionBdIi", title: "Cargado", width: 110, headerAttributes: { style: "white-space: normal" } },
       { field: "EstadoInicial", title: "Estado", width: 50, headerAttributes: { style: "white-space: normal" } },
       { field: "Verificado", title: "Opción", width: 70, template: '#if (Verificado == false) { # <button  class="k-button info"  onClick="ActualizarCaso(event);">Verificar</button> # } #' }
          ]

    });

}



    function ActualizarCaso(e) {
        e.preventDefault();
        var dataRow = $(e.currentTarget).closest("tr");
        var data = $("#gridViewResult").data("kendoGrid").dataItem(dataRow);
        var IdSelected = data.Id;
        var macroproceso = data.MarcacionBd;
        window.location.href = 'ResidencialPredictivoTipificador?idTip=' + IdSelected + "&macro=" + macroproceso;
    }
