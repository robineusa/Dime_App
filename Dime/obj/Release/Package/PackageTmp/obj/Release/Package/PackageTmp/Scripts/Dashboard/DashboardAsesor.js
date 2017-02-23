console.log(jsongrafico1);
var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "none",
    "fontSize": 8,
    "marginRight": 70,
    "dataProvider": jsongrafico1,
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "Cantidad por Gestión"
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "Color",
        "fillAlphas": 0.7,
        "lineAlpha": 0.5,
        "type": "column",
        "valueField": "Total",
        
    }],
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "TipoGestion",
    
    "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 0
    }

});

var chart = AmCharts.makeChart("graficoingresossac", {
    "type": "serial",
    "theme": "none",
    "fontSize": 8,
    "marginRight": 70,
    "dataProvider": jsonGraficoIngresosSac,
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "Cantidad por Gestión"
    }],
    "startDuration": 1,
    "graphs": [{
        "balloonText": "<b>[[category]]: [[value]]</b>",
        "fillColorsField": "Color",
        "fillAlphas": 0.7,
        "lineAlpha": 0.5,
        "type": "column",
        "valueField": "Total",

    }],
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "TipoGestion",

    "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 0
    }

});