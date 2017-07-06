$(document).ready(function () {
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
});

$("#Fecha_Final").blur(function (event) {
    event.preventDefault();
    var fechaInicial = $("#Fecha_Inicial").val();
    if (fechaInicial == "") {
        $("#warningLabel").text("Debe primero introducir una fecha inicial");
        alert('Debe seleccionar una fecha Inicial');
    } else {

        CargarDatosMultiPlay();
    }



})


function CargarDatosMultiPlay() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlMultiPlayConsulta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        beforeSend: function () {
            $("#loaderDiv").show();
        },
        success: function (result) {
            var json = JSON.parse(result);
            //console.log(json);
            ShowGridMultiplay(json);
            $("#loaderDiv").hide();
        },
        error: function (data) {
            $("#loaderDiv").hide();
            var errors = data.responseJSON;
            alert(errors);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaGestionUsuario = kendo.toString(kendo.parseDate(data[i].FechaGestionUsuario, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd');
    }

}

function ShowGridMultiplay(data) {
    if (data != null) {
        cambiarfechas(data);
    }

    $("#gridViewConsultaBasePresidencial").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "BasePresidencial.xlsx",
        },
        dataSource: {
            data: data,
            schema: {
                model: {

                }
            },
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
        columns: [
            { field: "Id", title: "Id", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaGestionUsuario", title: "Fecha de Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioGestion", title: " Usuario de Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AliadoGestion", title: "Aliado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SubRegistro", title: "Sub Registro", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Cedula", title: "Cedula", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreCliente", title: "Nombre Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Observaciones", title: "Observaciones", width: 80, headerAttributes: { style: "white-space: normal" } }

        ]


    });


}