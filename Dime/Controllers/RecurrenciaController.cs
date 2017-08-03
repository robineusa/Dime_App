using Dime.Helpers;
using Newtonsoft.Json;
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
        WSD.RecurrenciaServiceClient recurrencia;
        


        public RecurrenciaController()
        {
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            recurrencia = new WSD.RecurrenciaServiceClient();
            recurrencia.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult Recurrencia()
        {
            ViewModelRecurrencia model = new ViewModelRecurrencia();
            model.ClientesTodos = recurrencia.TraerInformacionCuentaRecurrencia(Convert.ToInt32(Session["IdUsuario"].ToString()));
            var Cuenta = model.ClientesTodos.Cuenta;
            model.CargueBase = recurrencia.TraerDatosRecurrencia(Convert.ToInt32(Session["IdUsuario"].ToString()), Cuenta);
            return View(model);
        }
        [HttpPost]
        public ActionResult Recurrencia(ViewModelRecurrencia model, string BotonEnvia)
        {
            //model.ClientesTodos = inboundService.TraerClienteCompletoPorCuenta(model.ClientesTodos.Cuenta);
            

            return View(model);
            
        }
        public JsonResult MacroProcesoRecurrenciaList(int idProceso)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetOpcionesRecurrencia(idProceso)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}
