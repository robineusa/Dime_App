var preguntaActual = 1;
var calcularCuentaDesctInjusto = false;
var calcularCuentaPresentoFallasTecnicas = false;
var calcularEquipoTerminalPresentoFallas = false;
var CantidadMinutos = 0;
var MinutosMes = 43200;
var TipoAjuste = '';

$(".noRadio").on("change", function () {
    $("#pregunta" + preguntaActual).hide();
    preguntaActual++;
    $("#pregunta" + preguntaActual).show();
})


$(".siRadio").on("change", function () {
    $("#primeraParte").show();
    $("#pregunta1").hide();
    $("#pregunta2").hide();
    $("#pregunta3").hide();
    $("#pregunta4").hide();

})
$('#fechaInicialCompen').change(function () {
    ValidadorTiempos();
    CalculoFechas();
    CalculosInternet();
    CalculosTelefonia();
    Nota();
})
$('#fechaFinalCompen').change(function () {
    ValidadorTiempos();
    CalculoFechas();
    CalculosInternet();
    CalculosTelefonia();
    Nota();
})

$("input").on("change", function () {
    ActualizarCalculos();
})

$("#btnReiniciar").on("click", function () {
    ReiniciarCalculos();

})

//Escojer pregunta de incio
$('#radioSiCuentaInjustificadamente').change(function () {
    calcularCuentaDesctInjusto = true;
    TipoAjuste = 'DESCONEXION INJUSTIFICADA';
})
//Escojer pregunta de incio
$('#radioNoCuentaInjustificadamente').change(function () {
    calcularCuentaDesctInjusto = false;
    TipoAjuste = '';
})

$('#radioSiCuentaFallasTecnicas').change(function () {
    calcularCuentaPresentoFallasTecnicas = true;
    TipoAjuste = 'FALLAS TECNICAS';
})
$('#radioNoCuentaFallasTecnicas').change(function () {
    calcularCuentaPresentoFallasTecnicas = false;
    TipoAjuste = '';
})

$('#radioSiEquipoFalla').change(function () {
    calcularEquipoTerminalPresentoFallas = true;
    TipoAjuste = 'FALLAS EN EL EQUIPO TERMINAL';
})



function ActualizarCalculos() {
    console.log("descripcion grafica");
    if (calcularCuentaDesctInjusto) {
        CalculosCuentaDesctInjusto();
    }
    if (calcularCuentaPresentoFallasTecnicas) {
        CalculosCuentaPresentoFallasTecnicas();
    }
    if (calcularEquipoTerminalPresentoFallas) {
        CalculosEquipoTerminalPresentoFallas();
    }



}




function CalculosCuentaDesctInjusto() {
    console.log("CalculosCuentaDesctInjusto");
}


function CalculosCuentaPresentoFallasTecnicas() {
    console.log("CalculosCuentaPresentoFallasTecnicas");
}

function CalculosEquipoTerminalPresentoFallas() {
    console.log("CalculosEquipoTerminalPresentoFallas");
}




function ReiniciarCalculos() {
    $("input").val("");
    $("input").prop('checked', false);
    $("#pregunta1").show();
    $("#pregunta2").hide();
    $("#pregunta3").hide();
    $("#pregunta4").hide();
    $("#primeraParte").hide();
    $("#segundaParte").hide();
    $("#Aviso1").hide();
    $("#Aviso2").hide();
    $("#Aviso3").hide();
    TipoAjuste = '';
    CantidadMinutos = 0;
    preguntaActual = 1;
    calcularCuentaDesctInjusto = false;
    calcularCuentaPresentoFallasTecnicas = false;
    calcularEquipoTerminalPresentoFallas = false;
}


function ValidadorTiempos() {

    if (calcularCuentaDesctInjusto == true) {
        if (CantidadMinutos > 420) {
            $("#segundaParte").show();
            $("#Aviso1").hide();
        } else {
            $("#segundaParte").hide();
            $("#Aviso1").show();
        }
    }
    else if (calcularCuentaPresentoFallasTecnicas == true) {
        if (CantidadMinutos >= 2880) {
            $("#segundaParte").show();
            $("#Aviso2").hide();
        } else {
            $("#segundaParte").hide();
            $("#Aviso2").show();
        }
    }
    else if (calcularEquipoTerminalPresentoFallas == true) {
        if (CantidadMinutos >= 2880) {
            $("#segundaParte").show();
            $("#Aviso3").hide();
        } else {
            $("#segundaParte").hide();
            $("#Aviso3").show();
        }
    }

}
//inicio de los calculos
$('#checkInternet').change(function () {

    if ($('#rentaInternet').prop('disabled') == true) { $('#rentaInternet').prop('disabled', false); } else {
        $('#rentaInternet').prop('disabled', true);
        $('#rentaInternet').val('');
        $('#ajusteCompInternet').val('');
        $('#ajusteCompFallasInternet').val('');
    }

    CalculosInternet();
    Nota();

});
$('#checkTelefonia').change(function () {

    if ($('#rentaTelefonia').prop('disabled') == true) { $('#rentaTelefonia').prop('disabled', false); } else {
        $('#rentaTelefonia').prop('disabled', true);
        $('#rentaTelefonia').val('');
        $('#ajusteCompTelf').val('');
        $('#ajusteCompFallasTelf').val('');
    }
    CalculosTelefonia();
    Nota();
});

