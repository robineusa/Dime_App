
$(document).ready(function () {
    TraerListaDeAliadosAfectados();
    TraerListaDelLogDeIncidentes();
});


function TraerListaDeAliadosAfectados() {
    var IdRegistro = $('#idRegistro').val()
        $.ajax({
        type: "GET",
        url: UrlAliadosAfectados,
        contentType: "application/json; charset=utf-8",
        data: { IdRegistro: IdRegistro },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            LlenarAliadosAfectados(json);
        }


    });


};

function LlenarAliadosAfectados(data) {
    $("#ListaDeAliadosAfectadosTableRojo").empty();
    var table = document.getElementById("ListaDeAliadosAfectadosTableRojo");
    $("#ListaDeAliadosAfectadosTableNaranja").empty();
    var table2 = document.getElementById("ListaDeAliadosAfectadosTableNaranja");
    $("#ListaDeAliadosAfectadosTableVerde").empty();
    var table3 = document.getElementById("ListaDeAliadosAfectadosTableVerde");
    var i = 0;
    do {
        var row = table.insertRow(0);
        for (var j = 0; j < 1 && i < data.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style = "border-style:solid;border-color:black;background:none;border-width:1px;padding-left:5px;";
            newCell.innerHTML = '  <label class="Aliados">' + data[i].NombreAliado + '</label>';
        }

    } while (i < data.length)

    var p = 0;
    do {
        var row = table2.insertRow(0);
        for (var j = 0; j < 1 && p < data.length; j++, p++) {
            var newCell = row.insertCell(j);
            newCell.style = "border-style:solid;border-color:black;background:none;border-width:1px;padding-left:5px;";
            newCell.innerHTML = '  <label class="Aliados">' + data[p].NombreAliado + '</label>';
        }

    } while (p < data.length)

    var s = 0;
    do {
        var row = table3.insertRow(0);
        for (var j = 0; j < 1 && s < data.length; j++, s++) {
            var newCell = row.insertCell(j);
            newCell.style = "border-style:solid;border-color:black;background:none;border-width:1px;padding-left:5px;";
            newCell.innerHTML = '  <label class="Aliados">' + data[s].NombreAliado + '</label>';
        }

    } while (s < data.length)
}



function TraerListaDelLogDeIncidentes() {
    var IdRegistro = $('#idRegistro').val()
    $.ajax({
        type: "GET",
        url: UrlLogDeIncident,
        contentType: "application/json; charset=utf-8",
        data: { IdRegistro: IdRegistro },
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            cambiarfechas(json);
            LlenarListaDeLogIncidentes(json);
        }


    });


};
function cambiarfechas(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].FechaUltimaActualizacion = kendo.toString(kendo.parseDate(data[i].FechaUltimaActualizacion, 'yyyy-MM-ddTHH:mm:ss'), 'yyyy-MM-dd HH:mm:ss');
        }
}
function LlenarListaDeLogIncidentes(data) {
    $("#LogGestionIncidentes").empty();
    var table = document.getElementById("LogGestionIncidentes");
    var i = 0;
    do {

        var row = table.insertRow(0);
        for (var j = 0; j < 1 && i < data.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style = "background:none;padding:10px;";
            newCell.innerHTML = '<div class="User">' + data[i].FechaUltimaActualizacion + ' >> ' + data[i].NombreUsuarioUltimaActualizacion + '</div><div class="Comentarios">' + data[i].DescripcionAfectacion + '</div>';
        }

    } while (i < data.length)

}