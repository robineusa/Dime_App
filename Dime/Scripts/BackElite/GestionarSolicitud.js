$(document).ready(function () {
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
            value: "0",
            text: "NO APLICA"
        }));
    } else if ($('#malescalado').val() == 'SI') {
        $('#detallemalescalado option').remove();
        $('#detallemalescalado').append($('<option>', {
            value: "0",
            text: "--SELECCIONE--"
        }));
        ListaMalEscalado();
    } else {
        $('#detallemalescalado option').remove();
        $('#detallemalescalado').append($('<option>', {
            value: "0",
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