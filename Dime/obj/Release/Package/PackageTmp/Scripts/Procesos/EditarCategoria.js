$(document).ready(function () {

    var urlParams = new URLSearchParams(window.location.search);
    var IdEditar = urlParams.get('IdEditar');
    var TipoEditar = urlParams.get('TipoEditar');
    var IdPadre = urlParams.get('IdPadre');
    var Tipo = urlParams.get('Tipo');

    $("#IdPadre").text(IdPadre);
    $("#Tipo").text(Tipo);


    cargarDatos(IdEditar, TipoEditar);

});

function cargarDatos(IdEditar, TipoEditar) {

    $.ajax({
        type: "POST",
        url: urlConsultarTipoCategorias,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdCategoria: IdEditar, Tipo: TipoEditar, ConsultaTipoCategoria: false }),
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
    $("#NombreAntiguo").val(Data.Categorias.Descripcion);
    $("#NombreTipo").val(Data.Tipos.Descripcion);
    //Ids
    $("#IdCategoria").text(Data.Categorias.IdCategoria);
    $("#IdTipo").text(Data.Tipos.IdTipo);
}

function Editar() {

    var Id = $("#IdCategoria").text();
    var descripcion = $("#Descripcion").val();

    $.ajax({
        type: "POST",
        url: urlEditarCategorias,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdCategoria: Id, nombreNuevo: descripcion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    window.location.href = '../Procesos/Categorias?IdPadre=' + $("#IdPadre").text() + '&Tipo=' + $("#Tipo").text();
}