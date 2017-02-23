$(document).ready(function () {
    $("#Actualizar_Usuarios_Masivo").css("display", "none");
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Crear_Usuario").css("display", "block");
        $("#Actualizar_Usuarios_Masivo").css("display", "none");
        
    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Crear_Usuario").css("display", "none");
        $("#Actualizar_Usuarios_Masivo").css("display", "block");

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
    if (perfilUsuario  != null)
    {
        $("#perfilSelectedCreate").val(perfilUsuario);
       // IdPerfilDeUsuarioActual(cedulaConsultado);
        $("#lineaSelectCreacion").append('<option value="1">'+lineaUsuario+'</option>')
        $("#lineaSelectCreacion").val(1);
        LlenarAccesosDePerfilConsulta();
    }

    $("#listaPermisosCrearMasivo").val("");
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
            var table = document.getElementById("accesosPrivilegiosConsulta");
            var i = 0;
            do {

                var row = table.insertRow(0);
                for (var j = 0; j < 7 && i < data.accesos.length; j++, i++) {
                    var newCell = row.insertCell(j);
                    newCell.style.padding = "4px";
                    newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:100%">' +
                                                       ' <input type="checkbox" class="minimal" checked disabled /> ' + data.accesos[i] +
                                            '</label>';
                }

            } while (i < data.accesos.length)

        }


    });


}


function SelectCrearAcceso(e) {
    if ($(e.target).is(':checked')) {
        if ($("#listaPermisosCrearMasivo").val() != "") {
            $("#listaPermisosCrearMasivo").val($("#listaPermisosCrearMasivo").val() + "-" + $(e.target).val());
        } else {
            $("#listaPermisosCrearMasivo").val($(e.target).val());
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

        $("#listaPermisosCrearMasivo").val(resultado);
    }
}

function LlenarAccesosDePerfilCreacion(data) {
    $("#accesosPrivilegiosCreacion").empty();
    $("#accesosPrivilegiosConsulta").empty();
    var table = document.getElementById("accesosPrivilegiosCreacion");
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

function IdPerfilDeUsuarioActual(cedulaUsuario)
{
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


function DropDownListAliados()
{
    $.ajax({
        type: "GET",
        url: urlPosiblesAliados,
        contentType: "application/json; charset=utf-8",
        success: function(result)
        {
            var json = JSON.parse(result);
            $("#aliadoSelected").empty();
            $("#aliadoSelected").append('<option value="0">-Seleccione-</option>');
            for (var i = 0; i < json.length; i++) {
                $("#aliadoSelected").append("<option value=" + json[i] + ">" + json[i] + "</option>");
            }
        }

      })

}


function ConsultarUsuariosDeAliadoYPerfil()
{
    $.ajax({
        type: "GET",
        url: urlUsuariosConsulta,
        contentType: "application/json; charset=utf-8",
        data: { aliado: $("#aliadoSelected").val(), idPerfil: $("#perfilSelected").val() },
        dataType: "json",
        success: function (result) {
            $("#gridViewConsulta").empty();
            var json = JSON.parse(result);
            console.log(json);
            CargarGridDefault(json);
        }
    })
}

function TraerPosiblesLineasYAccesosDePerfil() {
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
            LlenarAccesosDePerfilCreacion(json);
        }


    });
};


function TraerPosiblesAccesosDePerfilMasivo() {
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
            LlenarAccesosDePerfilMasivos(json);
        }


    });
};

function LlenarAccesosDePerfilMasivos(data) {
    $("#accesosPrivilegiosMasivos").empty();
    var table = document.getElementById("accesosPrivilegiosMasivos");
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


function GuardarTotalAccesosNuevos() {


             var grid = $("#gridViewConsulta").data("kendoGrid");
             var gridDataArray = $('#gridViewConsulta').data('kendoGrid')._data;
            for (var i =1; i <= (grid.table.children().length+1); i++)
            {

                var row = grid.table.find("tr:nth-child("+i+")");
                var checkbox = $(row).find(".checkControl");
                if (checkbox.is(":checked")) {
 
                    if ($("#listaUsuariosMasivo").val() == "")
                    {
                        $("#listaUsuariosMasivo").val(gridDataArray[i - 1].Cedula);
                    } else
                         {
                        $("#listaUsuariosMasivo").val($("#listaUsuariosMasivo").val() + "-" + gridDataArray[i-1].Cedula);
                         }
                }
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