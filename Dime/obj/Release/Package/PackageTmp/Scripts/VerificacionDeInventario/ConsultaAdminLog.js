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
        url: UrlConsultaAdminInventarioLog,
        contentType: "application/json; charset=utf-8",
        data: { F1: F1, F2: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
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
        data[i].FechaTransaccion = kendo.toString(kendo.parseDate(data[i].FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaVerificacionInventarioLog.xlsx",
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
        { field: "IdTransaccion", title: "Id Transaccion", width: 100 },
        { field: "IdSolicitud", title: "Id Solicitud", width: 100 },
        { field: "FechaSolicitud", title: "Fecha de Solicitud", width: 100 },
        { field: "UsuarioSolicitud", title: "Usuario de Solicitud", width: 100 },
        { field: "NombreUsuarioSolicitud", title: "Nombre Usuario Solicitud", width: 100 },
        { field: "AliadoSolicitud", title: "Aliado Solicitud", width: 100 },
        { field: "OperacionSolicitud", title: "Operacion Solicitud", width: 100 },
        { field: "FechaTransaccion", title: "Fecha Transaccion", width: 100 },
        { field: "UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "NombreUsuarioTransaccion", title: "Nombre Usuario Transaccion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "TipoDeRequerimiento", title: "Tipo De Requerimiento", width: 100 },
        { field: "RequiereAjuste", title: "Requiere Ajuste", width: 100 },
        { field: "Nodo", title: "Nodo", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "EstadoSolicitud", title: "Estado Solicitud", width: 100 },
        { field: "AliadoTecnico", title: "Aliado Tecnico", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        { field: "UsuarioGestionando", title: "Usuario Gestionando", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
