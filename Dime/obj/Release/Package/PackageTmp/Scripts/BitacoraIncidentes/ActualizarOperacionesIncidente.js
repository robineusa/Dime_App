$(document).ready(function () {
    ListaDeIncidentes();

});

function ListaDeIncidentes() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Id = $('#idRegistro').val();
    $.ajax({
        type: "GET",
        url: UrlListadeOperaciones,
        contentType: "application/json; charset=utf-8",
        data: { IdRegistro: Id },
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
        { command: { text: "Eliminar", click: ActualizarProceso, imageClass: "ion-trash-a", }, title: "Eliminar", width: "90px" },
        { field: "Id", title: "Id", width: 100 },
        { field: "IdRegistro", title: "Id Registro", width: 100 },
        { field: "NombreGerencia", title: "Nombre Gerencia", width: 100 },
        { field: "NombreAliado", title: "Nombre Aliado", width: 100 },
        { field: "NombreOperacion", title: "Nombre Operacion", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    ActualizarCuentas(dataItem);
    };

function ActualizarCuentas(data) {
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlEliminarOperacion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdOperacion: data.Id }),
        dataType: "json",
        success: function (result) {
            window.location.href = 'ActualizarOperacionesIncidente?IdRegistro=' + data.IdRegistro;
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
}
