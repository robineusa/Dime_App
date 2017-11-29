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
            $('#InsertaArbol').append('<label id="NombreArbol" idArb="' + json.Id+ '" onmousedown="return evnt(this)" style="; font-weight:bold;"><i class="fa fa-folder"></i>' +
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
        IdArbol = $("#NombreArbol").attr("idArb");
    }

}

function crear() {
    var NomNodo = $('#Nombre_Nodo').val();
    var Result;
    
    $.ajax({
        type: "POST",
        url: urlRetornaIdNodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IDPadre: IdPadre, IDdArbol: IdArbol, NombreNodo: NomNodo }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            AgregaNodo(json, IdPadre);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    //IdPadre = null;
}

function AgregaNodo(Data, IdPadre)
{
    alert(IdPadre);
    if (IdPadre == 'NombreArbol') {

        var objeto = document.getElementById('ulPrincipal');
        if (objeto.firstElementChild == null) {
            $(objeto).append('<ul id="0">' +
                    '<li id="' + Data.Id + '" onmousedown=" return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo + '' +
                    '</li>' +
                '</ul>');
        }
        else {
            $('#0').append('' +
                    '<li id="' + Data.Id + '" onmousedown=" return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo + '' +
                    '</li>' +
                '');
        }
        var x = document.getElementById('CerrarModal');
        x.click();
        $('#Nombre_Nodo').val('');
    }
    else {
        var objeto = document.getElementById(IdPadre);
        if (objeto.childNodes.length < 3) {
            $(objeto).append('<ul id="' + objeto.id + '">' +
                    '<li id="' + Data.Id + '" onmousedown=" return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo + '' +
                    '</li>' +
                '</ul>');
            $('#CerrarModal').click();
            var x = document.getElementById('CerrarModal');
            x.click();
            $('#Nombre_Nodo').val('');

        }
        else {
            $('#' + objeto.id + ' ul').append('<li id="' + Data.Id + '" onmousedown=" return evnt(this)">' +
                                '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo + '' +
                    '</li>'
                    );
            var x = document.getElementById('CerrarModal');
            x.click();
            $('#Nombre_Nodo').val('');
        }
    }
    var html = $("#ulPrincipal").html();
    alert(html);
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