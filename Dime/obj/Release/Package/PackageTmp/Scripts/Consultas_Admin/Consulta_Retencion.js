$(document).ready(function () {
    $.datetimepicker.setLocale('es');
    $('#Fecha_Inicial').datetimepicker({
        format: 'Y-m-d',
        maxDate: '+0d',
        timepicker: false
    });

    $('#Fecha_Final').datetimepicker({
        format: 'Y-m-d',
        onShow: function (ct) {
            this.setOptions({
                minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
            })
        },
        maxDate: '+0d',
        timepicker: false
    });
});

$("#Fecha_Final").blur(function (event) {
    event.preventDefault();
    var fechaInicial = $("#Fecha_Inicial").val();
    if (fechaInicial == "") {
        $("#warningLabel").text("Debe primero introducir una fecha inicial");
        alert('Debe seleccionar una fecha Inicial');
    } else {

        CargarDatosGestion();
    }



})


function CargarDatosGestion() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlRetencionConsulta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        beforeSend: function () {
            $("#loaderDiv").show();
        },
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
            ShowGridGestiones(json);
            $("#loaderDiv").hide();
        },
        error: function (data) {
            $("#loaderDiv").hide();
            var errors = data.responseJSON;
            alert(errors);
        }
    });
}
