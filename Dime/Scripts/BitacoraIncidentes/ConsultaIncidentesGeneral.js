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
        url: UrlConsultaIncidentesGeneralJson,
        contentType: "application/json; charset=utf-8",
        data: { F1: F1, F2: F2 },
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
        data[i].FechaDeRegistro = kendo.toString(kendo.parseDate(data[i].FechaDeRegistro, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeCreacionTicket = kendo.toString(kendo.parseDate(data[i].FechaDeCreacionTicket, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeCierreTicket = kendo.toString(kendo.parseDate(data[i].FechaDeFinalizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeCierreAfectacion = kendo.toString(kendo.parseDate(data[i].FechaDeCierreAfectacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaPrincipalIncidentes.xlsx",
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
        { field: "IdRegistro", title: "Id Registro", width: 100 },
        { field: "UsuarioCreacion", title: "Usuario Creacion", width: 100 },
        { field: "NombreUsuarioCreacion", title: "Nombre Usuario Creacion", width: 100 },
        { field: "FechaDeRegistro", title: "Fecha De Registro", width: 100 },
        { field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 100 },
        { field: "UsuarioUltimaActualizacion", title: "Usuario Ultima Actualizacion", width: 100 },
        { field: "NombreUsuarioUltimaActualizacion", title: "Nombre Usuario Ultima Actualizacion", width: 100 },
        { field: "CasoSD", title: "Caso SD", width: 100 },
        { field: "IM", title: "IM", width: 100 },
        { field: "FechaDeCreacionTicket", title: "Fecha  DeCreacion Ticket", width: 100 },
        { field: "FechaDeCierreTicket", title: "FechaDeCierreTicket", width: 100 },
        { field: "FechaDeCierreAfectacion", title: "Fecha De Cierre Afectacion", width: 100 },
        { field: "Herramienta", title: "Herramienta", width: 100 },
        { field: "TipoDeFalla", title: "Tipo De Falla", width: 100 },
        { field: "ModuloAfectado", title: "Modulo Afectado", width: 100 },
        { field: "DescripcionAfectacion", title: "Descripcion Afectacion", width: 100 },
        { field: "Prioridad", title: "Prioridad", width: 100 },
        { field: "EscaladoA", title: "Escalado A", width: 100 },
        { field: "CantidadUsuariosAfectados", title: "Cantidad Usuarios Afectados", width: 100 },
        { field: "ComentariosDeCierre", title: "Comentarios De Cierre", width: 100 },
        { field: "EstadoDelCaso", title: "Estado Del Caso", width: 100 },
        { field: "UsuarioGestionando", title: "Usuario Gestionando", width: 100 },
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
