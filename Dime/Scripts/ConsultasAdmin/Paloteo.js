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

        CargarDatosGestion();
    }



})


function CargarDatosGestion() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlPaloteoConsulta,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
            ShowGridGestiones(json);
        },
        error: function (data)
        {
            var errors = data.responseJSON;
            alert(errors);
        }
    });
}

function CambiarAEstado(data) {
    for (var i = 0; i < data.length; i++) {

        if (data[i].IdEstado == "1") {
            console.log(data[i].IdEstado);
            data[i].IdEstado = "ABIERTO";
        } else {
            if (data[i].IdEstado == "2")
                data[i].IdEstado = "CERRADO";
            else data[i].IdEstado = "SEGUIMIENTO";
        }

    }

}



function ShowGridGestiones(data) {


    $("#gridViewConsulta").kendoGrid({
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
            pageSize: 10

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
        }

    });


}