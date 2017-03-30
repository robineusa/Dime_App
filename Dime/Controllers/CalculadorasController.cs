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
    [ExpiringFilter]
    public class CalculadorasController : MyController
    {

        WSD.InboundServiceClient inboundService;
        WSD.ActivacionSiembraHDServiceClient siembraHdService;

        // GET: Calculadoras
 
        [HttpGet]
        public ViewResult Campanas()
        {
            return View("Campanas");
        }


        [HttpGet]
        public ViewResult Compensacion()
        {
            return View("Compensacion");
        }


        [HttpPost]
        public PartialViewResult DatosClientePorCuenta(string cuenta)
        {   inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            ClientesTodo model = new ClientesTodo();
            model = inboundService.TraerClienteCompletoPorCuenta(int.Parse(cuenta));
            return PartialView("DatosClientePorCuenta", model);
        }


       
        [HttpGet]
        public ViewResult DiferenciaTarifas()
        {

            return View("DiferenciaTarifas");
        }


       
        [HttpGet]
        public ViewResult Prorrateos()
        {

            return View("Prorrateos");
        }


        [HttpGet]
        public ViewResult Rentas()
        {
            return View("Rentas");
        }



        public JsonResult DatosActualesCliente(string cuenta)
        {
            siembraHdService = new WSD.ActivacionSiembraHDServiceClient();
            siembraHdService.ClientCredentials.Authenticate();
            //var result = siembraHdService.RentaActualPorCuentaCalRentas(cuenta);
            return new JsonResult
            {
                //Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        
    }
}