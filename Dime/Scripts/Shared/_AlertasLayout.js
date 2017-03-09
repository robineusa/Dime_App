
$(function Buen_Servicio() {

    var connect = $.connection.myHub;
    
    Llama_Metodos(connect);
    $('#Mensaje').focus();
    $.connection.hub.start().done(function () {
        Registra_Eventos(connect, UserConnect2);
    });
});

function Registra_Eventos(connect) {
    $('#EnviarMSGlobalBS').click(function () {
        
        var msg = $("#MensajeBS").val();
        if (msg.length > 0) {
            connect.server.sendMessagePublic('Buen Servicio', $("#MensajeBS").val());
            $("#MensajeBS").val('');
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
    $("#Revisar_notificaciones").click(function () {
        
    });

    connect.server.connect();
}

function Llama_Metodos(connect, UserConnect) {
    
    connect.client.addMessage = function (userName, message) {
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

        var V_Fecha = dd + '-' + mm + '-' + yy + '&nbsp;&nbsp;' + hh + ':' + m;

        $("#Administrador").append('<div class="direct-chat-msg">' +
                                        '<div id="UserGlobal" class="direct-chat-info clearfix">' +
                                            '<span class="direct-chat-name pull-left">' + V_Usuario + '</span>' +
                                            '<span class="direct-chat-timestamp pull-right">&nbsp;&nbsp;' + V_Fecha + '</span>' +
                                        '</div>' +
                                        '<img class="direct-chat-img" src="../AdminLTE/dist/img/user.svg" alt="Message User Image">' +
                                        '<div id="MensajeGlobalR" class="direct-chat-text" style="text-align: justify;">'
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
            $('#Buen_Servicio').css('display', 'inline-block');
        }
        //play_single_sound();
    }

    connect.client.onConnected = function (id, userName, allUsers, messages) {
        
        // Add Existing Messages
        for (i = 0; i < messages.length; i++) {
            AddMessage(messages[i].UserName, messages[i].Message);
        }
    }
    
}

function AddMessage(userName, message) {
    $('#messages-menu').append('<div class="message"><span class="userName">' + userName + '</span>: ' + message + '</div>');

    var height = $('#divChatWindow')[0].scrollHeight;
    $('#divChatWindow').scrollTop(height);
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
        url: '/BuenServicio/Guardar_Usuario_Notificado',
        success: function (result) {
            //$('#CerrarBS').click();

        }
    });
}

