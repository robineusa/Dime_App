$(document).ready(function () {
    var IdArbol = 1;
    var IdPadre = 0;
    ConstruirArbol(IdArbol);

    $('#Body_Layout').on('click', function () { ocultar(); });

});

function ConstruirArbol(idArbol) {
    $.ajax({
        type: "POST",
        url: urlLLamarArbolId,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IDdArbol: idArbol }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(result);
            $('#InsertaArbol').append('<label id="Nombre" onmousedown="return evnt(this)" style="; font-weight:bold;"><i class="fa fa-folder"></i>' +
                        '&nbsp' + json.NombreArbol + '</label>' +
                  '<br/><ul id="ulPrincipal">' +
                            json.CodigoHtml +
                        '</ul>');
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function evnt(e) {
    if (event.button == 2) {
        window.event.cancelBubble = true;
        var x = event.clientX;
        var y = event.clientY;
        document.getElementById("Menu").style.position = "absolute";
        document.getElementById("Menu").style.display = "block";
        document.getElementById("Menu").style.marginLeft = x - 270 + "px";
        document.getElementById("Menu").style.marginTop = y - 240 + "px";
        event.preventDefault();
        $(document.getElementById(e.id)).bind("contextmenu", function (e) {
            return false;
        });
        IdPadre = e.id;
    }

}

function crear() {
    var NomNodo = $('#Nombre_Nodo').val();

    //ajax

    var html = $("#ulPrincipal").html();
    //alert(html);
    if (IdPadre == 'Nombre') {
        var objeto = document.getElementById('ulPrincipal');

        $(objeto).append('<ul id="0">' +
                '<li id="5" onmousedown=" return evnt(this)">' +
                    '<i class="fa fa-folder"></i>&nbsp' + NomNodo + '' +
                '</li>' +
            '</ul>');
        $('#CerrarModal').click();
        $(".modal-backdrop  in").removeClass();
        $(".modal-backdrop  in").remove();
        $('#Nombre_Nodo').val('');
    }
    else {
        var objeto = document.getElementById(IdPadre);
        alert(objeto.nodeName+', '+objeto.id);
        if (objeto.firstElementChild != "UL") {
            $(objeto).append('<ul>' +
                    '<li id="7" onmousedown=" return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + NomNodo + '' +
                    '</li>' +
                '</ul>');
            $('#CerrarModal').click();
            $(".modal-backdrop in").remove();
            $(".modal-backdrop in").remove();
            $('#Nombre_Nodo').val('');

        }
        else {
            $(objeto).append('<li id="8" onmousedown=" return evnt(this)">' +
                                '<i class="fa fa-folder"></i>&nbsp' + NomNodo + '' +
                    '</li>'
                    );
            $('#CerrarModal').click();
            $(".modal-backdrop  in").remove();
            $(".modal-backdrop  in").remove();
            $('#Nombre_Nodo').val('');
        }
    }




    //var obj = document.getElementById("ulPrincipal");

    //var li = document.createElement("li");
    //var txt = document.createTextNode("Primer Nodo Exitoso");
    //li.appendChild(txt);
    //li.setAttribute("id", "li" + contador);
    //li.setAttribute("onclick", "evnt(this)");
    //obj.appendChild(li);

    IdPadre = null;
}

function ocultar() {
    document.getElementById("Menu").style.display = "none";

}

function poner() {
    document.getElementById("Menu").style.display = "block";

}

function seleccionado() {
    document.getElementById("Menu").style.display = "block";
}