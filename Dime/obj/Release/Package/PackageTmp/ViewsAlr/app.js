angular.module('dimeApp', ['ngRoute', 'kendo.directives'])
       .config(function($routeProvider)
       {
           $routeProvider
               .when("/mainAccessBlending", {
                   templateUrl: "ViewsAlr/ConsultasBlendingAdmin/MainAccess.html",
                   controller: "mainAccessController"
               })
              .when("/ConsultaGestionAdmin", {
                  templateUrl: "ViewsAlr/ConsultasAdmin/ConsultaGestion.html",
                  controller:"ConsultaGestionController"
              })
               .when("/DepuracionCasoCelula/:idIngreso/:marcacion", {
                   templateUrl: "ViewsAlr/CasosCelulaEdit/DepuracionCasos.html",
                   controller: "DepuraCasosCellController"
               })
             .when("/AdministrarCaso/:idIngreso", {
                 templateUrl: "ViewsAlr/CasosAdmin/AdminCasos.html",
                 controller: "AdminCasosController"
             })
       })









