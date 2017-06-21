    
$(document).ready(function () {
    $("#cuentaCliente").on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BuscaCliente").click();
        }
    });
    //$("#Detalle").val('');
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
    }

    if ($("#Escalamiento").val() == "CASO CGO")
    {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='ORDEN SIN COMPLETAR'>ORDEN SIN COMPLETAR</option>");
        $("#Detalle").append("<option Value='CUENTA RELACIONADA CON CGO'>CUENTA RELACIONADA CON CGO</option>")
    }

    if ($("#Escalamiento").val() == "FALLA MODULO DE GESTION") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='ORDEN SIN COMPLETAR'>ACTUALIZACION RR</option>");
        $("#Detalle").append("<option Value='AGENDAR WFM'>AGENDAR WFM</option>");
        $("#Detalle").append("<option Value='TODO EL MODULO (MG/WFM)'>TODO EL MODULO (MG/WFM)</option>");
    }
    
    if ($("#Escalamiento").val() == "INCUMPLIMIENTO") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='ANTES DE 1 HORA'>ANTES DE 1 HORA</option>");
    }

    if ($("#Escalamiento").val() == "RECOMENDACION CASOS ESPECIALES") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='MOVIL DOBLE TRIPULACION'>MOVIL DOBLE TRIPULACION</option>");
        $("#Detalle").append("<option Value='VISITA CON APOYO DE SUPERVISOR'>VISITA CON APOYO DE SUPERVISOR</option>");
        $("#Detalle").append("<option Value='REPLANTEAMIENTO DE VISITA'>REPLANTEAMIENTO DE VISITA</option>");
        $("#Detalle").append("<option Value='AMPLIACION DE TAPS'>AMPLIACION DE TAPS</option>");
        $("#Detalle").append("<option Value='CLIENTE REINCIDENTE'>CLIENTE REINCIDENTE</option>");
    }

    if ($("#Escalamiento").val() == "SIN CAPACIDAD") {
        $("#Detalle").empty();
        $("#Detalle").append("<option Value='VISITA DTH'>VISITA DTH</option>");
        $("#Detalle").append("<option Value='NO HAY ALIADOS DISPONIBLES'>NO HAY ALIADOS DISPONIBLES</option>");
        $("#Detalle").append("<option Value='NO HAY CAPACIDAD PROGRAMADA'>NO HAY CAPACIDAD PROGRAMADA</option>");
    }

    if ($("#Escalamiento").val() == "") {
        $("#Detalle").empty();
        $("#Detalle").append("<option>--Seleccione--</option>");
    }
}