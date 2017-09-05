$(document).ready(function () {
    $.datetimepicker.setLocale('es');
    $('#Fecha_Inicial').datetimepicker({
        format: 'Y-m-d',
        maxDate: '+0d',
        timepicker: false
    });

    $('#Fecha_Final').datetimepicker({
        format: 'Y-m-d',
        onShow: function (ct) {
            this.setOptions({
                minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
            })
        },
        maxDate: '+0d',
        timepicker: false
    });
});

$("#Fecha_Final").blur(function (event) {
    event.preventDefault();
    var fechaInicial = $("#Fecha_Inicial").val();
    if (fechaInicial == "") {
        $("#warningLabel").text("Debe primero introducir una fecha inicial");
        alert('Debe seleccionar una fecha Inicial');
    } else {

        CargarDatosMultiPlay();
    }



})


function CargarDatosMultiPlay() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlMultiPlayConsulta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        beforeSend: function () {
            $("#loaderDiv").show();
        },
        success: function (result) {
            var json = JSON.parse(result);
            //console.log(json);
            ShowGridMultiplay(json);
            $("#loaderDiv").hide();
        },
        error: function (data) {
            $("#loaderDiv").hide();
            var errors = data.responseJSON;
            alert(errors);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}

function ShowGridMultiplay(data) {
    if (data != null) {
        cambiarfechas(data);
    }

    $("#gridViewConsultaBasePresidencial").kendoGrid({
        width:100,
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "BasePresidencial.xlsx",
        },
        dataSource: {
            data: data,
            schema: {
                model: {

                }
            },
        },
        scrollable: true,
        filterable: {
            extra: false,
            operators: {
                string: {

                    eq: "Es igual a"
                }
            }
        },
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
            { field: "IdSubReg", title: "Id", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaGestion", title: "Fecha de Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioGestion", title: " Usuario de Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AliadoGestion", title: "Aliado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "RegBaGen", title: "Sub Registro", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Custcode", title: "Custcode", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "TipoCuscode", title: "Tipo Cuscode", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Min", title: "Min", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CustomerId", title: "Customer Id", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreCliente", title: "Nombre Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Cedula", title: "Cedula", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "EstratoCliente", title: "Estrato Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "EstadoAC", title: "Estado AC", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "EstadoRR", title: "Estado RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoActualAC", title: "Saldo Actual AC", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoEquipoAC", title: "Saldo Equipo AC", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoEquipoAscard", title: "Saldo Equipo Ascard", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoGrupo1", title: "Saldo Grupo 1", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoGrupo2", title: "Saldo Grupo 2", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoGrupo3", title: "Saldo Grupo 3", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SaldoTotalRR", title: "Saldo Total RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "EscVentaCliente", title: "Escenario Venta Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AplicAjusteRR", title: "Aplica Ajuste RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CampañaCaida", title: "Campaña Caida", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValoraAjustarInternet", title: "Valor a Ajustar Internet", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValoraAjustarTv", title: "Valor a Ajustar Tv", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValoraAjustarTel", title: "Valor a Ajustar Tel", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValAjuOtrosConcep", title: "Valor a Ajustar Otros Conceptos", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValTotAjuFijo", title: "Valor Total Ajuste Fijo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "PerCamNoApliRR", title: "Periodo Campaña No Aplicada a RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ObservacionesAjustes", title: "Observaciones Ajustes RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AjusteAC", title: "Ajuste AC", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CamOfComApliCliente", title: "Campaña por Oferta Comercial que Aplica al Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CamAplACDiVenta", title: "Campaña Aplicada en AC en Digitacion de Venta", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CfmDatosAntesIva", title: "CFM Datos Antes Iva 19%", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CfmDatosAntesIva4Ipoc", title: "CFM Datos Antes Iva 16% + 4% IpocONSUMO", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CfmVozAntesIva4Ipoc", title: "CFM Voz Antes Iva 19 % + 4% Ipoconsumo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaACTMultAC", title: "Fecha Activacion Multiplay en AC", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "TiempoCampañaCFMAAjustar", title: "Tiempo Campaña CFM a Ajustar", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "PagosACNoRefleRR", title: "Pagos en AC No Reflejados en RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaPago1", title: "Fecha Pago", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValorPago1", title: "Valor Pago", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "PagosRRNoRefleAC", title: "Pagos en RR No Reflejados en AC", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaPago2", title: "Fecha Pago", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ValorPago2", title: "Valor Pago", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "PagoCambiarGrupo", title: "Pago se Debe Cambiar de Grupo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Fecha1", title: "Fecha", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Valor1", title: "Valor", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "GrupoActual", title: "Grupo Actual", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "GrupoDebeQuedar", title: "Grupo en que Debe Quedar", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "PagAnuACNoApliACy_0RR", title: "Pagos Anulados en AC y No Aplicados a AC Y/0 RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Valor2", title: "Valor", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaIngresoPago", title: "Fecha Ingreso Pago", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "PlataformaRepPagoAnulado", title: "Plataforma a Replicar Pago Anulado (AC/AC y RR)", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AnularPago", title: "Se Debe Anular Pago", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Fecha2", title: "Fecha", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Valor3", title: "Valor", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Plataforma", title: "Plataforma", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "ArrPropClieRR", title: "Arreglo Propiedades Cliente RR", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Escenario1", title: "Escenario 1", width: 80, headerAttributes: { style: "white-space: normal" } },
            //{ field: "FechaGestion", title: "Fecha Gestion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreBase", title: "Nombre Base", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NotasAdicionales", title: "Notas Adicionales", width: 80, headerAttributes: { style: "white-space: normal" } },
        ],
        


    });


}