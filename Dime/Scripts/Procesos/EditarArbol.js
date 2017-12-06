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
            $('#InsertaArbol').append("<p id='NombreArbol' name='" + json.Id + "' onmousedown='evnt(this)'>" +
                                       "<i onclick= 'mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                                        json.NombreArbol +
                                        "<a href='#CrearNodo' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                                          "<i class='fa fa-plus-circle'></i>" +
                                        "</a>" +
                                      "</p>" +
                                      "<ul id='ulPrincipal' class='collapse in' style='list-style-type:none;'>" +
                                        json.CodigoHtml +
                                      "</ul>");
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

var contador = 0;
var contador1 = 0;
var nodoSeleccionado = {
    IdPadre: "",
    Id: ""
}
//var IdArbol = 1;

//var IdArbol = document.getElementById("NombreArbol").getAttribute("name");
//var IdPadre = 0;

function evnt(objeto) {

    window.event.cancelBubble = true;
    obj = objeto.parentNode;
    nodoSeleccionado.IdPadre = obj.id;
    nodoSeleccionado.Id = objeto.id;
    if (nodoSeleccionado.IdPadre == "") {
        var objAbuelo = obj.parentNode;
        nodoSeleccionado.IdPadre = objAbuelo.id;
    }
    //IdArbol = 1;
    IdArbol = $("#NombreArbol").attr("name");
    //alert(nodoSeleccionado.IdPadre + "--" + nodoSeleccionado.Id);
}

function crear() {
    var NomNodo = $('#Nombre_Nodo').val();
    var Result;
    if (nodoSeleccionado.IdPadre != "" && NomNodo != "") {
        $.ajax({
            type: "POST",
            url: urlRetornaIdNodo,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IDPadre: nodoSeleccionado.Id, IDdArbol: IdArbol, NombreNodo: NomNodo }),
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
        $('#Nombre_Nodo').val('');
        $('#ulPrincipal').collapse("show");
    }
}

function AgregaNodo(Data) {
    window.event.cancelBubble = true;
    if (nodoSeleccionado.IdPadre == "InsertaArbol") {
        //onmouseover='return evnt(this)'
        $("#ulPrincipal").append(
           "<li id=' " + Data.Id + " ' onmousedown='return evnt(this)' >" +
           "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
             "<span onmouseover='poner(this)' onmouseout='quitar(this)'> " +
                  Data.NombreNodo +
             " </span>" +
               "<a href='#CrearNodo' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle'></i>" +
                "</a>" +
                "<a href='#' style='text-decoration:none;'>" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>" +
                 "</a>" +
           "</li>"
           );

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

            $(objeto).append("<ul  class='collapse in' style='list-style-type:none;' >" +

                "<li id=' " + Data.Id + " '  onmousedown='return evnt(this)' >" +
                 "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                   "<span onmouseover='poner(this)' onmouseout='quitar(this)'> " + Data.NombreNodo + " </span>" +
                     "<a href='#CrearNodo' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle'></i>" +
                      "</a>" +
                     "<a href='#' style='text-decoration:none;'>" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>" +
                     "</a>" +
                "</li>" +
              "</ul>");

        } else {

            var ulNivel1 = objeto.childNodes[ulPosicion];
            $(ulNivel1).append(
              "<li id=' " + Data.Id + " '  onmousedown='return evnt(this)' >" +
                 "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                   "<span onmouseover='poner(this)' onmouseout='quitar(this)'> " + Data.NombreNodo + " </span>" +
                     "<a href='#CrearNodo' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle'></i>" +
                      "</a>" +
                     "<a href='#' style='text-decoration:none;'>" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle'></i>" +
                     "</a>" +
                "</li>");
        }
    }

    var html = $("#ulPrincipal").html();
    $.ajax({
        type: "POST",
        url: urlActualizaHTMLArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CodigoHTML: html, IDdArbol: IdArbol }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $("#BotonCrear").attr("disabled", "disabled");
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

    var html = $("#ulPrincipal").html();
    $.ajax({
        type: "POST",
        url: urlActualizaHTMLArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CodigoHTML: html, IDdArbol: IdArbol }),
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

function ValidarTexto(obj) {

    if (obj.value != "") {
        $("#BotonCrear").removeAttr("disabled");
    }
    else {
        //$("#BotonCrear").attr("disabled", "true");
        $("#BotonCrear").attr("disabled", "disabled");
    }
}



function poner(obj) {
    obj.style.backgroundColor = "#336699";
}

function quitar(obj) {
    obj.style.backgroundColor = "";
}



$("#Nombre_Nodo").on("keyup", function (e) {

    $("#BotonCrear").removeAttr("disabled");
});


function mostrarOcultar(obj) {

    var objetoPadre = obj.parentNode;
    var objetoUl;
    var idPadre = objetoPadre.getAttribute("id");
    var icono = obj.getAttribute("class");
    var contraer = false;
    if (idPadre != "NombreArbol") {

        for (var i = 0; i < objetoPadre.childNodes.length; i++) {

            if (objetoPadre.childNodes[i].nodeName == "UL") {
                objetoUl = objetoPadre.childNodes[i];
                contraer = true;
            }
        }
    }
    else {

        var objetoAbuelo = objetoPadre.parentNode;

        for (var i = 0; i < objetoAbuelo.childNodes.length; i++) {

            if (objetoAbuelo.childNodes[i].nodeName == "UL") {
                objetoUl = objetoAbuelo.childNodes[i];
                contraer = true;
            }
        }
    }


    if (contraer) {
        $(objetoUl).collapse("toggle");
        if (icono == "fa fa-caret-square-o-down") {
            obj.setAttribute("class", "fa fa-caret-square-o-right");
        }
        else {

            obj.setAttribute("class", "fa fa-caret-square-o-down");
        }
    }

}