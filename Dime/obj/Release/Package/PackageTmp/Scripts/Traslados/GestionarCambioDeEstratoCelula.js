$("#InteraccionesCambiodeEstrato").kendoGrid({
    dataSource: {
        data: jsonInteraccionesCambioEstrato,
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
    if ($("#Subrazon").val() == "ARCHIVO BORROSO" || $("#Subrazon").val() == "CUENTA DESCONECTADA" || $("#Subrazon").val() == "DATOS ERRADOS" || $("#Subrazon").val() == "DIRECCION NO COINCIDE" || $("#Subrazon").val() == "ESTRATO YA ASIGNADO" || $("#Subrazon").val() == "HHPP COMERCIAL" || $("#Subrazon").val() == "NO ADJUNTA ARCHIVO" || $("#Subrazon").val() == "NO CONTACTO PARA ENVIO DE SOPORTE" || $("#Subrazon").val() == "OT ABIERTA" || $("#Subrazon").val() == "SOPORTE INCOMPLETO" || $("#Subrazon").val() == "SUPERA FECHA DE EXPEDICION") {
        $("#estado").empty();
        $("#estado").append("<option>SEGUIMIENTO</option>")
    }else 
        if ($("#Subrazon").val() == "DESISTE DE TRASLADO" || $("#Subrazon").val() == "NO COBERTURA" || $("#Subrazon").val() == "NO RESPONDE PLANTILLA" || $("#Subrazon").val() == "PROCESO MATRIZ" || $("#Subrazon").val() == "TRASLADO OK" ) {
            $("#estado").empty();
            $("#estado").append("<option>FINALIZADO</option>")
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