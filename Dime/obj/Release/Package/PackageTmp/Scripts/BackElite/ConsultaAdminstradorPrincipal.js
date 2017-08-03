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
        url: UrlConsultaAdminstradorPrincipalJson,
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
        data[i].FechaDeAgenda = kendo.toString(kendo.parseDate(data[i].FechaDeAgenda, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSolicitud = kendo.toString(kendo.parseDate(data[i].FechaDeSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeFinalizacion = kendo.toString(kendo.parseDate(data[i].FechaDeFinalizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaLogBackElite.xlsx",
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
            buttonCount: 5
        },
        columns: [
        { field: "IdSolicitud", title: "Id Transacción", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "LlsOt", title: "LlsOt", width: 100 },
        { field: "TipoDeSolicitud", title: "Tipo De Solicitud", width: 100 },
        { field: "DetalleDeSolicitud", title: "Detalle De Solicitud", width: 100 },
        { field: "FechaDeSolicitud", title: "Fecha De Solicitud", width: 100 },
        { field: "UsuarioQueSolicita", title: "Usuario Que Solicita", width: 100 },
        { field: "NombreUsuarioQueSolicita", title: "Nombre Usuario Que Solicita", width: 100 },
        { field: "AliadoQueSolicita", title: "Aliado Que Solicita", width: 100 },
        { field: "OperacionQueSolicita", title: "Operacion Que Solicita", width: 100 },
        { field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 100 },
        { field: "UsuarioUltimaActualizacion", title: "Usuario Ultima Actualizacion", width: 100 },
        { field: "NombreUsuarioUltimaActualizacion", title: "Nombre Usuario Ultima Actualizacion", width: 100 },
        { field: "FechaDeFinalizacion", title: "Fecha De Finalizacion", width: 100 },
        { field: "UsuarioQueFinaliza", title: "Usuario Que Finaliza", width: 100 },
        { field: "NombreUsuarioQueFinaliza", title: "Nombre Usuario Que Finaliza", width: 100 },
        { field: "Nodo", title: "Nodo", width: 100 },
        { field: "Malescalado", title: "Mal Escalado", width: 100 },
        { field: "DetalleMalEscalado", title: "Detalle Mal Escalado", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "EstadoEscalamiento", title: "Estado Escalamiento", width: 100 },
        { field: "FechaDeAgenda", title: "Fecha De Agenda", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        { field: "UsuarioGestionando", title: "Usuario Gestionando", width: 100 },
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
