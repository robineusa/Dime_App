var IVA_ACTUAL = 16;
var Valor_Negativo = -1;
var Iva_Final = 1.16;
var SinDisputa = 'SIN DISPUTAS';

$('#estrato').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
    resetearValoresDiferencia();
    CalculoFechas();
    CalculosIvaInicialProrrateos();

})
$('#porcentajeDescuento').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#areaOfrecimiento').change(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#porcentajeDescuento').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#periodosCompletos').change(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#fechaFinal').change(function () {
    calcularCantidadDias();
    ValidacionCamposNulos();
    resetearValores();
})
$('#fechaInicial').change(function () {
    calcularCantidadDias();
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaTele').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaInter').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaTelf').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaFunc').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaLD').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaHBO').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaMovPack').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaTeleHD').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaSpiceTele').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaVenus').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaPvrDecos').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaWifi').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
$('#valSinIvaClaroVideo').keyup(function () {
    ValidacionCamposNulos();
    resetearValores();
})
//Calculo inicial de servicios
function CalculoTv() {
    var ValorInicialServicio = $('#valSinIvaTele').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { $('#ivaServiTele').val(''); } else { $('#ivaServiTele').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { $('#valConIvaTele').val(''); } else { $('#valConIvaTele').val(ValorServicioMasIva); }
}

function CalculoInternet() {
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var ValorInicialServicio = $('#valSinIvaInter').val();
        var ValorMasIva = '';
        $('#ivaServiInter').val(ValorMasIva);
        var ValorServicioMasIva = $('#valSinIvaInter').val();
        $('#valConIvaInter').val(ValorServicioMasIva);
    }
    else {
        var ValorInicialServicio = $('#valSinIvaInter').val();
        var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
        if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiInter').val(ValorMasIva); }
        var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaInter').val(ValorServicioMasIva); }
    }
}
function CalculoTelefonia() {
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2') {
        var Iva2Servicio = 56.8;
        var ValorInicialServicio = $('#valSinIvaTelf').val();
        var ValorMasIva = Math.round(((ValorInicialServicio * Iva2Servicio) / 100) * IVA_ACTUAL / 100);
        if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiTelf').val(ValorMasIva); }
        var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaTelf').val(ValorServicioMasIva); }
    }
    else {
        var ValorInicialServicio = $('#valSinIvaTelf').val();
        var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
        if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiTelf').val(ValorMasIva); }
        var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaTelf').val(ValorServicioMasIva); }
    }
}
function CalculoFuncionalidades() {
    var ValorInicialServicio = $('#valSinIvaFunc').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiFunc').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaFunc').val(ValorServicioMasIva); }
}
function CalculoLd30() {
    var ValorInicialServicio = $('#valSinIvaLD').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiLD').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaLD').val(ValorServicioMasIva); }
}
function CalculoHBO() {
    var ValorInicialServicio = $('#valSinIvaHBO').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiHBO').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaHBO').val(ValorServicioMasIva); }
}
function CalculoMoviePack() {
    var ValorInicialServicio = $('#valSinIvaMovPack').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiMovPack').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaMovPack').val(ValorServicioMasIva); }
}
function CalculoTvHD() {
    var ValorInicialServicio = $('#valSinIvaTeleHD').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiTeleHD').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaTeleHD').val(ValorServicioMasIva); }
}
function CalculoSpiceTv() {
    var ValorInicialServicio = $('#valSinIvaSpiceTele').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiSpiceTele').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaSpiceTele').val(ValorServicioMasIva); }
}
function CalculoVenus() {
    var ValorInicialServicio = $('#valSinIvaVenus').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiVenus').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaVenus').val(ValorServicioMasIva); }
}
function CalculoPvrDecos() {
    var ValorInicialServicio = $('#valSinIvaPvrDecos').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiPvrDecos').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaPvrDecos').val(ValorServicioMasIva); }
}
function CalculoWifi() {
    var EstratoCliente = $('#estrato').val();
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        var ValorInicialServicio = $('#valSinIvaWifi').val();
        var ValorMasIva = '';
        $('#ivaServiWifi').val(ValorMasIva);
        var ValorServicioMasIva = $('#valSinIvaWifi').val();
        $('#valConIvaWifi').val(ValorServicioMasIva);
    }
    else {
        var ValorInicialServicio = $('#valSinIvaWifi').val();
        var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
        if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiWifi').val(ValorMasIva); }
        var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
        if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaWifi').val(ValorServicioMasIva); }
    }
}
function CalculoClaroVideo() {
    var ValorInicialServicio = $('#valSinIvaClaroVideo').val();
    var ValorMasIva = Math.round((ValorInicialServicio * IVA_ACTUAL) / 100);
    if (isNaN(ValorMasIva) || ValorMasIva == 0) { } else { $('#ivaServiClaroVideo').val(ValorMasIva); }
    var ValorServicioMasIva = (parseInt(ValorInicialServicio) + parseInt(ValorMasIva));
    if (isNaN(ValorServicioMasIva) || ValorServicioMasIva == 0) { } else { $('#valConIvaClaroVideo').val(ValorServicioMasIva); }
}

