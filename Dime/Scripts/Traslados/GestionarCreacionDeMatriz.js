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
    { field: "CuentaMatriz", title: "Cuenta Cliente", width: 100 },
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
    if ($("#Subrazon").val() == "SE RESCALA POR ERROR EN GESTION" || $("#Subrazon").val() == "SE ENVIA CREACION DE MATRIZ") {
        $("#estado").empty();
        $("#estado").append("<option>SEGUIMIENTO</option>")
        $("#cuentamatriz").prop('readonly', true); document.getElementById('cuentamatriz').style.background = "#EEE";
        $("#ordendetrabajo").prop('readonly', true); document.getElementById('ordendetrabajo').style.background = "#EEE";
    } else
        if ($("#Subrazon").val() == "SE CREO MATRIZ CORRECTAMENTE") {
            $("#estado").empty();
            $("#estado").append("<option>PENDIENTE POR GESTIONAR</option>")
            alert('Recuerda que al crear la Matriz debes llenar la informacion de Cuenta Matriz y Orden de Trabajo');
            $('#cuentamatriz').prop('readonly', false); document.getElementById('cuentamatriz').style.background = "rgba(215, 44, 44, 0.3)";
            $("#ordendetrabajo").prop('readonly', false); document.getElementById('ordendetrabajo').style.background = "rgba(215, 44, 44, 0.3)";
        } else
            if ($("#Subrazon").val() == "DATOS ERRADOS" || $("#Subrazon").val() == "MATRIZ DUPLICADA" || $("#Subrazon").val() == "NO HAY COBERTURA") {
                $("#estado").empty();
                $("#estado").append("<option>FINALIZADO</option>")
                $("#cuentamatriz").prop('readonly', true); document.getElementById('cuentamatriz').style.background = "#EEE";
                $("#ordendetrabajo").prop('readonly', true); document.getElementById('ordendetrabajo').style.background = "#EEE";
            }
            else {
                $("#estado").empty();
                $("#estado").append("<option>--SELECCIONE--</option>")
                $("#cuentamatriz").prop('readonly', true); document.getElementById('cuentamatriz').style.background = "#EEE";
                $("#ordendetrabajo").prop('readonly', true); document.getElementById('ordendetrabajo').style.background = "#EEE";
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