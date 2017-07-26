$(document).ready(function () {
    ListaTiposDeEscalamientos();

});
function ListaTiposDeEscalamientos() {
    $.ajax({
        type: "POST",
        url: urltipoescalamientos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipodeSolicitud').append($('<option>', {
                    value: json[index].IdTipo,
                    text: json[index].TipoEscalamiento
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
$('#TipodeSolicitud').change(function () {
    ListaDetalleDeEscalamientos();
})
function ListaDetalleDeEscalamientos() {
    var IdTipo = $('#TipodeSolicitud').val();
    $.ajax({
        type: "POST",
        url: urldetalleescalamientos,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdTipo: IdTipo }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#DetalledeSolicitud').append($('<option>', {
                    value: json[index].IdDetalle,
                    text: json[index].DetalleEscalamiento
                }));

            }

        }
    });
    $('#DetalledeSolicitud').find('option:not(:first)').remove();
}