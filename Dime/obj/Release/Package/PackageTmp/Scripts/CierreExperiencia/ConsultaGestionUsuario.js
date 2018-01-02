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
        url: UrlConsultaDesconexionesAgente,
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
        data[i].FechaDeTransaccion = kendo.toString(kendo.parseDate(data[i].FechaDeTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSolicitud = kendo.toString(kendo.parseDate(data[i].FechaDeSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeCorte = kendo.toString(kendo.parseDate(data[i].FechaDeCorte, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDePreaviso = kendo.toString(kendo.parseDate(data[i].FechaDePreaviso, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeAsignacion = kendo.toString(kendo.parseDate(data[i].FechaDeAsignacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSeguimiento = kendo.toString(kendo.parseDate(data[i].FechaDeSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaDeGestion.xlsx",
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
        { command: { text: " Editar", click: ActualizarCasoSeg, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "100px" },
        { field: "IdTransaccion", title: "Id Transaccion", width: 100 },
        { field: "IdGestion", title: "Id Gestion", width: 100 },
        { field: "FechaDeTransaccion", title: "Fecha De Transaccion", width: 100 },
        { field: "UsuarioDeTransaccion", title: "Usuario De Transaccion", width: 100 },
        { field: "NombreUsuarioTransaccion", title: "Nombre Usuario Transaccion", width: 100 },
        { field: "CanalDeIngreso", title: "Canal De Ingreso", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "Nota1", title: "Nota1", width: 100 },
        { field: "Nota2", title: "Nota2", width: 100 },
        { field: "FechaDeSolicitud", title: "Fecha De Solicitud", width: 100 },
        { field: "FechaDeCorte", title: "Fecha De Corte", width: 100 },
        { field: "FechaDePreaviso", title: "Fecha De Preaviso", width: 100 },
        { field: "FechaDeAsignacion", title: "Fecha De Asignacion", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "FechaDeSeguimiento", title: "Fecha De Seguimiento", width: 100 },
        { field: "MovieLetter", title: "Movie Letter", width: 100 },
        { field: "Ajuste", title: "Ajuste", width: 100 },
        { field: "CantidadServicio", title: "Cantidad de Servicios", width: 100 },
        { field: "ErrorSolicitud", title: "Error Solicitud", width: 100 },
        { field: "UsuarioSolicitud", title: "Usuario Solicitud", width: 100 },
        { field: "TipoDeError", title: "Tipo De Error", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarCasoSeg(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var seg = "Ture";
    window.location.href = 'DesconexionesIn?IdGestion=' + dataItem.IdGestion;
}