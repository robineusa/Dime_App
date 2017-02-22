$(document).ready(function () {
    
    
    RevisarCookie();
    
    trasladarIpsAServidor();

});

$(window).load(function () {

    setTimeout(function () {
        $("body").css("overflow-y", "auto");
        $("#Inicio").fadeOut(2000);
    }, 5000);

    

    setTimeout(function () {
        $("#Login_Box").fadeIn(1000);

    }, 6700);

});


$(function () {
    $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' // optional
    });
});

function RevisarCookie() {  
    var Intento = ObtenerCookie("pIntento");
    if (Intento != "") {
        $("#Login_Box").fadeIn(0);
    } else {
        Intento = "1";
        if (Intento != "" && Intento != null) {
            AsignarCookie("pIntento", Intento, 3);
            Aparece_Logo_Dime();
        }
    }
    //return Intento;
}

function ObtenerCookie(cintento) {
    var NIntento = cintento + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(NIntento) == 0) {
            return c.substring(NIntento.length, c.length);
        }
    }
    return "";
}

function AsignarCookie(cIntento, cvalor, minutos) {
    var d = new Date();
    d.setMinutes(d.getMinutes() + (minutos));
    var expires = "expires=" + d.toTimeString();
    //alert(expires);
    document.cookie = cIntento + "=" + cvalor + ";" + expires + ";path=/";
    //alert(document.cookie);
}


function trasladarIpsAServidor()
{
    
    

        window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
        var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
        pc.createDataChannel("");    //create a bogus data channel
        pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description
        pc.onicecandidate = function (ice) {  //listen for candidate events
            if (!ice || !ice.candidate || !ice.candidate.candidate) return;
            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            console.log('my IP: ', myIP);
            console.log("Your IP is :", userip);
            pc.onicecandidate = noop;

            $.ajax({
                type: "POST",
                url: "/Account/AsignarIpsUsuario",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ ipPrivada: myIP, ipPublica: userip }),
                dataType: "JSON",
                result: function (result) {

                    if(result=== false)
                    {
                        window.location.replace(ajaxRegistrarIps);
                    }
                }
            });
        };
        $.widget.bridge('uibutton', $.ui.button);
}

function Aparece_Logo_Dime() {
    $("body").css("overflow-y", "hidden");
    var alto = $(window).height();
    $("body").append('<div id="Inicio" class="modal in" style="display: block;" >' +
                        '<div class="modal-dialog" style="width:100%;  margin: 0;">' +
                            '<div class="modal-content" style="width:100%;">' +
                                '<div class="Fondo" style="width:100%; background-color:#d2d6de;"> <img id="Logo_imagen" style="width:100%;" src="../Resources/Images/Logo_Dime.gif"/> </div> </div></div></div>');
    $(".modal-dialog").css("height", "100%");
    $(".modal-content").css("height", "100%");
    $(".Fondo").css("height", "100%");
   
}



