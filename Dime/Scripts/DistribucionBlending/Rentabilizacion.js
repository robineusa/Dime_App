$(document).ready(function () {
    ListaTipoDeContacto();
    TraerListaGestion();
    TraerListaSeguimientos();
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

});
function ListaTipoDeContacto() {
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
function ListaCierre() {
    var IdContacto = $('#tipoContactosSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTipoGestionList,
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
    $('#tiposMotivoSelect').find('option:not(:first)').remove();
}

function ListaRazones() {
    var IdCierre = $('#tiposCierresSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTipoCierreList,
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
    $('#tiposMotivoSelect').find('option:not(:first)').remove();

}
function ListaCausas() {
    var IdRazon = $('#tiposRazonSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTipoCausaList,
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
    $('#tiposCausasSelect').find('option:not(:first)').remove();
    $('#tiposMotivoSelect').find('option:not(:first)').remove();
}
function ListaMotivos() {
    var idCausa = $('#tiposCausasSelect').val();
    $.ajax({
        type: "POST",
        url: urlControlTipoMotivoList,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ idCausa: idCausa }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#tiposMotivoSelect').append($('<option>', {
                    value: json[index].IdMotivo,
                    text: json[index].Motivo
                }));

            }

        }
    });
    $('#tiposMotivoSelect').find('option:not(:first)').remove();
}
$('#tipoContactosSelect').change(function () {
    ListaCierre();
    ListaRazones();
    ListaCausas();
    ListaMotivos();
    LimpiarFecha();
})
$('#tiposCierresSelect').change(function () {
    ListaRazones();
    ListaCausas();
    ListaMotivos();
    LimpiarFecha();

})
$('#tiposRazonSelect').change(function () {
    ListaCausas();
    ListaMotivos();
    var IdRazon = $('#tiposRazonSelect').val();
    if (IdRazon == "91") {
        document.getElementById('TituloSeguimiento').style.display = 'inline-block';
        document.getElementById('TituloSeguimiento').style.width = '100%';
        document.getElementById('CuerpoSeguimineto').style.display = 'inline-block';
        document.getElementById('CuerpoSeguimineto').style.width = '100%';
    }
    else {
        document.getElementById('TituloSeguimiento').style.display = 'none';
        document.getElementById('CuerpoSeguimineto').style.display = 'none';
    }
    $('#CC_Fecha').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });
    LimpiarFecha();
})
function TraerListaGestion() {
    $.ajax({
        type: "GET",
        url: urlListaGestion,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cargargrilla(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cargargrilla(data) {
    $("#historicoGrid").kendoGrid({
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
        { command: { text: " ", click: ActualizarCaso, imageClass: "k-icon k-i-pencil", }, title: " ", width: "60px" },
        { field: "Id", title: "Id Transacción", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "FechaGestion", title: "Fecha Gestión", width: 100 },
        { field: "TipoContacto", title: "Tipo Contacto", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Cierre", title: "Cierre", width: 100 },
        { field: "Causa", title: "Causa", width: 100 },
        { field: "Motivo", title: "Motivo", width: 100 }

        ]

    });
}
function ActualizarCaso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'Rentabilizacion?CuentaCliente=' + dataItem.CuentaCliente;
}
function TraerListaSeguimientos() {
    $.ajax({
        type: "GET",
        url: urlListaSeguimientos,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cargargrillaseg(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cargargrillaseg(data) {
    $("#seguimientosGrid").kendoGrid({
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
        { command: { text: " ", click: ActualizarCasoSeg, imageClass: "k-icon k-i-pencil", }, title: " ", width: "60px" },
        { field: "Id", title: "Id Transacción", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "FechaGestion", title: "Fecha Gestión", width: 100 },
        { field: "TipoContacto", title: "Tipo Contacto", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Cierre", title: "Cierre", width: 100 },
        { field: "Causa", title: "Causa", width: 100 },
        { field: "Motivo", title: "Motivo", width: 100 },
        { field: "FechaSeguimiento", title: "Fecha Seguimineto", width: 100 }
        ]

    });
}
function ActualizarCasoSeg(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'Rentabilizacion?CuentaCliente=' + dataItem.CuentaCliente;
}
function LimpiarFecha() {
    var FechaSeguimiento = document.getElementById('CC_Fecha');
    FechaSeguimiento.value = "";
}