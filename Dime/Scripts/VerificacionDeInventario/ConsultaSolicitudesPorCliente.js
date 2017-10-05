
$("#Cuenta").blur(function (event) {
    event.preventDefault();
    var Cuenta = $("#Cuenta").val();
    if (Cuenta == "" || Cuenta == null) {
    } else { ListaSolicitudesPorCuenta(); }

});

function ListaSolicitudesPorCuenta() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Cuenta = $("#Cuenta").val();
    if (Cuenta == "" || Cuenta == null) { Cuenta = 0; } else { }
    $.ajax({
        type: "GET",
        url: UrlSolicitudesPorCliente,
        contentType: "application/json; charset=utf-8",
        data: { CuentaCliente: Cuenta },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
            generarDataKendo(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaSolicitud = kendo.toString(kendo.parseDate(data[i].FechaSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
      }
}

function generarDataKendo(datos) {
    ds = new kendo.data.DataSource({
        data: datos
    });
    cargargrilla();
}

function cargargrilla() {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        dataSource: ds,
        scrollable: true,
        sortable: true,
        columns: [
        { field: "IdSolicitud", title: "Id Solicitud", width: 100 },
        { field: "FechaSolicitud", title: "Fecha de Solicitud", width: 100 },
        { field: "UsuarioSolicitud", title: "Usuario Solicitud", width: 100 },
        { field: "NombreUsuarioSolicitud", title: "Nombre Usuario Solicitud", width: 100 },
        { field: "AliadoSolicitud", title: "Aliado Solicitud", width: 100 },
        { field: "OperacionSolicitud", title: "Operacion Solicitud", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "TipoDeRequerimiento", title: "Tipo De Requerimiento", width: 100 },
        { field: "RequiereAjuste", title: "Requiere Ajuste", width: 100 },
        { field: "Nodo", title: "Nodo", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "EstadoSolicitud", title: "Estado Solicitud", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 }
        ]
    });
}

function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}