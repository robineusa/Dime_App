function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input id='Archivo' name='Archivo' type='file' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                    TraerListaGerenciasActivas();
                });

                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;

            }

        }
    );

}
$(function () {
    bs_input_file();

});

function TraerListaGerenciasActivas() {
    var file = document.getElementById('Archivo').files[0];
    codificar(file);
    //var imagen = document.createElement("img");
    //imagen.setAttribute("src",file);
    ////var div = document.getElementById("capa");
    //div.appendChild(imagen);

    //$.ajax({
        //    type: "GET",
        //    url: UrlPreCargarImagen,
        //    contentType: "application/json; charset=utf-8",
        //    data: JSON.stringify({ Archivo: file }),
        //    dataType: 'json',
        //    success: function (result) {
        //        var json = JSON.parse(result);
        //        console.log(json);
        //        //LlenarListaGerenciasActivas(json);
        //    }
        //});
    
};
function codificar(im) {
    var i = new Image();
    i.onload = function () {
        var w = this.width,
        h = this.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(i, 0, 0, w, h);
        $('log').innerHTML = canvas.toDataURL().split('base64,')[1];

    }
    i.src = im;
}

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