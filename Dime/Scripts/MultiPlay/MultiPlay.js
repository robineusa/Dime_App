$(document).ready(function () {
    $("#cuentaCliente").on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BuscaCliente").click();
        }
    });
    if ($("#Cedula").val() == "") {
        $("#BotonEnvia").css('display', 'none');
    } else { $("#BotonEnvia").css('display', 'block'); }

    setTimeout(function () {
        $("#Error").css('display', 'none');
    }, 8000);

});