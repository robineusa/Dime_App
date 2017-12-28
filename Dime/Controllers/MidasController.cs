using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    public class MidasController : Controller
    {
        [HttpGet]
        public ActionResult Tipificador()
        {
            return View();
        }
        [HttpGet]
        public ActionResult AdministrarArboles()
        {
            return View();
        }

    }
}
