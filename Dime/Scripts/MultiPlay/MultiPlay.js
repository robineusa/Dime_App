$(document).ready(function () {

    $.datetimepicker.setLocale('es');
    //$("#FechaACTMultAC").val('NO APLICA');
    //$('#FechaACTMultAC').datetimepicker({
        
    //    format: 'Y-m-d',
    //    maxDate: '+0d',
    //    timepicker: false
    //});

    

    $("#cuentaCliente").on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BuscaCliente").click();
        }
    });
    
    //if ($("#cuentaCliente").val() == 0 || $("#cuentaCliente").val() == "") {
    //    $("#BotonEnvia").css('display', 'none');
    //} else { $("#BotonEnvia").css('display', 'block'); }

    setTimeout(function () {
        $("#Error").css('display', 'none');
    }, 8000);

    //$("#cuentaCliente").val('');
    $("#Observaciones").val('');
    
});