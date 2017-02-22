var Iva = 16;
var Iva2 = 1.16;
var ValorFacturadoCliente = 0;
var ValorDiferenciaFacturacion = 0;
var ValorTotalParaAjustar = 0;
var SinDisputa = 'SIN DISPUTAS';

$("#cuentaClienteDifer").on("keyup", function (e) {

    var code = e.keyCode || e.which;
    if (code == 13) {
        TraerDatosCliente();
    }
})


function TraerDatosCliente() {

    var cuenta = $("#cuentaClienteDifer").val();
    $.ajax({
        type: "POST",
        url: consultDatosCuentaDivUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cuenta: cuenta }),
        dataType: "html",
        success: function (result) {
            $('#datosTraidosCuentaDifer').html(result);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });


}
//inicio de los calculos
$('#valSinIvaDifeTele').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeInter').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeTelf').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeFunc').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeLD').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeRevista').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeHBO').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeMovPack').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeTeleHD').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeSpiceTele').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeVenus').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifePvrDecos').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeWifi').keyup(function () {
    resetearValoresDiferencia();
});
$('#valSinIvaDifeClaroVideo').keyup(function () {
    resetearValoresDiferencia();
});
$('#estrato').keyup(function () {
    resetearValoresDiferencia();
});
$('#cuentaClienteDifer').keyup(function () {
    resetearValoresDiferencia();
});
$('#valorContratadoDifer').keyup(function () {
    resetearValoresDiferencia();
});
$('#valorSubsidioInternetDifer').keyup(function () {
    resetearValoresDiferencia();
});
$('#valorSubsidioVozDifer').keyup(function () {
    resetearValoresDiferencia();
});
$('#fechaInicialDifer').change(function () {
    calcularCantidadDiasPrimerPeriodo();
    CalculosdeValoresPorPeriodo();
});
$('#fechaFinalDifer').change(function () {
    calcularCantidadDiasPrimerPeriodo();
    CalculosdeValoresPorPeriodo();
});
$('#fechaInicial2Difer').change(function () {
    calcularCantidadDiasSegundoPeriodo()
    CalculosdeValoresPorPeriodo();
});
$('#fechaFinal2Difer').change(function () {
    calcularCantidadDiasSegundoPeriodo();
    CalculosdeValoresPorPeriodo();
});
$('#periodosCompletosDifer').change(function () {
    CalculosdeValoresPorPeriodo();
});
$('#NumeroContratoClientDifer').keyup(function () {
    GeneracionNotaFinal();
});
function resetearValoresDiferencia() {
    CalcularIvaInicial();
    CalculoValorFacturado();
    CalculoValorContratado();
    CalculosdeValoresPorPeriodo();
    CalculosNetosFinales();
    GeneracionNotaFinal();
}

//calculos del iva inicial

