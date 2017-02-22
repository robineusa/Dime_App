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
    public class DashboardController : Controller
    {

        WSD.GraficosServiceClient graficosservice = new WSD.GraficosServiceClient();

        [AllowAnonymous]
        [HttpGet]
        public ActionResult DashboardAsesor()
        {
            graficosservice = new WSD.GraficosServiceClient();
            graficosservice.ClientCredentials.Authenticate();
            ViewModelGraficos modelo = new ViewModelGraficos();
            var datosgrafico = graficosservice.GraficoTrasladosGeneralAsesor(Session["Usuario"].ToString());
            modelo.ListaGrafico = datosgrafico.Select(x => new Graficos
            {
                Usuario = x.Usuario,
                TipoGestion = x.TipoGestion,
                Total = x.Total,
                Color= "#DA0E08"
            }).ToList();
            return View(modelo);
        }
    }
}