using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class CalculadorasController : Controller
    {

        WSD.InboundServiceClient inboundService;


        // GET: Calculadoras
        [AllowAnonymous]
        [HttpGet]
        public ViewResult Campanas()
        {
            return View("Campanas");
        }


        [AllowAnonymous]
        [HttpGet]
        public ViewResult Compensacion()
        {
            return View("Compensacion");
        }


        [AllowAnonymous]
        [HttpPost]
        public PartialViewResult DatosClientePorCuenta(string cuenta)
        {   inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            ClientesTodo model = new ClientesTodo();
            model = inboundService.TraerClienteCompletoPorCuenta(int.Parse(cuenta));
            return PartialView("DatosClientePorCuenta", model);
        }


        [AllowAnonymous]
        [HttpGet]
        public ViewResult DiferenciaTarifas()
        {

            return View("DiferenciaTarifas");
        }


        [AllowAnonymous]
        [HttpGet]
        public ViewResult Prorrateos()
        {

            return View("Prorrateos");
        }
    }
}