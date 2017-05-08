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
    console.log("cambio en vacio " + fechaInicial);


})


function CargarDatosGestion() {

    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlConsultaGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial, fechaFinal: fechaFinal }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
            CambiarFechas(json)
            ShowGridGestiones(json);
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

function CambiarFechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaNota = kendo.toString(kendo.parseDate(data[i].HoraNota, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd');
        data[i].HoraNota = kendo.toString(kendo.parseDate(data[i].HoraNota, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');
        data[i].FechaApertura = kendo.toString(kendo.parseDate(data[i].FechaApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd');


    }
}

function ShowGridGestiones(data) {


    $("#gridViewResult").kendoGrid({

        toolbar: ["excel"],
        excel: {
            fileName: "Export.xlsx",
        },
        dataSource: {
            data: data,
            pageSize: 10,

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
          { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "70px" },
         { field: "IdNota", title: "Id Interacción", width: 80, headerAttributes: { style: "white-space: normal" } },
          { field: "IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
    { field: "HoraNota", title: "Hora Interacción", width: 100, headerAttributes: { style: "white-space: normal" } },
        { field: "FechaNota", title: "Fecha Interacción", width: 100, headerAttributes: { style: "white-space: normal" } },
      { field: "Usuario", title: "Usuario Interacción", width: 70, headerAttributes: { style: "white-space: normal" } },
     { field: "Nota", title: "Nota", width: 70, headerAttributes: { style: "white-space: normal" } },
           { field: "CuentaCliente", title: "Cuenta Cliente", width: 80, headerAttributes: { style: "white-space: normal" } },
              { field: "FechaApertura", title: "Fecha Apertura", width: 100, headerAttributes: { style: "white-space: normal" } },
             { field: "UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
           { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
               { field: "Marcacion", title: "Marcación", width: 80, headerAttributes: { style: "white-space: normal" } },
                    { field: "NombreLineaIngreso", title: "Nombre Linea Ingreso", width: 100, headerAttributes: { style: "white-space: normal" } },
                       { field: "IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
                          { field: "NombreLineaEscalado", title: "Nombre Linea Escalado", width: 80, headerAttributes: { style: "white-space: normal" } },
                       /* {
                            field: "icon",
                            title: "Semáforo",
                            template: '<img src="../../Resources/Images/#=Semaforo#" alt="image" style="width:50px; height:50px;"/>',
                            width: 70,
                            filterable: false, headerAttributes: { style: "white-space: normal" }
                        }*/
                        
        ]

    });




}

function ActualizarCaso(e) {
    e.preventDefault();
    var cuentaActual = $("#inputCuenta").val();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../#/DepuracionCasoCelula/' + dataItem.IdIngreso + "/" + dataItem.Marcacion;

}