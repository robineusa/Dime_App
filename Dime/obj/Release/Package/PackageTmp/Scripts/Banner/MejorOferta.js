$(document).ready(function () {
    $('#DDLOfre1 option').prop('selected', function () { return this.defaultSelected; });
    SetearTiposContacto();
    $("#DDLOfre1").prop("selectedIndex", 0);
});

$('#DDLOfre1').change(function () {
    Ofrecimiento1();
 });
$('#DDLOfre2').change(function () {
    Ofrecimiento2();
});
$('#DDLOfre3').change(function () {
    Ofrecimiento3();
});

function Ofrecimiento1() {
    if ($("#DDLOfre1").val() == "1") {
        $("#DDLOfre2").val('0');
        $("#DDLOfre3").val('0');
        $("#2ofre").css("display", "none");
        $("#3ofre").css("display", "none");
    }
    else if ($("#DDLOfre1").val() == "0") {
        $("#DDLOfre2").val('');
        $("#DDLOfre3").val('');
        $("#2ofre").css("display", "block");
        $("#3ofre").css("display", "none");
    } else if ($("#DDLOfre1").val() == "") {
        $("#DDLOfre2").val('');
        $("#DDLOfre3").val('');
        $("#2ofre").css("display", "none");
        $("#3ofre").css("display", "none");
    }
}

function Ofrecimiento2() {
    if ($("#DDLOfre2").val() == "1") {
        $("#DDLOfre1").val('0');
        $("#DDLOfre3").val('0');
        $("#3ofre").css("display", "none");
    } else if ($("#DDLOfre2").val() == "0") {
        $("#DDLOfre3").val('');
        $("#3ofre").css("display", "block");
    } else if ($("#DDLOfre2").val() == "") {
        $("#DDLOfre3").val('');
        $("#3ofre").css("display", "none");
    }
}
function Ofrecimiento3() {

}


function SetearTiposContacto() {

    $.ajax({
        type: "POST",
        url: urlControlTipoContatoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ gestion: 9 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];

            for (var index = 0, len = json.length; index < len; index++) {
                $('#tipoContactosSelect').append($('<option>', {
                    value: json[index].IdTipoContacto,
                    text: json[index].TipoContacto,

                }));


            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function SetearRazonesChoices() {
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

    $('#Gest').val($('#tiposCierresSelect option:selected').text());
    $('#tiposRazonSelect').find('option:not(:first)').remove();
    $('#tiposCausasSelect').find('option:not(:first)').remove();

}

function SetearCausaChoices() {
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

    $('#Cier').val($('#tiposRazonSelect option:selected').text());
    $('#tiposCausasSelect').find('option:not(:first)').remove();
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
                }, '</option>'));
        }
        }
    });
    $('#TipCon').val($('#tipoContactosSelect option:selected').text());
    $('#tiposCierresSelect').find('option:not(:first)').remove();
    $('#tiposRazonSelect').find('option:not(:first)').remove();
    $('#tiposCausasSelect').find('option:not(:first)').remove();
}

function TextoRazon() {
    $('#Raz').val($('#tiposCausasSelect option:selected').text());
}
