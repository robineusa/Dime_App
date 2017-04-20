function cambiarfechas() {
    for (var i = 0; i < jsonconsultaadminit.length; i++) {
        jsonconsultaadminit[i].TrasladoFallido.FechaTransaccion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].TrasladoFallido.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

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
    { field: "TrasladoFallido.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "TrasladoFallido.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
    { field: "TrasladoFallido.CanalTransaccion", title: "Canal Transaccion", width: 100, filterable: false },
    { field: "TrasladoFallido.FechaTransaccion", title: "Fecha Apertura", width: 100, filterable: false },
    { field: "TrasladoFallido.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
    { field: "TrasladoFallido.MotivoTrasladoFallido", title: "Motivo Traslado Fallido", width: 100 },
    { field: "TrasladoFallido.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "TrasladoFallido.CuentaOcupa", title: "Cuenta Ocupa", width: 100 },
    { field: "TrasladoFallido.CuentaTraslada", title: "Cuenta Traslada", width: 100 },
    { field: "TrasladoFallido.CuentaMatriz", title: "Cuenta Matriz", width: 100 },
    { field: "TrasladoFallido.NombreConjunto", title: "Nombre Conjunto", width: 100, filterable: false },
    { field: "TrasladoFallido.EstadoMatriz", title: "Estado Matriz", width: 100, filterable: false },
    { field: "TrasladoFallido.Direccion", title: "Direccion", width: 100, filterable: false },
    { field: "TrasladoFallido.EstratoOrigen", title: "Estrato Origen", width: 100, filterable: false },
    { field: "TrasladoFallido.EstratoDestino", title: "Estrato Destino", width: 100, filterable: false },
    { field: "TrasladoFallido.TarifaActual", title: "Tarifa Actual", width: 100, filterable: false },
    { field: "TrasladoFallido.TarifaNueva", title: "Tarifa Nueva", width: 100, filterable: false },
    { field: "TrasladoFallido.GestionPorTraslado", title: "Gestion Por Traslado", width: 100, filterable: false },
    { field: "TrasladoFallido.Nodo", title: "Nodo", width: 100 },
    { field: "TrasladoFallido.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
    { field: "TrasladoFallido.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
    { field: "TrasladoFallido.CorreoElectronico", title: "Correo Electronico", width: 100 },
    { field: "TrasladoFallido.Observacion", title: "Observacion", width: 100 }
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

