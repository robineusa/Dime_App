$(document).ready(function () {
    $("#Actualizar_Usuarios_Masivo").css("display", "none");
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Crear_Usuario").css("display", "block");
        $("#Actualizar_Usuarios_Masivo").css("display", "none");
        $("#Li2").css("border-color", "transparent");
        $("#Li1").css("border-color", "#c23321");
    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Crear_Usuario").css("display", "none");
        $("#Actualizar_Usuarios_Masivo").css("display", "block");
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");
    });




    $('#cedulaCreacion').on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#consultarUsuario").click();
        }
    })

    $('#cedulaConsulta').on("keyup", function (e) {
        var code = e.keyCode || e.which;
        if (code == 13) {
            $("#cedulaCreacion").val($("#cedulaConsulta").val());
            $("#consultarUsuarioConsulta").click();
        }
    })



    if (segundaPestañaAbierta == "True") {
        $("#consultaUsuarioTab").click();
    }
    DropDownListAliados();
    if (perfilUsuario != null) {
        $("#perfilSelectedCreate").val(perfilUsuario);
        TraerPosiblesLineasDePerfil();
    }
    if (perfilUsuario == null) {
        $("#listaPermisosCrearMasivo").val("");
        $("#listaPermisosCrear").val("");
        $("#listaUsuariosMasivo").val("");
    }
    $("#listaPermisosCrearMasivo").val("");
    $("#listaPermisosCrear").val("")
    $("#listaUsuariosMasivo").val("");
});

function LlenarAccesosDePerfilConsulta() {

    $.ajax({
        type: "GET",
        url: urlPosiblesAccesosDeUsuario,
        contentType: "application/json; charset=utf-8",
        data: { cedUsuario: cedulaConsultado },
        dataType: 'json',
        success: function (result) {
            var data = JSON.parse(result);
            console.log(data);
            $("#accesosPrivilegiosConsulta").empty();
            var table = "";
            table = document.getElementById("accesosPrivilegiosConsulta");
            var i = 0;
            if ($("#Aliado_Actu").val() != "") {
                //do {
                //    var acceso = document.getElementById(data.accesos[i]);
                //    if (acceso != null) {
                //        acceso.checked = true;
                //        SelectCrearAccesoPorValue(document.getElementById(data.accesos[i]).value);
                //    }

                //    i++;
                //} while (i < data.accesos.length)
                LlenarGridiviewAccesos(data);
            }
        }
    });
}

