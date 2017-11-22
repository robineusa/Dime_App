$(document).ready(function () {
    var IdArbol = 1;
    ConstruirArbol(IdArbol);
});

function ConstruirArbol(idArbol)
{
    $.ajax({
        type: "POST",
        url: urlLLamarArbolId,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IDdArbol: idArbol }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            for (var index = 0, len = json.length; index < len; index++) {
                if (json[index] == "0") {
                    $('#InsertaArbol').append(
                        '<ul>'+
                            '<li id="' + json[index].Id+ '">' +
                                '<input type="text"/>'+
                            '</li>'+
                        '</ul>'
                    );
                }
                else
                {

                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
