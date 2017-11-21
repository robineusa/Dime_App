using Dime.Helpers;
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
            ViewModelProcesos NodosPadres = new ViewModelProcesos();
            ViewModelProcesos ColeccionVmp = new ViewModelProcesos();
            ViewModelProcesos Union;

            ColeccionVmp.NombreArbol = "Arbol pruebas";
            //Consulta los nodos
            vmp.ListarNodos = ProcesosService.ConsultarNodos(1);

            //Filtra solo los nodos padre
            NodosPadres.ListarNodos = (from n in vmp.ListarNodos
                                       where n.IdPadre == 0
                                       select n).ToList();

            //Agrega los nodos hijos a los padres
            foreach (var item in NodosPadres.ListarNodos)
            {
                Union = new ViewModelProcesos();
                Union.ListarNodos.Add(item);
                Union.NodosHijos = (from n in vmp.ListarNodos
                                    where n.IdPadre != 0 && n.IdPadre == item.Id
                                    select n).ToList();

                ColeccionVmp.ColeccionVmp.Add(Union);
            }

            return View(ColeccionVmp);
        }

        [HttpPost]
        public ActionResult EditarArbol(string nombreNodo)
        {
            Nodo nodo = new Nodo();
            nodo.IdPadre = 0;
            nodo.NombreNodo = nombreNodo;
            nodo.IdArbol = 1;
            ProcesosService.CrearNodo(nodo);
            EditarArbol();
            return View();

        }

    }
}
