using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class CierreDeCicloController : MyController
    {

        public CierreDeCicloController()
        {

        }

        // GET: CierreDeCiclo
        public ActionResult ResidencialPredictivoConsulta()
        {
            return View("ConsultaGestiones");
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
            return View("HistorialGestiones");
        }

        public ActionResult ResidencialPotencialHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }

        public ActionResult InstalacionHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }
        public ActionResult PymesHistorial()
        {
            return View("HistorialGestiones");
        }





    }
}