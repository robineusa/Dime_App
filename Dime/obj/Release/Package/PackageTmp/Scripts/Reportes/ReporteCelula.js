var gaugeChart = AmCharts.makeChart("chartdiv", {
    "type": "gauge",
    "theme": "none",
    "axes": [{
        "axisThickness": 1,
        "axisAlpha": 3,
        "tickAlpha": 5,
        "valueInterval": 5,
        "bands": [{
            "color": "#da0e08",
            "endValue": 70,
            "innerRadius": "93%",
            "startValue": 0
        }, {
            "color": "#fdd400",
            "endValue": 85,
            "innerRadius": "93%",
            "startValue": 70
        }, {
            "color": "#00a65a",
            "endValue": 100,
            "innerRadius": "93%",
            "startValue": 85
        }],
        "bottomText": "0",
        "bottomTextYOffset": -0,
        "endValue": 100
    }],
    "arrows": [{}],
    "export": {
        "enabled": false
    }
});

setInterval(randomValue, 2000);

// set random value
function randomValue() {
    var value = $('#PuntajeFinal').val();
    if (gaugeChart) {
        if (gaugeChart.arrows) {
            if (gaugeChart.arrows[0]) {
                if (gaugeChart.arrows[0].setValue) {
                    gaugeChart.arrows[0].setValue(value);
                    gaugeChart.axes[0].setBottomText(value);
                }
            }
        }
    }
}