
//var urlParams = new URLSearchParams(window.location.search);
//var idPadre = urlParams.get('IdPadre');
//var idTipo = urlParams.get('Tipo');
//cargarDatos(idPadre, idTipo);


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    //var IdPadre = urlParams.get('IdPadre');
    var IdArbol = urlParams.get('IdArbol');
    if (IdNodoSesion == "" || IdNodoSesion == null)
        IdNodoSesion = 0;
    ArbolAsesor(1, IdNodoSesion);
    CargarIndice(IdNodoSesion);
});

function ArbolAsesor(IdArbol, IdPadre) {
    window.event.cancelBubble = true;
    $.ajax({
        type: "POST",
        url: urlConsultarNodosArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idArbol: IdArbol, idPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(result);
            var NodoFinal = "";
            var NodoFinalHijo = "";
            var funcion = "ConsultarNodo(this)";

            for (var i = 0; i < json.length; i++) {

                if (json[i].Nodo.EsNodoFinal) {
                    NodoFinal = "<button class='btn-success' onclick='finalizar()'>Finalizar</button>";

                }


                $('#contenedor').append(
                    "<div id='" + json[i].Nodo.Id + "' class='callout ' style='border-color:#a41e34 !important; background-color:gainsboro !important; color: black !important;width:500px;'>" +
                    "<div class='row'>" +
                        "<div style='width:auto;color:black;padding-left:20px;'>" +
                             "<p><strong>" + json[i].Nodo.NombreNodo + "</strong></p>" +
                             "<p>" + json[i].Nodo.CodigoHtml + NodoFinal + "</p>" +

                        "</div>" +
                    "</div>" +
                "</div>" +

                "<br/>");
                NodoFinal = "";
                if (json[i].NodosHijos.length > 0) {
                    for (var f = 0; f < json[i].NodosHijos.length; f++) {

                        if (json[i].NodosHijos[f].EsNodoFinal) {
                            NodoFinalHijo = "<button class='btn-success'>Finalizar</button>";
                            funcion = "finalizar()";
                        }

                        $('#contenedor').append(
                     "<div id='" + json[i].NodosHijos[f].Id + "' onclick= '" + funcion + "'  class='callout button' style='margin-left:35px ;border-color:#a41e34 !important; background-color:gainsboro !important; color: black !important;width:500px;'>" +
                        "<div class='row'>" +
                            "<div style='width:auto;color:black;padding-left:20px;'>" +
                                "<p>" + json[i].NodosHijos[f].NombreNodo + NodoFinalHijo + "</p>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "<br/>");
                        NodoFinalHijo = "";
                    }
                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function ConsultarNodo(obj) {
    $("#Indice").empty();
    $("#contenedor").empty();
    ArbolAsesor(IdArbolActual, obj.getAttribute("id"));
    CargarIndice(obj.getAttribute("id"));
}

function CargarIndice(IdNodoActual) {
    $.ajax({
        type: "POST",
        url: urlIndiceNodosArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idNodoActual: IdNodoActual }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var json = JSON.parse(result);
            $("#Indice").append(
                  "<li id='0' onmouseup='ConsultarNodo(this)'><a href=''><i class='fa fa-home'></i></a></li>"
                  );
            if (json[0].IdNodo != -1) {
                for (var i = 0; i < json.length; i++) {
                    $("#Indice").append(
                        "<li id='" + json[i].IdNodo + "' onclick='ConsultarNodo(this)'><a href=''>" + json[i].NombreNodo + "</a></li>"
                        );
                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function finalizar() {
    $.alert({
        theme: 'Modern',
        icon: 'fa fa-check-circle',
        boxWidth: '500px',
        useBootstrap: false,
        type: 'green',
        title: 'Gestion finalizada',
        content: 'Se a finalizado el proceso satisfactoriamente',
        buttons: {
            Ok: {
                btnClass: 'btn-success',
                action: function () { }
            },
        }
    });
}