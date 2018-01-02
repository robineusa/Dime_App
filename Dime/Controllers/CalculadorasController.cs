using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
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
        WSD.DiasFestivosServiceClient diasFestivos;

        public CalculadorasController()
        {
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            siembraHdService = new WSD.ActivacionSiembraHDServiceClient();
            siembraHdService.ClientCredentials.Authenticate();
            diasFestivos = new WSD.DiasFestivosServiceClient();
            diasFestivos.ClientCredentials.Authenticate();
        }

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
        {
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

            var result = siembraHdService.RentaActualPorCuentaCalRentas(cuenta);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult DatosActualesTarifa(string estrato, string voz, string tv, string internet)
        {

            var result = siembraHdService.TarifaActualDeDatos(estrato, voz, tv, internet);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        public JsonResult ConsultarDiasFestivos(string FechaInicio, string dias)
        {
            DateTime fechaInicio = Convert.ToDateTime(FechaInicio);
            DateTime FechaFinal = DateTime.Now;
            int Dias = !string.IsNullOrEmpty(dias) ? Convert.ToInt32(dias) : 0;
            string CantDiasFestivos = string.Empty;
            
            if (!string.IsNullOrEmpty(FechaInicio) && Dias > 0)
            FechaFinal = Convert.ToDateTime(diasFestivos.ConsultarDiasFestivos(fechaInicio, Dias));
            
            var nombremes = MonthName(FechaFinal.Month);
            var FechaSap = FechaFinal.Day + " de " + nombremes + " de " + FechaFinal.Year;
            var jsonResult = Json(JsonConvert.SerializeObject(FechaSap), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public string MonthName(int month)
        {
            DateTimeFormatInfo dtinfo = new CultureInfo("es-ES", false).DateTimeFormat;
            return dtinfo.GetMonthName(month);
        }

        [HttpGet]
        public ViewResult FechaSap()
        {
            return View("FechaSap");
        }
    }
}