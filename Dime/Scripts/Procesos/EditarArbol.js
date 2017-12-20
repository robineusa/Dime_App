$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var Parametro = urlParams.get('IdArbol');
    var IdArbol = Parametro;
    var IdPadre = 0;
    //Inserta los botones necesarios en para el editor
    $('#summernote').summernote({
        toolbar: [
          // [groupName, [list of button]]

          ['style', ['style', 'bold', 'italic', 'underline', 'clear', 'fontname']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['Insert', ['picture', 'video', 'table', 'link']],
          ['Misc', ['fullscreen', 'codeview']]

        ]
    });

    ConstruirArbol(IdArbol);
    var cat = 0;
    CargarCategorias(cat, "Categorias");
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
                                        "<a href='#CrearNodo' style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                                          "<i class='fa fa-plus-circle agregarI' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                                        "</a>" +
                                      "</label>" +
                                      "<ul id='ulPrincipal' class='collapse in clt' style='list-style-type:none;margin-left:14px;padding:0;'>" +
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
             "<span  onclick='seleccionadoConsultarHtml(this)' onmousedown='poner(this)' onmouseup='quitar(this)'> " + Data.NombreNodo + " </span>" +

               "<a href='#CrearNodo'  data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle agregarI' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'>  </i>" +
                "</a>" +
                "<a href='#' >" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle eliminarI' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'>  </i>" +
                "</a>" +
                "<a href='#CambiarNombre'  data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-pencil-square-o EditarI' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'>  </i>" +
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

            $(objeto).append("<ul  class='collapse in clt' style='list-style-type:none;margin-left:14px;padding:0;' >" +

                "<li id=' " + Data.Id + " '  onmousedown='return evnt(this)' >" +
                 "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                   "<span onclick='seleccionadoConsultarHtml(this)' onmousedown='poner(this)' onmouseup='quitar(this)'> " + Data.NombreNodo + " </span>" +

                    "<a href='#CrearNodo'  data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle agregarI' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                      "</a>" +
                     "<a href='#' >" +
                         "<i onclick='Eliminar()' class='fa fa-minus-circle eliminarI' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
                     "</a>" +
                     "<a href='#CambiarNombre'  data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-pencil-square-o EditarI' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
                     "</a>" +

                "</li>" +
              "</ul>");

        } else {

            var ulNivel1 = objeto.childNodes[ulPosicion];
            $(ulNivel1).append(
              "<li id=' " + Data.Id + " '  onmousedown='return evnt(this)' >" +
                 "<i onclick='mostrarOcultar(this)' class='fa fa-caret-square-o-down'></i>" +
                   "<span onclick='seleccionadoConsultarHtml(this)' onmousedown='poner(this)' onmouseup='quitar(this)'> " + Data.NombreNodo + " </span>" +

                     "<a href='#CrearNodo'style='text-decoration:none;' data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-plus-circle agregarI' onmouseover='ponerIconoC(this)'  onmouseout='quitarIconoC(this)'></i>" +
                      "</a>" +
                     "<a href='#' style='text-decoration:none;'>" +
                        "<i onclick='Eliminar()' class='fa fa-minus-circle eliminarI' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
                     "</a>" +
                     "<a href='#CambiarNombre'  data-toggle='modal' data-keyboard='false'>" +
                        "<i class='fa fa-pencil-square-o EditarI' onmouseover='ponerIconoC(this)' onmouseout='quitarIconoC(this)'></i>" +
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

            $("#mensaje").text(json);
            $("#myModal").modal("toggle");
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

            $("#mensaje").text(json);
            $("#myModal").modal("toggle");
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
    SpanSeleccionado = obj;

    $('#NodoSeleccionado').val($(SpanSeleccionado).text());

    var objetoPadre = obj.parentNode;
    var tieneHijos = false;

    for (var i = 0; i < objetoPadre.childNodes.length; i++) {
        if (objetoPadre.childNodes[i].nodeName == "UL") {
            tieneHijos = true;
        }
    }

    if (tieneHijos) {

        $("#nodoFinal").attr("disabled", "disabled");
    }
    else {

        $("#nodoFinal").removeAttr("disabled", "disabled");
    }

    var objetoPadre = obj.parentNode;


    $.ajax({
        type: "POST",
        url: urlConsultarCodigoNodo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdNodo: objetoPadre.id }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            $('#summernote').summernote('code', json.CodigoHtml);
            if (json.EsNodoFinal)
                document.getElementById("nodoFinal").checked = true;
            else
                document.getElementById("nodoFinal").checked = false;


        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });


}


