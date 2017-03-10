$(document).ready(function () {

    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li3").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Li3").css("border-color", "transparent");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li3").css('background-color', 'transparent');
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");
        $("#Li3").css("border-color", "transparent");
    });

    $("#Li3").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li3").css("background-color", "#dcdcdc");
        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("border-color", "transparent");
        $("#Li3").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
    });

    CargarGridMarcaciones();
});



function CargarGridMarcaciones()
{
    $.ajax({
        type: "POST",
        url: urlListaMarcaciones,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            ShowGridMarcaciones(json);
        }
    });
}





function ShowGridMarcaciones(dataUp) {
    $("#marcacionesGridView").kendoGrid({
        dataSource: {
            data: dataUp,
            pageSize: 10,

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
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
        { command: { text: "Editar", click: ActualizarMarcacion, imageClass: "k-icon k-i-pencil", }, title: "Actualizar", width: "80px" },
       { field: "Id", title: "Id", width: 130 },
       { field: "Submarcacion", title: "Submarcación", width: 150 },
       { field: "Responsable", title: "Responsable", width: 150},
        { field: "QueHacer", title: "Que Hacer", width: 150 },
       { field: "Macroproceso", title: "Macroproceso", width: 130 },
       { field: "Descripcion", title: "Descripción", width: 150 },
       { field: "EstadoMarcacion", title: "EstadoMarcacion", width: 150 }
      
        ]

    });

}


function ActualizarMarcacion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'NuevasMarcaciones?idActualizar=' + dataItem.Id;

};

function EliminarMarcacion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EliminarMarcacion?idMarcacion=' + dataItem.Id

};