using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class PruebasController : MyController
    {
        // GET: Pruebas
        public ActionResult Index()
        {
            return View();
        }
    }
}