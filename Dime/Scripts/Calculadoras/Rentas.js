var ip = 0;
var decosInicial = 0;
var decosNagraInicial = 0;


$(document).ready(function () {

    $("#tbCuenta").on("keyup", function (e) {

        var code = e.keyCode || e.which;
        if (code == 13) {
            CargarDatosActuales();
            decosInicial = 0;
            decosNagraInicial = 0;
        }
    });



    $(".claroAdicional").on("click", function (e) {

        CalcularAdicionalesClickeado();
    });

    $("#tbTotalDecos").on("change", function (e) {

        CalcularAdicionalesClickeado();
    })


    $("#tbDecosNagra").on("change", function (e) {

        CalcularAdicionalesClickeado();
    })

    Rentas();
});

function Rentas()
{
    $(".adicionales").attr('checked', false);
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
        //alert('1' + booRadio);
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
    //alert(vozSelected + ','+tvSelected + ','+interSelected + ',');
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
            CalcularAdicionalesClickeado();
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
    document.getElementById("tbIncremento").style.fontWeight = "bold";
    if (operacion < 0) { document.getElementById("tbIncremento").style.color = "RED"; }
    if (operacion <= 10000 && operacion >= 0) { document.getElementById("tbIncremento").style.color = "ORANGE"; }
    if (operacion > 10000 ) { document.getElementById("tbIncremento").style.color = "GREEN"; }
}
    

function CalcularAdicionalesClickeado() {
    var tipoTv = document.getElementById("tbTvInfo").value;
    if (tipoTv == "TV SATELITAL (B)" || tipoTv == "TV SATELITAL (A)" || tipoTv == "TV SATELITAL (S)") {
     
        var arriendoDecos = 0;
        if (parseInt($("#tbTotalDecos").val()) == 3 || parseInt($("#tbTotalDecos").val()) == 2) { arriendoDecos = (10000 * (parseInt($("#tbTotalDecos").val()) - 1)) } else { if (parseInt($("#tbTotalDecos").val()) > 3) { arriendoDecos = ((15000 * (parseInt($("#tbTotalDecos").val()) - 3)) + 20000); } else { arriendoDecos = 0; } }
        $('#tbAdicionales').val(arriendoDecos);
    }
    else
    {
        var itemsAdicionales = document.getElementsByClassName("adicionales");
        var resultado = 0;
        var x = 0;
        for (x = 0; x < itemsAdicionales.length; x++) {
            if (itemsAdicionales[x].checked) {
                resultado = resultado + parseInt($(itemsAdicionales[x]).val());
            }
        }
        var adicionalesTv = resultado;
        var homIp = 0;
        if (ip > 0) { homIp = 4200; } else { homIp = 0; }
        var arriendoDecos = 0;
        if (parseInt($("#tbTotalDecos").val()) > 2) { arriendoDecos = (10000 * ($("#tbTotalDecos").val() - 2)) } else { arriendoDecos = 0; }
        var homPvrHd = 0;
        if ($("#tbIncluyeHD").val() == "SI" && (parseInt($("#tbTotalDecos").val()) > 2))
        { homPvrHd = (5000 * (parseInt($("#tbTotalDecos").val()) - 2)); }
        else {
            var tvSelected = $("input[name=tvCheck]:checked").val();
            if (tvSelected == "AVANZADA" && $("#tbIncluyeHD").val() == "NO" && parseInt($("#tbTotalDecos").val()) > 2) {
                homPvrHd = (5000 * (parseInt($("#tbTotalDecos").val()) - 2))
            } else {
                homPvrHd = 0;
            }
        }
        var arriendoNagra = 0;
        if (parseInt($("#tbDecosNagra").val()) == 2)
        {
            arriendoNagra = 15000;
        }else{
        if (parseInt($("#tbDecosNagra").val()) >= 3) {
            arriendoNagra = ((20000 * (parseInt($("#tbDecosNagra").val()) - 2)) + 15000);
        } else { arriendoNagra = 0; }
        }

        var adicionalClaro = 0;
        if (document.getElementById('cbClaroVideoSi').checked &&  $("#tbIncluyeCV").val() == "NO"  )
        {
            adicionalClaro = 13900;
        }

        var resultadoFinal = adicionalesTv + homIp + arriendoDecos + homPvrHd + arriendoNagra + adicionalClaro;
        $('#tbAdicionales').val(resultadoFinal);

    }

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
                $('#tbTotalDecos').val(0);
                $('#tbDecosNagra').val(0);
                booRadio = null;
            } else {
                booRadio = this;
                if ($(this).val() == "NO") {
                    $(".adicionales").prop("disabled", true); $(".adicionales").attr('checked', false);
                    $('#tbTotalDecos').val(0);
                    $('#tbDecosNagra').val(0);
                }
                else{
                    $(".adicionales").prop("disabled", false);
                    $('#tbTotalDecos').val(decosInicial);
                    $('#tbDecosNagra').val(decosNagraInicial);
                   }
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
         
         var tvDividida = tv.split(" ");
         if (tvDividida[0] == "BASICA" || tvDividida[0] == "AVANZADA" || tvDividida[0] == "SUPERIOR")
         {
             $("[value='" + tv + "']").click();
         } else
            {
             if (tvDividida[2] == "(B)") { $("#cbTvSatelitalBasica").click(); }
             if (tvDividida[2] == "(A)") { $("#cbTvSatelitalAvanzada").click(); }
             if (tvDividida[2] == "(S)") { $("#cbTvSatelitalSuperior").click(); }
         }

         if(tvDividida[0] == "BASICA"  && $("#tbSrvHdInfo").val() == "SI")
         {
             var tv = "AVANZADA";
             $("[value='" + tv + "']").click();
         }

        }
  
     if (internet != "NO") {
            $("[value='" + internet + "']").click();
     }

     setTimeout(function () {
         ActualizarParametros();
     }, (2000));

   
}


