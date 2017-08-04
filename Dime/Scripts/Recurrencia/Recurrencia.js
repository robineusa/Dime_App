$(document).ready(function () {

    $("#inputCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BotonEnvia").click();
        }
    });
    SetMacroProcesoRecurrencia();
    SetContactoList();
});

function SetMacroProcesoRecurrencia() {
    $.ajax({
        type: "POST",
        url: urlMacroProcesoRecurrenciaList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idProceso: 1 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];

            for (var index = 0, len = json.length; index < len; index++) {
                $('#MacroProcesoRecurrencia1').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
                $('#MacroProcesoRecurrencia2').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
                $('#MacroProcesoRecurrencia3').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function SetContactoList() {
    $.ajax({
        type: "POST",
        url: urlContactoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idProceso: 2 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Contacto').append($('<option>', {
                    value: json[index].Id,
                    text: json[index].OpcionesRecurrencia
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function SetOpciones() {
    
    if ($("#Contacto").val() == "17" || $("#Contacto").val() == "18") {
        $("#VozCliente").removeAttr("disabled");
        $("#ClientePresentaNovedades").removeAttr("disabled");
        $("#ClientePresentaNovedades").empty();
        $("#ClientePresentaNovedades").append("<option value=''>--Select Option--</option>");
        $("#ClientePresentaNovedades").append("<option Value='SI'>SI</option>");
        $("#ClientePresentaNovedades").append("<option Value='NO'>NO</option>");
    }
    else
    {
        $("#VozCliente").attr("disabled", "disabled");
        $("#ClientePresentaNovedades").attr("disabled", "disabled");
        $("#Proceso").attr("disabled", "disabled");
        $("#Macroproceso").attr("disabled", "disabled");
        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
    }

}

function SetProceso()
{
    if ($("#ClientePresentaNovedades").val() == "SI") {
        $("#Proceso").removeAttr("disabled");
        $("#Proceso").empty();
        $("#Proceso").append("<option value=''>--Select Option--</option>");
        $("#Proceso").append("<option Value='SAC'>SAC</option>");
        $("#Proceso").append("<option Value='SOPORTE'>SOPORTE</option>");
        $("#Macroproceso").empty();
        $("#Macroproceso").append("<option value=''>--Select Option--</option>");
        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");

    }
    else
    {
        $("#Proceso").attr("disabled", "disabled");
        $("#Macroproceso").attr("disabled", "disabled");
        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
    }
}
function SetMacroProceso() {
    $("#Macroproceso").removeAttr("disabled");
    if ($("#Proceso").val() == "SAC") {
        $("#Macroproceso").empty();
        $("#Macroproceso").append("<option value=''>--Select Option--</option>");
        $.ajax({
            type: "POST",
            url: urlMacroProcesoRecurrenciaList,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ idProceso: 1 }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Macroproceso').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].OpcionesRecurrencia
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
    }
    else {

        $("#Macroproceso").empty();
        $("#Macroproceso").append("<option value=''>--Select Option--</option>");
        $("#Macroproceso").append("<option Value='1'>SOPORTE (SOP)</option>");

        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");

        if ($("#Proceso").val() == "")
        {
            $("#Macroproceso").attr("disabled", "disabled");
        }
    }
}
function SetServicioAfectado() {
    $("#ServicioAfectado").removeAttr("disabled");
    if ($("#Macroproceso").val() != "") {
        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
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
                    $('#ServicioAfectado').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].OpcionesRecurrencia
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
        //$("#FallaEspecificaArbolCCAA").removeAttr("disabled");
        //$("#FallaCausaRaiz").removeAttr("disabled");
    }
    else {

        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
    }
}
function SetFallaEspecificaArbol() {
    $("#FallaEspecificaArbolCCAA").removeAttr("disabled");
    if ($("#ServicioAfectado").val() != "") {
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        var idOpcionesRecu = $("#ServicioAfectado").val();
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
                    $('#FallaEspecificaArbolCCAA').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].FallaEspecificaCCAA
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
    }
    else {
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");
    }
}

//SetFallaCausaRaiz