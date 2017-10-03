﻿
$(document).ready(function () {
    $("#Li1I").click(function () {

        $("#Li2I").css('background-color', 'transparent');
        $("#Li1I").css("background-color", "#dcdcdc");
        $("#Li1I").css("border-color", "#d4a057");
        $("#Li2I").css("border-color", "transparent");
        $("#Li3I").css("border-color", "transparent");
        $("#Li3I").css('background-color', 'transparent');

    });

    $("#Li2I").click(function () {
        $("#Li1I").css("background-color", "transparent");
        $("#Li2I").css("background-color", "#dcdcdc");
        $("#Li2I").css("border-color", "#d4a057");
        $("#Li1I").css("border-color", "transparent");
        $("#Li3I").css("border-color", "transparent");
        $("#Li3I").css('background-color', 'transparent');
    });

    $("#Li3I").click(function () {
        $("#Li1I").css("background-color", "transparent");
        $("#Li3I").css("background-color", "#dcdcdc");
        $("#Li3I").css("border-color", "#d4a057");
        $("#Li1I").css("border-color", "transparent");
        $("#Li2I").css("border-color", "transparent");
        $("#Li2I").css('background-color', 'transparent');
    });

    $('#cuentaCliente').val('');

    $("#cuentaCliente").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            var Cliente = $("#cuentaCliente").val();
            if (Cliente != "") {
                BuscaCliente(Cliente);
            }
            else
            {
                LimpiarControles();
                alert('Digite una Cuenta');
            }
        }
    });

    SetSeguimientosGrid();
});

