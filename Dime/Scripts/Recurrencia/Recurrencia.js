$(document).ready(function () {

    $("#inputCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BotonEnvia").click();
        }
    });
    SetMacroProcesoRecurrencia();
});

function SetMacroProcesoRecurrencia() {
    $.ajax({
        type: "POST",
        url: urlMacroProcesoRecurrenciaList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idProceso: 1 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];

            for (var index = 0, len = json.length; index < len; index++) {
                $('#MacroProcesoRecurrencia1').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
                $('#MacroProcesoRecurrencia2').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
                $('#MacroProcesoRecurrencia3').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}