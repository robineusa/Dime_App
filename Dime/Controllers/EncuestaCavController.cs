using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class EncuestaCavController : MyController
    {
        WSD.POMSolicitudesServiceClient PomService;
        public EncuestaCavController()
        {
            PomService = new WSD.POMSolicitudesServiceClient();
            PomService.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult EncuestadeSatisfaccion()
        {
            POMSolicitudes modelo = new POMSolicitudes();
            return View(modelo);
        }
        [HttpPost]
        public ActionResult EncuestadeSatisfaccion(POMSolicitudes modelo)
        {
            modelo.UsuarioSolicitud = Session["Usuario"].ToString();
            PomService.RegistrarSolicitudPom(modelo);
            PomService.Close();
            return RedirectToAction("EncuestadeSatisfaccion", "EncuestaCav");
        }
        [HttpGet]
        public ActionResult ConsultaEncuestaCavs()
        {
            return View();
        }
        public JsonResult ConsultaEncuestaCavsJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(PomService.ListaSolicitudesPom(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }


    }
}