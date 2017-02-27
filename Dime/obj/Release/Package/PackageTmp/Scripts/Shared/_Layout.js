/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */

$(function Buen_Servicio() {

    var connect = $.connection.myHub;

    Llama_Metodos(connect);
    $('#Mensaje').focus();
    $.connection.hub.start().done(function () {
        Registra_Eventos(connect, UserConnect);
    });
});

function Registra_Eventos(connect) {
    $('#EnviarMSGlobalBS').click(function () {
        var msg = $("#MensajeBS").val();
        if (msg.length > 0) {
            connect.server.sendMessagePublic('Andres2', $("#MensajeBS").val());
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
        var dd = f.getDay();
        var mm = f.getMonth() + 1;
        var yy = f.getFullYear();
        var hh = f.getHours();
        var m = f.getMinutes();
        var V_Fecha = dd + '/' + mm + '/' + yy + '&nbsp;&nbsp;' + hh + ':' + m;

        $("#Administrador").append('<div class="direct-chat-msg">' +
                                        '<div id="UserGlobal" class="direct-chat-info clearfix">' +
                                            '<span class="direct-chat-name pull-left">' + V_Usuario + '</span>' +
                                            '<span class="direct-chat-timestamp pull-right">&nbsp;&nbsp;' + V_Fecha + '</span>' +
                                        '</div>' +
                                        '<img class="direct-chat-img" src="/AdminLTE/dist/img/user.svg" alt="Message User Image">' +
                                        '<div id="MensajeGlobalR" class="direct-chat-text" style="text-align: justify;">'
                                            + V_Message +
                                        '</div>' +
                                    '</div>');
        $("#AdministradorBS").append('<div class="direct-chat-msg">' +
                                        '<div id="UserGlobal" class="direct-chat-info clearfix">' +
                                            '<span class="direct-chat-name pull-left">' + V_Usuario + '</span>' +
                                            '<span class="direct-chat-timestamp pull-right">&nbsp;&nbsp;' + V_Fecha + '</span>' +
                                        '</div>' +
                                        '<img class="direct-chat-img" src="/AdminLTE/dist/img/user.svg" alt="Message User Image">' +
                                        '<div id="MensajeGlobalR" class="direct-chat-text" style="text-align: justify;">'
                                            + V_Message +
                                        '</div>' +
                                    '</div>');
        if (V_Usuario != UserConnect) {
            $("#ChatGeneral2").css('display', 'block');
            $("#ChatGeneral").css('display', 'block');
        }

    }

    connect.client.broadcastMessage = function (Nombre_Imagen, Ruta_Imagen, Id_Notificado, Descripcion_Imagen) {
        var x = document.getElementById('BuenServicioHREF');
        x.click();
        $('#imgBS').attr("src", '/ImagesClient/' + Nombre_Imagen);
        $('#LinkBS').attr("href", Ruta_Imagen);
        $('#Nombre_Imagen').val(Nombre_Imagen);
        $('#Ruta_Imagen').val(Ruta_Imagen);
        $('#Id_Notificado').val(Id_Notificado);
        $('#Descripcion_Imagen').val(Descripcion_Imagen);
        $('#Buen_Servicio').css('display', 'inline-block');
        
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
    var div = '<div id="Drag"><div id='+ctrId+' class="box box-primary direct-chat direct-chat-primary">'+
                    '<div class="box-header with-border">'+
                        '<h3 id="NombreUsuario" class="box-title">'+userName+'</h3>'+
                        '<div class="box-tools pull-right">'+
                                    
                            '<button type="button" class="btn btn-box-tool" data-widget="collapse">'+
                                '<i class="fa fa-minus"></i>'+
                            '</button>'+
                            '<button type="button" class="btn btn-box-tool" data-toggle="tooltip" title="" data-widget="chat-pane-toggle" data-original-title="Contacts">'+
                                '<i class="fa fa-comments"></i>'+
                            '</button>'+
                            '<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>'+
                        '</div>'+
                    '</div>'+
                    '<div class="box-body" style="display: block;">'+
                        '<div class="direct-chat-messages">'+
                            '<div id="ChatPriv1" class="direct-chat-msg">'+
                                


                            '</div>'+
                            '<div id="ChatPriv2" class="direct-chat-msg right">' +
                                
                            '</div>'+
                        '</div>'+
                        '<div class="box-footer" style="display: block;">'+
                                '<div class="input-group">'+
                                    '<input id="txtPrivMess" name="message" placeholder="Escribe un mensaje ..." class="form-control" type="text">'+
                                    '<span class="input-group-btn">'+
                                        '<button id="SendPrivate" type="button" class="btn btn-primary btn-flat">Enviar</button>'+
                                    '</span>'+
                                '</div>'+
                        '</div>'+
                        '</div></div>';

    var $div = $(div);

    //// DELETE BUTTON IMAGE
    //$div.find('#imgDelete').click(function () {
    //    $('#' + ctrId).remove();
    //});

    var idFrom =$('#hdId').val();

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

function LlamarCalculosCampanas() {

    $.ajax({
        type: "GET",
        url: urlCampanasView,
        dataType: "html",
        success: function (result) {
            $('#campanasBody').html(result);
        }
    })
}


function LlamarCalculosCompensacion() {

    $.ajax({
        type: "GET",
        url: urlCompensacionView,
        dataType: "html",
        success: function (result) {
            $('#compensacionBody').html(result);
        }
    })
}


function LlamarCalculosDiferenciaTarifas() {

    $.ajax({
        type: "GET",
        url: urlDiferenciaTarifasView,
        dataType: "html",
        success: function (result) {
            $('#diferenciaTarifasBody').html(result);
        }
    })
}


function LlamarCalculosProrrateos() {

    $.ajax({
        type: "GET",
        url: urlProrrateosView,
        dataType: "html",
        success: function (result) {
            $('#prorrateosBody').html(result);
        }
    })
}



function ResetearDivs() {

    var vacio = $("<div></div>");
    $('#diferenciaTarifasBody').html(vacio);
    $('#compensacionBody').html(vacio);
    $('#campanasBody').html(vacio);
    $('#prorrateosBody').html(vacio);
}

(function ($, AdminLTE) {




    "use strict";
    /**
     * List of all the available skins
     *
     * @type Array
     */
    var my_skins = [
      "skin-blue",
      "skin-black",
      "skin-red",
      "skin-yellow",
      "skin-purple",
      "skin-green",
      "skin-blue-light",
      "skin-black-light",
      "skin-red-light",
      "skin-yellow-light",
      "skin-purple-light",
      "skin-green-light"
    ];

    //Create the new tab
    var tab_pane = $("<div />", {
        "id": "control-sidebar-theme-demo-options-tab",
        "class": "tab-pane"
    });

    //Create the tab button
    var tab_button = $("<li />")
        .html("<a href='#control-sidebar-theme-demo-options-tab' data-toggle='tab'>"
        + "<i class='fa fa-wrench'></i>"
        + "</a>");


    //Add the tab button to the right sidebar tabs
    $("[href='#control-sidebar-home-tab']")
        .parent()
        .after(tab_button);

    //Create the menu
    var demo_settings = $("<div />");

    //Layout options
    //demo_settings.append(
    //    "<h4 class='control-sidebar-heading'>"
    //    + "Layout Options"
    //    + "</h4>"
    //      //Fixed layout
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-layout='fixed' class='pull-right'/> "
    //    + "Fixed layout"
    //    + "</label>"
    //    + "<p>Activate the fixed layout. You can't use fixed and boxed layouts together</p>"
    //    + "</div>"
    //      //Boxed layout
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
    //    + "Boxed Layout"
    //    + "</label>"
    //    + "<p>Activate the boxed layout</p>"
    //    + "</div>"
    //      //Sidebar Toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
    //    + "Toggle Sidebar"
    //    + "</label>"
    //    + "<p>Toggle the left sidebar's state (open or collapse)</p>"
    //    + "</div>"
    //      //Sidebar mini expand on hover toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
    //    + "Sidebar Expand on Hover"
    //    + "</label>"
    //    + "<p>Let the sidebar mini expand on hover</p>"
    //    + "</div>"
    //      //Control Sidebar Toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
    //    + "Toggle Right Sidebar Slide"
    //    + "</label>"
    //    + "<p>Toggle between slide over content and push content effects</p>"
    //    + "</div>"
    //      //Control Sidebar Skin Toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
    //    + "Toggle Right Sidebar Skin"
    //    + "</label>"
    //    + "<p>Toggle between dark and light skins for the right sidebar</p>"
    //    + "</div>"
    //);
    var skins_list = $("<ul />", { "class": 'list-unstyled clearfix' });

    //Dark sidebar skins
    var skin_blue =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Azul</p>");
    skins_list.append(skin_blue);
    var skin_black =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Negro</p>");
    skins_list.append(skin_black);
    var skin_purple =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Purpura</p>");
    skins_list.append(skin_purple);
    var skin_green =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Verde</p>");
    skins_list.append(skin_green);
    var skin_red =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Rojo</p>");
    skins_list.append(skin_red);
    var skin_yellow =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Amarillo</p>");
    skins_list.append(skin_yellow);

    //Light sidebar skins
    var skin_blue_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Azul Claro</p>");
    skins_list.append(skin_blue_light);
    var skin_black_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Negro Claro</p>");
    skins_list.append(skin_black_light);
    var skin_purple_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Purpura Claro</p>");
    skins_list.append(skin_purple_light);
    var skin_green_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Verde Claro</p>");
    skins_list.append(skin_green_light);
    var skin_red_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Rojo Claro</p>");
    skins_list.append(skin_red_light);
    var skin_yellow_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px;'>Amarillo Claro</p>");
    skins_list.append(skin_yellow_light);

    demo_settings.append("<h4 class='control-sidebar-heading'>Temas</h4>");
    demo_settings.append(skins_list);

    tab_pane.append(demo_settings);
    $("#control-sidebar-stats-tab").after(tab_pane);

    setup();

    /**
     * Toggles layout classes
     *
     * @param String cls the layout class to toggle
     * @returns void
     */
    function change_layout(cls) {
        $("body").toggleClass(cls);
        AdminLTE.layout.fixSidebar();
        //Fix the problem with right sidebar and layout boxed
        if (cls == "layout-boxed")
            AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        if ($('body').hasClass('fixed') && cls == 'fixed') {
            AdminLTE.pushMenu.expandOnHover();
            AdminLTE.layout.activate();
        }
        AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        AdminLTE.controlSidebar._fix($(".control-sidebar"));
    }

    /**
     * Replaces the old skin with the new skin
     * @param String cls the new skin class
     * @returns Boolean false to prevent link's default action
     */
    function change_skin(cls) {
        $.each(my_skins, function (i) {
            $("body").removeClass(my_skins[i]);
        });

        $("body").addClass(cls);
        store('skin', cls);
        return false;
    }

    /**
     * Store a new settings in the browser
     *
     * @param String name Name of the setting
     * @param String val Value of the setting
     * @returns void
     */
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Get a prestored setting
     *
     * @param String name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Retrieve default settings and apply them to the template
     *
     * @returns void
     */
    function setup() {
        var tmp = get('skin');
        if (tmp && $.inArray(tmp, my_skins))
            change_skin(tmp);

        //Add the change skin listener
        $("[data-skin]").on('click', function (e) {
            e.preventDefault();
            change_skin($(this).data('skin'));
        });

        //Add the layout manager
        $("[data-layout]").on('click', function () {
            change_layout($(this).data('layout'));
        });

        $("[data-controlsidebar]").on('click', function () {
            change_layout($(this).data('controlsidebar'));
            var slide = !AdminLTE.options.controlSidebarOptions.slide;
            AdminLTE.options.controlSidebarOptions.slide = slide;
            if (!slide)
                $('.control-sidebar').removeClass('control-sidebar-open');
        });

        $("[data-sidebarskin='toggle']").on('click', function () {
            var sidebar = $(".control-sidebar");
            if (sidebar.hasClass("control-sidebar-dark")) {
                sidebar.removeClass("control-sidebar-dark")
                sidebar.addClass("control-sidebar-light")
            } else {
                sidebar.removeClass("control-sidebar-light")
                sidebar.addClass("control-sidebar-dark")
            }
        });

        $("[data-enable='expandOnHover']").on('click', function () {
            $(this).attr('disabled', true);
            AdminLTE.pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
                $("[data-layout='sidebar-collapse']").click();
        });

        // Reset options
        if ($('body').hasClass('fixed')) {
            $("[data-layout='fixed']").attr('checked', 'checked');
        }
        if ($('body').hasClass('layout-boxed')) {
            $("[data-layout='layout-boxed']").attr('checked', 'checked');
        }
        if ($('body').hasClass('sidebar-collapse')) {
            $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
        }

    }
})(jQuery, $.AdminLTE);
