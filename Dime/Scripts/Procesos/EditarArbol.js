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
//var IdPadre = 0;

function evnt(objeto) {

    window.event.cancelBubble = true;
    obj = objeto.parentNode;
    nodoSeleccionado.IdPadre = obj.id;
    nodoSeleccionado.Id = objeto.id;

    //for (var i = 0; i < objeto.childNodes.length; i++) {
    //    //alert(objeto.childNodes[i].nodeName);
    //    if (objeto.childNodes[i].nodeName == "DIV") {
    //        div = objeto.childNodes[i];
    //    }
    //}
    //div.style.visibility = "visible";

}

function crear() {
    if (nodoSeleccionado.IdPadre == "InsertaArbol") {

        $("#ulPrincipal").append("<i></i>" +
           "<li  onmousedown='return evnt(this)'" + "id= 'li" + contador + "'>" +
            "<span onmouseover='pruebas(this)' onmouseout='pruebas2(this)'> Primer nodo  </span>" +
            "<i onclick='crear()' class='fa fa-plus-circle'></i>" +
            "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>"+
           "</li>")

        contador++;

    } else {
        var objeto = document.getElementById(nodoSeleccionado.Id);
        //alert("Creacion li - " + objeto.id);

        if (objeto.childNodes.length < 3) {

            $(objeto).append("<ul id='ul  ;" + contador1 + "'>" + "<i></i>" +
                "<li  onmousedown='return evnt(this)'" + "id= 'li" + contador + "." + contador1 + "'>" +
                   "<span onmouseover='pruebas(this)' onmouseout='pruebas2(this)'> Nodo </span>" +
                   "<i onclick='crear()' class='fa fa-plus-circle'></i>" +
                   "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>" +
                "</li> </ul>");

            contador1++;

        } else {

            var ulNivel1 = objeto.childNodes[2];
            $(ulNivel1).append("<i></i>" + "<li  id='subHijo1." + contador + "-" + contador1 + "'  onmousedown='return evnt(this)'>" +
                "<span onmouseover='pruebas(this)' onmouseout='pruebas2(this)'>Subnivel" +
                  "<i onclick='crear()' class='fa fa-plus-circle'></i>"+
                  "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>"+
                "<span/>" +
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
}
function ocultar() {
    document.getElementById("lista").style.display = "none";

}

function poner() {
    document.getElementById("lista").style.display = "block";

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

function pruebas(obj) {
    obj.style.backgroundColor = "#336699";
}

function pruebas2(obj) {
    obj.style.backgroundColor = "";
}