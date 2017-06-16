$.datetimepicker.setLocale('es');
$('#Fecha_Inicial').datetimepicker({
    format: 'Y-m-d',
    maxDate: '+0d',
    timepicker: false
});

$('#Fecha_Final').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
        this.setOptions({
            minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
        })
    },
    maxDate: '+0d',
    timepicker: false
});


$("#Fecha_Final").blur(function (event) {
    event.preventDefault();
    var fechaInicial = $("#Fecha_Inicial").val();
    if (fechaInicial == "") {
        $("#warningLabel").text("Debe primero introducir una fecha inicial");
    } else {

        
    }
    console.log("cambio en vacio " + fechaInicial);

    var F1 = $('#Fecha_Inicial').val();
    var F2 = $('#Fecha_Final').val();
    TraerDatosConsulta(F1, F2);
});

function TraerDatosConsulta(F1, F2) {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: ConsultaGestionTrasladosFallidos,
        contentType: "application/json; charset=utf-8",
        data: { fechaInicial: F1, fechaFinal: F2 },
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].TrasladoFallido.FechaTransaccion = kendo.toString(kendo.parseDate(data[i].TrasladoFallido.FechaTransaccion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaTrasladoFallido.xlsx",
        },
        dataSource: {
            data: data,
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
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
        { field: "TrasladoFallido.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "TrasladoFallido.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "TrasladoFallido.CanalTransaccion", title: "Canal Transaccion", width: 100, filterable: false },
        { field: "TrasladoFallido.FechaTransaccion", title: "Fecha Apertura", width: 100, filterable: false },
        { field: "TrasladoFallido.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
        { field: "TrasladoFallido.MotivoTrasladoFallido", title: "Motivo Traslado Fallido", width: 100 },
        { field: "TrasladoFallido.CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "TrasladoFallido.CuentaOcupa", title: "Cuenta Ocupa", width: 100 },
        { field: "TrasladoFallido.CuentaTraslada", title: "Cuenta Traslada", width: 100 },
        { field: "TrasladoFallido.CuentaMatriz", title: "Cuenta Matriz", width: 100 },
        { field: "TrasladoFallido.NombreConjunto", title: "Nombre Conjunto", width: 100, filterable: false },
        { field: "TrasladoFallido.EstadoMatriz", title: "Estado Matriz", width: 100, filterable: false },
        { field: "TrasladoFallido.Direccion", title: "Direccion", width: 100, filterable: false },
        { field: "TrasladoFallido.NombreDepartamento", title: "Departamento", width: 100, filterable: false },
        { field: "TrasladoFallido.NombreComunidad", title: "Nombre Comunidad", width: 100, filterable: false },
        { field: "TrasladoFallido.Comunidad", title: "Comunidad", width: 100, filterable: false },
        { field: "TrasladoFallido.Red", title: "Red", width: 100, filterable: false },
        { field: "TrasladoFallido.EstratoOrigen", title: "Estrato Origen", width: 100, filterable: false },
        { field: "TrasladoFallido.EstratoDestino", title: "Estrato Destino", width: 100, filterable: false },
        { field: "TrasladoFallido.TarifaActual", title: "Tarifa Actual", width: 100, filterable: false },
        { field: "TrasladoFallido.TarifaNueva", title: "Tarifa Nueva", width: 100, filterable: false },
        { field: "TrasladoFallido.GestionPorTraslado", title: "Gestion Por Traslado", width: 100, filterable: false },
        { field: "TrasladoFallido.Nodo", title: "Nodo", width: 100 },
        { field: "TrasladoFallido.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
        { field: "TrasladoFallido.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
        { field: "TrasladoFallido.CorreoElectronico", title: "Correo Electronico", width: 100 },
        { field: "TrasladoFallido.Observacion", title: "Observacion", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}