function CalculoIvaInicialTelevision() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeTele').val() == null || $('#valSinIvaDifeTele').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeTele').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeTele').val(IvadelServicio);
    $('#valConIvaDifeTele').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialInternet() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeInter').val() == null || $('#valSinIvaDifeInter').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeInter').val(); };
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var IvadelServicio = 0;
        $('#ivaServiDifeDifeInter').val(IvadelServicio);
        $('#valConIvaDifeInter').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
    } else {
        var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
        $('#ivaServiDifeDifeInter').val(IvadelServicio);
        $('#valConIvaDifeInter').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
    }


}
function CalculoIvaInicialTelefonia() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeTelf').val() == null || $('#valSinIvaDifeTelf').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeTelf').val(); };
    if (EstratoCliente == '1' || EstratoCliente == '2') {
        var Iva2Servicio = 56.8;
        var IvadelServicio = Math.round((((ValorInicialServicio * Iva2Servicio) / 100) * Iva) / 100);
        $('#ivaServiDifeTelf').val(IvadelServicio);
        $('#valConIvaDifeTelf').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
    } else {
        var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
        $('#ivaServiDifeTelf').val(IvadelServicio);
        $('#valConIvaDifeTelf').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
    }


}
function CalculoIvaInicialFuncionalidades() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeFunc').val() == null || $('#valSinIvaDifeFunc').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeFunc').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeFunc').val(IvadelServicio);
    $('#valConIvaDifeFunc').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialLd30() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeLD').val() == null || $('#valSinIvaDifeLD').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeLD').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeLD').val(IvadelServicio);
    $('#valConIvaDifeLD').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialRevista() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeRevista').val() == null || $('#valSinIvaDifeRevista').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeRevista').val(); };
    var IvadelServicio = 0;
    $('#ivaServiDifeRevista').val(IvadelServicio);
    $('#valConIvaDifeRevista').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialHbo() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeHBO').val() == null || $('#valSinIvaDifeHBO').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeHBO').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeHBO').val(IvadelServicio);
    $('#valConIvaDifeHBO').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialMoviePack() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeMovPack').val() == null || $('#valSinIvaDifeMovPack').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeMovPack').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeMovPack').val(IvadelServicio);
    $('#valConIvaDifeMovPack').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialTelevisionHd() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeTeleHD').val() == null || $('#valSinIvaDifeTeleHD').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeTeleHD').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeTeleHD').val(IvadelServicio);
    $('#valConIvaDifeTeleHD').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialSpiceTv() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeSpiceTele').val() == null || $('#valSinIvaDifeSpiceTele').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeSpiceTele').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeSpiceTele').val(IvadelServicio);
    $('#valConIvaDifeSpiceTele').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialVenus() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeVenus').val() == null || $('#valSinIvaDifeVenus').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeVenus').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeVenus').val(IvadelServicio);
    $('#valConIvaDifeVenus').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialPvrDecos() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifePvrDecos').val() == null || $('#valSinIvaDifePvrDecos').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifePvrDecos').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifePvrDecos').val(IvadelServicio);
    $('#valConIvaDifePvrDecos').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalculoIvaInicialWifi() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeWifi').val() == null || $('#valSinIvaDifeWifi').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeWifi').val(); };
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var IvadelServicio = 0;
        $('#ivaServiDifeWifi').val(IvadelServicio);
        $('#valConIvaDifeWifi').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
    } else {
        var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
        $('#ivaServiDifeWifi').val(IvadelServicio);
        $('#valConIvaDifeWifi').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
    }

}
function CalculoIvaInicialClaroVideo() {
    var EstratoCliente = $('#estrato').val();
    var ValorInicialServicio = 0;
    if ($('#valSinIvaDifeClaroVideo').val() == null || $('#valSinIvaDifeClaroVideo').val() == '') { } else { ValorInicialServicio = $('#valSinIvaDifeClaroVideo').val(); };
    var IvadelServicio = Math.floor((ValorInicialServicio * Iva) / 100);
    $('#ivaServiDifeClaroVideo').val(IvadelServicio);
    $('#valConIvaDifeClaroVideo').val(parseInt(ValorInicialServicio) + parseInt(IvadelServicio));
}
function CalcularIvaInicial() {
    CalculoIvaInicialTelevision();
    CalculoIvaInicialInternet();
    CalculoIvaInicialTelefonia();
    CalculoIvaInicialFuncionalidades();
    CalculoIvaInicialLd30();
    CalculoIvaInicialRevista();
    CalculoIvaInicialHbo();
    CalculoIvaInicialMoviePack();
    CalculoIvaInicialTelevisionHd();
    CalculoIvaInicialSpiceTv();
    CalculoIvaInicialVenus();
    CalculoIvaInicialPvrDecos();
    CalculoIvaInicialWifi();
    CalculoIvaInicialClaroVideo();
}
function CalculoValorContratado() {
    var ValorContratadoCliente = $('#valorContratadoDifer').val();
    var SubsidioInternet = 0;
    if ($('#valorSubsidioInternetDifer').val() == null || $('#valorSubsidioInternetDifer').val() == '') { } else { SubsidioInternet = $('#valorSubsidioInternetDifer').val(); }
    var SubsidioVoz = 0;
    if ($('#valorSubsidioVozDifer').val() == null || $('#valorSubsidioVozDifer').val() == '') { } else { SubsidioVoz = $('#valorSubsidioVozDifer').val(); }
    var ValorDiferencia = parseInt(ValorFacturadoCliente) - parseInt(ValorContratadoCliente) - parseInt(SubsidioInternet) - parseInt(SubsidioVoz);
    ValorDiferenciaFacturacion = ValorDiferencia;
    $('#valorDiferenciaDifer').val(ValorDiferencia);
}

