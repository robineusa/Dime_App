$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var Parametro = urlParams.get('IdArbol');
    var IdArbol = Parametro;
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
            $('#InsertaArbol').append("<label id='NombreArbol' name='" + json.Id + "' onmousedown='evnt(this)' >" +

                                       "<i onclick= 'mostrarOcultar(this)' class='fa fa-caret-square-o-down'>  </i>" +
                                         " " + json.NombreArbol + " " +
                                        "<a href='#CrearNodo' style='text-decoration:none;color:#6D6968;' data-toggle='modal' data-keyboard='false'>" +
                                          "<i class='fa fa-plus-circle' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                                        "</a>" +
                                      "</label>" +
                                      "<ul id='ulPrincipal' class='collapse in' style='list-style-type:none;margin-left:14px;padding:0;'>" +
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
var SpanSeleccionado;

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
           "<li id=' " + Data.Id + " ' onmousedown='return evnt(this)'  >" +
           "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
             "<span onclick='seleccionadoConsultarHtml(this)'> " + Data.NombreNodo + " </span>" +

               "<a href='#CrearNodo' style='text-decoration:none;color:#6D6968;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                "</a>" +
                "<a href='#' style='text-decoration:none;color:#6D6968;'>" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
                "</a>" +
                "<a href='#CambiarNombre' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-pencil-square-o'></i>" +
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

            $(objeto).append("<ul  class='collapse in' style='list-style-type:none;margin-left:14px;padding:0;' >" +

                "<li id=' " + Data.Id + " '  onmousedown='return evnt(this)' >" +
                 "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                   "<span onclick='seleccionadoConsultarHtml(this)'> " + Data.NombreNodo + " </span>" +

                    "<a href='#CrearNodo' style='text-decoration:none;color:#6D6968;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                      "</a>" +
                     "<a href='#' style='text-decoration:none;color:#6D6968;'>" +
                         "<i onclick='Eliminar()' class='fa fa-minus-circle' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
                     "</a>" +
                     "<a href='#CambiarNombre' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-pencil-square-o'></i>" +
                     "</a>" +
                "</li>" +
              "</ul>");

        } else {

            var ulNivel1 = objeto.childNodes[ulPosicion];
            $(ulNivel1).append(
              "<li id=' " + Data.Id + " '  onmousedown='return evnt(this)' >" +
                 "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                   "<span onclick='seleccionadoConsultarHtml(this)'> " + Data.NombreNodo + " </span>" +

                     "<a href='#CrearNodo'style='text-decoration:none;color:#6D6968;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                      "</a>" +
                     "<a href='#' style='text-decoration:none;color:#6D6968;'>" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
                     "</a>" +
                     "<a href='#CambiarNombre' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-pencil-square-o'></i>" +
                     "</a>" +
                "</li>");
        }
    }
    ActualizarHtml()
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

    //Actualiza el codigo html del arbol
    ActualizarHtml()

    $.ajax({
        type: "POST",
        url: urlEliminarNodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdNodo: nodoSeleccionado.Id }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            alert(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
//IdNodo: NodoSeleccionado.Id, NombreNuevo: NombreCambiar
function EditarTexo() {

    //Cambia el nombre visualmente
    var NombreCambiar = $('#Nombre_Cambiar').val();
    var nombreNodo;
    var objPadre = document.getElementById(nodoSeleccionado.Id);
    for (var i = 0; i < objPadre.childNodes.length; i++) {

        if (objPadre.childNodes[i].nodeName == "SPAN") {
            // alert(objPadre.childNodes[i].nodeValue);
            nombreNodo = objPadre.childNodes[i];
            nombreNodo.childNodes[0].nodeValue = " " + NombreCambiar + " ";
        }
    }

    $.ajax({
        type: "POST",
        url: urlCambiarNombreNodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdNodo: nodoSeleccionado.Id, NombreNuevo: NombreCambiar }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            alert(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });


    //Actualiza el codigo html del arbol
    ActualizarHtml()
    $('#Nombre_Cambiar').val("");
    //$("#Nombre_Cambiar").attr("disabled", "disabled");


}

function seleccionadoConsultarHtml(obj) {
    
    if (SpanSeleccionado == null || SpanSeleccionado == "") {
        SpanSeleccionado = obj;
        obj.style.backgroundColor = "#336699";
    }
    else {
        var objetoAnterior = SpanSeleccionado;
        objetoAnterior.style.backgroundColor = "";
        obj.style.backgroundColor = "#336699";
    }
    var objetoPadre = obj.parentNode;
//
    $.ajax({
        type: "POST",
        url: urlConsultarCodigoNodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdNodo: objetoPadre.id }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CKEDITOR.instances.ckeditor.setData(json.CodigoHtml);

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    SpanSeleccionado = obj;

}

function GuardarCodigoHtmlNodo() {

    if (SpanSeleccionado != null && SpanSeleccionado != "") {
        var objetoPadre = SpanSeleccionado.parentNode.getAttribute("id");
  //

        $.ajax({
            type: "POST",
            url: urlGuardarCodigoNodo,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdNodo: objetoPadre, CodigoHtml: codigoHtml }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                console.log(json);
                alert(json);
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }

        });
    }
    else {
        alert("Debe primero seleccionar algun nodo");
    }
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
function ValidarTextoCambiar(obj) {

    if (obj.value != "") {
        $("#BotonCambiar").removeAttr("disabled");
    }
    else {
        //$("#BotonCrear").attr("disabled", "true");
        $("#BotonCambiar").attr("disabled", "disabled");
    }
}

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

function poner(obj) {
    obj.style.backgroundColor = "#336699";
}

function quitar(obj) {
    obj.style.backgroundColor = "";
}

function ponerIconoC(obj) {

    if (obj.getAttribute("onclick") == null)
        obj.setAttribute("class", "fa fa-plus-circle text-green");
    else
        obj.setAttribute("class", "fa fa-minus-circle text-red");

}
function quitarIconoC(obj) {
    if (obj.getAttribute("onclick") == null)
        obj.setAttribute("class", "fa fa-plus-circle");
    else
        obj.setAttribute("class", "fa fa-minus-circle");

}

function ActualizarHtml() {

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

$("#Nombre_Nodo").on("keyup", function (e) {

    $("#BotonCrear").removeAttr("disabled");
});

$("#Nombre_Cambiar").on("keyup", function (e) {

    $("#BotonCambiar").removeAttr("disabled");
});
