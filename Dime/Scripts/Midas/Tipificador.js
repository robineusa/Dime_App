$(document).ready(function () {
    $("#Li1").click(function () {
        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Li3").css('background-color', 'transparent');
        $("#Li3").css("border-color", "transparent");

    });
    $("#Li2").click(function () {
        $("#Li1").css('background-color', 'transparent');
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
        $("#Li3").css('background-color', 'transparent');
        $("#Li3").css("border-color", "transparent");
    });
    $("#Li3").click(function () {
        $("#Li1").css('background-color', 'transparent');
        $("#Li3").css("background-color", "#dcdcdc");
        $("#Li3").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css('background-color', 'transparent');
        $("#Li2").css("border-color", "transparent");
    });
    
    CargaSeguimientosTipificador();
    
});

$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    var Cuenta = $("#CuentaCliente").val();
    if (Cuenta == "" || Cuenta == null || Cuenta == "0") {
    } else {
        DatosClienteCuenta(Cuenta);
    }

});

function LimpiarDesplegables()
{
    $("#FallaServPrincipalesSoporte").empty();
    $("#FallaServAdicionalesSoporte").empty();
    $("#TipoFallaSoporte").empty();
    $("#SolucionEspecificaSoporte").empty();
    $("#EstadoSoporte").empty();
    $("#ProblemaFacturacion").empty();
    $("#SolucionFacturacion").empty();
    $("#EstadoFacturacion").empty();
    $("#ClienteIntencionCancelacion").empty();
    $("#MotivoCancelacion").empty();
    $("#RazonCancelacion").empty();
    $("#Gestion").empty();
    $("#Cierre").empty();
    $("#Razon").empty();
    $("#Motivo").empty();
    
}

function DatosClienteCuenta(Cuenta) {
    LimpiarDesplegables();
    $.ajax({
        type: "POST",
        url: UrlInformacionClienteTipificadorMidas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            if (json.CuentaCliente != 0) {
                VerificaCliente(Cuenta);
                $('#ConsumosPPV').val(json.ConsumosPPV);
                $('#UltimoPPV').val(json.UltimoPPV);
                $('#SiembraHD').val(json.SiembraHD);
                $('#SiembraVoz').val(json.SiembraVoz);
                $('#BlindajeInternet').val(json.BlindajeInternet);
                $('#Ultimas2Marcaciones').val(json.UltimaMarca1 + ' - ' + json.UltimaMarca2);
                $('#UltimaMarcaCancelacion').val(json.Ofrecimiento1);
                $('#Ofrecimiento1').val(json.Ofrecimiento1);
                TraerDatosClientesTodos(Cuenta);
            }
            else
            {
                $.alert({
                    theme: 'Modern',
                    icon: 'fa fa-warning',
                    boxWidth: '500px',
                    useBootstrap: false,
                    type: 'red',
                    title: '¡ Oops !',
                    content: 'Este cliente no se encuentra en la base para gestionar',
                    buttons: {
                        Ok: {
                            btnClass: 'btn-red',
                            action: function ()
                            {
                                location.reload();
                                $('#Li3').css("display", "none");
                                $('#BotonEnvia').css("display", "none");
                            }
                        },
                    }
                });
            }
        },
        error: function (request, status, error) {
            $.alert({
                theme: 'Modern',
                icon: 'fa fa-warning',
                boxWidth: '500px',
                useBootstrap: false,
                type: 'red',
                title: '¡ Oops !',
                content: 'Error en el servidor al buscar la base a gestionar',
                buttons: {
                    Ok: {
                        btnClass: 'btn-red',
                        action: function () { location.reload(); }
                    },
                }
            });
        }
    });

}

