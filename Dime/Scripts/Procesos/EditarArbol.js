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
