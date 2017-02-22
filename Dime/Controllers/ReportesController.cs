using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ReportesController : MyController
    {
        WSD.BalanceScoreCardServiceClient balancescorecardservice = new WSD.BalanceScoreCardServiceClient();

        // GET: Reportes
        public ActionResult ReporteAsesor()
        {
            balancescorecardservice = new WSD.BalanceScoreCardServiceClient();
            balancescorecardservice.ClientCredentials.Authenticate();
            BalanceScoreCard modelo = new BalanceScoreCard();
            var usuario = Session["Usuario"].ToString();
            modelo = balancescorecardservice.IndicadoresUsuario(Convert.ToDecimal(usuario));
            if (modelo == null) {}
            return View(modelo);
        }
        [HttpGet]
        public ActionResult ReporteCelula()
        {
            balancescorecardservice = new WSD.BalanceScoreCardServiceClient();
            balancescorecardservice.ClientCredentials.Authenticate();
            BalanceScoreCard modelo = new BalanceScoreCard();
            modelo = balancescorecardservice.IndicadoresUsuario(Convert.ToDecimal(Session["Usuario"].ToString()));
            return View(modelo);
        }
        public ActionResult ReporteAdministrador()
        {
            return View();
        }
    }
}