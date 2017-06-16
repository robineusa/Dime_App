$(document).ready(function () {
    TraerListaDepartamentos();
});

$("#Li1").click(function () {

    $("#Li2").css('background-color', '#f6f6f6');
    $("#Li1").css("background-color", "#dcdcdc");
});

$("#Li2").click(function () {
    $("#Li1").css("background-color", "#f6f6f6");
    $("#Li2").css("background-color", "#dcdcdc");
});

$("#Li3").click(function () {

    $("#Li4").css('background-color', '#f6f6f6');
    $("#Li3").css("background-color", "#dcdcdc");
});

$("#Li4").click(function () {
    $("#Li3").css("background-color", "#f6f6f6");
    $("#Li4").css("background-color", "#dcdcdc");
});
$('#tipoDireccion').change(function () {
    ValidarTipoDireccion();
    limpiarcontroles();
})

function ValidarTipoDireccion() {
    if ($('#tipoDireccion').val() == '--Seleccione--') {
        document.getElementById('tabladirBasica').style.display = 'none';
        document.getElementById('tabladirbarriomanzana').style.display = 'none';
        document.getElementById('tabladirintraducible').style.display = 'none';
        document.getElementById('tabladirmultiorigen').style.display = 'none';
    }
    else
        if ($('#tipoDireccion').val() == 'Basica') {
            document.getElementById('tabladirBasica').style.display = 'inline-block';
            document.getElementById('tabladirbarriomanzana').style.display = 'none';
            document.getElementById('tabladirintraducible').style.display = 'none';
            document.getElementById('tabladirmultiorigen').style.display = 'none';
        }
        else
            if ($('#tipoDireccion').val() == 'Barrio Manzana') {
                document.getElementById('tabladirBasica').style.display = 'none';
                document.getElementById('tabladirbarriomanzana').style.display = 'inline-block';
                document.getElementById('tabladirintraducible').style.display = 'none';
                document.getElementById('tabladirmultiorigen').style.display = 'none';

            }
            else
                if ($('#tipoDireccion').val() == 'Intraducible') {
                    document.getElementById('tabladirBasica').style.display = 'none';
                    document.getElementById('tabladirbarriomanzana').style.display = 'none';
                    document.getElementById('tabladirintraducible').style.display = 'inline-block';
                    document.getElementById('tabladirmultiorigen').style.display = 'none';

                }
                else
                    if ($('#tipoDireccion').val() == 'Multiorigen') {

                        document.getElementById('tabladirBasica').style.display = 'none';
                        document.getElementById('tabladirbarriomanzana').style.display = 'none';
                        document.getElementById('tabladirintraducible').style.display = 'none';
                        document.getElementById('tabladirmultiorigen').style.display = 'inline-block';
                    }
                    else {
                        {
                            document.getElementById('tabladirBasica').style.display = 'none';
                            document.getElementById('tabladirbarriomanzana').style.display = 'none';
                            document.getElementById('tabladirintraducible').style.display = 'none';
                            document.getElementById('tabladirmultiorigen').style.display = 'none';
                        }
                    }

}
function generarDireccionFinalBasica() {
    var Tipodevia = "";
    var Viaprincipal = "";
    var Cuadrante = "";
    var Placa = "";
    var Complemento = "";

    if ($('#dbtipoDeVia').val() != "") { Tipodevia = 'TIPO DE VIA: ' + $('#dbtipoDeVia').val() + ' '; } else { }
    if ($('#db_viaprincipal').val() != "") { Viaprincipal = 'VIA PRINCIPAL: ' + $('#db_viaprincipal').val() + ' '; } else { }
    if ($('#db_cuadrante').val() != "") { Cuadrante = ' CUADRANTE: ' + $('#db_cuadrante').val() + ' '; } else { }
    if ($('#db_placa').val() != "") { Placa = 'PLACA: ' + $('#db_placa').val() + ' '; } else { }
    if ($('#db_complemento').val() != "") { Complemento = 'COMPLEMENTO: ' + $('#db_complemento').val() + ' '; } else { }
    var Direccionfinal = Tipodevia + Viaprincipal + Cuadrante + Placa + Complemento;
    $('#cd_direccionfinal').val(Direccionfinal);
}
function generarDireccionFinalBarriomanzana() {
    var Barrio = "";
    var Placa = "";
    var Complemento = "";
    if ($('#dbm_barrio').val() != "") { Barrio = 'BARRIO: ' + $('#dbm_barrio').val() + ' '; } else { }
    if ($('#dbm_placa').val() != "") { Placa = 'PLACA: ' + $('#dbm_placa').val() + ' '; } else { }
    if ($('#dbm_complemento').val() != "") { Complemento = 'COMPLEMENTO: ' + $('#dbm_complemento').val() + ' '; } else { }
    var Direccionfinal = Barrio + Placa + Complemento;
    $('#cd_direccionfinal').val(Direccionfinal);
}

