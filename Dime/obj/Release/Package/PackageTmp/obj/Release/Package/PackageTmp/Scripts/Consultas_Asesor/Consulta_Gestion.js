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
    if (fechaInicial == "")
    {
        $("#warningLabel").text("Debe primero introducir una fecha inicial");
    } else {
            
        CargarDatosGestion();
          }
    console.log("cambio en vacio " + fechaInicial);
    

})


function CargarDatosGestion()
{
   
    var fechaInicial = $("#Fecha_Inicial").val();
    var fechaFinal = $("#Fecha_Final").val();
    $.ajax({
        type: "POST",
        url: urlConsultaGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ fechaInicial: fechaInicial , fechaFinal: fechaFinal }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
            ShowGridGestiones(json);
        }

    });
}

function CambiarAEstado(data)
{
    for (var i = 0; i < data.length; i++)
    {
       
        if (data[i].Ingreso.IdEstado == "1")
        {
            console.log(data[i].Ingreso.IdEstado);
            data[i].Ingreso.IdEstado = "ABIERTO";
        } else {
            if (data[i].Ingreso.IdEstado == "2")
                data[i].Ingreso.IdEstado = "CERRADO";
            else data[i].Ingreso.IdEstado = "SEGUIMIENTO";
              }
            
    }

}




function ShowGridGestiones(data) {
    $("#gridViewConsultaGestion").empty();
    $("#gridViewConsultaGestion").kendoGrid({
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
               { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "80px" },
         { field: "Ingreso.IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Ingreso.Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Ingreso.Ticket", title: "Ticket", width: 70, headerAttributes: { style: "white-space: normal" } },
           { field: "Ingreso.NombreLineaIngreso", title: "Linea Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Ingreso.NombreLineaEscalado", title: "Linea Escalado", width: 80, headerAttributes: { style: "white-space: normal" } },
             { field: "Ingreso.AliadoApertura", title: "Aliado Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Ingreso.HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(Ingreso.HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
             { field: "Ingreso.FechaCierre", title: "Fecha Cierre", width: 100, template: "#= kendo.toString(kendo.parseDate(Ingreso.FechaCierre, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
                  { field: "Ingreso.UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
                { field: "Ingreso.UsuarioCierre", title: "Usuario Cierre", width: 80, headerAttributes: { style: "white-space: normal" } },
                    { field: "Ingreso.HoraUltimaActualizacion", title: "Fecha Ultima Actualización", width: 100, template: "#= kendo.toString(kendo.parseDate(Ingreso.HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
                  { field: "Ingreso.UsuarioUltimaActualizacion", title: "Usuario Ultima Actualización", width: 80, headerAttributes: { style: "white-space: normal" } },
                   { field: "Ingreso.Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
                    { field: "Ingreso.Marcacion", title: "Marcación", width: 80, headerAttributes: { style: "white-space: normal" } },
                     { field: "Ingreso.IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
                      { field: "NotaIngreso.FechaNota", title: "Fecha Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
                       { field: "NotaIngreso.Nota", title: "Nota", width: 80, headerAttributes: { style: "white-space: normal" } },
                       { field: "NotaIngreso.Usuario", title: "Usuario Nota", width: 80, headerAttributes: { style: "white-space: normal" } }
         //{ field: "HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
       /*  { field: "UsuarioApertura", title: "Usr Apertura", width: 100 },
         { field: "HoraUltimaActualizacion", title: "Fe. Ult Actualización", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
         { field: "UsuarioUltimaActualizacion", title: "Usr. Ult Actualización", width: 120 },
         { field: "Macroproceso", title: "Macroproceso", width: 100 },
         { field: "Marcacion", title: "Marcación", width: 100 },
         { field: "IdEstado", title: "Estado", width: 100 },
        { field: "Semaforo", title: "Semaforo", width: 80 }*/
        ]

    });


}


function ActualizarCaso(e) {
    e.preventDefault();
    var cuentaActual = $("#inputCuenta").val();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '/Inbound/Actualizar?id=' + dataItem.Ingreso.IdIngreso + "&nombMarcacion=" + dataItem.Ingreso.Marcacion;
}