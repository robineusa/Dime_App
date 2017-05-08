$.datetimepicker.setLocale('es');
$('#Fecha_Inicial').datetimepicker({
    format: 'Y-m-d',
    maxDate: '+0d',
    timepicker: false
});

$('#Fecha_Final').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
        this.setOptions({
            minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
        })
    },
    maxDate: '+0d',
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
        url: urllistaliberacionesdehomepass,
        contentType: "application/json; charset=utf-8",
        data: { fechaInicial: F1, fechaFinal: F2 },
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
        data[i].LiberacionHomePass.FechaTransaccion = kendo.toString(kendo.parseDate(data[i].LiberacionHomePass.FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaLiberacionesHomePass.xlsx",
        },
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
        { field: "LiberacionHomePass.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "LiberacionHomePass.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "LiberacionHomePass.CanalTransaccion", title: "Canal Transaccion", width: 100, filterable: false },
        { field: "LiberacionHomePass.FechaTransaccion", title: "Fecha Apertura", width: 100, filterable: false },
        { field: "LiberacionHomePass.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
        { field: "LiberacionHomePass.CuentaOcupa", title: "Cuenta Ocupa", width: 100 },
        { field: "LiberacionHomePass.CuentaTraslada", title: "Cuenta Traslada", width: 100 },
        { field: "LiberacionHomePass.Direccion", title: "Direccion", width: 100, filterable: false },
        { field: "LiberacionHomePass.Nodo", title: "Nodo", width: 100 },
        { field: "LiberacionHomePass.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
        { field: "LiberacionHomePass.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
        { field: "LiberacionHomePass.Razon", title: "Razon", width: 100 },
        { field: "LiberacionHomePass.Subrazon", title: "Subrazon", width: 100 },
        { field: "LiberacionHomePass.Observacion", title: "Observacion", width: 100 },
        { field: "LiberacionHomePass.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
        { field: "LiberacionHomePass.UsuarioBackOffice", title: "Usuario BackOffice", width: 100 },
        { field: "LiberacionHomePass.MotivoLiberacion", title: "Motivo Liberacion", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}
