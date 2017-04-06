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
        },
        columns: [
            { field: "AliadoApertura", title: "Aliado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Area", title: "Area", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "CuentaCliente", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Distrito", title: "Distrito", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Division", title: "Division", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Estado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "FechaInteraccion", title: "Fecha Interaccion", width: 80, template: "#= kendo.toString(kendo.parseDate(FechaInteraccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
            { field: "HoraInteraccion", title: "Hora Interaccion", template: "#= kendo.toString(kendo.parseDate(HoraInteraccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "LlamadaCliente", title: "Llamada Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Marcacion", title: "Marcacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Nodo", title: "Nodo", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreComunidad", title: "Nombre Comunidad", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreLineaNota", title: "Nombre LineaNota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreUsuarioNota", title: "Nombre UsuarioNota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Nota", title: "Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "RolUsuarioNota", title: "Rol Usuario Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Ticket", title: "Ticket", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioNota", title: "Usuario Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Zona", title: "Zona", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
        ]
    });


}