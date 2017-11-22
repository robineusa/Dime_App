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
        WSD.InboundServiceClient inboundservice;
        public RetencionController()
        {
            retencionservice = new WSD.RetencionServiceClient();
            retencionservice.ClientCredentials.Authenticate();
            inboundservice = new WSD.InboundServiceClient();
            inboundservice.ClientCredentials.Authenticate();

        }
        [HttpGet]
        public ActionResult RegistroSetguimientos()
        {
            ViewModelRetencion modelo = new ViewModelRetencion();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegistroSetguimientos(ViewModelRetencion modelo)
        {

            return View();
        }
        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundservice.TraerClienteCompletoPorCuenta(CuentaCliente)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        [HttpPost]
        public JsonResult TraerInformacionClienteCedula(string Cedula)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundservice.ConsultarCuentasPorcedula(Cedula)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
    }
}