function CalculoValorFacturado() {
    var ValorTelevision = 0;
    if ($('#valConIvaDifeTele').val() == null || $('#valConIvaDifeTele').val() == '') { } else { ValorTelevision = $('#valConIvaDifeTele').val(); };
    var ValorInternet = 0;
    if ($('#valConIvaDifeInter').val() == null || $('#valConIvaDifeInter').val() == '') { } else { ValorInternet = $('#valConIvaDifeInter').val(); };
    var ValorTelefonia = 0;
    if ($('#valConIvaDifeTelf').val() == null || $('#valConIvaDifeTelf').val() == '') { } else { ValorTelefonia = $('#valConIvaDifeTelf').val(); };
    var ValorFuncionalidades = 0;
    if ($('#valConIvaDifeFunc').val() == null || $('#valConIvaDifeFunc').val() == '') { } else { ValorFuncionalidades = $('#valConIvaDifeFunc').val(); };
    var ValorLd30 = 0;
    if ($('#valConIvaDifeLD').val() == null || $('#valConIvaDifeLD').val() == '') { } else { ValorLd30 = $('#valConIvaDifeLD').val(); };
    var ValorRevista = 0;
    if ($('#valConIvaDifeRevista').val() == null || $('#valConIvaDifeRevista').val() == '') { } else { ValorRevista = $('#valConIvaDifeRevista').val(); };
    var ValorHbo = 0;
    if ($('#valConIvaDifeHBO').val() == null || $('#valConIvaDifeHBO').val() == '') { } else { ValorHbo = $('#valConIvaDifeHBO').val(); };
    var ValorMoviePack = 0;
    if ($('#valConIvaDifeMovPack').val() == null || $('#valConIvaDifeMovPack').val() == '') { } else { ValorMoviePack = $('#valConIvaDifeMovPack').val(); };
    var ValorTelevisionHd = 0;
    if ($('#valConIvaDifeTeleHD').val() == null || $('#valConIvaDifeTeleHD').val() == '') { } else { ValorTelevisionHd = $('#valConIvaDifeTeleHD').val(); };
    var ValorSpiceTv = 0;
    if ($('#valConIvaDifeSpiceTele').val() == null || $('#valConIvaDifeSpiceTele').val() == '') { } else { ValorSpiceTv = $('#valConIvaDifeSpiceTele').val(); };
    var ValorVenus = 0;
    if ($('#valConIvaDifeVenus').val() == null || $('#valConIvaDifeVenus').val() == '') { } else { ValorVenus = $('#valConIvaDifeVenus').val(); };
    var ValorPvrDecos = 0;
    if ($('#valConIvaDifePvrDecos').val() == null || $('#valConIvaDifePvrDecos').val() == '') { } else { ValorPvrDecos = $('#valConIvaDifePvrDecos').val(); };
    var ValorWifi = 0;
    if ($('#valConIvaDifeWifi').val() == null || $('#valConIvaDifeWifi').val() == '') { } else { ValorWifi = $('#valConIvaDifeWifi').val(); };
    var ValorClaroVideo = 0;
    if ($('#valConIvaDifeClaroVideo').val() == null || $('#valConIvaDifeClaroVideo').val() == '') { } else { ValorClaroVideo = $('#valConIvaDifeClaroVideo').val(); };

    var valorTotalServicios = parseInt(ValorTelevision) + parseInt(ValorInternet) + parseInt(ValorTelefonia) + parseInt(ValorFuncionalidades) + parseInt(ValorLd30) + parseInt(ValorRevista) + parseInt(ValorHbo) + parseInt(ValorMoviePack) + parseInt(ValorTelevisionHd) + parseInt(ValorSpiceTv) + parseInt(ValorVenus) + parseInt(ValorPvrDecos) + parseInt(ValorWifi) + parseInt(ValorClaroVideo);
    ValorFacturadoCliente = valorTotalServicios;
    $('#valorFacturadoDife').val(valorTotalServicios);
}

