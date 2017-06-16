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
        url: urlgestionmatriceslista,
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
        data[i].GestionMatriz.FechaTransaccion = kendo.toString(kendo.parseDate(data[i].GestionMatriz.FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsulaGestionMatrices.xlsx",
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
        { field: "GestionMatriz.IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "GestionMatriz.UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "GestionMatriz.CanalTransaccion", title: "Canal Transaccion", width: 100, filterable: false },
        { field: "GestionMatriz.FechaTransaccion", title: "Fecha Apertura", width: 100, filterable: false },
        { field: "GestionMatriz.NombreLineaTransaccion", title: "Linea Transaccion", width: 100 },
        { field: "GestionMatriz.TipoGestionMatriz", title: "Tipo Gestion Matriz", width: 100 },
        { field: "GestionMatriz.TipoCliente", title: "Tipo Cliente", width: 100 },
        { field: "GestionMatriz.CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "GestionMatriz.CuentaMatriz", title: "Cuenta Matriz", width: 100 },
        { field: "GestionMatriz.OrdenTrabajo", title: "Orden de Trabajo", width: 100 },
        { field: "GestionMatriz.Direccion", title: "Direccion", width: 100, filterable: false },
        { field: "GestionMatriz.Nodo", title: "Nodo", width: 100 },
        { field: "GestionMatriz.NombreConjuntoEdificio", title: "Conjunto Edificio", width: 100 },
        { field: "GestionMatriz.TelefonoCLiente", title: "Telefono Cliente", width: 100, filterable: false },
        { field: "GestionMatriz.TelefonoAdministrador", title: "Telefono Administrador", width: 100, filterable: false },
        { field: "GestionMatriz.NombreAdministrador", title: "Nombre Administrador", width: 100, filterable: false },
        { field: "GestionMatriz.Razon", title: "Razon", width: 100 },
        { field: "GestionMatriz.Subrazon", title: "Subrazon", width: 100 },
        { field: "GestionMatriz.Observacion", title: "Observacion", width: 100 },
        { field: "GestionMatriz.EstadoTransaccion", title: "Estado Transaccion", width: 100 },
        { field: "GestionMatriz.UsuarioBackOfficeCreacion", title: "Usuario BackOffice Creacion", width: 100 },
        { field: "GestionMatriz.UsuarioBackOfficeGestion", title: "Usuario BackOffice Gestion", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}

