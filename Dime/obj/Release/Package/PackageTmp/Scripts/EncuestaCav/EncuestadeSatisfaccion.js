$('#operacion').change(function () {
    ValidaciondeOperacion();

})
function ValidaciondeOperacion() {
    if ($('#operacion').val() == '--SELECCIONE--') {
        var val1 = "";

        $('#cuenta').prop('readonly', true); $('#cuenta').val(val1);
        $('#celu').prop('readonly', true); $('#celu').val(val1);
        $('#contacto').prop('readonly', true); $('#contacto').val(val1);
        $('#correo').prop('readonly', true); $('#correo').val(val1);

    }
    else
        if ($('#operacion').val() == 'FIJA') {
            var val1 = "";

            $('#cuenta').prop('readonly', false); $('#cuenta').val(val1);
            $('#celu').prop('readonly', false); $('#celu').val(val1);
            $('#contacto').prop('readonly', false); $('#contacto').val(val1);
            $('#correo').prop('readonly', false); $('#correo').val(val1);
        }
        else
            if ($('#operacion').val() == 'MOVIL') {
                var val1 = "";
                var Valor2 = "0";
                $('#cuenta').prop('readonly', true); $('#cuenta').val(Valor2);
                $('#celu').prop('readonly', false); $('#celu').val(val1);
                $('#contacto').prop('readonly', false); $('#contacto').val(val1);
                $('#correo').prop('readonly', false); $('#correo').val(val1);

            } else
                if ($('#operacion').val() == 'MULTIPLAY') {
                    var val1 = "";
                    $('#cuenta').prop('readonly', false); $('#cuenta').val(val1);
                    $('#celu').prop('readonly', false); $('#celu').val(val1);
                    $('#contacto').prop('readonly', false); $('#contacto').val(val1);
                    $('#correo').prop('readonly', false); $('#correo').val(val1);
                }
                else {
                    var val1 = "";
                    $('#cuenta').prop('readonly', true); $('#cuenta').val(val1);
                    $('#celu').prop('readonly', true); $('#celu').val(val1);
                    $('#contacto').prop('readonly', true); $('#contacto').val(val1);
                    $('#correo').prop('readonly', true); $('#correo').val(val1);
                }
}