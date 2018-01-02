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
        url: UrlConsultaPrincipalLiberaciones,
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
        data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaSolicitud = kendo.toString(kendo.parseDate(data[i].FechaSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSeguimiento = kendo.toString(kendo.parseDate(data[i].FechaDeSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaPrincipalLiberaciones.xlsx",
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
        { field: "FechaGestion", title: "Fecha De Gestion", width: 100 },
        { field: "UsuarioDeGestion", title: "Usuario De Gestion", width: 100 },
        { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestion", width: 100 },
        { field: "CanalDeIngreso", title: "Canal De Ingreso", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "RegistroModulo", title: "Registro Modulo", width: 100 },
        { field: "UsarioEscala", title: "Usario Escala", width: 100 },
        { field: "NumeroServicios", title: "Numero Servicios", width: 100 },
        { field: "FechaSolicitud", title: "Fecha Solicitud", width: 100 },
        { field: "SolicitudModulo", title: "Solicitud Modulo", width: 100 },
        { field: "MotivoDesconexion", title: "Motivo Desconexion", width: 100 },
        { field: "Vendedor", title: "Vendedor", width: 100 },
        { field: "Grupo", title: "Grupo", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "MotivoLiberacion", title: "Motivo Liberacion", width: 100 },
        { field: "UsuarioQueLibero", title: "Usuario QueLibero", width: 100 },
        { field: "FechaSeguimiento", title: "Fecha De Seguimiento", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
