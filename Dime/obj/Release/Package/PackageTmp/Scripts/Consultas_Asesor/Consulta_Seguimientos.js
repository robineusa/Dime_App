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
    SetearEstadoHistoricos(dataSegumientos);
    ShowGridSeguimientos(dataSegumientos);

});


function SetearEstadoHistoricos(dataUp) {
    for (var i = 0; i < dataUp.length; i++) {
        if (dataUp[i].IdEstado == 1) {
            dataUp[i].IdEstado = "ABIERTO";
        } else {
            if (dataUp[i].IdEstado == 2) {
                dataUp[i].IdEstado = "CERRADO";
            } else {

                dataUp[i].IdEstado = "SEGUIMIENTO";
            }
        }

    }

};


function ShowGridSeguimientos(data) {
   
     
    $("#gridViewConsultaSeguimientos").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "Export.xlsx",
        },
        dataSource: {
            data: data,
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
      { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "80px" },
     { field: "IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
   { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
   { field: "Ticket", title: "Ticket", width: 70, headerAttributes: { style: "white-space: normal" } },
        { field: "HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
         { field: "FechaCierre", title: "Fecha Cierre", width: 100, template: "#= kendo.toString(kendo.parseDate(FechaCierre, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
              { field: "UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioCierre", title: "Usuario Cierre", width: 80, headerAttributes: { style: "white-space: normal" } },
                { field: "HoraUltimaActualizacion", title: "Fecha Ultima Actualización", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
              { field: "UsuarioUltimaActualizacion", title: "Usuario Ultima Actualización", width: 80, headerAttributes: { style: "white-space: normal" } },
               { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
                { field: "Marcacion", title: "Marcación", width: 80, headerAttributes: { style: "white-space: normal" } },
                 { field: "IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } } 
        ]


    });


}


function ActualizarCaso(e) {
    e.preventDefault();
    var cuentaActual = $("#inputCuenta").val();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../Inbound/Actualizar?id=' + dataItem.IdIngreso + "&nombMarcacion=" + dataItem.Marcacion;
}