function TraerDatosClientesTodos(Cuenta)
{
    $.ajax({
        type: "POST",
        url: UrlTraerInformacionClienteClientesTodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            if (json != null)
            {
                $('#NombreCliente').val(json.Nombre);
                $('#ApellidoCliente').val(json.Apellido);
                $('#DirInstalacion').val(json.DirInstalacion);
                $('#DirCorrespondencia').val(json.DirCorrespondencia);
                $('#Telefono1').val(json.Telefono1);
                $('#Telefono2').val(json.Telefono2);
                $('#Telefono3').val(json.Telefono3);
                $('#Celular1').val(json.Celular1);
                $('#Celular2').val(json.Celular2);
                $('#Correo').val(json.Correo);
                $('#Estrato').val(json.Estrato);
                $('#Productos').val(json.Productos);
                $('#Nodo').val(json.Nodo);
                $('#NombreComunidad').val(json.NombreComunidad);
                $('#Division').val(json.Division);
                $('#TipoCliente').val(json.TipoCliente);
                $('#Descripcion').val(json.Descripcion);
                $('#Li3').css("display", "block");
                $('#BotonEnvia').css("display", "block");
                CargaHistorial();
                TraerArbolTipificacionGestion();

                TraerArbolDeSoporteServiciosPrincipales();
                TraerArbolDeSoporteServiciosAdicionales();
                TraerArbolDeSoporteTipoFalla();
                TraerArbolDeSoporteSolucionEspecifica();
                TraerArbolDeFacturacionProblemaFacturacion();
                TraerArbolDeFacturacionSolucionFacturacion();
                TraerArbolDeCancelacionIntencion();
                TraerArbolDeCancelacionMotivo();
                
            }
            else {
                $.alert({
                    theme: 'Modern',
                    icon: 'fa fa-warning',
                    boxWidth: '500px',
                    useBootstrap: false,
                    type: 'red',
                    title: '¡ Oops !',
                    content: 'Este cliente no posee datos',
                    buttons: {
                        Ok: {
                            btnClass: 'btn-red',
                            action: function () { location.reload(); }
                        },
                    }
                });
                LimpiarCampos();
            }
        },
        error: function (request, status, error) {
            $.alert({
                theme: 'Modern',
                icon: 'fa fa-warning',
                boxWidth: '500px',
                useBootstrap: false,
                type: 'red',
                title: '¡ Oops !',
                content: 'Error en el servidor al buscar los datos del cliente',
                buttons: {
                    Ok: {
                        btnClass: 'btn-red',
                        action: function () { location.reload(); }
                    },
                }
            });
    }
    });
}

