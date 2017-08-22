var Gerencia = $('#Gerencia1').val();
var Aliado = $('#Aliado1').val();


$(document).ready(function () {
    TraerListaDeGerencias();
    TraerListaDeAliados();
    ValidarNombreOperacion();
});
$('#Gerencia').change(function () {
    var IdNuevaGerencia = document.getElementById("Gerencia");
    var NuevaGerencia = IdNuevaGerencia.options[IdNuevaGerencia.selectedIndex].text;
    $('#Gerencia1').val(NuevaGerencia);
})
$('#Aliado').change(function () {
    var IdNuevoAliado = document.getElementById("Aliado");
    var NuevoAliado = IdNuevoAliado.options[IdNuevoAliado.selectedIndex].text;
    $('#Aliado1').val(NuevoAliado);
})
function TraerListaDeGerencias() {
    $.ajax({
        type: "GET",
        url: UrlListaDeGerencias,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Gerencia').append($('<option>', {
                    value: json[index].IdGerencia,
                    text: json[index].NombreGerencia
                }));

            }
            if (Gerencia !="0") {
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Gerencia");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Gerencia1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].value == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                    }
                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function TraerListaDeAliados() {
    $.ajax({
        type: "GET",
        url: UrlListadeAliados,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Aliado').append($('<option>', {
                    value: json[index].IdAliado,
                    text: json[index].NombreAliado
                }));

            }
            if (Aliado !="0") {
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Aliado");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Aliado1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].value == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                    }
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
$('#NombreOperacion1').blur(function () {
    var OperacionFinal = "";
    var OperacionEscrita = $('#NombreOperacion1').val();
    var IdAliado = document.getElementById("Aliado");
    var Aliado = IdAliado.options[IdAliado.selectedIndex].text;
    OperacionFinal = Aliado + ' ' + OperacionEscrita;
    OperacionFinal = OperacionFinal.toUpperCase();
    $('#NombreOperacion').val(OperacionFinal);
    
})
function ValidarNombreOperacion() {
    if (Gerencia != "0") {
        var NombreOp = $('#NombreOperacion').val();
        $('#NombreOperacion1').val(NombreOp);
    }
    else {

    }
}