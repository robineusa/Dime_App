$(document).ready(function () {
    ListaDeEquipos();

});

function ListaDeEquipos() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Id = $('#IdSolicitud').val();
    $.ajax({
        type: "GET",
        url: UrlListaDeEquipos,
        contentType: "application/json; charset=utf-8",
        data: { IdSolicitud: Id },
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
        { command: { text: "Editar", click: ActualizarCaso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "50px" },
        { command: { text: "Eliminar", click: EliminarCaso, imageClass: "ion-trash-a", }, title: "Eliminar", width: "50px" },
        { field: "Id", title: "Id", width: 60 },
        { field: "IdSolicitud", title: "Id Solicitud", width: 60 },
        { field: "TipoDeEquipo", title: "Tipo De Equipo", width: 100 },
        { field: "Mac", title: "TMac", width: 100 },
        { field: "Tarjeta", title: "Tarjeta", width: 100 }        
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function EliminarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    EliminarEquipos(dataItem);
};

function EliminarEquipos(data) {
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlEliminarEquipo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdRegistro: data.Id }),
        dataType: "json",
        success: function (result) {
            window.location.href = 'EquiposPorSolicitud?IdSolicitud=' + data.IdSolicitud;
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AdministrarEquipos?IdSolicitud=' + dataItem.IdSolicitud + '&IdEquipo=' + dataItem.Id;

};
