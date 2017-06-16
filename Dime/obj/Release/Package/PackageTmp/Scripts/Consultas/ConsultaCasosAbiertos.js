$("#cuentaCliente").on("keyup", function (e) {
    $("#idIngreso").val('');
    $("#ticketRR").val('');
    $("#usuarioCreacion").val('');
    var code = e.keyCode || e.which;
    if(code == 13)
    {
        var dato = $("#cuentaCliente").val();
        CargarDatosDeCuenta(dato);
    }

})
$("#idIngreso").on("keyup", function (e) {
    $("#cuentaCliente").val('');
    $("#ticketRR").val('');
    $("#usuarioCreacion").val('');
    var code = e.keyCode || e.which;
    if (code == 13) {
        var dato = $("#idIngreso").val();
        CargarDatosDeIdIngreso(dato);
    }

})

$("#ticketRR").on("keyup", function (e) {
    $("#cuentaCliente").val('');
    $("#idIngreso").val('');
    $("#usuarioCreacion").val('');
    var code = e.keyCode || e.which;
    if (code == 13) {
        var dato = $("#ticketRR").val();
        CargarDatosDeTicket(dato);
    }

})

$("#usuarioCreacion").on("keyup", function (e) {
    $("#cuentaCliente").val('');
    $("#idIngreso").val('');
    $("#ticketRR").val('');
    var code = e.keyCode || e.which;
    if (code == 13) {
        var dato = $("#usuarioCreacion").val();
        CargarDatosDeUsuarioCreacion(dato);
    }

})

function CargarDatosDeCuenta(cuentaCliente) {
        $.ajax({
            type: "POST",
            url: urlConsultaCuenta,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ cuenta: cuentaCliente }),
            dataType: "json",
            success: function (result) {
                var json = JSON.parse(result);
                console.log(json);
                CambiarAEstado(json);
                ShowGridGestiones(json);
            }

        });
}

function CargarDatosDeIdIngreso(ingresoId) {

    $.ajax({
        type: "POST",
        url: urlConsultaIdIngreso,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idIngreso: ingresoId}),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
            ShowGridGestiones(json);
        }

    });
}

function CargarDatosDeTicket(noTicket) {

    $.ajax({
        type: "POST",
        url: urlConsultaTicket,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ noTicket: noTicket }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
            ShowGridGestiones(json);
        }

    });
}

function CargarDatosDeUsuarioCreacion(ccUsuario) {

    $.ajax({
        type: "POST",
        url: urlConsultaUserCreacion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ ccUsuario: ccUsuario }),
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            CambiarAEstado(json);
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


    function ShowGridGestiones(data) {
        $("#gridViewConsulta").kendoGrid({

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
            { field: "FechaApertura", title: "Fecha Apertura", width: 100, template: "#= kendo.toString(kendo.parseDate(FechaApertura, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", headerAttributes: { style: "white-space: normal" } },
            { field: "UsuarioApertura", title: "Usuario Apertura", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Macroproceso", title: "Macroproceso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Marcacion", title: "Marcación", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "AliadoApertura", title: "Aliado Apertura", width: 100, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreLineaIngreso", title: "Linea Ingreso", width: 100, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreLineaEscalado", title: "Linea Escalado", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdEstado", title: "Estado", width: 80, headerAttributes: { style: "white-space: normal" } } /*,
           {
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
        if (modoLoginUsuario == 1)
        {
            window.location.href = '../#/AdministrarCaso/' + dataItem.IdIngreso;
        } else {
            window.location.href = '../#/DepuracionCasoCelula/' + dataItem.IdIngreso + "/" + dataItem.Marcacion;
        }

    }