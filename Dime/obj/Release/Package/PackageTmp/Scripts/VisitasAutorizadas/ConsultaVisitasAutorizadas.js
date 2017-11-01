$.datetimepicker.setLocale('es');
$('#Fecha_Inicial').datetimepicker({
    format: 'Y-m-d',
    timepicker: false
});

$('#Fecha_Final').datetimepicker({
    format: 'Y-m-d',
    onShow: function (ct) {
        this.setOptions({
            minDate: $('#Fecha_Inicial').val() ? $('#Fecha_Inicial').val() : false
        })
    },
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
        url: UrlConsultaAdministradorVisitasJson,
        contentType: "application/json; charset=utf-8",
        data: { F1: F1, F2: F2 },
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
        data[i].FechaRegistro = kendo.toString(kendo.parseDate(data[i].FechaRegistro, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
       
    }

}
function cargargrilla(data) {
    console.log(data);
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaVisitasAutorizadas.xlsx",
        },
        dataSource: {
            data: data,
            pageSize: 20,
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
        { field: "IdVisita", title: "Id Visita", width: 100 },
        { field: "FechaRegistro", title: "Fecha Registro", width: 100 },
        { field: "UsuarioRegistro", title: "Usuario Registro", width: 100 },
        { field: "AliadoRegistro", title: "Aliado Registro", width: 100 },
        { field: "OperacionRegistro", title: "Operacion Registro", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "LlamadaServicio", title: "Llamada Servicio", width: 100 },
        { field: "Aviso", title: "Aviso", width: 100 },
        { field: "Motivo", title: "Motivo", width: 100 },
        { field: "CedulaUsuarioGestion", title: "Cedula Usuario Gestion", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
