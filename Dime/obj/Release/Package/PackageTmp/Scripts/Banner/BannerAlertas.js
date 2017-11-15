
function LlamarConvenioElectronico() {
    var Alerta = "CONVENIO ELECTRONICO";
    RegistrarUsoBanner(Alerta);
}

//function LlamarElegidoFijo() {
//    $.ajax({
//        type: "GET",
//        url: urlElegidoView,
//        dataType: "html",
//        success: function (result) {
//            $('#ElegidoBody').html(result);
//        }
//    })
//}

function LlamarClaroVideo() {
    var Alerta = "CLARO VIDEO";
    RegistrarUsoBanner(Alerta);
}

function LlamarSMO() {
    var Alerta = "SIGUIENTE MEJOR OFERTA";
    RegistrarUsoBanner(Alerta);
}

function LlamarSiembraHD() {
    var Alerta = "SIEMBRA HD";
    RegistrarUsoBanner(Alerta);
}

function LlamarMejorasTecnicas() {
    var Alerta = "MEJORAS TECNICAS";
    RegistrarUsoBanner(Alerta);
}

function LlamarFOX() {
    var Alerta = "FOX";
    RegistrarUsoBanner(Alerta);
}

function ResetearDivs() {
    var vacio = $("<div></div>");
    $('#ConvenioBody').html(vacio);
    $('#ElegidoBody').html(vacio);
    $('#ClaroVideoBody').html(vacio);
    $('#SMOBody').html(vacio);
    $('#SiembraBody').html(vacio);
    $('#MejorasTBody').html(vacio);
    $('#FOXTBody').html(vacio);

}

function RegistrarUsoBanner(Alerta) {
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlUsabilidadBanner,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Alerta: Alerta }),
        dataType: "json",
        success: function (result) {
            
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }
    });
}