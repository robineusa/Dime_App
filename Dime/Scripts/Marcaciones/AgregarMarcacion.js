

$('#Razon').keyup(function () {
    GenerarSubmarcacion();
});
$('#Subrazon').keyup(function () {
    GenerarSubmarcacion();
});

function GenerarSubmarcacion() {
    var Val1 = $('#Razon').val();
    var Val2 = $('#Subrazon').val();
    var submarcacion = Val1 + Val2;
    $('#subMarcacion').val(submarcacion);
}

$('#Clase').change(function () {
    if ($('#Clase').val() == "QUE") {
        $('#Qmf').prop('disabled', false);
    } else {
        $('#Qmf').prop('disabled', true);
    }
});



$(window).load(function () {
    console.log("mensaje2");

    setTimeout(function () {
        $('#cke_20').hide();
        $('#cke_24').hide();
        $('#cke_29').hide();
        $('#cke_31').hide();
    }, 500);


});