
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
    TraerDatosConsulta(F1, F2);

});

function TraerDatosConsulta(F1, F2) {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: UrlConsultaAdministradorPincipalIJson,
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
    //document.getElementById('dataLoading').style.display = 'none';
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

    $("#gridViewInboundConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaPrincipalRecurrenciaInbound.xlsx",
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
            { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 90 },
        { field: "AliadoGestion", title: "Aliado Gestion", headerAttributes: { style: "white-space: normal" }, width: 90 },
        { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 90 },
        { field: "Macroproceso", title: "Macroproceso", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "ServicioAfectado", title: "Servicio Afectado", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "ArbolSoporte", title: "Arbol de Soporte", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "FallaCausaRaiz", title: "Falla Causa Raiz", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "SolucionEspecifica", title: "Solucion Especifica", headerAttributes: { style: "white-space: normal" }, width: 150 },
        { field: "Estado", title: "Estado", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "FallaAtribuibleA", title: "Falla Atribuible A:", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "PorQue", title: "Por Que", headerAttributes: { style: "white-space: normal" }, width: 150 },
        { field: "ActivacionClaroVideoNagra", title: "Activacion Claro Video Nagra", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "ServicioOfrecido", title: "Servicio Ofrecido", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "AceptacionServicioOfrecido", title: "Aceptacion Servicio Ofrecido", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "Observaciones", title: "Observaciones", headerAttributes: { style: "white-space: normal" }, width: 150 }
        ]
    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
