$(document).ready(function () {
    TraerListaDeHerramientas();
    TraerListaDeTiposDeFalla();
    TraerListaDePrioridades();
});
$.datetimepicker.setLocale('es');

$('#FechaCreacionTicket').datetimepicker({
    dateFormat: 'd-m-Y 00:00',
    timepicker: true,
    step: 1
});
$('#FechaCierreTicket').datetimepicker({
    dateFormat: 'd-m-Y 00:00',
    timepicker: true,
    step: 1
});
$('#FechaCierreAfectacion').datetimepicker({
    dateFormat: 'd-m-Y 00:00',
    timepicker: true,
    step: 1
});
function TraerListaDeHerramientas() {
    $.ajax({
        type: "GET",
        url: UrlHerramientas,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Herramienta').append($('<option>', {
                    value: json[index].NombreHerramienta,
                    text: json[index].NombreHerramienta
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function TraerListaDeTiposDeFalla() {
    $.ajax({
        type: "GET",
        url: UrlListaTipoDeFalla,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoDeFalla').append($('<option>', {
                    value: json[index].TipoFalla,
                    text: json[index].TipoFalla
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function TraerListaDePrioridades() {
    $.ajax({
        type: "GET",
        url: UrlListaPrioridades,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Prioridad').append($('<option>', {
                    value: json[index].Prioridad,
                    text: json[index].Prioridad
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}