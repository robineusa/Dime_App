$(document).ready(function () {
    ListaDeUmbrales();

});

function ListaDeUmbrales() {
    document.getElementById('dataLoading').style.display = 'inline-block';
    $.ajax({
        type: "GET",
        url: UrlListaDeUmbrales,
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (result) {
            var json = JSON.parse(result);
            cargargrilla(json);
            finalizaconsulta();
        },
        error: function (request, status, error) {
            alert(request.responseText);
        }
    });
}

function cargargrilla(data) {
    $("#gridViewConsulta").kendoGrid({
        autoBind: true,
        toolbar: ["excel"],
        excel: {
            fileName: "UmbralesBalanced.xlsx",
        },
        dataSource: {
            data: data,
        },
        scrollable: true,
        filterable: {
            extra: false,
            operators: {
                string: {

                    eq: "Es igual a"
                }
            }
        },
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: false,
            buttonCount: 5
        },
        columns: [
        { command: { text: "Editar", click: ActualizarProceso, imageClass: "fa fa-fw fa-pencil-square-o", }, title: "Editar", width: "90px" },
        { command: { text: "Eliminar", click: EliminarSkill, imageClass: "ion-trash-a", }, title: "Eliminar", width: "100px" },
        { field: "Skill", title: "Skill", width: 100 },
        { field: "NombreSkill", title: "Nombre Skill", width: 100 },
        { field: "Tmo", title: "Tmo", width: 100 },
        { field: "LlamadasAtendidas", title: "Llamadas Atendidas", width: 100 },
        { field: "Marcaciones", title: "Marcaciones", width: 100 },
        { field: "AjustesCorrectos", title: "Ajustes Correctos", width: 100 },
        { field: "PqrEscalados", title: "Pqr Escalados", width: 100 },
        { field: "VolumenDeVentas", title: "Volumen De Ventas", width: 100 },
        { field: "Reincidencia", title: "Reincidencia", width: 100 },
        { field: "Recomendacion", title: "Recomendacion", width: 100 },
        { field: "NotaCalidad", title: "Nota Calidad", width: 100 },
        { field: "NotaBuenServicio", title: "Nota Buen Servicio", width: 100 },
        { field: "ActivacionClaroVideo", title: "Activacion Claro Video", width: 100 },
        { field: "ActivacionConvenioElectronico", title: "Activacion Convenio Electronico", width: 100 },
        { field: "UsoCCAA", title: "Uso CCAA", width: 100 }
        ]

    });
}
function finalizaconsulta() {
    document.getElementById('dataLoading').style.display = 'none';

}
function ActualizarProceso(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    window.location.href = 'AdministrarUmbralesBalanced?Skill=' + dataItem.Skill;

};

function EliminarSkill(e) {
    e.preventDefault();
    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
    EliminacionDeSkill(dataItem);
};

function EliminacionDeSkill(data) {
    $.ajax({
        type: "POST",
        traditional: true,
        url: UrlEliminacionSkill,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ Skill: data.Skill }),
        dataType: "json",
        success: function (result) {
            window.location.href = 'ListaDeUmbralesActuales';
        },
        error: function (request, status, error) {
            alert(request.responseText + " " + status + "  " + error);
        }

    });
}
