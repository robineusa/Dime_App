function cambiarfechas() {
    for (var i = 0; i < jsonsegcdout.length; i++) {
        jsonsegcdout[i].NotaTrasladoGetSet.FechaTransaccion = kendo.toString(kendo.parseDate(jsonsegcdout[i].NotaTrasladoGetSet.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
if (jsonsegcdout != null) {
    cambiarfechas();

}

$("#gridViewConsulta").kendoGrid({
    autoBind: true,
    toolbar: ["excel"],
    excel: {
        fileName: "Export.xlsx",
    },
    dataSource: {
        data: jsonsegcdout,
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
    { field: "NotaTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "NotaTrasladoGetSet.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "NotaTrasladoGetSet.CanalTransaccion", title: "Canal Transacción", width: 100 },
    { field: "NotaTrasladoGetSet.UsuarioTransaccion", title: "Usr Transacción", width: 100 },
    { field: "NotaTrasladoGetSet.FechaTransaccion", title: "Fecha Transacción", width: 100},
    { field: "NotaTrasladoGetSet.EstadoTransaccion", title: "Estado Transacción", width: 100 },
    { field: "NotaTrasladoGetSet.Razon", title: "Razon", width: 100 },
    { field: "NotaTrasladoGetSet.Subrazon", title: "Subrazon", width: 100 },
    { field: "NotaTrasladoGetSet.Observacion", title: "Observación", width: 100 }
    ]

});

function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

    if (dataItem.NotaTrasladoGetSet.Razon == "GESTION BACKOFFICE CREACION") {
        window.location.href = '/Traslados/GestionarCreacionDeMatriz?id=' + dataItem.NotaTrasladoGetSet.IdTransaccion;
    }
    else if (dataItem.NotaTrasladoGetSet.Razon == "GESTION BACKOFFICE GESTION") {
        window.location.href = '/Traslados/GestionMatricesCelula?id=' + dataItem.NotaTrasladoGetSet.IdTransaccion;
    }
    else if (dataItem.NotaTrasladoGetSet.Razon == "SOLICITUD INBOUND") {
        window.location.href = '/Traslados/ConsultaGestionMatrices';
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
