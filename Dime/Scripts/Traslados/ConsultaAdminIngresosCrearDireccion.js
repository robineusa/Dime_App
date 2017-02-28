function cambiarfechas() {
    for (var i = 0; i < jsonconsultaadminit.length; i++) {
        jsonconsultaadminit[i].NotaTrasladoGetSet.FechaTransaccion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].NotaTrasladoGetSet.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        
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
    { field: "NotaTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "NotaTrasladoGetSet.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
    { field: "NotaTrasladoGetSet.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "NotaTrasladoGetSet.CanalTransaccion", title: "canal Transaccion", width: 100, filterable: false },
    { field: "NotaTrasladoGetSet.FechaTransaccion", title: "Hora Apertura", width: 100, filterable: false },
    { field: "NotaTrasladoGetSet.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
    { field: "NotaTrasladoGetSet.DireccionACrear", title: "Direccion a Crear", width: 100, filterable: false },
    { field: "NotaTrasladoGetSet.Estrato", title: "Estrato", width: 100, filterable: false },
    { field: "NotaTrasladoGetSet.Nodo", title: "Nodo", width: 100 },
    { field: "NotaTrasladoGetSet.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
    { field: "NotaTrasladoGetSet.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
    { field: "NotaTrasladoGetSet.Razon", title: "Razon", width: 100 },
    { field: "NotaTrasladoGetSet.Subrazon", title: "Subrazon", width: 100 },
    { field: "NotaTrasladoGetSet.Observacion", title: "Observacion", width: 100 },
    { field: "NotaTrasladoGetSet.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
    { field: "NotaTrasladoGetSet.UsuarioBackOffice", title: "Usuario BackOffice", width: 100 },
    { field: "NotaTrasladoGetSet.UsuarioBackOutbound", title: "Usuario Outbound", width: 100 }
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

