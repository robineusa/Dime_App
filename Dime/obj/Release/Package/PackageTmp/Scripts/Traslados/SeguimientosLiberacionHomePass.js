$(document).ready(function () {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: SegLiberacionesJson,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            
            if (json != null) {


            }


            EjecutarConsultas(json);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
});
function EjecutarConsultas(data) {
    ShowGrid(data);
    finalizaconsulta();
}

function ShowGrid(data) {
    $("#gridViewLiberacionesSeguimiento").kendoGrid({
        dataSource: {
            data: data,
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
        { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "60px" },
        { field: "IngresoTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "IngresoTrasladoGetSet.CuentaCliente", title: "Cuenta Ocupa", width: 100 },
        { field: "LiberacionHomePass.CuentaTraslada", title: "Cuenta Traslada", width: 100 },
        { field: "IngresoTrasladoGetSet.FechaApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(IngresoTrasladoGetSet.FechaApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
        { field: "IngresoTrasladoGetSet.HoraUltimaActualizacion", title: "Fecha Actualizacion", width: 100, template: "#= kendo.toString(kendo.parseDate(IngresoTrasladoGetSet.HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
        { field: "IngresoTrasladoGetSet.UsuarioApertura", title: "Usr Apertura", width: 100 },
        { field: "IngresoTrasladoGetSet.EstadoTransaccion", title: "Estado Transacción", width: 100 },
        { field: "IngresoTrasladoGetSet.NombreLineaIngreso", title: "Linea Ingreso", width: 100 },
        { field: "IngresoTrasladoGetSet.NombreLineaEscalado", title: "Linea Escalado", width: 100 },
        { field: "LiberacionHomePass.MotivoLiberacion", title: "Motivo Liberación", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'GestionarLiberacionHomePassCelula?id=' + dataItem.IngresoTrasladoGetSet.IdTransaccion;
}