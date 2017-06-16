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
        url: ConsultaGestionCambioEstrato,
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
        data[i].NotaTrasladoGetSet.FechaTransaccion = kendo.toString(kendo.parseDate(data[i].NotaTrasladoGetSet.FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaGestionCambioEstrato.xlsx",
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
        { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "60px" },
        { field: "NotaTrasladoGetSet.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "NotaTrasladoGetSet.CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "NotaTrasladoGetSet.CanalTransaccion", title: "Canal Transacción", width: 100 },
        { field: "NotaTrasladoGetSet.UsuarioTransaccion", title: "Usr Transacción", width: 100 },
        { field: "NotaTrasladoGetSet.FechaTransaccion", title: "Fecha Transacción", width: 100 },
        { field: "NotaTrasladoGetSet.EstadoTransaccion", title: "Estado Transacción", width: 100 },
        { field: "NotaTrasladoGetSet.Razon", title: "Razon", width: 100 },
        { field: "NotaTrasladoGetSet.Subrazon", title: "Subrazon", width: 100 },
        { field: "NotaTrasladoGetSet.Observacion", title: "Observación", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
    
}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    e.preventDefault();
   
    if (dataItem.NotaTrasladoGetSet.Razon == "GESTION BACKOFFICE") {
        window.location.href = 'GestionarCambioDeEstratoCelula?id=' + dataItem.NotaTrasladoGetSet.IdTransaccion;
    }
    else if (dataItem.NotaTrasladoGetSet.Razon == "SOLICITUD INBOUND") {
        window.location.href = 'ConsultaGestionCambioDeEstrato';
    }
}
