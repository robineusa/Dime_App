$(document).ready(function () {
    $("#Li1").click(function () {

    });
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
    $('#CampañasBlendingSelect2').find('option:not(:first)').remove();
}

function TraerCampaña() {
    var Form = $('#FormularioBlendingSelect').val();
    var Operacion = $('#NombreLineasBlendingSelect').val();
    $.ajax({
        type: "POST",
        url: urlCampañas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Form: Form, Operacion: Operacion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0; index < json.length; index++) {
                $('#CampañasBlendingSelect').append($('<option>', {
                    value: json[index].Campaña,
                    text: json[index].Campaña
                }));
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

function BuscaUsuariosForList() {
    var Operacion = $('#NombreLineasBlendingSelect').val();
    $.ajax({
        type: "POST",
        url: urlUsuariosporOperacion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Operacion: Operacion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            ShowGridUsuarios(json);
            $('#oculto').css("display", "block");
        }
    });
    if (Operacion != "") {
        var Form = $('#FormularioBlendingSelect').val();
    $.ajax({
        type: "POST",
        url: urlCountCuentasOperacion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Form : Form, Operacion: Operacion }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            if (json > 0) {
                $('#CountOperacion').text('' + json);
                $('#Aviso1').css('display','block');
            }

            if (json == 0)
            {
                $('#CountOperacion').text('No hay cuentas para asignar a esta operación');
                $('#Aviso1').css('display', 'block');
            }
        }
    });
    }
    else { $('#CountOperacion').text(''); $('#Aviso1').css('display', 'none'); }
    $('#CampañasBlendingSelect2').find('option:not(:first)').remove();
    $('#Aviso2').css('display', 'none');
    TraerCampaña();
}

function BuscaCuentasOperacionCampaña()
{
    var Form = $('#FormularioBlendingSelect').val();
    var Operacion = $('#NombreLineasBlendingSelect').val();
    var Campaña = $('#CampañasBlendingSelect2').val();
    if (Campaña != "") {
        $.ajax({
            type: "POST",
            url: urlCountCuentasOperacionCampaña,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({Form : Form, Operacion: Operacion, Campaña: Campaña }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                if (json > 0) {
                    $('#CountOperacionCampaña').text(json);
                    $('#Aviso2').css('display', 'block');
                }

                if (json == 0) {
                    $('#CountOperacionCampaña').text('No hay cuentas para asignar a esta campaña');
                    $('#Aviso2').css('display', 'block');
                }
            }
        });
    }
    else { $('#CountOperacionCampaña').text(''); $('#Aviso2').css('display', 'none'); }
}

function ShowGridUsuarios(data) {
    var ds = new kendo.data.DataSource({
        data: data
    });
    $("#gridViewResult").kendoGrid({

        //toolbar: ["excel"],
        //excel: {
        //    fileName: "Export.xlsx",
        //},
        dataSource: ds,
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
                command: { name: "edit", template: '<input type="checkbox" id="Radio" class="f" name="Radio"/>' },
                title: '<div onclick="CheckBoxAll()" style="width: 100%; height: 100%; text-align: center;"><img style="width: 20px;" src="../Content/Imagenes/image_preview.png" alt="image" style="width:100px; height:100px;"/></div>', width: 20
            },
            { field: "Id", title: "Id", width: 40, headerAttributes: { style: "white-space: normal" } },
            { field: "Cedula", title: "Cedula Usuario", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Operacion", title: "Operacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Campaña", title: "Campaña", width: 80, headerAttributes: { style: "white-space: normal" } },

        ]

    });
}
function CheckBoxAll() {
    $(".f").prop("checked", true);
}


function GuardarCedulasMasivo() {
    
    var grid = $("#gridViewResult").data("kendoGrid");
    var gridDataArray = $('#gridViewResult').data('kendoGrid')._data;
    
    for (var i = 0; i <= gridDataArray.length ; i++) {
        var row = grid.table.find("tr:nth-child(" + i + ")");
        var checkbox = $(row).find(".f");
        if (checkbox.is(":checked")) {
            if ($("#CedulasMasivo").val() == "") {
                $("#CedulasMasivo").val(gridDataArray[i - 1].Cedula);
            } else {
                $("#CedulasMasivo").val($("#CedulasMasivo").val() + "-" + gridDataArray[i - 1].Cedula);
                
            }
        }
    }

};