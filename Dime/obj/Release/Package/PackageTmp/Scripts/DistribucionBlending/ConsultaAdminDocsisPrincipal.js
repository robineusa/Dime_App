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
        url: urllistaPrincipalDocsis,
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
        data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaSeguimiento = kendo.toString(kendo.parseDate(data[i].FechaSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "BasePrincipalDocsis.xlsx",
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
        { field: "Id", title: "Id Transacción", width: 100 },
        { field: "FechaGestion", title: "Fecha de Gestion", width: 100 },
        { field: "UsuarioGestion", title: "Usuario de Gestion", width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario", width: 100 },
        { field: "AliadoGestion", title: "Aliado de Gestion", width: 100, filterable: false },
        { field: "OperacionGestion", title: "Opercion Gestion", width: 100, filterable: false },
        { field: "CampanaGestion", title: "Consumos Ppv", width: 100, filterable: false },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "TipoContacto", title: "Tipo Contacto", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Cierre", title: "Cierre", width: 100 },
        { field: "Razon", title: "Razon", width: 100 },
        { field: "FechaSeguimiento", title: "Fecha Seguimiento", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        { field: "Aliado", title: "Aliado", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}
