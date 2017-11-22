var BusquedaCedula = 0;
var BusquedaCuenta = "NO";
$(document).ready(function () {
});

$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    $('#Nombre').focus();
    var Cuenta = $("#CuentaCliente").val();
    if (Cuenta == "" || Cuenta == null) {
    } else { DatosClienteCuenta(Cuenta); }

});

$('#Cedula').blur(function () {
    var Cedula = $("#Cedula").val();
    if (Cedula == "" || Cedula == null || Cedula == "0") {
    } else { DatosClienteCedula(Cedula); }

})



function DatosClienteCuenta(Cuenta) {
    $.ajax({
        type: "POST",
        url: urlconsultaclientecuenta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            //$('#Cedula').prop('readonly', true);
            $('#CuentaCliente').val(json.Cuenta);
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
function DatosClienteCedula(Cedula) {
    document.getElementById('CuentasPorCedula').style.display = 'inline-block';
    $.ajax({
        type: "POST",
        url: urlconsultaclientecedula,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Cedula: Cedula }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cargargrilla(json);
            
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
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    finalizaconsulta();
    DatosClienteCuenta(dataItem.Cuenta);

}
function finalizaconsulta() {
    document.getElementById('CuentasPorCedula').style.display = 'none';

}