function BuscaCliente(Cliente) {
    $.ajax({
        type: "POST",
        url: urlBuscaCliente,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cliente }),
        dataType: "JSON",
        success: function (result) {
            if (result != "null") {
                var json = JSON.parse(result);
                //var object = json[0];

                $('#NombreCliente').val(json.Nombre);
                $('#ApellidoCliente').val(json.Apellido);
                $('#TelefonoTel').val(json.TelefonoTelmex);
                $('#Telefono1').val(json.Telefono1);
                $('#Telefono2').val(json.Telefono2);
                $('#Telefono3').val(json.Telefono3);
                $('#DirInsta').val(json.DirInstalacion);
                $('#Correspondencia').val(json.DirCorrespondencia);
                $('#Nodo').val(json.Nodo);
                $('#Red').val(json.Red);
                $('#Division').val(json.Division);
                $('#Area').val(json.Area);
                $('#Zona').val(json.Zona);
                $('#Distrito').val(json.Distrito);
                $('#NomComunidad').val(json.NombreComunidad);
                $('#Estrato').val(json.Estrato);
                $('#TipoCliente').val(json.TipoCliente);
                $('#Descripcion').val(json.Descripcion);

                SetMacroProceso();
                SetHistorial(Cliente);
            }
            else {
                LimpiarControles();
                alert('No existe la Cuenta Digitada');
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function SetMacroProceso() {
    $("#MacroprocesoI").removeAttr("disabled");
    $("#MacroprocesoI").empty();
    $("#MacroprocesoI").append("<option value=''>--Select Option--</option>");

    $.ajax({
        type: "POST",
        url: urlMacroProcesoRecurrenciaList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idProceso: 6 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#MacroprocesoI').append($('<option>', {
                    value: json[index].OpcionesRecurrencia,
                    text: json[index].OpcionesRecurrencia
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    $("#ServicioAfectadoI").attr("disabled");
    $("#ServicioAfectadoI").empty();
    $("#ServicioAfectadoI").append("<option value=''>--Select Option--</option>");
    $("#ArbolSoporteI").attr("disabled", "disabled");
    $("#ArbolSoporteI").empty();
    $("#ArbolSoporteI").append("<option value=''>--Select Option--</option>");
    $("#FallaCausaRaizI").attr("disabled", "disabled");
    $("#FallaCausaRaizI").empty();
    $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
    $("#SolucionEspecificaI").attr("disabled", "disabled");
    $("#SolucionEspecificaI").empty();
    $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
    $("#EstadoI").attr("disabled", "disabled");
    $("#EstadoI").empty();
    $("#EstadoI").append("<option value=''>--Select Option--</option>");
    $("#FallaAtribuibleAI").attr("disabled", "disabled");
    $("#FallaAtribuibleAI").empty();
    $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
    $("#PorQueI").attr("disabled", "disabled");
    $("#PorQueI").val('');
    $("#ActivacionClaroVideoNagraI").attr("disabled", "disabled");
    $("#ActivacionClaroVideoNagraI").empty();
    $("#ActivacionClaroVideoNagraI").append("<option value=''>--Select Option--</option>");
    $("#ServicioOfrecidoI").attr("disabled", "disabled");
    $("#ServicioOfrecidoI").empty();
    $("#ServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
    $("#AceptacionServicioOfrecidoI").attr("disabled", "disabled");
    $("#AceptacionServicioOfrecidoI").empty();
    $("#AceptacionServicioOfrecidoI").append("<option value=''>--Select Option--</option>");

}

function SetServicioAfectado() {
    if ($("#MacroprocesoI").val() != "") {
        $("#ServicioAfectadoI").removeAttr("disabled");
        $("#ServicioAfectadoI").empty();
        $("#ServicioAfectadoI").append("<option value=''>--Select Option--</option>");
        $.ajax({
            type: "POST",
            url: urlServicioAfectadoList,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ idProceso: 4 }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#ServicioAfectadoI').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].OpcionesRecurrencia
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });

        $("#ArbolSoporteI").attr("disabled", "disabled");
        $("#ArbolSoporteI").empty();
        $("#ArbolSoporteI").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaizI").attr("disabled", "disabled");
        $("#FallaCausaRaizI").empty();
        $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');
        SetActivacionCamposFinales();

    }
    else {
        $("#ServicioAfectadoI").attr("disabled", "disabled");
        $("#ServicioAfectadoI").empty();
        $("#ServicioAfectadoI").append("<option value=''>--Select Option--</option>");
        $("#ArbolSoporteI").attr("disabled", "disabled");
        $("#ArbolSoporteI").empty();
        $("#ArbolSoporteI").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaizI").attr("disabled", "disabled");
        $("#FallaCausaRaizI").empty();
        $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');
        $("#ActivacionClaroVideoNagraI").attr("disabled", "disabled");
        $("#ActivacionClaroVideoNagraI").empty();
        $("#ActivacionClaroVideoNagraI").append("<option value=''>--Select Option--</option>");
        $("#ServicioOfrecidoI").attr("disabled", "disabled");
        $("#ServicioOfrecidoI").empty();
        $("#ServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
        $("#AceptacionServicioOfrecidoI").attr("disabled", "disabled");
        $("#AceptacionServicioOfrecidoI").empty();
        $("#AceptacionServicioOfrecidoI").append("<option value=''>--Select Option--</option>");

    }
}

function SetArbolSoporte() {

    if ($("#ServicioAfectadoI").val() != "") {

        var IdServicioAfectadoI = document.getElementById("ServicioAfectadoI");
        var ServicioAfectadoI = IdServicioAfectadoI.options[IdServicioAfectadoI.selectedIndex].text;
        $('#ServicioAfectadoIO').val(ServicioAfectadoI);

        $("#ArbolSoporteI").removeAttr("disabled");
        $("#ArbolSoporteI").empty();
        $("#ArbolSoporteI").append("<option value=''>--Select Option--</option>");
        var idOpcionesRecu = $("#ServicioAfectadoI").val();
        $.ajax({
            type: "POST",
            url: urlFallaEspecificaList,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ idOpcionesRecurrencia: idOpcionesRecu }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#ArbolSoporteI').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].FallaEspecificaCCAA
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });

        $("#FallaCausaRaizI").attr("disabled", "disabled");
        $("#FallaCausaRaizI").empty();
        $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');

    }
    else {
        $("#ArbolSoporteI").attr("disabled", "disabled");
        $("#ArbolSoporteI").empty();
        $("#ArbolSoporteI").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaizI").attr("disabled", "disabled");
        $("#FallaCausaRaizI").empty();
        $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');
        $('#ServicioAfectadoIO').val('');
        $('#ArbolSoporteIO').val('');
        $('#FallaCausaRaizIO').val('');

    }
}

function SetFallaCausaRTaiz() {
    if ($("#ArbolSoporteI").val() != "") {
        var IdArbolSoporteI = document.getElementById("ArbolSoporteI");
        var ArbolSoporteI = IdArbolSoporteI.options[IdArbolSoporteI.selectedIndex].text;
        $('#ArbolSoporteIO').val(ArbolSoporteI);

        $("#FallaCausaRaizI").removeAttr("disabled");
        $("#FallaCausaRaizI").empty();
        $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
        var idFallaEspecifica = $("#ArbolSoporteI").val();
        $.ajax({
            type: "POST",
            url: urlFallaCausaRaizList,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ idFallaEspecifica: idFallaEspecifica }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#FallaCausaRaizI').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].FallaCausaRaiz
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });

        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');


    }
    else {

        $("#FallaCausaRaizI").attr("disabled", "disabled");
        $("#FallaCausaRaizI").empty();
        $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');
        $('#ArbolSoporteIO').val('');
        $('#FallaCausaRaizIO').val('');

    }
}

function SetOpciones() {
    if ($("#FallaCausaRaizI").val() != "") {
        var IdFallaCausaRaizI = document.getElementById("FallaCausaRaizI");
        var FallaCausaRaizI = IdFallaCausaRaizI.options[IdFallaCausaRaizI.selectedIndex].text;
        $('#FallaCausaRaizIO').val(FallaCausaRaizI);

        $("#SolucionEspecificaI").removeAttr("disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $.ajax({
            type: "POST",
            url: urlSolucionEspecificaList,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ idProceso: 14 }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#SolucionEspecificaI').append($('<option>', {
                        value: json[index].OpcionesRecurrencia,
                        text: json[index].OpcionesRecurrencia
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });

        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").removeAttr("disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").append("<option value='INTERCONTACT'>INTERCONTACT</option>");
        $("#FallaAtribuibleAI").append("<option value='ATRIBUIBLE AL CLIENTE'>ATRIBUIBLE AL CLIENTE</option>");
        $("#FallaAtribuibleAI").append("<option value='ATRIBUIBLE A CLARO'>ATRIBUIBLE A CLARO</option>");
        $("#FallaAtribuibleAI").append("<option value='EQUIPOS DE CLARO'>EQUIPOS DE CLARO</option>");
        $("#FallaAtribuibleAI").append("<option value='FALLA RED EXTERNA'>FALLA RED EXTERNA</option>");
        $("#FallaAtribuibleAI").append("<option value='ASESOR PRIMER NIVEL'>ASESOR PRIMER NIVEL</option>");
        $("#FallaAtribuibleAI").append("<option value='OFICINAS CAV'>OFICINAS CAV</option>");
        $("#FallaAtribuibleAI").append("<option value='OPERACIONES'>OPERACIONES</option>");
        $("#FallaAtribuibleAI").append("<option value='SERVICE DESK'>SERVICE DESK</option>");
        $("#FallaAtribuibleAI").append("<option value='SERVICIOS ESPECIALES'>SERVICIOS ESPECIALES</option>");
        $("#PorQueI").removeAttr("disabled");
        $("#PorQueI").val('');


    }
    else {

        $("#SolucionEspecificaI").attr("disabled", "disabled");
        $("#SolucionEspecificaI").empty();
        $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
        $("#FallaAtribuibleAI").attr("disabled", "disabled");
        $("#FallaAtribuibleAI").empty();
        $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
        $("#PorQueI").attr("disabled", "disabled");
        $("#PorQueI").val('');
        $('#FallaCausaRaizIO').val('');

    }
}

function SetEstado() {
    if ($('#SolucionEspecificaI').val() != "") {
        var Valor = $('#SolucionEspecificaI').val();

        if (Valor == "ENVIO VISITA"
        || Valor == "ESCALAMIENTO A GERENCIA"
        || Valor == "REPORTE GERENCIA MATRIZ"
        || Valor == "ESCALAMIENTO A BACK ELITE"
        || Valor == "AJUSTE POR TIEMPO SIN SERVICIO"
        || Valor == "AJUSTE POR COBROS ERRADOS"
        || Valor == "ESCALAMIENTO APLICACION CAMPAÑA"
        || Valor == "ESCALAMIENTO CONGELACION"
        || Valor == "ESCALAMIENTO LIBERACION HHPP"
        || Valor == "ESCALAMIENTO DAÑOS A TERCEROS"
        || Valor == "ESCALAMIENTO PQR"
        || Valor == "CONFIRMACION VISITA"
        || Valor == "REPROGRAMACION VISITA"
        || Valor == "INFORMACION ESTADO PQR") {
            $("#EstadoI").removeAttr("disabled");
            $("#EstadoI").empty();
            $("#EstadoI").append("<option value=''>--Select Option--</option>");
            $("#EstadoI").append("<option value='SEGUIMIENTO'>SEGUIMIENTO</option>");
        }
        else {
            $("#EstadoI").removeAttr("disabled");
            $("#EstadoI").empty();
            $("#EstadoI").append("<option value=''>--Select Option--</option>");
            $("#EstadoI").append("<option value='FINALIZADO'>FINALIZADO</option>");
        }
    }
    else {
        $("#EstadoI").attr("disabled", "disabled");
        $("#EstadoI").empty();
        $("#EstadoI").append("<option value=''>--Select Option--</option>");
    }
}

function SetActivacionCamposFinales() {
    $("#ActivacionClaroVideoNagraI").removeAttr("disabled");
    $("#ActivacionClaroVideoNagraI").empty();
    $("#ActivacionClaroVideoNagraI").append("<option value=''>--Select Option--</option>");
    $("#ActivacionClaroVideoNagraI").append("<option value='INCENTIVA USO CLARO VIDEO'>INCENTIVA USO CLARO VIDEO</option>");
    $("#ActivacionClaroVideoNagraI").append("<option value='NO DESEA ACTIVACION'>NO DESEA ACTIVACION</option>");
    $("#ActivacionClaroVideoNagraI").append("<option value='SE ACTIVA CLARO VIDEO'>SE ACTIVA CLARO VIDEO</option>");
    $("#ActivacionClaroVideoNagraI").append("<option value='TARIFA NO DEFINIDA'>TARIFA NO DEFINIDA</option>");
    $("#ActivacionClaroVideoNagraI").append("<option value='TERCERO'>TERCERO</option>");
    $("#ActivacionClaroVideoNagraI").append("<option value='YA SE ENCUENTRA ACTIVO'>YA SE ENCUENTRA ACTIVO</option>");
    $("#ServicioOfrecidoI").removeAttr("disabled");
    $("#ServicioOfrecidoI").empty();
    $("#ServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
    $.ajax({
        type: "POST",
        url: urlContactoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idProceso: 13 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#ServicioOfrecidoI').append($('<option>', {
                    value: json[index].OpcionesRecurrencia,
                    text: json[index].OpcionesRecurrencia
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}

function SetAceptacionServicioOfrecido() {
    if ($("#ServicioOfrecidoI").val() != "") {
        $("#AceptacionServicioOfrecidoI").removeAttr("disabled");
        $("#AceptacionServicioOfrecidoI").empty();
        $("#AceptacionServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
        $("#AceptacionServicioOfrecidoI").append("<option value='ACEPTA OFRECIMIENTO'>ACEPTA OFRECIMIENTO</option>");
        $("#AceptacionServicioOfrecidoI").append("<option value='NO ESTA DISPONIBLE'>NO ESTA DISPONIBLE</option>");
        $("#AceptacionServicioOfrecidoI").append("<option value='NO LE INTERESA'>NO LE INTERESA</option>");
        $("#AceptacionServicioOfrecidoI").append("<option value='NO LE INTERESA POR COSTOS'>NO LE INTERESA POR COSTOS</option>");
        $("#AceptacionServicioOfrecidoI").append("<option value='TERCERA PERSONA'>TERCERA PERSONA</option>");
    }
    else {
        $("#AceptacionServicioOfrecidoI").attr("disabled", "disabled");
        $("#AceptacionServicioOfrecidoI").empty();
        $("#AceptacionServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
    }

}

function SetSeguimientosGrid() {
    $.ajax({
        type: "POST",
        url: urlListSeguimientosI,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);

            ShowGridSeguimientosI(json);
            //alert();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}

function ShowGridSeguimientosI(data) {

    $("#SeguimientosIGrid").kendoGrid({
        dataSource: {
            data: data,
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
            { command: { text: " ", click: CargaSeguimientoI, imageClass: "k-icon k-i-pencil", }, title: "Editar", width: "70px" },
       { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #" },
       { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 90 },
            { field: "Macroproceso", title: "Macroproceso", headerAttributes: { style: "white-space: normal" }, width: 130 },
           { field: "ServicioAfectado", title: "Servicio Afectado", headerAttributes: { style: "white-space: normal" }, width: 130 },
             { field: "ArbolSoporte", title: "Arbol de Soporte", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "FallaCausaRaiz", title: "Falla Causa Raiz", headerAttributes: { style: "white-space: normal" }, width: 80 },
       { field: "SolucionEspecifica", title: "Solucion Especifica", headerAttributes: { style: "white-space: normal" }, width: 100 }
        ]

    });

}

function CargaSeguimientoI(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    LimpiarControles();
    BuscaCliente(dataItem.CuentaCliente);
    $('#cuentaCliente').val(dataItem.CuentaCliente);
    $("#Li1I").click();
    $("#Li2I").removeClass("active").addClass("");
    $("#Li1I").removeClass("").addClass("active");
    $("#SeguimientosInbound").removeClass("tab-pane active").addClass("tab-pane");
    $("#datosBasicosInbound").removeClass("tab-pane tab-dime-first").addClass("tab-pane tab-dime-first active");

}

function SetHistorial(Cliente) {
    $("#Li3I").css("display", "block");
    $.ajax({
        type: "POST",
        url: urlListHistorialI,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cliente }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            ShowGridHistorialI(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function ShowGridHistorialI(data) {

    $("#HistorialIGrid").kendoGrid({
        dataSource: {
            data: data,
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
            //{ command: { text: " ", click: CargaSeguimientoI, imageClass: "k-icon k-i-pencil", }, title: "Editar", width: "70px" },
        { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #" },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 90 },
        { field: "AliadoGestion", title: "Aliado Gestion", headerAttributes: { style: "white-space: normal" }, width: 90 },
        { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 90 },
        { field: "Macroproceso", title: "Macroproceso", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "ServicioAfectado", title: "Servicio Afectado", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "ArbolSoporte", title: "Arbol de Soporte", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "FallaCausaRaiz", title: "Falla Causa Raiz", headerAttributes: { style: "white-space: normal" }, width: 130 },
        { field: "SolucionEspecifica", title: "Solucion Especifica", headerAttributes: { style: "white-space: normal" }, width: 150 },
        { field: "Estado", title: "Estado", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "FallaAtribuibleA", title: "Falla Atribuible A:", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "PorQue", title: "Por Que", headerAttributes: { style: "white-space: normal" }, width: 150 },
        { field: "ActivacionClaroVideoNagra", title: "Activacion Claro Video Nagra", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "ServicioOfrecido", title: "Servicio Ofrecido", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "AceptacionServicioOfrecido", title: "Aceptacion Servicio Ofrecido", headerAttributes: { style: "white-space: normal" }, width: 100 },
        { field: "Observaciones", title: "Observaciones", headerAttributes: { style: "white-space: normal" }, width: 150 }
    ]

    });

}

function LimpiarControles() {

    $('#NombreCliente').val('');
    $('#ApellidoCliente').val('');
    $('#TelefonoTel').val('');
    $('#Telefono1').val('');
    $('#Telefono2').val('');
    $('#Telefono3').val('');
    $('#DirInsta').val('');
    $('#Correspondencia').val('');
    $('#Nodo').val('');
    $('#Red').val('');
    $('#Division').val('');
    $('#Area').val('');
    $('#Zona').val('');
    $('#Distrito').val('');
    $('#NomComunidad').val('');
    $('#Estrato').val('');
    $('#TipoCliente').val('');
    $('#Descripcion').val('');

    $("#MacroprocesoI").attr("disabled", "disabled");
    $("#MacroprocesoI").empty();
    $("#MacroprocesoI").append("<option value=''>--Select Option--</option>");
    $("#ServicioAfectadoI").attr("disabled", "disabled");
    $("#ServicioAfectadoI").empty();
    $("#ServicioAfectadoI").append("<option value=''>--Select Option--</option>");
    $("#ArbolSoporteI").attr("disabled", "disabled");
    $("#ArbolSoporteI").empty();
    $("#ArbolSoporteI").append("<option value=''>--Select Option--</option>");
    $("#FallaCausaRaizI").attr("disabled", "disabled");
    $("#FallaCausaRaizI").empty();
    $("#FallaCausaRaizI").append("<option value=''>--Select Option--</option>");
    $("#SolucionEspecificaI").attr("disabled", "disabled");
    $("#SolucionEspecificaI").empty();
    $("#SolucionEspecificaI").append("<option value=''>--Select Option--</option>");
    $("#EstadoI").attr("disabled", "disabled");
    $("#EstadoI").empty();
    $("#EstadoI").append("<option value=''>--Select Option--</option>");
    $("#FallaAtribuibleAI").attr("disabled", "disabled");
    $("#FallaAtribuibleAI").empty();
    $("#FallaAtribuibleAI").append("<option value=''>--Select Option--</option>");
    $("#PorQueI").val('');
    $("#ActivacionClaroVideoNagraI").attr("disabled", "disabled");
    $("#ActivacionClaroVideoNagraI").empty();
    $("#ActivacionClaroVideoNagraI").append("<option value=''>--Select Option--</option>");
    $("#ServicioOfrecidoI").attr("disabled", "disabled");
    $("#ServicioOfrecidoI").empty();
    $("#ServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
    $("#AceptacionServicioOfrecidoI").attr("disabled", "disabled");
    $("#AceptacionServicioOfrecidoI").empty();
    $("#AceptacionServicioOfrecidoI").append("<option value=''>--Select Option--</option>");
    $("#Li3I").css("display", "none");
    $("#Li1I").click();
    $("#Li3I").removeClass("active").addClass("");
    $("#Li2I").removeClass("active").addClass("");
    $("#Li1I").removeClass("").addClass("active");
    //$("#SeguimientosInbound").removeClass("tab-pane active").addClass("tab-pane");
    $("#HistorialInbound").removeClass("tab-pane active").addClass("tab-pane");
    $("#datosBasicosInbound").removeClass("tab-pane tab-dime-first").addClass("tab-pane tab-dime-first active");
}