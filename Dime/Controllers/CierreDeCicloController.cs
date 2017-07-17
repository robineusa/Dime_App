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
        public ActionResult ResidencialPredictivo()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult ResidencialPotencial()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult Instalacion()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult Pymes()
        {
            return View();
        }




    }
}