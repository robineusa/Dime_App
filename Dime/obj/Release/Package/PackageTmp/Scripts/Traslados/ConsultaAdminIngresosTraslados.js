
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
   
    TraerDatosConsulta(F1,F2);
});


function TraerDatosConsulta(F1,F2) {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: urlListatraslados,
        contentType: "application/json; charset=utf-8",
        data: { fechaInicial: F1, fechaFinal: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
            cargargridview(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].IngresoTrasladoGetSet.FechaApertura = kendo.toString(kendo.parseDate(data[i].IngresoTrasladoGetSet.FechaApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd');
        data[i].IngresoTrasladoGetSet.HoraApertura = kendo.toString(kendo.parseDate(data[i].IngresoTrasladoGetSet.HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');
        data[i].IngresoTrasladoGetSet.FechaCierre = kendo.toString(kendo.parseDate(data[i].IngresoTrasladoGetSet.FechaCierre, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd');
        data[i].IngresoTrasladoGetSet.HoraCierre = kendo.toString(kendo.parseDate(data[i].IngresoTrasladoGetSet.HoraCierre, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');
        data[i].IngresoTrasladoGetSet.FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].IngresoTrasladoGetSet.FechaUltimaActualizacion, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        data[i].IngresoTrasladoGetSet.HoraUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].IngresoTrasladoGetSet.HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');
        
    }

}
function cargargridview(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "Export.xlsx",
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
        { field: "IngresoTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "IngresoTrasladoGetSet.CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "IngresoTrasladoGetSet.TipoGestion", title: "Tipo Gestion", width: 100 },
        { field: "IngresoTrasladoGetSet.FechaApertura", title: "Fecha Apertura", width: 100, filterable: false },
        { field: "IngresoTrasladoGetSet.HoraApertura", title: "Hora Apertura", width: 100, filterable: false },
        { field: "IngresoTrasladoGetSet.UsuarioApertura", title: "Usuario Apertura", width: 100 },
        { field: "IngresoTrasladoGetSet.FechaCierre", title: "Fecha Cierre", width: 100, filterable: false },
        { field: "IngresoTrasladoGetSet.HoraCierre", title: "Hora Cierre", width: 100, filterable: false },
        { field: "IngresoTrasladoGetSet.UsuarioCierre", title: "Usuario Cierre", width: 100 },
        { field: "IngresoTrasladoGetSet.FechaUltimaActualizacion", title: "Fecha Actualizacion", width: 100, filterable: false },
        { field: "IngresoTrasladoGetSet.HoraUltimaActualizacion", title: "Hora Actualizacion", width: 100, filterable: false },
        { field: "IngresoTrasladoGetSet.UsuarioUltimaActualizacion", title: "Usuario Actualizacion", width: 100 },
        { field: "IngresoTrasladoGetSet.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
        { field: "IngresoTrasladoGetSet.AliadoApertura", title: "Aliado Apertura", width: 100 },
        { field: "IngresoTrasladoGetSet.NombreLineaIngreso", title: "Linea Ingreso", width: 100 },
        { field: "IngresoTrasladoGetSet.NombreLineaEscalado", title: "Linea Escalado", width: 100 }
        ]

    });
   
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}
