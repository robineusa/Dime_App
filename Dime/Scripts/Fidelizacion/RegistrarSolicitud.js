$(function () {
    
})
$("#sltMotivosCancelacion").change(function () {
    $.ajax({
        type: "GET",
        url: urlListaKendo + "?idMotivo=" + $("#sltMotivosCancelacion").val(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (rta) {
            console.log(rta);
            $("#sltSubmotivosCancelacion option").remove();
            $('#sltSubmotivosCancelacion').append($('<option>', {
                value: "0",
                text: "-SELECCIONE-"
            }))
            

            for (i = 0; i < rta.length; i++) {
                $('#sltSubmotivosCancelacion').append($('<option>', {
                    value: rta[i].Id,
                    text: rta[i].Submotivo
                }))
            }
            rta = null;
            
            //$.each(rta, function(i, item) {
                
            //    alert(item.Id);
                
                
                
            //});​
            
        },
        //error: function (request, status, error) {
        //    alert(request.responseText + " " + status + "  " + error);
        //}

    });
})

getChild = function (id, div, opOfrecimiento) {
    if (id == 0) {
        $("#divEstrategias" + opOfrecimiento).html("")
    }
    else {
        $.ajax({
            type: "GET",
            url: urlGetChilds + "?idPadre=" + id,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (rta) {
                if (rta.length > 0) {
                    partes = div.split('_')
                    level = "level" + opOfrecimiento + "_" + (parseInt(partes[1]) + 1);
                    label = "label" + opOfrecimiento + "_" + (parseInt(partes[1]) + 1);
                    divEstrategia = "divEstrategias" + opOfrecimiento;
                    sltEstrategia = "sltEstrategias" + opOfrecimiento + "_" + (parseInt(partes[1]) + 1);

                    if ($('#' + level).length > 0) {
                        $('#' + level).remove()

                    }
                    if (partes[1] == 1) {
                        $("#" + divEstrategia).html("");
                    }

                    $("#" + divEstrategia).append(
                        "<div class='col-md-12' id='" + level + "'>" +
                        "<small>" + rta[0]['Label'] + "</small>" +
                        "" +
                        "<select id='" + sltEstrategia + "' name='" + sltEstrategia + "' class='form-control input-sm' data-val='true' onchange='getChild(this.value, \"" + label + "\", \"" + opOfrecimiento + "\")'>" +

                        +"</select>" +
                        "<div>"

                            )
                    $("#" + sltEstrategia).append($("<option/>", {
                        value: '0',
                        text: '-SELECCIONA-'
                    }))
                    $.each(rta, function (index, valor) {
                        $("#" + sltEstrategia).append($("<option/>", {
                            value: valor.Id,
                            text: valor.Nombre
                        }))
                    })


                }
                console.log(rta);
            },
            //error: function (request, status, error) {
            //    alert(request.responseText + " " + status + "  " + error);
            //}

        });
    }
    
}



enableBtn = function (srvId) {
    var idObjRet
    var idObj
    if (srvId == '100') {
        idObjRet = "chkInternetRet"
        idObj = "chkInternet"
    }
    else if (srvId == '010') {
        idObjRet = "chkTelevisionRet"
        idObj = "chkTelevision"
    }
    else if (srvId == '001') {
        idObjRet = "chkTelefoniaRet"
        idObj = "chkTelefonia"
    }
    
    

    if ($("#" + idObjRet).parent().hasClass("disabled") == true) {
        $("#" + idObjRet).parent().removeClass('disabled')
        $("#" + idObj).parent().addClass('active')
        $("#" + idObjRet).attr("disabled", false)
    }
    else {
        //alert(idObjRet);
        $("#" + idObjRet).attr("disabled", true)
        $("#" + idObj).parent().removeClass('active')
        $("#" + idObjRet).parent().addClass('disabled')
        $("#" + idObjRet).parent().removeClass('active')
        $("#" + idObjRet).prop('checked', false)
    }
}

    $("#sltAcuerdo").change(function(){
    var internetRet = (($("#chkInternetRet").prop("checked") == true) ? '1' : '0');
    var tvRet = (($("#chkTelevisionRet").prop("checked") == true) ? '1' : '0');
    var telRet = (($("#chkTelefoniaRet").prop("checked") == true) ? '1' : '0');
    var servRet = internetRet + tvRet + telRet;

    var internet = (($("#chkInternet").prop("checked") == true) ? '1' : '0');
    var tv = (($("#chkTelevision").prop("checked") == true) ? '1' : '0');
    var tel = (($("#chkTelefonia").prop("checked") == true) ? '1' : '0');
    var serv = internet + tv + tel;


    //alert($("#chkInternetRet").length);
    if (servRet == "000" && $("#chkInternetRet").length) {
        alert("Seleccione los servicios a retener")
        return;
    }
    if ($(this).val() == 0)
        $("#FidelizacionRegistro_Notas").val("")

        var E1 = ((!$("#sltEstrategiasA_4").val()) ? ((!$("#sltEstrategiasA_2").val()) ? '0' : $("#sltEstrategiasA_2").val()) : $("#sltEstrategiasA_4").val())
        var E2 = ((!$("#sltEstrategiasB_4").val()) ? ((!$("#sltEstrategiasB_2").val()) ? '0' : $("#sltEstrategiasB_2").val()) : $("#sltEstrategiasB_4").val())
        var E3 = ((!$("#sltEstrategiasB_4").val()) ? ((!$("#sltEstrategiasC_2").val()) ? '0' : $("#sltEstrategiasC_2").val()) : $("#sltEstrategiasC_4").val())
    $.ajax({
        url: urlGetNotas + "?" + 'idSubmotivo=' + $("#sltSubmotivosCancelacion").val() + "&"
        +'permanencia='+($("input[name=rbPermanencia]:checked").val())+"&"
        +'Corte='+($("input[name=rbCorte]:checked").val())+"&"
        + 'idServicios=' + serv + "&"
        + 'idServiciosRet=' + servRet + "&"
        + 'idE1=' + ((!E1) ? "0" : E1) + "&"
        + 'idE2=' + ((!E2) ? "0" : E2) + "&"
        + 'idE3=' + ((!E3) ? "0" : E3) + "&"
        + 'idNota=' + $(this).val() + "&"
        + 'idTicket=' + ((!$("#txtTicket").val()) ? '0' : $("#txtTicket").val()) + "&"
        + 'userTransfer=' + ((!$("#txtUserTransfer").val()) ? '0' : $("#txtUserTransfer").val()) + "&"
        + 'renta=' + ((!$("#txtRenta").val()) ? '0' : $("#txtRenta").val())
        ,
        type: 'get',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: {
            //'idSubmotivo': $("#sltSubmotivosCancelacion").val(),
            //'permanencia': ($("input[name=rbPermanencia]:checked").val()),
        //    'Corte': ($("input[name=rbCorte]:checked").val()),
        //    'idServicios': serv,
        //    'idE1':((!$("#sltEstrategiasA_4").val()) ? ((!$("#sltEstrategiasA_3").val()) ? '0' : $("#sltEstrategiasA_2").val()) : $("#sltEstrategiasA_1").val()),
        //    'idE2':((!$("#sltEstrategiasB_4").val()) ? ((!$("#sltEstrategiasB_3").val()) ? '0' : $("#sltEstrategiasB_2").val()) : $("#sltEstrategiasB_1").val()),
        //    'idE3':((!$("#sltEstrategiasC_4").val()) ? ((!$("#sltEstrategiasC_3").val()) ? '0' : $("#sltEstrategiasC_2").val()) : $("#sltEstrategiasC_1").val()),
        //    'idNota': $(this).val(),
        //},
        success: function (data) {
            $("#FidelizacionRegistro_Notas").val(data)
        }
    })
    })
 