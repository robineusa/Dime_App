﻿//var bPreguntar = true;
var lockScreenShow = false;
var closingPage = false;
var mouseMovedTimeAgo = false;
var lockScreenTrigger = setTimeout(function () {
}, (20000*3*20));


$(document).ready(function () {
    ResetearDivs();
    if (closingPage == false) {
        ResetearTiempoLockScreen();
    }
});


window.onbeforeunload = function (e) {
    KillTimeLockScreen();
};

function KillTimeLockScreen()
{
    closingPage = true;
    clearTimeout(lockScreenTrigger);
    lockScreenTrigger = setTimeout(function () {
        console.log("ejecutado  borrado");
    }, (20000 * 3 * 20));
    console.log("page exit");

}

/**/
window.onmousemove = function (e) {
    if (lockScreenShow == false && closingPage == false) {
        ResetearTiempoLockScreen();
    }
    /*if (mouseMovedTimeAgo == false)
        {
    if (lockScreenShow == false && closingPage== false) {
        ResetearTiempoLockScreen();
        mouseMovedTimeAgo = true;
        ResetTimeMuseMoved();
       }
       }
       */
}

function ResetTimeMouseMoved() {
    setTimeout(function () {
        mouseMovedTimeAgo = false;
    }, 5000)
}

window.onclick = function (event) {
    if (lockScreenShow == false && closingPage == false) {
        ResetearTiempoLockScreen();
    }
}


window.onkeypress = function (event) {
    if (lockScreenShow == false) {
        ResetearTiempoLockScreen();
    }
}


function ResetearTiempoLockScreen() {
    console.log("resetea lock");
    if (closingPage == false) {
        clearTimeout(lockScreenTrigger);
        lockScreenTrigger = setTimeout(function () {
            lockScreenShow = true;
            $("#lockScreenActivate").click();
        }, (20000 * 3 * 20));
    }
}



function LockScreen() {
    $.ajax({
        type: "GET",
        url: urlLockScreen,
        dataType: "html",
        success: function (result) {
            $("#lockScreenDiv").html(result);
        }
    })
}

function LlamarCalculosCampanas() {

    $.ajax({
        type: "GET",
        url: urlCampanasView,
        dataType: "html",
        success: function (result) {
            $('#campanasBody').html(result);
        }
    })
}


function LlamarCalculosCompensacion() {

    $.ajax({
        type: "GET",
        url: urlCompensacionView,
        dataType: "html",
        success: function (result) {
            $('#compensacionBody').html(result);
        }
    })
}


function LlamarCalculosDiferenciaTarifas() {

    $.ajax({
        type: "GET",
        url: urlDiferenciaTarifasView,
        dataType: "html",
        success: function (result) {
            $('#diferenciaTarifasBody').html(result);
        }
    })
}


function LlamarCalculosProrrateos() {

    $.ajax({
        type: "GET",
        url: urlProrrateosView,
        dataType: "html",
        success: function (result) {
            $('#prorrateosBody').html(result);
        }
    })
}

function LlamarCalculosRentas() {

    $.ajax({
        type: "GET",
        url: urlRentasView,
        dataType: "html",
        success: function (result) {
            $('#rentasBody').html(result);
        }
    })
}
function LlamarVisualizadorImagenes() {

    $.ajax({
        type: "GET",
        url: urlVisualizadorImagenes,
        dataType: "html",
        success: function (result) {
            $('#Viewimagenes').html(result);
        }
    })
}

function ResetearDivs() {

    var vacio = $("<div></div>");
    $('#diferenciaTarifasBody').html(vacio);
    $('#compensacionBody').html(vacio);
    $('#campanasBody').html(vacio);
    $('#prorrateosBody').html(vacio);
    $("#lockScreenDiv").html(vacio);
    $("#rentasBody").html(vacio);
}

