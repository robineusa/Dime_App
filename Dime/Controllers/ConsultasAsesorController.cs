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
    public class ConsultasAsesorController : Controller
    {

       private  WSD.InboundServiceClient inboundService;


        // GET: ConsultasAsesor
        [AllowAnonymous]
        public ActionResult ConsultaGestion()
        {
            return View();
        }


        [AllowAnonymous]
        public JsonResult ConsultaGestionData(string fechaInicial, string fechaFinal)
        {
            DateTime inicial = Convert.ToDateTime(fechaInicial);
            DateTime final = Convert.ToDateTime(fechaFinal);
             inboundService  = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            string idUsuario = Session["IdUsuario"].ToString();
            var resultadoFaca = inboundService.ConsultaGestion(inicial, final, idUsuario);

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(resultadoFaca),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };

        }

   

        [AllowAnonymous]
        public ActionResult ConsultaSeguimientos()
        { 
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            string idUsuario = Session["IdUsuario"].ToString();
            List<Ingreso> model = inboundService.ConsultaSegumiento(idUsuario);
            return View(model);
        }
    }
}
