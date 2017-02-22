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
    public class ConsultasController : MyController
    {
        private  WSD.CasosCelulaServiceClient casosCelulaService;
        private WSD.CasosAdminServiceClient casosAdminService;
        private WSD.InboundServiceClient inboundService;

        public ActionResult ConsultaCasosAbiertos()
        {
           

            return View();
        }


        public JsonResult ConsultaCasosAbiertosPorCuenta(string cuenta)
        {

            casosCelulaService = new WSD.CasosCelulaServiceClient();
            casosCelulaService.ClientCredentials.Authenticate();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(casosCelulaService.ListaIngresosPorCuenta(cuenta)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }



        public JsonResult ConsultaCasosAbiertosPorIdIngreso(string idIngreso)
        {

            casosCelulaService = new WSD.CasosCelulaServiceClient();
            casosCelulaService.ClientCredentials.Authenticate();

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(casosCelulaService.ListaIngresosPorId(idIngreso)),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult ConsultaCasosAbiertosPorTicketRr(string noTicket)
        {

            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(casosAdminService.ListaIngresosPorTicketRr(noTicket)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult ConsultaCasosAbiertosPorUsuarioCreacion(string ccUsuario)
        {

            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(casosAdminService.ListaIngresosPorUsuarioCreacion(ccUsuario)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


         public ActionResult ConsultaRechazos()
        {
            return View();
        }

        public JsonResult ConsultaRechazosData(string fechaInicial, string fechaFinal)
        {
       
            DateTime inicial = Convert.ToDateTime(fechaInicial);
            DateTime final = Convert.ToDateTime(fechaFinal);
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            string idUsuario = Session["IdUsuario"].ToString();
            bool perfilAdmin;
            if (Convert.ToInt32(Session["ModoLogin"]) == 1) perfilAdmin = true; else perfilAdmin = false;
            var resultadoFaca = inboundService.ConsultaRechazos(inicial, final, idUsuario, perfilAdmin);
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(resultadoFaca),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

    }
}