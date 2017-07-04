$(document).ready(function () {
    $("#cuentaCliente").on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BuscaCliente").click();
        }
    });
    

});