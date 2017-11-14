
//function LlamarConvenioElectronico() {
//    $.ajax({
//        type: "GET",
//        url: urlConvenioElectronicoView,
//        dataType: "html",
//        success: function (result) {
//            $('#ConvenioBody').html(result);
//        }
//    });
//    //var data = { Cuenta: DataCuenta };
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlUsabilidadConvenio,
//    //    data: data,
//    //    contentType: false,
//    //    success: function (result) {

//    //    }
//    //});

//}

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

//function LlamarClaroVideo() {
//    $.ajax({
//        type: "GET",
//        url: urlClaroVideoView,
//        dataType: "html",
//        success: function (result) {
//            $('#ClaroVideoBody').html(result);
//        }
//    });
//    //var data = { Cuenta: choosenCuenta };
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlUsabilidadClaroVideo,
//    //    data: data,
//    //    contentType: false,
//    //    success: function (result) {

//    //    }
//    //});
//}

//function LlamarSMO() {
//    alert('si');
//    document.getElementById('ismo').contentWindow.SetearTiposContacto();
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlSMOView,
//    //    dataType: "html",
//    //    success: function (result) {
//    //        $('#SMOBody').html(result);
//    //        alert(result);
//    //    }
//    //});
//    //var data = { Cuenta: choosenCuenta };
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlUsabilidadSMO,
//    //    data: data,
//    //    contentType: false,
//    //    success: function (result) {

//    //    }
//    //});
//}

//function LlamarSiembraHD() {
//    $.ajax({
//        type: "GET",
//        url: urlSiembraHDView,
//        dataType: "html",
//        success: function (result) {
//            $('#SiembraBody').html(result);
//        }
//    });
//    //var data = { Cuenta: choosenCuenta };
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlUsabilidadSiembraHD,
//    //    data: data,
//    //    contentType: false,
//    //    success: function (result) {

//    //    }
//    //});
//}

//function LlamarMejorasTecnicas() {
//    $.ajax({
//        type: "GET",
//        url: urlMejorasTecnicas,
//        dataType: "html",
//        success: function (result) {
//            $('#MejorasTBody').html(result);
//        }
//    });
//    //var data = { Cuenta: choosenCuenta };
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlUsabilidadMejorasTecnicas,
//    //    data: data,
//    //    contentType: false,
//    //    success: function (result) {

//    //    }
//    //});
//}

//function LlamarFOX() {
//    $.ajax({
//        type: "GET",
//        url: urlFOX,
//        dataType: "html",
//        success: function (result) {
//            $('#FOXTBody').html(result);
//        }
//    });
//    //var data = { Cuenta: choosenCuenta };
//    //$.ajax({
//    //    type: "GET",
//    //    url: urlUsabilidadFOX,
//    //    data: data,
//    //    contentType: false,
//    //    success: function (result) {

//    //    }
//    //});
//}


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