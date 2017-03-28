

$(document).ready(function () {

    $("#tbCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            CargarDatosActuales();
        }
    })





});




function CargarDatosActuales()
{
    var cuentaCliente = $("#tbCuenta").val();

    $.ajax({
        type: "GET",
        url: urlConsultaDatosActuales,
        contentType: "application/json; charset=utf-8",
        data: { cuenta: cuentaCliente },
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            console.log(json);

            $("#tbEstrato").val(json.Estrato);
            $("#tbCampañaVigente").val((json.CampanaAplicada == 0) ? "NO" : "SI");
            $("#tbFechaVencCampaña").val((json.FechaFinCampa == 0) ? "NO HAY FECHA" : json.FechaFinCampa+"(añomesdia)");
            $("#tbTarifaActual").val();
            $("#tbRentaActual").val();
            $("#tbVozInfo").val();
            $("#tbTvInfo").val();
            $("#tbInternetInfo").val();
            $("#tbHBOInfo").val();
            $("#tbFoxInfo").val();
            $("#tbUFCInfo").val();
            $("#tbGoldenInfo").val();
            $("#tbRevistaInfo").val();
            $("#tbHotPackInfo").val();
            $("#tbTotalDecos").val();
            $("#tbRentaActualDos").val();
         

        }

    });

}