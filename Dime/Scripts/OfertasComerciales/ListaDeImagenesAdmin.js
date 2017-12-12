$(document).ready(function () {
    TraerDatosConsulta();

});
function TraerDatosConsulta() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: UrlImagenesAdminjson,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cambiarfechas(json);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].Fecha = kendo.toString(kendo.parseDate(data[i].Fecha, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }
}
function cargargrilla(data) {
    console.log(data);
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        //toolbar: ["excel"],
        //excel: {
        //    fileName: "ConsultaLogBackElite.xlsx",
        //},
        dataSource: {
            data: data,
            pageSize: 20,
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
        { command: { text: " Editar", click: ActualizarProceso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "50px" },
        { field: "IdImagen", title: "Id Imagen", width: 40 },
        { field: "Link", title: "Link", width: 300 },
        { field: "Descripcion", title: "Descripcion", width: 100 },
        { field: "Estado", title: "Estado", width: 60 },
        {
            field: "src",
            title: "Imagen",
            template: '<img src="#=src#" alt="image" style="width:100px; height:100px;"/>',
            width: 60,
            filterable: false, headerAttributes: { style: "white-space: normal" }
        }
        ]

    });
}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'EditarImagen?IdImagen=' + dataItem.IdImagen;

}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
