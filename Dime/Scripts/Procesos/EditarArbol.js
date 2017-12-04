$(document).ready(function () {
    
    var urlParams = new URLSearchParams(window.location.search);
    var Parametro = urlParams.get('IdArbol');
    var IdArbol = Parametro;
    var IdPadre = 0;
    ConstruirArbol(IdArbol);

    //$('#Body_Layout').on('click', function () { });



});


//function ConstruirArbol(idArbol) {
//    $.ajax({
//        type: "POST",
//        url: urlLLamarArbolId,
//        contentType: "application/json; charset=utf-8",
//        data: JSON.stringify({ IDdArbol: idArbol }),
//        dataType: "JSON",
//        success: function (result) {
//            var json = JSON.parse(result);
//            console.log(result);
//            $('#InsertaArbol').append('<div id="NombreArbol" idArb="' + json.Id + '" onclick="return evnt(this)" style="font-weight:bold;"><i class="fa fa-folder"></i>' +
//                        '&nbsp' + json.NombreArbol + ' '+
//                        '<a href="#CrearNodo" data-toggle="modal" data-backdrop="static" data-keyboard="false"><i class="fa fa-plus-square-o"></i></a></div>' +
//                  '<ul id="ulPrincipal">' +
//                            json.CodigoHtml +
//                        '</ul>');
//        },
//        error: function (request, status, error) {
//            alert(request.responseText);
//        }
//    });
//}

var contador = 0;
var contador1 = 0;
var nodoSeleccionado = {
    IdPadre: "",
    Id: ""
}
var IdArbol = 1;
//var IdPadre = 0;

function evnt(objeto) {

    window.event.cancelBubble = true;
    obj = objeto.parentNode;
    nodoSeleccionado.IdPadre = obj.id;
    nodoSeleccionado.Id = objeto.id;
    if (nodoSeleccionado.IdPadre == "")
    {
        var objAbuelo = obj.parentNode;
        nodoSeleccionado.IdPadre = objAbuelo.id;
    }
    //alert(nodoSeleccionado.IdPadre + "--" + nodoSeleccionado.Id);
}

function crear() {
    var NomNodo = $('#Nombre_Nodo').val();
    var Result;
    
    $.ajax({
        type: "POST",
        url: urlRetornaIdNodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IDPadre: nodoSeleccionado.IdPadre, IDdArbol: IdArbol, NombreNodo: "Nodo Creado" }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            AgregaNodo(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }

    });
    
}

function AgregaNodo(Data) {
    window.event.cancelBubble = true;
    if (nodoSeleccionado.IdPadre == "InsertaArbol") {

        $("#ulPrincipal").append("<i></i>" +
           "<li id=' " + Data.Id + " ' onmouseover='return evnt(this)'>" +
             "<span onmouseover='poner(this)' onmouseout='quitar(this)'> " + Data.NombreNodo + " </span>" +
               "<i onclick='crear()' class='fa fa-plus-circle'></i>" +
               "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>" +
           "</li>");

    } else {
        var objeto = document.getElementById(nodoSeleccionado.Id);
        var ulPosicion;
        var ulPrincipal = true;

        for (var i = 0; i < objeto.childNodes.length; i++) {
            if (objeto.childNodes[i].nodeName == "UL") {
                ulPrincipal = false;
                ulPosicion = i;
            }               
        }

        if (ulPrincipal) {

            $(objeto).append("<ul>" +
                "<i></i>" +
                "<li id=' " + Data.Id + " '  onmouseover='return evnt(this)'>" +
                   "<span onmouseover='poner(this)' onmouseout='quitar(this)'>" + Data.NombreNodo + " </span>" +
                     "<i onclick='crear()' class='fa fa-plus-circle'></i>" +
                     "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>" +
                "</li>" +
              "</ul>");
        } else {

            var ulNivel1 = objeto.childNodes[ulPosicion];
            $(ulNivel1).append("<i></i>" +
              "<li  id=' " + Data.Id + " '  onmouseover='return evnt(this)'>" +
                 "<span onmouseover='poner(this)' onmouseout='quitar(this)'>" + Data.NombreNodo + "<span/>" +
                    "<i onclick='crear()' class='fa fa-plus-circle'></i>"+
                    "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>"+
               "</li>");

            contador1++;

        }

    }
}
function Eliminar() {

    var objeto;
    objeto = document.getElementById(nodoSeleccionado.Id);
    var objPadre = objeto.parentNode;
 
    var cont = objPadre.childNodes.length;
    //alert(objPadre.getAttribute("id") + "-" + cont);
    var numeral;
    for (f = 0; f < cont; f++) {
        if (objPadre.childNodes[f].nodeType == Node.ELEMENT_NODE) {

            if (objPadre.childNodes[f].id == objeto.getAttribute("id")) {
                numeral = f;

            }
        }
    }
    objPadre.removeChild(objPadre.childNodes[numeral]);
    //objPadre.removeChild(objPadre.childNodes[numeral]);
    

    
}

function poner(obj) {
    obj.style.backgroundColor = "#336699";
}

function quitar(obj) {
    obj.style.backgroundColor = "";
}