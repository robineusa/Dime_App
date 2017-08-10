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
        url: UrlConsultaAdministradorLogJson,
        contentType: "application/json; charset=utf-8",
        data: { F1: F1, F2: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            //cambiarfechas(json);
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

    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaLogRecurrencia.xlsx",
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
            { field: "Id", title: "Id", width: 100 },
        { field: "FechaGestion", title: "Fecha de Gestion", width: 100 },
        { field: "UsuarioGestion", title: "Usuario de Gestion", width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario de Gestion", width: 100 },
        { field: "AliadoGestion", title: "Aliado de Gestion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "MacroProcesoRecurrencia1", title: "MacroProceso Recurrencia 1", width: 100 },
        { field: "MacroProcesoRecurrencia2", title: "MacroProceso Recurrencia 2", width: 100 },
        { field: "MacroProcesoRecurrencia3", title: "MacroProceso Recurrencia 3", width: 100 },
        { field: "VolvioLlamar", title: "VolvioLlamar", width: 100 },
        { field: "PorQue", title: "Por Que", width: 100 },
        { field: "Contacto", title: "Contacto", width: 100 },
        { field: "VozCliente", title: "Voz Cliente", width: 100 },
        { field: "ClientePresentaNovedades", title: "Cliente Presenta Novedades", width: 100 },
        { field: "Proceso", title: "Proceso", width: 100 },
        { field: "Macroproceso", title: "Macroproceso", width: 100 },
        { field: "ServicioAfectado", title: "Servicio Afectado", width: 100 },
        { field: "FallaEspecificaArbolCCAA", title: "Falla Especifica Arbol CCAA", width: 100 },
        { field: "FallaCausaRaiz", title: "Falla Causa Raiz", width: 100 },
        { field: "SolucionEspecifica", title: "Solucion Especifica", width: 100 },
        { field: "Solucionado", title: "Solucionado", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "ActivacionClaroVideoNagra", title: "Activacion Claro Video Nagra", width: 100 },
        { field: "AceptacionPrimerOfrecimiento", title: "Aceptacionv Primer Ofrecimiento", width: 100 },
        { field: "AceptacionSegundoOfrecimiento", title: "Aceptacion Segundo Ofrecimiento", width: 100 },
        { field: "AceptacionTercerOfrecimiento", title: "Aceptacion Tercer Ofrecimiento", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 }
        ]
    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
