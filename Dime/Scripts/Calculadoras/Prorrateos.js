var Iva =16;
var Iva2 = 1.16;
var SinDisputa = 'SIN DISPUTAS';

$("#cuentaClienteProrra").on("keyup", function (e) {

    var code = e.keyCode || e.which;
    if (code == 13) {
        TraerDatosCliente();
    }
})


$("#btnReiniciarProrra").on("click", function () {
    ReiniciarCalculos();

})

function ReiniciarCalculos() {
    $("input").val("");
    $("input").prop('checked', false);

}

function TraerDatosCliente() {

    var cuenta = $("#cuentaClienteProrra").val();
    $.ajax({
        type: "POST",
        url: consultDatosCuentaDivUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cuenta: cuenta }),
        dataType: "html",
        success: function (result) {
            $('#datosTraidosCuentaProrra').html(result);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });


}
$('#fechaInicialProrra').change(function () {
    CalculoFechas();
});
$('#fechaProxCorteProrra').change(function () {
    CalculoFechas();
});
$('#fechaFinalProrra').change(function () {
    CalculoFechas();
});
$('#valSinIvaProrraTele').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraInter').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraTelf').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraFunc').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraLD').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraRev').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraHBO').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraMovPack').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraTeleHD').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraSpiceTele').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraVenus').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraPvrDecos').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraWifi').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#valSinIvaProrraClaroVideo').keyup(function () {
    CalculosIvaInicialProrrateos();
});
$('#cuentaClienteProrra').keyup(function () {
    CalculoFechas();
    CalculosIvaInicialProrrateos();
});
$('#estrato').keyup(function () {
    CalculoFechas();
    CalculosIvaInicialProrrateos();
});
$('#estrato').change(function () {
    CalculoFechas();
    CalculosIvaInicialProrrateos();
});
//Calculos de Fechas
function CalculoFechas() {
    calcularCantidadDiasPrimeraFecha();
    calcularCantidadDiasSegundaFecha();
    CalculosIvaInicialProrrateos();
}
function calcularCantidadDiasPrimeraFecha() {
    var Fecha1 = $('#fechaInicialProrra').val();
    var Fecha2 = $('#fechaProxCorteProrra').val();

    $('#dias1erPeriProrra').val(PrimerarestaFechasProrrateos(Fecha1, Fecha2));
}
function calcularCantidadDiasSegundaFecha() {
    var Fecha1 = $('#fechaFinalProrra').val();
    var Fecha2 = $('#fechaProxCorteProrra').val();

    $('#dias2doPeriProrra').val(SegundarestaFechasProrrateos(Fecha1, Fecha2));
}
//Calculos de iva Inicial
function CalculoIvaInicialTelevision() {
    var ValorSinIvaServicio = $('#valSinIvaProrraTele').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraTele').val(0); } else { $('#ivaServiProrraTele').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraTele').val(0); } else { $('#valConIvaProrraTele').val(ValorServicioMasIva); }
}
function CalculoIvaInicialInternet() {
    var ValorSinIvaServicio = $('#valSinIvaProrraInter').val();
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var IvaServicio = 0;
        var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
        if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraInter').val(0); } else { $('#ivaServiProrraInter').val(IvaServicio); }
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraInter').val(0); } else { $('#valConIvaProrraInter').val(ValorServicioMasIva); }
    } else {
        var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
        var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
        if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraInter').val(0); } else { $('#ivaServiProrraInter').val(IvaServicio); }
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraInter').val(0); } else { $('#valConIvaProrraInter').val(ValorServicioMasIva); }
    }
    
}
function CalculoIvaInicialTelefonia() {
    var ValorSinIvaServicio = $('#valSinIvaProrraTelf').val();
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2') {
        var Iva2Servicio = 56.8;
        var IvaServicio = Math.round((((ValorSinIvaServicio* Iva2Servicio)/100)* Iva) / 100);
        var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
        if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraTelf').val(0); } else { $('#ivaServiProrraTelf').val(IvaServicio); }
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraTelf').val(0); } else { $('#valConIvaProrraTelf').val(ValorServicioMasIva); }
    } else {

        var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
        var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
        if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraTelf').val(0); } else { $('#ivaServiProrraTelf').val(IvaServicio); }
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraTelf').val(0); } else { $('#valConIvaProrraTelf').val(ValorServicioMasIva); }

    }

    
}
function CalculoIvaInicialFuncionalidades() {
    var ValorSinIvaServicio = $('#valSinIvaProrraFunc').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraFunc').val(0); } else { $('#ivaServiProrraFunc').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraFunc').val(0); } else { $('#valConIvaProrraFunc').val(ValorServicioMasIva); }
}
function CalculoIvaInicialLD30() {
    var ValorSinIvaServicio = $('#valSinIvaProrraLD').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraLD').val(0); } else { $('#ivaServiProrraLD').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraLD').val(0); } else { $('#valConIvaProrraLD').val(ValorServicioMasIva); }
}
function CalculoIvaInicialRevista() {
    var ValorSinIvaServicio = $('#valSinIvaProrraRev').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = 0;
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraRev').val(0); } else { $('#ivaServiProrraRev').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraRev').val(0); } else { $('#valConIvaProrraRev').val(ValorServicioMasIva); }
}
function CalculoIvaInicialHBO() {
    var ValorSinIvaServicio = $('#valSinIvaProrraHBO').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraHBO').val(0); } else { $('#ivaServiProrraHBO').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraHBO').val(0); } else { $('#valConIvaProrraHBO').val(ValorServicioMasIva); }
}
function CalculoIvaInicialMoviePack() {
    var ValorSinIvaServicio = $('#valSinIvaProrraMovPack').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraMovPack').val(0); } else { $('#ivaServiProrraMovPack').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraMovPack').val(0); } else { $('#valConIvaProrraMovPack').val(ValorServicioMasIva); }
}
function CalculoIvaInicialTvHd() {
    var ValorSinIvaServicio = $('#valSinIvaProrraTeleHD').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraTeleHD').val(0); } else { $('#ivaServiProrraTeleHD').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraTeleHD').val(0); } else { $('#valConIvaProrraTeleHD').val(ValorServicioMasIva); }
}
function CalculoIvaInicialSpiceTv() {
    var ValorSinIvaServicio = $('#valSinIvaProrraSpiceTele').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraSpiceTele').val(0); } else { $('#ivaServiProrraSpiceTele').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraSpiceTele').val(0); } else { $('#valConIvaProrraSpiceTele').val(ValorServicioMasIva); }
}
function CalculoIvaInicialVenus() {
    var ValorSinIvaServicio = $('#valSinIvaProrraVenus').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraVenus').val(0); } else { $('#ivaServiProrraVenus').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraVenus').val(0); } else { $('#valConIvaProrraVenus').val(ValorServicioMasIva); }
}
function CalculoIvaInicialPvrDecos() {
    var ValorSinIvaServicio = $('#valSinIvaProrraPvrDecos').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraPvrDecos').val(0); } else { $('#ivaServiProrraPvrDecos').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraPvrDecos').val(0); } else { $('#valConIvaProrraPvrDecos').val(ValorServicioMasIva); }
}
function CalculoIvaInicialWifi() {
    var ValorSinIvaServicio = $('#valSinIvaProrraWifi').val();
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var IvaServicio = 0;
        var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
        if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraWifi').val(0); } else { $('#ivaServiProrraWifi').val(IvaServicio); }
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraWifi').val(0); } else { $('#valConIvaProrraWifi').val(ValorServicioMasIva); }
    } else {
        var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
        var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
        if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraWifi').val(0); } else { $('#ivaServiProrraWifi').val(IvaServicio); }
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraWifi').val(0); } else { $('#valConIvaProrraWifi').val(ValorServicioMasIva); }
    }
    
}
function CalculoIvaInicialClaroVideo() {
    var ValorSinIvaServicio = $('#valSinIvaProrraClaroVideo').val();
    var EstratoCliente = $('#estrato').val();
    var IvaServicio = Math.round((ValorSinIvaServicio * Iva) / 100);
    var ValorServicioMasIva = Math.round(parseInt(ValorSinIvaServicio) + parseInt(IvaServicio));
    if (isNaN(IvaServicio) || IvaServicio == '' || IvaServicio == null) { $('#ivaServiProrraClaroVideo').val(0); } else { $('#ivaServiProrraClaroVideo').val(IvaServicio); }
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == '' || ValorServicioMasIva == null) { $('#valConIvaProrraClaroVideo').val(0); } else { $('#valConIvaProrraClaroVideo').val(ValorServicioMasIva); }
}
function CalculosIvaInicialProrrateos() {
    CalculoIvaInicialTelevision();
    CalculoIvaInicialInternet();
    CalculoIvaInicialTelefonia();
    CalculoIvaInicialFuncionalidades();
    CalculoIvaInicialLD30();
    CalculoIvaInicialRevista();
    CalculoIvaInicialHBO();
    CalculoIvaInicialMoviePack();
    CalculoIvaInicialTvHd();
    CalculoIvaInicialSpiceTv();
    CalculoIvaInicialVenus();
    CalculoIvaInicialPvrDecos();
    CalculoIvaInicialWifi();
    CalculoIvaInicialClaroVideo();
    CalculosIndividualesProrrateos();
}
//Calculos Individuales de valores por servicio
function CalculoValoresProrrateoTelevision() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraTele').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraTele').val(0); } else { $('#valor1erMesProrraTele').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraTele').val(0); } else { $('#valor2doMesProrraTele').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoInternet() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraInter').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraInt').val(0); } else { $('#valor1erMesProrraInt').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraInt').val(0); } else { $('#valor2doMesProrraInt').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoTelefonia() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraTelf').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraTelf').val(0); } else { $('#valor1erMesProrraTelf').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraTelf').val(0); } else { $('#valor2doMesProrraTelf').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoFuncionalidades() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraFunc').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraFunc').val(0); } else { $('#valor1erMesProrraFunc').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraFunc').val(0); } else { $('#valor2doMesProrraFunc').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoLD30() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraLD').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraLD').val(0); } else { $('#valor1erMesProrraLD').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraLD').val(0); } else { $('#valor2doMesProrraLD').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoRevista() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraRev').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraRev').val(0); } else { $('#valor1erMesProrraRev').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraRev').val(0); } else { $('#valor2doMesProrraRev').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoHBO() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraHBO').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraHBO').val(0); } else { $('#valor1erMesProrraHBO').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraHBO').val(0); } else { $('#valor2doMesProrraHBO').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoMoviePack() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraMovPack').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraMovPack').val(0); } else { $('#valor1erMesProrraMovPack').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraMovPack').val(0); } else { $('#valor2doMesProrraMovPack').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoTvHD() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraTeleHD').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraTeleHD').val(0); } else { $('#valor1erMesProrraTeleHD').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraTeleHD').val(0); } else { $('#valor2doMesProrraTeleHD').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoSpiceTv() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraSpiceTele').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraSpiceTele').val(0); } else { $('#valor1erMesProrraSpiceTele').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraSpiceTele').val(0); } else { $('#valor2doMesProrraSpiceTele').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoVenus() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraVenus').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraVenus').val(0); } else { $('#valor1erMesProrraVenus').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraVenus').val(0); } else { $('#valor2doMesProrraVenus').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoPvrDecos() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraPvrDecos').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraPvrDecos').val(0); } else { $('#valor1erMesProrraPvrDecos').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraPvrDecos').val(0); } else { $('#valor2doMesProrraPvrDecos').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoWifi() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraWifi').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraWifi').val(0); } else { $('#valor1erMesProrraWifi').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraWifi').val(0); } else { $('#valor2doMesProrraWifi').val(ValorAjustarSegundoPeriodo); }
}
function CalculoValoresProrrateoClaroVideo() {
    var CantidadDiasMesPrimerPeriodo = CalculoDiasPrimerPeriodo();
    var CantidadDiasMesSegundoPeriodo = CalculoDiasSegundoPeriodo();
    var CantidadDiasFallaPrimerPeriodo = $('#dias1erPeriProrra').val();
    var CantidadDiasFallaSegundoPeriodo = $('#dias2doPeriProrra').val();
    var ValorServicio = $('#valConIvaProrraClaroVideo').val();
    var ValorAjustarPrimerPeriodo = Math.round((ValorServicio / CantidadDiasMesPrimerPeriodo) * CantidadDiasFallaPrimerPeriodo);
    if (isNaN(ValorAjustarPrimerPeriodo) || ValorAjustarPrimerPeriodo == '' || ValorAjustarPrimerPeriodo == null) { $('#valor1erMesProrraClaroVideo').val(0); } else { $('#valor1erMesProrraClaroVideo').val(ValorAjustarPrimerPeriodo); }
    var ValorAjustarSegundoPeriodo = Math.round((ValorServicio / CantidadDiasMesSegundoPeriodo) * CantidadDiasFallaSegundoPeriodo);
    if (isNaN(ValorAjustarSegundoPeriodo) || ValorAjustarSegundoPeriodo == '' || ValorAjustarSegundoPeriodo == null) { $('#valor2doMesProrraClaroVideo').val(0); } else { $('#valor2doMesProrraClaroVideo').val(ValorAjustarSegundoPeriodo); }
}
function CalculosIndividualesProrrateos() {
    CalculoValoresProrrateoTelevision();
    CalculoValoresProrrateoInternet();
    CalculoValoresProrrateoTelefonia();
    CalculoValoresProrrateoFuncionalidades();
    CalculoValoresProrrateoLD30();
    CalculoValoresProrrateoRevista();
    CalculoValoresProrrateoHBO();
    CalculoValoresProrrateoMoviePack();
    CalculoValoresProrrateoTvHD();
    CalculoValoresProrrateoSpiceTv();
    CalculoValoresProrrateoVenus();
    CalculoValoresProrrateoPvrDecos();
    CalculoValoresProrrateoWifi();
    CalculoValoresProrrateoClaroVideo();
    CalculoDisputasFinalesProrrateo();
}
//Disputas finales por servicio
function CalculoDisputasFinalTelevision() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraTele').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraTele').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraTele').val(0); } else { $('#netoProrraTele').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraTele').val(0); } else { $('#ivaServinetoProrraTele').val(IvaFinalServicio); }
    var DisputaFinalServicio =Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio))*-1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraTele').val(SinDisputa); } else { $('#valDisputarProrraTele').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalInternet() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraInt').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraInt').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraInter').val(0); } else { $('#netoProrraInter').val(ValorTotalSerivicio1); }
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var IvaFinalServicio = 0;
        if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraInter').val(0); } else { $('#ivaServinetoProrraInter').val(IvaFinalServicio); }
        var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
        if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraInter').val(SinDisputa); } else { $('#valDisputarProrraInter').val(DisputaFinalServicio); }
    } else {
        var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
        if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraInter').val(0); } else { $('#ivaServinetoProrraInter').val(IvaFinalServicio); }
        var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
        if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraInter').val(SinDisputa); } else { $('#valDisputarProrraInter').val(DisputaFinalServicio); }
    }
    
}
function CalculoDisputasFinalTelefonia() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraTelf').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraTelf').val();
    var ValorServicio2PrimerPeriodo = $('#valor1erMesProrraFunc').val();
    var ValorServicio2SegundoPeriodo = $('#valor2doMesProrraFunc').val();
    var ValorServicio3PrimerPeriodo = $('#valor1erMesProrraLD').val();
    var ValorServicio3SegundoPeriodo = $('#valor2doMesProrraLD').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo) + parseInt(ValorServicio2PrimerPeriodo) + parseInt(ValorServicio2SegundoPeriodo) + parseInt(ValorServicio3PrimerPeriodo) + parseInt(ValorServicio3SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraTelf').val(0); } else { $('#netoProrraTelf').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraTelf').val(0); } else { $('#ivaServinetoProrraTelf').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraTelf').val(SinDisputa); } else { $('#valDisputarProrraTelf').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalHbo() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraHBO').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraHBO').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraHBO').val(0); } else { $('#netoProrraHBO').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraHBO').val(0); } else { $('#ivaServinetoProrraHBO').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraHBO').val(SinDisputa); } else { $('#valDisputarProrraHBO').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalMoviePack() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraMovPack').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraMovPack').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraMovPack').val(0); } else { $('#netoProrraMovPack').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraMovPack').val(0); } else { $('#ivaServinetoProrraMovPack').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraMovPack').val(SinDisputa); } else { $('#valDisputarProrraMovPack').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalTvHD() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraTeleHD').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraTeleHD').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraTeleHD').val(0); } else { $('#netoProrraTeleHD').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraTeleHD').val(0); } else { $('#ivaServinetoProrraTeleHD').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraTeleHD').val(SinDisputa); } else { $('#valDisputarProrraTeleHD').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalSpiceTv() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraSpiceTele').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraSpiceTele').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraSpiceTele').val(0); } else { $('#netoProrraSpiceTele').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraSpiceTele').val(0); } else { $('#ivaServinetoProrraSpiceTele').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraSpiceTele').val(SinDisputa); } else { $('#valDisputarProrraSpiceTele').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalVenus() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraVenus').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraVenus').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraVenus').val(0); } else { $('#netoProrraVenus').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraVenus').val(0); } else { $('#ivaServinetoProrraVenus').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraVenus').val(SinDisputa); } else { $('#valDisputarProrraVenus').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalPvrDecos() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraPvrDecos').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraPvrDecos').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraPvrDecos').val(0); } else { $('#netoProrraPvrDecos').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraPvrDecos').val(0); } else { $('#ivaServinetoProrraPvrDecos').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraPvrDecos').val(SinDisputa); } else { $('#valDisputarProrraPvrDecos').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalWifi() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraWifi').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraWifi').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraWifi').val(0); } else { $('#netoProrraWifi').val(ValorTotalSerivicio1); }
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var IvaFinalServicio = 0;
        if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraWifi').val(0); } else { $('#ivaServinetoProrraWifi').val(IvaFinalServicio); }
        var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
        if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraWifi').val(SinDisputa); } else { $('#valDisputarProrraWifi').val(DisputaFinalServicio); }
    } else {
        var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
        if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraWifi').val(0); } else { $('#ivaServinetoProrraWifi').val(IvaFinalServicio); }
        var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
        if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraWifi').val(SinDisputa); } else { $('#valDisputarProrraWifi').val(DisputaFinalServicio); }
    }
}
function CalculoDisputasFinalClaroVideo() {
    var ValorServicio1PrimerPeriodo = $('#valor1erMesProrraClaroVideo').val();
    var ValorServicio1SegundoPeriodo = $('#valor2doMesProrraClaroVideo').val();
    var ValorTotalSerivicio1 = parseInt(ValorServicio1PrimerPeriodo) + parseInt(ValorServicio1SegundoPeriodo);
    if (isNaN(ValorTotalSerivicio1) || ValorTotalSerivicio1 == '' || ValorTotalSerivicio1 == null) { $('#netoProrraClaroVideo').val(0); } else { $('#netoProrraClaroVideo').val(ValorTotalSerivicio1); }
    var IvaFinalServicio = Math.round(((ValorTotalSerivicio1 / Iva2) - ValorTotalSerivicio1) * -1);
    if (isNaN(IvaFinalServicio) || IvaFinalServicio == '' || IvaFinalServicio == null) { $('#ivaServinetoProrraClaroVideo').val(0); } else { $('#ivaServinetoProrraClaroVideo').val(IvaFinalServicio); }
    var DisputaFinalServicio = Math.round((parseInt(ValorTotalSerivicio1) - parseInt(IvaFinalServicio)) * -1);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == '' || DisputaFinalServicio == null) { $('#valDisputarProrraClaroVideo').val(SinDisputa); } else { $('#valDisputarProrraClaroVideo').val(DisputaFinalServicio); }
}
function CalculoDisputasFinalesProrrateo() {
    CalculoDisputasFinalTelevision();
    CalculoDisputasFinalTelefonia();
    CalculoDisputasFinalInternet();
    CalculoDisputasFinalHbo();
    CalculoDisputasFinalMoviePack();
    CalculoDisputasFinalTvHD();
    CalculoDisputasFinalSpiceTv();
    CalculoDisputasFinalVenus();
    CalculoDisputasFinalPvrDecos();
    CalculoDisputasFinalWifi();
    CalculoDisputasFinalClaroVideo();
}