function LlenarGridiviewAccesos(data)
{
    $("#gridViewConsultaAccesos").empty();
    $("#gridViewConsultaAccesos").kendoGrid({
        autoBind: true,
        dataSource: {
            data: data,
            schema: {
                model: {

                }
            },
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
        columns: [
            { field: "IdAcceso", title: "Id Acceso", width: 60, headerAttributes: { style: "white-space: normal" } },
            { field: "NombreAcceso", title: "Nombre Acceso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "DescripcionAcceso", title: "Descripcion", width: 140, headerAttributes: { style: "white-space: normal" } },
            { command: { text: " ", click: BorrarAcceso, imageClass: "k-icon k-i-delete", }, title: "Eliminar", width: "50px" },
            
        ]


    });
}

function BorrarAcceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    dataItem.empty();
    dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var data = { cedUsuario: cedulaConsultado, idAcceso: dataItem.IdAcceso };
    var id = dataItem.IdAcceso;
    alert(data.idAcceso);
    $.ajax({
        type: "GET",
        url: urlBorrarAccesoUsuario,
        data: data,
        dataType: "html",
        success: function (result) {
            $('#gridViewConsultaAccesos').empty();
            //$('#gridViewConsultaAccesos').html(result);
            LlenarAccesosDePerfilConsulta();
        }
    });

}

function SelectCrearAcceso(e) {
    if ($(e.target).is(':checked')) {
        var id = $(e.target).attr('id');
        if ($("#listaPermisosCrear").val() != "") {
            $("#listaPermisosCrear").val($("#listaPermisosCrear").val() + "-" + $(e.target).val());
            $("#AccesosaAgregar").val($("#AccesosaAgregar").val() + ', ' + id);
        } else {
            $("#listaPermisosCrear").val($(e.target).val());
            $("#AccesosaAgregar").val(id);
        }
    } else {
        var listaPermisos = $("#listaPermisosCrear").val().split('-');
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

        var listaAccesos = $("#AccesosaAgregar").val().split(', ');
        var resultado2 = "";
        var id2 = $(e.target).attr('id');
        
        for (var i = 0; i < listaAccesos.length; i++) {
            if (listaAccesos[i] != id2) {
                if (resultado2 != "") {
                    resultado2 = resultado2 + ", " + listaAccesos[i];
                } else {
                    resultado2 = listaAccesos[i];
                }

            }
        }

        $("#AccesosaAgregar").val(resultado2);
        $("#listaPermisosCrear").val(resultado);
    }
}

function SelectCrearAccesoPorValue(value) {
    if ($("#listaPermisosCrear").val() != "") {
        $("#listaPermisosCrear").val($("#listaPermisosCrear").val() + "-" + value);
    } else {
        $("#listaPermisosCrear").val(value);
    }
}

function SelectCrearAccesoMasivo(e) {
    var idm = $(e.target).attr('id');
    
    if ($(e.target).is(':checked')) {
        if ($("#listaPermisosCrearMasivo").val() != "") {
            $("#listaPermisosCrearMasivo").val($("#listaPermisosCrearMasivo").val() + "-" + $(e.target).val());
            $("#AccesosaAgregarMasivos").val($("#AccesosaAgregarMasivos").val() + ', ' + idm);
        } else {
            $("#listaPermisosCrearMasivo").val($(e.target).val());
            $("#AccesosaAgregarMasivos").val(idm);
        }

    } else {
        var listaPermisos = $("#listaPermisosCrearMasivo").val().split('-');
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

        var listaAccesosMasivo = $("#AccesosaAgregarMasivos").val().split(', ');
        var resultado3 = "";
        //var id2 = $(e.target).attr('id');

        for (var i = 0; i < listaAccesosMasivo.length; i++) {
            if (listaAccesosMasivo[i] != idm) {
                if (resultado3 != "") {
                    resultado3 = resultado3 + ", " + listaAccesosMasivo[i];
                } else {
                    resultado3 = listaAccesosMasivo[i];
                }

            }
        }

        $("#AccesosaAgregarMasivos").val(resultado3);
        $("#listaPermisosCrearMasivo").val(resultado);
    }
}
function TraerPosiblesAccesosDeLinea() {
    //$("#listaPermisosCrearMasivo").val("");

    $.ajax({
        type: "GET",
        url: urlPosiblesAccesosDeLinea,
        contentType: "application/json; charset=utf-8",
        data: { idLinea: $("#lineaSelectCreacion").val() },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            LlenarAccesosDeLineaCreacion(json)
        }
    });
};

function LlenarAccesosDeLineaCreacion(data) {
    $("#accesosPrivilegiosCreacion").empty();
    $("#accesosPrivilegiosConsulta").empty();
    //$("#listaPermisosCrearMasivo").val("");
    //$("#listaPermisosCrear").val("");
    var table = document.getElementById("accesosPrivilegiosCreacion");
    var i = 0;
    do {

        var row = table.insertRow(0);
        for (var j = 0; j < 7 && i < data.accesos.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style.padding = "4px";
            newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:100%">' +
                                               ' <input type="checkbox" class="minimal" value="' + data.accesos[i].Id + '" onchange="SelectCrearAcceso(event);" id="' + data.accesos[i].Nombre + '"  /> ' + data.accesos[i].Nombre +
                                    '</label>';
        }
    } while (i < data.accesos.length)
}

