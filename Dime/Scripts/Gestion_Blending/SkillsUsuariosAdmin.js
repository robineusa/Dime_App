$(document).ready(function () {
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");

    });
    TraerListaLineasBlending();
});

function TraerListaLineasBlending() {
    $.ajax({
        type: "GET",
        url: urlLineas,
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#NombreLineasBlendingSelect').append($('<option>', {
                    value: json[index].NombreLinea,
                    text: json[index].NombreLinea
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}