$(document).ready(function () {
    TraerCanalDeIngreso();
    FormatoFechas();
    TraerArbolSrcaus();
    TraerArbolDeGestion();
    TraerArbolMarcaciones();
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
    var IdPadre = "14";

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
                    TraerArbolDeRazon();
                  }
               }

        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
    
}

function TraerArbolDeRazon() {
    var IdPadre = $('#SelectGestion').val();
    if (IdPadre == "--SELECCIONE--" || IdPadre == "" || IdPadre == " ") {
        $('#Razon').find('option:not(:first)').remove();

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
                    $('#Razon').append($('<option>', {
                        value: json[index].IdArbol,
                        text: json[index].Descripcion
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Razon");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Razon1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#Razon').val(select.options[i].value);
                        ListaSubrazones();
                    }
                }
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
       
    }
}

function ListaSubrazones() {
    var IdPadre = $('#Razon').val();
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
    var IdPadre = "18";

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

$('#CanalDeIngreso').change(function () {
    var NuevaIdSelesct = document.getElementById("CanalDeIngreso");
    var NuevoText = NuevaIdSelesct.options[NuevaIdSelesct.selectedIndex].text;
    $('#CanalDeIngreso1').val(NuevoText);

})

$('#SelectGestion').change(function () {
    $('#Razon').find('option:not(:first)').remove();
    $('#Subrazon').find('option:not(:first)').remove();
    TraerArbolDeRazon();
    ListaSubrazones();
    var NuevaIdGestion = document.getElementById("SelectGestion");
    var NuevaGestion = NuevaIdGestion.options[NuevaIdGestion.selectedIndex].text;
    $('#SelectGestion1').val(NuevaGestion);
    
})

$('#Razon').change(function () {
    $('#Subrazon').find('option:not(:first)').remove();
    ListaSubrazones();
    DatosDeLaGestion();
    var NuevaIdSubrazon = document.getElementById("Razon");
    var NuevaSubrazon = NuevaIdSubrazon.options[NuevaIdSubrazon.selectedIndex].text;
    $('#Razon1').val(NuevaSubrazon);
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
    $('#FechaDeSeguimiento').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });
   
}

function TraerListaGestionUsuario() {
    $.ajax({
        type: "GET",
        url: UrlListaDeGestiontickets,
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
        { field: "NumeroDeTicket", title: "Numero De Ticket", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Razon", title: "Razon", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 }
        ]

    });
}
function TraerListaSeguimientosUsuario() {
    $.ajax({
        type: "GET",
        url: UrlListaDeSeguimientostickets,
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
        data[i].FechaDeGestion = kendo.toString(kendo.parseDate(data[i].FechaDeGestion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        data[i].FechaDeSeguimiento = kendo.toString(kendo.parseDate(data[i].FechaDeSeguimiento, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
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
        { field: "FechaDeGestion", title: "Fecha De Gestion", width: 100 },
        { field: "CuentaCliente", title: "Cuenta Cliente", width: 100 },
        { field: "NumeroDeTicket", title: "Numero De Ticket", width: 100 },
        { field: "Gestion", title: "Gestion", width: 100 },
        { field: "Razon", title: "Razon", width: 100 },
        { field: "Subrazon", title: "Subrazon", width: 100 },
        { field: "Estado", title: "Estado", width: 100 },
        { field: "Observaciones", title: "Observaciones", width: 100 },
        { field: "FechaDeSeguimiento", title: "Fecha De Seguimiento", width: 100 }
        ]

    });
}
function ActualizarCasoSeg(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    var seg = "Ture";
    window.location.href = 'Tickets?IdGestion=' + dataItem.IdGestion;
}
function LimpiarFecha() {
    var FechaSeguimiento = document.getElementById('FechaDeSeguimiento');
    FechaSeguimiento.value = "";
}
$("#CuentaCliente").blur(function (event) {
    event.preventDefault();
    var Cuenta = $("#CuentaCliente").val();
    if (Cuenta == "" || Cuenta == null || Cuenta == "0") {
    } else {
        
            DatosClienteCuenta(Cuenta);
        
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
   
        $('#FechaDeCreacion').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });

        $('#FechaDeCancelacion').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });
       
   
}

function seleccionarNota1() {
    document.getElementById("Nota1").selectionStart = 0;

}
function seleccionarNota2() {
    document.getElementById("Nota2").selectionStart = 0;

}
function TraerArbolSrcaus() {
    
            $.ajax({
            type: "POST",
            url: UrlListaSrcaus,
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
               
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Srcaus').append($('<option>', {
                        value: json[index].Razon,
                        text: json[index].Razon
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Srcaus");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Srcaus1").value;
                // recorremos todos los valores del select
                for (var i = 1; i < select.length; i++) {
                    if (select.options[i].text == buscar) {
                        // seleccionamos el valor que coincide
                        select.selectedIndex = i;
                        $('#Srcaus').val(select.options[i].value);
                        TraerArbolSrreas();
                    }
                }
            },
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        
        
    
}
function TraerArbolSrreas() {
    var Razon = $('#Srcaus').val();
    if (Razon == "--SELECCIONE--" || Razon == "" || Razon == " ") {
        $('#Srreas').find('option:not(:first)').remove();

    } else {
        $.ajax({
            type: "POST",
            url: UrlListaSrreas,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ Razon: Razon }),
            dataType: "JSON",
            success: function (result) {
                var json = JSON.parse(result);
                var object = json[0];
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#Srreas').append($('<option>', {
                        value: json[index].Subrazon,
                        text: json[index].Subrazon
                    }));

                }
                // creamos un variable que hace referencia al select
                var select = document.getElementById("Srreas");
                // obtenemos el valor a buscar
                var buscar = document.getElementById("Srreas1").value;
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
        
        $('#Srreas').find('option:not(:first)').remove();
    }
}
$('#Srcaus').change(function () {
    $('#Srreas').find('option:not(:first)').remove();
    var NuevaIdSubrazon = document.getElementById("Srcaus");
    var NuevaSubrazon = NuevaIdSubrazon.options[NuevaIdSubrazon.selectedIndex].text;
    $('#Srcaus1').val(NuevaSubrazon);
    TraerArbolSrreas();
})
$('#Srreas').change(function () {

    var NuevaIdSubrazon = document.getElementById("Srreas");
    var NuevaSubrazon = NuevaIdSubrazon.options[NuevaIdSubrazon.selectedIndex].text;
    $('#Srreas1').val(NuevaSubrazon);
    
})
function TraerArbolMarcaciones() {

    $.ajax({
        type: "POST",
        url: UrlMarcaciones,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);

            for (var index = 0, len = json.length; index < len; index++) {
                $('#MarcacionCancelacion').append($('<option>', {
                    value: json[index].Submarcacion,
                    text: json[index].Submarcacion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("MarcacionCancelacion");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("MarcacionCancelacion1").value;
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
    $('#MarcacionCancelacion').find('option:not(:first)').remove();
    
}
$('#MarcacionCancelacion').change(function () {

    var NuevaIdSubrazon = document.getElementById("MarcacionCancelacion");
    var NuevaSubrazon = NuevaIdSubrazon.options[NuevaIdSubrazon.selectedIndex].text;
    $('#MarcacionCancelacion1').val(NuevaSubrazon);

})
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
                    $.alert({
                        theme: 'Modern',
                        icon: 'fa fa-warning',
                        boxWidth: '500px',
                        useBootstrap: false,
                        type: 'red',
                        title: '¡ Oops !',
                        content: 'El Número de Ticket Ingresado ya se Encuentra en Seguimiento',
                        buttons: {
                            Ok: {
                                btnClass: 'btn-red',
                                action: function () { location.reload(); }

                            },
                        }
                    });
                    
                } else {
                    $.alert({
                        theme: 'Modern',
                        icon: 'fa fa-warning',
                        boxWidth: '500px',
                        useBootstrap: false,
                        type: 'red',
                        title: '¡ Oops !',
                        content: 'El Número de Ticket Ingresado ya se Encuentra Finalizado',
                        buttons: {
                            Ok: {
                                btnClass: 'btn-red',
                                action: function () { location.reload(); }

                            },
                        }
                    });
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