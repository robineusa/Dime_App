

$(document).ready(function () {

    $("#tbCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            CargarDatosActuales();
        }
    })

    Rentas();

});

function Rentas()
{
    ConfigRadioButtonVoz();
    ConfigRadioButtonTV();
    ConfigRadioButtonInternet();

}

function ConfigRadioButtonVoz() {
    document.getElementById()
    var allRadios = document.getElementsByName('vozCheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {

        allRadios[x].onclick = function () {
            ActualizarParametros();
            if (booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
        };
    }
}

function ActualizarParametros()
{
    var vozSelected = $("input[name=vozCheck]:checked").val();
    var tvSelected = $("input[name=tvCheck]:checked").val();
    var intSelected = $("input[name=interCheck]:checked").val();
    console.log(vozSelected + " voz");
    console.log(tvSelected + " tv");
    console.log(intSelected + " internet");


}



function ConfigRadioButtonTV()
{
    var allRadios = document.getElementsByName('tvCheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {

        allRadios[x].onclick = function () {
            ActualizarParametros();
            if (booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
        };
    }
}

function ConfigRadioButtonInternet() {
    var allRadios = document.getElementsByName('interCheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {
        ActualizarParametros();
        allRadios[x].onclick = function () {
            if (booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
        };
    }
}

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
            $("#tbFechaVencCampaña").val((json.FechaFinCampa == 0) ? "NO HAY FECHA" : json.FechaFinCampa+" (AñoMesDia)");
            $("#tbTarifaActual").val(json.Tarifa);
            $("#tbRentaActual").val(json.RentaTotal);
            $("#tbVozInfo").val(json.Voz);
            $("#tbTvInfo").val(json.TipoTv);
            var internet = (json.VelocidadInternet / 1000);
            $("#tbInternetInfo").val(internet +" MB");
            $("#tbHBOInfo").val(json.Hbo);
            $("#tbFoxInfo").val(json.Fox);
            $("#tbUFCInfo").val(json.Ufc);
            $("#tbGoldenInfo").val(json.Gld);
            $("#tbRevistaInfo").val(json.Revista);
            $("#tbHotPackInfo").val(json.Adultos);
            $("#tbTotalDecos").val(json.CantidadDecos);
            $("#tbDecosHD").val(json.CantidadHd);
            $("#tbRentaActualDos").val(json.RentaTotal);
         

        }

    });

}