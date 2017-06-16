﻿


$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: urlConsultaCasosAbiertos,
        dataType: 'json',
        success: function (result) {
            CambiarAEstado(result);
            cambiarfechas(result)
            ShowGridAbiertos(result);
        }
    });

});

  

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


    function cambiarfechas(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].HoraApertura = kendo.toString(kendo.parseDate(data[i].HoraApertura, 'yyyy-MM-ddTHH:mm:ss'), 'HH:mm:ss');
            data[i].FechaApertura = kendo.toString(kendo.parseDate(data[i].FechaApertura, 'yyyy-MM-dd'), 'yyyy-MM-dd');
        }

    }

    function ShowGridAbiertos(data) {


        $("#gridViewCasos").kendoGrid({
            autoBind: true,
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
             { field: "IdIngreso", title: "Id Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
           { field: "Cuenta", title: "Cuenta", width: 80, headerAttributes: { style: "white-space: normal" } },
           { field: "Ticket", title: "Ticket", width: 70, headerAttributes: { style: "white-space: normal" } },
              { field: "FechaApertura", title: "Fecha Apertura", width: 100, headerAttributes: { style: "white-space: normal" } },
                 { field: "HoraApertura", title: "Hora Apertura", width: 75, headerAttributes: { style: "white-space: normal" } },
              { field: "UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
                 { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
                   { field: "Marcacion", title: "Marcación", width: 80, headerAttributes: { style: "white-space: normal" } },
                    { field: "IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } },
              { field: "AliadoApertura", title: "Aliado Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
              { field: "NombreLineaIngreso", title: "Linea Ingreso", width: 80, headerAttributes: { style: "white-space: normal" } },
             { field: "NombreLineaEscalado", title: "Linea Escalado", width: 80, headerAttributes: { style: "white-space: normal" } }
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