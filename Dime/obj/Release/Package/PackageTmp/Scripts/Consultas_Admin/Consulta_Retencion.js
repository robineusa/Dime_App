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

        CargarDatosRetencion();
    }



})


function CargarDatosRetencion() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlRetencionConsulta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        beforeSend: function () {
            $("#loaderDiv").show();
        },
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            ShowGridRetencion(json);
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
        data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd');
    }

}

function ShowGridRetencion(data) {
    if (data != null) {
        cambiarfechas(data);
    }

    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "Retencion.xlsx",
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
            { field: "FechaGestion", title: "Fecha de Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioGestion", title: " Usuaior de Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreUsuarioGestion", title: "Nombre Usuario Gestión", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AliadoGestion", title: "Aliado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Razon", title: "Razón", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "SubRazon", title: "Subrazón", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Observaciones", title: "Observaciones", width: 80, headerAttributes: { style: "white-space: normal" } }
            
        ]


    });


}