function resetearValores() {
    CalculoTv();
    CalculoInternet();
    CalculoTelefonia();
    CalculoFuncionalidades();
    CalculoLd30();
    CalculoHBO();
    CalculoMoviePack();
    CalculoTvHD();
    CalculoSpiceTv();
    CalculoVenus();
    CalculoPvrDecos();
    CalculoWifi();
    CalculoClaroVideo();
    resetearDiferencias();
    GenerarNotaFinal();
}
//Calculo de Descuento por servicio
function DescuentoTv() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaTele').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaTele').val(DiferenciaValorServicio); }
}
function DescuentoInternet() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaInter').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaInter').val(DiferenciaValorServicio); }
}
function DescuentoTelefonia() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaTelf').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaTelf').val(DiferenciaValorServicio); }
}
function DescuentoFuncionalidades() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaFunc').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaFunc').val(DiferenciaValorServicio); }
}
function DescuentoLd30() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaLD').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaLD').val(DiferenciaValorServicio); }
}
function DescuentoHBO() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaHBO').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaHBO').val(DiferenciaValorServicio); }
}
function DescuentoMoviePack() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaMovPack').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaMovPack').val(DiferenciaValorServicio); }
}
function DescuentoTvHD() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaTeleHD').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaTeleHD').val(DiferenciaValorServicio); }
}
function DescuentoSpiceTv() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaSpiceTele').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaSpiceTele').val(DiferenciaValorServicio); }
}
function DescuentoVenus() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaVenus').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaVenus').val(DiferenciaValorServicio); }
}
function DescuentoPvrDecos() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaPvrDecos').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaPvrDecos').val(DiferenciaValorServicio); }
}
function DescuentoWifi() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaWifi').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaWifi').val(DiferenciaValorServicio); }
}
function DescuentoClaroVideo() {
    var Descuento = $('#porcentajeDescuento').val();
    var ValorServicioConIva = $('#valConIvaClaroVideo').val();
    var DiferenciaValorServicio = ((ValorServicioConIva * Descuento) / 100)
    if (isNaN(DiferenciaValorServicio) || DiferenciaValorServicio == 0) { } else { $('#difSegunCampañaClaroVideo').val(DiferenciaValorServicio); }
}
function resetearDiferencias() {
    DescuentoTv();
    DescuentoInternet();
    DescuentoTelefonia();
    DescuentoFuncionalidades();
    DescuentoLd30();
    DescuentoHBO();
    DescuentoMoviePack();
    DescuentoTvHD();
    DescuentoSpiceTv();
    DescuentoVenus();
    DescuentoPvrDecos();
    DescuentoWifi();
    DescuentoClaroVideo();
    DisputasNetas();
    GenerarNotaFinal();
}
//Variables Calculos de Dias y Años
function CalculoAno() {
    var CantidadDiasMes = 0;
    var DiasFebrero = 0;
    var MesSeleccionado = ObtenerMesFecha($('#fechaInicial').val());
    var AnoSeleccionado = ObtenerAnoFecha($('#fechaInicial').val());
    //Verifica la cantidad de dias en un año bisiesto
    if (AnoSeleccionado == '2016' || AnoSeleccionado == '2020' || AnoSeleccionado == '2024' || AnoSeleccionado == '2028' || AnoSeleccionado == '2032' || AnoSeleccionado == '2036' || AnoSeleccionado == '2040' || AnoSeleccionado == '2044') { DiasFebrero = 29; }
    else { DiasFebrero = 28; }
    //valida la cantidad de dias en cada mes del año
    if (MesSeleccionado == '01' || MesSeleccionado == '03' || MesSeleccionado == '05' || MesSeleccionado == '07' || MesSeleccionado == '08' || MesSeleccionado == '10' || MesSeleccionado == '12') { CantidadDiasMes = 31; }
    else if (MesSeleccionado == '02') { CantidadDiasMes = DiasFebrero; }
    else if (MesSeleccionado == '04' || MesSeleccionado == '06' || MesSeleccionado == '09' || MesSeleccionado == '11') { CantidadDiasMes = 30; }
    return CantidadDiasMes;
}
//Calculos de Disputas Netas por servicio
function DisputaTv() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaTele').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoTele').val(ValorADisputar); }
}
function DisputaInternet() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaInter').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoInter').val(ValorADisputar); }
}
function DisputaTelefonia() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaTelf').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoTelf').val(ValorADisputar); }
}
function DisputaFuncionalidades() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaFunc').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = (ValorPeriodoServicio + ValorDiasServicio);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoFunc').val(ValorADisputar); }
}
function DisputaLd30() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaLD').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoLD').val(ValorADisputar); }
}
function DisputaHBO() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaHBO').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoHBO').val(ValorADisputar); }
}
function DisputaMoviePack() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaMovPack').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoMovPack').val(ValorADisputar); }
}
function DisputaTvHD() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaTeleHD').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoTeleHD').val(ValorADisputar); }
}
function DisputaSpiceTv() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaSpiceTele').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoSpiceTele').val(ValorADisputar); }
}
function DisputaVenus() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaVenus').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoVenus').val(ValorADisputar); }
}
function DisputaPvrDecos() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaPvrDecos').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoPvrDecos').val(ValorADisputar); }
}
function DisputaWifi() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaWifi').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoWifi').val(ValorADisputar); }
}
function DisputaClaroVideo() {
    var CantidadDeDias = CalculoAno();
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    var ValorDiferenciaServicio = $('#difSegunCampañaClaroVideo').val();
    var DiasAAjustar = $('#cantidadDias').val();
    var ValorPeriodoServicio = ValorDiferenciaServicio * CantidadDePeriodos;
    var ValorDiasServicio = ((ValorDiferenciaServicio * DiasAAjustar) / CantidadDeDias);
    var ValorADisputar = Math.round(ValorPeriodoServicio + ValorDiasServicio);
    if (isNaN(ValorADisputar) || ValorADisputar == 0) { } else { $('#netoClaroVideo').val(ValorADisputar); }
}
function DisputasNetas() {
    DisputaTv();
    DisputaInternet();
    DisputaTelefonia();
    DisputaFuncionalidades();
    DisputaLd30();
    DisputaHBO();
    DisputaMoviePack();
    DisputaTvHD();
    DisputaSpiceTv();
    DisputaVenus();
    DisputaPvrDecos();
    DisputaWifi();
    DisputaClaroVideo();
    DisputasFinales();
    GenerarNotaFinal();
}
//Calculo de Iva Neto por Servicio segun valor a disputar y Disputas Finales
function DisputaFinalTv() {
    var ValorNetoServicio = $('#netoTele').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoTele').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarTele').val(SinDisputa); } else { $('#valDisputarTele').val(DisputaFinalServicio); }
}
function DisputaFinalInternet() {
    var ValorNetoServicio = $('#netoInter').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var EstratoCliente = $('#estrato').val();
    var ValorIvaFinalServicio = 0;
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        ValorIvaFinalServicio = 0;
        $('#ivaServiNetoInter').val(ValorIvaFinalServicio);
    } else {
        var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo)
        $('#ivaServiNetoInter').val(ValorIvaFinalServicio);
    };
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarInter').val(SinDisputa); } else { $('#valDisputarInter').val(DisputaFinalServicio); }
}
function DisputaFinalTelefonia() {
    var ValorNetoServicio = $('#netoTelf').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoTelf').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = ValorNetoServicio - ValorIvaFinalServicio;
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarTelf').val(SinDisputa); } else { $('#valDisputarTelf').val(DisputaFinalServicio); }
}
function DisputaFinalFuncionalidades() {
    var ValorNetoServicio = $('#netoFunc').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoFunc').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarFunc').val(SinDisputa); } else { $('#valDisputarFunc').val(DisputaFinalServicio); }
}
function DisputaFinalLd30() {
    var ValorNetoServicio = $('#netoLD').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoLD').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarLD').val(SinDisputa); } else { $('#valDisputarLD').val(DisputaFinalServicio); }
}
function DisputaFinalHBO() {
    var ValorNetoServicio = $('#netoHBO').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoHBO').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarHBO').val(SinDisputa); } else { $('#valDisputarHBO').val(DisputaFinalServicio); }
}
function DisputaFinalMoviePack() {
    var ValorNetoServicio = $('#netoMovPack').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoMovPack').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarMovPack').val(SinDisputa); } else { $('#valDisputarMovPack').val(DisputaFinalServicio); }
}
function DisputaFinalTvHD() {
    var ValorNetoServicio = $('#netoTeleHD').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoTeleHD').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = ValorNetoServicio - ValorIvaFinalServicio;
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarTeleHD').val(SinDisputa); } else { $('#valDisputarTeleHD').val(DisputaFinalServicio); }
}
function DisputaFinalSpiceTv() {
    var ValorNetoServicio = $('#netoSpiceTele').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoSpiceTele').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarSpiceTele').val(SinDisputa); } else { $('#valDisputarSpiceTele').val(DisputaFinalServicio); }
}
function DisputaFinalVenus() {
    var ValorNetoServicio = $('#netoVenus').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoVenus').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarVenus').val(SinDisputa); } else { $('#valDisputarVenus').val(DisputaFinalServicio); }
}
function DisputaFinalPvrDecos() {
    var ValorNetoServicio = $('#netoPvrDecos').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoPvrDecos').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarPvrDecos').val(SinDisputa); } else { $('#valDisputarPvrDecos').val(DisputaFinalServicio); }
}
function DisputaFinalWifi() {
    var ValorNetoServicio = $('#netoWifi').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var EstratoCliente = $('#estrato').val();
    var ValorIvaFinalServicio = 0;
    if (EstratoCliente == '1' || EstratoCliente == '2' || EstratoCliente == '3') {
        ValorIvaFinalServicio = 0;
        $('#ivaServiNetoWifi').val(ValorIvaFinalServicio);
    } else {
        var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo)
        $('#ivaServiNetoWifi').val(ValorIvaFinalServicio);
    };
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarWifi').val(SinDisputa); } else { $('#valDisputarWifi').val(DisputaFinalServicio); }
}
function DisputaFinalClaroVideo() {
    var ValorNetoServicio = $('#netoClaroVideo').val();
    var ValorIvaServicioNeto = ((ValorNetoServicio / Iva_Final) - ValorNetoServicio);
    var ValorIvaFinalServicio = Math.round(ValorIvaServicioNeto * Valor_Negativo);
    if (isNaN(ValorIvaFinalServicio) || ValorIvaFinalServicio == 0) { } else { $('#ivaServiNetoClaroVideo').val(ValorIvaFinalServicio); }
    var DisputaFinalServicio = Math.round(ValorNetoServicio - ValorIvaFinalServicio);
    if (isNaN(DisputaFinalServicio) || DisputaFinalServicio == 0) { $('#valDisputarClaroVideo').val(SinDisputa); } else { $('#valDisputarClaroVideo').val(DisputaFinalServicio); }
}
function DisputasFinales() {
    DisputaFinalTv();
    DisputaFinalInternet();
    DisputaFinalTelefonia();
    DisputaFinalFuncionalidades();
    DisputaFinalLd30();
    DisputaFinalHBO();
    DisputaFinalMoviePack();
    DisputaFinalTvHD();
    DisputaFinalSpiceTv();
    DisputaFinalVenus();
    DisputaFinalPvrDecos();
    DisputaFinalWifi();
    DisputaFinalClaroVideo();
    GenerarNotaFinal();
}

