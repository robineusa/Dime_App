using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ClientesController : MyController
    {


        WSD.InboundServiceClient inboundService;

        // GET: Clientes
        
        [HttpGet]
        public ViewResult BuscarCuentasPorCedulaInbound()
        {
            ViewBag.ActionName = "Index";
            ViewBag.ControllerName = "Inbound";
            ViewBag.Layout = null;
            ViewBag.SelectOptions = true;
            return View("BuscarCuentasPorCedula");
        }


        [HttpPost]
        public ViewResult BuscarCuentasPorCedula(String cedula, string actionName, string controllerName, string selectOptions)
        {
            ViewBag.ActionName = actionName;
            ViewBag.ControllerName = controllerName;
            ViewBag.SelectOptions = selectOptions;
            BuscarCuentasViewModel model = new BuscarCuentasViewModel();
            model.Cuentas = new List<ClientesTodo>();
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            model.Cuentas = inboundService.ConsultarCuentasPorcedula(cedula) ?? new List<ClientesTodo>();
            return View("TableBuscarCuentas",model);
        }

        [HttpGet]
        public ViewResult BuscarCuentasPorCedulaConfirmation(String cedula, string actionName, string controllerName)
        {
            BuscarCuentasViewModel model = new BuscarCuentasViewModel();
            model.Cuentas = new List<ClientesTodo>();
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            model.Cuentas = inboundService.ConsultarCuentasPorcedula(cedula) ?? new List<ClientesTodo>();
            return View("TableBuscarCuentas", model);
        }







    }
}