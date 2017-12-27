$(document).ready(function () {

    ConsultarCategorias();

});

function ConsultarCategorias() {
    var idPadre = $('#IdPadre').val();
    var tipo = $('#Tipo').val();

    $.ajax({
        type: "POST",
        url: urlListaATiposMacroproceso,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdCategoria: idPadre, Tipo: tipo, EsIdPadre: true }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cargarCategorias(json);
            Titulo(idPadre, tipo);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function Titulo(idPadre, tipo) {
    $.ajax({
        type: "POST",
        url: urlConsultarTitulos,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdCategoria: idPadre, Tipo: tipo }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);

            $("#TituloTipo").text(json.nombreTipo);
            $("#TituloPadre").text(json.NombrePadre);
            $("#IdPadreAnterior").text(json.IdAnterior);
            $("#IdTipoAnterior").text(json.IdTipoAnterior);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}


function cargarCategorias(data) {

    var objeto = "";
    if (data.length > 0) {
        var tipo = data[0].TipoMacroproceso;
        if (tipo == 3)
            objeto = "hidden";
    }

    $("#TiposMacroproceso").kendoGrid({
        autoBind: true,
        dataSource: {
            data: data,
        },
        scrollable: true,
        filterable: {
            extra: false,
            operators: {
                string: {

                    eq: "Es igual a"
                }
            }
        },
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
        { command: { text: " Editar", click: Editar, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "50px" },
        { command: { text: "Dependencia", click: Dependencia, imageClass: "fa fa-fw fa-plus-square text-green", }, title: "Agregar", width: "70px", hidden: objeto },
        { command: { text: "Eliminar", click: Eliminar, imageClass: "fa fa-fw fa-minus-square text-red", }, title: "Eliminar", width: "70px", hidden: objeto },
        { field: "IdCategoria", title: "Id ", width: 50 },
        { field: "Descripcion", title: "Descripcion", width: 200 },
        { field: "TipoMacroproceso", title: "Descripcion", width: 200, hidden: "hidden" }

        ]

    });
}

function Editar(e) {

}

function Eliminar(e) {

}

function Dependencia(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../Procesos/Categorias?IdPadre=' + dataItem.IdCategoria + '&Tipo=' + dataItem.TipoMacroproceso;
}

function CrearElemento() {
    var idPadre = $('#IdPadre').val();
    var tipo = $('#Tipo').val();

    window.location.href = '../Procesos/CrearElementoMacroprocesos?IdPadre=' + idPadre + '&Tipo=' + tipo;
}

function ElementoAnterior() {
   
    var IdpadreAnterior=$("#IdPadreAnterior").text();
    var IdTipoAnterior=$("#IdTipoAnterior").text();

    window.location.href = '../Procesos/Categorias?IdPadre=' + IdpadreAnterior + '&Tipo=' + IdTipoAnterior;
    
}