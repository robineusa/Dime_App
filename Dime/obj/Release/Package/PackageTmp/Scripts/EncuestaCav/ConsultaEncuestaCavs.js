﻿$.datetimepicker.setLocale('es');
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
        url: UrlConsultaEncuestaCavs,
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
        data[i].FechaTransaccion = kendo.toString(kendo.parseDate(data[i].FechaTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');

    }

}
function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "EncuestasCavs.xlsx",
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
            pageSizes: true,
            buttonCount: 5
        },
        columns: [
        { field: "IdTansaccion", title: "Id Tansaccion", width: 100 },
        { field: "FechaTransaccion", title: "Fecha de Transaccion", width: 100 },
        { field: "UsuarioTransaccion", title: "Usuario Transaccion", width: 100 },
        { field: "CanalTransaccion", title: "Canal Transaccion", width: 100 },
        { field: "ZonaTransaccion", title: "Zona Transaccion", width: 100 },
        { field: "TelefonoCeluar", title: "Telefono Celuar", width: 100 },
        { field: "TelefonoDeContacto", title: "Telefono De Contacto", width: 100 },
        { field: "CorreoElectronico", title: "Correo Electronico", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "Operacion", title: "Operacion", width: 100 },
        { field: "TokenId", title: "TokenId", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
