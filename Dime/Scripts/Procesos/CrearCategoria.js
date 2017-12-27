$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var idPadre = urlParams.get('IdPadre');
    var idTipo = urlParams.get('Tipo');
    cargarDatos(idPadre, idTipo);

});

function cargarDatos(IdPadre, tipo) {
    $("#IdTipoPadre").text(tipo);
    $.ajax({
        type: "POST",
        url: urlConsultarTipoCategorias,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdCategoria: IdPadre, Tipo: tipo }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CargarControles(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }

    });

}

function CargarControles(Data) {

    //Texto
    $("#NombrePadre").val(Data.Categorias.Descripcion);
    $("#NombreTipo").val(Data.Tipos.Descripcion);
    //Ids
    $("#IdPadre").text(Data.Categorias.IdCategoria);
    $("#IdTipo").text(Data.Tipos.IdTipo);
}

function CrearElemento() {
    
    var idPadre = $("#IdPadre").text();
    var tipo = $("#IdTipo").text();
    var descripcion = $("#Descripcion").val();

    $.ajax({
        type: "POST",
        url: urlCrearTipoCategorias,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: idPadre, Tipo: tipo, Descripcion: descripcion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    window.location.href = '../Procesos/Categorias?IdPadre=' + idPadre + '&Tipo=' + $("#IdTipoPadre").text();
}