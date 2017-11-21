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

        [HttpGet]
        public ActionResult EditarArbol()
        {
            return View();
        }

        [HttpPost]
        public ActionResult EditarArbol(string nombreNodo)
        {
          
            return View();

        }

        public JsonResult LLamarArbolId(string IDdArbol)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarNodos(Convert.ToInt32(IDdArbol))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        
    }
}
