$(document).ready(function () {
    var IdArbol = 1;
    ConstruirArbol(IdArbol);
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
            $('#InsertaArbol').append('<ul>' +
                '<strong>' +
                    '<i class="fa fa-folder"></i> ' + json.NombreArbol +
                '</strong>' + json.CodigoHtml + '<i class="fa fa-plus-square"></i><br/>' +
            '</ul>');
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function evnt(objeto) {

    var posicion = objeto.getBoundingClientRect();
    document.getElementById("lista").style.position = "absolute";
    document.getElementById("lista").style.display = "block";
    document.getElementById("lista").style.left = posicion.left + 20 + "px";
    document.getElementById("lista").style.top = posicion.top + "px";

}

function crear() {
    var obj = document.getElementById("ulPrincipal");

    var li = document.createElement("li");
    var txt = document.createTextNode("Primer nodo exitoso");
    li.appendChild(txt);
    li.setAttribute("id", "li" + contador);
    li.setAttribute("onclick", "evnt(this)");
    obj.appendChild(li);

    contador++;
}

function ocultar() {
    document.getElementById("lista").style.display = "none";

}

function poner() {
    document.getElementById("lista").style.display = "block";

}

function seleccionado() {
    document.getElementById("lista").style.display = "none";
}