function IdPerfilDeUsuarioActual(cedulaUsuario) {
    $.ajax({
        type: "GET",
        url: urlPerfilYLineaDeUsuario,
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var json = JSON.parse(result);
            $("#aliadoSelected").empty();
            $("#aliadoSelected").append('<option value="0">-Seleccione-</option>');
            for (var i = 0; i < json.length; i++) {
                $("#aliadoSelected").append("<option value=" + json[i] + ">" + json[i] + "</option>");
            }
        }
    })
}


function DropDownListAliados() {
    $.ajax({
        type: "GET",
        url: urlPosiblesAliados,
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var json = JSON.parse(result);
            $("#aliadoSelected").empty();
            $("#aliadoSelected").append('<option value="0">-Seleccione-</option>');
            for (var i = 0; i < json.length; i++) {
                $("#aliadoSelected").append("<option value=" + json[i] + ">" + json[i] + "</option>");
            }
        }

    })

}


function ConsultarUsuariosDeAliadoYPerfil() {
    $.ajax({
        type: "GET",
        url: urlUsuariosConsulta,
        contentType: "application/json; charset=utf-8",
        data: { aliado: $("#aliadoSelected").find(":selected").text(), idPerfil: $("#perfilSelected").val() },
        dataType: "json",
        success: function (result) {
            $("#gridViewConsulta").empty();
            var json = JSON.parse(result);
            console.log(json);
            CargarGridDefault(json);
        }
    })
}

function TraerPosiblesLineasDePerfil() {
    $("#accesosPrivilegiosCreacion").empty();
    $("#accesosPrivilegiosConsulta").empty();
    //$("#listaPermisosCrearMasivo").val("");

    $.ajax({
        type: "GET",
        url: urlPosiblesLineasAccesos,
        contentType: "application/json; charset=utf-8",
        data: { idPerfil: $("#perfilSelectedCreate").val() },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            $("#lineaSelectCreacion").empty();
            $("#lineaSelectCreacion").append('<option value="0">-Seleccione-</option>');
            for (var i = 0; i < json.lineas.length; i++) {
                $("#lineaSelectCreacion").append("<option value=" + json.lineas[i].Id + ">" + json.lineas[i].Nombre + "</option>");
            }
            if (lineaUsuario != null) {
                $("#lineaSelectCreacion").val(lineaUsuario);
                TraerPosiblesAccesosDeLinea();

            }
            LlenarAccesosDePerfilConsulta();
        }

    });
};


function TraerPosiblesLineasDePerfilMasivo() {
    $("#accesosPrivilegiosMasivos").empty();
    //$("#listaPermisosCrearMasivo").val("");

    $.ajax({
        type: "GET",
        url: urlPosiblesLineasAccesos,
        contentType: "application/json; charset=utf-8",
        data: { idPerfil: $("#perfilSelectedCreateMasivo").val() },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            $("#lineaSelectCreacionMasivo").empty();
            $("#lineaSelectCreacionMasivo").append('<option value="0">-Seleccione-</option>');
            for (var i = 0; i < json.lineas.length; i++) {
                $("#lineaSelectCreacionMasivo").append("<option value=" + json.lineas[i].Id + ">" + json.lineas[i].Nombre + "</option>");
            }

        }
    });
};
function TraerPosiblesAccesosDeLineaMasivo() {
    //$("#listaPermisosCrearMasivo").val("");
    $.ajax({
        type: "GET",
        url: urlPosiblesAccesosDeLinea,
        contentType: "application/json; charset=utf-8",
        data: { idLinea: $("#lineaSelectCreacionMasivo").val() },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            LlenarAccesosDeLineaMasivos(json);
        }
    });
};


function LlenarAccesosDeLineaMasivos(data) {
    $("#accesosPrivilegiosMasivos").empty();
    var table = document.getElementById("accesosPrivilegiosMasivos");
    var i = 0;
    do {

        var row = table.insertRow(0);
        for (var j = 0; j < 7 && i < data.accesos.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style.padding = "4px";
            newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:100%">' +
                                               ' <input type="checkbox" class="minimal" value="' + data.accesos[i].Id + '" onchange="SelectCrearAccesoMasivo(event);" id="' + data.accesos[i].Nombre + '"  /> ' + data.accesos[i].Nombre +
                                    '</label>';
        }
    } while (i < data.accesos.length)
}


