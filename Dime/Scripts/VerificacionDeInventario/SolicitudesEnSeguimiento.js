$(document).ready(function () {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: UrlListaSeguimientoInventario,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);

            if (json != null) {


            }
                EjecutarConsultas(json);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
});
function EjecutarConsultas(data) {
    cambiarfechas(data);
    ShowGrid(data);
    finalizaconsulta();
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaSolicitud = kendo.toString(kendo.parseDate(data[i].FechaSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        
    }

}
function ShowGrid(data) {
    $("#gridviewseguimientosbackelite").kendoGrid({
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
        { command: { text: "Editar", click: ActualizarCaso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "90px" },
        { field: "IdSolicitud", title: "Id Solicitud", width: 100 },
        { field: "FechaSolicitud", title: "Fecha de Solicitud", width: 100 },
        { field: "NombreUsuarioSolicitud", title: "Usuario Solicitud", width: 100 },
        { field: "AliadoSolicitud", title: "Aliado Solicitud", width: 100 },
        { field: "OperacionSolicitud", title: "Operacion Solicitud", width: 100 },
        { field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "TipoDeRequerimiento", title: "Tipo De Requerimiento", width: 100 },
        { field: "RequiereAjuste", title: "Requiere Ajuste", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "EstadoSolicitud", title: "Estado Solicitud", width: 100 },
        { field: "AliadoTecnico", title: "Aliado Tecnico", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'GestionarSolicitud?IdSolicitud=' + dataItem.IdSolicitud;
}