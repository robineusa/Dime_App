$(document).ready(function () {
    TraerDatosConsulta();

});
function TraerDatosConsulta() {
    $.ajax({
        type: "GET",
        url: UrlImagenesActivasjson,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var i = 0; i < json.length; i++) {

                var src = "data:image/jpeg;base64," + json[i].Imagen;
                json[i].Imagen = src;
                $('#ContenidoImagenes').append('<li><a href="#"><img width="200px;" height="200px;" src="' + json[i].Imagen + '" data-large="' + json[i].Imagen + '"  alt="Imagen' + json[i].IdImagen + '" data-description="' + json[i].Descripcion + '" data-description2="' + json[i].Link + '" /></a></li>')

            }
             
           
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    alert('si');
}
