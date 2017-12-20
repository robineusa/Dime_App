$(document).ready(function () {
    FormatoFechas();
    TraerCanalDeIngreso();
    TraerArbolDeGestion();
    TraerArbolTipoDeError();
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
    var IdPadre = "7";

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
function TraerCanalDeIngreso() {
    var IdPadre = "5";

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
function TraerArbolTipoDeError() {
    var IdPadre = "8";

    $.ajax({
        type: "POST",
        url: UrlArbolDeGestion,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IdPadre: IdPadre }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            for (var index = 0, len = json.length; index < len; index++) {
                $('#TipoDeError').append($('<option>', {
                    value: json[index].IdArbol,
                    text: json[index].Descripcion
                }));

            }
            // creamos un variable que hace referencia al select
            var select = document.getElementById("TipoDeError");
            // obtenemos el valor a buscar
            var buscar = document.getElementById("TipoDeError1").value;
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
    $("#TipoDeError").append("<option value=''>--SELECCIONE--</option>");
    $("#TipoDeError").append("<option value='NO APLICA'>--NO APLICA--</option>");
    $('#TipoDeError').find('option:not(:first)').remove();

}
$('#TipoDeError').change(function () {
    var NuevaIdSelesct = document.getElementById("TipoDeError");
    var NuevoText = NuevaIdSelesct.options[NuevaIdSelesct.selectedIndex].text;
    $('#TipoDeError1').val(NuevoText);
})
$('#CanalDeIngreso').change(function () {
    var NuevaIdSelesct = document.getElementById("CanalDeIngreso");
    var NuevoText = NuevaIdSelesct.options[NuevaIdSelesct.selectedIndex].text;
    $('#CanalDeIngreso1').val(NuevoText);
})
$('#ErrorSolicitud').change(function () {
    var Eserror = $('#ErrorSolicitud').val();
    var val1 = "NO APLICA";
    var val2 = "";
    if (Eserror == "SI") {
        $('#UsuarioSolicitud').prop('readonly', false); $('#UsuarioSolicitud').val(val2);
        $('#UsuarioSolicitud').prop('placeholder', 'Ingrese el usuario');
        $("#TipoDeError").empty();
        TraerArbolTipoDeError();
    } else {
        $('#UsuarioSolicitud').prop('readonly', true); $('#UsuarioSolicitud').val(val1);
        $("#TipoDeError").empty();
        $('#TipoDeError').prop('readonly', true);
        $("#TipoDeError").append("<option value='NO APLICA'>NO APLICA</option>");
        $('#TipoDeError1').val(val1);
    }
})
$('#SelectGestion').change(function () {
    $('#Subrazon').find('option:not(:first)').remove();
    ListaSubrazones();
    var NuevaIdGestion = document.getElementById("SelectGestion");
        var NuevaGestion = NuevaIdGestion.options[NuevaIdGestion.selectedIndex].text;
        $('#SelectGestion1').val(NuevaGestion);
  
})
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
    }
    $('#FechaDeSeguimiento').datetimepicker({
        minDate: '0',
        dateFormat: 'd-m-Y 00:00',
        timepicker: true,
        step: 30
    });
    LimpiarFecha();
}
function TraerListaGestionUsuario() {
    $.ajax({
        type: "GET",
        url: UrlListaDeGestion,
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
        url: UrlListaDeSeguimientos,
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
    window.location.href = 'DesconexionesIn?IdGestion=' + dataItem.IdGestion;
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
        var IdGes = $("#IdGestion").val();
        if (IdGes <= 0) {
            DatosClienteCuenta1(Cuenta);
        }
    }

});
function DatosClienteCuenta1(Cuenta) {
    $('#Nombre').focus();
    $.ajax({
        type: "POST",
        url: UrlInformacionCliente,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var Nota1 = json.Nota1;
            var Nota2 = json.Nota2;
            if (json.IdGestion > 0) {
                $.alert({
                    theme: 'Modern',
                    icon: 'fa fa-warning',
                    boxWidth: '500px',
                    useBootstrap: false,
                    type: 'red',
                    title: '¡ Oops !',
                    content: 'La Cuenta ya Fue Gestionada Durante el Mes en Curso',
                    buttons: {
                        Ok: {
                            btnClass: 'btn-red',
                            action: function () { location.reload(); }

                        },
                    }
                });
            }
            else {
                DatosClienteCuenta(Cuenta);
            }
           
        }
    });

}
function DatosClienteCuenta(Cuenta) {
    $('#Nombre').focus();
    $.ajax({
        type: "POST",
        url: UrlInformacionCliente2,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ CuentaCliente: Cuenta }),
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            var Nota1 = json.Nota1;
            var Nota2 = json.Nota2;
            if (json.Id > 0) {
                $.alert({
                    theme: 'Modern',
                    icon: 'fa fa-warning',
                    boxWidth: '500px',
                    useBootstrap: false,
                    type: 'red',
                    title: '¡ Oops !',
                    content: 'La Cuenta se Encuentra Asignada en la Base Potencial',
                    buttons: {
                        Ok: {
                            btnClass: 'btn-red',
                            action: function () {
                                for (var i = 0; i < json.length; i++) {
                                    json[i].FechaDeSolicitud = kendo.toString(kendo.parseDate(json[i].FechaDeSolicitud, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
                                    json[i].FechaDeCorte = kendo.toString(kendo.parseDate(json[i].FechaDeCorte, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
                                    json[i].FechaDePreaviso = kendo.toString(kendo.parseDate(json[i].FechaDePreaviso, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
                                    json[i].FechaDeAsignacion = kendo.toString(kendo.parseDate(json[i].FechaDeAsignacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
                                }
                                $('#Id').val(json.Id);
                                $('#Nota1').val(json.Nota1);
                                $('#Nota2').val(json.Nota2);
                                $('#FechaDeSolicitud').val(json.FechaDeSolicitud);
                                $('#FechaDeSolicitud').prop('readonly', true);
                                $('#FechaDeCorte').val(json.FechaDeCorte);
                                $('#FechaDeCorte').prop('readonly', true);
                                $('#FechaDePreaviso').val(json.FechaDePreaviso);
                                $('#FechaDePreaviso').prop('readonly', true);
                                $('#FechaDeAsignacion').val(json.FechaDeAsignacion);
                                $('#FechaDeAsignacion').prop('readonly', true);
                                $('#CanalDeIngreso1').val(json.CanalDeIngreso);
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
                                FormatoFechas();
                            }

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
                    content: 'No Existe Información de la Cuenta, Por Favor Suministrela',
                    buttons: {
                        Ok: {
                            btnClass: 'btn-red',
                            action: function () {
                                $('#Nota1').val(Nota1);
                                $('#Nota2').val(Nota2);
                                FormatoFechas();
                            }
                        },
                    }
                });
            }
        }
    });

}
function FormatoFechas() {
    var IdGes = $("#Id").val();
    if (IdGes <= 0) {
        $('#FechaDeSolicitud').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });

        $('#FechaDeCorte').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });
        $('#FechaDePreaviso').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });
        $('#FechaDeAsignacion').datetimepicker({
            format: 'Y-m-d',
            timepicker: false
        });
    }
}
function seleccionarNota1() {
    document.getElementById("Nota1").selectionStart = 0;

}
function seleccionarNota2() {
    document.getElementById("Nota2").selectionStart = 0;

}
function Limpiar() {
    var valor1 = "";

    $('#Id').val(valor1);
    $('#Id').val(valor1);
    $('#Nota1').val(valor1);
    $('#Nota2').val(valor1);
    $('#FechaDeSolicitud').val(valor1);
    $('#FechaDeSolicitud').prop('readonly', true);
    $('#FechaDeCorte').val(json.FechaDeCorte);
    $('#FechaDeCorte').prop('readonly', true);
    $('#FechaDePreaviso').val(json.FechaDePreaviso);
    $('#FechaDePreaviso').prop('readonly', true);
    $('#FechaDeAsignacion').val(json.FechaDeAsignacion);
    $('#FechaDeAsignacion').prop('readonly', true);
    $('#CanalDeIngreso1').val(json.CanalDeIngreso);
}
