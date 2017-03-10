$('input').on('keydown', function (event) {

    var x = event.which;
    if (x === 13) {
     
        TryUnlockDisplay();
    }
});
$('#bUnlock').on("click", function () {
    TryUnlockDisplay();
})

$(document).ready(function () {

    $("#modalActivar").click();
    setTimeout(function () {
        $("#lockPassword").focus();
    }, 1000);

    $.ajax({
        type: "GET",
        url: urlCerrarSesion,
    })

})




function TryUnlockDisplay()
{

    $.ajax({
        type: "GET",
        url: urlUnlockScreen,
        contentType: "application/json; charset=utf-8",
        data: { cedula: cedulaUsuario, contra: $('#lockPassword').val() },
        dataType: "JSON",
        success: function (result) {
       
            if(result == "true")
            {
                closingPage = false;
                lockScreenShow = false;
                $('#ventanaPrincipal').modal('hide');
            } else {
                $('#contraIncorrecta').show();
            }
        }
    });


}