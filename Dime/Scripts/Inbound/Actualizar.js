$(document).ready(function () {



checkMarcacion(idMarcacionEntrada);


$("#keyMarcacion").on("keyup", function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        var keyWord = $("#keyMarcacion").val();
        ConsultarMarcacionesPorPalabra(keyWord);
    }
})
CambioEscalaSoporte();

});

SetearEstadoHistoricos(jsonHistorialCaso);
CargarFormatoFechaHistorial();
CargarGridHistorial();
VerificarEstadoCaso();

function VerificarEstadoCaso()
{
    var dataOfHistorialOfCase = $("#tablaHistorial").data().kendoGrid.dataSource.view();
    var estadoCasoActual = dataOfHistorialOfCase[0].IdEstado;
    var perfilUsuUltimaInterac = dataOfHistorialOfCase[0].PerfilUsuario;
    if (estadoCasoActual == "CERRADO")
    {
        $("#avisoAdvertencia").text("El caso se encuentra cerrado, el software no permitirá ninguna interacción sobre este caso.");
        $("#linkModalAdvertencia").click();
        $("#submitDatos").prop("disabled", true);
    }else
        if(CasoActualSeguimientoCelula(dataOfHistorialOfCase) == true  )
        {
            $("#avisoAdvertencia").text("El caso se encuentra en seguimiento por la célula, el software solo permitira interacciones sin cambios en la marcación y estado del caso.");
            $("#linkModalAdvertencia").click();
            $("#submitDatos").prop("disabled", false);
            $("#keyMarcacion").prop("disabled", true);
            $("#ddState").val("3");
            $("#ddState").prop("disabled", true);
            $("#ddEscalar").prop("disabled", true);
            $("#ddEscalar").val("NULL");
        }
  
        
}

function CambioEscalaSoporte() {
    var valorAEscalar = $("#ddEscalarSoporte").val();
    if (valorAEscalar == "CELULA SEGUIMIENTO SOPORTE" || valorAEscalar == "CELULA VISITA SOPORTE") {
        var newOption =
        $("#ddEscalar").append('<option value="' + valorAEscalar + '" >' + valorAEscalar + '</option>');
        $("#ddEscalar").val(valorAEscalar);
    }

}

function CasoActualSeguimientoCelula(data)
{
    for(var i = 0; i< data.length; i++)
    {
        if(data[i].IdEstado == "SEGUIMIENTO" && data[i].PerfilUsuario != "ASESOR")
        {
            return true;
        }

    }
}

function CargarFormatoFechaHistorial()
{
 for(var i = 0; i<jsonHistorialCaso.length; i++)
    {
        jsonHistorialCaso[i].FechaNota = kendo.toString(kendo.parseDate(jsonHistorialCaso[i].HoraNota, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        jsonHistorialCaso[i].HoraNota = kendo.toString(kendo.parseDate(jsonHistorialCaso[i].HoraNota, 'HH:mm:ss'), 'HH:mm:ss');
    }
}

function SetearEstadoHistoricos(dataUp) {
    for (var i = 0; i < dataUp.length; i++) {
        if (dataUp[i].IdEstado == 1) {
            dataUp[i].IdEstado = "ABIERTO";
        } else {
            if (dataUp[i].IdEstado == 2) {
                dataUp[i].IdEstado = "CERRADO";
            } else {
                dataUp[i].IdEstado = "SEGUIMIENTO";
            }
        }
    }
};

function CargarGridHistorial()
{
    $("#tablaHistorial").kendoGrid({
        //autoBind: true,
        //toolbar: ["excel"],
        //excel: {
        //    fileName: "Export.xlsx",
        //},
        dataSource: {
            data: jsonHistorialCaso,
            schema: {
                model: {
                }
            },
            pageSize: 10
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
            pageSizes: true,
            buttonCount: 5
        }
    });

    var grid = $("#tablaHistorial").data("kendoGrid");
    grid.dataSource.sort({ field: "FechaNota", dir: "desc" });
}

function ChangeStateCase() {
    var valueState = $("#ddState").val();

    if (valueState != 1) {
        $("#ddEscalar").prop("disabled", true);
        $("#ddEscalar").val("NULL");
    } else {
        $("#ddEscalar").prop("disabled", false);
    }
};


function ConsultarMarcacionesPorPalabra(key) {
    $.ajax({
        type: "POST",
        url: posiblesMarcacionesUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ key: key }),
        dataType: "json",
        success: function (result) {
            var listPosibles = $("#listaMarcaciones");
            listPosibles.empty();
            var json = JSON.parse(result);
            for (var i = 0; i < json.length; i++) {
                listPosibles.append('<li><input type="radio" class="RadMarcacion" name="grupoMarcaciones" value="' + json[i].Id + '" onclick="checkMarcacion(event);"  /> ' + json[i].Submarcacion + ' - ' + json[i].Descripcion + '</li>');
            }

        }

    });
};


function checkMarcacion(eve) {
    var idMarcacion = 0;
    if (eve % 1 == 0)
    {
        idMarcacion = eve;
    }else {
        idMarcacion = $(eve.target).val();
    }
    $.ajax({
        type: "POST",
        url: datosDeMarcacionUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ marcacion: idMarcacion }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            $("#tbMacroproceso").val(json.Macroproceso);
            $("#tbMarcacion").val(json.Submarcacion);
            $("#tbTipoAtencion").val(json.Clase);
            $("#tbProductoAsociado").val(json.Servicios);
            $("#tbSpc").val(json.Spc);
            $("#lbQueHacer").empty();
            $("#lbQueHacer").append(json.QueHacerHtml);
            $("#lbPosibleCausa").empty();
            $("#lbPosibleCausa").append(json.PosibleCausa);
            $("#lbUsuarioAEscalar").empty();
            $("#lbUsuarioA  Escalar").append(json.AreayUsuarioEscala);
            $("#marcaTiempo").val(json.CantidadDias);
            SetTextCodigosCierre(json.Subrazon)
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });

}

function AEscalarCambiado() {
    var valueAEscalar = $("#ddEscalar").val();

    if (valueAEscalar == "CELULA SOPORTE") {
        $("#cellSoporteTable").show();
    } else {
        $("#cellSoporteTable").hide();
    }

}


function SetTextCodigosCierre(subrazon) {
    $("#lbCodigosCierre").empty();
    $.ajax({
        type: "POST",
        url: urlCodigosDeCierre,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ submarcacion: subrazon }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);

            for (var i = 0; i < json.length; i++) {
                $("#lbCodigosCierre").append("-" + json[i] + "</br>")
            }

        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });

}