function VerificaCliente(Cuenta)
{
    $.ajax({
        type: "POST",
        url: UrlVerificarCLiente,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(result);
            if (json != null) {
                $('#Id').val(json.Id);
                $('#AceptacionOfrecimiento11').val(json.AceptacionOfrecimiento1);
                $('#FallaServPrincipalesSoporte1').val(json.FallaServPrincipalesSoporte);
                $('#FallaServAdicionalesSoporte1').val(json.FallaServAdicionalesSoporte);
                $('#TipoFallaSoporte1').val(json.TipoFallaSoporte);
                $('#SolucionEspecificaSoporte1').val(json.SolucionEspecificaSoporte);
                $('#EstadoSoporte1').val(json.EstadoSoporte);
                $('#ObservacionesSoporte').val(json.ObservacionesSoporte);
                $('#ProblemaFacturacion1').val(json.ProblemaFacturacion);
                $('#SolucionFacturacion1').val(json.SolucionFacturacion);
                $('#EstadoFacturacion1').val(json.EstadoFacturacion);
                $('#ObservacionesFacturacion').val(json.ObservacionesFacturacion);
                $('#ClienteIntencionCancelacion1').val(json.ClienteIntencionCancelacion);
                $('#MotivoCancelacion1').val(json.MotivoCancelacion);
                $('#RazonCancelacion1').val(json.RazonCancelacion);
                $('#ObservacionesCancelacion').val(json.ObservacionesCancelacion);
                $('#Gestion1').val(json.Gestion);
                $('#Cierre1').val(json.Cierre);
                $('#Razon1').val(json.Razon);
                $('#Motivo1').val(json.Motivo);
                
                TraeAceptacionOfrecimientos();
                TraerEstados();
            }
            else {
                TraeAceptacionOfrecimientos();
                TraerEstados();
            }
        },
        error: function (request, status, error) {
            $.alert({
                theme: 'Modern',
                icon: 'fa fa-warning',
                boxWidth: '500px',
                useBootstrap: false,
                type: 'red',
                title: '¡ Oops !',
                content: 'Error en el servidor al Verificar el cliente',
                buttons: {
                    Ok: {
                        btnClass: 'btn-red',
                        action: function () { location.reload(); }
                    },
                }
            });
        }
    });
}
function TraeAceptacionOfrecimientos()
{
    $("#AceptacionOfrecimiento1").empty();
    $("#AceptacionOfrecimiento1").append("<option value=''>--SELECCIONE--</option>");
    $("#AceptacionOfrecimiento1").append("<option value='SI'>SI</option>");
    $("#AceptacionOfrecimiento1").append("<option value='NO'>NO</option>");
    var select = document.getElementById("AceptacionOfrecimiento1");
    // obtenemos el valor a buscar
    var buscar = document.getElementById("AceptacionOfrecimiento11").value;
    // recorremos todos los valores del select
    for (var i = 1; i < select.length; i++) {
        if (select.options[i].text == buscar) {
            // seleccionamos el valor que coincide
            select.selectedIndex = i;
            $('#AceptacionOfrecimiento1').val(select.options[i].value);
            //ListaSubrazones();
        }
    }
}
function TraerEstados() {
    $("#EstadoSoporte").empty();
    $("#EstadoSoporte").append("<option value=''>--SELECCIONE--</option>");
    $("#EstadoSoporte").append("<option value='FINALIZADO'>FINALIZADO</option>");
    $("#EstadoSoporte").append("<option value='SEGUIMIENTO'>SEGUIMIENTO</option>");
    var select = document.getElementById("EstadoSoporte");
    // obtenemos el valor a buscar
    var buscar = document.getElementById("EstadoSoporte1").value;
    // recorremos todos los valores del select
    for (var i = 1; i < select.length; i++) {
        
        if (select.options[i].text == buscar) {
            // seleccionamos el valor que coincide
            select.selectedIndex = i;
            $('#EstadoSoporte').val(select.options[i].value);
        }
    }
    $("#EstadoFacturacion").empty();
    $("#EstadoFacturacion").append("<option value=''>--SELECCIONE--</option>");
    $("#EstadoFacturacion").append("<option value='FINALIZADO'>FINALIZADO</option>");
    $("#EstadoFacturacion").append("<option value='SEGUIMIENTO'>SEGUIMIENTO</option>");
    var select = document.getElementById("EstadoFacturacion");
    // obtenemos el valor a buscar
    var buscar = document.getElementById("EstadoFacturacion1").value;
    // recorremos todos los valores del select
    for (var i = 1; i < select.length; i++) {
        if (select.options[i].text == buscar) {
            // seleccionamos el valor que coincide
            select.selectedIndex = i;
            $('#EstadoFacturacion').val(select.options[i].value);
        }
    }
}

