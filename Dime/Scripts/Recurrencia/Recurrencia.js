$(document).ready(function () {

    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");

    });

    $("#inputCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#BotonEnvia").click();
        }
    });
    SetMacroProcesoRecurrencia();
    SetContactoList();
    SetSolucionEspecifica();
    CargaSeguimientos();
    $("#Observaciones").val('');
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
        $("#VozCliente").val('');
        $("#Proceso").empty();
        $("#Proceso").append("<option value=''>--Select Option--</option>");
        $("#Macroproceso").empty();
        $("#Macroproceso").append("<option value=''>--Select Option--</option>");
        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
    }
    else {
        $("#VozCliente").attr("disabled", "disabled");
        $("#ClientePresentaNovedades").attr("disabled", "disabled");
        $("#Proceso").attr("disabled", "disabled");
        $("#Macroproceso").attr("disabled", "disabled");
        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");

        $("#VozCliente").val('');
        $("#ClientePresentaNovedades").empty();
        $("#ClientePresentaNovedades").append("<option value=''>--Select Option--</option>");
        $("#Proceso").empty();
        $("#Proceso").append("<option value=''>--Select Option--</option>");
        $("#Macroproceso").empty();
        $("#Macroproceso").append("<option value=''>--Select Option--</option>");
        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");

    }

}

