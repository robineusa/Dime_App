$(document).ready(function () {
    ListaSubrazones();

});

function ListaSubrazones() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var IdGestion = $('#IdGestion').val();
    $.ajax({
        type: "GET",
        url: UrlListaSubrazones,
        contentType: "application/json; charset=utf-8",
        data: { IdGestion: IdGestion },
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
        { command: { text: "Editar", click: ActualizarProceso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "90px" },
        { field: "IdSubrazon", title: "Id Subrazon", width: 100 },
        { field: "IdGestion", title: "Id Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "EstadoFinal", title: "Estado Gestión", width: 100 },
        { field: "Estado", title: "Estado", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AdministrarSubrazones?IdSubrazon=' + dataItem.IdSubrazon + '&IdGestion=' + dataItem.IdGestion;

};
