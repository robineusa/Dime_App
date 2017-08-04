$(document).ready(function () {
    ListaTiposDeEscalamientos();

});
function ListaTiposDeEscalamientos() {
    $.ajax({
        type: "POST",
        url: UrlListaTipoDeEscalamientosJson,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipodeSolicitud').append($('<option>', {
                    value: json[index].IdTipo,
                    text: json[index].TipoEscalamiento
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}