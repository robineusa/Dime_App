var NombreProceso = document.getElementById("NombreProceso1").value;
var IdProceso = $('#IdDelProceso').val();
var NombreLinea = document.getElementById("NombreLinea1").value;
var TipoAlarmaAntigua = document.getElementById("TipoDeAlarma1").value;

$(document).ready(function () {
    ListaProcesos();
    ListaLineas();
    ListaTipoAlarmas();
});
$('#Procesos').change(function () {
    NombreProceso = "";
    NombreLinea = "";
    TipoAlarmaAntigua = "";
    IdProceso = $('#Procesos').val();
    ListaLineas();
    ListaTipoAlarmas();
  
})
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
            // creamos un variable que hace referencia al select
            var select = document.getElementById("Procesos");
            // obtenemos el valor a buscar
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == NombreProceso) {
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

function ListaLineas() {
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
            // creamos un variable que hace referencia al select
            var select = document.getElementById("Lineas");
            // obtenemos el valor a buscar
            
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == NombreLinea) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
            }
        }
    });
    $('#Lineas').find('option:not(:first)').remove();
}

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
        data: JSON.stringify({ IdProceso: IdProceso }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoAlarmas').append($('<option>', {
                    value: json[index].IdAlarma,
                    text: json[index].NombreAlarma
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("TipoAlarmas");
            // obtenemos el valor a buscar
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == TipoAlarmaAntigua) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
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