$(document).ready(function () {
    $('#FechaSeguimiento').datetimepicker({
        //format: 'Y-m-d h:mm',
        //Format: "Y.m.d",
        format: "Y-m-d H:00",
        minDate: '+0d',
        timepicker: true,
    });
    $("#Li1").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li1").css("background-color", "#dcdcdc");
        $("#Li1").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Li3").css("border-color", "transparent");
        $("#Li3").css('background-color', 'transparent');

    });
    $("#Li2").click(function () {

        $("#Li1").css('background-color', 'transparent');
        $("#Li2").css("background-color", "#dcdcdc");
        $("#Li2").css("border-color", "#c23321");
        $("#Li1").css("border-color", "transparent");
        $("#Li3").css("border-color", "transparent");
        $("#Li3").css('background-color', 'transparent');

    });
    $("#Li3").click(function () {

        $("#Li2").css('background-color', 'transparent');
        $("#Li3").css("background-color", "#dcdcdc");
        $("#Li3").css("border-color", "#c23321");
        $("#Li2").css("border-color", "transparent");
        $("#Li1").css("border-color", "transparent");
        $("#Li1").css('background-color', 'transparent');

    });
});