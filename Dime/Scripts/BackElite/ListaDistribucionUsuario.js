$("#CedulaUsuario").blur(function (event) {
    event.preventDefault();
    ListaProcesos();
});

function ListaProcesos() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Cedula = $("#CedulaUsuario").val();
    if (Cedula == "" ||Cedula == null ) { Cedula = 0; } else { }
    $.ajax({
        type: "GET",
        url: UrlListaProcesosAsignadosUsuarioJson,
        contentType: "application/json; charset=utf-8",
        data: { Cedula: Cedula},
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
        { command: { text: "Eliminar", click: ActualizarProceso, imageClass: "ion-trash-a", }, title: "Eliminar", width: "90px" },
        { field: "Id", title: "Id", width: 100 },
        { field: "TipoEscalamientoAsignado", title: "Tipo De Escalamiento Asignado", width: 400 }
        ]

    });
}

function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AdministrarDistrubucionBackElite?Id=' + dataItem.Id;

}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}