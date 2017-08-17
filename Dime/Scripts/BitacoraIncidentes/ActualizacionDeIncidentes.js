var Herramienta = $('#Herramienta1').val();
var TipoFalla = $('#TipoDeFalla1').val();
var Prioridad = $('#Prioridad1').val();

$(document).ready(function () {
    TraerListaDeHerramientas();
    TraerListaDeTiposDeFalla();
    TraerListaDePrioridades();

});
$.datetimepicker.setLocale('es');

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
            // creamos un variable que hace referencia al select
            var select = document.getElementById("Herramienta");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("Herramienta1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
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
            // creamos un variable que hace referencia al select
            var select = document.getElementById("TipoDeFalla");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("TipoDeFalla1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
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
            // creamos un variable que hace referencia al select
            var select = document.getElementById("Prioridad");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("Prioridad1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}