using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class CierreDeCicloController : MyController
    {

        WSD.CierreCicloServiceClient cierreCicloService;

        public CierreDeCicloController()
        {
            cierreCicloService = new WSD.CierreCicloServiceClient();
            cierreCicloService.ClientCredentials.Authenticate();
        }

        // GET: CierreDeCiclo
        public ActionResult ResidencialPredictivoConsulta()
        {
            ViewBag.ConsultaPost = "ResidencialPredictivoConsultaPost";
            return View("ConsultaGestiones");
        }

        [HttpPost]
        public ActionResult ResidencialPredictivoConsultaPost(CCConsultaGestionesViewModel model)
        {
            return RedirectToAction("ResidencialPredictivoHistorial", "CierreDeCiclo", new {cuenta = model.cuenta });
        }

        public ActionResult ResidencialPotencialConsulta()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult InstalacionConsulta()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult PymesConsulta()
        {
            return View("ConsultaGestiones");
        }



        public ActionResult ResidencialPredictivoHistorial(string cuenta)
        {
            ViewModelHistorialGestiones model  = new ViewModelHistorialGestiones();
            float cuentaFloat = float.Parse(cuenta);
            model.predictivoModel = cierreCicloService.ListaResidencialPredictivoDeCuenta(cuentaFloat);
            return View("HistorialGestiones", model);
        }

        public ActionResult ResidencialPotencialHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }

        public ActionResult InstalacionHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }
        public ActionResult PymesHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }


        public ActionResult ResidencialPredictivoTipificador(string idTip, string macro)
        {

            return View();
        }


    }
}