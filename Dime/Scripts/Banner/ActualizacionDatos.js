var IAsociadosSi = [];
var IAsociadosNo = [];
var ds = "";

$(document).ready(function () {
      ListaDeCuentasPorTelefono();
});

function ListaDeCuentasPorTelefono() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    
    $.ajax({
        type: "GET",
        url: UrlListaDeCuentasPorTelefono,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            generarDataKendo(json);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}
function generarDataKendo(datos) {
  
    ds = new kendo.data.DataSource({
        data: datos
    });
   
}

function cargargrilla(datos) {
 
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        dataSource: ds,
        scrollable: true,
        sortable: true,
        columns: [
        { title: "Seleccionar", template: '<input type="checkbox" name="seleccionar" />', width: 100 },
        { field: "Id", title: "Id", width: 100 },
        { field: "Telefono", title: "Telefono", width: 100 },
        { field: "CuentaAsociada", title: "CuentaAsociada", width: 100 },
        { field: "Direccion", title: "Direccion", width: 100 },
        { field: "Ciudad", title: "Ciudad", width: 100 }
        ]
    });
}

function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';
}
function GuardarInfo(event) {
    alert('paso4');
    //event.preventDefault();
    // se obtienen los items seleccionados. // se buscan con jQuery y Attribute Selectors, // todos aquellos "inputs" de tipo "checkbox",
    // que tengan como nombre "seleccionar" y que además estén "chequeados". // luego se recorren con la función each de jQuery.
    $('input[name=seleccionar][type=checkbox]:checked')
        .each(function (i, checkbox) {
            // obtenemos la fila mas cercana al checkbox // en este caso es la fila en la que se encuentra.
            var $fila = $(checkbox).closest("tr");
            // buscamos dentro de la fila un input que // se llame "comentario" y obtenemos su valor //var comentario = $fila.find('input[name=comentario]').val();
            // se obtiene el identificador unico del item. // es el atributo "data-uid" de la fila.
            var itemUid = $fila.data("uid");
            // se busca el item en base al uid // se usa el método getByUid del kendo.data.DataSource
            var item = ds.getByUid(itemUid);
            var itemId = item.Id;
            //// agregamos el id y el comentario al arreglo //// de ítems seleccionados.
            IAsociadosSi.push(itemId);
        });

    if (document.getElementsByName('seleccionar').checked == true) {
        alert('');
    } else {
        alert('');
    }

    //$('!input[name=seleccionar][type=checkbox]:checked')
    //    .each(function (i, checkbox) {
    //        // obtenemos la fila mas cercana al checkbox // en este caso es la fila en la que se encuentra.
    //        var $fila = $(checkbox).closest("tr");
    //        // buscamos dentro de la fila un input que // se llame "comentario" y obtenemos su valor //var comentario = $fila.find('input[name=comentario]').val();
    //        // se obtiene el identificador unico del item. // es el atributo "data-uid" de la fila.
    //        var itemUid = $fila.data("uid");
    //        // se busca el item en base al uid // se usa el método getByUid del kendo.data.DataSource
    //        var item = ds.getByUid(itemUid);
    //        var itemId = item.Id;
    //        //// agregamos el id y el comentario al arreglo //// de ítems seleccionados.
    //        IAsociadosNo.push(itemId);
    //    });
    console.log(IAsociadosSi);
    console.log(IAsociadosNo);
    ActualizarSolicitudes();
}
$('#guardarcambios').click(function (e) {
    alert('paso4');
    e.preventDefault();
    // se obtienen los items seleccionados. // se buscan con jQuery y Attribute Selectors, // todos aquellos "inputs" de tipo "checkbox",
    // que tengan como nombre "seleccionar" y que además estén "chequeados". // luego se recorren con la función each de jQuery.
    $('input[name=seleccionar][type=checkbox]:checked')
        .each(function (i, checkbox) {
            // obtenemos la fila mas cercana al checkbox // en este caso es la fila en la que se encuentra.
            var $fila = $(checkbox).closest("tr");
            // buscamos dentro de la fila un input que // se llame "comentario" y obtenemos su valor //var comentario = $fila.find('input[name=comentario]').val();
            // se obtiene el identificador unico del item. // es el atributo "data-uid" de la fila.
            var itemUid = $fila.data("uid");
            // se busca el item en base al uid // se usa el método getByUid del kendo.data.DataSource
            var item = ds.getByUid(itemUid);
            var itemId = item.Id;
            //// agregamos el id y el comentario al arreglo //// de ítems seleccionados.
            IAsociadosSi.push(itemId);
        });
    $('input[name=seleccionar][type=checkbox]:unchecked')
        .each(function (i, checkbox) {
            // obtenemos la fila mas cercana al checkbox // en este caso es la fila en la que se encuentra.
            var $fila = $(checkbox).closest("tr");
            // buscamos dentro de la fila un input que // se llame "comentario" y obtenemos su valor //var comentario = $fila.find('input[name=comentario]').val();
            // se obtiene el identificador unico del item. // es el atributo "data-uid" de la fila.
            var itemUid = $fila.data("uid");
            // se busca el item en base al uid // se usa el método getByUid del kendo.data.DataSource
            var item = ds.getByUid(itemUid);
            var itemId = item.Id;
            //// agregamos el id y el comentario al arreglo //// de ítems seleccionados.
            IAsociadosNo.push(itemId);
        });
    console.log(IAsociadosSi);
    console.log(IAsociadosNo);
    ActualizarSolicitudes();
});

function ActualizarSolicitudes() {
    IAsociadosSi;
    IAsociadosNo;
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlGuardarRegistroCliente,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ IAsociadosSi: IAsociadosSi, IAsociadosNo: IAsociadosNo}),
        dataType: "json",
        success: function (result) {
            window.location.href = 'ActualizacionDatos?Data=' + 'GUARDADO';
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }
    });
}