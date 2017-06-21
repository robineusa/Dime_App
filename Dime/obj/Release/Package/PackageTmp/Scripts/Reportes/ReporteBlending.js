
var chart = AmCharts.makeChart("chartdiv", {
    "theme": "light",
    "type": "serial",
    "startDuration": 1,
    "dataProvider": [{
        "country": "USA",
        "visits": 4025,
        "color": "#FF0F00"
    }, {
        "country": "China",
        "visits": 1882,
        "color": "#FF6600"
    }, {
        "country": "Japan",
        "visits": 1809,
        "color": "#FF9E01"
    }, {
        "country": "Germany",
        "visits": 1322,
        "color": "#FCD202"
    }, {
        "country": "UK",
        "visits": 1122,
        "color": "#F8FF01"
    }, {
        "country": "France",
        "visits": 1114,
        "color": "#B0DE09"
    }, {
        "country": "India",
        "visits": 984,
        "color": "#04D215"
    }, {
        "country": "Spain",
        "visits": 711,
        "color": "#0D8ECF"
    }, {
        "country": "Netherlands",
        "visits": 665,
        "color": "#0D52D1"
    }, {
        "country": "Russia",
        "visits": 580,
        "color": "#2A0CD0"
    }, {
        "country": "South Korea",
        "visits": 443,
        "color": "#8A0CCF"
    }, {
        "country": "Canada",
        "visits": 441,
        "color": "#CD0D74"
    }, {
        "country": "Brazil",
        "visits": 395,
        "color": "#754DEB"
    }, {
        "country": "Italy",
        "visits": 386,
        "color": "#DDDDDD"
    }, {
        "country": "Australia",
        "visits": 384,
        "color": "#999999"
    }, {
        "country": "Taiwan",
        "visits": 338,
        "color": "#333333"
    }, {
        "country": "Poland",
        "visits": 328,
        "color": "#000000"
    }],
    "valueAxes": [{
        "position": "left",
        "title": "Visitors"
    }],
    "graphs": [{
        "balloonText": "[[category]]: <b>[[value]]</b>",
        
        "fillAlphas": 1,
        "lineAlpha": 0.1,
        "type": "column",
        "valueField": "visits"
    }],
    "depth3D": 20,
    "angle": 30,
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "country",
    "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 90
    },
    "export": {
        "enabled": true
    }

});
/*var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "light",
    "legend": {
        "equalWidths": false,
        "useGraphSettings": true,
        "valueAlign": "left",
        "valueWidth": 10,
        "maxColumns": -20,
    },
    "dataProvider": [{
        "Formulario": "Claro Video",
        "distance": 227,
        "townSize": 20,
        "CasosGestionados": 120,
        "Cantidad": 408,
        "CasosNOGestionados": 270
    }, {
        "Formulario": "Activacion",
        "distance": 371,
        "CasosGestionados": 85,
        "Cantidad": 108,
        "CasosNOGestionados": 482
    }, {
        "Formulario": "3",
        "distance": 433,
        "CasosGestionados": 50,
        "Cantidad": 562
    }, {
        "Formulario": "2012-01-04",
        "distance": 345,
        "CasosGestionados": 75,
        "Cantidad": 379,
        "CasosNOGestionados": 157
    }],
    "valueAxes": [{
        "id": "distanceAxis",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "position": "left",
        "title": "Cantidad"
    }, {
        "id": "GestionesAxis",
        "axisAlpha": 0,
        "gridAlpha": 0,
        "labelsEnabled": true,
        "position": "right",
        "title":"Gestiones"
    }, {
        "axisAlpha": 0,
        "gridAlpha": 0,
        "inside": true,
        "position": "right",
        "title": "duration"
    }],
    "graphs": [{
        "alphaField": "alpha",
        "balloonText": "[[value]] Cuentas",
        "dashLengthField": "dashLength",
        "fillAlphas": 0.9,
        "legendPeriodValueText": "Total: [[value.sum]] Cuentas",
        "legendValueText": "[[value]] Cuentas",
        "title": "Cantidad de Cuentas",
        "type": "column",
        "valueField": "Cantidad",
        "valueAxis": "distanceAxis"
    }, {
        "balloonText": "[[value]] casos gestionados",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "useLineColorForBulletBorder": true,
        "bulletColor": "#FFFFFF",
        "bulletSizeField": "10",
        "dashLengthField": "dashLength",
        "descriptionField": "townName",
        "labelPosition": "right",
        "labelText": "[[townName2]]",
        "legendValueText": "[[value]]/[[description]]",
        "title": "Sin Gestionar",
        "fillAlphas": 0,
        "valueField": "CasosGestionados",
        "valueAxis": "GestionesAxis",
        "lineColor": "#CC0000",
        "lineThickness": 2,
        "type": "smoothedLine",
        
    }, {
        "balloonText": "[[value]] casos gestionados",
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "useLineColorForBulletBorder": true,
        "bulletColor": "#FFFFFF",
        "bulletSizeField": "10",
        "dashLengthField": "dashLength",
        "descriptionField": "townName",
        "labelPosition": "right",
        "legendValueText": "[[value]]/[[description]]",
        "title": "Gestionadas",
        "fillAlphas": 0,
        "valueField": "CasosNOGestionados",
        "valueAxis": "GestionesAxis",
        "lineColor": "#008000",
        "lineThickness": 2,
        "type": "smoothedLine",
}],
    "chartCursor": {
        "categoryBalloonDateFormat": "DD",
        "cursorAlpha": 0.1,
        "cursorColor":"#999",
        "fullWidth":true,
        "valueBalloonsEnabled": false,
        "zoomable": false
    },
    "categoryField": "Formulario",
    "categoryAxis": {
        "autoGridCount": false,
        "axisColor": "#555555",
        "gridAlpha": 0.9,
        "gridColor": "#FFFFFF",
        "gridCount": 50
    }

});*/