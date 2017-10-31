$(document).ready(function () {
    ListaMotivos();
});

function ListaMotivos() {
    $.ajax({
        type: "POST",
        url: UrlListaMotivosJson,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#motivo').append($('<option>', {
                    value: json[index].IdMotivo,
                    text: json[index].Motivo
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}