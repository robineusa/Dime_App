$(document).ready(function () {
    ListaTipoDeContacto();
    TraerListaGestionUsuario();
    TraerListaSeguimientosUsuario();
    TraerArbolDeGestion();

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
function TraerArbolDeGestion() {
    var IdPadre = "0";
    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var object = json[0];
            for (var index = 0, len = json.length; index < len; index++) {
                $('#Gestion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    $('#Gestion').find('option:not(:first)').remove();
    $('#Subrazon').find('option:not(:first)').remove();
  
}
$('#Gestion').change(function () {
    ListaSubrazones();
    
})
function ListaSubrazones() {
    var IdPadre = $('#Gestion').val();
    if (IdPadre == "--SELECCIONE--" || IdPadre == "" || IdPadre == " ") {
        $('#Subrazon').find('option:not(:first)').remove();
        
    } else {
        $.ajax({
            type: "POST",
            url: UrlArbolDeGestion,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ IdPadre: IdPadre }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Subrazon').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }

            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        $('#Subrazon').find('option:not(:first)').remove();
       
    }
}


$('#Subrazon').change(function () {
    DatosDeLaGestion();
   
})

function DatosDeLaGestion() {
    var IdPadre = $('#Subrazon').val();
    $.ajax({
        type: "POST",
        url: UrlDatosArbol,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdArbol: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            
            $('#Estado').val(json.EstadoDeGestion);
        }
    });

}
$('#Estado').change(function () {
    var Estado = $('#Estado').val();
    if (Estado == "SEGUIMIENTO") {
        document.getElementById('TituloSeguimiento').style.display = 'inline-block';
        document.getElementById('TituloSeguimiento').style.width = '100%';
        document.getElementById('CuerpoSeguimineto').style.display = 'inline-block';
        document.getElementById('CuerpoSeguimineto').style.width = '100%';
    }
    else {
        document.getElementById('TituloSeguimiento').style.display = 'none';
        document.getElementById('CuerpoSeguimineto').style.display = 'none';
    }
    $('#FechaDeSeguimiento').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });
    LimpiarFecha();
})

function TraerListaGestionUsuario() {
    $.ajax({
        type: "GET",
        url: UrlListaDeGestion,
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
        { field: "IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "IdGestion", title: "Id Gestion", width: 100 },
        { field: "FechaDeTransaccion", title: "Fecha De Transaccion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 }

        ]

    });
}
function TraerListaSeguimientosUsuario() {
    $.ajax({
        type: "GET",
        url: UrlListaDeSeguimientos,
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
        { command: { text: " Editar", click: ActualizarCasoSeg, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "60px" },
        { field: "IdTransaccion", title: "Id Transacción", width: 100 },
        { field: "IdGestion", title: "Id Gestion", width: 100 },
        { field: "FechaDeTransaccion", title: "Fecha De Transaccion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        { field: "FechaDeSeguimiento", title: "Fecha De Seguimiento", width: 100 },
        ]

    });
}
function ActualizarCasoSeg(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var seg = "Ture";
    window.location.href = 'Desconexiones?IdGestion=' + dataItem.IdGestion;
}
function LimpiarFecha() {
    var FechaSeguimiento = document.getElementById('FechaDeSeguimiento');
    FechaSeguimiento.value = "";
}
