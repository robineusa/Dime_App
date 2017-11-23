$(document).ready(function () {
    ListarMotivosCancelacion();
    var options = {

    };

    // bind form using 'ajaxForm' 
    //$('#formCrearSubmotivos').ajaxForm(options);
});

function ListarMotivosCancelacion() {
    $.ajax({
        type: "POST",
        url: UrlListaTiposDeRequerimientos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                if (json[index].Eliminado == 0) {
                    $('#sltMotivosCancelacion').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].Motivo
                    }

                    ))
                };

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}