function calcularCantidadDias() {
    var Fecha1 = $('#fechaInicial').val();
    var Fecha2 = $('#fechaFinal').val();

    $('#cantidadDias').val(restaFechas(Fecha1, Fecha2) + 1);

}

function calcularTerceraParte() {

    var valSinIvaTele = $("#valSinIvaTele").val();
    var ivaServiTele = valSinIvaTele * (IVA_ACTUAL / 100);
    var valConIvaTele = valSinIvaTele + ivaServiTele;
    var difSegunCampañaTele = 0;
    $("#ivaServiTele").val(ivaServiTele);

}
function ValidacionCamposNulos() {
    if ($('#valSinIvaTele').val() == null || $('#valSinIvaTele').val() == '') {
        $('#ivaServiTele').val(''); $('#valConIvaTele').val(''); $('#difSegunCampañaTele').val(''); $('#netoTele').val(''); $('#ivaServiNetoTele').val(''); $('#valDisputarTele').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaInter').val() == null || $('#valSinIvaInter').val() == '') {
        $('#ivaServiInter').val(''); $('#valConIvaInter').val(''); $('#difSegunCampañaInter').val(''); $('#netoInter').val(''); $('#ivaServiNetoInter').val(''); $('#valDisputarInter').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaTelf').val() == null || $('#valSinIvaTelf').val() == '') {
        $('#ivaServiTelf').val(''); $('#valConIvaTelf').val(''); $('#difSegunCampañaTelf').val(''); $('#netoTelf').val(''); $('#ivaServiNetoTelf').val(''); $('#valDisputarTelf').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaFunc').val() == null || $('#valSinIvaFunc').val() == '') {
        $('#ivaServiFunc').val(''); $('#valConIvaFunc').val(''); $('#difSegunCampañaFunc').val(''); $('#netoFunc').val(''); $('#ivaServiNetoFunc').val(''); $('#valDisputarFunc').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaLD').val() == null || $('#valSinIvaLD').val() == '') {
        $('#ivaServiLD').val(''); $('#valConIvaLD').val(''); $('#difSegunCampañaLD').val(''); $('#netoLD').val(''); $('#ivaServiNetoLD').val(''); $('#valDisputarLD').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaHBO').val() == null || $('#valSinIvaHBO').val() == '') {
        $('#ivaServiHBO').val(''); $('#valConIvaHBO').val(''); $('#difSegunCampañaHBO').val(''); $('#netoHBO').val(''); $('#ivaServiNetoHBO').val(''); $('#valDisputarHBO').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaMovPack').val() == null || $('#valSinIvaMovPack').val() == '') {
        $('#ivaServiMovPack').val(''); $('#valConIvaMovPack').val(''); $('#difSegunCampañaMovPack').val(''); $('#netoMovPack').val(''); $('#ivaServiNetoMovPack').val(''); $('#valDisputarMovPack').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaTeleHD').val() == null || $('#valSinIvaTeleHD').val() == '') {
        $('#ivaServiTeleHD').val(''); $('#valConIvaTeleHD').val(''); $('#difSegunCampañaTeleHD').val(''); $('#netoTeleHD').val(''); $('#ivaServiNetoTeleHD').val(''); $('#valDisputarTeleHD').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaSpiceTele').val() == null || $('#valSinIvaSpiceTele').val() == '') {
        $('#ivaServiSpiceTele').val(''); $('#valConIvaSpiceTele').val(''); $('#difSegunCampañaSpiceTele').val(''); $('#netoSpiceTele').val(''); $('#ivaServiNetoSpiceTele').val(''); $('#valDisputarSpiceTele').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaVenus').val() == null || $('#valSinIvaVenus').val() == '') {
        $('#ivaServiVenus').val(''); $('#valConIvaVenus').val(''); $('#difSegunCampañaVenus').val(''); $('#netoVenus').val(''); $('#ivaServiNetoVenus').val(''); $('#valDisputarVenus').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaPvrDecos').val() == null || $('#valSinIvaPvrDecos').val() == '') {
        $('#ivaServiPvrDecos').val(''); $('#valConIvaPvrDecos').val(''); $('#difSegunCampañaPvrDecos').val(''); $('#netoPvrDecos').val(''); $('#ivaServiNetoPvrDecos').val(''); $('#valDisputarPvrDecos').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaWifi').val() == null || $('#valSinIvaWifi').val() == '') {
        $('#ivaServiWifi').val(''); $('#valConIvaWifi').val(''); $('#difSegunCampañaWifi').val(''); $('#netoWifi').val(''); $('#ivaServiNetoWifi').val(''); $('#valDisputarWifi').val(SinDisputa);
    } else { }
    //Siguiente Servicio
    if ($('#valSinIvaClaroVideo').val() == null || $('#valSinIvaClaroVideo').val() == '') {
        $('#ivaServiClaroVideo').val(''); $('#valConIvaClaroVideo').val(''); $('#difSegunCampañaClaroVideo').val(''); $('#netoClaroVideo').val(''); $('#ivaServiNetoClaroVideo').val(''); $('#valDisputarClaroVideo').val(SinDisputa);
    } else { }
}
function LimpiarCampos() {
    $('#estrato').val('');
    $('#nombreCliente').val('');
    $('#apellidoCliente').val('');
    $('#areaOfrecimiento option').prop('selected', function () { return this.defaultSelected; });
    $('#porcentajeDescuento').val('');
    $('#fechaOfrecimiento').val('');
    $('#fechaInicial').val('');
    $('#fechaFinal').val('');
    $('#periodosCompletos option').prop('selected', function () { return this.defaultSelected; });
    $('#cantidadDias').val('');
    $('#valSinIvaTele').val('');
    $('#valSinIvaInter').val('');
    $('#valSinIvaTelf').val('');
    $('#valSinIvaFunc').val('');
    $('#valSinIvaLD').val('');
    $('#valSinIvaHBO').val('');
    $('#valSinIvaMovPack').val('');
    $('#valSinIvaTeleHD').val('');
    $('#valSinIvaSpiceTele').val('');
    $('#valSinIvaVenus').val('');
    $('#valSinIvaPvrDecos').val('');
    $('#valSinIvaWifi').val('');
    $('#valSinIvaClaroVideo').val('');
    $('#areaTexto').val('');
    ValidacionCamposNulos();
    resetearValores();
}
function GenerarNotaFinal() {
    var Servicios = '';
    var FechaInicial = $('#fechaInicial').val();
    var FechaFinal = $('#fechaFinal').val();
    var AreaOfrecimiento = $('#areaOfrecimiento').val();
    var PorcentajeDescuento = $('#porcentajeDescuento').val();
    var FechaOfrecimiento = $('#fechaOfrecimiento').val();

    if ($('#valDisputarTele').val() != 'SIN DISPUTAS') { Servicios = 'TELEFONIA, '; } else { }
    if ($('#valDisputarInter').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'INTERNET, '; } else { }
    if ($('#valDisputarTelf').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'TELEVISION, '; } else { }
    if ($('#valDisputarFunc').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'FUNCIONALIDADES, '; } else { }
    if ($('#valDisputarLD').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'LD 30, '; } else { }
    if ($('#valDisputarHBO').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'HBO, '; } else { }
    if ($('#valDisputarMovPack').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'MOVIE PACK, '; } else { }
    if ($('#valDisputarTeleHD').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'TELEVISION HD, '; } else { }
    if ($('#valDisputarSpiceTele').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'SPICE TV, '; } else { }
    if ($('#valDisputarVenus').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'VENUS, '; } else { }
    if ($('#valDisputarPvrDecos').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'PVR - DECOS, '; } else { }
    if ($('#valDisputarWifi').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'WIFI, '; } else { }
    if ($('#valDisputarClaroVideo').val() != 'SIN DISPUTAS') { Servicios = Servicios + 'CALRO VIDEO, '; } else { }
    var CantidadDePeriodos = 0;
    if ($('#periodosCompletos').val() == '') { CantidadDePeriodos = 0; } else { CantidadDePeriodos = $('#periodosCompletos').val(); }
    if (CantidadDePeriodos != 0) {
        var Nota = 'SE SOLICITA AJUSTE SEGUN OFRECIMIENTO REALIZADO AL CLIENTE CON CAMPAÑA DEL ' + PorcentajeDescuento + '% DE DESCUENTO SOBRE LOS SERVICIOS DE ' + Servicios + 'POR EL AREA DE ' + AreaOfrecimiento + ' EL DIA ' + FechaOfrecimiento + ', SE DEBE REALIZAR CORRECCION DESDE EL ' + FechaInicial + ' HASTA EL ' + FechaFinal + ' Y POR ' + CantidadDePeriodos + ' MESES YA CAUSADOS';
        $('#areaTexto').val(Nota)
    } else {
        var Nota = 'SE SOLICITA AJUSTE SEGUN OFRECIMIENTO REALIZADO AL CLIENTE CON CAMPAÑA DEL ' + PorcentajeDescuento + '% DE DESCUENTO SOBRE LOS SERVICIOS DE ' + Servicios + 'POR EL AREA DE ' + AreaOfrecimiento + ' EL DIA ' + FechaOfrecimiento + ', SE DEBE REALIZAR CORRECCION DESDE EL ' + FechaInicial + ' HASTA EL ' + FechaFinal;
        $('#areaTexto').val(Nota)
    }
}
restaFechas = function (f1, f2) {
    var aFecha1 = f1.split('-');
    var aFecha2 = f2.split('-');
    var fFecha1 = Date.UTC(aFecha1[2], aFecha1[1] - 1, aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2], aFecha2[1] - 1, aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}


ObtenerMesFecha = function (f3) {
    var aFecha3 = f3.split('-');
    return aFecha3[1];
}
ObtenerAnoFecha = function (f4) {
    var aFecha4 = f4.split('-');
    return aFecha4[2];
}



$.datetimepicker.setLocale('es');
$('#fechaOfrecimiento').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});


$('#fechaInicial').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});



$('#fechaFinal').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    maxDate: '0',

});



$("#cuentaCliente").on("keyup", function (e) {

    var code = e.keyCode || e.which;
    if (code == 13) {
        console.log("entra submit buscar cuenta");
        TraerDatosCliente();
    }
})



function TraerDatosCliente() {

    var cuenta = $("#cuentaCliente").val();
    $.ajax({
        type: "POST",
        url: consultDatosCuentaDivUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cuenta: cuenta }),
        dataType: "html",
        success: function (result) {
            $('#datosTraidosCuenta').html(result);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });


}