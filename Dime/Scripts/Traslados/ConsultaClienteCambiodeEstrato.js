function cambiarfechas() {
    for (var i = 0; i < jsonconsultaadminit.length; i++) {
        jsonconsultaadminit[i].CambioEstrato.FechaTransaccion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].CambioEstrato.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

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
    { field: "CambioEstrato.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "CambioEstrato.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
    { field: "CambioEstrato.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "CambioEstrato.CanalTransaccion", title: "canal Transaccion", width: 100, filterable: false },
    { field: "CambioEstrato.FechaTransaccion", title: "Hora Apertura", width: 100, filterable: false },
    { field: "CambioEstrato.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
    { field: "CambioEstrato.Direccion", title: "Direccion a Crear", width: 100, filterable: false },
    { field: "CambioEstrato.Estrato", title: "Estrato", width: 100, filterable: false },
    { field: "CambioEstrato.Nodo", title: "Nodo", width: 100 },
    { field: "CambioEstrato.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
    { field: "CambioEstrato.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
    { field: "CambioEstrato.Razon", title: "Razon", width: 100 },
    { field: "CambioEstrato.Subrazon", title: "Subrazon", width: 100 },
    { field: "CambioEstrato.Observacion", title: "Observacion", width: 100 },
    { field: "CambioEstrato.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
    { field: "CambioEstrato.UsuarioBackOffice", title: "Usuario BackOffice", width: 100 },
    { field: "CambioEstrato.CorreoElectronico", title: "Correo Electronico", width: 100 }
    ]

});

$("#CuentaCliente").blur(function (event) {
    HacerConsulta();
});

function HacerConsulta() {
var bt1 = document.getElementById("submitDatos");
    bt1.click();

}

