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
    public class CierreDeCicloController : MyController
    {

        WSD.CierreCicloServiceClient cierreCicloService;

        public CierreDeCicloController()
        {
            cierreCicloService = new WSD.CierreCicloServiceClient();
            cierreCicloService.ClientCredentials.Authenticate();
        }

        // GET: CierreDeCiclo
        public ActionResult ResidencialPredictivoConsulta()
        {
            ViewBag.ConsultaPost = "ResidencialPredictivoConsultaPost";
            return View("ConsultaGestiones");
        }

        [HttpPost]
        public ActionResult ResidencialPredictivoConsultaPost(CCConsultaGestionesViewModel model)
        {
            return RedirectToAction("ResidencialPredictivoHistorial", "CierreDeCiclo", new {cuenta = model.cuenta });
        }

        public ActionResult ResidencialPotencialConsulta()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult InstalacionConsulta()
        {
            return View("ConsultaGestiones");
        }

        public ActionResult PymesConsulta()
        {
            return View("ConsultaGestiones");
        }



        public ActionResult ResidencialPredictivoHistorial(string cuenta)
        {
            ViewModelHistorialGestiones model  = new ViewModelHistorialGestiones();
            float cuentaFloat = float.Parse(cuenta);
            model.predictivoModel = cierreCicloService.ListaResidencialPredictivoDeCuenta(cuentaFloat);
            return View("HistorialGestiones", model);
        }

        public ActionResult ResidencialPotencialHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }

        public ActionResult InstalacionHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }
        public ActionResult PymesHistorial(string cuenta)
        {
            return View("HistorialGestiones");
        }


        [HttpGet]
        public ActionResult ResidencialPredictivoTipificador(string idTip, string macro)
        {
            ViewModelResidPredictTipificador model = new ViewModelResidPredictTipificador();
            int idInt = Convert.ToInt32(idTip);
            model.ResdPredictInfo = cierreCicloService.GetResidencialPredictivoInfoPorId(idInt);
            double cuenta = Convert.ToDouble(model.ResdPredictInfo.Cuenta);
            model.BaseMejoramiento = cierreCicloService.RecibirBaseMejoramientoDeResdPredInfo(cuenta, model.ResdPredictInfo.ProblemaDelEdificio);
            return View(model);
        }

        [HttpPost]
        public ActionResult ResidencialPredictivoTipificadorPost(ViewModelResidPredictTipificador model)
        {
            model.GestionResdPredict.FechaGestion = DateTime.Now;
            model.GestionResdPredict.IdUsuarioGestion =Convert.ToInt32(Session["IdUsuario"]); model.GestionResdPredict.AliadoUsrGestion = Session["AliadoLogeado"].ToString();
            model.GestionResdPredict.LineaUsrGestion = Session["LineaLogeado"].ToString(); model.GestionResdPredict.CedulaUsrGestion = Session["Usuario"].ToString();
            long idGestion  = cierreCicloService.IngresarGestionResidencialPredictivo(model.GestionResdPredict);
            return RedirectToAction("SegundaTipificacion", "CierreDeCiclo", new {id= idGestion ,tipoCierre = "Residencial Predictivo"});
        }

        [HttpGet]
        public ActionResult SegundaTipificacion(string id, string tipoCierre)
        {


            return View();
        }


        [HttpPost]
        public ActionResult SegundaTipificacionPost(string id, string tipoCierre)
        {

            return View();
        }


    }
}