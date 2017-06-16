

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
{   $(".adicionales").attr('checked', false);
    ConfigRadioButtonVoz();
    ConfigRadioButtonTV();
    ConfigRadioButtonInternet();
    ConfigRadioButtonAdicionales();
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

function ConfigRadioButtonAdicionales() {
    var allRadios = document.getElementsByClassName('adicionales');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {
        allRadios[x].onclick = function () {
            if (booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
            CalcularAdicionalesClickeado();
        };
    }
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
    

function CalcularAdicionalesClickeado() {
    var itemsAdicionales = document.getElementsByClassName("adicionales");
    var resultado=0;
    var x = 0;
    for (x = 0; x < itemsAdicionales.length; x++) {
        console.log("Entra a mirar checks")
        if (itemsAdicionales[x].checked) {
            resultado = resultado + parseInt( $(itemsAdicionales[x]).val() );
        }
    }
    $('#tbAdicionales').val(resultado);
    CalcularRentaOfrecidaYIncremento();
};


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



function  SetDataComposicionProductoInicialAdicionales(Hbo, Fox, Ufc, Gld, Revista, Adultos)
{
    if (Hbo == "SI") { $("#cbPromoHBO").click(); }
    if (Fox == "SI") { $("#cbPromoFOX").click(); } 
    if (Ufc == "SI") { $("#cbPromoUFC").click(); } 
    if (Gld == "SI") { $("#cbPromoGolden").click(); } 
    if (Revista == "SI") { $("#cbPromoRevista").click(); } 
    if (Adultos == "SI") { $("#cbPromoHotPack").click(); } 
        setTimeout(function () {
            CalcularAdicionalesClickeado();
        }, (3500));
    
}

function SetDataComposicionProductoInicial(voz, tv, internet)
{
    console.log(internet);
     if (voz == "SI")
        {
        document.getElementById("cbVoz").click();
       }

     if (tv != "NO") {
             $("[value='" + tv + "']").click();
        }
  
     if (internet != "NO") {
            $("[value='" + internet + "']").click();
     }

     setTimeout(function () {
         ActualizarParametros();
     }, (2000));

   
}




function CargarDatosActuales()
{
    var cuentaCliente = $("#tbCuenta").val();
    document.getElementById('cbVozNo').click();
    document.getElementById('cbTvNO').click();
    document.getElementById('cbInterNO').click();
    Rentas();
    $.ajax({
        type: "GET",
        url: urlConsultaDatosActuales,
        contentType: "application/json; charset=utf-8",
        data: { cuenta: cuentaCliente },
        dataType: "json",
        success: function (result) {
            document.getElementById("verificado").style.display = "none"
            document.getElementById("noVerificado").style.display = "none"
            var json = JSON.parse(result);
            console.log(json);
            if (json == "[object Object]") {
                if (json.Verificacion == 1) { document.getElementById("verificado").style.display = "block" } else { document.getElementById("noVerificado").style.display = "block" }
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
                $("#tbDecosNagra").val(json.DecosNagra);
                $("#tbRentaActualDos").val(json.RentaTotal);
                SetDataComposicionProductoInicial(json.Voz, json.TipoTv, internet + " MB");
                SetDataComposicionProductoInicialAdicionales(json.Hbo, json.Fox, json.Ufc, json.Gld, json.Revista, json.Adultos);


            }
            if (json == null || json == "null") { alert("La cuenta digitada no existe"); }

        },
        error: function (request, status, error) {
            alert("error");

        }
    });

}