﻿using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ConsultasAdminController : MyController
    {

        WSD.CasosAdminServiceClient casosAdminService;
        WSD.BlendingServiceClient blendingService;

        public ConsultasAdminController()
        {
            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
            blendingService = new WSD.BlendingServiceClient();
            blendingService.ClientCredentials.Authenticate();
        }
        public ActionResult Paloteo()
        {
            return View();
        }


        public JsonResult PaloteoConsulta(string fechaInicial, string fechaFinal)
        {   
            DateTime inicial = Convert.ToDateTime(fechaInicial);
            DateTime final = Convert.ToDateTime(fechaFinal);
            return new JsonResult
            {   Data =  JsonConvert.SerializeObject(casosAdminService.ListaPaloteo(inicial,final)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }



        public ActionResult ConsultasBlending()
        {
            return View();
        }



         public JsonResult JsonConvenioElectronico(string fechaInicio, string fechaFin)
        {
            
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(blendingService.ListaConveniosElectronicosGestionados(inicial, final)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
                
            };            
        }


        public JsonResult JsonClaroVideo(string fechaInicio, string fechaFin)
        {
            
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaClaroVideosGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior= JsonRequestBehavior.AllowGet

            };
        }


        public JsonResult JsonDocsisOverlap(string fechaInicio, string fechaFin)
        {
         
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaDocsisOverlapGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult JsonCierreCiclo(string fechaInicio, string fechaFin)
        {
            
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaCierresCicloGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

   
        public JsonResult JsonListaGestionAdmin(string fechaInicio, string fechaFin, string aliado)
        {
           
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = casosAdminService.ListaGestionAdmin(inicial, final, aliado);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


     
        public JsonResult JsonAliadosNames()
        {
           
            var aliadosList = casosAdminService.ListaAliadosActualesDeHolos();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(aliadosList),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }
    }
}