function CalculoFechas() {
    var d = new Date($('#fechaInicialCompen').val()); //establecemos la fecha de hoy

    //Establecemos la fecha inicio con los parametros anteriores
    var fechaInicio = new Date(d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes());

    //Establecemos la fecha final
    var fechaFinal = new Date($('#fechaFinalCompen').val());

    //Restamos la fechaFinal menos fechaInicio,
    //esto establece la diferencia entre las fechas
    var fechaResta = fechaFinal - fechaInicio;

    //Resultados
    var CantidadDias = Math.floor(((fechaResta / 1000) / 60) / 60) / 24;
    CantidadHoras = Math.floor(((fechaResta / 1000) / 60) / 60);
    CantidadMinutos = Math.floor((fechaResta / 1000) / 60);
    var SumaMinutos = CantidadHoras * 60;
    var TotalMinutos = CantidadMinutos - SumaMinutos;
    var TiempoTotal = '';
    if (CantidadHoras < 10) { CantidadHoras = '0' + CantidadHoras; } else { }
    if (TotalMinutos < 10) { TotalMinutos = '0' + TotalMinutos; } else { }

    TiempoTotal = CantidadHoras + ':' + TotalMinutos;
    $('#cantidadDias').val(Math.floor(CantidadDias));
    $('#cantidadHoras').val(TiempoTotal);
};

//Calculos de Rentas
$('#rentaInternet').keyup(function () {
    CalculosInternet();
    Nota();
})
$('#rentaTelefonia').keyup(function () {
    CalculosTelefonia();
    Nota();
})

