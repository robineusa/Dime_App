$(document).ready(function () {
    $("#Li1").click(function () {

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
                $('#CampañasBlendingSelect2').append($('<option>', {
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
}

function ShowGridUsuarios(data) {
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
            { command: { name: "edit", template: '<input type="checkbox" id="ARadio"/>' }, title: '<div style="width: 100%; height: 100%; text-align: center;"><img style="width: 20px;" src="../Content/Imagenes/image_preview.png" alt="image" style="width:100px; height:100px;"/></div>', width: 20 },
            { field: "Id", title: "Id", width: 40, headerAttributes: { style: "white-space: normal" } },
            { field: "Cedula", title: "Cedula Usuario", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Operacion", title: "Operacion", width: 80, headerAttributes: { style: "white-space: normal" } },
            { field: "Campaña", title: "Campaña", width: 80, headerAttributes: { style: "white-space: normal" } },

        ]

    });
}
