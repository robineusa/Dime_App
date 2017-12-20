$(document).ready(function () {
    TraerCanalDeIngreso();
    TraerMesesDeSuspension();
    FormatoFechas();
    TraerArbolDeGestion();
    TraerListaGestionUsuario();
    TraerListaSeguimientosUsuario();


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
    var IdPadre = "22";

    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#SelectGestion').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("SelectGestion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("SelectGestion1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                    $('#SelectGestion').val(select.options[i].value);
                    ListaSubrazones();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

}
function ListaSubrazones() {
    var IdPadre = $('#SelectGestion').val();
    console.log(IdPadre);
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
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Subrazon");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Subrazon1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#Subrazon').val(select.options[i].value);
                        DatosDeLaGestion();
                    }
                }
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });

    }
}
function TraerCanalDeIngreso() {
    var IdPadre = "26";

    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#CanalDeIngreso').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("CanalDeIngreso");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("CanalDeIngreso1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    $('#CanalDeIngreso').find('option:not(:first)').remove();

}
function TraerMesesDeSuspension() {
    var IdPadre = "29";

    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#MesesSuspender').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("MesesSuspender");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("MesesSuspender1").value;
            // recorremos todos los valores del select
            for (var i = 1; i < select.length; i++) {
                if (select.options[i].text == buscar) {
                    // seleccionamos el valor que coincide
                    select.selectedIndex = i;
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });

    $('#MesesSuspender').find('option:not(:first)').remove();

}
$('#CanalDeIngreso').change(function () {
    var NuevaIdSelesct = document.getElementById("CanalDeIngreso");
    var NuevoText = NuevaIdSelesct.options[NuevaIdSelesct.selectedIndex].text;
    $('#CanalDeIngreso1').val(NuevoText);

})
$('#SelectGestion').change(function () {
    $('#Subrazon').find('option:not(:first)').remove();
    ListaSubrazones();
    var NuevaIdGestion = document.getElementById("SelectGestion");
    var NuevaGestion = NuevaIdGestion.options[NuevaIdGestion.selectedIndex].text;
    $('#SelectGestion1').val(NuevaGestion);

})
$('#Subrazon').change(function () {
    DatosDeLaGestion();
    var NuevaIdSubrazon = document.getElementById("Subrazon");
    var NuevaSubrazon = NuevaIdSubrazon.options[NuevaIdSubrazon.selectedIndex].text;
    $('#Subrazon1').val(NuevaSubrazon);
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
            ValidarEstado(json.EstadoDeGestion);
        }
    });

}
function ValidarEstado(Estado) {

    if (Estado == "SEGUIMIENTO") {
        document.getElementById('TituloSeguimiento').style.display = 'inline-block';
        document.getElementById('TituloSeguimiento').style.width = '100%';
        document.getElementById('CuerpoSeguimineto').style.display = 'inline-block';
        document.getElementById('CuerpoSeguimineto').style.width = '100%';
    }
    else {
        document.getElementById('TituloSeguimiento').style.display = 'none';
        document.getElementById('CuerpoSeguimineto').style.display = 'none';
        LimpiarFecha();
    }
    $('#FechaSeguimiento').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });

}
function TraerListaGestionUsuario() {
    $.ajax({
        type: "GET",
        url: UrlListaDeGestionSuspensiones,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechas(json);
            cargargrilla(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaDeTransaccion = kendo.toString(kendo.parseDate(data[i].FechaDeTransaccion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }
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
        url: UrlListaDeSeguimientosSuspensiones,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cambiarfechasseg(json);
            cargargrillaseg(json);
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function cambiarfechasseg(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaGestion = kendo.toString(kendo.parseDate(data[i].FechaGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaSeguimiento = kendo.toString(kendo.parseDate(data[i].FechaSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
    }
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
        { command: { text: " Editar", click: ActualizarCasoSeg, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "100px" },
        { field: "IdGestion", title: "Id Gestion", width: 60 },
        { field: "FechaGestion", title: "Fecha De Gestion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "NumeroDeTicket", title: "Numero De Ticket", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Razon", title: "Razon", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        { field: "FechaSeguimiento", title: "Fecha De Seguimiento", width: 100 }
        ]

    });
}
function ActualizarCasoSeg(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var seg = "Ture";
    window.location.href = 'SuspencionesTemporales?IdGestion=' + dataItem.IdGestion;
}
function LimpiarFecha() {
    var FechaSeguimiento = document.getElementById('FechaSeguimiento');
    FechaSeguimiento.value = "";
}
$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    var Cuenta = $("#CuentaCliente").val();
    if (Cuenta == "" || Cuenta == null || Cuenta == "0") {
    } else {

        //DatosClienteCuenta(Cuenta);

    }

});
function DatosClienteCuenta(Cuenta) {

    $.ajax({
        type: "POST",
        url: UrlInformacionClienteticket,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            $('#Nota1').val(json.Nota1);
            $('#Nota2').val(json.Nota2);

        }
    });

}
function FormatoFechas() {

    $('#FechaCreacion').datetimepicker({
        format: 'Y-m-d',
        timepicker: false
    });

}
function ConsultarTicketBase(data) {

    $.ajax({
        type: "POST",
        url: UrlConsultarTicket,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Ticket: data }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            if (json != null) {
                if (json.Estado == "SEGUIMIENTO") {
                    alert("El número de ticket ingresado ya se encuentra en seguimiento");
                    location.reload();
                } else {
                    alert("El número de ticket ingresado ya se encuentra finalizado");
                    location.reload();
                }
            }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });



}
$("#NumeroDeTicket").blur(function (event) {
    event.preventDefault();
    var Ticket = $("#NumeroDeTicket").val();
    if (Ticket == "" || Ticket == null || Ticket == "0") {
    } else {

        ConsultarTicketBase(Ticket);

    }

});