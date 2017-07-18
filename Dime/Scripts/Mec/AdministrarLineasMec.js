$(document).ready(function () {
    ListaLineas();
  
});

function ListaLineas() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Id = $('#idproceso').val();
    $.ajax({
        type: "GET",
        url: ListaLineasPorProceso,
        contentType: "application/json; charset=utf-8",
        data: { IdProceso: Id},
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
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
        { command: { text: " ", click: ActualizarProceso, imageClass: "k-icon k-i-pencil", }, title: "Editar", width: "60px" },
        { field: "IdLinea", title: "Id Línea", width: 100 },
        { field: "IdProceso", title: "Id Proceso", width: 100 },
        { field: "NombreLinea", title: "Nombre de la Línea", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { command: { text: "Correos", click: ListaDistribucion, imageClass: "k-icon k-i-mail", }, title: "Lista de Distribución", width: "80px" },
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ActualizarLineasMec?IdProceso=' + dataItem.IdProceso + '&IdLinea=' + dataItem.IdLinea;

};
function ListaDistribucion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'ListasdeDistribucion?IdProceso=' + dataItem.IdProceso + '&IdLinea=' + dataItem.IdLinea;

};