function SetOptionsForTipoTV(tipoTv)
{
    if(tipoTv == "NO" ||tipoTv == "BASICA" || tipoTv == "AVANZADA" || tipoTv == "SUPERIOR"  )
    {
        $(".TvSatelital").hide();
        $("#rowDecosNagra").show();
    }
    if (tipoTv == "TV SATELITAL (B)" || tipoTv == "TV SATELITAL (A)" || tipoTv == "TV SATELITAL (S)") {
        $(".TvNormal").hide();
        document.getElementById("cbVoz").disabled = true;
        document.getElementById("cbVozNo").disabled = true;
        document.getElementById("cbInterNO").disabled = true;
        document.getElementById("cb5Mb").disabled = true;
        document.getElementById("cb10Mb").disabled = true;
        document.getElementById("cb20Mb").disabled = true;
        document.getElementById("cb50Mb").disabled = true;
        document.getElementById("cb100Mb").disabled = true;
        $("#tablaAdicionales").hide();
        $("#rowDecosNagra").hide();
    }

}

function RehabilitarDatosDeshabilitados()
{
    document.getElementById("cbVoz").disabled = false;
    document.getElementById("cbVozNo").disabled = false;
    document.getElementById("cbInterNO").disabled = false;
    document.getElementById("cb5Mb").disabled = false;
    document.getElementById("cb10Mb").disabled = false;
    document.getElementById("cb20Mb").disabled = false;
    document.getElementById("cb50Mb").disabled = false;
    document.getElementById("cb100Mb").disabled = false;
    document.getElementById("tbTotalDecos").disabled = false;
    document.getElementById("tbDecosNagra").disabled = false;

}

function CargarDatosActuales()
{
    $("#tablaAdicionales").show();
    $(".TvNormal").show();
    $(".TvSatelital").show();
    RehabilitarDatosDeshabilitados();
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
                SetOptionsForTipoTV(json.TipoTv);
                var internet = (json.VelocidadInternet / 1000);
                $("#tbInternetInfo").val(internet + " MB");
                $("#tbHBOInfo").val(json.Hbo);
                $("#tbFoxInfo").val(json.Fox);
                $("#tbUFCInfo").val(json.Ufc);
                $("#tbGoldenInfo").val(json.Gld);
                $("#tbRevistaInfo").val(json.Revista);
                $("#tbClaroVideoInfo").val(json.ClaroVideo);
                $("#tbSrvHdInfo").val(json.SrvHd);
                $("#tbHotPackInfo").val(json.Adultos);
                $("#tbTotalDecos").val(json.CantidadDecos);
                decosInicial = json.CantidadDecos;
                $("#tbDecosHD").val(json.CantidadHd);
                $("#tbDecosNagra").val(json.DecosNagra);
                decosNagraInicial = json.DecosNagra;
                $("#tbRentaActualDos").val(json.RentaTotal);
                if (json.ClaroVideo == "SI") { $("#cbClaroVideoSi").click(); } else { $("#cbClaroVideoNo").click(); }
                ip = json.Ip;
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