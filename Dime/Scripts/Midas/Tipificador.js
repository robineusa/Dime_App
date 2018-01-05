$(document).ready(function () {
    $("#Li1").click(function () {
        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
    });
    $("#Li2").click(function () {
        $("#Li1").css('background-color', 'transparent');
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
    });
    LimpiarCampos();

    TraerArbolTipificacionGestion();

    TraerArbolDeSoporteServiciosPrincipales();
    TraerArbolDeSoporteServiciosAdicionales();
    TraerArbolDeSoporteTipoFalla();
    TraerArbolDeSoporteSolucionEspecifica();
    TraerArbolDeFacturacionProblemaFacturacion();
    TraerArbolDeFacturacionSolucionFacturacion();
    TraerArbolDeCancelacionIntencion();
    TraerArbolDeCancelacionMotivo();
});

$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    var Cuenta = $("#CuentaCliente").val();
    if (Cuenta == "" || Cuenta == null || Cuenta == "0") {
    } else {
        DatosClienteCuenta(Cuenta);
    }

});

function DatosClienteCuenta(Cuenta) {

    $.ajax({
        type: "POST",
        url: UrlInformacionClienteTipificadorMidas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(result);
            if (json.CuentaCliente != 0) {
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
                            action: function () { LimpiarCampos(); }
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
                        action: function () { LimpiarCampos(); }
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
                            action: function () { LimpiarCampos(); }
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
                        action: function () { LimpiarCampos(); }
                    },
                }
            });
    }
    });
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
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
            var buscar = document.getElementById("SelectGestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#MotivoCancelacion').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolDeCancelacionRazon() {
    var IdPadre = $('#MotivoCancelacion').val();
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
            var buscar = document.getElementById("SelectGestion1").value;
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
function TraerArbolTipificacionGestion() {
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
            var buscar = document.getElementById("SelectGestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#Gestion').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolTipificacionCierre() {
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
            var buscar = document.getElementById("SelectGestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#Cierre').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolTipificacionRazon() {
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
            var buscar = document.getElementById("SelectGestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#Razon').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function TraerArbolTipificacionMotivo() {
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
            var buscar = document.getElementById("SelectGestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#Motivo').val(select.options[i].value);
                    //ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