function generarDireccionFinalIntraducible() {
    var Viaovereda = "";
    var Nombreviaovereda = "";
    var Kilometro = "";
    var Sector = "";
    var Nombresector = "";
    var Urbofinca = "";
    var Placa = "";
    var Complemento = "";
    if ($('#di_viavereda').val() != "") { Viaovereda = 'VIA O VEREDA: ' + $('#di_viavereda').val() + ' '; } else { }
    if ($('#di_nombreviavereda').val() != "") { Nombreviaovereda = 'NOMBRE VIA O VEREDA: ' + $('#di_nombreviavereda').val() + ' '; } else { }
    if ($('#di_kilometro').val() != "") { Kilometro = 'KILOMETRO: ' + $('#di_kilometro').val() + ' '; } else { }
    if ($('#di_sector').val() != "") { Sector = 'SECTOR: ' + $('#di_sector').val() + ' '; } else { }
    if ($('#di_nombredelsector').val() != "") { Nombresector = 'NOMBRE DEL SECTOR: ' + $('#di_nombredelsector').val() + ' '; } else { }
    if ($('#di_urbofinca').val() != "") { Urbofinca = 'URB O FINCA: ' + $('#di_urbofinca').val() + ' '; } else { }
    if ($('#di_placa').val() != "") { Placa = 'PLACA: ' + $('#di_placa').val() + ' '; } else { }
    if ($('#di_complemento').val() != "") { Complemento = 'COMPLEMENTO: ' + $('#di_complemento').val() + ' '; } else { }
    var Direccionfinalintraducible = Viaovereda + Nombreviaovereda + Kilometro + Sector + Nombresector + Urbofinca + Placa + Complemento;
    $('#cd_direccionfinal').val(Direccionfinalintraducible);

}
function generarDireccionFinalMultiorigen() {
    var Tipodevia = "";
    var Viaprincipal = "";
    var Cuadrante = "";
    var Barrio = "";
    var Placa = "";
    var Complemento = "";
    if ($('#dmtipoDeVia').val() != "") { Tipodevia = 'TIPO DE VIA: ' + $('#dmtipoDeVia').val() + ' '; } else { }
    if ($('#dm_viaprincipal').val() != "") { Viaprincipal = 'VIA PRINCIPAL: ' + $('#dm_viaprincipal').val() + ' '; } else { }
    if ($('#dm_cuadrante').val() != "") { Cuadrante = 'CUADRANTE: ' + $('#dm_cuadrante').val() + ' '; } else { }
    if ($('#dm_barrio').val() != "") { Barrio = 'BARRIO: ' + $('#dm_barrio').val() + ' '; } else { }
    if ($('#dm_placa').val() != "") { Placa = 'PLACA: ' + $('#dm_placa').val() + ' '; } else { }
    if ($('#dm_complemento').val() != "") { Complemento = 'COMPLEMENTO: ' + $('#dm_complemento').val() + ' '; } else { }
    var DireccionfinalMultiorigen = Tipodevia + Viaprincipal + Cuadrante + Barrio + Placa + Complemento;
    $('#cd_direccionfinal').val(DireccionfinalMultiorigen);
}

$('#dbtipoDeVia').change(function () {
    generarDireccionFinalBasica();
})
$('#db_viaprincipal').keyup(function () {
    generarDireccionFinalBasica();
})
$('#db_cuadrante').keyup(function () {
    generarDireccionFinalBasica();
})
$('#db_placa').keyup(function () {
    generarDireccionFinalBasica();
})
$('#db_complemento').keyup(function () {
    generarDireccionFinalBasica();
})
$('#dbm_barrio').keyup(function () {
    generarDireccionFinalBarriomanzana();
})
$('#dbm_placa').keyup(function () {
    generarDireccionFinalBarriomanzana();
})
$('#dbm_complemento').keyup(function () {
    generarDireccionFinalBarriomanzana();
})
$('#di_viavereda').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_nombreviavereda').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_kilometro').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_sector').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_nombredelsector').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_urbofinca').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_placa').keyup(function () {
    generarDireccionFinalIntraducible();
})

