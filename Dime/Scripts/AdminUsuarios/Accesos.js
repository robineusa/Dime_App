var IdAccessos = [];
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
    $.ajax({
        type: "GET",
        url: urlListaAccesos,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (result) {
            var data = JSON.parse(result);
            CambiarModoLogin(data);
            TaerTodosAccesos(data);
        }
    });
    
}

function LlenarGridiviewAccesos(data)
{
    $("#gridViewConsultaAccesos").empty();
    $("#gridViewConsultaAccesos").css("display","block"); 
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
            //{ command: { text: " ", click: BorrarAcceso, imageClass: "k-icon k-i-delete", }, title: "Eliminar", width: "50px" },
            {

                width: 60, title: "<input id='checkAll', type='checkbox', class='check-box'  onchange='CheckBoxAll()' /><div id='' class='btn btn-block btn-danger' style='float: right; max-width:50%;' onclick='AgregaAccesosaBorrar()'>Eliminar Accesos </div>",
                template: "<input type=\"checkbox\" class=\"checkControl\"/>"
            },            
        ]
    });
}

function AgregaAccesosaBorrar()
{
    var grid = $("#gridViewConsultaAccesos").data("kendoGrid");
    var gridDataArray = $('#gridViewConsultaAccesos').data('kendoGrid')._data;
    for (var i = 1; i <= (200+ 1) ; i++) {
        var row = grid.table.find("tr:nth-child(" + i + ")");
        var checkbox = $(row).find(".checkControl");
        if (checkbox.is(":checked")) {
            var id = gridDataArray[i - 1].IdAcceso;
            IdAccessos.push(gridDataArray[i - 1].IdAcceso);
        }
    }
    BorrarAcceso();
}


function BorrarAcceso() {
    var data = JSON.stringify({ cedUsuario: cedulaConsultado, idAcceso: IdAccessos });
    if (IdAccessos.length > 0) {
        $.ajax({
            type: "POST",
            traditional: true,
            url: urlBorrarAccesoUsuario,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#gridViewConsultaAccesos').empty();
                //$('#gridViewConsultaAccesos').html(result);
                LlenarAccesosDePerfilConsulta();
            }
        });
        IdAccessos = [];
    }
    else
    {
        alert('Debe seleccionar al menos un ACCESO');
    }
    //alert('3');

}

function CambiarModoLogin(data) {
    for (var i = 0; i < data.length; i++) {

        if (data[i].IdModoLogin == "1") {
            data[i].IdModoLogin = "ADMINISTRADOR";
        }
        if (data[i].IdModoLogin == "2") {
            data[i].IdModoLogin = "ASESOR";
        }
        if (data[i].IdModoLogin == "3") {
            data[i].IdModoLogin = "CELULA";
        }

    }

}

function TaerTodosAccesos(data) {
    $("#GridListaAccesos").empty();
    $("#GridListaAccesos").kendoGrid({
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
            { field: "Id", title: "Id Acceso", width: 60, headerAttributes: { style: "white-space: normal" } },
            { field: "Nombre", title: "Nombre Acceso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdModoLogin", title: "Modo de Logueo", width: 50, headerAttributes: { style: "white-space: normal" } },
            { field: "Descripcion", title: "Descripcion", width: 140, headerAttributes: { style: "white-space: normal" } },
            {

                width: 40, title: "<input id='checkAll2', type='checkbox', class='check-box'  onchange='CheckBoxAll2()' />Marcar/Desmarcar",
                template: "<input type=\"checkbox\" class=\"checkControl2\"/>"
            },
        ]
    });
}

function AgregaAccesosaGuardar() {
    var grid = $("#GridListaAccesos").data("kendoGrid");
    var gridDataArray = $('#GridListaAccesos').data('kendoGrid')._data;
    for (var i = 1; i <= (200 + 1) ; i++) {
        
        var row = grid.table.find("tr:nth-child(" + i + ")");
        var checkbox = $(row).find(".checkControl2");
        if (checkbox.is(":checked"))
        {
            if ($("#listaPermisosCrear").val() != "") {
                $("#listaPermisosCrear").val($("#listaPermisosCrear").val() + "-" + gridDataArray[i - 1].Id);
            } else {
                $("#listaPermisosCrear").val(gridDataArray[i - 1].Id);
            }
        }
    }
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

    //$.ajax({
    //    type: "GET",
    //    url: urlPosiblesAccesosDeLinea,
    //    contentType: "application/json; charset=utf-8",
    //    data: { idLinea: $("#lineaSelectCreacion").val() },
    //    dataType: 'json',
    //    success: function (result) {
    //        var json = JSON.parse(result);
    //        LlenarAccesosDeLineaCreacion(json)
    //  });  }
    
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

}


function CheckBoxAll() {
    //alert(Check.is(":cheked"));
    var Check = document.getElementById('checkAll').checked;
    if (Check == true) {
        $(".checkControl").prop("checked", true);
    }
    else {
        $(".checkControl").prop("checked", false);
    }

}

function CheckBoxAll2() {
    //alert(Check.is(":cheked"));
    var Check = document.getElementById('checkAll2').checked;
    if (Check == true) {
        $(".checkControl2").prop("checked", true);
    }
    else {
        $(".checkControl2").prop("checked", false);
    }

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
            CargaAccesosMasivo();
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

function CargaAccesosMasivo()
{
    $.ajax({
        type: "GET",
        url: urlListaAccesos,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (result) {
            var data = JSON.parse(result);
            CambiarModoLogin(data);
            TaerTodosAccesosMasivo(data);
        }
    });
}

function TaerTodosAccesosMasivo(data) {
    $("#GridListaAccesosMasivo").empty();
    $("#GridListaAccesosMasivo").kendoGrid({
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
            { field: "Id", title: "Id Acceso", width: 60, headerAttributes: { style: "white-space: normal" } },
            { field: "Nombre", title: "Nombre Acceso", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "IdModoLogin", title: "Modo de Logueo", width: 50, headerAttributes: { style: "white-space: normal" } },
            { field: "Descripcion", title: "Descripcion", width: 140, headerAttributes: { style: "white-space: normal" } },
            {

                width: 50, title: "<input id='checkAll3', type='checkbox', class='check-box'  onchange='CheckBoxAll3()' />Marcar/Desmarcar",
                template: "<input type=\"checkbox\" class=\"checkControl3\"/>"
            },
        ]
    });
}

function AgregaAccesosaGuardarMasivo() {
    var grid = $("#GridListaAccesosMasivo").data("kendoGrid");
    var gridDataArray = $('#GridListaAccesosMasivo').data('kendoGrid')._data;
    for (var i = 1; i <= (200 + 1) ; i++) {

        var row = grid.table.find("tr:nth-child(" + i + ")");
        var checkbox = $(row).find(".checkControl3");
        if (checkbox.is(":checked")) {
            if ($("#listaPermisosCrearMasivo").val() != "") {
                $("#listaPermisosCrearMasivo").val($("#listaPermisosCrearMasivo").val() + "-" + gridDataArray[i - 1].Id);
            } else {
                $("#listaPermisosCrearMasivo").val(gridDataArray[i - 1].Id);
            }
        }
    }
}

function CheckBoxAll3() {
    //alert(Check.is(":cheked"));
    var Check = document.getElementById('checkAll3').checked;
    if (Check == true) {
        $(".checkControl3").prop("checked", true);
    }
    else {
        $(".checkControl3").prop("checked", false);
    }

}