//Calcuculos de valores
function CalcularValorPrimerPeriodo() {
    var DiasParaAjustar = $('#diasPrimerPeriodoDifer').val();
    var CantidadDiasMes = CalculoAnoPrimerPeriodo();
    var valorParaAjustar = Math.floor(parseInt((ValorDiferenciaFacturacion) * DiasParaAjustar) / CantidadDiasMes);
    if (isNaN(valorParaAjustar) || valorParaAjustar == null || valorParaAjustar == '') { $('#valorFechas1erPerDifer').val(0); } else { $('#valorFechas1erPerDifer').val(valorParaAjustar); }
}
function CalcularValorSegundoPeriodo() {
    var DiasParaAjustar = $('#diasSegundoPeriodoDifer').val();
    var CantidadDiasMes = CalculoAnoSegundoPeriodo();
    var valorParaAjustar = Math.floor(parseInt((ValorDiferenciaFacturacion) * DiasParaAjustar) / CantidadDiasMes);
    if (isNaN(valorParaAjustar) || valorParaAjustar == null || valorParaAjustar == '') { $('#valorFechas2doPerDifer').val(0); } else { $('#valorFechas2doPerDifer').val(valorParaAjustar); }
}
function CalcularValorPeriodosCompletos() {
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletosDifer').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletosDifer').val(); }
    var valorParaAjustar = Math.floor(ValorDiferenciaFacturacion * CantidadDePeriodos);
    if (isNaN(valorParaAjustar) || valorParaAjustar == null || valorParaAjustar == '') { $('#valorPorPeriodosDifer').val(0); } else { $('#valorPorPeriodosDifer').val(valorParaAjustar); }
}
function CalculoValorTotalAjustar() {
    var Valor1Periodo = $('#valorFechas1erPerDifer').val();
    var Valor2Periodo = $('#valorFechas2doPerDifer').val();
    var Valor3Periodo = $('#valorPorPeriodosDifer').val();
    var Total = Math.floor(parseInt(Valor1Periodo) + parseInt(Valor2Periodo) + parseInt(Valor3Periodo));
    $('#valorTotalAjustarDifer').val(Total);
    ValorTotalParaAjustar = Total;
}
function CalculosdeValoresPorPeriodo() {
    CalcularValorPrimerPeriodo();
    CalcularValorSegundoPeriodo();
    CalcularValorPeriodosCompletos();
    CalculoValorTotalAjustar();
    CalculosNetosFinales();
    GeneracionNotaFinal();
}
function CalculoNetoFinalTelefonia() {
    var SumaValores = 0;
    var DivisionValores = 0;
    var ValorDisputaServicio = 0;
    var IvaServicio = 0;

    var ValorTelevisionSinIva = 0;
    if ($('#valSinIvaDifeTele').val() == null || $('#valSinIvaDifeTele').val() == '') { } else { ValorTelevisionSinIva = $('#valSinIvaDifeTele').val(); };
    var ValorTelevisionConIva = 0;
    if ($('#valConIvaDifeTele').val() == null || $('#valConIvaDifeTele').val() == '') { } else { ValorTelevisionConIva = $('#valConIvaDifeTele').val(); };

    var ValorTelefoniaSinIva = 0;
    if ($('#valSinIvaDifeTelf').val() == null || $('#valSinIvaDifeTelf').val() == '') { } else { ValorTelefoniaSinIva = $('#valSinIvaDifeTelf').val(); };
    var ValorTelefoniaConIva = 0;
    if ($('#valConIvaDifeTelf').val() == null || $('#valConIvaDifeTelf').val() == '') { } else { ValorTelefoniaConIva = $('#valConIvaDifeTelf').val(); };

    var ValorInternetSinIva = 0;
    if ($('#valSinIvaDifeInter').val() == null || $('#valSinIvaDifeInter').val() == '') { } else { ValorInternetSinIva = $('#valSinIvaDifeInter').val(); };
    var ValorInternetConIva = 0;
    if ($('#valConIvaDifeInter').val() == null || $('#valConIvaDifeInter').val() == '') { } else { ValorInternetConIva = $('#valConIvaDifeInter').val(); };

    var ValorLd30ConIva = 0;
    if ($('#valConIvaDifeLD').val() == null || $('#valConIvaDifeLD').val() == '') { } else { ValorLd30ConIva = $('#valConIvaDifeLD').val(); };

    var ValorRevistaConIva = 0;
    if ($('#valConIvaDifeRevista').val() == null || $('#valConIvaDifeRevista').val() == '') { } else { ValorRevistaConIva = $('#valConIvaDifeRevista').val(); };

    if ((ValorTelevisionSinIva == 0) && (ValorTelefoniaSinIva > ValorInternetSinIva)) {

        SumaValores = parseInt(ValorTelefoniaConIva) + parseInt(ValorLd30ConIva) + parseInt(ValorRevistaConIva);
        DivisionValores = SumaValores / ValorFacturadoCliente;
        ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
        IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
        ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

        $('#netoDiferTelf').val(ValorDisputaServicio);
        $('#ivaServinetoDiferTelf').val(IvaServicio);

        if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
            $('#valDisputarDiferTelf').val(ValorFinalDisputa);
        } else {
            $('#valDisputarDiferTelf').val(SinDisputa);
        }

    } else {

        SumaValores = parseInt(ValorTelefoniaConIva) + parseInt(ValorLd30ConIva);
        DivisionValores = SumaValores / ValorFacturadoCliente;
        ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
        IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
        ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

        $('#netoDiferTelf').val(ValorDisputaServicio);
        $('#ivaServinetoDiferTelf').val(IvaServicio);

        if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
            $('#valDisputarDiferTelf').val(ValorFinalDisputa);
        } else {
            $('#valDisputarDiferTelf').val(SinDisputa);
        }

    }
}
function CalculoNetoFinalFuncionalidades() {
    var SumaValores = 0;
    var DivisionValores = 0;
    var ValorDisputaServicio = 0;
    var IvaServicio = 0;

    var ValorfuncionalidadesConIva = 0;
    if ($('#valConIvaDifeFunc').val() == null || $('#valConIvaDifeFunc').val() == '') { } else { ValorfuncionalidadesConIva = $('#valConIvaDifeFunc').val(); };

    SumaValores = parseInt(ValorfuncionalidadesConIva);
    DivisionValores = SumaValores / ValorFacturadoCliente;
    ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
    IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
    ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

    $('#netoDiferFunc').val(ValorDisputaServicio);
    $('#ivaServinetoDiferFunc').val(IvaServicio);

    if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
        $('#valDisputarDiferFunc').val(ValorFinalDisputa);
    } else {
        $('#valDisputarDiferFunc').val(SinDisputa);
    }
}
function CalculoNetoFinalInternet() {
    var SumaValores = 0;
    var DivisionValores = 0;
    var ValorDisputaServicio = 0;
    var IvaServicio = 0;
    var EstratoCliente = $('#estrato').val();

    var ValorTelevisionSinIva = 0;
    if ($('#valSinIvaDifeTele').val() == null || $('#valSinIvaDifeTele').val() == '') { } else { ValorTelevisionSinIva = $('#valSinIvaDifeTele').val(); };
    var ValorTelevisionConIva = 0;
    if ($('#valConIvaDifeTele').val() == null || $('#valConIvaDifeTele').val() == '') { } else { ValorTelevisionConIva = $('#valConIvaDifeTele').val(); };

    var ValorTelefoniaSinIva = 0;
    if ($('#valSinIvaDifeTelf').val() == null || $('#valSinIvaDifeTelf').val() == '') { } else { ValorTelefoniaSinIva = $('#valSinIvaDifeTelf').val(); };
    var ValorTelefoniaConIva = 0;
    if ($('#valConIvaDifeTelf').val() == null || $('#valConIvaDifeTelf').val() == '') { } else { ValorTelefoniaConIva = $('#valConIvaDifeTelf').val(); };

    var ValorInternetSinIva = 0;
    if ($('#valSinIvaDifeInter').val() == null || $('#valSinIvaDifeInter').val() == '') { } else { ValorInternetSinIva = $('#valSinIvaDifeInter').val(); };
    var ValorInternetConIva = 0;
    if ($('#valConIvaDifeInter').val() == null || $('#valConIvaDifeInter').val() == '') { } else { ValorInternetConIva = $('#valConIvaDifeInter').val(); };

    var ValorLd30ConIva = 0;
    if ($('#valConIvaDifeLD').val() == null || $('#valConIvaDifeLD').val() == '') { } else { ValorLd30ConIva = $('#valConIvaDifeLD').val(); };

    var ValorRevistaConIva = 0;
    if ($('#valConIvaDifeRevista').val() == null || $('#valConIvaDifeRevista').val() == '') { } else { ValorRevistaConIva = $('#valConIvaDifeRevista').val(); };

    if ((ValorTelevisionSinIva == 0) && (ValorInternetSinIva > ValorTelefoniaSinIva)) {

        if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {

            SumaValores = parseInt(ValorInternetConIva) + parseInt(ValorRevistaConIva);
            DivisionValores = SumaValores / ValorFacturadoCliente;
            ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
            IvaServicio = 0;
            ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));
            $('#netoDiferInter').val(ValorDisputaServicio);
            $('#ivaServinetoDiferInter').val(IvaServicio);

            if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
                $('#valDisputarDiferInter').val(ValorFinalDisputa);
            } else {
                $('#valDisputarDiferInter').val(SinDisputa);
            }

        } else {
            SumaValores = parseInt(ValorInternetConIva) + parseInt(ValorRevistaConIva);
            DivisionValores = SumaValores / ValorFacturadoCliente;
            ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
            IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
            ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));
            $('#netoDiferInter').val(ValorDisputaServicio);
            $('#ivaServinetoDiferInter').val(IvaServicio);

            if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
                $('#valDisputarDiferInter').val(ValorFinalDisputa);
            } else {
                $('#valDisputarDiferInter').val(SinDisputa);
            }
        }

    } else {
        if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {

            SumaValores = parseInt(ValorInternetConIva);
            DivisionValores = SumaValores / ValorFacturadoCliente;
            ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
            IvaServicio = 0;
            ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));
            $('#netoDiferInter').val(ValorDisputaServicio);
            $('#ivaServinetoDiferInter').val(IvaServicio);

            if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
                $('#valDisputarDiferInter').val(ValorFinalDisputa);
            } else {
                $('#valDisputarDiferInter').val(SinDisputa);
            }

        } else {
            SumaValores = parseInt(ValorInternetConIva) + parseInt(ValorRevistaConIva);
            DivisionValores = SumaValores / ValorFacturadoCliente;
            ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
            IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
            ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));
            $('#netoDiferInter').val(ValorDisputaServicio);
            $('#ivaServinetoDiferInter').val(IvaServicio);

            if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
                $('#valDisputarDiferInter').val(ValorFinalDisputa);
            } else {
                $('#valDisputarDiferInter').val(SinDisputa);
            }
        }
    }
}
function CalculoNetoFinalTelevision() {
    var SumaValores = 0;
    var DivisionValores = 0;
    var ValorDisputaServicio = 0;
    var IvaServicio = 0;

    var ValorTelevisionSinIva = 0;
    if ($('#valSinIvaDifeTele').val() == null || $('#valSinIvaDifeTele').val() == '') { } else { ValorTelevisionSinIva = $('#valSinIvaDifeTele').val(); };
    var ValorTelevisionConIva = 0;
    if ($('#valConIvaDifeTele').val() == null || $('#valConIvaDifeTele').val() == '') { } else { ValorTelevisionConIva = $('#valConIvaDifeTele').val(); };

    var ValorTelefoniaSinIva = 0;
    if ($('#valSinIvaDifeTelf').val() == null || $('#valSinIvaDifeTelf').val() == '') { } else { ValorTelefoniaSinIva = $('#valSinIvaDifeTelf').val(); };
    var ValorTelefoniaConIva = 0;
    if ($('#valConIvaDifeTelf').val() == null || $('#valConIvaDifeTelf').val() == '') { } else { ValorTelefoniaConIva = $('#valConIvaDifeTelf').val(); };

    var ValorInternetSinIva = 0;
    if ($('#valSinIvaDifeInter').val() == null || $('#valSinIvaDifeInter').val() == '') { } else { ValorInternetSinIva = $('#valSinIvaDifeInter').val(); };
    var ValorInternetConIva = 0;
    if ($('#valConIvaDifeInter').val() == null || $('#valConIvaDifeInter').val() == '') { } else { ValorInternetConIva = $('#valConIvaDifeInter').val(); };

    var ValorLd30ConIva = 0;
    if ($('#valConIvaDifeLD').val() == null || $('#valConIvaDifeLD').val() == '') { } else { ValorLd30ConIva = $('#valConIvaDifeLD').val(); };

    var ValorRevistaConIva = 0;
    if ($('#valConIvaDifeRevista').val() == null || $('#valConIvaDifeRevista').val() == '') { } else { ValorRevistaConIva = $('#valConIvaDifeRevista').val(); };

    var ValorHBOConIva = 0;
    if ($('#valConIvaDifeHBO').val() == null || $('#valConIvaDifeHBO').val() == '') { } else { ValorHBOConIva = $('#valConIvaDifeHBO').val(); };

    var ValorMoviePackConIva = 0;
    if ($('#valConIvaDifeMovPack').val() == null || $('#valConIvaDifeMovPack').val() == '') { } else { ValorMoviePackConIva = $('#valConIvaDifeMovPack').val(); };

    var ValorTvHDConIva = 0;
    if ($('#valConIvaDifeTeleHD').val() == null || $('#valConIvaDifeTeleHD').val() == '') { } else { ValorTvHDConIva = $('#valConIvaDifeTeleHD').val(); };

    var ValorSpiceTvConIva = 0;
    if ($('#valConIvaDifeSpiceTele').val() == null || $('#valConIvaDifeSpiceTele').val() == '') { } else { ValorSpiceTvConIva = $('#valConIvaDifeSpiceTele').val(); };

    var ValorVenusConIva = 0;
    if ($('#valConIvaDifeVenus').val() == null || $('#valConIvaDifeVenus').val() == '') { } else { ValorVenusConIva = $('#valConIvaDifeVenus').val(); };

    if (ValorTelevisionSinIva == 0) {

        SumaValores = parseInt(ValorTelevisionConIva) + parseInt(ValorHBOConIva) + parseInt(ValorMoviePackConIva) + parseInt(ValorTvHDConIva) + parseInt(ValorSpiceTvConIva) + parseInt(ValorVenusConIva);
        DivisionValores = SumaValores / ValorFacturadoCliente;
        ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
        IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
        ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

        $('#netoDiferTeleHD').val(ValorDisputaServicio);
        $('#ivaServiNetoDiferTeleHD').val(IvaServicio);

        if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
            $('#valDisputarDiferTeleHD').val(ValorFinalDisputa);
        } else {
            $('#valDisputarDiferTeleHD').val(SinDisputa);
        }

    } else {

        SumaValores = parseInt(ValorTelevisionConIva) + parseInt(ValorHBOConIva) + parseInt(ValorMoviePackConIva) + parseInt(ValorTvHDConIva) + parseInt(ValorSpiceTvConIva) + parseInt(ValorVenusConIva) + parseInt(ValorRevistaConIva);
        DivisionValores = SumaValores / ValorFacturadoCliente;
        ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
        IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
        ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

        $('#netoDiferTeleHD').val(ValorDisputaServicio);
        $('#ivaServiNetoDiferTeleHD').val(IvaServicio);

        if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
            $('#valDisputarDiferTeleHD').val(ValorFinalDisputa);
        } else {
            $('#valDisputarDiferTeleHD').val(SinDisputa);
        }
    }
}
function CalculoNetoFinalArriendos() {
    var SumaValores = 0;
    var DivisionValores = 0;
    var ValorDisputaServicio = 0;
    var IvaServicio = 0;

    var ValorPvrConIva = 0;
    if ($('#valConIvaDifePvrDecos').val() == null || $('#valConIvaDifePvrDecos').val() == '') { } else { ValorPvrConIva = $('#valConIvaDifePvrDecos').val(); };
    var ValorWifiConIva = 0;
    if ($('#valConIvaDifeWifi').val() == null || $('#valConIvaDifeWifi').val() == '') { } else { ValorWifiConIva = $('#valConIvaDifeWifi').val(); };

    
        SumaValores = parseInt(ValorPvrConIva) + parseInt(ValorWifiConIva);
        DivisionValores = SumaValores / ValorFacturadoCliente;
        ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
        IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
        ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

        $('#netoDiferArriendos').val(ValorDisputaServicio);
        $('#ivaServinetoDiferArriendos').val(IvaServicio);

        if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
            $('#valDisputarDiferArriendos').val(ValorFinalDisputa);
        } else {
            $('#valDisputarDiferArriendos').val(SinDisputa);
        }
}
function CalculoNetoFinalClaroVideo() {
    var SumaValores = 0;
    var DivisionValores = 0;
    var ValorDisputaServicio = 0;
    var IvaServicio = 0;

    var ValorClaroVideoConIva = 0;
    if ($('#valConIvaDifeClaroVideo').val() == null || $('#valConIvaDifeClaroVideo').val() == '') { } else { ValorClaroVideoConIva = $('#valConIvaDifeClaroVideo').val(); };
    
    SumaValores = parseInt(ValorClaroVideoConIva);
    DivisionValores = SumaValores / ValorFacturadoCliente;
    ValorDisputaServicio = Math.round(DivisionValores * ValorTotalParaAjustar);
    IvaServicio = Math.round(((parseInt(ValorDisputaServicio) / Iva2) - ValorDisputaServicio) * -1);
    ValorFinalDisputa = Math.round(parseInt(ValorDisputaServicio) - parseInt(IvaServicio));

    $('#netoDiferClaroVideo').val(ValorDisputaServicio);
    $('#ivaServinetoDiferClaroVideo').val(IvaServicio);

    if (ValorDisputaServicio != 0 || ValorDisputaServicio != '') {
        $('#valDisputarDiferClaroVideo').val(ValorFinalDisputa);
    } else {
        $('#valDisputarDiferClaroVideo').val(SinDisputa);
    }
}
function CalculosNetosFinales() {
    CalculoNetoFinalTelefonia();
    CalculoNetoFinalFuncionalidades();
    CalculoNetoFinalInternet();
    CalculoNetoFinalTelevision();
    CalculoNetoFinalArriendos();
    CalculoNetoFinalClaroVideo();
    GeneracionNotaFinal();
}


