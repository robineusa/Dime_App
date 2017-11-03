$(document).ready(function () {

    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Crear_Usuario").css("display", "block");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
        $("#Crear_Usuario").css("display", "none");

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



    if(segundaPestañaAbierta=="True")
    {
        $("#consultaUsuarioTab").click();
        if(cedulaUsuario != 0)
        {
            //LlenarAccesosDePerfilConsulta();
            ConsultaAccesosCedula();
        }
    }

    perfilSelectedCreate

    $("#perfilSelectedCreate").empty();
    $("#perfilSelectedCreate").append("<option value=''>-Seleccione-</option>");
    $("#perfilSelectedCreate").append("<option Value='1'>ADMINISTRADOR</option>");
    $("#perfilSelectedCreate").append("<option Value='2'>ASESOR</option>");
    $("#perfilSelectedCreate").append("<option Value='3'>CÉLULA</option>");

    $("#lineaSelectCreacion").empty();
    $("#lineaSelectCreacion").append("<option value=''>-Seleccione-</option>");
    $("#listaPermisosCrear").val('');
    $("#Contrase").val('');
    
  
});

function ConsultaAccesosCedula()
{
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
                LlenarGridiviewAccesos(data);
            }
        }
    });
}

function LlenarGridiviewAccesos(data) {
    $("#gridViewConsultaAccesos").empty();
    $("#gridViewConsultaAccesos").css("display", "block");
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
            //{

            //    width: 60, title: "<input id='checkAll', type='checkbox', class='check-box'  onchange='CheckBoxAll()' /><div id='' class='btn btn-block btn-danger' style='float: right; max-width:50%;' onclick='AgregaAccesosaBorrar()'>Eliminar Accesos </div>",
            //    template: "<input type=\"checkbox\" class=\"checkControl\"/>"
            //},
        ]
    });
}

function TraerPosiblesLineasDePerfil() {
    $("#accesosPrivilegiosCreacion").empty();
    $.ajax({
        type: "GET",
        url: urlPosiblesLineas,
        contentType: "application/json; charset=utf-8",
        data: { idPerfil: $("#perfilSelectedCreate").val() },
        dataType: 'json',
        success: function(result)
        {
            var json = JSON.parse(result);
            console.log(json);
            LlenarLineasDePerfil(json);
        }
    });

};
function TraerPosiblesAccesosDeLinea() {

    //$.ajax({
    //    type: "GET",
    //    url: urlPosiblesAccesos,
    //    contentType: "application/json; charset=utf-8",
    //    data: { idLinea: $("#lineaSelectCreacion").val() },
    //    dataType: 'json',
    //    success: function (result) {
    //        var json = JSON.parse(result);
    //        console.log(json);
    //        LlenarAccesosDeLineaCreacion(json)
    //    }
    //});

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

};

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
    $("#GridConsultaAccesos").empty();
    $("#GridConsultaAccesos").kendoGrid({
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

                width: 40, title: "<input id='checkAll', type='checkbox', class='check-box'  onchange='CheckBoxAll()' />Marcar/Desmarcar",
                template: "<input type=\"checkbox\" class=\"checkControl\"/>"
            },
        ]
    });
}

function AgregaAccesosaGuardarMasivo() {
    var grid = $("#GridConsultaAccesos").data("kendoGrid");
    var gridDataArray = $('#GridConsultaAccesos').data('kendoGrid')._data;
    for (var i = 1; i <= (200 + 1) ; i++) {

        var row = grid.table.find("tr:nth-child(" + i + ")");
        var checkbox = $(row).find(".checkControl");
        if (checkbox.is(":checked")) {
            if ($("#listaPermisosCrear").val() != "") {
                $("#listaPermisosCrear").val($("#listaPermisosCrear").val() + "-" + gridDataArray[i - 1].Id);
            } else {
                $("#listaPermisosCrear").val(gridDataArray[i - 1].Id);
            }
        }
    }
}

function CheckBoxAll() {
    var Check = document.getElementById('checkAll').checked;
    if (Check == true) {
        $(".checkControl").prop("checked", true);
    }
    else {
        $(".checkControl").prop("checked", false);
    }

}

function LlenarLineasDePerfil(data)
{
    $("#lineaSelectCreacion").empty();
    $("#lineaSelectCreacion").append('<option value="0">-Seleccione-</option>');
    for (var i = 0; i < data.lineas.length; i++) {
        $("#lineaSelectCreacion").append("<option value=" + data.lineas[i].Id + ">" + data.lineas[i].Nombre + "</option>");
    }

}

function LlenarAccesosDeLineaCreacion(data)
{
    $("#accesosPrivilegiosCreacion").empty();
    var table = document.getElementById("accesosPrivilegiosCreacion");
    var i= 0;
 do 
 {
    
        var row = table.insertRow(0);
        for (var j = 0; j < 7 && i < data.accesos.length; j++, i++)
        {
            var newCell = row.insertCell(j);
            newCell.style.width = "200px";
            newCell.style.padding = "4px";
            newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:200px">' +
                                               ' <input type="checkbox" class="minimal" value="' + data.accesos[i].Id + '" onchange="SelectCrearAcceso(event);"  /> ' + data.accesos[i].Nombre +
                                  '</label>';
        }
       
}while(i < data.accesos.length)

}



function LlenarAccesosDePerfilConsulta() {

    $.ajax({
        type: "GET",
        url: urlPosiblesAccesosDeUsuario,
        contentType: "application/json; charset=utf-8",
        data: { cedUsuario: cedulaUsuario },
        dataType: 'json',
        success: function (result) {
            var  data = JSON.parse(result);
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

function SelectCrearAcceso(e)
{
    if ($(e.target).is(':checked'))
    {
        if ($("#listaPermisosCrear").val() != "")
        {
            $("#listaPermisosCrear").val($("#listaPermisosCrear").val() + "-" + $(e.target).val());
        } else {
            $("#listaPermisosCrear").val($(e.target).val());
        }
      
    } else
     {
        var listaPermisos = $("#listaPermisosCrear").val().split('-');
        var resultado = "";
        for(var i = 0; i< listaPermisos.length; i++)
        {
            if(listaPermisos[i] != $(e.target).val() )
            {
                if (resultado != "")
                {
                    resultado = resultado + "-" + listaPermisos[i];
                } else
                {
                    resultado =  listaPermisos[i];
                }
        
            }
        }
     
        $("#listaPermisosCrear").val(resultado);
    }
}

function LlamarUsuarioMasivosHtml()
{
    $.ajax({
        type: "GET",
        url: urlAccesosUsuariosMasivoHtml,
        dataType: "html",
        success: function (result) {
            $('#usuariosMasivosBody').html(result);
        }
    })

}

function UsuariosMasivoModal()
{
    $("#linkUsuarioMasivoModal").click();
}