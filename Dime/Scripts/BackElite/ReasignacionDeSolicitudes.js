var IdSolicitudes = [];
var ds = "";

$(document).ready(function () {
    ListaDeUsuariosBack();
});

$("#CedulaUsuario").blur(function (event) {
    event.preventDefault();
    var Cedula = $("#CedulaUsuario").val();
    if (Cedula == "" || Cedula == null) {
    } else { ListaDeSolicitudesActuales(); }
   
});
function ListaDeUsuariosBack() {
    $.ajax({
        type: "GET",
        url: UrListaDeUsuarios,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Usuarios').append($('<option>', {
                    value: json[index].Cedula,
                    text: json[index].Nombre
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function ListaDeSolicitudesActuales() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    var Cedula = $("#CedulaUsuario").val();
    if (Cedula == "" || Cedula == null) { Cedula = 0; } else { }
    $.ajax({
        type: "GET",
        url: UrlListaSolicitudesPorBackJson,
        contentType: "application/json; charset=utf-8",
        data: { Cedula: Cedula },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
            generarDataKendo(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaDeAgenda = kendo.toString(kendo.parseDate(data[i].FechaDeAgenda, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSolicitud = kendo.toString(kendo.parseDate(data[i].FechaDeSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeFinalizacion = kendo.toString(kendo.parseDate(data[i].FechaDeFinalizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        }
}

function generarDataKendo(datos) {
    ds = new kendo.data.DataSource({
        data: datos
    });
    cargargrilla();
}

function cargargrilla() {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        dataSource: ds,
        scrollable: true,
        sortable: true,
        columns: [
        { title: "Seleccionar", template: '<input type="checkbox" name="seleccionar" />', width: 100 },
        { field: "IdSolicitud", title: "Id Transacción", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "LlsOt", title: "LlsOt", width: 100 },
        { field: "TipoDeSolicitud", title: "Tipo De Solicitud", width: 100 },
        { field: "DetalleDeSolicitud", title: "Detalle De Solicitud", width: 100 },
        { field: "FechaDeSolicitud", title: "Fecha De Solicitud", width: 100 },
        { field: "UsuarioQueSolicita", title: "Usuario Que Solicita", width: 100 },
        { field: "NombreUsuarioQueSolicita", title: "Nombre Usuario Que Solicita", width: 100 },
        { field: "AliadoQueSolicita", title: "Aliado Que Solicita", width: 100 },
        { field: "OperacionQueSolicita", title: "Operacion Que Solicita", width: 100 },
        { field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 100 },
        { field: "UsuarioUltimaActualizacion", title: "Usuario Ultima Actualizacion", width: 100 },
        { field: "NombreUsuarioUltimaActualizacion", title: "Nombre Usuario Ultima Actualizacion", width: 100 },
        { field: "FechaDeFinalizacion", title: "Fecha De Finalizacion", width: 100 },
        { field: "UsuarioQueFinaliza", title: "Usuario Que Finaliza", width: 100 },
        { field: "NombreUsuarioQueFinaliza", title: "Nombre Usuario Que Finaliza", width: 100 },
        { field: "Nodo", title: "Nodo", width: 100 },
        { field: "Malescalado", title: "Mal Escalado", width: 100 },
        { field: "DetalleMalEscalado", title: "Detalle Mal Escalado", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "EstadoEscalamiento", title: "Estado Escalamiento", width: 100 },
        { field: "FechaDeAgenda", title: "Fecha De Agenda", width: 100 },
        { field: "UsuarioGestionando", title: "Usuario Gestionando", width: 100 },
        ]
    });
}

function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}

$('#guardar').click(function (e) {
    e.preventDefault();
    // se obtienen los items seleccionados. // se buscan con jQuery y Attribute Selectors, // todos aquellos "inputs" de tipo "checkbox",
    // que tengan como nombre "seleccionar" y que además estén "chequeados". // luego se recorren con la función each de jQuery.
    $('input[name=seleccionar][type=checkbox]:checked')
        .each(function (i, checkbox) {
            // obtenemos la fila mas cercana al checkbox // en este caso es la fila en la que se encuentra.
            var $fila = $(checkbox).closest("tr");
            // buscamos dentro de la fila un input que // se llame "comentario" y obtenemos su valor //var comentario = $fila.find('input[name=comentario]').val();
            // se obtiene el identificador unico del item. // es el atributo "data-uid" de la fila.
            var itemUid = $fila.data("uid");
            // se busca el item en base al uid // se usa el método getByUid del kendo.data.DataSource
            var item = ds.getByUid(itemUid);
            var itemId = item.IdSolicitud;
            //// agregamos el id y el comentario al arreglo //// de ítems seleccionados.
            IdSolicitudes.push(itemId);
            });
    console.log(IdSolicitudes);
    ActualizarSolicitudes();
});

function ActualizarSolicitudes() {
    IdSolicitudes;
    var User = $("#Usuarios").val();
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlReasignarsolicitudes,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Solicitudes: IdSolicitudes, Usuario: User }),
        dataType: "json",
        success: function (result) {
            window.location.href = 'ReasignacionDeSolicitudes';
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }
    });
}