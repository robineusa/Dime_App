    
$(document).ready(function () {
    $("#cuentaCliente").on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BuscaCliente").click();
        }
    });
    if ($("#cuentaCliente").val() != 0 && $("#Escalamiento").val() != "") {
        $("#BotonEnvia").css('display', 'block');
    }
    else {
        $("#BotonEnvia").css('display', 'none');
    }
    
    $("#Escalamiento").empty();
    $("#Escalamiento").append("<option value=''>--Seleccione--</option>");
    $("#Escalamiento").append("<option Value='AJUSTE'>AJUSTE</option>");
    $("#Escalamiento").append("<option Value='APLICACION DE CAMPAÑA A CORTE'>APLICACION DE CAMPAÑA A CORTE</option>");
    $("#Escalamiento").append("<option Value='CASO CGO'>CASO CGO</option>");
    $("#Escalamiento").append("<option Value='CESIONES DE CONTRATO'>CESIONES DE CONTRATO</option>");
    $("#Escalamiento").append("<option Value='CLIENTE ESTA PENSANDO SI ACEPTAR O NO LA OFERTA'>CLIENTE ESTA PENSANDO SI ACEPTAR O NO LA OFERTA</option>");
    $("#Escalamiento").append("<option Value='CLIENTES EN MORA CON AVISO FINAL'>CLIENTES EN MORA CON AVISO FINAL</option>");
    $("#Escalamiento").append("<option Value='CLIENTES EN MORA DESCONECTADO'>CLIENTES EN MORA DESCONECTADO</option>");
    $("#Escalamiento").append("<option Value='FALLA MODULO DE GESTION'>FALLA MODULO DE GESTION</option>");
    $("#Escalamiento").append("<option Value='INCUMPLIMIENTO'>INCUMPLIMIENTO</option>");
    $("#Escalamiento").append("<option Value='RECOMENDACION CASOS ESPECIALES'>RECOMENDACION CASOS ESPECIALES</option>");
    $("#Escalamiento").append("<option Value='RETENCION CRUZADAS'>RETENCION CRUZADAS</option>");
    $("#Escalamiento").append("<option Value='SIN CAPACIDAD'>SIN CAPACIDAD</option>");
    $("#Escalamiento").append("<option Value='VENTAS'>VENTAS</option>");

    $("#Detalle").empty();
    $("#Detalle").append("<option value=''>--Seleccione--</option>");
    $("#RetencionObservaciones").val('');
});
function TraeDetalle()
{
    if ($("#Escalamiento").val() == "AJUSTE" || $("#Escalamiento").val() == "APLICACION DE CAMPAÑA A CORTE" ||
        $("#Escalamiento").val() == "CESIONES DE CONTRATO" || $("#Escalamiento").val() == "CLIENTE ESTA PENSANDO SI ACEPTAR O NO LA OFERTA" ||
        $("#Escalamiento").val() == "CLIENTES EN MORA CON AVISO FINAL" || $("#Escalamiento").val() == "CLIENTES EN MORA DESCONECTADO" ||
        $("#Escalamiento").val() == "RETENCION CRUZADAS" || $("#Escalamiento").val() == "VENTAS")
    {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='NO APLICA'>NO APLICA</option>");
        if ($("#cuentaCliente").val() != 0) {
            $("#BotonEnvia").css('display', 'block');
        }
        else {
            $("#BotonEnvia").css('display', 'none');
        }
    }

    if ($("#Escalamiento").val() == "CASO CGO")
    {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='ORDEN SIN COMPLETAR'>ORDEN SIN COMPLETAR</option>");
        $("#Detalle").append("<option Value='CUENTA RELACIONADA CON CGO'>CUENTA RELACIONADA CON CGO</option>");
        if ($("#cuentaCliente").val() != 0) {
            $("#BotonEnvia").css('display', 'block');
        }
        else {
            $("#BotonEnvia").css('display', 'none');
        }
    }

    if ($("#Escalamiento").val() == "FALLA MODULO DE GESTION") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='ORDEN SIN COMPLETAR'>ACTUALIZACION RR</option>");
        $("#Detalle").append("<option Value='AGENDAR WFM'>AGENDAR WFM</option>");
        $("#Detalle").append("<option Value='TODO EL MODULO (MG/WFM)'>TODO EL MODULO (MG/WFM)</option>");
        if ($("#cuentaCliente").val() != 0) {
            $("#BotonEnvia").css('display', 'block');
        }
        else {
            $("#BotonEnvia").css('display', 'none');
        }
    }
    
    if ($("#Escalamiento").val() == "INCUMPLIMIENTO") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='ANTES DE 1 HORA'>ANTES DE 1 HORA</option>");
        if ($("#cuentaCliente").val() != 0) {
            $("#BotonEnvia").css('display', 'block');
        }
        else {
            $("#BotonEnvia").css('display', 'none');
        }
    }

    if ($("#Escalamiento").val() == "RECOMENDACION CASOS ESPECIALES") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='MOVIL DOBLE TRIPULACION'>MOVIL DOBLE TRIPULACION</option>");
        $("#Detalle").append("<option Value='VISITA CON APOYO DE SUPERVISOR'>VISITA CON APOYO DE SUPERVISOR</option>");
        $("#Detalle").append("<option Value='REPLANTEAMIENTO DE VISITA'>REPLANTEAMIENTO DE VISITA</option>");
        $("#Detalle").append("<option Value='AMPLIACION DE TAPS'>AMPLIACION DE TAPS</option>");
        $("#Detalle").append("<option Value='CLIENTE REINCIDENTE'>CLIENTE REINCIDENTE</option>");
        if ($("#cuentaCliente").val() != 0) {
            $("#BotonEnvia").css('display', 'block');
        }
        else {
            $("#BotonEnvia").css('display', 'none');
        }
    }

    if ($("#Escalamiento").val() == "SIN CAPACIDAD") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='VISITA DTH'>VISITA DTH</option>");
        $("#Detalle").append("<option Value='NO HAY ALIADOS DISPONIBLES'>NO HAY ALIADOS DISPONIBLES</option>");
        $("#Detalle").append("<option Value='NO HAY CAPACIDAD PROGRAMADA'>NO HAY CAPACIDAD PROGRAMADA</option>");
        if ($("#cuentaCliente").val() != 0) {
            $("#BotonEnvia").css('display', 'block');
        }
        else {
            $("#BotonEnvia").css('display', 'none');
        }
    }

    if ($("#Escalamiento").val() == "") {
        $("#BotonEnvia").css('display','none');
        $("#Detalle").empty();
        $("#Detalle").append("<option>--Seleccione--</option>");
    }
}