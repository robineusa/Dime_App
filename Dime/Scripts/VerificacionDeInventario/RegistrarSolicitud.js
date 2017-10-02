$(document).ready(function () {
    ListaTiepoDeRequerimientos();
});

function ListaTiepoDeRequerimientos() {
    $.ajax({
        type: "POST",
        url: UrlListaTiposDeRequerimientos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoDeRequerimiento').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].TipoDeRequerimiento
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}