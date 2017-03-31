function cambiarfechas() {
    for (var i = 0; i < jsonconsultaadminit.length; i++) {
        jsonconsultaadminit[i].TrasladosNoCobertura.FechaTransaccion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].TrasladosNoCobertura.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

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
    { field: "TrasladosNoCobertura.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "TrasladosNoCobertura.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
    { field: "TrasladosNoCobertura.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "TrasladosNoCobertura.CanalTransaccion", title: "canal Transaccion", width: 100, filterable: false },
    { field: "TrasladosNoCobertura.FechaTransaccion", title: "Hora Apertura", width: 100, filterable: false },
    { field: "TrasladosNoCobertura.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
    { field: "TrasladosNoCobertura.DireccionTraslado", title: "Direccion Traslado", width: 100, filterable: false },
    { field: "TrasladosNoCobertura.Estrato", title: "Estrato", width: 100, filterable: false },
    { field: "TrasladosNoCobertura.Nodo", title: "Nodo", width: 100 },
    { field: "TrasladosNoCobertura.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
    { field: "TrasladosNoCobertura.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
    { field: "TrasladosNoCobertura.Razon", title: "Razon", width: 100 },
    { field: "TrasladosNoCobertura.Subrazon", title: "Subrazon", width: 100 },
    { field: "TrasladosNoCobertura.Observacion", title: "Observacion", width: 100 },
    { field: "TrasladosNoCobertura.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
    { field: "TrasladosNoCobertura.UsuarioBackOffice", title: "Usuario BackOffice", width: 100 },
    
    ]

});

$("#CuentaCliente").blur(function (event) {
    HacerConsulta();
});

function HacerConsulta() {

    var bt1 = document.getElementById("submitDatos");
    bt1.click();

}

