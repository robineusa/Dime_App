
$(document).ready(function () {
    $("#cuentaCliente").on("keyup", function (e) {
        
        var code = e.keyCode || e.which;
        if (code == 13) {
            alert();
            SubmitFormulario();
        }
    });
});

function SubmitFormulario()
{
    $("#BuscarCliente").click();
    alert();
}