var IdGerenciasArray = [];
var IdAliadosArray = [];
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
        TraerListaDeAliadosSelect();
    } else {
        var Id = $(e.target).val();
        var indice = IdGerenciasArray.indexOf(Id); // obtenemos el indice
        IdGerenciasArray.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        TraerListaDeAliadosSelect();
    }
   
}

//traer informacion de aliados segun gerencias seleccionadas
function TraerListaDeAliadosSelect() {
    console.log(IdGerenciasArray);
    alert('si');
    $.ajax({
        type: "GET",
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
        console.log(IdAliadosArray);
    } else {
        var Id = $(e.target).val();
        var indice = IdAliadosArray.indexOf(Id); // obtenemos el indice
        IdAliadosArray.splice(indice, 1); // 1 es la cantidad de elemento a eliminar
        console.log(IdAliadosArray);
    }

}