$("#SD").blur(function (event) {
    event.preventDefault();
    ListaSD();
});

function ListaSD() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var SD = $("#SD").val();
    if (SD == "" || SD == null) { SD = "0"; } else { }
    $.ajax({
        type: "GET",
        url: UrlTraerIncidentePorSDJson,
        contentType: "application/json; charset=utf-8",
        data: { CasoSD: SD },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
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
        data[i].FechaDeRegistro = kendo.toString(kendo.parseDate(data[i].FechaDeRegistro, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        width: 100,
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "BasePresidencial.xlsx",
        },
        dataSource: {
            data: data,
            schema: {
                model: {

                }
            },
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
        columns: [
        { command: { text: "Editar", click: Actualizar, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "90px" },
        { field: "IdRegistro", title: "Id Registro", width: 100 },
        { field: "NombreUsuarioCreacion", title: "Nombre Usuario Creacion", width: 100 },
        { field: "FechaDeRegistro", title: "Fecha De Registro", width: 100 },
        { field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 100 },
        { field: "CasoSD", title: "Caso SD", width: 100 },
        { field: "IM", title: "IM", width: 100 },
        { field: "Herramienta", title: "Herramienta", width: 100 },
        { field: "Prioridad", title: "Prioridad", width: 100 },
        { field: "EscaladoA", title: "Escalado A", width: 100 }
    ]
    });
}

function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function Actualizar(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizacionDeIncidentes?IdRegistro=' + dataItem.IdRegistro;

};