$('#di_complemento').keyup(function () {
    generarDireccionFinalIntraducible();
})
$('#dmtipoDeVia').change(function () {
    generarDireccionFinalMultiorigen();
})
$('#dm_viaprincipal').keyup(function () {
    generarDireccionFinalMultiorigen();
})
$('#dm_cuadrante').keyup(function () {
    generarDireccionFinalMultiorigen();
})
$('#dm_barrio').keyup(function () {
    generarDireccionFinalMultiorigen();
})
$('#dm_placa').keyup(function () {
    generarDireccionFinalMultiorigen();
})
$('#dm_complemento').keyup(function () {
    generarDireccionFinalMultiorigen();
})

function limpiarcontroles() {
    $('input').val('');
    $('#dbtipoDeVia option').prop('selected', function () { return this.defaultSelected; });
    $('#dmtipoDeVia option').prop('selected', function () { return this.defaultSelected; });
}

$('#MotivoTrasladoFallido').change(function () {
    MostrarCamposRequeridos();
})
function MostrarCamposRequeridos() {
    if ($('#MotivoTrasladoFallido').val() == "AUMENTO TARIFA TRASLADO") {
        ReiniciarAvisosCampos();
        document.getElementById('Aviso2').style.display = 'inline-block';
        document.getElementById('DCuentaCliente').style.display = 'inline-block';
        document.getElementById('DEstratoOrigen').style.display = 'inline-block';
        document.getElementById('DEstratoDestino').style.display = 'inline-block';
        document.getElementById('DTelefonoFijo').style.display = 'inline-block';
        document.getElementById('DTelefonoCelular').style.display = 'inline-block';
        document.getElementById('DTarifaActual').style.display = 'inline-block';
        document.getElementById('DTarifaNueva').style.display = 'inline-block';
        document.getElementById('DCorreo').style.display = 'inline-block';
    }
    else if ($('#MotivoTrasladoFallido').val() == "CIENTE NO ESPERA TIEMPOS DE GESTION PARA EL TRASLADO") {
        ReiniciarAvisosCampos();
        document.getElementById('Aviso5').style.display = 'inline-block';
        document.getElementById('DCuentaCliente').style.display = 'inline-block';
        document.getElementById('DGestionPorTraslado').style.display = 'inline-block';
    }
    else if ($('#MotivoTrasladoFallido').val() == "FUERA DE COBERTURA") {
        ReiniciarAvisosCampos();
        document.getElementById('Aviso1').style.display = 'inline-block';
        document.getElementById('DCuentaCliente').style.display = 'inline-block';
        document.getElementById('DTelefonoFijo').style.display = 'inline-block';
        document.getElementById('DTelefonoCelular').style.display = 'inline-block';
    }
    else if ($('#MotivoTrasladoFallido').val() == "HOME PASS OCUPADO") {
        ReiniciarAvisosCampos();
        document.getElementById('Aviso3').style.display = 'inline-block';
        document.getElementById('DCuentaOcupa').style.display = 'inline-block';
        document.getElementById('DCuentaTraslada').style.display = 'inline-block';
        document.getElementById('DTelefonoFijo').style.display = 'inline-block';
        document.getElementById('DTelefonoCelular').style.display = 'inline-block';

    }
    else if ($('#MotivoTrasladoFallido').val() == "MATRIZ SIN ACOMETIDA") {
        ReiniciarAvisosCampos();
        document.getElementById('Aviso4').style.display = 'inline-block';
        document.getElementById('DCuentaCliente').style.display = 'inline-block';
        document.getElementById('DCuentaMatriz').style.display = 'inline-block';
        document.getElementById('DEstadoMatriz').style.display = 'inline-block';
        document.getElementById('DNodo').style.display = 'inline-block';
        document.getElementById('DNombreConjunto').style.display = 'inline-block';
        document.getElementById('DTelefonoCelular').style.display = 'inline-block';
    }
    else {
        ReiniciarAvisosCampos();
    }
}
function ReiniciarAvisosCampos() {
    //avisos
    document.getElementById('Aviso1').style.display = 'none';
    document.getElementById('Aviso2').style.display = 'none';
    document.getElementById('Aviso3').style.display = 'none';
    document.getElementById('Aviso4').style.display = 'none';
    document.getElementById('Aviso5').style.display = 'none';
    //campos para mostrar
    document.getElementById('DCuentaCliente').style.display = 'none';
    document.getElementById('DCuentaOcupa').style.display = 'none';
    document.getElementById('DCuentaTraslada').style.display = 'none';
    document.getElementById('DCuentaMatriz').style.display = 'none';
    document.getElementById('DNombreConjunto').style.display = 'none';
    document.getElementById('DEstadoMatriz').style.display = 'none';
    document.getElementById('DEstratoOrigen').style.display = 'none';
    document.getElementById('DEstratoDestino').style.display = 'none';
    document.getElementById('DTarifaActual').style.display = 'none';
    document.getElementById('DTarifaNueva').style.display = 'none';
    document.getElementById('DGestionPorTraslado').style.display = 'none';
    document.getElementById('DNodo').style.display = 'none';
    document.getElementById('DTelefonoFijo').style.display = 'none';
    document.getElementById('DTelefonoCelular').style.display = 'none';
    document.getElementById('DCorreo').style.display = 'none';
    //limpiar valores
    limpiarcontroles();
}
function limpiarcontroles() {
    var CuentaCliente = document.getElementById('CuentaCliente');
    CuentaCliente.value = "";
    var CuentaOcupada = document.getElementById('CuentaOcupada');
    CuentaOcupada.value = "";
    var CuentaTraslada = document.getElementById('CuentaTraslada');
    CuentaTraslada.value = "";
    var CuentaMatriz = document.getElementById('CuentaMatriz');
    CuentaMatriz.value = "";
    var NombreConjunto = document.getElementById('NombreConjunto');
    NombreConjunto.value = "";
    var EstratoOrigen = document.getElementById('EstratoOrigen');
    EstratoOrigen.value = "";
    var EstratoDestino = document.getElementById('EstratoDestino');
    EstratoDestino.value = "";
    var TarifaActual = document.getElementById('TarifaActual');
    TarifaActual.value = "";
    var TarifaNueva = document.getElementById('TarifaNueva');
    TarifaNueva.value = "";
    var Nodo = document.getElementById('Nodo');
    Nodo.value = "";
    var TelefonoFijo = document.getElementById('TelefonoFijo');
    TelefonoFijo.value = "";
    var TelefonoCelular = document.getElementById('TelefonoCelular');
    TelefonoCelular.value = "";
    var Correo = document.getElementById('Correo');
    Correo.value = "";
    $('#DEstadoMatriz option').prop('selected', function () { return this.defaultSelected; });
    $('#DGestionPorTraslado option').prop('selected', function () { return this.defaultSelected; });
}


