$(document).ready(function () {
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Crear_Usuario").css("display", "block");
        $("#Actualizar_Usuarios").css("display", "none");
        
    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");
        $("#Actualizar_Usuarios").css("display", "block");
        $("#Crear_Usuario").css("display", "none");

    });
    TraerListaLineasBlending();
    TraerCampaña();
});

function TraerListaLineasBlending() {
    $.ajax({
        type: "GET",
        url: urlLineas,
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#NombreLineasBlendingSelect').append($('<option>', {
                    value: json[index].NombreLinea,
                    text: json[index].NombreLinea
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function TraerCampaña() {
    $.ajax({
        type: "GET",
        url: urlCampañas,
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#CampañasBlendingSelect').append($('<option>', {
                    value: json[index].Campaña,
                    text: json[index].Campaña
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function BuscaUsuariosForList()
{
   var Operacion =  $('#NombreLineasBlendingSelect').val();
   $.ajax({
       type: "POST",
       url: urlUsuariosporOperacion,
       contentType: "application/json; charset=utf-8",
       data: JSON.stringify({ Operacion: Operacion }),
       dataType: "JSON",
       success: function (result) {
           var json = JSON.parse(result);
           ShowGridUsuarios(json);
           $('#oculto').css("display","block");
       }
   });
}


function SetearCierresChoices() {
    var IdContacto = $('#tipoContactosSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposCierresList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idContacto: IdContacto }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposCierresSelect').append($('<option>', {
                    value: json[index].IdCierre,
                    text: json[index].Cierre
                }));

            }

        }
    });


    $('#tiposCierresSelect').find('option:not(:first)').remove();
    $('#tiposRazonSelect').find('option:not(:first)').remove();
    $('#tiposCausasSelect').find('option:not(:first)').remove();
    $('#tiposMotivosSelect').find('option:not(:first)').remove();
}

function ShowGridUsuarios(data)
{
    $("#gridViewResult").kendoGrid({

        //toolbar: ["excel"],
        //excel: {
        //    fileName: "Export.xlsx",
        //},
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
            { text: "Check", template: '<input type="checkbox" id="ARadio"/>', title: "Check", width: "70px" },
            { field: "Id", title: "Id", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Cedula", title: "Id Usuario", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Operacion", title: "Operacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Campaña", title: "Campaña", width: 80, headerAttributes: { style: "white-space: normal" } },

        ]

    });
}

$('#cedulaCreacion').on("keyup", function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        $("#consultarUsuario").click();

    }
})