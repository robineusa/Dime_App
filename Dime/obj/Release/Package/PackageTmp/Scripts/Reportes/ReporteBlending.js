var Datos = "";
$(document).ready(function () {
    $.ajax({
        type: "POST",
        contentType: false,
        url: 'ReporteFormulario',
        processData: false,
        cache: false,
        success: function (result) {
            alert(result);
            Datos = result;
            ShowAmcharts(result);
        },
        error: function (result) {
            var errors = result.responseJSON;
            alert('Error ' + errors);
        }
    });
    
});



function ShowAmcharts(Data) {
    var Datos = Data;
    alert(Datos);
    var chart = AmCharts.makeChart("chartdiv", {
        "theme": "light",
        "type": "serial",
        "startDuration": 1,
        "dataProvider": //Datos,
        [{
            "COUNTRY": "Poland",
            "VISITS": 328,
            "color": "#000000"
        }],
        "valueAxes": [{
            "position": "left",
            "title": "visits"
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "VISITS"
        }],
        "depth3D": 20,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "COUNTRY",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
        },
        "export": {
            "enabled": true
        }

    });
}



