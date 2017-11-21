﻿using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class ProcesosController : Controller
    {
        WSD.ProcesosServiceClient ProcesosService;

        public ProcesosController()
        {
            ProcesosService = new WSD.ProcesosServiceClient();
            ProcesosService.ClientCredentials.Authenticate();
        }

        [HttpGet]
        public ActionResult GestionNoCheck()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AdminArboles()
        {
            return View();
        }

        [HttpGet]
        public ActionResult EditarArbol()
        {
            ViewModelProcesos vmp = new ViewModelProcesos();
            vmp.ListarNodos = ProcesosService.ConsultarNodos(1);
            return View();
        }

        [HttpPost]
        public ActionResult EditarArbol(string nombreNodo)
        {
            Nodo nodo = new Nodo();
            nodo.IdPadre = 0;
            nodo.NombreNodo = nombreNodo;
            nodo.IdArbol = 1;
            ProcesosService.CrearNodo(nodo);
            return View();

        }

    }
}
