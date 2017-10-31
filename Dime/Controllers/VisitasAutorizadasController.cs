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
    public class VisitasAutorizadasController : MyController
    {
        WSD.VisitasAutorizadasServiceClient visitasservice;
        public VisitasAutorizadasController()
        {
            visitasservice = new WSD.VisitasAutorizadasServiceClient();
            visitasservice.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult RegistrarVisitaAutorizada()
        {
            VisitasAutorizadas modelo = new VisitasAutorizadas();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegistrarVisitaAutorizada(VisitasAutorizadas modelo)
        {
            modelo.UsuarioRegistro = Convert.ToDecimal(Session["Usuario"]);
            modelo.AliadoRegistro = Session["AliadoLogeado"].ToString();
            modelo.OperacionRegistro = Session["OperacionUsuarioHolos"].ToString();

            visitasservice.AgregarNuevaVisita(modelo);
            return RedirectToAction("RegistrarVisitaAutorizada");
        }
        public JsonResult ListaDeMotivosDeEscalamientoJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(visitasservice.ListaMotivosSolicitud()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaVisitasAutorizadas()
        {
            return View();
        }
        public JsonResult ConsultaAdminVisitasAutorizadas(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(visitasservice.ConsultaBaseVisitasAutorizadas(FechaInicial,FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}