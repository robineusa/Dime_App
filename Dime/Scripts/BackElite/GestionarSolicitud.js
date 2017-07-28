$(document).ready(function () {
    TraerInformacionListaInteracciones();
    ListaGestion();
    ListaMalEscalado();
    });
$.datetimepicker.setLocale('es');
$('#fechaagenda').datetimepicker({
    dateFormat: 'd-m-Y 00:00',
    timepicker: true,
    step: 1
});
function ListaGestion() {
    var IdTipo = $('#idescalamiento').val();
    $.ajax({
        type: "POST",
        url: urllistagestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdTipo: IdTipo }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#gestion').append($('<option>', {
                    value: json[index].IdGestion,
                    text: json[index].NombreGestion
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function ListaMalEscalado() {
    var IdTipo = $('#idescalamiento').val();
    $.ajax({
        type: "POST",
        url: urlRazonMalEscalado,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdTipo: IdTipo }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#detallemalescalado').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].NombreRazonEscalamiento
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

$('#gestion').change(function () {
    TraerEstadoCaso();
})

$('#malescalado').change(function () {
    
    if ($('#malescalado').val() == 'NO') {
        $('#detallemalescalado option').prop('selected', function () { return this.defaultSelected; });
        $('#detallemalescalado option').remove();
        $('#detallemalescalado').append($('<option>', {
            value: "NO APLICA",
            text: "NO APLICA"
        }));
    } else if ($('#malescalado').val() == 'SI') {
        $('#detallemalescalado option').remove();
        $('#detallemalescalado').append($('<option>', {
            value: "NO APLICA",
            text: "--SELECCIONE--"
        }));
        ListaMalEscalado();
    } else {
        $('#detallemalescalado option').remove();
        $('#detallemalescalado').append($('<option>', {
            value: "NO APLICA",
            text: "--SELECCIONE--"
        }));
    }

})



function TraerEstadoCaso() {
    var idGestion = $('#gestion').val();
    $.ajax({
        type: "POST",
        url: urlestadogestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idGestion: idGestion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            $('#estado').val(json.EstadoGestion);
            
        }
    });

}

function TraerInformacionListaInteracciones() {
    var IdSolicitud = $('#IDSOLICITUD').val();
    $.ajax({
        type: "GET",
        url: urllistainteracciones,
        contentType: "application/json; charset=utf-8",
        data: { IdSolicitud: IdSolicitud},
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cambiarfechas(json);
            cargargrilla(json);
            
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#InteraccionesSolicitud").kendoGrid({
        
        dataSource: {
            data: data
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
        { field: "Id", title: "Id Transaccion", width: 100 },
        { field: "FechaUltimaActualizacion", title: "Fecha Transaccion", width: 100 },
        { field: "NombreUsuarioUltimaActualizacion", title: "Usuario Transaccion", width: 100 },
        { field: "Malescalado", title: "Mal Escalado", width: 100, filterable: false },
        { field: "DetalleMalEscalado", title: "Detalle Mal Escalado", width: 100, filterable: false },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "EstadoEscalamiento", title: "Estado", width: 100, filterable: false },
        { field: "Observaciones", title: "Observaciones", width: 300, filterable: false }
        ]

    });
}