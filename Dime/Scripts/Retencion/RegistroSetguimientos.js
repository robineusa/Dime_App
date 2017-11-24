var Cliente;
var ds="";

$(document).ready(function () {
    TipodeEscalamientos();
});

$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    $('#Nombre').focus();
    var Cuenta = $("#CuentaCliente").val();
    LimpiarCampos();
    if (Cuenta == "" || Cuenta == null || Cuenta == "0") {
    } else { DatosClienteCuenta(Cuenta); }
   
});

$('#Cedula').blur(function () {
    var Cedula = $("#Cedula").val();
    document.getElementById("datosCliente").reset();
    LimpiarCampos();
    if (Cedula == "" || Cedula == null) {
    } else { DatosClienteCedula(Cedula); }
   
})



function DatosClienteCuenta(Cuenta) {
    $('#Nombre').focus();
        $.ajax({
            type: "POST",
            url: urlconsultaclientecuenta,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ CuentaCliente: Cuenta }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                //$('#Cedula').prop('readonly', true);
                $('#CuentaCliente').val(Cuenta);
                //$('#clientecuenta').val(Cuenta);
                //$('#segcuenta').val(Cuenta);
                $('#Cedula').val(json.Cedula);
                $('#Nombre').val(json.Nombre);
                $('#Apellido').val(json.Apellido);
                $('#TelefonoTelmex').val(json.TelefonoTelmex);
                $('#Telefono1').val(json.Telefono1);
                $('#Telefono2').val(json.Telefono2);
                $('#Telefono3').val(json.Telefono3);
                $('#DirInstalacion').val(json.DirInstalacion);
                $('#DirCorrespondencia').val(json.DirCorrespondencia);
                $('#Nodo').val(json.Nodo);
                $('#Red').val(json.Red);
                $('#Division').val(json.Division);
                $('#Area').val(json.Area);
                $('#Zona').val(json.Zona);
                $('#Distrito').val(json.Distrito);
                $('#NombreComunidad').val(json.NombreComunidad);
                $('#Estrato').val(json.Estrato);
                $('#TipoCliente').val(json.TipoCliente);
                $('#Descripcion').val(json.Descripcion);
                $('#Nombre').focus();
            }
        });
      
}

function DatosClienteCuentaCedula(Cuenta) {
    $('#Nombre').focus();
        $.ajax({
            type: "POST",
            url: urlconsultaclientecuenta,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ CuentaCliente: Cuenta }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                $('#CuentaCliente').val(Cuenta);
                //$('#clientecuenta').val(Cuenta);
                $('#Cedula').val(json.Cedula);
                //$('#segcuenta').val(Cuenta);
                $('#Nombre').val(json.Nombre);
                $('#Apellido').val(json.Apellido);
                $('#TelefonoTelmex').val(json.TelefonoTelmex);
                $('#Telefono1').val(json.Telefono1);
                $('#Telefono2').val(json.Telefono2);
                $('#Telefono3').val(json.Telefono3);
                $('#DirInstalacion').val(json.DirInstalacion);
                $('#DirCorrespondencia').val(json.DirCorrespondencia);
                $('#Nodo').val(json.Nodo);
                $('#Red').val(json.Red);
                $('#Division').val(json.Division);
                $('#Area').val(json.Area);
                $('#Zona').val(json.Zona);
                $('#Distrito').val(json.Distrito);
                $('#NombreComunidad').val(json.NombreComunidad);
                $('#Estrato').val(json.Estrato);
                $('#TipoCliente').val(json.TipoCliente);
                $('#Descripcion').val(json.Descripcion);
                $('#Nombre').focus();
            }
        });
       
}

function DatosClienteCedula(Cedula) {
    ds = "";
    document.getElementById('CuentasPorCedula').style.display = 'inline-block';
    $.ajax({
        type: "POST",
        url: urlconsultaclientecedula,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Cedula: Cedula }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            
            ds = new kendo.data.DataSource({
                data: [],
                data: json
            });
            
            cargargrilla();
            },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cargargrilla(Cliente) {
    
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        dataSource: ds,
        scrollable: true,
        sortable: true,
        columns: [
        { command: { text: " Seleccionar", click: ActualizarProceso, imageClass: "ion-checkmark-circled", }, title: "Seleccionar", width: "90px" },
        { field: "Cuenta", title: "Cuenta Cliente", width: 100 },
        { field: "Nombre", title: "Nombre", width: 100 },
        { field: "Apellido", title: "Apellido", width: 100 },
        { field: "DirInstalacion", title: "Dirección de Instalación", width: 100 },
        { field: "NombreComunidad", title: "Ciudad", width: 100 }
        ]
    });
  
}
function ActualizarProceso(e) {
    console.log(e);
    e.preventDefault();
            // obtenemos la fila mas cercana  // en este caso es la fila en la que se encuentra.
            var $fila = $(e.currentTarget).closest("tr");
            // se obtiene el identificador unico del item. // es el atributo "data-uid" de la fila.
            var itemUid = $fila.data("uid");
            // se busca el item en base al uid // se usa el método getByUid del kendo.data.DataSource
            var item = ds.getByUid(itemUid);
            var itemId = item.Cuenta;
            //// hacemos la fiuncion con el item ya encontrado //// de ítems seleccionados.
            e.data = [];
            e.currentTarget = [];
            finalizaconsulta();
            DatosClienteCuentaCedula(itemId);
}
    
