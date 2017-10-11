var NombreAliadoTecnico = document.getElementById("AliadoTecnico1").value;

$(document).ready(function () {
    TraerInformacionListaInteracciones();
    TraeListaDeEquipos();
    ListadeGestion();
    ListaAliados();
});

function ListadeGestion() {
    $.ajax({
        type: "POST",
        url: UrlListadeGestion,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Gestion').append($('<option>', {
                    value: json[index].IdGestion,
                    text: json[index].Gestion
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
$('#Gestion').change(function () {
    ListaSubrazon();
    NombreAliadoTecnico = "";
})
$('#Subrazon').change(function () {
    TraerEstadoCaso();
})

function ListaSubrazon() {
    var IdGestion = $('#Gestion').val();
    $.ajax({
        type: "POST",
        url: UrlListaSubrazon,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdGestion: IdGestion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Subrazon').append($('<option>', {
                    value: json[index].IdSubrazon,
                    text: json[index].Subrazon
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $('#Subrazon').find('option:not(:first)').remove();
}
function ListaAliados() {
    $.ajax({
        type: "POST",
        url: UrlListaAliados,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#AliadoTecnico').append($('<option>', {
                    value: json[index].IdAliado,
                    text: json[index].AliadoTecnico
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("AliadoTecnico");
            // obtenemos el valor a buscar
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == NombreAliadoTecnico) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
            }
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function TraerInformacionListaInteracciones() {
    var IdSolicitud = $('#idsolicitud').val();
    $.ajax({
        type: "GET",
        url: UrlListadeInteracciones,
        contentType: "application/json; charset=utf-8",
        data: { IdSolicitud: IdSolicitud },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cambiarfechas(json);
            cargargrilla(json);

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaTransaccion = kendo.toString(kendo.parseDate(data[i].FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#InteraccionesSolicitud").kendoGrid({

        dataSource: {
            data: data
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
        { field: "IdTransaccion", title: "Id Transaccion", width: 100 },
        { field: "FechaTransaccion", title: "Fecha Transaccion", width: 100 },
        { field: "NombreUsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100, filterable: false },
        { field: "Subrazon", title: "Subrazon", width: 100, filterable: false },
        { field: "EstadoSolicitud", title: "Estado Solicitud", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 300, filterable: false }
        ]

    });
}

function TraeListaDeEquipos() {
    var IdSolicitud = $('#idsolicitud').val();
    $.ajax({
        type: "GET",
        url: UrlListaDeEquiposPorSolicitud,
        contentType: "application/json; charset=utf-8",
        data: { IdSolicitud: IdSolicitud },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cargargrillaequipos(json);

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cargargrillaequipos(data) {
    $("#EquiposRegistrados").kendoGrid({

        dataSource: {
            data: data
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
        { field: "Id", title: "Id", width: 60 },
        { field: "IdSolicitud", title: "Id Solicitud", width: 60 },
        { field: "TipoDeEquipo", title: "Tipo De Equipo", width: 100 },
        { field: "Mac", title: "TMac", width: 100 },
        { field: "Tarjeta", title: "Tarjeta", width: 100 }
        ]

    });
}
function TraerEstadoCaso() {
    var IdSubrazon = $('#Subrazon').val();
    $.ajax({
        type: "POST",
        url: UrlEstadoCaso,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdSubrazon: IdSubrazon }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            $('#estadosolicitud').val(json.EstadoFinal);

        }
    });

}