using Dime.Helpers;
using Newtonsoft.Json;
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdminArboles(Arbol model, string Envia)
        {
            if (Envia == "Guardar" && model.NombreArbol != "")
            {
                model.CodigoHtml = string.Empty;
                ProcesosService.CrearArbol(model);
                ViewBag.Mensaje = "Arbol Guardado";
            }
            else
            {
                ViewBag.Mensaje = "El Nombre del Arbol NO Puede ser Vacio";
            }
            return View(model);
        }

        [HttpGet]
        public ActionResult EditarArbol()
        {
            return View();
        }

        [HttpPost]
        public ActionResult EditarArbol(string nombreNodo)
        {
            Nodo nodo = new Nodo();
      
            return View();

        }

        public JsonResult LLamarArbolId(string IDdArbol)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarArbol(Convert.ToInt32(IDdArbol))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult RetornaIdNodo(string IDPadre, string IDdArbol, string NombreNodo)
        {
            Nodo model = new Nodo();
            if (IDPadre == "NombreArbol") { model.IdPadre = 0; } else { model.IdPadre = Convert.ToInt32(IDPadre); }
            model.IdArbol = Convert.ToInt32(IDdArbol);
            model.NombreNodo = NombreNodo;
            ProcesosService.CrearNodo(model);

            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarNodoCreado(Convert.ToInt32(IDdArbol))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult ActualizaCodigoHTMLArbol(string CodigoHTML, string IDdArbol)
        {
            Arbol model = new Arbol();

            model.Id = Convert.ToInt32(IDdArbol);
            model.CodigoHtml = CodigoHTML;
            ProcesosService.ActualizaHTMLArbol(model);

            var jsonResult = Json(JsonConvert.SerializeObject("Proceso Exitoso"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult ConsultaArboles()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ListaArboles()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult EliminarNodo(string IdNodo)
        {
            int idNodo = Convert.ToInt32(IdNodo);
            ProcesosService.EliminaNodo(idNodo);

            var jsonResult = Json(JsonConvert.SerializeObject("Se eliminó exitosamente"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult CambiarNombreNodo(string IdNodo,string NombreNuevo)
        {
            int idNodo = Convert.ToInt32(IdNodo);
            ProcesosService.CambiarNombreNodo(idNodo, NombreNuevo);

            var jsonResult = Json(JsonConvert.SerializeObject("Cambio de nombre exitoso"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult GuardarCodigoHtmlNodo(string IdNodo,string CodigoHtml)
        {
            int idNodo = Convert.ToInt32(IdNodo);
            ProcesosService.GuardarCodigoHtmlNodo(idNodo, CodigoHtml);

            var jsonResult = Json(JsonConvert.SerializeObject("Cambio de nombre exitoso"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultarCodigoHtmlNodo(string IdNodo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarCodigoHtmlNodo(Convert.ToInt32(IdNodo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}
