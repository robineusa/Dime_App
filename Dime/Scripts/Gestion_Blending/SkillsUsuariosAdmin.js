$(document).ready(function () {
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li3").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Li3").css("border-color", "transparent");
        $("#Crear_Usuario").css("display", "block");
        $("#Actualizar_Usuario").css("display", "none");
        $("#Eliminar_Usuario").css("display", "none");
        
        
    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "transparent");
        $("#Li3").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");
        $("#Crear_Usuario").css("display", "none");
        $("#Actualizar_Usuario").css("display", "block");
        $("#Eliminar_Usuario").css("display", "none");

    });

    $("#Li3").click(function () {
        $("#Li3").css("border-color", "#c23321");
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li3").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "transparent");
        $("#Crear_Usuario").css("display", "none");
        $("#Actualizar_Usuario").css("display", "none");
        $("#Eliminar_Usuario").css("display", "block");

    });
    if (segundaPestañaAbierta == "True") {
        $("#Actualiza_UsuarioTab").click();
        tercerPestañaAbierta = "False";
        
    }
    if (tercerPestañaAbierta == "True") {
        $("#Elimina_UsuarioTab").click();
        segundaPestañaAbierta = "False";

    }
    
    TraerListaFormulariosBlending();
});

function TraerListaFormulariosBlending() {
    
        $.ajax({
            type: "GET",
            url: urlFormularios,
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                for (var index = 0; index < json.length; index++) {
                    $('#FormularioBlendingSelect').append($('<option>', {
                        value: json[index].FormularioDestino,
                        text: json[index].FormularioDestino
                    }));
                    $('#FormularioBlendingSelect2').append($('<option>', {
                        value: json[index].FormularioDestino,
                        text: json[index].FormularioDestino
                    }));
                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
}

function TraerListaLineasBlending() {
    var Form = $('#FormularioBlendingSelect').val();
            $.ajax({
                type: "POST",
                url: urlLineas,
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ Form: Form }),
                dataType: "JSON",
                success: function (result) {
                    var json = JSON.parse(result);
                    for (var index = 0; index < json.length; index++) {
                        $('#NombreLineasBlendingSelect').append($('<option>', {
                            value: json[index].OperacionDestino,
                            text: json[index].OperacionDestino
                        }));
                    }

                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
    $('#NombreLineasBlendingSelect').find('option:not(:first)').remove();
    $('#CampañasBlendingSelect').find('option:not(:first)').remove();
}

function TraerListaLineasBlending2() {
    var Form = $('#FormularioBlendingSelect2').val();
    $.ajax({
        type: "POST",
        url: urlLineas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Form: Form }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#NombreLineasBlendingSelect2').append($('<option>', {
                    value: json[index].OperacionDestino,
                    text: json[index].OperacionDestino
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $('#NombreLineasBlendingSelect2').find('option:not(:first)').remove();
    $('#CampañasBlendingSelect2').find('option:not(:first)').remove();
}

function TraerCampaña()
{
    var Form = $('#FormularioBlendingSelect').val();
    var Operacion = $('#NombreLineasBlendingSelect').val();
    $.ajax({
        type: "POST",
        url: urlCampañas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Form: Form , Operacion: Operacion}),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#CampañasBlendingSelect').append($('<option>', {
                    value: json[index].CampanaDestino,
                    text: json[index].CampanaDestino
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $('#CampañasBlendingSelect').find('option:not(:first)').remove();
}

function TraerCampaña2() {
    var Form = $('#FormularioBlendingSelect2').val();
    var Operacion = $('#NombreLineasBlendingSelect2').val();
    $.ajax({
        type: "POST",
        url: urlCampañas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Form: Form, Operacion: Operacion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#CampañasBlendingSelect2').append($('<option>', {
                    value: json[index].CampanaDestino,
                    text: json[index].CampanaDestino
                }));
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $('#CampañasBlendingSelect2').find('option:not(:first)').remove();
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
});

$('#cedulaActualizacion').on("keyup", function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        $("#consultarActualizacion").click();

    }
});

$('#cedulaEliminar').on("keyup", function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        $("#consultarEliminar").click();

    }
});