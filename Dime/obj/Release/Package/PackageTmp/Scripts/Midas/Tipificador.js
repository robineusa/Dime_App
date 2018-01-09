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
