$.datetimepicker.setLocale('es');
$('#Fecha_Inicial').datetimepicker({
    format: 'Y-m-d',
    maxDate: '+0d',
    timepicker: false
});

$('#Fecha_Final').datetimepicker({
    format: 'Y-m-d',
    maxDate: '+0d',
    onShow: function (ct) {
        this.setOptions({
            minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
        })
    },
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
    //alert(F1);
    TraerDatosConsulta(F1, F2);

});

function TraerDatosConsulta(F1, F2) {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: UrlConsultaMidasAdminLogJson,
        contentType: "application/json; charset=utf-8",
        data: { F1: F1, F2: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
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
        data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {

    if (data != null) {
        cambiarfechas(data);
    }

    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaLogMidas.xlsx",
            allPages: true
        },
        dataSource: {
            data: data,
            pageSize: 10,
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
            { field: "Id", title: "Id", headerAttributes: { style: "white-space: normal" }, width: 90 },
       { field: "IdGestionPrincipal", title: "Id Gestion Principal", headerAttributes: { style: "white-space: normal" }, width: 90 },
       { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "AliadoGestion", title: "Aliado Gestion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Gestion", title: "Gestion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Cierre", title: "Cierre", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Razon", title: "Razon", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Motivo", title: "Motivo", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "FallaServPrincipalesSoporte", title: "Falla Servicios Principales Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "FallaServAdicionalesSoporte", title: "Falla Servicios Adicionales Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "TipoFallaSoporte", title: "Tipo Falla Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "SolucionEspecificaSoporte", title: "Solucion Especifica Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoSoporte", title: "Estado Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ObservacionesSoporte", title: "Observaciones Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ProblemaFacturacion", title: "Problema Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "SolucionFacturacion", title: "Solucion Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoFacturacion", title: "Estado Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ObservacionesFacturacion", title: "Observaciones Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ClienteIntencionCancelacion", title: "Cliente Intencion Cancelacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "RazonCancelacion", title: "Razon Cancelacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ObservacionesCancelacion", title: "Observaciones Cancelacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "Ofrecimiento1", title: "Ofrecimiento 1", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "AceptacionOfrecimiento1", title: "Aceptacion Ofrecimiento 1", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoCaso", title: "Estado Caso", headerAttributes: { style: "white-space: normal" }, width: 120 }
        ]
    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}