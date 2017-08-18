


var oFileIn;
var cedulasArray;
$(function() {
    oFileIn = document.getElementById('my_file_input');
    if(oFileIn.addEventListener) {
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
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function(sheetName) {
            // Obtain The Current Row As CSV
            var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);   
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   
            $("#my_file_output").html(sCSV);
           
            CotejarInformacionGrid(oJS);
         
        });
    };

    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}



function CotejarInformacionGrid(cedulas)
{
    cedulasArray = new Array();
    for (var i = 0; i < cedulas.length; i++)
    {
        cedulasArray.push(cedulas[i].CEDULA);
    }
    console.log(cedulasArray);
        $.ajax({
            type: "POST",
            traditional: true,
            url: consultaCotejadaUrl,
            data: { cedulas: cedulasArray },
            dataType: 'json',
            success: function (result) {
                var json = JSON.parse(result);
                console.log(json);
                FillGridViewResult(json.DataUsuario);
                if(json.DataValid == true)
                {
                    $("#perfilUsuarios").show();
                } else {
                    $("#perfilUsuarios").hide();
                }
            }
        });
}


function TraerPosiblesLineasYAccesosDePerfil() {
    $("#accesosCreacion").empty();

    $.ajax({
        type: "GET",
        url: urlLineasAccesos,
        contentType: "application/json; charset=utf-8",
        data: { idPerfil: $("#perfilCreate").val() },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            LlenarLineasDePerfil(json);
        }


    });
};

function TraerPosiblesAccesosDeLinea() {

    $.ajax({
        type: "GET",
        url: urlPosiblesAccesosMasivo,
        contentType: "application/json; charset=utf-8",
        data: { idLinea: $("#lineaCreacion").val() },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            LlenarAccesosDeLineaCreacion(json);
        }
    });

};


function LlenarLineasDePerfil(data) {
    $("#lineaCreacion").empty();
    $("#lineaCreacion").append('<option value="0">-Seleccione-</option>');
    for (var i = 0; i < data.lineas.length; i++) {
        $("#lineaCreacion").append("<option value=" + data.lineas[i].Id + ">" + data.lineas[i].Nombre + "</option>");
    }

}


function LlenarAccesosDeLineaCreacion(data) {
    $("#accesosCreacion").empty();
    var table = document.getElementById("accesosCreacion");
    var i = 0;
    do {

        var row = table.insertRow(0);
        for (var j = 0; j < 7 && i < data.accesos.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style.padding = "4px";
            newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:100%">' +
                                               ' <input type="checkbox" class="minimal" value="' + data.accesos[i].Id + '" onchange="SelectCrearAcceso(event);"  /> ' + data.accesos[i].Nombre +
                                    '</label>';
        }

    } while (i < data.accesos.length)

}


function SelectCrearAcceso(e) {
    if ($(e.target).is(':checked')) {
        if ($("#listaPermisosCrearMas").val() != "") {
            $("#listaPermisosCrearMas").val($("#listaPermisosCrearMas").val() + "-" + $(e.target).val());
        } else {
            $("#listaPermisosCrearMas").val($(e.target).val());
        }

    } else {
        var listaPermisos = $("#listaPermisosCrearMas").val().split('-');
        var resultado = "";
        for (var i = 0; i < listaPermisos.length; i++) {
            if (listaPermisos[i] != $(e.target).val()) {
                if (resultado != "") {
                    resultado = resultado + "-" + listaPermisos[i];
                } else {
                    resultado = listaPermisos[i];
                }

            }
        }

        $("#listaPermisosCrearMas").val(resultado);
    }
}



function GuardarUsuarios()
{
    var accesosCrear = $("#listaPermisosCrearMas").val();
    var perfilCrear = $("#perfilCreate").val();
    var lineaCrear = $("#lineaCreacion").val();
    var contraMasiva = $("#contraAssigned").val();
    cedulasArray
    $.ajax({
        type: "POST",
        traditional: true,
        url: urlCrearUsuariosMasivo,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ cedulas: cedulasArray, accesosCrear: accesosCrear, perfilCrear: perfilCrear, lineaCrear: lineaCrear, contraMasiva: contraMasiva }),
        dataType: "json",
        success: function (result) {
            $("#mensajeFinal").text(result);
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });

}



function FillGridViewResult(data) {


    $("#infoCotejeadaGrid").kendoGrid({
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
       { field: "Cedula", title: "Cedula", width: 80, headerAttributes: { style: "white-space: normal" } },
     { field: "Nombre", title: "Nombre", width: 80, headerAttributes: { style: "white-space: normal" } },
     { field: "Operacion", title: "Operacion", width: 70, headerAttributes: { style: "white-space: normal" } },
         { field: "Cargo", title: "Cargo", width: 80, headerAttributes: { style: "white-space: normal" } },
          { field: "Grupo", title: "Grupo", width: 80, headerAttributes: { style: "white-space: normal" } },
           { field: "Canal", title: "Canal", width: 80, headerAttributes: { style: "white-space: normal" } },
           { field: "NombreLinea", title: "Nombre Linea", width: 80, headerAttributes: { style: "white-space: normal" } },
                  { field: "InfoRegistro", title: "Info Registro", width: 80, headerAttributes: { style: "white-space: normal" } }
        ]


    });

}