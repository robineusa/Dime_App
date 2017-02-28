$("#gridViewDireccionesSeguimiento").kendoGrid({
    dataSource: {
        data: jsonDireccionesCrearSeguimiento,
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
    { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "40px" },
    { field: "IngresoTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
    { field: "IngresoTrasladoGetSet.CuentaCliente", title: "Cuenta Cliente", width: 100 },
    { field: "IngresoTrasladoGetSet.FechaApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(IngresoTrasladoGetSet.FechaApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
    { field: "IngresoTrasladoGetSet.UsuarioApertura", title: "Usr Apertura", width: 100 },
    { field: "IngresoTrasladoGetSet.EstadoTransaccion", title: "Estado Transacción", width: 100 },
    { field: "IngresoTrasladoGetSet.NombreLineaIngreso", title: "Linea Ingreso", width: 100 },
    { field: "IngresoTrasladoGetSet.NombreLineaEscalado", title: "Linea Escalado", width: 100 }
    ]

});

function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'GestionarDireccionCelula?id=' + dataItem.IngresoTrasladoGetSet.IdTransaccion;
}