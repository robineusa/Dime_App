$(document).ready(function () {
    ListarRecursiva();
    var options = {

    };

    // bind form using 'ajaxForm' 
    //$('#formCrearSubmotivos').ajaxForm(options);
});
var Lineas = ['', '-', '--', '---', '----', '-----', '------', '-------', '-------'];

function ListarRecursiva() {
    $.ajax({
        type: "POST",
        url: UrlListadoPadres,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                //if (json[index].Eliminado == 0) {
                $('#sltPadreRecursiva').append($('<option>', {
                    value: json[index].Id,
                    text: Lineas[json[index].Nivel] + json[index].Nombre
                }

                ))
                //};

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}