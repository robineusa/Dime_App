$(document).ready(function () {

    $("#btnCargarArchivo").on("click", function () {
        var inputFileImage = document.getElementById("file");
        var file = inputFileImage.files[0];
        var data = new FormData();
        data.append('file', file);
        if (x != null) {
            $.ajax({
                type: "POST",
                data: data,
                contentType: false,
                url: 'Notificaciones',
                processData: false,
                cache: false,
                success: function (result) {
                    $('#imagenCargada').css("display", "block");
                    $('#imagenCargada').attr("src", result);
                }
            });
        } else { alert('Debe Seleccionar una Imágen');}
    });

    ShowGridNotificaciones(jsondataNotificaciones);

});
function ShowGridNotificaciones(jsondataNotificaciones) {
    console.log(jsondataNotificaciones);
    $("#gridViewresultadolistanotificaciones").kendoGrid({
        dataSource: {
            data: jsondataNotificaciones,
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
        { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "40px" },
        { field: "Id", title: "Id Transacción", width: 100 },
        { field: "Fecha_Publicacion", title: "Fecha Publicación", width: 100, template: "#= kendo.toString(kendo.parseDate(Fecha_Publicacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
        { field: "Usuario_Publicacion", title: "Usr Publicación", width: 100 },
        { field: "Descripcion", title: "Descripción", width: 100 },
        {
            field: "Nombre_Imagen",
            title: "Nombre",
            template: '<img src="../ImagesClient/#=Nombre_Imagen#" alt="image" style="width:100px; height:100px;"/>',
            width: 70,
            filterable: false, headerAttributes: { style: "white-space: normal" }
        },
        { field: "Aliado_Destino", title: "Aliado Destino", width: 100 },
        { field: "Perfil_Destino", title: "Perfil Destino", width: 100 },
        { field: "Nombre_Linea_Destino", title: "Operación Destino", width: 100 }        
        ]

    });
}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'Visualizador_Imagenes?Id_Imagen=' + dataItem.Id;
}
