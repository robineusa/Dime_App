$.datetimepicker.setLocale('es');
$('#Fecha_Inicial').datetimepicker({
    format: 'Y-m-d',
   
    timepicker: false
});

$('#Fecha_Final').datetimepicker({
    format: 'Y-m-d',
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
        url: ConsultaGestionMec,
        contentType: "application/json; charset=utf-8",
        data: { fechaInicial: F1, fechaFinal: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
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
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaGestionMec.xlsx",
        },
        dataSource: {
            data: data,
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
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
        { command: { text: "Editar", click: ActualizarCaso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: " ", width: "90px" },
        { field: "IdMonitoreo", title: "Id Monitoreo", width: 100 },
        { field: "FechaGestion", title: "Fecha de Gestion", width: 100 },
        { field: "UsuarioGestion", title: "Usuario Gestion", width: 100 },
        { field: "CedulaUsuarioGestion", title: "Cedula Usuario Gestion", width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", width: 100 },
        { field: "AliadoGestion", title: "Aliado Gestion", width: 100 },
        { field: "IdProceso", title: "Id Proceso", width: 100 },
        { field: "NombreProceso", title: "Nombre Proceso", width: 100 },
        { field: "IdLinea", title: "Id Linea", width: 100 },
        { field: "NombreLinea", title: "Nombre Linea", width: 100 },
        { field: "UsuarioMonitoreado", title: "Usuario Monitoreado", width: 100 },
        { field: "NombreUsuarioMonitoreado", title: "Nombre Usuario Monitoreado", width: 100 },
        { field: "OperacionUsuarioMonitoreado", title: "Operacion Usuario Monitoreado", width: 100 },
        { field: "AliadoUsuarioMonitoreado", title: "Aliado Usuario Monitoreado", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "Division", title: "Division", width: 100 },
        { field: "Area", title: "Area", width: 100 },
        { field: "Zona", title: "Zona", width: 100 },
        { field: "Comunidad", title: "Comunidad", width: 100 },
        { field: "TipoCliente", title: "TipoC liente", width: 100 },
        { field: "DescripcionTipoCliente", title: "Descripcion Tipo Cliente", width: 100 },
        { field: "MarcacionRegistradaRR", title: "Marcacion Registrada RR", width: 100 },
        { field: "MarcacionCorrectaRR", title: "Marcacion Correcta RR", width: 100 },
        { field: "CampoOpcional1", title: "CampoOpcional1", width: 100 },
        { field: "CampoOpcional2", title: "CampoOpcional2", width: 100 },
        { field: "CampoOpcional3", title: "CampoOpcional3", width: 100 },
        { field: "CampoOpcional4", title: "CampoOpcional4", width: 100 },
        { field: "CampoOpcional5", title: "CampoOpcional5", width: 100 },
        { field: "CampoOpcional5", title: "CampoOpcional5", width: 100 },
        { field: "NotaObtenida", title: "Nota Obtenida", width: 100 },
        { field: "TipoDeAlarma", title: "Tipo De Alarma", width: 100 },
        { field: "RegistroMonitoreo", title: "Registro Monitoreo", width: 100 },
        { field: "MotivoLlamada", title: "Motivo Llamada", width: 100 },
        { field: "AnalisisDeGestion", title: "Analisis DeGestion", width: 100 },
        { field: "AccionEmprender", title: "Accion Emprender", width: 100 },
        { field: "EtiquetaDeLlamada", title: "Etiqueta De Llamada", width: 100 },
        { field: "IdListaDistribucion", title: "Id Lista Distribucion", width: 100 },
        { field: "EstadoMonitoreo", title: "Estado Monitoreo", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    e.preventDefault();
    window.location.href = 'ActualizarMonitoreo?IdMonitoreo=' + dataItem.IdMonitoreo;
    
}

