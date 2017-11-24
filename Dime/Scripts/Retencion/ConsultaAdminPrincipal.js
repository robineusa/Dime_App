$.datetimepicker.setLocale('es');
$('#Fecha_Inicial').datetimepicker({
    format: 'Y-m-d',
    timepicker: false
});

$('#Fecha_Final').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
        this.setOptions({
            minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
        })
    },
    timepicker: false
});


$("#Fecha_Final").blur(function (event) {
    event.preventDefault();
    var fechaInicial = $("#Fecha_Inicial").val();
    if (fechaInicial == "") {
        $("#warningLabel").text("Debe primero introducir una fecha inicial");
    } else {


    }
    console.log("cambio en vacio " + fechaInicial);
    var F1 = $('#Fecha_Inicial').val();
    var F2 = $('#Fecha_Final').val();
    TraerDatosConsulta(F1, F2);

});

function TraerDatosConsulta(F1, F2) {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: urlconsultaprincipaladminretencion,
        contentType: "application/json; charset=utf-8",
        data: { F1: F1, F2: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
            cargargrilla(json);
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
        data[i].FechaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        }
}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "SeguimientosRetencionPrincipal.xlsx",
            allPages: true
        },
        dataSource: {
            data: data,
            pageSize: 20,
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
            buttonCount: 10
        },
        columns: [
        { field: "IdSolicitud", title: "Id Solicitud", width: 100 },
        { field: "FechaSolicitud", title: "Fecha Solicitud", width: 100 },
        { field: "UsuarioSolicitud", title: "Usuario Solicitud", width: 100 },
        { field: "NombreUsuarioSolicitud", title: "Nombre Usuario Solicitud", width: 100 },
        { field: "AliadoSolicitud", title: "Aliado Solicitud", width: 100 },
        { field: "OperacionSolicitud", title: "Operacion Solicitud", width: 100 },
        { field: "LineaSolicitud", title: "Linea Solicitud", width: 100 },
        { field: "FechaActualizacion", title: "Fecha Actualizacion", width: 100 },
        { field: "UsuarioActualizacion", title: "Usuario Actualizacion", width: 100 },
        { field: "NombreUsuarioActualizacion", title: "Nombre Usuario Actualizacion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "TipoEscalamiento", title: "Tipo Escalamiento", width: 100 },
        { field: "DetalleEscalamiento", title: "Detalle Escalamiento", width: 100 },
        { field: "MotivoEscalamiento", title: "Motivo Escalamiento", width: 100 },
        { field: "RazonEscalamiento", title: "Razon Escalamiento", width: 100 },
        { field: "SubRazonEscalamiento", title: "Sub Razon Escalamiento", width: 100 },
        { field: "Estrategia1", title: "Estrategia1", width: 100 },
        { field: "Estrategia2", title: "Estrategia2", width: 100 },
        { field: "Estrategia3", title: "Estrategia3", width: 100 },
        { field: "TicketRr", title: "Ticket Rr", width: 100 },
        { field: "EstadoSolicitud", title: "Estado Solicitud", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
