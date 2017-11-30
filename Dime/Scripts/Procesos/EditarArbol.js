$(document).ready(function () {
    var IdArbol = 1;
    var IdPadre = 0;

    ConstruirArbol(IdArbol);

    //$('#Body_Layout').on('click', function () { });



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
            $('#InsertaArbol').append('<div id="NombreArbol" idArb="' + json.Id + '" onclick="return evnt(this)" style="font-weight:bold;"><i class="fa fa-folder"></i>' +
                        '&nbsp' + json.NombreArbol + ' '+
                        '<a href="#CrearNodo" data-toggle="modal" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus-square-o"></i></a></div>' +
                  '<ul id="ulPrincipal">' +
                            json.CodigoHtml +
                        '</ul>');
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}



function evnt(e) {
    if (event.button == 0) {
        if (e.id != "NombreArbol") { window.event.cancelBubble = true; }
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
            AgregaNodo(json, IdPadre, IdArbol);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function AgregaNodo(Data, IdPadre, idarbol)
{
    if (IdPadre == 'NombreArbol') {

        var objeto = document.getElementById('ulPrincipal');
        if (objeto.firstElementChild == null) {
            $(objeto).append('<ul id="0">' +
                    '<li id="' + Data.Id + '" onmouseup="return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo +
                        '<a href="#CrearNodo" data-toggle="modal" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus-square-o"></i></a>' +
                    '</li>' +
                '</ul>');
        }


        else {
            $('#0').append('' +
                    '<li id="' + Data.Id + '" onmouseup=" return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo +
                        '<a href="#CrearNodo" data-toggle="modal" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus-square-o"></i></a>' +
                    '</li>' +
                '');
        }
        var x = document.getElementById('CerrarModal');
        x.click();
        $('#Nombre_Nodo').val('');
    }
    else {
        var objeto = document.getElementById(IdPadre);
        alert(objeto.childNodes.length);
        if (objeto.childNodes.length < 4) {
            $(objeto).append('<ul id="' + objeto.id + '">' +
                    '<li id="' + Data.Id + '" onmouseup=" return evnt(this)">' +
                        '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo +
                        '<a href="#CrearNodo" data-toggle="modal" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus-square-o"></i></a>' +
                    '</li>' +
                '</ul>');
            $('#CerrarModal').click();
            var x = document.getElementById('CerrarModal');
            x.click();
            $('#Nombre_Nodo').val('');

        }
        else {
            $('#' + objeto.id + ' ul').append('<li id="' + Data.Id + '" onmouseup=" return evnt(this)">' +
                                '<i class="fa fa-folder"></i>&nbsp' + Data.NombreNodo +
                                '<a href="#CrearNodo" data-toggle="modal" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus-square-o"></i></a>' +
                    '</li>'
                    );
            var x = document.getElementById('CerrarModal');
            x.click();
            $('#Nombre_Nodo').val('');
        }
    }
    var html = $("#ulPrincipal").html();
    $.ajax({
        type: "POST",
        url: urlActualizaHTMLArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CodigoHTML: html, IDdArbol: idarbol }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
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

