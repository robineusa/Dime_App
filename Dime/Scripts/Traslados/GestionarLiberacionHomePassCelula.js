$("#interaccioneslhhpp").kendoGrid({
    dataSource: {
        data: jsonInteraccionesHHPP,
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
    { field: "CuentaOcupa", title: "Cuenta Ocupa", width: 100 },
    { field: "CuentaTraslada", title: "Cuenta Traslada", width: 100 },
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
    if ($("#Subrazon").val() == "CLIENTE QUE OCUPA AUN NO TOMA DECISION" || $("#Subrazon").val() == "CLIENTE QUE OCUPA NO BRINDA INFORMACION" || $("#Subrazon").val() == "CUENTA QUE OCUPA ESCALADA A CANCELACIONES" || $("#Subrazon").val() == "CUENTA QUE OCUPA SE TRASLADA A  MATRIZ SIN CABLEADO" || $("#Subrazon").val() == "OT CREADA CUENTA QUE OCUPA" || $("#Subrazon").val() == "NO CONTACTO CLIENTE QUE OCUPA" || $("#Subrazon").val() == "NO CONTACTO CLIENTE QUE  TRASLADA" || $("#Subrazon").val() == "CLIENTE EN MORA" || $("#Subrazon").val() == "CLIENTE QUE OCUPA SOLICITA CANCELACION  NO  ES TITULAR" || $("#Subrazon").val() == "CLIENTE QUE OCUPA SE TRASLADA  AUN NO TIENE DIRECCION" || $("#Subrazon").val() == "CUENTA QUE OCUPA  SUSPENDIDA TEMPORALMENTE") {
        $("#estado").empty();
        $("#estado").append("<option>SEGUIMIENTO</option>")
    } else
        if ($("#Subrazon").val() == "CLIENTE QUE TRASLADA DESISTE DE PROCESO" || $("#Subrazon").val() == "CLIENTE QUE TRASLADA SOLICITO CANCELACION" || $("#Subrazon").val() == "CLIENTE QUE TRASLADA  CEDIO EL CONTRATO" || $("#Subrazon").val() == "ESCALAMIENTO ERRADO" || $("#Subrazon").val() == "OT CREADA CUENTA QUE TRASLADA" || $("#Subrazon").val() == "CLIENTE QUE TRASLADA DESISTE DE PROCESO HH PP LIBRE" || $("#Subrazon").val() == "CLIENTE QUE TRASLADA DESISTE DE PROCESO HH PP OCUPADO" || $("#Subrazon").val() == "HH PP LIBRE NO CONTACTO CLIENTE QUE TRASLADA" || $("#Subrazon").val() == "MORA CUENTA QUE TRASLADA" || $("#Subrazon").val() == "TRASLADO A OTRA DIRECCION" || $("#Subrazon").val() == "TRASLADO OK" || $("#Subrazon").val() == "CUENTA ESCALADA A OTRO PROCESO") {
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