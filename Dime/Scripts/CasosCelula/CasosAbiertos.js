
CambiarAEstado(dataAbiertos);

ShowGridAbiertos(dataAbiertos);



function CambiarAEstado(data) {

    for (var i = 0; i < data.length; i++) {

        if (data[i].IdEstado == "1") {
            data[i].IdEstado = "ABIERTO";
        } else {
            if (data[i].IdEstado == "2")
                data[i].IdEstado = "CERRADO";
            else data[i].IdEstado = "SEGUIMIENTO";
        }

    }

}


function ShowGridAbiertos(data) {


    $("#gridViewCasos").kendoGrid({
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
         { field: "IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
       { field: "Ticket", title: "Ticket", width: 70, headerAttributes: { style: "white-space: normal" } },
          { field: "HoraApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
          { field: "UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
             { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
               { field: "Marcacion", title: "Marcación", width: 80, headerAttributes: { style: "white-space: normal" } },
                { field: "IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
          { field: "AliadoApertura", title: "Aliado Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
          { field: "NombreLineaIngreso", title: "Linea Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
         { field: "NombreLineaEscalado", title: "Linea Escalado", width: 100, template: "#= kendo.toString(kendo.parseDate(HoraUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
            /*  {
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
    window.location.href = '../#/DepuracionCasoCelula/'+ dataItem.IdIngreso + "/" + dataItem.Marcacion;
}