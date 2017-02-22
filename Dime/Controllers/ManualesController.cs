using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    public class ManualesController : Controller
    {
        // GET: Manuales
        [AllowAnonymous]
        [HttpGet]
        public ActionResult ManualAsesor()
        {
           return View();
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult ManualCelula()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult ManualAdministrador()
        {
            return View();
        }


    }
}