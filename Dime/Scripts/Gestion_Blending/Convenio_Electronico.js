$(document).ready(function () {
    $("#cuentaCliente").prop("readonly", true);
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li3").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Li3").css("border-color", "transparent");

    });

    $("#Li2").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li3").css('background-color', 'transparent');
        $("#Li1").css("border-color", "transparent");
        $("#Li2").css("border-color", "#c23321");
        $("#Li3").css("border-color", "transparent");
    });

    $("#Li3").click(function () {
        $("#Li1").css("background-color", "transparent");
        $("#Li3").css("background-color", "#dcdcdc");
        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("border-color", "transparent");
        $("#Li3").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
    });

    $('#CE_Fecha').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });

    SetearTiposContacto();
    UnirNombreYApellidoData(dataHistoricoGestion);
    ShowGridHistorico(dataHistoricoGestion);
    ShowGridSeguimientos(dataHistoricoGestion);
   
});



function ShowGridHistorico(dataUp) {
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
       {
           field: "CuentaCliente", title: "Cuenta Cliente", width: 130 },
       { field: "NombreCliente", title: "Nombre Cliente", width: 150, filterable:false },
       { field: "FechaGestion", title: "Fecha Gestión", width: 130, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-dd'), 'MM/dd/yyyy') #", filterable: false },
       { field: "HoraGestion", title: "Hora Gestión", width: 130, template: "#= kendo.toString(kendo.parseDate(HoraGestion, ' hh:mm tt'), ' hh:mm tt') #", filterable: false },
         { field: "TipoContacto", title: "Tipo Contacto", width: 150 },
           { field: "Cierre", title: "Cierre", width: 130 },
             { field: "Razon", title: "Razón", width: 150 },
               { command: { text: "Gestionar", click: showGestion }, title: " ", width: "100px" }
        ]

    });

}


function ShowGridSeguimientos(dataUp) {
   
    var dataChanged = [];
    for (i = 0; i < dataUp.length; i++) {

        if (dataUp[i].Seguimiento == "SI")
        {
            dataChanged.push(dataUp[i]);
        }
    }
    console.log("marco polo");

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
       { field: "CuentaCliente", title: "Cuenta Cliente", width: 130 },
       { field: "NombreCliente", title: "Nombre Cliente", width: 140, filterable: false },
       { field: "FechaGestion", title: "Fecha Gestión", width: 130, template: "#= kendo.toString(kendo.parseDate(FechaGestion, 'yyyy-MM-dd'), 'MM/dd/yyyy') #", filterable: false },
       { field: "HoraGestion", title: "Hora Gestión", width: 130, template: "#= kendo.toString(kendo.parseDate(HoraGestion, ' hh:mm tt'), ' hh:mm tt') #", filterable: false },
       { field: "TipoContacto", title: "Tipo Contacto", width: 130 },
       { field: "Cierre", title: "Cierre", width: 100 },
       { field: "Razon", title: "Razón", width: 140 },
       { field: "FechaSeguimiento", title: "Fecha Seguimiento", width: 130, template: "#= kendo.toString(kendo.parseDate(FechaSeguimiento, 'yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss') #", filterable: false },
       { command: { text: "Gestionar", click: showGestion }, title: " ", width: "100px" }
        ]

    });

}

function showGestion(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = '/GestionBlending/Convenio_Electronico?cuentaSeleccionada=' + dataItem.CuentaCliente + "&idConvenioGestionado=" + dataItem.Id;
    console.log("cosas en gestionar");
    }

function UnirNombreYApellidoData(data)
{
    for (i = 0; i < data.length; i++) {

        data[i].NombreCliente = data[i].NombreCliente + " " + data[i].ApellidoCliente;
     
    }
    return data;

}
function SetearTiposContacto() {

    $.ajax({
        type: "POST",
        url: urlControlTipoContatoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ gestion: 2}),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
         
            for(var index = 0, len = json.length; index < len; index++)
            {
                $('#tipoContactosSelect').append($('<option>', {
                    value: json[index].IdTipoContacto,
                    text: json[index].TipoContacto
                }));

            }

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
}

function SetearRazonChoice() {
  
}