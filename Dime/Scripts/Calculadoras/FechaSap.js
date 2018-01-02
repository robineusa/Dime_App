$(document).ready(function () {
    FormatoFechas();
    document.getElementById('InfoGuion').style.display = 'none';
});

function FormatoFechas() {
    $('#fechaInicial').datetimepicker({
        format: 'd/m/Y',
        timepicker: false,
        currentText: "Now"
    });

}
function FechaSap() {
    $("#Guion").html('');
    var fechaInicial = $("#fechaInicial").val();
    var Dias = $("#diasHabiles").val();
        $.ajax({
            type: "POST",
            url: urlConsultarDiasFestivos,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ FechaInicio: fechaInicial, dias: Dias }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                $("#fecharesul").val(json);
                document.getElementById('InfoGuion').style.display = 'inline-block';
                $("#Guion").append('Su petición, queja o reclamo será contestada a más tardar el día <b>'+json +'</b> a través del mismo medio de atención por el que la presentó o por el medio de su elección. Si su petición, queja o reclamo no es atendida en la fecha indicada, se entenderá que ha sido resuelta a su favor. Esto se llama Silencio Administrativo Positivo.')
               
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }

        });
    
}


// @param string (string) : Fecha en formato YYYY-MM-DD
// @return (string)       : Fecha en formato DD/MM/YYYY
function convertDateFormat(string) {
    var info = string.split('-');
    return info[0] + '/' + info[1] + '/' + info[2];
}
