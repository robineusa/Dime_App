$(document).ready(function () {
    ListaProcesos();
    ListaTipoAlarmas();
});
function ListaProcesos() {
    $.ajax({
        type: "POST",
        url: urlProcesos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Procesos').append($('<option>', {
                    value: json[index].IdProceso,
                    text: json[index].Proceso
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function ListaLineas() {
    var IdProceso = $('#Procesos').val();
    $.ajax({
        type: "POST",
        url: urlLineas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdProceso: IdProceso }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Lineas').append($('<option>', {
                    value: json[index].IdLinea,
                    text: json[index].NombreLinea
                }));

            }

        }
    });
    $('#Lineas').find('option:not(:first)').remove();
}
$('#Procesos').change(function () {
    ListaLineas();
})
function DatosUsuario() {
    var Cedula = $('#CedulaUsuarioMonitoreado').val();
    $.ajax({
        type: "POST",
        url: UrlUsuarios,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Cedula: Cedula }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            $('#NombreUsuarioMonitoreado').val(json.Nombre);
            $('#OperacionUsuarioMonitoreado').val(json.Operacion);
            $('#AliadoUsuarioMonitoreado').val(json.Aliado);
        }
    });

}
$('#CedulaUsuarioMonitoreado').change(function () {
    var dato = "";
    $('#NombreUsuarioMonitoreado').val(dato);
    $('#OperacionUsuarioMonitoreado').val(dato);
    $('#AliadoUsuarioMonitoreado').val(dato);
    DatosUsuario();

})

function DatosCliente() {
    var Cuenta = $('#CuentaCliente').val();
    $.ajax({
        type: "POST",
        url: UrlClientes,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {           
            var json = JSON.parse(result);
            $('#Division').val(json.Division);
            $('#Area').val(json.Area);
            $('#Zona').val(json.Zona);
            $('#Comunidad').val(json.NombreComunidad);
            $('#TipoCliente').val(json.TipoCliente);
            $('#DescripcionTipoCliente').val(json.Descripcion);
        }
    });

}
$('#CuentaCliente').change(function () {
    var dato = "";
    $('#Division').val(dato);
    $('#Area').val(dato);
    $('#Zona').val(dato);
    $('#Comunidad').val(dato);
    $('#TipoCliente').val(dato);
    $('#DescripcionTipoCliente').val(dato);
    DatosCliente();

})

function ListaTipoAlarmas() {
    $.ajax({
        type: "POST",
        url: UrlAlarmas,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoAlarmas').append($('<option>', {
                    value: json[index].IdAlarma,
                    text: json[index].NombreAlarma
                }));

            }

        }
    });
    $('#TipoAlarmas').find('option:not(:first)').remove();
}
function ListaDistribucion() {
    var IdLinea = $('#Lineas').val();
    $.ajax({
        type: "POST",
        url: UrlListaDistribucion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdLinea: IdLinea }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            $('#IdListaDistri').val(json[0].IdLista);
            }
    });
   
}
$('#Lineas').change(function () {
    var dato = "";
    $('#IdListaDistri').val(dato);
    ListaDistribucion();
})