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
            { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 90 },
       { field: "UsuarioGestion", title: "Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "AliadoGestion", title: "Aliado Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "MarcacionInicialAfectacion", title: "Marcacion Inicial de Afectacion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "MarcacionReincidenteRecurrencia", title: "Marcacion Reincidente por la Recurrencia", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "ClieComunicaRealizadaGestRecu", title: "Cliente se Vuelve a Comunicar Despues de Realizada Gestión Recurrentes", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "PorQue", title: "Por Que", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "Contacto", title: "Contacto", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "VozClienteCausaRaiz", title: "Voz Cliente Causa Raiz", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "Solucionado", title: "Solucionado", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "AreaParticipaSolucion", title: "Area que particiapa en la Solucion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "ClientePresentaNovedades", title: "Cliente Presenta Novedades", headerAttributes: { style: "white-space: normal" }, width: 80 },
       { field: "Proceso", title: "Proceso", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Macroproceso", title: "Macroproceso", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "ServicioAfectado", title: "Servicio Afectado", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "FallaEspecificaArbolCCAA", title: "Falla Especifica Arbol CCAA", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "FallaCausaRaiz", title: "Falla Causa Raiz", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "SolucionEspecifica", title: "Solucion Especifica", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Estado", title: "Estado", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "MarcaEquiposFalla", title: "Marca Equipos con Falla", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "UbicacionModem", title: "Ubicacion del Modem", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "DispositivosInalambricosAlrededorModem", title: "Dispositivos Inalambricos Alrededor del Modem", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "CantEquiposConecInternet", title: "Cantidad Equipos que Conecta a Internet", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "TipoDispConectaInternet", title: "Tipo de Dispositivo que Conecta a Internet", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "UsoBrindaInternet", title: "Uso que Brinda al Internet", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "ActivacionClaroVideoNagra", title: "Activacion Claro Video Nagra", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "ServicioOfrecido", title: "Servicio Ofrecido", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "AceptacionServicioOfrecido", title: "Aceptacion del Servicio Ofrecido", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Ofrecimiento1", title: "Ofrecimiento 1", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "AceptacionPrimerOfrecimiento", title: "Aceptacion Primer Ofrecimiento", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Ofrecimiento2", title: "Ofrecimiento 2", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "AceptacionSegundoOfrecimiento", title: "Aceptacion Segundo Ofrecimiento", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Ofrecimiento3", title: "Ofrecimiento 3", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "AceptacionTercerOfrecimiento", title: "Aceptacion Tercer Ofrecimiento", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Observaciones", title: "Observaciones", headerAttributes: { style: "white-space: normal" }, width: 130 }
        ]
    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
