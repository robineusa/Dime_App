var IdGerenciasArray = [];
var IdAliadosArray = [];
var IdOperacionesArray = [];

$(document).ready(function () {
    TraerListaGerenciasActivas();
});


function TraerListaGerenciasActivas() {


    $.ajax({
        type: "GET",
        url: UrlGerenciasActivas,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            LlenarListaGerenciasActivas(json);
        }


    });


};

function LlenarListaGerenciasActivas(data) {
    $("#ListaDeGerenciasActivas").empty();
    var table = document.getElementById("ListaDeGerenciasActivas");
    var i = 0;
    do {

        var row = table.insertRow(0);
        for (var j = 0; j < 7 && i < data.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style.width = "200px";
            newCell.style.padding = "4px";
            newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:200px">' +
                                               ' <input type="checkbox" name="gerencia" class="minimal" value="' + data[i].IdGerencia + '" onchange="VerificarValorCheck(event);"  /> ' + data[i].NombreGerencia +
                                    '</label>';
        }

    } while (i < data.length)

}

function VerificarValorCheck(e) {
    if ($(e.target).is(':checked')) {
        var Id = $(e.target).val();
        IdGerenciasArray.push(Id);
        IdAliadosArray = [];
        IdAliadosArray.length = 0;
        IdOperacionesArray = [];
        IdOperacionesArray.length = 0;
        TraerListaDeAliadosSelect();
    } else {
        var Id = $(e.target).val();
        var indice = IdGerenciasArray.indexOf(Id); // obtenemos el indice
        IdGerenciasArray.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        IdAliadosArray = [];
        IdAliadosArray.length = 0;
        IdOperacionesArray = [];
        IdOperacionesArray.length = 0;
        $("#ListaDeOperacionesActivas").empty();
        document.getElementById('Guardado').style.display = 'none';
        if (IdGerenciasArray != "") {
            TraerListaDeAliadosSelect();
        } else {
            $("#ListaDeAliadosActivos").empty();
            
        }
    }
   
}

//traer informacion de aliados segun gerencias seleccionadas
function TraerListaDeAliadosSelect() {
    IdGerenciasArray;
    console.log(IdGerenciasArray);
    $.ajax({
        type: "POST",
        url: UrlAliadosActivos,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Gerencias: IdGerenciasArray }),
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            LlenarListaAliadosActivos(json);
        }


    });


};
function LlenarListaAliadosActivos(data) {
   
        $("#ListaDeAliadosActivos").empty();
        var table = document.getElementById("ListaDeAliadosActivos");
        var i = 0;
        do {

            var row = table.insertRow(0);
            for (var j = 0; j < 7 && i < data.length; j++, i++) {
                var newCell = row.insertCell(j);
                newCell.style.width = "200px";
                newCell.style.padding = "4px";
                newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:200px">' +
                                                   ' <input type="checkbox" name="aliado" class="minimal" value="' + data[i].IdAliado + '" onchange="VerificarValorCheckAliado(event);"  /> ' + data[i].NombreAliado +
                                        '</label>';
            }

        } while (i < data.length)
   
}
function VerificarValorCheckAliado(e) {
    if ($(e.target).is(':checked')) {
        var Id = $(e.target).val();
        IdAliadosArray.push(Id);
        IdOperacionesArray = [];
        IdOperacionesArray.length = 0;
        TraerListaOperacionesSelectAliados();
    } else {
        var Id = $(e.target).val();
        var indice = IdAliadosArray.indexOf(Id); // obtenemos el indice
        IdAliadosArray.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        IdOperacionesArray = [];
        IdOperacionesArray.length = 0;
        document.getElementById('Guardado').style.display = 'none';
        if (IdAliadosArray != "") {
            TraerListaOperacionesSelectAliados();
        } else {
            $("#ListaDeOperacionesActivas").empty();
           
        }

    }

}

//traer informacion de operaciones segun los aliados seleccionados
function TraerListaOperacionesSelectAliados() {
    IdGerenciasArray;
    IdAliadosArray;
    $.ajax({
        type: "POST",
        url: UrlOperacionesActivas,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Gerencias: IdGerenciasArray, Aliados: IdAliadosArray }),
        dataType: 'json',
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);
            LlenarListaOperacionesActivas(json);
        }


    });


};
function LlenarListaOperacionesActivas(data) {

    $("#ListaDeOperacionesActivas").empty();
    var table = document.getElementById("ListaDeOperacionesActivas");
    var i = 0;
    do {

        var row = table.insertRow(0);
        for (var j = 0; j < 7 && i < data.length; j++, i++) {
            var newCell = row.insertCell(j);
            newCell.style.width = "200px";
            newCell.style.padding = "4px";
            newCell.innerHTML = '  <label style="font-weight: 400; padding:5px;  border-color: burlywood; background-color:rgba(222, 184, 135, 0.8); width:200px">' +
                                               ' <input type="checkbox" name="operaciones" class="minimal" value="' + data[i].IdOperacion + '" onchange="VerificarValorCheckOperacion(event);"  /> ' + data[i].NombreOperacion +
                                    '</label>';
        }

    } while (i < data.length)

}
function VerificarValorCheckOperacion(e) {
    if ($(e.target).is(':checked')) {
        var Id = $(e.target).val();
        IdOperacionesArray.push(Id);
        document.getElementById('Guardado').style.display = 'inline-block';
    } else {
        var Id = $(e.target).val();
        var indice = IdOperacionesArray.indexOf(Id); // obtenemos el indice
        IdOperacionesArray.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        
        if (IdOperacionesArray != "") {
            document.getElementById('Guardado').style.display = 'inline-block';
           
        } else {
            document.getElementById('Guardado').style.display = 'none';
        }

    }

}
function RegistrarOperaciones() {
    IdOperacionesArray;
    var IdRegistro = $("#IdRegistro").val();
    
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlRegistrarOperaciones,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Operaciones: IdOperacionesArray, IdRegistro: IdRegistro}),
        dataType: "json",
        success: function (result) {
            window.location.href = 'RegistrodeIncidentes';
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
}
