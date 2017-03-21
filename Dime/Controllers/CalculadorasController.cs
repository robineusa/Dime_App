using Dime.Helpers;
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


    }
}