PrimerarestaFechasProrrateos = function (f1, f2) {
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;

}
SegundarestaFechasProrrateos = function (f1, f2) {
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha1 - fFecha2;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;

}

function CalculoDiasPrimerPeriodo() {
    var CantidadDiasMes = 0;
    var DiasFebrero = 0;
    var MesSeleccionado = ObtenerMesFecha1($('#fechaInicialProrra').val());
    var AnoSeleccionado = ObtenerAnoFecha1($('#fechaInicialProrra').val());
    //Verifica la cantidad de dias en un año bisiesto
    if (AnoSeleccionado == '2016' || AnoSeleccionado == '2020' || AnoSeleccionado == '2024' || AnoSeleccionado == '2028' || AnoSeleccionado == '2032' || AnoSeleccionado == '2036' || AnoSeleccionado == '2040' || AnoSeleccionado == '2044') { DiasFebrero = 29; }
    else { DiasFebrero = 28; }
    //valida la cantidad de dias en cada mes del año
    if (MesSeleccionado == '01' || MesSeleccionado == '03' || MesSeleccionado == '05' || MesSeleccionado == '07' || MesSeleccionado == '08' || MesSeleccionado == '10' || MesSeleccionado == '12') { CantidadDiasMes = 31; }
    else if (MesSeleccionado == '02') { CantidadDiasMes = DiasFebrero; }
    else if (MesSeleccionado == '04' || MesSeleccionado == '06' || MesSeleccionado == '09' || MesSeleccionado == '11') { CantidadDiasMes = 30; }
    return CantidadDiasMes;
}
function CalculoDiasSegundoPeriodo() {
    var CantidadDiasMes = 0;
    var DiasFebrero = 0;
    var MesSeleccionado = ObtenerMesFecha1($('#fechaFinalProrra').val());
    var AnoSeleccionado = ObtenerAnoFecha1($('#fechaFinalProrra').val());
    //Verifica la cantidad de dias en un año bisiesto
    if (AnoSeleccionado == '2016' || AnoSeleccionado == '2020' || AnoSeleccionado == '2024' || AnoSeleccionado == '2028' || AnoSeleccionado == '2032' || AnoSeleccionado == '2036' || AnoSeleccionado == '2040' || AnoSeleccionado == '2044') { DiasFebrero = 29; }
    else { DiasFebrero = 28; }
    //valida la cantidad de dias en cada mes del año
    if (MesSeleccionado == '01' || MesSeleccionado == '03' || MesSeleccionado == '05' || MesSeleccionado == '07' || MesSeleccionado == '08' || MesSeleccionado == '10' || MesSeleccionado == '12') { CantidadDiasMes = 31; }
    else if (MesSeleccionado == '02') { CantidadDiasMes = DiasFebrero; }
    else if (MesSeleccionado == '04' || MesSeleccionado == '06' || MesSeleccionado == '09' || MesSeleccionado == '11') { CantidadDiasMes = 30; }
    return CantidadDiasMes;
}

$('#fechaInicialProrra').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});



$('#fechaProxCorteProrra').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});

$('#fechaFinalProrra').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});
ObtenerMesFecha1 = function (f3) {
    var aFecha3 = f3.split('-');
    return aFecha3[1];
}
ObtenerAnoFecha1 = function (f4) {
    var aFecha4 = f4.split('-');
    return aFecha4[2];
}
