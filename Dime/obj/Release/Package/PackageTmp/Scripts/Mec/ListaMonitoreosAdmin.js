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
        url: ListaMonitoreosMec,
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
        { command: { text: "Editar", click: ActualizarCaso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: " ", width: "80px" },
        { field: "IdMonitoreo", title: "Id Monitoreo", width: 100 },
        { field: "FechaGestion", title: "Fecha de Gestion", width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", width: 100 },
        { field: "NombreProceso", title: "Nombre Proceso", width: 100 },
        { field: "NombreLinea", title: "Nombre Linea", width: 100 },
        { field: "NombreUsuarioMonitoreado", title: "Nombre Usuario Monitoreado", width: 100 },
        { field: "OperacionUsuarioMonitoreado", title: "Operacion Usuario Monitoreado", width: 100 },
        { field: "AliadoUsuarioMonitoreado", title: "Aliado Usuario Monitoreado", width: 100 },
        { field: "TipoDeAlarma", title: "Tipo de Alarma", width: 100 },
        { field: "EstadoMonitoreo", title: "Estado Monitoreo", width: 100 },
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

