$(document).ready(function () {
    ListaProcesos();
});
function ListaProcesos() {
    $.ajax({
        type: "POST",
        url: urlProcesos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Procesos').append($('<option>', {
                    value: json[index].IdProceso,
                    text: json[index].Proceso
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function ListaLineas() {
    var IdProceso = $('#Procesos').val();
    $.ajax({
        type: "POST",
        url: urlLineas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdProceso: IdProceso }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Lineas').append($('<option>', {
                    value: json[index].IdLinea,
                    text: json[index].NombreLinea
                }));

            }

        }
    });
    $('#Lineas').find('option:not(:first)').remove();
}
$('#Procesos').change(function () {
    ListaLineas();
})