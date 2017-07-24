$(document).ready(function () {
    ListaProcesos();

});

function ListaProcesos() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Id = $('#IdProceso').val();
    $.ajax({
        type: "GET",
        url: ListaProcesosMecAdmin,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdProceso: Id }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        dataSource: {
            data: data,
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
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
        { command: { text: "Editar", click: ActualizarProceso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "60px" },
        { field: "IdAlarma", title: "Id Alarma", width: 100 },
        { field: "IdProceso", title: "Id Proceso", width: 100 },
        { field: "NombreAlarma", title: "Nombre Tipo de Alarma", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AgregarNuevoProceso?IdProceso=' + dataItem.IdProceso;

};