function GeneracionNotaFinal() {
    var CantidadDePeriodos = 0;
    var Servicios = '';
    var ValorFechasPrimerPeriodo = $('#valorFechas1erPerDifer').val();
    var ValorFechasSegundoPeriodo = $('#valorFechas2doPerDifer').val();
    var FechaInicialPrimerPeriodo = $('#fechaInicialDifer').val();
    var FechaFinalPrimerPeriodo = $('#fechaFinalDifer').val();
    var FechaInicialSegundoPeriodo = $('#fechaInicial2Difer').val();
    var FechaFinalSegundoPeriodo = $('#fechaFinal2Difer').val();
    var ContratoCliente = $('#NumeroContratoClientDifer').val();
    if ($('#periodosCompletosDifer').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletosDifer').val(); }
    var Nota = '';
    var ValorContratadoPorCliente = $('#valorContratadoDifer').val();

    if ((ValorFechasPrimerPeriodo!=0)&&(ValorFechasSegundoPeriodo!=0)) {
        if (CantidadDePeriodos != 0) {
            Nota = 'SE SOLICITA AJUSTE POR DIFERENCIA DE TARIFAS SEGUN RENTA FACTURADA EN RR $'+ValorFacturadoCliente+' IVA INCLUIDO Y LA TARIFA EN RECLAMACION $'+ValorContratadoPorCliente+' IVA INCLUIDO, CON UNA DIFERENCIA DE $'+ValorDiferenciaFacturacion +' IVA INCLUIDO SEGUN CONTRATO Nº '+ContratoCliente+'. SE DEBE REALIZAR CORRECCION DESDE EL '+FechaInicialPrimerPeriodo+' HASTA EL '+FechaFinalPrimerPeriodo+', Y ENTRE EL '+FechaInicialSegundoPeriodo+' HASTA EL '+FechaFinalSegundoPeriodo+', TAMBIEN SE INCLUYEN ENE EL AJUSTE '+CantidadDePeriodos+' PERIODOS COMPLETOS';
        } else {
            Nota = 'SE SOLICITA AJUSTE POR DIFERENCIA DE TARIFAS SEGUN RENTA FACTURADA EN RR $' + ValorFacturadoCliente + ' IVA INCLUIDO Y LA TARIFA EN RECLAMACION $' + ValorContratadoPorCliente + ' IVA INCLUIDO, CON UNA DIFERENCIA DE $' + ValorDiferenciaFacturacion + ' IVA INCLUIDO SEGUN CONTRATO Nº ' + ContratoCliente + '. SE DEBE REALIZAR CORRECCION DESDE EL ' + FechaInicialPrimerPeriodo + ' HASTA EL ' + FechaFinalPrimerPeriodo + ', Y ENTRE EL ' + FechaInicialSegundoPeriodo + ' HASTA EL ' + FechaFinalSegundoPeriodo;
        }
    } else {
        if (CantidadDePeriodos != 0) {
            Nota = 'SE SOLICITA AJUSTE POR DIFERENCIA DE TARIFAS SEGUN RENTA FACTURADA EN RR $' + ValorFacturadoCliente + ' IVA INCLUIDO Y LA TARIFA EN RECLAMACION $' + ValorContratadoPorCliente + ' IVA INCLUIDO, CON UNA DIFERENCIA DE $' + ValorDiferenciaFacturacion + ' IVA INCLUIDO SEGUN CONTRATO Nº ' + ContratoCliente + '. SE DEBE REALIZAR CORRECCION DESDE EL ' + FechaInicialPrimerPeriodo + ' HASTA EL ' + FechaFinalPrimerPeriodo + ', TAMBIEN SE INCLUYEN ENE EL AJUSTE ' + CantidadDePeriodos + ' PERIODOS COMPLETOS';
        } else {
            Nota = 'SE SOLICITA AJUSTE POR DIFERENCIA DE TARIFAS SEGUN RENTA FACTURADA EN RR $' + ValorFacturadoCliente + ' IVA INCLUIDO Y LA TARIFA EN RECLAMACION $' + ValorContratadoPorCliente + ' IVA INCLUIDO, CON UNA DIFERENCIA DE $' + ValorDiferenciaFacturacion + ' IVA INCLUIDO SEGUN CONTRATO Nº ' + ContratoCliente + '. SE DEBE REALIZAR CORRECCION DESDE EL ' + FechaInicialPrimerPeriodo + ' HASTA EL ' + FechaFinalPrimerPeriodo;
        }
    }
    $('#areaTextoDifer').val(Nota);
}















$('#fechaInicialDifer').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});



