
$("#btnRegistrar").on("click", function () {

    var resultPreguntas = [];
    for (var i = 0; i < 5; i++) {
        resultPreguntas[i] = ($("#pregunta" + (i + 1)).val());
    }

    if (PreguntasDiferentes(resultPreguntas) == true)
    {resultPreguntas = [];
        for (var i = 0; i < 5; i++) {
            resultPreguntas[i] = ($("#pregunta" + (i + 1)).val());
        }
        var idUsuario = idUsuarioPage;
        var datosFullUsuario = datosFullUsuarioPage;
        var sesionUsuario = sesionUsuarioPage;
        var resultRespuestas = [];
        for (var i = 0; i < 5; i++) {
            resultRespuestas[i] = ($("#respuesta" + (i + 1)).val());
        }

        $("#redText").empty();


        $.ajax({
            type: "POST",
            url: urlSRegistroPregConfirm,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ respuestas: resultRespuestas,preguntas:resultPreguntas, idUsuario: idUsuario,
                datosFullUsuario: datosFullUsuario, sesionUsuario:sesionUsuario }),
            dataType: "json",
            crossDomain: true,
            success: function(result){
                console.log(result);
                window.location.href = result;
            }
        });

    }
    else {

        $("#redText").empty();
        $("#redText").append('Las preguntas deben ser diferentes');

    }


});

function PreguntasDiferentes(preguntasPassed) {
    var preguntas = preguntasPassed;
    for (var i = 0; i <= (preguntas.length+1) ; i++) {
        var valor = preguntas[0];
        preguntas.splice(0, 1);
        if (preguntas.indexOf(valor) != -1)
            return false;
    }
    return true;
};
