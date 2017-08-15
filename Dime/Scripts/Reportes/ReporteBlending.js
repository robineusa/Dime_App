//var Datos = "";
$(document).ready(function () {
    $.ajax({
        type: "POST",
        contentType: false,
        url: 'ReporteFormulario',
        processData: false,
        cache: false,
        success: function (result) {
            //alert(result);
            //Datos = result;
            ShowAmcharts(result);
        },
        error: function (result) {
            var errors = result.responseJSON;
            alert('Error ' + errors);
        }
    });
    
});



function ShowAmcharts(Data) {
    var Datos = $.parseJSON(Data);
    
    var chart = AmCharts.makeChart("chartdiv", {
        "theme": "light",
        "type": "serial",
        "startDuration": 1,
        "dataProvider": Datos,
        "valueAxes": [{
            "position": "left",
            "title": "Cantidad"
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "CANTIDAD",
            "fillAlphas": 0.76,
            "fillColors": "#F23636",
            "fillAlphas": 0.7,
        }],
        "depth3D": 20,
        "angle": 40,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "FORMULARIO_DESTINO",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
        },
        "export": {
            "enabled": false
        }

    });
}



