

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
    $('#tbAdicionales').val(0);
}

function ConfigRadioButtonVoz() {
    document.getElementById('cbVozNo').checked = true;
    var allRadios = document.getElementsByName('vozCheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {

        allRadios[x].onclick = function () {
         
            if (booRadio == this) {
                this.checked = false;
                document.getElementById('cbVozNo').checked = true;

                booRadio = null;
            } else {
                booRadio = this;
              
            }
            ActualizarParametros();
        };
    }
}

function ActualizarParametros()
{
    var vozSelected = $("input[name=vozCheck]:checked").val();
    var tvSelected = $("input[name=tvCheck]:checked").val();
    var interSelected = $("input[name=interCheck]:checked").val();
    var estrato = $("#tbEstrato").val();

    $.ajax({
        type: "GET",
        url: urlConsultaTarifaNueva,
        contentType: "application/json; charset=utf-8",
        data: { estrato: estrato, voz: vozSelected, tv: tvSelected, internet: interSelected },
        dataType: "json",
        success: function (result) {
            var json = JSON.parse(result);
            if (json != null)
            {
                console.log(json);
                $("#tbTarifaOfrecida").val(json.CodTarifaRes);
                $("#tbIncluyeHD").val(json.IncluyeHd);
                $("#tbIncluyeCV").val(json.InclyeClarovideo);
                $("#tbIncluyePVR").val(json.IncluyePvr);
                $("#tbAutollenado").val(json.RentaTotal);
                $("#tbAdicionales").val(0);
            }
            else {
                $("#tbTarifaOfrecida").val(0);
                $("#tbIncluyeHD").val(0);
                $("#tbIncluyeCV").val(0);
                $("#tbIncluyePVR").val(0);
                $("#tbAutollenado").val(0);

            }
            CalcularRentaOfrecidaYIncremento();
        }

    });


}

function CalcularRentaOfrecidaYIncremento()
{
    var operacion = (parseInt($("#tbAutollenado").val()) + parseInt($("#tbAdicionales").val()) );
    $("#tbRentaOfrecida").val(operacion);
    operacion = (parseInt($("#tbAutollenado").val()) + parseInt($("#tbAdicionales").val()));
    $("#tbRentaOfrecidaRestar").val(operacion);
    operacion = (parseInt($("#tbRentaOfrecidaRestar").val()) - parseInt($('#tbRentaActualDos').val()));
    $('#tbIncremento').val(operacion);
}

$("input[type=checkbox]").on("click", function () {
    if ($(this).is(":not(:checked)"))
    {
        var resultado = parseInt(($('#tbAdicionales').val() == null) ? 0 : $('#tbAdicionales').val()) - parseInt($(this).val());
        $('#tbAdicionales').val(resultado);
    } else {
        var resultado = parseInt(($('#tbAdicionales').val() == null) ? 0 : $('#tbAdicionales').val()) + parseInt($(this).val());
        $('#tbAdicionales').val(resultado);
    }
        
    CalcularRentaOfrecidaYIncremento();
});


function ConfigRadioButtonTV()
{
    document.getElementById('cbTvNO').checked = true;
    $(".adicionales").prop("disabled", true);
    var allRadios = document.getElementsByName('tvCheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {

        allRadios[x].onclick = function () {
          
            if (booRadio == this) {
                this.checked = false;
                document.getElementById('cbTvNO').checked = true;
                $(".adicionales").prop("disabled", true);
                $(".adicionales").attr('checked', false);
                booRadio = null;
            } else {
                booRadio = this;
                $(".adicionales").prop("disabled", false);
            }

            ActualizarParametros();
        };
    }
}

function ConfigRadioButtonInternet() {
    document.getElementById('cbInterNO').checked = true;
    var allRadios = document.getElementsByName('interCheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {
        allRadios[x].onclick = function () {
            if (booRadio == this) {
                this.checked = false;
                document.getElementById('cbInterNO').checked = true;
                booRadio = null;
            } else {
                booRadio = this;
            }
            ActualizarParametros();
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
            if (json == "[object Object]") {
                $("#tbEstrato").val(json.Estrato);
                $("#tbCampañaVigente").val((json.CampanaAplicada == 0) ? "NO" : "SI");
                $("#tbFechaVencCampaña").val((json.FechaFinCampa == 0) ? "NO HAY FECHA" : json.FechaFinCampa + " (AñoMesDia)");
                $("#tbTarifaActual").val(json.Tarifa);
                $("#tbRentaActual").val(json.RentaTotal);
                $("#tbVozInfo").val(json.Voz);
                $("#tbTvInfo").val(json.TipoTv);
                var internet = (json.VelocidadInternet / 1000);
                $("#tbInternetInfo").val(internet + " MB");
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
            if (json == null || json == "null") { alert("La cuenta digitada no existe"); }

        },
        error: function (request, status, error) {
            alert("error");

        }
    });

}