function GuardarTotalAccesosNuevos() {
    var grid = $("#gridViewConsulta").data("kendoGrid");
    var gridDataArray = $('#gridViewConsulta').data('kendoGrid')._data;
    for (var i = 1; i <= (grid.table.children().length + 1) ; i++) {

        var row = grid.table.find("tr:nth-child(" + i + ")");
        var checkbox = $(row).find(".checkControl");
        //if (checkbox.is(":checked")) {

        //    if ($("#listaUsuariosMasivo").val() == "") {
        //        $("#listaUsuariosMasivo").val(gridDataArray[i - 1].Cedula);
        //    } else {
        //        $("#listaUsuariosMasivo").val($("#listaUsuariosMasivo").val() + "-" + gridDataArray[i - 1].Cedula);
        //    }
        //}
    }

};



function CheckBoxAll() {
    $(".checkControl").prop("checked", true);
}

function CargarGridDefault(data) {
    $("#gridViewConsulta").empty();
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
              {
                  width: 50,
                  title: " <input id='checkAll', type='checkbox', class='check-box'  onchange='CheckBoxAll()' /> All",
                  template: "<input type=\"checkbox\" class=\"checkControl\" />"
              },
                     { field: "Cedula", title: "Cedula", width: 100 },
                     { field: "Nombre", title: "Nombre", width: 100 },
                     { field: "Aliado", title: "Aliado", width: 100 },
                     { field: "Canal", title: "Canal", width: 100 },
                     { field: "Cargo", title: "Cargo", width: 100 },
                     { field: "Estado", title: "Estado", width: 100 },
                     { field: "Grupo", title: "Grupo", width: 100 },
                     { field: "NombreLinea", title: "Nombre Linea", width: 100 },
                     { field: "Operacion", title: "Operación", width: 100 },
                     { field: "Segmento", title: "Segmento", width: 100 },
                     { field: "UsuarioRr", title: "Usuario RR", width: 100 },
                     { field: "UsuarioAgendamiento", title: "Usuario Agendamiento", width: 100 },
                     { field: "UsuarioGerencia", title: "Usuario Gerencia", width: 100 }
        ]

    });

}

var oFileIn;
var cedulasArray;
$(function () {
    oFileIn = document.getElementById('input_accesos_masivo');
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
            //$("#my_file_output").html(sCSV);

            CargaInformacionGrid(oJS);

        });
    };

    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
}

function CargaInformacionGrid(cedulas) {
    cedulasArray = new Array();
    for (var i = 0; i < cedulas.length; i++) {
        cedulasArray.push(cedulas[i].CEDULA);
    }
    console.log(cedulasArray);
    $.ajax({
        type: "POST",
        traditional: true,
        url: urlConsultaUsuariosAccesosMasivos,
        data: { cedulas: cedulasArray },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            FillGridViewResult(json);
            
            for (var index = 0, len = json.length; index < len; index++) {
                if ($("#listaUsuariosMasivo").val() == "") {
                    $("#listaUsuariosMasivo").val(json[index].Cedula);
                    //alert('vacio');
                } else {
                    $("#listaUsuariosMasivo").val($("#listaUsuariosMasivo").val() + "-" + json[index].Cedula);
                    //alert('lleno');
                }
            }
        }
    });
}

function FillGridViewResult(data) {

    $("#gridViewConsulta").empty();
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
           { field: "NombreLinea", title: "Nombre Linea", width: 80, headerAttributes: { style: "white-space: normal" } }
                  /*{ field: "InfoRegistro", title: "Info Registro", width: 80, headerAttributes: { style: "white-space: normal" } }*/
        ]


    });

}

