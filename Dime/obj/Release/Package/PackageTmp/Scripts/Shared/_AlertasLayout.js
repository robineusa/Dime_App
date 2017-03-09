
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
    $("#Ini_Sesion").click(function () {
        var Cedula = $("#Cedula").val();
        var Nombre = $("#Nombre").val();
        $('#hdId').val(Cedula);
        $('#hdUserName').val(Nombre);
        connect.server.connect(Nombre, Cedula);
    });


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
        //setScreen(true);

        // Add All Users
        for (i = 0; i < allUsers.length; i++) {
            AddUser(connect, allUsers[i].ConnectionId, allUsers[i].UserName);
        }
        // Add Existing Messages
        for (i = 0; i < messages.length; i++) {
            AddMessage(messages[i].UserName, messages[i].Message);
        }
    }

    connect.client.onNewUserConnected = function (id, name) {
        var x = $('#hdId').val();
        if (x != id) {
            AddUser(connect, id, name);
        }

    }

    connect.client.sendPrivateMessage = function (windowId, fromUserName, message, id) {
        var ctrId = 'Pr_' + windowId;
        alert(windowId);

        //if (id != $("#hdId").val()) {
        var x = $('#' + ctrId).length;
        if (x == 0) {
            createPrivateChatWindow(connect, windowId, ctrId, fromUserName);
        }
        $('#' + ctrId).find('#ChatPriv2').append('<div class="direct-chat-info clearfix">' +
                                                    '<span class="direct-chat-name pull-left">' + fromUserName + '</span>' +

                                                '</div>' +
                                                '<img class="direct-chat-img" src="/AdminLTE/dist/img/user.svg" alt="Message User Image"><!-- /.direct-chat-img -->' +
                                                '<div class="direct-chat-text">' + message + '</div>');
        //}

        // set scrollbar
        //var height = $('#' + ctrId).find('#ChatPriv')[0].scrollHeight;
        //$('#' + ctrId).find('#ChatPriv').scrollTop(height);
    }

    connect.client.sendPrivateMessage2 = function (windowId, fromUserName, message, id) {
        var ctrId = 'Pr_' + windowId;
        var x = $('#' + ctrId).length;
        alert(x);
        if (x == 0) {
            createPrivateChatWindow(connect, windowId, ctrId, fromUserName);
        }
        $('#' + ctrId).find('#ChatPriv1').append('<div class="direct-chat-info clearfix">' +
                                                   '<span class="direct-chat-name pull-left">' + fromUserName + '</span>' +
                                                 '</div>' +
                                                 '<img class="direct-chat-img" src="/AdminLTE/dist/img/user.svg" alt="Message User Image"><!-- /.direct-chat-img -->' +
                                                 '<div class="direct-chat-text">' + message + '</div>');

    }
}
function AddUser(connect, id, name) {

    var userId = $('#hdId').val();
    var code = "";
    if (userId == id) {
        code = $('<div class="pull-left image">' +
                    '<img src="/AdminLTE/dist/img/user.svg" class="img-circle" alt="User Image">' +
                 '</div>' +
                 '<div class="pull-left info">' +
                    '<p>' + name + '</p>' +
                    '<a href="#"><i class="fa fa-circle text-success"></i> Online</a>' +
                 '</div>');
        $("#User").append(code);
    }

    else {
        code = $('<li class="ui-widget-content draggable" rel="0">' +
                    '<img src="../../AdminLTE/dist/img/user.svg" alt="User Image">' +
                    '<a id="' + id + '"class="users-list-name" style="cursor: pointer;  ">' + name + '</a>' +
                '</li>');
        $(code).click(function () {

            //var id = $(this).attr('id');
            //if (userId != id)
            OpenPrivateChatWindow(connect, id, name);
        });
        $("#users").append(code);
    }
}

function OpenPrivateChatWindow(connect, id, userName) {
    var ctrId = 'Pr_' + id;
    //if ($('#' + ctrId).length > 0) return;
    createPrivateChatWindow(connect, id, ctrId, userName);
}

function createPrivateChatWindow(connect, userId, ctrId, userName) {
    var div = '<div id="Drag"><div id=' + ctrId + ' class="box box-primary direct-chat direct-chat-primary">' +
                    '<div class="box-header with-border">' +
                        '<h3 id="NombreUsuario" class="box-title">' + userName + '</h3>' +
                        '<div class="box-tools pull-right">' +

                            '<button type="button" class="btn btn-box-tool" data-widget="collapse">' +
                                '<i class="fa fa-minus"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts">' +
                                '<i class="fa fa-comments"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="box-body" style="display: block;">' +
                        '<div class="direct-chat-messages">' +
                            '<div id="ChatPriv1" class="direct-chat-msg">' +



                            '</div>' +
                            '<div id="ChatPriv2" class="direct-chat-msg right">' +

                            '</div>' +
                        '</div>' +
                        '<div class="box-footer" style="display: block;">' +
                                '<div class="input-group">' +
                                    '<input id="txtPrivMess" name="message" placeholder="Escribe un mensaje ..." class="form-control" type="text">' +
                                    '<span class="input-group-btn">' +
                                        '<button id="SendPrivate" type="button" class="btn btn-primary btn-flat">Enviar</button>' +
                                    '</span>' +
                                '</div>' +
                        '</div>' +
                        '</div></div>';

    var $div = $(div);

    //// DELETE BUTTON IMAGE
    //$div.find('#imgDelete').click(function () {
    //    $('#' + ctrId).remove();
    //});

    var idFrom = $('#hdId').val();

    // Send Button event
    $div.find("#SendPrivate").click(function () {

        $textBox = $div.find("#txtPrivMess");
        var msg = $textBox.val();

        if (msg.length > 0) {
            connect.server.sendPrivateMessage(idFrom, userId, msg);
            $textBox.val('');
        }
    });

    //Text Box event
    $div.find("#txtPrivMess").keypress(function (e) {
        if (e.which == 13) {
            $div.find("#SendPrivate").click();
        }
    });

    $('#ChatPrivado').prepend($div);
    $(function () {
        $('#Drag').draggable();
    });

}

//function AddDivToContainer($div) {
//    $('#divContainer').prepend($div);

//    $div.draggable({

//        handle: ".header",
//        stop: function () {

//        }
//    });
//}
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