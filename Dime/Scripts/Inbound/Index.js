var consultar;

$(document).ready(function () {

   
    $("#hobbieOption").prop("selectedIndex", 0);
    $("#rangoEdadOption").prop("selectedIndex", 0);
    $("#noHijosOption").prop("selectedIndex", 0);
    $("#edadHijosOption").prop("selectedIndex", 0);
    $("#nivelEstudiosOption").prop("selectedIndex", 0);


    $("#inputCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            SubmitGetDatos();
          
        }
        
        

    });


    
    $("#keyMarcacion").on("keyup", function (e) {
     
      clearTimeout(consultar);
      consultar =    setTimeout(function () {
         if ($("#keyMarcacion").val() != "") {
             var keyWord = $("#keyMarcacion").val();
             ConsultarMarcacionesPorPalabra(keyWord);
         }
       }, 400);

    });


    $("#inputCedula").focus(function () {
        ActivarBuscarPorCedula();
     
    })

    var choosenAccount = getQueryVariable('choosenCuenta');
    // si el formulario se carga con una cuenta encontrada en buscar cuentas por clientes
    if (choosenCuenta != 0 && cedulaLlena == 0 && choosenAccount!= null)
    {
        SubmitGetDatos();
    }

    $("#Li1").click(function () {
        
        $("#Li2").css('background-color', '#f6f6f6');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "transparent");
        $("#Li1").css("border-color", "#c23321");
    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "#f6f6f6");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
    });

    $("#Li3").click(function () {

        $("#Li4").css('background-color', '#f6f6f6');
        $("#Li3").css("background-color", "#dcdcdc");
        $("#Li3").css("border-color", "#c23321");
        $("#Li4").css("border-color", "transparent");
    });

    $("#Li4").click(function () {
        $("#Li3").css("background-color", "#f6f6f6");
        $("#Li4").css("background-color", "#dcdcdc");
        $("#Li3").css("border-color", "transparent");
        $("#Li4").css("border-color", "#c23321");
    });

    TraerFormTipificacion();

    $("#noPqr").val("0");

    console.log("cambio en scripts en medio 3");
    ChangeStateCase();
    var cuentaActual = $("#inputCuenta").val();
    if(cuentaActual!=0){
        CargarHistoricoCasos();
    }

    CambioEscalaSoporte();
});


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }

}

function AEscalarCambiado()
{
    var valueAEscalar = $("#ddEscalar").val();

    if(valueAEscalar== "CELULA SOPORTE")
    {
        $("#cellSoporteTable").show();
        $("#ddEscalarSoporte").val("CELULA VISITA SOPORTE");
        CambioEscalaSoporte()
    } else {
        $("#cellSoporteTable").hide();
        $("#ddEscalarSoporte").val("0");
    }

}



function SubmitGetDatos() {
    
    $("#submitGetDatos").click();


};

function TraerFormTipificacion() {
    $.ajax({
        type: "POST",
        url: tipificadorUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cuenta: "589752" }),
        dataType: "html",
        success: function (result) {
            $('#viewTipificacion').html(result);
        }

    });

};


function ActivarBuscarPorCedula() {
    $("#modalActivarCuenta").click();

    $.ajax({
        type: "GET",
        url: consultCuentaDivUrl,
        dataType: "html",
        success: function (result) {
            $('#consultaCuentas').html(result);
        }
    });


};

function checkMarcacion(eve)
{
    VaciarCamposDeMarcacionSeleccionada();
    var idMarcacion = $(eve.target).val();

    setTimeout(function () {
        $.ajax({
            type: "POST",
            url: datosDeMarcacionUrl,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ marcacion: idMarcacion }),
            dataType: "json",
            success: function (result) {
                var json = JSON.parse(result);
                console.log(json);
                if (MarcacionYaCasoAbierto(json.Submarcacion) === false) {
                    $("#avisoYaMarcacionEnCaso").text("");
                    $("#btnSubmitCaso").prop("disabled", false);
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
                    $("#lbUsuarioAEscalar").append(json.AreayUsuarioEscala);
                    $("#marcaTiempo").val(json.CantidadDias);
                    SetTextCodigosCierre(json.Subrazon);
                }
                else {
                    $("#avisoYaMarcacionEnCaso").text("Ya existe un caso abierto con esta marcación");
                }
            },
            error: function (request, status, error) {
                alert(request.responseText + " " + status + "  " + error);
            }
        });
    }, 500);
 

}


function MarcacionYaCasoAbierto(marcacion)
{
    var dataOfOpenedCasesData = $("#viewHistoricoCasosAbiertos").data();
    var dataOfOpenedCases = [];
    if (dataOfOpenedCasesData!= undefined)
     dataOfOpenedCases = dataOfOpenedCasesData.kendoGrid.dataSource.view();
    for (var i = 0; i < dataOfOpenedCases.length; i++)
    {
        if(marcacion==dataOfOpenedCases[i].Marcacion )
        {
            return true;
        }
    }
    return false;
}

