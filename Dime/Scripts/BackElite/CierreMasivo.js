
var oFileIn;
var IdSolicitudsArray;
var ArrayTotal;
$(function () {
    oFileIn = document.getElementById('my_file_input');
    if (oFileIn.addEventListener) {
        oFileIn.addEventListener('change', filePicked, false);
    }
});


function filePicked(oEvent) {
    // Get The File From The Input
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    // Create A File Reader HTML5
    var reader = new FileReader();

    // Ready The Event For When A File Gets Selected
    reader.onload = function (e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, { type: 'binary' });
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function (sheetName) {
            // Obtain The Current Row As CSV
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            $("#my_file_output").html(sCSV);

            CargarInformacion(oJS);

        });
    };

    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}



function CargarInformacion(Cuentas) {
    IdSolicitudsArray = [];
    for (var i = 0; i < Cuentas.length; i++) {
        IdSolicitudsArray.push(Cuentas[i].ID_SOLICITUD);

    }
    $.ajax({
        type: "GET",
        traditional: true,
        url: UrlConsultarSolicitudes,
        contentType: "application/json; charset=utf-8",
        data: { Solicitudes: IdSolicitudsArray },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            FillGridViewResult(json);
            NuevoArray(json);
        }
    });
}

function NuevoArray(data) {
    ArrayTotal = [];
    for (var i = 0; i < data.length; i++) {
        ArrayTotal.push(data[i].IdSolicitud);

    }
}

function FillGridViewResult(data) {
    $("#infoCotejeadaGrid").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "ConsultaLogBackElite.xlsx",
        },
        dataSource: {
            data: data,
            pageSize: 20,
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
        { field: "IdSolicitud", title: "Id Solicitud", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "LlsOt", title: "LlsOt", width: 100 },
        { field: "TipoDeSolicitud", title: "Tipo De Solicitud", width: 100 },
        { field: "DetalleDeSolicitud", title: "Detalle De Solicitud", width: 100 },
        { field: "FechaDeSolicitud", title: "Fecha De Solicitud", width: 100 },
        //{ field: "UsuarioQueSolicita", title: "Usuario Que Solicita", width: 100 },
        //{ field: "NombreUsuarioQueSolicita", title: "Nombre Usuario Que Solicita", width: 100 },
        //{ field: "AliadoQueSolicita", title: "Aliado Que Solicita", width: 100 },
        //{ field: "OperacionQueSolicita", title: "Operacion Que Solicita", width: 100 },
        //{ field: "FechaUltimaActualizacion", title: "Fecha Ultima Actualizacion", width: 100 },
        //{ field: "UsuarioUltimaActualizacion", title: "Usuario Ultima Actualizacion", width: 100 },
        //{ field: "NombreUsuarioUltimaActualizacion", title: "Nombre Usuario Ultima Actualizacion", width: 100 },
        //{ field: "FechaDeFinalizacion", title: "Fecha De Finalizacion", width: 100 },
        //{ field: "UsuarioQueFinaliza", title: "Usuario Que Finaliza", width: 100 },
        //{ field: "NombreUsuarioQueFinaliza", title: "Nombre Usuario Que Finaliza", width: 100 },
        //{ field: "Nodo", title: "Nodo", width: 100 },
        //{ field: "Malescalado", title: "Mal Escalado", width: 100 },
        //{ field: "DetalleMalEscalado", title: "Detalle Mal Escalado", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "EstadoEscalamiento", title: "Estado Escalamiento", width: 100 }
        //{ field: "FechaDeAgenda", title: "Fecha De Agenda", width: 100 },
        //{ field: "Observaciones", title: "Observaciones", width: 100 }
        ]

    });
}

function ActualizarCuentas() {
    ArrayTotal;
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlActualizarSolicitudes,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Solicitudes: ArrayTotal }),
        dataType: "json",
        success: function (result) {
            $("#mensajeFinal").text(result);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
}
