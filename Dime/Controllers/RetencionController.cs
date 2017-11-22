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
    public class RetencionController : Controller
    {
        WSD.RetencionServiceClient retencionservice;
        public RetencionController()
        {
            retencionservice = new WSD.RetencionServiceClient();
            retencionservice.ClientCredentials.Authenticate();

        }
        [HttpGet]
        public ActionResult RegistroSetguimientos()
        {
            return View();
        }
    }
}