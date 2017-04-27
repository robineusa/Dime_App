


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
        url: urllistacambiestrato,
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
        data[i].CambioEstrato.FechaTransaccion = kendo.toString(kendo.parseDate(data[i].CambioEstrato.FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaCambioEstrato.xlsx",
        },
        dataSource: {
            data: data
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
        { field: "CambioEstrato.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "CambioEstrato.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "CambioEstrato.CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "CambioEstrato.CanalTransaccion", title: "canal Transaccion", width: 100, filterable: false },
        { field: "CambioEstrato.FechaTransaccion", title: "Fecha Apertura", width: 100, filterable: false },
        { field: "CambioEstrato.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
        { field: "CambioEstrato.Direccion", title: "Direccion a Crear", width: 100, filterable: false },
        { field: "CambioEstrato.Estrato", title: "Estrato", width: 100, filterable: false },
        { field: "CambioEstrato.Nodo", title: "Nodo", width: 100 },
        { field: "CambioEstrato.TelefonoCelular", title: "Telefono Celular", width: 100, filterable: false },
        { field: "CambioEstrato.TelefonoFijo", title: "Telefono Fijo", width: 100, filterable: false },
        { field: "CambioEstrato.Razon", title: "Razon", width: 100 },
        { field: "CambioEstrato.Subrazon", title: "Subrazon", width: 100 },
        { field: "CambioEstrato.Observacion", title: "Observacion", width: 100 },
        { field: "CambioEstrato.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
        { field: "CambioEstrato.UsuarioBackOffice", title: "Usuario BackOffice", width: 100 },
        { field: "CambioEstrato.CorreoElectronico", title: "Correo Electronico", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}
