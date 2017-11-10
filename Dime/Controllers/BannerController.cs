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
    public class BannerController : Controller
    {
        WSD.ActivacionClaroVideoServiceClient clarovideowebservice;
        WSD.ActivacionSiembraHDServiceClient acsiembrahdwebservice;

        public BannerController()
        {
            clarovideowebservice = new WSD.ActivacionClaroVideoServiceClient();
            clarovideowebservice.ClientCredentials.Authenticate();
            acsiembrahdwebservice = new WSD.ActivacionSiembraHDServiceClient();
            acsiembrahdwebservice.ClientCredentials.Authenticate();
        }
        public ActionResult BannerAlertas(string CuentaCliente)
        {
            decimal Cuenta = Convert.ToDecimal(CuentaCliente);
            return View();

        }
        public ActionResult ConvenioElectronico()
        {
            return View();
        }
    }
}