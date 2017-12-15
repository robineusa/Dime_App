var MensajesaGuardar = [];
var OfertasComerciales = [];

$(function Buen_Servicio() {
    var connect = $.connection.myHub;
    
    Llama_Metodos(connect);
    
    $.connection.hub.start().done(function () {
        Registra_Eventos(connect);
    });
});

function Registra_Eventos(connect) {
    $('#EnviarMSGlobalBS').click(function () {
        
        var msg = $("#MensajeBS").val();
        
        if (msg.length > 0) {

            var f = new Date();
            var dd = f.getDate();
            var mm = f.getMonth() + 1;
            var yy = f.getFullYear();
            var hh = f.getHours();
            var m = f.getMinutes();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            if (m < 10) {
                m = '0' + m
            }
            var Fecha = dd + '-' + mm + '-' + yy + ' ' + hh + ':' + m;
            
            connect.server.sendMessagePublic(UserConnect, $("#MensajeBS").val(), Fecha.toString());
            $("#MensajeBS").val('');
            connect.server.connect(UserConnect2);
            
        }
    });
    $('#NotificarBS').click(function () {
        connect.server.notificacion(NameImage, LinkDir, Id, Description);
    });
    $("#MensajeBS").keypress(function (e) {
        if (e.which == 13) {
            $("#EnviarMSGlobalBS").click();
        }
    });
    $('#messages_menu').click(function () {
        if (MensajesaGuardar.length > 0) {
            for (i = 0; i < MensajesaGuardar.length; i++) {
                connect.server.addMessageinCache2(MensajesaGuardar[i].Id, UserConnect2);
            }
        }
        connect.server.connect(UserConnect2);
        MensajesaGuardar = null;
        $('#MensajeCount').empty();
    });
    $('#BListNotify').click(function () {
        connect.server.usurioNotify($("#IdMsj").val(), UserConnect2);
        //connect.server.connect(UserConnect2);
        $("#IdMsj").val('');
    });
    $('#NotificaOfertas').click(function () {
        var Estado = $('#EstadoImagen').val();
        if (Estado == "ACTIVA")
        {
            var Contenido = $('#Link').val();
            connect.server.notificacionComercial("Notificacion Oferta Comercial", Contenido, Usuario);
        }
    });
    $('#NotificaOfertaComercialCliente').click(function () {
        connect.server.consultaNotificacion(Usuario);
    });
    $('#images_menu').click(function () {
        
        if ($("#IdOfertaComercial").val() != "")
        {
            connect.server.guardaNotificadoOfertaComercial($("#IdOfertaComercial").val(), Usuario);
        }
    });
    
    
    connect.server.consultaNotificacion(Usuario);
    connect.server.connect(UserConnect2);
}