function SetProceso() {
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
    else {
        $("#Proceso").attr("disabled", "disabled");
        $("#Macroproceso").attr("disabled", "disabled");
        $("#ServicioAfectado").attr("disabled", "disabled");
        $("#FallaEspecificaArbolCCAA").attr("disabled", "disabled");
        $("#FallaCausaRaiz").attr("disabled", "disabled");

        $("#Proceso").empty();
        $("#Proceso").append("<option value=''>--Select Option--</option>");
        $("#Macroproceso").empty();
        $("#Macroproceso").append("<option value=''>--Select Option--</option>");
        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
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

        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");

        if ($("#Proceso").val() == "") {
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

        $("#ServicioAfectado").empty();
        $("#ServicioAfectado").append("<option value=''>--Select Option--</option>");
        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
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

        $("#FallaEspecificaArbolCCAA").empty();
        $("#FallaEspecificaArbolCCAA").append("<option value=''>--Select Option--</option>");
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
    }
}
function SetFallaCausaRaiz() {
    $("#FallaCausaRaiz").removeAttr("disabled");
    if ($("#FallaEspecificaArbolCCAA").val() != "") {
        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
        var idFallaEspecifica = $("#FallaEspecificaArbolCCAA").val();
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
                    $('#FallaCausaRaiz').append($('<option>', {
                        value: json[index].Id,
                        text: json[index].FallaCausaRaiz
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
    else {
        $("#FallaCausaRaiz").attr("disabled", "disabled");

        $("#FallaCausaRaiz").empty();
        $("#FallaCausaRaiz").append("<option value=''>--Select Option--</option>");
    }
}
function SetSolucionEspecifica() {
    $.ajax({
        type: "POST",
        url: urlSolucionEspecificaList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idProceso: 5 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];

            for (var index = 0, len = json.length; index < len; index++) {
                $('#SolucionEspecifica').append($('<option>', {
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
function SetEstado() {
    var Valor = $('#SolucionEspecifica').val();
    if (Valor == "PERSONALIZACION CLAVE WIFI"
    || Valor == "CAMBIO ENCRIPTACION"
    || Valor == "CONFIGURACION ACCESOS"
    || Valor == "CAMBIO CANAL FRECUENCIA"
    || Valor == "CAMBIO UBICACIÓN MODEM CON COSTO"
    || Valor == "DESCONEXION EQUIPOS CERCANOS WIFI"
    || Valor == "CAMBIO TOMA ELECTRICA"
    || Valor == "DESCONEXION DISPOSITIVOS AL CABLE MODEM CANTIDAD"
    || Valor == "REPARACION CONEXIÓN DISPOSITIVOS"
    || Valor == "REINICIO MODEM DIAGNOSTICADOR"
    || Valor == "REINICIO MODEM FABRICA"
    || Valor == "ENVIO COMANDO REFRESH"
    || Valor == "ENVIO COMANDO REPAIR"
    || Valor == "ENVIO COMANDO CLEARPARENTALKEY"
    || Valor == "ACTUALIZACION SERVICIOS MODULO GESTION"
    || Valor == "REPARACION SERVICIOS MODULO GESTION"
    || Valor == "REINICIO DISPOSITIVOS DEL CLIENTE"
    || Valor == "CONFIGURACION AVANZADA MODEM"
    || Valor == "RESET ENERGIA EQUIPOS CLARO"
    || Valor == "RESET ENERGIA EQUIPOS CLIENTE"
    || Valor == "FALLA ATRIBUIBLE AL USUARIO"
    || Valor == "SOPORTE CCAA TELEFONIA"
    || Valor == "SOPORTE CCAA TELEVISION"
    || Valor == "SOPORTE CCAA INTERNET"
    || Valor == "ENVIO FACTURA ELECTRONICA"
    || Valor == "ESCALAMIENTO ENVIO FACTURA FISICA"
    || Valor == "ACLARACION FACTURA"
    || Valor == "INFORMACION DE SALDO"
    || Valor == "INFORMACION DE PRODUCTO"
    || Valor == "INFORMACION DE TRAMITES"
    || Valor == "RECONEXION SERVICIOS"
    || Valor == "REALIZACION TRASLADO"
    || Valor == "CANCELACION VISITA"
    || Valor == "VENTA SERVICIOS"
    || Valor == "RADICAR SOLICITUD CANCELACION"
    || Valor == "INFORMACION ESTADO CANCELACION"
    || Valor == "SERVICIO OK")
    {
        $("#Estado").empty();
        $("#Estado").append("<option value=''>--Select Option--</option>");
        $("#Estado").append("<option value='FINALIZADO'>FINALIZADO</option>");
        $("#Estado").removeAttr("disabled");
    }
    else {
        $("#Estado").empty();
        $("#Estado").append("<option value=''>--Select Option--</option>");
        $("#Estado").append("<option value='SEGUIMIENTO'>SEGUIMIENTO</option>");
        $("#Estado").removeAttr("disabled");

        if (Valor == "") {
            $("#Estado").empty();
            $("#Estado").append("<option value=''>--Select Option--</option>");
            $("#Estado").attr("disabled", "disabled");
        }
    }

}
function Ofrecimiento_1_SI() {    
    $("#ofre1No").attr('checked', false);
};

function Ofrecimiento_1_NO() {
    $("#ofre1Si").attr('checked', false);
};
function Ofrecimiento_2_SI() {
    $("#ofre2No").attr('checked', false);
};

function Ofrecimiento_2_NO() {
    $("#ofre2Si").attr('checked', false);
};
function Ofrecimiento_3_SI() {
    $("#ofre3No").attr('checked', false);
};

function Ofrecimiento_3_NO() {
    $("#ofre3Si").attr('checked', false);
};


function ShowGridSeguimientos(data) {
    
    $("#seguimientosGrid").kendoGrid({
        dataSource: {
            data: data,
            pageSize: 10,
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
            { command: { text: " ", click:CargaSeguimiento, imageClass: "k-icon k-i-pencil", }, title: "Editar", width: "60px" },
       { field: "FechaGestion", title: "Fecha de Gestión",headerAttributes: { style: "white-space: normal" }, width: 100, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #" },
       { field: "CuentaCliente", title: "Cuenta Cliente",headerAttributes: { style: "white-space: normal" }, width: 90 },
            { field: "Division", title: "Division",headerAttributes: { style: "white-space: normal" }, width: 130 },
           { field: "Area", title: "Area",headerAttributes: { style: "white-space: normal" }, width: 130 },
             { field: "Zona", title: "Zona",headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "Marcaciones", title: "Marcaciones",headerAttributes: { style: "white-space: normal" }, width: 80},
        ]

    });
    
}

function CargaSeguimiento(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../Recurrencia/Recurrencia?cuentaSeleccionada=' + dataItem.CuentaCliente;

}

function CargaSeguimientos()
{
    
    $.ajax({
        type: "POST",
        url: urlListSeguimientos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
                
                ShowGridSeguimientos(json);
            
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}