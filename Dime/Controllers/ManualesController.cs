using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ManualesController : MyController
    {
        // GET: Manuales
        [HttpGet]
        public ActionResult ManualAsesor()
        {
           return View();
        }
  
        [HttpGet]
        public ActionResult ManualCelula()
        {
            return View();
        }
 
        [HttpGet]
        public ActionResult ManualAdministrador()
        {
            return View();
        }


    }
}