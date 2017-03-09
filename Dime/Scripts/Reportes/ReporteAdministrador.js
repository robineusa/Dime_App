
$(function Buen_Servicio2() {
    var connect = $.connection.myHub;
    
    Llama_Metodos(connect);
    alert();
    $.connection.hub.start().done(function () {        
        Registra_Eventos(connect);
    });
});

function Registra_Eventos(connect) {
    connect.server.connect();
    alert('11');
}

function Llama_Metodos(connect) {
    connect.client.onConnected = function (messages) {
        alert('sic');
        if (messages.length > 0) {
            $('#number_Mensajes').append('<span class="label label-success">' + messages.length + '</span>');
        }
    }
}
