
var chart = AmCharts.makeChart("chartdiv", {
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

});