function CalculosInternet() {
    var RentaInternet = $('#rentaInternet').val();
    if (RentaInternet == null || RentaInternet == '') {
        $('#ajusteCompInternet').val('');
        $('#ajusteCompFallasInternet').val('');
    } else {
        var ValorMinutoInternet = RentaInternet / MinutosMes;
        var ValorFallaRenta = Math.round(ValorMinutoInternet * CantidadMinutos);
        $('#ajusteCompInternet').val(ValorFallaRenta);
        $('#ajusteCompFallasInternet').val(ValorFallaRenta);
    }
}
function CalculosTelefonia() {
    var RentaTelefonia = $('#rentaTelefonia').val();
    if (RentaTelefonia == null || RentaTelefonia == '') {
        $('#ajusteCompTelf').val('');
        $('#ajusteCompFallasTelf').val('');
    } else {
        var ValorMinutoInternet = RentaTelefonia / MinutosMes;
        var ValorFallaRenta = Math.round(ValorMinutoInternet * CantidadMinutos);
        $('#ajusteCompTelf').val(ValorFallaRenta);
        $('#ajusteCompFallasTelf').val(ValorFallaRenta);
    }
}
//Generacion de Notas
function Nota() {
    internet = document.getElementById("checkInternet");
    telefonia = document.getElementById("checkTelefonia");
    var Fecha1 = new Date($('#fechaInicialCompen').val());
    var Fecha2 = new Date($('#fechaFinalCompen').val());
    var FechaInicio = Fecha1.getDay() + '/' + Fecha1.getMonth() + '/' + Fecha1.getFullYear();
    var FechaFinal = Fecha2.getDay() + '/' + Fecha2.getMonth() + '/' + Fecha2.getFullYear();
    var HoraInicio = Fecha1.getHours() + ':' + Fecha1.getMinutes();
    var HoraFinal = Fecha2.getHours() + ':' + Fecha2.getMinutes();
    var Timepo = $('#cantidadHoras').val();
    var AjusteInternet = $('#ajusteCompFallasInternet').val();
    if (isNaN(AjusteInternet) || AjusteInternet == null || AjusteInternet == '') { AjusteInternet = 0; } else { }
    var AjusteTelefonia = $('#ajusteCompFallasTelf').val();
    if (isNaN(AjusteTelefonia) || AjusteTelefonia == null || AjusteTelefonia == '') { AjusteTelefonia = 0; } else { }
    var CompInternet = $('#ajusteCompInternet').val();
    if (isNaN(CompInternet) || CompInternet == null || CompInternet == '') { CompInternet = 0; } else { }
    var CompeTelefonia = $('#ajusteCompTelf').val();
    if (isNaN(CompeTelefonia) || CompeTelefonia == null || CompeTelefonia == '') { CompeTelefonia = 0; } else { }
    var CompeServicio = parseInt(CompInternet) + parseInt(CompeTelefonia);
    var AjusteServicio = parseInt(AjusteInternet) + parseInt(AjusteTelefonia);
    var Horas = Math.floor(CantidadMinutos / 60);
    var Minutos = CantidadMinutos - (Horas * 60);
    var Servicios = '';
    var Nota = '';
    if (internet.checked) {
        if (telefonia.checked) {
            Servicios = 'INTERNET Y TELEFONIA';
            Nota = 'TIEMPO SIN SERVICIO DE ' + Servicios + ' POR ' + TipoAjuste + ' ENTRE EL ' + FechaInicio + ' Y EL ' + FechaFinal + ' CON UNA HORA DE INICIO ' + HoraInicio + ' Y HORA FIN ' + HoraFinal + ', PARA UN TOTAL DE ' + Horas + ' HORAS Y ' + Minutos + ' MINUTOS, LO QUE EQUIVALE A UN VALOR DE AJUSTE POR $' + AjusteServicio + ' Y UN VALOR DE COMPENSACION DE $' + CompeServicio + ' SIN IVA, SEGUN SOPORTE(S) (LLAMADA DE SERVICIO, OT, LOG, AVISOS FINALES), LO ANTERIOR DISCRIMINADO POR SERVICIO ASI: AJUSTE POR INTERNET DE $' + AjusteInternet + ' Y COMPENSACION DE INTERNET POR $' + CompInternet + ', AJUSTE POR TELEFONIA DE $' + AjusteTelefonia + ' Y COMPENSACION POR TELEFONIA DE $' + CompeTelefonia;
        } else {
            Servicios = 'INTERNET';
            Nota = 'TIEMPO SIN SERVICIO DE ' + Servicios + ' POR ' + TipoAjuste + ' ENTRE EL ' + FechaInicio + ' Y EL ' + FechaFinal + ' CON UNA HORA DE INICIO ' + HoraInicio + ' Y HORA FIN ' + HoraFinal + ', PARA UN TOTAL DE ' + Horas + ' HORAS Y ' + Minutos + ' MINUTOS, LO QUE EQUIVALE A UN VALOR DE AJUSTE POR $' + AjusteServicio + ' Y UN VALOR DE COMPENSACION DE $' + CompeServicio + ' SIN IVA, SEGUN SOPORTE(S) (LLAMADA DE SERVICIO, OT, LOG, AVISOS FINALES), LO ANTERIOR DISCRIMINADO POR SERVICIO ASI: AJUSTE POR INTERNET DE $' + AjusteInternet + ' Y COMPENSACION DE INTERNET POR $' + CompInternet;
        }
    } else {
        Servicios = 'TELEFONIA';
        Nota = 'TIEMPO SIN SERVICIO DE ' + Servicios + ' POR ' + TipoAjuste + ' ENTRE EL ' + FechaInicio + ' Y EL ' + FechaFinal + ' CON UNA HORA DE INICIO ' + HoraInicio + ' Y HORA FIN ' + HoraFinal + ', PARA UN TOTAL DE ' + Horas + ' HORAS Y ' + Minutos + ' MINUTOS, LO QUE EQUIVALE A UN VALOR DE AJUSTE POR $' + AjusteServicio + ' Y UN VALOR DE COMPENSACION DE $' + CompeServicio + ' SIN IVA, SEGUN SOPORTE(S) (LLAMADA DE SERVICIO, OT, LOG, AVISOS FINALES), LO ANTERIOR DISCRIMINADO POR SERVICIO ASI: AJUSTE POR TELEFONIA DE $' + AjusteTelefonia + ' Y COMPENSACION POR TELEFONIA DE $' + CompeTelefonia;
    }
    $('#areaTextoCompensacion').val(Nota);
}

$('#fechaInicialCompen').datetimepicker({
    dateformat: 'd-m-Y 00:00',
    maxDate: '+0d',
    timepicker: true,
    step: 1

});
$('#fechaFinalCompen').datetimepicker({
    dateFormat: 'd-m-Y 00:00',
    onShow: function (ct) {
        this.setOptions({
            minDate: $('#fechaInicialCompen').val() ? $('#fechaInicialCompen').val() : false
        })
    },
    maxDate: '+0d',
    timepicker: true,
    step: 1
});