function finalizaconsulta() {
    document.getElementById('CuentasPorCedula').style.display = 'none';

}
function LimpiarCampos() {
    $('#CuentaCliente').val("");
    $('#Cedula').val("");
    $('#Nombre').val("");
    $('#Apellido').val("");
    $('#TelefonoTelmex').val("");
    $('#Telefono1').val("");
    $('#Telefono2').val("");
    $('#Telefono3').val("");
    $('#DirInstalacion').val("");
    $('#DirCorrespondencia').val("");
    $('#Nodo').val("");
    $('#Red').val("");
    $('#Division').val("");
    $('#Area').val("");
    $('#Zona').val("");
    $('#Distrito').val("");
    $('#NombreComunidad').val("");
    $('#Estrato').val("");
    $('#TipoCliente').val("");
    $('#Descripcion').val("");
    $(":text").each(function () {
        $($(this)).val('');
        $($(this)).empty();
    });
    $('#DetalleEscalamiento').find('option:not(:first)').remove();
    $('#MotivoEscalamiento').find('option:not(:first)').remove();
    $('#RazonEscalamiento').find('option:not(:first)').remove();
    $('#SubRazonEscalamiento').find('option:not(:first)').remove();
   
}
//trae arboles de tipificacion
function TipodeEscalamientos() {
    var IdPadre = "0";
    $.ajax({
        type: "POST",
        url: urlarbolesdetipificacion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoEscalamiento').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $('#DetalleEscalamiento').find('option:not(:first)').remove();
    $('#MotivoEscalamiento').find('option:not(:first)').remove();
    $('#RazonEscalamiento').find('option:not(:first)').remove();
    $('#SubRazonEscalamiento').find('option:not(:first)').remove();
}

$('#TipoEscalamiento').change(function () {
    DetalleDeEscalamientos();
    MotivodeEscalamiento();
    RazonEscalamiento();
    SubRazonEscalamiento();
})

function DetalleDeEscalamientos() {
    var IdPadre = $('#TipoEscalamiento').val();
    if (IdPadre == "--SELECCIONE--" || IdPadre == "" || IdPadre == " ") {
        $('#DetalleEscalamiento').find('option:not(:first)').remove();
        $('#MotivoEscalamiento').find('option:not(:first)').remove();
        $('#RazonEscalamiento').find('option:not(:first)').remove();
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    } else {
        $.ajax({
            type: "POST",
            url: urlarbolesdetipificacion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#DetalleEscalamiento').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $('#DetalleEscalamiento').find('option:not(:first)').remove();
        $('#MotivoEscalamiento').find('option:not(:first)').remove();
        $('#RazonEscalamiento').find('option:not(:first)').remove();
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    }
}

$('#DetalleEscalamiento').change(function () {
    MotivodeEscalamiento();
    RazonEscalamiento();
    SubRazonEscalamiento();
})

function MotivodeEscalamiento() {
    var IdPadre = $('#DetalleEscalamiento').val();
    if (IdPadre == "--SELECCIONE--" || IdPadre == "" || IdPadre == " ") {
        $('#MotivoEscalamiento').find('option:not(:first)').remove();
        $('#RazonEscalamiento').find('option:not(:first)').remove();
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    } else
    {
        $.ajax({
            type: "POST",
            url: urlarbolesdetipificacion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#MotivoEscalamiento').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $('#MotivoEscalamiento').find('option:not(:first)').remove();
        $('#RazonEscalamiento').find('option:not(:first)').remove();
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    }
}

$('#MotivoEscalamiento').change(function () {
    RazonEscalamiento();
    SubRazonEscalamiento();
})

function RazonEscalamiento() {
    var IdPadre = $('#MotivoEscalamiento').val();
    if (IdPadre == "--SELECCIONE--" || IdPadre == "" || IdPadre == " ") {
        $('#RazonEscalamiento').find('option:not(:first)').remove();
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    } else
    {
        $.ajax({
            type: "POST",
            url: urlarbolesdetipificacion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#RazonEscalamiento').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $('#RazonEscalamiento').find('option:not(:first)').remove();
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    }
}

$('#RazonEscalamiento').change(function () {
    SubRazonEscalamiento();
})

function SubRazonEscalamiento() {
    var IdPadre = $('#RazonEscalamiento').val();
    if (IdPadre == "--SELECCIONE--" || IdPadre == "" || IdPadre == " ") {
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    }
    else {
        $.ajax({
            type: "POST",
            url: urlarbolesdetipificacion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#SubRazonEscalamiento').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $('#SubRazonEscalamiento').find('option:not(:first)').remove();
    }
}