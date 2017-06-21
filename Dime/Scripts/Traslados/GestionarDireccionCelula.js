$("#interaccionesSolicitudSeleccionada").kendoGrid({
    dataSource: {
        data: jsonInteraccionesDireccion,
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
$('#selectsubrazon').change(function () {
    ValidarCampos();
})
$('#selectestado').change(function () {
    ValidarCampos();
})

function ValidarCampos() {
    var subrazon = $('#selectsubrazon').val();
    var estado = $('#selectestado').val();

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