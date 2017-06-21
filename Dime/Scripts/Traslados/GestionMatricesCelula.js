$("#interaccionesSolicitudSeleccionada").kendoGrid({
    dataSource: {
        data: jsonInteraccionesCreacionMatriz,
        pageSize: 10,
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
    { field: "IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "UsuarioTransaccion", title: "Usuario Transacción", width: 100 },
    { field: "CanalTransaccion", title: "Canal Transacción", width: 100 },
    { field: "FechaTransaccion", title: "Fecha Transacción", width: 100, template: "#= kendo.toString(kendo.parseDate(FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
    { field: "NombreLineaTransaccion", title: "Linea Transacción", width: 100 },
    { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "CuentaMatriz", title: "Cuenta Matriz", width: 100 },
    { field: "OrdenTrabajo", title: "Orden de Trabajo", width: 100 },
    { field: "Razon", title: "Razon", width: 100 },
    { field: "Subrazon", title: "Subrazon", width: 100 },
    { field: "Observacion", title: "Observaciones", width: 200 },
    { field: "EstadoTransaccion", title: "Estado Transacción", width: 100 }

    ]

});
$('#Subrazon').change(function () {
    CambiarEstado();
})
function CambiarEstado() {
    if ($("#Subrazon").val() == "AGENDADO" || $("#Subrazon").val() == "CANCELADO/DESISTE TRASLADO" || $("#Subrazon").val() == "ESCALADO" || $("#Subrazon").val() == "FUERA ZONA (UNIDIRECCIONAL)" || $("#Subrazon").val() == "INPOSIBILIDAD TECNICA" || $("#Subrazon").val() == "NO CONTACTO" || $("#Subrazon").val() == "NO DESEA AUN EL SERVICIO" || $("#Subrazon").val() == "PROBLEMA INTERNO SUSCRIPTOR" || $("#Subrazon").val() == "TRASLADO OK") {
        $("#estado").empty();
        $("#estado").append("<option>FINALIZADO</option>")

    } else
        if ($("#Subrazon").val() == "CLIENTE NO ATIENDE" || $("#Subrazon").val() == "CONSTRUCCION DE NODO" || $("#Subrazon").val() == "DIRECCION Y/O DATOS ERRADOS" || $("#Subrazon").val() == "EDIFICIO SIN ACOMETIDA" || $("#Subrazon").val() == "FALTA DE MATERIALES" || $("#Subrazon").val() == "GESTION CIERRE COMERCIAL" || $("#Subrazon").val() == "PERMISOS DE ADMINISTRACION" || $("#Subrazon").val() == "PROBLEMA REPORTADO NOC" || $("#Subrazon").val() == "REPLANTEAMIENTO VT" || $("#Subrazon").val() == "TRABAJOS DE DISENO" || $("#Subrazon").val() == "TRABAJOS DE RED EXTERNA O ACOMETIDAS" || $("#Subrazon").val() == "TRABAJOS REPLANT ACOMETIDA") {
            $("#estado").empty();
            $("#estado").append("<option>SEGUIMIENTO</option>")

        } else {
            $("#estado").empty();
            $("#estado").append("<option>--SELECCIONE--</option>")
        }
    ValidarCampos();
}

$('#estado').change(function () {
    ValidarCampos();
})

function ValidarCampos() {
    var subrazon = $('#Subrazon').val();
    var estado = $('#estado').val();

    if (subrazon != "") {
        if (estado != "") {
            document.getElementById('submitDatos').style.display = 'inline-block';
        } else {
            document.getElementById('submitDatos').style.display = 'none';
        }
       
    } else {
        document.getElementById('submitDatos').style.display = 'none';
    }
    
}