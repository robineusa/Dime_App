var TipoEquipo = $('#TipoDeEquipo1').val();

$(document).ready(function () {
    ListaTipoDeEquipos();
});

function ListaTipoDeEquipos() {
    $.ajax({
        type: "POST",
        url: UrlListaTipoDeEquipos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoDeEquipo').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].TipoDeEquipo
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("TipoDeEquipo");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("TipoDeEquipo1").value;
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
$('#TipoDeEquipo').change(function () {
    var NuevoIdEquipo = document.getElementById("TipoDeEquipo");
    var NuevoEquipo = NuevoIdEquipo.options[NuevoIdEquipo.selectedIndex].text;
    $('#TipoDeEquipo1').val(NuevoEquipo);
})