$('#fechaFinalDifer').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});

$('#fechaInicial2Difer').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});



$('#fechaFinal2Difer').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});
function AbrirSegundoPeriodoClic() {
    document.getElementById('AbrirSegundoPeriodo').style.display = 'none';
    document.getElementById('CerrarSegundoPeriodo').style.display = 'block';
    document.getElementById('SegundoPeriodoDiferenciaTarifas').style.display = 'block';
}
function CerrarSegundoPeriodoClic() {
    document.getElementById('AbrirSegundoPeriodo').style.display = 'block';
    document.getElementById('CerrarSegundoPeriodo').style.display = 'none';
    document.getElementById('SegundoPeriodoDiferenciaTarifas').style.display = 'none';
}
function CalculoAnoPrimerPeriodo() {
    var CantidadDiasMes = 0;
    var DiasFebrero = 0;
    var MesSeleccionado = ObtenerMesFecha1($('#fechaInicialDifer').val());
    var AnoSeleccionado = ObtenerAnoFecha1($('#fechaInicialDifer').val());
    //Verifica la cantidad de dias en un año bisiesto
    if (AnoSeleccionado == '2016' || AnoSeleccionado == '2020' || AnoSeleccionado == '2024' || AnoSeleccionado == '2028' || AnoSeleccionado == '2032' || AnoSeleccionado == '2036' || AnoSeleccionado == '2040' || AnoSeleccionado == '2044') { DiasFebrero = 29; }
    else { DiasFebrero = 28; }
    //valida la cantidad de dias en cada mes del año
    if (MesSeleccionado == '01' || MesSeleccionado == '03' || MesSeleccionado == '05' || MesSeleccionado == '07' || MesSeleccionado == '08' || MesSeleccionado == '10' || MesSeleccionado == '12') { CantidadDiasMes = 31; }
    else if (MesSeleccionado == '02') { CantidadDiasMes = DiasFebrero; }
    else if (MesSeleccionado == '04' || MesSeleccionado == '06' || MesSeleccionado == '09' || MesSeleccionado == '11') { CantidadDiasMes = 30; }
    return CantidadDiasMes;
}
function CalculoAnoSegundoPeriodo() {
    var CantidadDiasMes = 0;
    var DiasFebrero = 0;
    var MesSeleccionado = ObtenerMesFecha2($('#fechaInicial2Difer').val());
    var AnoSeleccionado = ObtenerAnoFecha2($('#fechaInicial2Difer').val());
    //Verifica la cantidad de dias en un año bisiesto
    if (AnoSeleccionado == '2016' || AnoSeleccionado == '2020' || AnoSeleccionado == '2024' || AnoSeleccionado == '2028' || AnoSeleccionado == '2032' || AnoSeleccionado == '2036' || AnoSeleccionado == '2040' || AnoSeleccionado == '2044') { DiasFebrero = 29; }
    else { DiasFebrero = 28; }
    //valida la cantidad de dias en cada mes del año
    if (MesSeleccionado == '01' || MesSeleccionado == '03' || MesSeleccionado == '05' || MesSeleccionado == '07' || MesSeleccionado == '08' || MesSeleccionado == '10' || MesSeleccionado == '12') { CantidadDiasMes = 31; }
    else if (MesSeleccionado == '02') { CantidadDiasMes = DiasFebrero; }
    else if (MesSeleccionado == '04' || MesSeleccionado == '06' || MesSeleccionado == '09' || MesSeleccionado == '11') { CantidadDiasMes = 30; }
    return CantidadDiasMes;
}
function calcularCantidadDiasPrimerPeriodo() {
    var Fecha1 = $('#fechaInicialDifer').val();
    var Fecha2 = $('#fechaFinalDifer').val();

    $('#diasPrimerPeriodoDifer').val(restaFechasDiferencia(Fecha1, Fecha2) + 1);

}
function calcularCantidadDiasSegundoPeriodo() {
    var Fecha1 = $('#fechaInicial2Difer').val();
    var Fecha2 = $('#fechaFinal2Difer').val();

    $('#diasSegundoPeriodoDifer').val(restaFechasDiferencia(Fecha1, Fecha2) + 1);

}
restaFechasDiferencia = function (f1, f2) {
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;

}


ObtenerMesFecha1 = function (f3) {
    var aFecha3 = f3.split('-');
    return aFecha3[1];
}
ObtenerAnoFecha1 = function (f4) {
    var aFecha4 = f4.split('-');
    return aFecha4[2];
}
ObtenerMesFecha2 = function (f3) {
    var aFecha3 = f3.split('-');
    return aFecha3[1];
}
ObtenerAnoFecha2 = function (f4) {
    var aFecha4 = f4.split('-');
    return aFecha4[2];
}
function LimpiarFormulario() {
    $('#periodosCompletosDifer option').prop('selected', function () { return this.defaultSelected; });
    $("input").val("");
    $('#areaTextoDifer').val('');
    CerrarSegundoPeriodoClic();
    ValorFacturadoCliente = 0;
    ValorDiferenciaFacturacion = 0;
    ValorTotalParaAjustar = 0;
}