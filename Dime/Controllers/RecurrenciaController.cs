using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class RecurrenciaController : Controller
    {
        WSD.InboundServiceClient inboundService;

        public RecurrenciaController()
        {
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult Recurrencia()
        {
            ViewModelRecurrencia model = new ViewModelRecurrencia();
            return View(model);
        }
        [HttpPost]
        public ActionResult Recurrencia(ViewModelRecurrencia model, string BotonEnvia)
        {
            model.ClientesTodos = inboundService.TraerClienteCompletoPorCuenta(model.ClientesTodos.Cuenta);
            return View(model);
            
        }
    }
}
