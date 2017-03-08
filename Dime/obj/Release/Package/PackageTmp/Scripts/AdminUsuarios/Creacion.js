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
            LlenarAccesosDePerfilConsulta();
        }
    }
  
});



function TraerPosiblesLineasYAccesosDePerfil() {


    $.ajax({
        type: "GET",
        url: urlPosiblesLineasAccesos,
        contentType: "application/json; charset=utf-8",
        data: { idPerfil: $("#perfilSelectedCreate").val() },
        dataType: 'json',
        success: function(result)
        {
            var json = JSON.parse(result);
            console.log(json);
            LlenarLineasDePerfil(json);
            LlenarAccesosDePerfilCreacion(json);
        }
     

    });


};

function LlenarLineasDePerfil(data)
{
    $("#lineaSelectCreacion").empty();
    $("#lineaSelectCreacion").append('<option value="0">-Seleccione-</option>');
    for (var i = 0; i < data.lineas.length; i++) {
        $("#lineaSelectCreacion").append("<option value=" + data.lineas[i].Id + ">" + data.lineas[i].Nombre + "</option>");
    }

}

function LlenarAccesosDePerfilCreacion(data)
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