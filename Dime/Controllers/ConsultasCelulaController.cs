using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ConsultasCelulaController : MyController
    {
        WSD.CasosCelulaServiceClient casosCelulaService;

        // GET: ConsultasCelula
        public ActionResult ConsultaGestion()
        {
            return View();
        }

        public JsonResult ConsultaGestionPost(string fechaInicial, string fechaFinal)
        {   casosCelulaService = new WSD.CasosCelulaServiceClient();
            casosCelulaService.ClientCredentials.Authenticate();
            DateTime inicial = Convert.ToDateTime(fechaInicial);
            DateTime final = Convert.ToDateTime(fechaFinal);
            return new JsonResult
            {   Data =  JsonConvert.SerializeObject(casosCelulaService.ListaGestionCasos(inicial,final, Session["IdUsuario"].ToString())),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }




  



    }
}
