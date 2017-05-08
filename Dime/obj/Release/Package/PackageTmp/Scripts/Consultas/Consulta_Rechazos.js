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
    } else {

        CargarDatos();
    }
    console.log("cambio en vacio " + fechaInicial);


})


function CargarDatos() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlConsulta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            ShowGridRechazos(json);
        }

    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaCreacionCaso = kendo.toString(kendo.parseDate(data[i].FechaCreacionCaso, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        data[i].FechaRechazo = kendo.toString(kendo.parseDate(data[i].FechaRechazo, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        data[i].HoraCreacionCaso = kendo.toString(kendo.parseDate(data[i].HoraCreacionCaso, 'MM/dd/yyyy HH:mm:ss tt'), 'HH:mm:ss');
        data[i].HoraRechazo = kendo.toString(kendo.parseDate(data[i].HoraRechazo, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');

    }

}


function ShowGridRechazos(data) {


    if (data != null) {
        cambiarfechas(data);
    }

    $("#gridViewConsultaRechazos").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "Export.xlsx",
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
            { field: "AliadoUsuarioRechaza", title: "Aliado Usuario Rechaza", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaCreacionCaso", title: "Fecha Creacion Caso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaRechazo", title: " Fecha Rechazo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "HoraCreacionCaso", title: "Hora Creacion Caso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "HoraRechazo", title: "Hora Rechazo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreLineaUsuarioRechaza", title: "NombreLineaUsuarioRechaza", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreUsuarioCreacion", title: "Nombre Usuario Creacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreUsuarioRechaza", title: "Nombre Usuario Rechaza", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NotasRechazo", title: "Notas Rechazo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioCreacionCaso", title: "Usuario", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioRechaza", title: "Usuario Rechaza", width: 80, headerAttributes: { style: "white-space: normal" } },
                ]

      
    });


}