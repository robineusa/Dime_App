$(document).ready(function () {
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li3").css('background-color', 'transparent');
        $("#Li4").css('background-color', 'transparent');
        $("#Li5").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li4").css("background-color", "transparent");
        $("#Li5").css('background-color', 'transparent');
        $("#Li2").css("background-color", "#dcdcdc");

    });

    $("#Li3").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li4").css("background-color", "transparent");
        $("#Li5").css('background-color', 'transparent');
        $("#Li3").css("background-color", "#dcdcdc");

    });

    $("#Li4").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li5").css('background-color', 'transparent');
        $("#Li4").css("background-color", "#dcdcdc");

    });

    $("#Li5").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "transparent");
        $("#Li3").css("background-color", "transparent");
        $("#Li4").css('background-color', 'transparent');
        $("#Li5").css("background-color", "#dcdcdc");

    });
    $('#CC_Fecha').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });

    SetearTiposContacto();
      ShowGridHistorico(dataHistoricoGestion);
    ShowGridSeguimientos(dataHistoricoGestion);
    console.log("cargando kendo asdasd docsis3 ASDASD  abecedario");
});


function ShowGridHistorico(dataUp) {
  
    console.log(dataUp);
    $("#historicoGrid").kendoGrid({
        dataSource: {
            data: dataUp,

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
       { field: "Cuenta", title: "Cuenta Cliente", width: 130 },
       { field: "NombreCliente", title: "Nombre Cliente", width: 150, filterable: false },
       { field: "FechaGestion", title: "Fecha Gestión", width: 130, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
         { field: "TipoContacto", title: "Tipo Contacto", width: 150 },
            { field: "Gestion", title: "Gestion", width: 150 },
           { field: "Cierre", title: "Cierre", width: 130 },
             { field: "Razon", title: "Razón", width: 150 },
               { command: { text: "Gestionar", click: showGestion }, title: " ", width: "100px" }
        ]

    });

}


function ShowGridSeguimientos(dataUp) {

    var dataChanged = [];
    for (i = 0; i < dataUp.length; i++) {

        if (dataUp[i].Seguimiento == "SI") {
            dataChanged.push(dataUp[i]);
        }
    }

    $("#seguimientosGrid").kendoGrid({
        dataSource: {
            data: dataChanged,
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
       { field: "Cuenta", title: "Cuenta Cliente", width: 130 },
       { field: "NombreCliente", title: "Nombre Cliente", width: 140, filterable: false },
       { field: "FechaGestion", title: "Fecha Gestión", width: 130, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
        { field: "TipoContacto", title: "Tipo Contacto", width: 130 },
            { field: "Gestion", title: "Gestion", width: 130 },
           { field: "Cierre", title: "Cierre", width: 120 },
             { field: "Razon", title: "Razón", width: 150 },
       { field: "FechaSeguimiento", title: "Fecha Seguimiento", width: 130, template: "#= kendo.toString(kendo.parseDate(FechaSeguimiento, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
       { command: { text: "Gestionar", click: showGestion }, title: " ", width: "100px" }
        ]

    });

}

function showGestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '../GestionBlending/Cierre_Ciclo?cuentaSeleccionada=' + dataItem.Cuenta + "&idaGestionar=" + dataItem.Id;

}

function UnirNombreYApellidoData(data) {
    for (i = 0; i < data.length; i++) {

        data[i].NombreCliente = data[i].NombreCliente + " " + data[i].ApellidoCliente;

    }
    return data;

}
function TipoContactoChange() {
    console.log($("#tipoContacto").val() + " cambio ");

};

function Ofrecimiento_CC_1_SI() {
    document.getElementById('2_ofre').style.display = 'none';
    document.getElementById('3_ofre').style.display = 'none';
    ofre3No
    $("#ofre1No").attr('checked', false);
};

function Ofrecimiento_CC_1_NO() {
    document.getElementById('2_ofre').style.display = 'block';
    document.getElementById('3_ofre').style.display = 'none';
 
    $("#ofre1").attr('checked', false);
    console.log("Lercoasd asd pasamundos no tiene");
};
function Ofrecimiento_CC_2_SI() {
    document.getElementById('3_ofre').style.display = 'none';
    $("#ofre2No").attr('checked', false);
};

function Ofrecimiento_CC_2_NO() {
    document.getElementById('3_ofre').style.display = 'block';
    $("#ofre1").attr('checked', false);
    $("#ofre2").attr('checked', false);
};
function Ofrecimiento_CC_3_SI() {
    $("#ofre3No").attr('checked', false);
};

function Ofrecimiento_CC_3_NO() {
    $("#ofre1").attr('checked', false);
    $("#ofre2").attr('checked', false);
    $("#ofre3").attr('checked', false);
 
};






function SetearTiposContacto() {

    $.ajax({
        type: "POST",
        url: urlControlTipoContatoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ gestion: 10 }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];

            for (var index = 0, len = json.length; index < len; index++) {
                $('#tipoContactosSelect').append($('<option>', {
                    value: json[index].IdTipoContacto,
                    text: json[index].TipoContacto
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
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


function SetearRazonesChoices() {
    var IdCierre = $('#tiposCierresSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposRazonesList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idCierre: IdCierre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposRazonSelect').append($('<option>', {
                    value: json[index].IdRazon,
                    text: json[index].Razon
                }));

            }

        }
    });
    $('#tiposRazonSelect').find('option:not(:first)').remove();
    $('#tiposCausasSelect').find('option:not(:first)').remove();
    $('#tiposMotivosSelect').find('option:not(:first)').remove();

    //$('#tiposRazonSelect').find('option:not(:first)').remove();
}
function SetearCausaChoices() {
    var IdRazon = $('#tiposRazonSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposCausasList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idRazon: IdRazon }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposCausasSelect').append($('<option>', {
                    value: json[index].IdCausa,
                    text: json[index].Causa
                }));

            }

        }
});

  //  $('#tiposRazonSelect').find('option:not(:first)').remove();

    $('#tiposCausasSelect').find('option:not(:first)').remove();
    $('#tiposMotivosSelect').find('option:not(:first)').remove();
}

function SetearMotivosChoices() {
    var IdCausa = $('#tiposCausasSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTiposMotivosList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idCausa: IdCausa }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposMotivosSelect').append($('<option>', {
                    value: json[index].IdMotivo,
                    text: json[index].Motivo
                }));

            }

        }
    });
    $('#tiposMotivosSelect').find('option:not(:first)').remove();
}


