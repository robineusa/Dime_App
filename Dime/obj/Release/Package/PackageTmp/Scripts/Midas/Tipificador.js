$(document).ready(function () {
    $("#Li1").click(function () {
        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
    });
    $("#Li2").click(function () {
        $("#Li1").css('background-color', 'transparent');
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
    });
});

$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    var Cuenta = $("#CuentaCliente").val();
    if (Cuenta == "" || Cuenta == null || Cuenta == "0") {
    } else {
        DatosClienteCuenta(Cuenta);
    }

});

function DatosClienteCuenta(Cuenta) {

    $.ajax({
        type: "POST",
        url: UrlInformacionClienteTipificadorMidas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            //$('#Nota1').val(json.Nota1);
            //$('#Nota2').val(json.Nota2);

        }
    });

}