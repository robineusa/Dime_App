using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    public class ConsultasAdminController : Controller
    {

        WSD.CasosAdminServiceClient casosAdminService;
        WSD.BlendingServiceClient blendingService;

        [AllowAnonymous]
        public ActionResult Paloteo()
        {
            return View();
        }


        [AllowAnonymous]
        public JsonResult PaloteoConsulta(string fechaInicial, string fechaFinal)
        {   casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
            DateTime inicial = Convert.ToDateTime(fechaInicial);
            DateTime final = Convert.ToDateTime(fechaFinal);
            return new JsonResult
            {   Data =  JsonConvert.SerializeObject(casosAdminService.ListaPaloteo(inicial,final)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }



        [AllowAnonymous]
        public ActionResult ConsultasBlending()
        {
            return View();
        }



        [AllowAnonymous]
        public JsonResult JsonConvenioElectronico(string fechaInicio, string fechaFin)
        {
            blendingService = new WSD.BlendingServiceClient();
            blendingService.ClientCredentials.Authenticate();
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(blendingService.ListaConveniosElectronicosGestionados(inicial, final)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
                
            };            
        }


        [AllowAnonymous]
        public JsonResult JsonClaroVideo(string fechaInicio, string fechaFin)
        {
            blendingService = new WSD.BlendingServiceClient();
            blendingService.ClientCredentials.Authenticate();
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaClaroVideosGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior= JsonRequestBehavior.AllowGet

            };
        }


        [AllowAnonymous]
        public JsonResult JsonDocsisOverlap(string fechaInicio, string fechaFin)
        {
            blendingService = new WSD.BlendingServiceClient();
            blendingService.ClientCredentials.Authenticate();
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaDocsisOverlapGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [AllowAnonymous]
        public JsonResult JsonCierreCiclo(string fechaInicio, string fechaFin)
        {
            blendingService = new WSD.BlendingServiceClient();
            blendingService.ClientCredentials.Authenticate();
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaCierresCicloGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [AllowAnonymous]
        public JsonResult JsonListaGestionAdmin(string fechaInicio, string fechaFin, string aliado)
        {
            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = casosAdminService.ListaGestionAdmin(inicial, final, aliado);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        [AllowAnonymous]
        public JsonResult JsonAliadosNames()
        {
            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
            var aliadosList = casosAdminService.ListaAliadosActualesDeHolos();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(aliadosList),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }
    }
}