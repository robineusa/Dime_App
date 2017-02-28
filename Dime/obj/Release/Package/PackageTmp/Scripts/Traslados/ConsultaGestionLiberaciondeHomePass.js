function cambiarfechas() {
    for (var i = 0; i < jsonconsultagestionlhhpp.length; i++) {
        jsonconsultagestionlhhpp[i].LiberacionHomePass.FechaTransaccion = kendo.toString(kendo.parseDate(jsonconsultagestionlhhpp[i].LiberacionHomePass.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
if (jsonconsultagestionlhhpp != null) {
    cambiarfechas();

}

$("#gridViewConsulta").kendoGrid({
    autoBind: true,
    toolbar: ["excel"],
    excel: {
        fileName: "Export.xlsx",
    },
    dataSource: {
        data: jsonconsultagestionlhhpp,
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
    { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "60px" },
    { field: "LiberacionHomePass.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "LiberacionHomePass.CuentaOcupa", title: "Cuenta Que Ocupa", width: 100 },
    { field: "LiberacionHomePass.CuentaTraslada", title: "Cuenta Que Traslada", width: 100 },
    { field: "LiberacionHomePass.CanalTransaccion", title: "Canal Transacción", width: 100 },
    { field: "LiberacionHomePass.UsuarioTransaccion", title: "Usr Transacción", width: 100 },
    { field: "LiberacionHomePass.FechaTransaccion", title: "Fecha Transacción", width: 100},
    { field: "LiberacionHomePass.EstadoTransaccion", title: "Estado Transacción", width: 100 },
    { field: "LiberacionHomePass.Razon", title: "Razon", width: 100 },
    { field: "LiberacionHomePass.Subrazon", title: "Subrazon", width: 100 },
    { field: "LiberacionHomePass.Observacion", title: "Observación", width: 100 },
    { field: "LiberacionHomePass.MotivoLiberacion", title: "Motivo Liberacion", width: 100 }
    ]

});

function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    if (dataItem.LiberacionHomePass.Razon == "GESTION BACKOFFICE") {
        window.location.href = 'GestionarLiberacionHomePassCelula?id=' + dataItem.LiberacionHomePass.IdTransaccion;
    }
    else if (dataItem.LiberacionHomePass.Razon == "SOLICITUD INBOUND") {
        window.location.href = 'ConsultaGestionLiberaciondeHomePass';
    }


}
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
