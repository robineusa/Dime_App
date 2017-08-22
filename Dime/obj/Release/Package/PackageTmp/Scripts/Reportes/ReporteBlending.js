
$(document).ready(function () {
    $.ajax({
        type: "POST",
        contentType: false,
        url: 'ReporteFormulario',
        processData: false,
        cache: false,
        success: function (result) {
            var json = JSON.parse(result);
            $("#OpcionesFormulario").empty();
            $("#OpcionesFormulario").append("<option value=''>--Select Option--</option>");
            for (var index = 0, len = json.length; index < len; index++) {
                $('#OpcionesFormulario').append($('<option>', {
                    value: json[index].FORMULARIO_DESTINO,
                    text: json[index].FORMULARIO_DESTINO
                }));
            }
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
        "type": "serial",
        "angle": 30,
        "depth3D": 60,
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
            "title":"Formulario de Destino"

        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "FORMULARIO_DESTINO",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 0,
            "boldLabels": true,

        },
        "balloon": {
            "animationDuration": 0.3
        },
        "legend": {
            "enabled": true,
            "labelText": "[[title]]",
            "useGraphSettings": true,
            "backgroundColor": "#676767",
            "useGraphSettings": true
        },
        "export": {
            "enabled": false
        }

    });
}

function SetGraficaOperacion()
{
    var OpForm = $("#OpcionesFormulario").val();
    
    if (OpForm != "")
    {
        $.ajax({
            type: "GET",
            contentType: false,
            url: 'ReporteOperacion',
            data: {Formulario: OpForm},
            processData: true,
            cache: true,
            success: function (result) {
                var json = JSON.parse(result);
                $("#OpcionesCampana").empty();
                $("#OpcionesCampana").append("<option value=''>--Select Option--</option>");
                for (var index = 0, len = json.length; index < len; index++) {
                    $('#OpcionesCampana').append($('<option>', {
                        value: json[index].OperacionDestino,
                        text: json[index].OperacionDestino
                    }));
                }
                ShowAmchartsOperacion(result);
                $("#Grafico_Operacion").css("display", "block");
            },
            error: function (result) {
                var errors = result.responseJSON;
                alert('Error ' + errors);
            }
        });
    }
    else
    {
        $("#Grafico_Operacion").css("display", "none");
        $("#Grafico_Campaña").css("display", "none");
    }
}

function ShowAmchartsOperacion(Data) {
    var Datos = $.parseJSON(Data);
    var chart = AmCharts.makeChart("chartdiv2", {
        "angle": 30,
        "depth3D": 60,
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
            "valueField": "Cantidad",
            "fillAlphas": 0.76,
            "fillColors": "#F23636",
            "fillAlphas": 0.5,
            "title":"Operación de Destino"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "OperacionDestino",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 0
        },
        "balloon": {
            "animationDuration": 0.3
        },
        "legend": {
            "enabled": true,
            "labelText": "[[title]]",
            "useGraphSettings": true,
            "backgroundColor": "#676767",
            "useGraphSettings": true
        },
        "export": {
            "enabled": false
        }

    });
}

function SetGraficaCampaña()
{
    var OpForm = $("#OpcionesFormulario").val();
    var OpOper = $("#OpcionesCampana").val();

    if (OpForm != "")
    {
        if (OpOper != "") {
            $.ajax({
                type: "GET",
                contentType: false,
                url: 'ReporteCampaña',
                data: { Formulario: OpForm, Operacion: OpOper },
                processData: true,
                cache: true,
                success: function (result) {

                    ShowAmchartsCampaña(result);
                    $("#Grafico_Campaña").css("display", "block");
                },
                error: function (result) {
                    var errors = result.responseJSON;
                    alert('Error ' + errors);
                }
            });
        }
        else
        {
            $("#Grafico_Campaña").css("display", "none");
        }
    }
    else
    {
        $("#Grafico_Operacion").css("display", "none");
        
    }
}

function ShowAmchartsCampaña(Data) {
    var Datos = $.parseJSON(Data);
    var chart = AmCharts.makeChart("chartdiv3", {
        "angle": 30,
        "depth3D": 60,
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
            "valueField": "Cantidad",
            "fillAlphas": 0.3,
            "fillColors": "#F23636",
            "title":"Campaña de Destino"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "CampanaDestino",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 0,
            "boldLabels": true,
        },
        "balloon": {
            "animationDuration": 0.3
        },
        "legend": {
            "enabled": true,
            "labelText": "[[title]]",
            "useGraphSettings": true,
            "backgroundColor": "#676767",
            "useGraphSettings": true
        },
        "export": {
            "enabled": false
        }

    });
}
