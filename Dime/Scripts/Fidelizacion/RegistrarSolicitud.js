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

getChild = function (id, div) {
    $.ajax({
        type: "GET",
        url: urlGetChilds + "?idPadre=" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (rta) {
            if (rta.length > 0) {
                partes = div.split('_')
                
                if ($('#level_' + (parseInt(partes[1]) + 1)).length>0) {
                    $('#level_' + (parseInt(partes[1]) + 1)).remove()

                } 
                    $("#divEstrategias").append(
                    "<div class='col-md-12' id='level_" + (parseInt(partes[1]) + 1) + "'>" +
                    "<small>" + rta[0]['Label'] + "</small>" +
                    "" +
                    "<select id='sltEstrategias_" + (parseInt(partes[1]) + 1)+"' name='sltEstrategias_" + (parseInt(partes[1]) + 1) + "' class='form-control input-sm' data-val='true' name='" + (parseInt(partes[1]) + 1) + "' onchange='getChild(this.value, 'label_" + (parseInt(partes[1]) + 1) + "')'>" +
                
                    +"</select>" +
                    "<div>"

                        )
                    $.each(rta, function (index, valor) {
                        $("#sltEstrategias_" + (parseInt(partes[1]) + 1)).append($("<option/>", {
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


    //$.ajax({
    //    type: 'GET',
    //    url: urlGetChilds+"?idPadre="+id,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    //data: {
    //    //    'idParent': id,
    //    //},
        
    //    success: function (data) {
    //        //$("#" + div).html(data);
    //    }
    //})
}