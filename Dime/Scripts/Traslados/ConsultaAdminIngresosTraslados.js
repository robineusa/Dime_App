function cambiarfechas() {
    for (var i = 0; i < jsonconsultaadminit.length; i++) {
        jsonconsultaadminit[i].IngresoTrasladoGetSet.FechaApertura = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].IngresoTrasladoGetSet.FechaApertura, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        jsonconsultaadminit[i].IngresoTrasladoGetSet.HoraApertura = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].IngresoTrasladoGetSet.HoraApertura, 'HH:mm:ss'), 'HH:mm:ss');
        jsonconsultaadminit[i].IngresoTrasladoGetSet.FechaCierre = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].IngresoTrasladoGetSet.FechaCierre, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        jsonconsultaadminit[i].IngresoTrasladoGetSet.HoraCierre = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].IngresoTrasladoGetSet.HoraCierre, 'HH:mm:ss'), 'HH:mm:ss');
        jsonconsultaadminit[i].IngresoTrasladoGetSet.FechaUltimaActualizacion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].IngresoTrasladoGetSet.FechaUltimaActualizacion, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        jsonconsultaadminit[i].IngresoTrasladoGetSet.HoraUltimaActualizacion = kendo.toString(kendo.parseDate(jsonconsultaadminit[i].IngresoTrasladoGetSet.HoraUltimaActualizacion, 'HH:mm:ss'), 'HH:mm:ss');
    }
        
}
if (jsonconsultaadminit != null)
{
  
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
    { field: "IngresoTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "IngresoTrasladoGetSet.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "IngresoTrasladoGetSet.TipoGestion", title: "Tipo Gestion", width: 100 },
    { field: "IngresoTrasladoGetSet.FechaApertura", title: "Fecha Apertura", width: 100, filterable: false },
    { field: "IngresoTrasladoGetSet.HoraApertura", title: "Hora Apertura", width: 100,filterable: false },
    { field: "IngresoTrasladoGetSet.UsuarioApertura", title: "Usuario Apertura", width: 100 },
    { field: "IngresoTrasladoGetSet.FechaCierre", title: "Fecha Cierre", width: 100, filterable: false },
    { field: "IngresoTrasladoGetSet.HoraCierre", title: "Hora Cierre", width: 100, filterable: false },
    { field: "IngresoTrasladoGetSet.UsuarioCierre", title: "Usuario Cierre", width: 100 },
    { field: "IngresoTrasladoGetSet.FechaUltimaActualizacion", title: "Fecha Actualizacion", width: 100,  filterable: false },
    { field: "IngresoTrasladoGetSet.HoraUltimaActualizacion", title: "Hora Actualizacion", width: 100,  filterable: false },
    { field: "IngresoTrasladoGetSet.UltimaActualizacion", title: "Usuario Actualizacion", width: 100 },
    { field: "IngresoTrasladoGetSet.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
    { field: "IngresoTrasladoGetSet.AliadoApertura", title: "Aliado Apertura", width: 100 },
    { field: "IngresoTrasladoGetSet.NombreLineaIngreso", title: "Linea Ingreso", width: 100 },
    { field: "IngresoTrasladoGetSet.NombreLineaEscalado", title: "Linea Escalado", width: 100 }
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

