
$(function Buen_Servicio_Aux() {
    var connect = $.connection.myHub;
    
    Llama_Metodos(connect);
    
    $.connection.hub.start().done(function () {        
        Registra_Eventos2(connect);
    });
});

function Registra_Eventos2(connect) {
    connect.server.connect();
}

function Llama_Metodos(connect) {
    connect.client.onConnected = function (messages) {
        $('#number_Mensajes').append('<span class="label label-success">' + messages.length + '</span>');
    }
}
