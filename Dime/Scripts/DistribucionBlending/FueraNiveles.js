$(document).ready(function () {
    ListaTipoDeContacto();
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li3").css('background-color', 'transparent');
        $("#Li4").css('background-color', 'transparent');
        $("#Li5").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li4").css("background-color", "transparent");
        $("#Li5").css('background-color', 'transparent');
        $("#Li2").css("background-color", "#dcdcdc");

    });

    $("#Li3").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li4").css("background-color", "transparent");
        $("#Li5").css('background-color', 'transparent');
        $("#Li3").css("background-color", "#dcdcdc");

    });

    $("#Li4").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li5").css('background-color', 'transparent');
        $("#Li4").css("background-color", "#dcdcdc");

    });

    $("#Li5").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li4").css('background-color', 'transparent');
        $("#Li5").css("background-color", "#dcdcdc");

    });
   
});
function ListaTipoDeContacto() {
    $.ajax({
        type: "POST",
        url: urlControlTipoContatoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ gestion: 12 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tipoContactosSelect').append($('<option>', {
                    value: json[index].IdTipoContacto,
                    text: json[index].TipoContacto
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function ListaCierre() {
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
 }

function ListaRazones() {
    var IdCierre = $('#tiposCierresSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposRazonesList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idCierre: IdCierre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposRazonSelect').append($('<option>', {
                    value: json[index].IdRazon,
                    text: json[index].Razon
                }));

            }

        }
    });
    $('#tiposRazonSelect').find('option:not(:first)').remove();
    $('#tiposCausasSelect').find('option:not(:first)').remove();
    
}
function ListaCausas() {
    var IdRazon = $('#tiposRazonSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposCausasList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idRazon: IdRazon }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposCausasSelect').append($('<option>', {
                    value: json[index].IdCausa,
                    text: json[index].Causa
                }));

            }

        }
    });
    $('#tiposCausasSelect').find('option:not(:first)').remove();
}
$('#tipoContactosSelect').change(function () {
    ListaCierre();
    ListaRazones();
    ListaCausas();
})
$('#tiposCierresSelect').change(function () {
    ListaRazones();
    ListaCausas();
    
})
$('#tiposRazonSelect').change(function () {
    ListaCausas();
    var IdRazon = $('#tiposRazonSelect').val();
    if (IdRazon == "132") {
        document.getElementById('TituloSeguimiento').style.display = 'inline-block';
        document.getElementById('TituloSeguimiento').style.width = '100%';
        document.getElementById('CuerpoSeguimineto').style.display = 'inline-block';
        document.getElementById('CuerpoSeguimineto').style.width = '100%';
    }
    else {
        document.getElementById('TituloSeguimiento').style.display = 'none';
        document.getElementById('CuerpoSeguimineto').style.display = 'none';
    }
    $('#CC_Fecha').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });
})