function GuardarCodigoHtmlNodo() {

    if (SpanSeleccionado != null && SpanSeleccionado != "") {

        var objetoPadre = SpanSeleccionado.parentNode.getAttribute("id");
        var codigoHtml = $('#summernote').summernote('code');
        var nodoFinalCheck = false;
        var categoria = 0;
        var subcategoria = 0;
        var tipo = 0;

        if (document.getElementById("nodoFinal").checked == true) {
            nodoFinalCheck = true;

            objetoCategoria = document.getElementById("Categorias");
            categoria = objetoCategoria.options[objetoCategoria.selectedIndex].value!=null ? objetoCategoria.options[objetoCategoria.selectedIndex].value : " ";
            alert(categoria);

            objetoSubCategoria = document.getElementById("subCategoria");
            subcategoria = objetoSubCategoria.options[objetoSubCategoria.selectedIndex].value != null ? objetoSubCategoria.options[objetoSubCategoria.selectedIndex].value : " ";
            alert(subcategoria);

            objetoTipo = document.getElementById("Tipo");
            tipo = objetoTipo.options[objetoTipo.selectedIndex].value != null ? objetoTipo.options[objetoTipo.selectedIndex].value : " ";
            alert(tipo);
        }

        $.ajax({
            type: "POST",
            url: urlGuardarCodigoNodo,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdNodo: objetoPadre, CodigoHtml: codigoHtml, NodoFinal: nodoFinalCheck, Categoria:categoria, SubCategoria:subcategoria, Tipo:tipo }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                console.log(json);

                $("#mensaje").text(json);
                $("#myModal").modal("toggle");
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }

        });
    }
    else {
        $("#mensaje").text("Debe primero seleccionar algun nodo");
        $("#myModal").modal("toggle");


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
    obj.style.backgroundColor = "#5386f1";
    obj.style.color = "#f6f6f6";
}

function quitar(obj) {
    obj.style.backgroundColor = "";
    obj.style.color = "";
}

function ponerIconoC(obj) {


    if (obj.getAttribute("onclick") == null && obj.getAttribute("class") != "fa fa-pencil-square-o EditarI")
        obj.setAttribute("class", "fa fa-plus-circle fa-lg agregarI");
    else if (obj.getAttribute("onclick") != null && obj.getAttribute("class") != "fa fa-pencil-square-o EditarI")
        obj.setAttribute("class", "fa fa-minus-circle fa-lg eliminarI");
    else
        obj.setAttribute("class", "fa fa-pencil-square-o fa-lg EditarI");

}
function quitarIconoC(obj) {
    if (obj.getAttribute("onclick") == null && obj.getAttribute("class") != "fa fa-pencil-square-o fa-lg EditarI")
        obj.setAttribute("class", "fa fa-plus-circle  agregarI");
    else if (obj.getAttribute("onclick") != null && obj.getAttribute("class") != "fa fa-pencil-square-o fa-lg EditarI")
        obj.setAttribute("class", "fa fa-minus-circle eliminarI");
    else
        obj.setAttribute("class", "fa fa-pencil-square-o EditarI");

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

function CargarCategorias(idCategoria,lista) {

    $.ajax({
        type: "POST",
        url: urlCargarCategorias,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idCategoriapadre: idCategoria }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#'+lista).append($('<option>', {
                    value: json[index].IdCategoria,
                    text: json[index].Descripcion
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });


}

function SetOpciones(obj) {
    //alert(obj.getAttribute("id"));


    if (obj.getAttribute("id") == "Categorias") {

        $("#subCategoria").empty();
        $("#subCategoria").append("<option value=''>--Select Option--</option>");

        $("#Tipo").empty();
        $("#Tipo").append("<option value=''>--Select Option--</option>");
     
        CargarCategorias(obj.options[obj.selectedIndex].value, "subCategoria");

        $("#subCategoria").removeAttr("hidden");
        $("#subCategoriaStrong").removeAttr("hidden");
        
    }

    
    if (obj.getAttribute("id") == "subCategoria") {

        $("#Tipo").empty();
        $("#Tipo").append("<option value=''>--Select Option--</option>");

        CargarCategorias(obj.options[obj.selectedIndex].value, "Tipo");

        $("#Tipo").removeAttr("hidden");
        $("#tipoStrong").removeAttr("hidden");
    }
}

function mostrarCategorias(obj) {

    if (obj.checked) {

        $("#Categorias").removeAttr("hidden");
        $("#categoriaStrong").removeAttr("hidden");


    }
    else {

        $("#Categorias").attr("hidden", "hidden");
        $("#categoriaStrong").attr("hidden", "hidden");
        $("#Categorias").empty();

        $("#subCategoria").attr("hidden", "hidden");
        $("#subCategoriaStrong").attr("hidden", "hidden");
        $("#subCategoria").empty();

        $("#Tipo").attr("hidden", "hidden");
        $("#tipoStrong").attr("hidden", "hidden");
        $("#Tipo").empty();
        
        
        

        $("#Categorias").append("<option value=''>--Select Option--</option>");
        $("#subCategoria").append("<option value=''>--Select Option--</option>");
        $("#Tipo").append("<option value=''>--Select Option--</option>");

        var cat = 0;
        CargarCategorias(cat, "Categorias");

    }

}



$("#Nombre_Nodo").on("keyup", function (e) {

    $("#BotonCrear").removeAttr("disabled");
});

$("#Nombre_Cambiar").on("keyup", function (e) {

    $("#BotonCambiar").removeAttr("disabled");
});
