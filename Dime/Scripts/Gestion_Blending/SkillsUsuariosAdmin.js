$(document).ready(function () {
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");

    });
    TraerListaLineasBlending();
});

function TraerListaLineasBlending() {
    $.ajax({
        type: "GET",
        url: urlLineas,
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#NombreLineasBlendingSelect').append($('<option>', {
                    value: json[index].NombreLinea,
                    text: json[index].NombreLinea
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function BuscaUsuariosForList()
{
   var Operacion =  $('#NombreLineasBlendingSelect').val();
   $.ajax({
       type: "POST",
       url: urlUsuariosporOperacion,
       contentType: "application/json; charset=utf-8",
       data: JSON.stringify({ Operacion: Operacion }),
       dataType: "JSON",
       success: function (result) {
           var json = JSON.parse(result);
           ShowGridGestiones(json);
       }
   });
}


function SetearCierresChoices() {
    var IdContacto = $('#tipoContactosSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposCierresList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idContacto: IdContacto }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposCierresSelect').append($('<option>', {
                    value: json[index].IdCierre,
                    text: json[index].Cierre
                }));

            }

        }
    });


    $('#tiposCierresSelect').find('option:not(:first)').remove();
    $('#tiposRazonSelect').find('option:not(:first)').remove();
    $('#tiposCausasSelect').find('option:not(:first)').remove();
    $('#tiposMotivosSelect').find('option:not(:first)').remove();
}