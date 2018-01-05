
//var urlParams = new URLSearchParams(window.location.search);
//var idPadre = urlParams.get('IdPadre');
//var idTipo = urlParams.get('Tipo');
//cargarDatos(idPadre, idTipo);


$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var IdPadre = urlParams.get('IdPadre');
    ArbolAsesor(1, IdPadre);
    CargarIndice(IdPadre);
});

function ArbolAsesor(IdArbol, IdPadre) {

    $.ajax({
        type: "POST",
        url: urlConsultarNodosArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idArbol: IdArbol, idPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(result);
            var hijos;
            for (var i = 0; i < json.length; i++) {

                $('#contenedor').append(
                    "<div id='" + json[i].Nodo.Id + "' class='callout ' style='border-color:#a41e34 !important; background-color:gainsboro !important; color: black !important;width:500px;'>" +
                    "<div class='row'>" +
                        "<div style='width:auto;color:black;padding-left:20px;'>" +
                             "<p><strong>" + json[i].Nodo.NombreNodo + "</strong></p>" +
                             "<p>" + json[i].Nodo.CodigoHtml + "</p>" +

                        "</div>" +
                    "</div>" +
                "</div>" +

                "<br/>");

                if (json[i].NodosHijos.length > 0) {
                    for (var f = 0; f < json[i].NodosHijos.length; f++) {
                        $('#contenedor').append(
                     "<div id='" + json[i].NodosHijos[f].Id + "' onmouseup='ConsultarNodo(this)'  class='callout button' style='margin-left:35px ;border-color:#a41e34 !important; background-color:gainsboro !important; color: black !important;width:500px;'>" +
                        "<div class='row'>" +
                            "<div style='width:auto;color:black;padding-left:20px;'>" +
                                "<p>" + json[i].NodosHijos[f].NombreNodo + "</p>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "<br/>");
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

    window.location.href = '../Procesos/GestionNoCheck?IdPadre=' + obj.getAttribute("id");

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
            $("#breadcrumbs-one").append(
                  "<li id='0' onmouseup='ConsultarNodo(this)'><a href=''><i class='fa fa-home'></i></a></li>"
                  );
            if (json[0].IdNodo != -1) {

                for (var i = 0; i < json.length; i++) {
                    $("#breadcrumbs-one").append(
                        "<li id='" + json[i].IdNodo + "' onmouseup='ConsultarNodo(this)'><a href=''>" + json[i].NombreNodo + "</a></li>"
                        );
                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}