$(document).ready(function () {
    $.datetimepicker.setLocale('es');
    $('#FechaSolicitud').datetimepicker({
        format: 'Y-m-d',
        maxDate: '+0d',
        timepicker: false
    });

    $.datetimepicker.setLocale('es');
    $('#FechaSeguimiento').datetimepicker({
        format: 'Y-m-d',
        maxDate: '+0d',
        timepicker: false
    });
});