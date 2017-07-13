using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ReportesController : MyController
    {
        WSD.BalanceScoreCardServiceClient balancescorecardservice;
        WSD.DistribucionBlendingServiceClient DisBlending;

        public ReportesController()
        {
            balancescorecardservice = new WSD.BalanceScoreCardServiceClient();
            balancescorecardservice.ClientCredentials.Authenticate();
            DisBlending = new WSD.DistribucionBlendingServiceClient();
            DisBlending.ClientCredentials.Authenticate();
        }
        // GET: Reportes
        public ActionResult ReporteAsesor()
        {
            
            BalanceScoreCard modelo = new BalanceScoreCard();
            var usuario = Session["Usuario"].ToString();
            modelo = balancescorecardservice.IndicadoresUsuario(Convert.ToDecimal(usuario));
            if (modelo == null) {
                return View();
            }
            return View(modelo);
        }
        [HttpGet]
        public ActionResult ReporteCelula()
        {
            
            BalanceScoreCard modelo = new BalanceScoreCard();
            modelo = balancescorecardservice.IndicadoresUsuario(Convert.ToDecimal(Session["Usuario"].ToString()));
            return View(modelo);
        }
        public ActionResult ReporteAdministrador()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ReporteBlending()
        {
            //ViewModelReportesBlending model = new ViewModelReportesBlending();
            //model.ConsultaBlendingFormulario = DisBlending.ConsultaBlendingFormularioDestino(Session["AliadoLogeado"].ToString());
            return View();
        }
        //public JsonResult ReporteFormulario()
        //{
        //    var result = DisBlending.ConsultaBlendingFormularioDestino(Session["AliadoLogeado"].ToString());
        //    var jsonResult = Json(JsonConvert.SerializeObject(result), JsonRequestBehavior.AllowGet);
        //    jsonResult.MaxJsonLength = int.MaxValue;
        //    return jsonResult;

        //}
        [HttpPost]
        public ActionResult ReporteFormulario()
        {
            var result = DisBlending.ConsultaBlendingFormularioDestino(Session["AliadoLogeado"].ToString());
            StringBuilder JSON = new StringBuilder();
            string Prefijo = "";
            JSON.Append("[");
            for (int i = 0; i < result.Count; i++)
            {
                JSON.Append(Prefijo + "{");
                JSON.Append("\"FORMULARIO_DESTINO\":" + "\"" + result[i].FORMULARIO_DESTINO + "\",");
                JSON.Append("\"CANTIDAD\":" + result[i].CANTIDAD);
                JSON.Append("}");
                Prefijo = ",";

            }
            JSON.Append("];");
            return Content("" + JSON); ;
        }
    }
}