function Llama_Metodos(connect, UserConnect) {
    
    connect.client.addMessage = function (id, userName, message) {
        var V_Usuario = $('<div/>').text(userName).html();
        var V_Message = $('<div/>').text(message).html();
        var f = new Date();
        var dd = f.getDate();
        var mm = f.getMonth() + 1;
        var yy = f.getFullYear();
        var hh = f.getHours();
        var m = f.getMinutes();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        if (m < 10) {
            m = '0' + m
        }

        var V_Fecha = dd + '-' + mm + '-' + yy + '&nbsp;&nbsp;' + hh + ':' + m;

        $("#Administrador").append('<div class="direct-chat-msg">' +
                                        '<div id="UserGlobal" class="direct-chat-info clearfix">' +
                                            '<span class="direct-chat-name pull-left">' + V_Usuario + '</span>' +
                                            '<span class="direct-chat-timestamp pull-right">&nbsp;&nbsp;' + V_Fecha + '</span>' +
                                        '</div>' +
                                        '<img class="direct-chat-img" src="../AdminLTE/dist/img/user.svg" alt="Message User Image">' +
                                        '<div id="MensajeGlobalRU" class="direct-chat-text" style="text-align: justify;">'
                                            + V_Message +
                                        '</div>' +
                                    '</div>');
        
        $("#AdministradorBS").append('<div class="direct-chat-msg right">' +
                                        '<div id="UserGlobal" class="direct-chat-info clearfix">' +
                                            '<span class="direct-chat-name pull-right">' + V_Usuario + '</span>' +
                                            '<span class="direct-chat-timestamp pull-left">&nbsp;&nbsp;' + V_Fecha + '</span>' +
                                        '</div>' +
                                        '<img class="direct-chat-img" src="../AdminLTE/dist/img/user.svg" alt="Message User Image">' +
                                        '<div id="MensajeGlobalR" class="direct-chat-text" style="text-align: justify;">'
                                            + V_Message +
                                        '</div>' +
                                    '</div>');
        if (UserConnect2 != 'Buen Servicio') {
            $("#ChatGeneral").css('display', 'block');
            $("#ChatGeneral2").css('display', 'block');
            $('#IdMsj').val(id);
            setTimeout('EjecutaBTN()', 1);
        } else { /*$("#ChatGeneral2").css('display', 'block');*/ }
        
    }

    connect.client.broadcastMessage = function (Nombre_Imagen, Ruta_Imagen, Id_Notificado, Descripcion_Imagen) {
        if (UserConnect2 != 'Buen Servicio') {
            var x = document.getElementById('BuenServicioHREF');
            x.click();
            $('#imgBS').attr("src", '../ImagesClient/' + Nombre_Imagen);
            $('#LinkBS').attr("href", Ruta_Imagen);
            $('#Nombre_Imagen').val(Nombre_Imagen);
            $('#Ruta_Imagen').val(Ruta_Imagen);
            $('#Id_Notificado').val(Id_Notificado);
            $('#Descripcion_Imagen').val(Descripcion_Imagen);
        }
        //play_single_sound();
    }

    connect.client.onConnected = function (messages) {
        if (messages.length > 0) {
            $('#MensajeCount').empty();
            if (UserConnect2 != 'Buen Servicio') {
                for (i = 0; i < messages.length; i++)
                {
                    MensajesaGuardar.push(messages[i]);
                }
                console.log(MensajesaGuardar);
                $('#MensajeCount').append('' + messages.length + '');
                for (i = 0; i < messages.length; i++) {
                    AddMessage(messages[i].Id, messages[i].UserName, messages[i].Message);
                }

            }
        }
        else { alert('' + messages.length); $('#MensajeCount').empty(); }
    }
    
    connect.client.connectEver = function (messages) {
        //if (UserConnect2 == 'Buen Servicio') {
            
        //}
        if (messages.length > 0) {
                $('#MensajesNoNotificados').empty();
                for (i = messages.length-1; i > messages.length - 4; i--) {
                    AddMessage(messages[i].Id, messages[i].UserName, messages[i].Message);
                }
        }
        else {
            $('#MensajesNoNotificados').empty();
            $('#MensajesNoNotificados').append('<li>' +
                                         '<div>' +
                                             '<h4 style="text-align: center;"> No existen Mensajes</h4>' +
                                         '</div>' +
                                     '</li>');
            //$('#SeeAllmsn').empty();
            
        }
    }

    connect.client.enviaCliente = function () {
        var x = document.getElementById('NotificaOfertaComercialCliente');
        x.click();
    }

    connect.client.notificaUsuarios = function (result) {
        
        if (result.length > 0) {
            $("#images_menu").addClass("images_menu");
            $('#OfertasCount').empty();
            $('#OfertasCount').append('' + result.length + '');
            $('#IdOfertaComercial').val('');
            for (i = 0; i < result.length; i++)
            {
                if ($("#IdOfertaComercial").val() != "")
                {
                    $("#IdOfertaComercial").val($("#IdOfertaComercial").val() + "-" + result[i].Id);
                } else
                {
                    $("#IdOfertaComercial").val(result[i].Id);
                }
                //OfertasComerciales.push(result[i]);
            }
        }
        else
        {
            $('#IdOfertaComercial').val('');
            $('#OfertasCount').empty();
            $('#images_menu').removeClass("images_menu");
        }
    }

    connect.client.FinNotifica = function () {
        $('#IdOfertaComercial').val('');
        $('#OfertasCount').empty();
        $('#images_menu').removeClass("images_menu");
    }
}

function AddMessage(id, userName, message) {
    $('#MensajesNoNotificados').append('<li>'+
                                            '<a href="#" style="cursor:default;">'+
                                                '<div class="pull-left">'+
                                                    '<img src="../AdminLTE/dist/img/user.svg" class="img-circle" alt="User Image">'+
                                                '</div>'
                                                + userName +
                                                '<p>' + message + '</p>' +
                                            '</a>'+
                                        '</li>');

}

function GuardarUsuarioNotificado() {
    var Imagen = $('#Nombre_Imagen').val();
    var Ruta = $('#Ruta_Imagen').val();
    var Id = $('#Id_Notificado').val();
    var Descripcion = $('#Descripcion_Imagen').val();

    var data = { Imagen: Imagen, Ruta: Ruta, Id: Id, Descripcion: Descripcion };
    $.ajax({
        type: "GET",
        data: data,
        contentType: false,
        url: '../BuenServicio/Guardar_Usuario_Notificado',
        success: function (result) {
            //$('#CerrarBS').click();
            

        }
    });
}

function Cierramodal()
{
    var x = document.getElementById('CerrarImagBuenServ');
    x.click();
}

function EjecutaBTN() {
    document.getElementById('BListNotify').click();
}

