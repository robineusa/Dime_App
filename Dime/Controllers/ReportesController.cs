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
        WSD.BalanceScoreCardServiceClient balancescorecardservice; 

        public ReportesController()
        {
            balancescorecardservice = new WSD.BalanceScoreCardServiceClient();
            balancescorecardservice.ClientCredentials.Authenticate();
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
        public ActionResult ReporteBlending()
        {
            return View();
        }
    }
}