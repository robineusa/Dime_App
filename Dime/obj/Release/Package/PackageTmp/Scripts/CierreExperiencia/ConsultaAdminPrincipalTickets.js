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
        url: UrlConsultaPrincipalTickets,
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
        data[i].FechaDeGestion = kendo.toString(kendo.parseDate(data[i].FechaDeGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeCreacion = kendo.toString(kendo.parseDate(data[i].FechaDeCreacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSeguimiento = kendo.toString(kendo.parseDate(data[i].FechaDeSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeCancelacion = kendo.toString(kendo.parseDate(data[i].FechaDeCancelacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaPrincipalTickets.xlsx",
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
        { field: "IdGestion", title: "Id Gestion", width: 100 },
        { field: "FechaDeGestion", title: "Fecha De Gestion", width: 100 },
        { field: "UsuarioDeGestion", title: "Usuario De Gestion", width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", width: 100 },
        { field: "CanaldeIngreso", title: "Canal De Ingreso", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "NumeroDeTicket", title: "Numero De Ticket", width: 100 },
        { field: "UsuarioDeCreacion", title: "Usuario De Creacion", width: 100 },
        { field: "FechaDeCreacion", title: "Fecha De Creacion", width: 100 },
        { field: "Srcaus", title: "Srcaus", width: 100 },
        { field: "Srreas", title: "Srreas", width: 100 },
        { field: "Nota1", title: "Nota1", width: 100 },
        { field: "Nota2", title: "Nota2", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Razon", title: "Razon", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "Ajuste", title: "Ajuste", width: 100 },
        { field: "FechaDeSeguimiento", title: "Fecha De Seguimiento", width: 100 },
        { field: "FechaDeCancelacion", title: "Fecha De Cancelacion", width: 100 },
        { field: "MarcacionCancelacion", title: "Marcacion Cancelacion", width: 100 },
        { field: "UsuarioDeCancelacion", title: "Usuario De Cancelacion", width: 100 },
        { field: "UsuarioDeRetencion", title: "Usuario De Retencion", width: 100 },
        { field: "ServiciosDesconectados", title: "Servicios Desconectados", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