(function ($, AdminLTE) {




    "use strict";
    /**
     * List of all the available skins
     *
     * @type Array
     */
    var my_skins = [
      "skin-blue",
      "skin-black",
      "skin-red",
      "skin-yellow",
      "skin-purple",
      "skin-green",
      "skin-blue-light",
      "skin-black-light",
      "skin-red-light",
      "skin-yellow-light",
      "skin-purple-light",
      "skin-green-light"
    ];

    //Create the new tab
    var tab_pane = $("<div />", {
        "id": "control-sidebar-theme-demo-options-tab",
        "class": "tab-pane"
    });

    //Create the tab button
    var tab_button = $("<li />")
        .html("<a href='#control-sidebar-theme-demo-options-tab' data-toggle='tab'>"
        + "<i class='fa fa-wrench'></i>"
        + "</a>");


    //Add the tab button to the right sidebar tabs
    $("[href='#control-sidebar-home-tab']")
        .parent()
        .after(tab_button);

    //Create the menu
    var demo_settings = $("<div />");

    //Layout options
    //demo_settings.append(
    //    "<h4 class='control-sidebar-heading'>"
    //    + "Layout Options"
    //    + "</h4>"
    //      //Fixed layout
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-layout='fixed' class='pull-right'/> "
    //    + "Fixed layout"
    //    + "</label>"
    //    + "<p>Activate the fixed layout. You can't use fixed and boxed layouts together</p>"
    //    + "</div>"
    //      //Boxed layout
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-layout='layout-boxed'class='pull-right'/> "
    //    + "Boxed Layout"
    //    + "</label>"
    //    + "<p>Activate the boxed layout</p>"
    //    + "</div>"
    //      //Sidebar Toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-layout='sidebar-collapse' class='pull-right'/> "
    //    + "Toggle Sidebar"
    //    + "</label>"
    //    + "<p>Toggle the left sidebar's state (open or collapse)</p>"
    //    + "</div>"
    //      //Sidebar mini expand on hover toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-enable='expandOnHover' class='pull-right'/> "
    //    + "Sidebar Expand on Hover"
    //    + "</label>"
    //    + "<p>Let the sidebar mini expand on hover</p>"
    //    + "</div>"
    //      //Control Sidebar Toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-controlsidebar='control-sidebar-open' class='pull-right'/> "
    //    + "Toggle Right Sidebar Slide"
    //    + "</label>"
    //    + "<p>Toggle between slide over content and push content effects</p>"
    //    + "</div>"
    //      //Control Sidebar Skin Toggle
    //    + "<div class='form-group'>"
    //    + "<label class='control-sidebar-subheading'>"
    //    + "<input type='checkbox' data-sidebarskin='toggle' class='pull-right'/> "
    //    + "Toggle Right Sidebar Skin"
    //    + "</label>"
    //    + "<p>Toggle between dark and light skins for the right sidebar</p>"
    //    + "</div>"
    //);
    var skins_list = $("<ul />", { "class": 'list-unstyled clearfix' });

    //Dark sidebar skins
    var skin_blue =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-blue' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Azul</p>");
    skins_list.append(skin_blue);
    var skin_black =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-black' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Negro</p>");
    skins_list.append(skin_black);
    var skin_purple =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-purple' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Purpura</p>");
    skins_list.append(skin_purple);
    var skin_green =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-green' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Verde</p>");
    skins_list.append(skin_green);
    var skin_red =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-red' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Rojo</p>");
    skins_list.append(skin_red);
    var skin_yellow =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-yellow' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #222d32;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin'>Amarillo</p>");
    skins_list.append(skin_yellow);

    //Light sidebar skins
    var skin_blue_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-blue-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px; background: #367fa9;'></span><span class='bg-light-blue' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Azul Claro</p>");
    skins_list.append(skin_blue_light);
    var skin_black_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-black-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div style='box-shadow: 0 0 2px rgba(0,0,0,0.1)' class='clearfix'><span style='display:block; width: 20%; float: left; height: 7px; background: #fefefe;'></span><span style='display:block; width: 80%; float: left; height: 7px; background: #fefefe;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Negro Claro</p>");
    skins_list.append(skin_black_light);
    var skin_purple_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-purple-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-purple-active'></span><span class='bg-purple' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Purpura Claro</p>");
    skins_list.append(skin_purple_light);
    var skin_green_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-green-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-green-active'></span><span class='bg-green' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Verde Claro</p>");
    skins_list.append(skin_green_light);
    var skin_red_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-red-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-red-active'></span><span class='bg-red' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px'>Rojo Claro</p>");
    skins_list.append(skin_red_light);
    var skin_yellow_light =
        $("<li />", { style: "float:left; width: 33.33333%; padding: 5px;" })
            .append("<a href='javascript:void(0);' data-skin='skin-yellow-light' style='display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)' class='clearfix full-opacity-hover'>"
            + "<div><span style='display:block; width: 20%; float: left; height: 7px;' class='bg-yellow-active'></span><span class='bg-yellow' style='display:block; width: 80%; float: left; height: 7px;'></span></div>"
            + "<div><span style='display:block; width: 20%; float: left; height: 20px; background: #f9fafc;'></span><span style='display:block; width: 80%; float: left; height: 20px; background: #f4f5f7;'></span></div>"
            + "</a>"
            + "<p class='text-center no-margin' style='font-size: 12px;'>Amarillo Claro</p>");
    skins_list.append(skin_yellow_light);

    demo_settings.append("<h4 class='control-sidebar-heading'>Temas</h4>");
    demo_settings.append(skins_list);

    tab_pane.append(demo_settings);
    $("#control-sidebar-stats-tab").after(tab_pane);

    setup();

    /**
     * Toggles layout classes
     *
     * @param String cls the layout class to toggle
     * @returns void
     */
    function change_layout(cls) {
        $("body").toggleClass(cls);
        AdminLTE.layout.fixSidebar();
        //Fix the problem with right sidebar and layout boxed
        if (cls == "layout-boxed")
            AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        if ($('body').hasClass('fixed') && cls == 'fixed') {
            AdminLTE.pushMenu.expandOnHover();
            AdminLTE.layout.activate();
        }
        AdminLTE.controlSidebar._fix($(".control-sidebar-bg"));
        AdminLTE.controlSidebar._fix($(".control-sidebar"));
    }

    /**
     * Replaces the old skin with the new skin
     * @param String cls the new skin class
     * @returns Boolean false to prevent link's default action
     */
    function change_skin(cls) {
        $.each(my_skins, function (i) {
            $("body").removeClass(my_skins[i]);
        });

        $("body").addClass(cls);
        store('skin', cls);
        return false;
    }

    /**
     * Store a new settings in the browser
     *
     * @param String name Name of the setting
     * @param String val Value of the setting
     * @returns void
     */
    function store(name, val) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(name, val);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Get a prestored setting
     *
     * @param String name Name of of the setting
     * @returns String The value of the setting | null
     */
    function get(name) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(name);
        } else {
            window.alert('Please use a modern browser to properly view this template!');
        }
    }

    /**
     * Retrieve default settings and apply them to the template
     *
     * @returns void
     */
    function setup() {
        var tmp = get('skin');
        if (tmp && $.inArray(tmp, my_skins))
            change_skin(tmp);

        //Add the change skin listener
        $("[data-skin]").on('click', function (e) {
            e.preventDefault();
            change_skin($(this).data('skin'));
        });

        //Add the layout manager
        $("[data-layout]").on('click', function () {
            change_layout($(this).data('layout'));
        });

        $("[data-controlsidebar]").on('click', function () {
            change_layout($(this).data('controlsidebar'));
            var slide = !AdminLTE.options.controlSidebarOptions.slide;
            AdminLTE.options.controlSidebarOptions.slide = slide;
            if (!slide)
                $('.control-sidebar').removeClass('control-sidebar-open');
        });

        $("[data-sidebarskin='toggle']").on('click', function () {
            var sidebar = $(".control-sidebar");
            if (sidebar.hasClass("control-sidebar-dark")) {
                sidebar.removeClass("control-sidebar-dark")
                sidebar.addClass("control-sidebar-light")
            } else {
                sidebar.removeClass("control-sidebar-light")
                sidebar.addClass("control-sidebar-dark")
            }
        });

        $("[data-enable='expandOnHover']").on('click', function () {
            $(this).attr('disabled', true);
            AdminLTE.pushMenu.expandOnHover();
            if (!$('body').hasClass('sidebar-collapse'))
                $("[data-layout='sidebar-collapse']").click();
        });

        // Reset options
        if ($('body').hasClass('fixed')) {
            $("[data-layout='fixed']").attr('checked', 'checked');
        }
        if ($('body').hasClass('layout-boxed')) {
            $("[data-layout='layout-boxed']").attr('checked', 'checked');
        }
        if ($('body').hasClass('sidebar-collapse')) {
            $("[data-layout='sidebar-collapse']").attr('checked', 'checked');
        }

    }
})(jQuery, $.AdminLTE);

//window.onbeforeunload = preguntarAntesDeSalir;
//function preguntarAntesDeSalir() {
//    if (bPreguntar == true) {

//    }
//}
