

function cambiarfechas() {
    for (var i = 0; i < jsonconsultaadminit.length; i++) {
        jsonconsultaadminit[i].LiberacionHomePass.FechaTransaccion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].LiberacionHomePass.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
if (jsonconsultaadminit != null) {
    cambiarfechas();

}


$("#gridViewConsulta").kendoGrid({
    autoBind: true,
    toolbar: ["excel"],
    excel: {
        fileName: "Export.xlsx",
    },
    dataSource: {
        data: jsonconsultaadminit,
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
    { field: "LiberacionHomePass.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "LiberacionHomePass.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
    { field: "LiberacionHomePass.CanalTransaccion", title: "canal Transaccion", width: 100, filterable: false },
    { field: "LiberacionHomePass.FechaTransaccion", title: "Hora Apertura", width: 100, filterable: false },
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

        HacerConsulta();
    }
    console.log("cambio en vacio " + fechaInicial);


});
function HacerConsulta() {

    var bt1 = document.getElementById("submitDatos");
    bt1.click();

}

