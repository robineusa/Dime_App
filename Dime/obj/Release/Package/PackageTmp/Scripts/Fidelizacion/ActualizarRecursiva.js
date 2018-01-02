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
                        "<small>" + rta[0]['Label'] + " Padre</small>" +
                        "" +
                        "<select id='" + sltEstrategia + "' name='" + sltEstrategia + "' class='form-control input-sm' data-val='true' onchange='getChild(this.value, \"" + label + "\", \"" + opOfrecimiento + "\")'>" +

                        +"</select>" +
                        "<div>"

                            )
                    $("#" + sltEstrategia).append($("<option/>", {
                        value: '0',
                        text: '-Ninguno-'
                    }))
                    $.each(rta, function (index, valor) {
                        $("#" + sltEstrategia).append($("<option/>", {
                            value: valor.Id,
                            text: valor.Nombre
                        }))
                    })


                }
                else {
                    partes = div.split('_')
                    level = "level" + opOfrecimiento + "_" + (parseInt(partes[1]) + 1);
                    label = "label" + opOfrecimiento + "_" + (parseInt(partes[1]) + 1);
                    divEstrategia = "divEstrategias" + opOfrecimiento;
                    sltEstrategia = "sltEstrategias" + opOfrecimiento + "_" + (parseInt(partes[1]) + 1);

                    if ($('#' + level).length > 0) {
                        $('#' + level).remove()

                    }
                    if (partes[1] < 2) {
                        $("#" + divEstrategia).html("");
                    }
                    //alert(sltEstrategia)
                    $("#" + divEstrategia).append(
                        "<div class='col-md-12' id='" + level + "'>" +
                        "<small>" + $("#sltEstrategias" + "_" + parseInt(partes[1]) + " :selected").text() + " Padre</small>" +
                        "" +
                        "<select id='" + sltEstrategia + "' name='" + sltEstrategia + "' class='form-control input-sm' data-val='true' onchange='getChild(this.value, \"" + label + "\", \"" + opOfrecimiento + "\")'>" +

                        +"</select>" +
                        "<div>"

                            )
                    $("#" + sltEstrategia).append($("<option/>", {
                        value: '0',
                        text: '-Ninguno-'
                    }))
                }
                console.log(rta);
            },
            //error: function (request, status, error) {
            //    alert(request.responseText + " " + status + "  " + error);
            //}

        });
    }

}