function LimpiarCampos()
{
    $('#ConsumosPPV').val('');
    $('#UltimoPPV').val('');
    $('#SiembraHD').val('');
    $('#SiembraVoz').val('');
    $('#BlindajeInternet').val('');
    $('#Ultimas2Marcaciones').val('');
    $('#UltimaMarcaCancelacion').val('');
    $('#Ofrecimiento1').val('');

    $('#NombreCliente').val('');
    $('#ApellidoCliente').val('');
    $('#DirInstalacion').val('');
    $('#DirCorrespondencia').val('');
    $('#Telefono1').val('');
    $('#Telefono2').val('');
    $('#Telefono3').val('');
    $('#Celular1').val('');
    $('#Celular2').val('');
    $('#Correo').val('');
    $('#Estrato').val('');
    $('#Productos').val('');
    $('#Nodo').val('');
    $('#NombreComunidad').val('');
    $('#Division').val('');
    $('#TipoCliente').val('');
    $('#Descripcion').val('');

}
function TraerArbolDeSoporteServiciosPrincipales() {
    var IdPadre = "4";
    $("#FallaServPrincipalesSoporte").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#FallaServPrincipalesSoporte').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("FallaServPrincipalesSoporte");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("FallaServPrincipalesSoporte1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#FallaServPrincipalesSoporte').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeSoporteServiciosAdicionales() {
    var IdPadre = "5";
    $("#FallaServAdicionalesSoporte").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#FallaServAdicionalesSoporte').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("FallaServAdicionalesSoporte");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("FallaServAdicionalesSoporte1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#FallaServAdicionalesSoporte').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeSoporteTipoFalla() {
    var IdPadre = "6";
    $("#TipoFallaSoporte").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoFallaSoporte').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("TipoFallaSoporte");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("TipoFallaSoporte1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#TipoFallaSoporte').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeSoporteSolucionEspecifica() {
    var IdPadre = "7";
    $("#SolucionEspecificaSoporte").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#SolucionEspecificaSoporte').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("SolucionEspecificaSoporte");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("SolucionEspecificaSoporte1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#SolucionEspecificaSoporte').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}

function TraerArbolDeFacturacionProblemaFacturacion() {
    var IdPadre = "25";
    $("#ProblemaFacturacion").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#ProblemaFacturacion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("ProblemaFacturacion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("ProblemaFacturacion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#ProblemaFacturacion').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}

function TraerArbolDeFacturacionSolucionFacturacion() {
    var IdPadre = "26";
    $("#SolucionFacturacion").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#SolucionFacturacion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("SolucionFacturacion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("SolucionFacturacion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#SolucionFacturacion').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeCancelacionIntencion() {
    var IdPadre = "29";
    $("#ClienteIntencionCancelacion").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#ClienteIntencionCancelacion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("ClienteIntencionCancelacion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("ClienteIntencionCancelacion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#ClienteIntencionCancelacion').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeCancelacionMotivo() {
    var IdPadre = "30";
    $("#MotivoCancelacion").append("<option value=''>--SELECCIONE--</option>");
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#MotivoCancelacion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("MotivoCancelacion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("MotivoCancelacion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#MotivoCancelacion').val(select.options[i].value);
                    TraerArbolDeCancelacionRazon();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeCancelacionRazon() {
    if ($('#MotivoCancelacion').val() != "") {
        var MotivoCancelacionR = document.getElementById("MotivoCancelacion");
        var MotivoCancelacionRText = MotivoCancelacionR.options[MotivoCancelacionR.selectedIndex].text;
        $('#MotivoCancelacion1').val(MotivoCancelacionRText);

        var IdPadre = $('#MotivoCancelacion').val();
        $("#RazonCancelacion").append("<option value=''>--SELECCIONE--</option>");
        $.ajax({
            type: "POST",
            url: UrlArbolDeGestion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#RazonCancelacion').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("RazonCancelacion");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("RazonCancelacion1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#RazonCancelacion').val(select.options[i].value);
                        //ListaSubrazones();
                    }
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
    else
    {
        $('#MotivoCancelacion1').val('');
        $('#RazonCancelacion1').val('');
    }

}
function TraerArbolTipificacionGestion() {

    $("#Gestion").append("<option value=''>--SELECCIONE--</option>");
    var IdPadre = "8";
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Gestion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("Gestion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("Gestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#Gestion').val(select.options[i].value);
                    TraerArbolTipificacionCierre();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolTipificacionCierre() {

    
    if ($('#Gestion').val() != "") {
        var GestionR = document.getElementById("Gestion");
        var GestionRText = GestionR.options[GestionR.selectedIndex].text;
        $('#Gestion1').val(GestionRText);

        var IdPadre = $('#Gestion').val();
        $('#Cierre').empty();
        $("#Cierre").append("<option value=''>--SELECCIONE--</option>");
        $.ajax({
            type: "POST",
            url: UrlArbolDeGestion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Cierre').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Cierre");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Cierre1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#Cierre').val(select.options[i].value);
                        TraerArbolTipificacionRazon();
                    }
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
    else {
        $('#Gestion1').val('');
        $('#Cierre1').val('');
        $('#Razon1').val('');
        $('#Motivo1').val('');
        
    }

}
function TraerArbolTipificacionRazon() {
    if ($('#Cierre').val() != "") {
        var CierreR = document.getElementById("Cierre");
        var CierreRText = CierreR.options[CierreR.selectedIndex].text;
        $('#Cierre1').val(CierreRText);

        var IdPadre = $('#Cierre').val();
        $('#Razon').empty();
        $("#Razon").append("<option value=''>--SELECCIONE--</option>");
        $.ajax({
            type: "POST",
            url: UrlArbolDeGestion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Razon').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Razon");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Razon1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#Razon').val(select.options[i].value);
                        TraerArbolTipificacionMotivo();
                    }
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
    else {
        $('#Cierre1').val('');
        $('#Razon1').val('');
        $('#Motivo1').val('');

    }
}
function TraerArbolTipificacionMotivo() {

    if ($('#Razon').val() != "") {
        var RazonR = document.getElementById("Razon");
        var RazonRText = RazonR.options[RazonR.selectedIndex].text;
        $('#Razon1').val(RazonRText);

        var IdPadre = $('#Razon').val();
        $('#Motivo').empty();
        $("#Motivo").append("<option value=''>--SELECCIONE--</option>");
        $.ajax({
            type: "POST",
            url: UrlArbolDeGestion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Motivo').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Motivo");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Motivo1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#Motivo').val(select.options[i].value);
                    }
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
    }
    else {
        $('#Razon1').val('');
        $('#Motivo1').val('');

    }
}
function CargaSeguimientosTipificador()
{
    $.ajax({
        type: "POST",
        url: UrlListaSeguimientosTipificador,
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
function ShowGridSeguimientos(data)
{
    if (data != null) {
        cambiarfechas(data);
    }

    $("#GridSeguimientosTipificadorMidas").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "SeguimientosMidas.xlsx",
            allPages: true
        },
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
            { command: { text: " ", click: CargaSeguimiento, imageClass: "k-icon k-i-pencil", }, title: "Editar", width: "90px" },
            { field: "Id", title: "Id", headerAttributes: { style: "white-space: normal" }, width: 80 },
       { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "AliadoGestion", title: "Aliado Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 90 },
       { field: "Gestion", title: "Gestion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Cierre", title: "Cierre", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Razon", title: "Razon", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Motivo", title: "Motivo", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoCaso", title: "Estado Caso", headerAttributes: { style: "white-space: normal" }, width: 120 }
       ]

    });

    function cambiarfechas(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        }

    }
}
function CargaSeguimiento(e)
{
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    $("#CuentaCliente").val(dataItem.CuentaCliente);
    $("#Id").val(dataItem.Id);    
    var Cuenta = $("#CuentaCliente").val();
    DatosClienteCuenta(Cuenta);
    var x = document.getElementById('Li1');
    x.click();
    var y = document.getElementById('HrefdatosBasicos');
    y.click();
}
function CambiaArbolTipificacion()
{
    var EstadoSoporte = $("#EstadoSoporte").val()
    var EstadoFacturacion = $("#EstadoFacturacion").val()

    if (EstadoSoporte == "SEGUIMIENTO" || EstadoFacturacion == "SEGUIMIENTO") {
        EstadoCasoenSeguimiento();
    }
    else
    {
        $("#Gestion").empty();
        $("#Gestion").append("<option value=''>--SELECCIONE--</option>");
        TraerArbolTipificacionGestion();
        $("#Cierre").empty();
        $("#Cierre").append("<option value=''>--SELECCIONE--</option>");
        $("#Razon").empty();
        $("#Razon").append("<option value=''>--SELECCIONE--</option>");
        $("#Motivo").empty();
        $("#Motivo").append("<option value=''>--SELECCIONE--</option>");

        $("#Gestion1").val('');
        $("#Cierre1").val('');
        $("#Razon1").val('');
        $("#Motivo1").val('');
    }
}
function EstadoCasoenSeguimiento()
{
    $("#Gestion").empty();
    $("#Gestion").append("<option value='CONTACTO EFECTIVO'>CONTACTO EFECTIVO</option>");
    $("#Cierre").empty();
    $("#Cierre").append("<option value='SEGUIMIENTO'>SEGUIMIENTO</option>");
    $("#Razon").empty();
    $("#Razon").append("<option value='VOLVER A LLAMAR'>VOLVER A LLAMAR</option>");
    $("#Motivo").empty();
    $("#Motivo").append("<option value='NO APLICA'>NO APLICA</option>");

    $("#Gestion1").val('CONTACTO EFECTIVO');
    $("#Cierre1").val('SEGUIMIENTO');
    $("#Razon1").val('VOLVER A LLAMAR');
    $("#Motivo1").val('NO APLICA');
}
function CargaHistorial()
{
    var Cuenta = $('#CuentaCliente').val();
    $.ajax({
        type: "POST",
        url: UrlListaHistorialCuentasTpificador,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            ShowGridHistorialCuentas(json);
            MuestraUltimoEstado(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function ShowGridHistorialCuentas(data)
{
    if (data != null) {
        cambiarfechas(data);
    }

    $("#HistorialGrid").kendoGrid({
        autoBind: true,
        
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
            { field: "Id", title: "Id", headerAttributes: { style: "white-space: normal" }, width: 80 },
       { field: "FechaGestion", title: "Fecha de Gestión", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "AliadoGestion", title: "Aliado Gestion", headerAttributes: { style: "white-space: normal" }, width: 130 },
       { field: "CuentaCliente", title: "Cuenta Cliente", headerAttributes: { style: "white-space: normal" }, width: 90 },
       { field: "Gestion", title: "Gestion", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Cierre", title: "Cierre", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Razon", title: "Razon", headerAttributes: { style: "white-space: normal" }, width: 100 },
       { field: "Motivo", title: "Motivo", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "FallaServPrincipalesSoporte", title: "Falla Servicios Principales Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "FallaServAdicionalesSoporte", title: "Falla Servicios Adicionales Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "TipoFallaSoporte", title: "Tipo Falla Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "SolucionEspecificaSoporte", title: "Solucion Especifica Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoSoporte", title: "Estado Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ObservacionesSoporte", title: "Observaciones Soporte", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ProblemaFacturacion", title: "Problema Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "SolucionFacturacion", title: "Solucion Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoFacturacion", title: "Estado Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ObservacionesFacturacion", title: "Observaciones Facturacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ClienteIntencionCancelacion", title: "Cliente Intencion Cancelacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "RazonCancelacion", title: "Razon Cancelacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "ObservacionesCancelacion", title: "Observaciones Cancelacion", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "Ofrecimiento1", title: "Ofrecimiento 1", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "AceptacionOfrecimiento1", title: "Aceptacion Ofrecimiento 1", headerAttributes: { style: "white-space: normal" }, width: 120 },
       { field: "EstadoCaso", title: "Estado Caso", headerAttributes: { style: "white-space: normal" }, width: 120 }
        ]

    });

    function cambiarfechas(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        }

    }
}
function FallaServPrincipalesSoporteReemplazo()
{
    if ($('#FallaServPrincipalesSoporte').val() != "") {
        var FallaServPrincipalesSoporteR = document.getElementById("FallaServPrincipalesSoporte");
        var FallaServPrincipalesSoporteRText = FallaServPrincipalesSoporteR.options[FallaServPrincipalesSoporteR.selectedIndex].text;
        $('#FallaServPrincipalesSoporte1').val(FallaServPrincipalesSoporteRText);
    }
    else {
        $('#FallaServPrincipalesSoporte1').val('');
    }
}
function FallaServAdicionalesSoporteReemplazo() {
    if ($('#FallaServAdicionalesSoporte').val() != "") {
        var FallaServAdicionalesSoporteR = document.getElementById("FallaServAdicionalesSoporte");
        var FallaServAdicionalesSoporteRText = FallaServAdicionalesSoporteR.options[FallaServAdicionalesSoporteR.selectedIndex].text;
        $('#FallaServAdicionalesSoporte1').val(FallaServAdicionalesSoporteRText);
    }
    else {
        $('#FallaServAdicionalesSoporte1').val('');
    }
}
function TipoFallaSoporteReemplazo()
{
    if ($('#TipoFallaSoporte').val() != "") {
        var TipoFallaSoporteR = document.getElementById("TipoFallaSoporte");
        var TipoFallaSoporteRText = TipoFallaSoporteR.options[TipoFallaSoporteR.selectedIndex].text;
        $('#TipoFallaSoporte1').val(TipoFallaSoporteRText);
    }
    else {
        $('#TipoFallaSoporte1').val('');
    }
}
function SolucionEspecificaSoporteReemplazo() {
    if ($('#SolucionEspecificaSoporte').val() != "") {
        var SolucionEspecificaSoporteR = document.getElementById("SolucionEspecificaSoporte");
        var SolucionEspecificaSoporteRText = SolucionEspecificaSoporteR.options[SolucionEspecificaSoporteR.selectedIndex].text;
        $('#SolucionEspecificaSoporte1').val(SolucionEspecificaSoporteRText);
    }
    else {
        $('#SolucionEspecificaSoporte1').val('');
    }
}
function ProblemaFacturacionReemplazo() {
    if ($('#ProblemaFacturacion').val() != "") {
        var ProblemaFacturacionR = document.getElementById("ProblemaFacturacion");
        var ProblemaFacturacionRText = ProblemaFacturacionR.options[ProblemaFacturacionR.selectedIndex].text;
        $('#ProblemaFacturacion1').val(ProblemaFacturacionRText);
    }
    else {
        $('#ProblemaFacturacion1').val('');
    }
}
function SolucionFacturacionReemplazo() {
    if ($('#SolucionFacturacion').val() != "") {
        var SolucionFacturacionR = document.getElementById("SolucionFacturacion");
        var SolucionFacturacionRText = SolucionFacturacionR.options[SolucionFacturacionR.selectedIndex].text;
        $('#SolucionFacturacion1').val(SolucionFacturacionRText);
    }
    else {
        $('#SolucionFacturacion1').val('');
    }
}
function ClienteIntencionCancelacionReemplazo() {
    if ($('#ClienteIntencionCancelacion').val() != "") {
        var ClienteIntencionCancelacionR = document.getElementById("ClienteIntencionCancelacion");
        var ClienteIntencionCancelacionRText = ClienteIntencionCancelacionR.options[ClienteIntencionCancelacionR.selectedIndex].text;
        $('#ClienteIntencionCancelacion1').val(ClienteIntencionCancelacionRText);
    }
    else {
        $('#ClienteIntencionCancelacion1').val('');
    }
}
function RazonCancelacionReemplazo() {
    if ($('#RazonCancelacion').val() != "") {
        var RazonCancelacionR = document.getElementById("RazonCancelacion");
        var RazonCancelacionRText = RazonCancelacionR.options[RazonCancelacionR.selectedIndex].text;
        $('#RazonCancelacion1').val(RazonCancelacionRText);
    }
    else {
        $('#RazonCancelacion1').val('');
    }
}
function MotivoReemplazo() {
    if ($('#Motivo').val() != "") {
        var MotivoR = document.getElementById("Motivo");
        var MotivoRText = MotivoR.options[MotivoR.selectedIndex].text;
        $('#Motivo1').val(MotivoRText);
    }
    else {
        $('#Motivo1').val('');
    }
}
function AceptacionOfrecimiento1Reemplazo() {
    if ($('#AceptacionOfrecimiento1').val() != "") {
        var AceptacionOfrecimiento1R = document.getElementById("AceptacionOfrecimiento1");
        var AceptacionOfrecimiento1RText = AceptacionOfrecimiento1R.options[AceptacionOfrecimiento1R.selectedIndex].text;
        $('#AceptacionOfrecimiento11').val(AceptacionOfrecimiento1RText);
    }
    else
    {
        $('#AceptacionOfrecimiento11').val('');
    }
}

function MuestraUltimoEstado(data)
{
    if (data != null)
    {
        var UltimaInteraccionCaso = data.pop();
        if (UltimaInteraccionCaso.EstadoCaso == "FINALIZADO") {
            $("#EstadoCasoGeneral").empty();
            $("#EstadoCasoGeneral").append("Finalizado");
        }
        else {
            $("#EstadoCasoGeneral").empty();
            $("#EstadoCasoGeneral").append("Seguimiento");
        }
    }
    else
    {
        $("#EstadoCasoGeneral").empty();
        alert();
    }
}