function TraerListaDepartamentos() {
        $.ajax({
        type: "GET",
        url: urlListaDepartamentos,
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length;  index++) {
                $('#NombreDepartamentoSelect').append($('<option>', {
                    value: json[index].NombreDepartamento,
                    text: json[index].NombreDepartamento
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function TraerListaCiudades() {
    $('#NombreComunidadSelect').empty();
    $('#NombreComunidadSelect').append($('<option>', {
        text: '--SELECCIONE--'
    }));
    $('#NombreComunidadSelect option').prop('selected', function () { return this.defaultSelected; });

    var departamento = $("#NombreDepartamentoSelect").val();
    $.ajax({
        type: "GET",
        url: urlListaCiudades,
        contentType: "application/json; charset=utf-8",
        data: { Departamento: departamento },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#NombreComunidadSelect').append($('<option>', {
                    value: json[index].NombreComunidad,
                    text: json[index].NombreComunidad
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function TraerListaComunidades() {
    $('#ComunidadSelect').empty();
    $('#ComunidadSelect').append($('<option>', {
        text: '--SELECCIONE--'
    }));
    $('#ComunidadSelect option').prop('selected', function () { return this.defaultSelected; });
    var departamento = $("#NombreDepartamentoSelect").val();
    var ciudad = $("#NombreComunidadSelect").val();
    $.ajax({
        type: "GET",
        url: urlListaComunidades,
        contentType: "application/json; charset=utf-8",
        data: { Departamento: departamento, Ciudad :ciudad},
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#ComunidadSelect').append($('<option>', {
                    value: json[index].Comunidad,
                    text: json[index].Comunidad
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function TraerListaRedes() {
    $('#RedSelect').empty();
    $('#RedSelect').append($('<option>', {
        text: '--SELECCIONE--'
    }));
    $('#RedSelect option').prop('selected', function () { return this.defaultSelected; });
    var departamento = $("#NombreDepartamentoSelect").val();
    var ciudad = $("#NombreComunidadSelect").val();
    var comunidad = $("#ComunidadSelect").val();
    $.ajax({
        type: "GET",
        url: urlListaRedes,
        contentType: "application/json; charset=utf-8",
        data: { Departamento: departamento, Ciudad: ciudad, Comunidad:comunidad },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#RedSelect').append($('<option>', {
                    value: json[index].Red,
                    text: json[index].Red
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

$('#NombreDepartamentoSelect').change(function () {
    TraerListaCiudades();
    TraerListaComunidades();
    TraerListaRedes();
})
$('#NombreComunidadSelect').change(function () {
    TraerListaComunidades();
    TraerListaRedes();
})
$('#ComunidadSelect').change(function () {
    TraerListaRedes();
})