function VaciarCamposDeMarcacionSeleccionada()
{
    $("#btnSubmitCaso").prop("disabled", true);
    $("#tbMacroproceso").val("");
    $("#tbMarcacion").val("");
    $("#tbTipoAtencion").val("");
    $("#tbProductoAsociado").val("");
    $("#tbSpc").val("");
    $("#lbQueHacer").empty();
    $("#lbPosibleCausa").empty();
    $("#lbUsuarioAEscalar").empty();
    $("#marcaTiempo").val("");
    $("#lbCodigosCierre").empty();
}



function SetTextCodigosCierre(subrazon)
{
    $("#lbCodigosCierre").empty();
    $.ajax({
        type: "POST",
        url: urlCodigosDeCierre,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ submarcacion: subrazon }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            for (var i = 0; i < json.length; i++)
            {
                $("#lbCodigosCierre").append("-" + json[i] +"</br>" )
            }
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });

}

function ConsultarMarcacionesPorPalabra(key)
{

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
            $("#avisoNoResultado").text("");
            if (json.length === 0) { $("#avisoNoResultado").text("No hay resultados con esa palabra clave"); }
            for (var i = 0; i < json.length; i++)
            {
                listPosibles.append('<li><input type="radio" class="RadMarcacion" name="grupoMarcaciones" value="' + json[i].Id + '" onclick="checkMarcacion(event);"  /> ' + json[i].Submarcacion + ' - '+json[i].Descripcion+'</li>');
            }

        }

    });


};


function ChangeStateCase() {
    console.log("resultado cambio 2");
    var valueState = $("#ddState").val();

    if (valueState != 1) {
        $("#ddEscalar").prop("disabled", true);
        $("#ddEscalar").val("NULL");
    } else {
        $("#ddEscalar").prop("disabled", false);
    }

};


function CargarHistoricoCasos()
{
    var cuentaActual = $("#inputCuenta").val();
    $.ajax({
        type: "POST",
        url: hitorialUrl,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cuenta: cuentaActual }),
        dataType: "json",
        success: function (result) {
            console.log("cambio en premio 2");
            var json = JSON.parse(result);
            SetearEstadoHistoricos(json);
            MostrarHistorialAbierto(json);
            MostrarHistorialCerrado(json);
            console.log(json);
                                  }

    });
};

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


function CambioEscalaSoporte()
{
    var valorAEscalar = $("#ddEscalarSoporte").val();
    if (valorAEscalar == "CELULA SEGUIMIENTO SOPORTE" || valorAEscalar == "CELULA VISITA SOPORTE")
    {
        var newOption =
        $("#ddEscalar").append('<option value="' + valorAEscalar + '" >' + valorAEscalar + '</option>');
        $("#ddEscalar").val(valorAEscalar);
    }

}

function MostrarHistorialAbierto(data)
{
    var dataAbiertos =[] ;
    for (var i = 0; i < data.length; i++)
    {
        if (data[i].IdEstado != "CERRADO")
        {
            dataAbiertos.push(data[i])
        }
    }


    $("#viewHistoricoCasosAbiertos").kendoGrid({
        dataSource: {
            data: dataAbiertos,
            pageSize: 5,

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
        },
        columns: [
               { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "80px" },
         { field: "IdIngreso", title: "ID", width: 70 },
       { field: "Ticket", title: "Ticket", width: 80, filterable: false },
         { field: "HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
         { field: "UsuarioApertura", title: "Usr Apertura", width: 100 },
         { field: "HoraUltimaActualizacion", title: "Fe. Ult Actualización", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
         { field: "UsuarioUltimaActualizacion", title: "Usr. Ult Actualización", width: 120 },
         { field: "Macroproceso", title: "Macroproceso", width: 100 },
         { field: "Marcacion", title: "Marcación", width: 100 },
         { field: "IdEstado", title: "Estado", width: 100 }
     
        ]

    });
    var grid = $("#viewHistoricoCasosAbiertos").data("kendoGrid");
    grid.dataSource.sort({ field: "IdIngreso", dir: "desc" });
}


function MostrarHistorialCerrado(data)
{
    var dataCerrados = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].IdEstado == "CERRADO") {
            dataCerrados.push(data[i])
        }
    }


    $("#viewHistoricoCasosCerrados").kendoGrid({
        dataSource: {
            data: dataCerrados,
            pageSize: 5,
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
        },
        columns: [
              { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "80px" },
        { field: "IdIngreso", title: "ID", width: 70 },
      { field: "Ticket", title: "Ticket", width: 80, filterable: false },
        { field: "HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
        { field: "UsuarioApertura", title: "Usr Apertura", width: 100 },
        { field: "HoraUltimaActualizacion", title: "Fe. Ult Actualización", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
        { field: "UsuarioUltimaActualizacion", title: "Usr. Ult Actualización", width: 120 },
        { field: "Macroproceso", title: "Macroproceso", width: 100 },
        { field: "Marcacion", title: "Marcación", width: 100 },
        { field: "IdEstado", title: "Estado", width: 100 }
   
        ]

    });
    var grid = $("#viewHistoricoCasosCerrados").data("kendoGrid");
    grid.dataSource.sort({ field: "IdIngreso", dir: "desc" });
}


function ActualizarCaso(e) {
    e.preventDefault();
    var cuentaActual = $("#inputCuenta").val();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'Actualizar?id=' + dataItem.IdIngreso + "&nombMarcacion=" + dataItem.Marcacion;
}
