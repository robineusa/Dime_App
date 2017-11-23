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
    public class RetencionController : Controller
    {
        WSD.RetencionServiceClient retencionservice;
        WSD.InboundServiceClient inboundservice;
        public RetencionController()
        {
            retencionservice = new WSD.RetencionServiceClient();
            retencionservice.ClientCredentials.Authenticate();
            inboundservice = new WSD.InboundServiceClient();
            inboundservice.ClientCredentials.Authenticate();

        }
        [HttpGet]
        public ActionResult RegistroSetguimientos()
        {
            ViewModelRetencion modelo = new ViewModelRetencion();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegistroSetguimientos(ViewModelRetencion modelo)
        {
            modelo.RSPSeguimientos.UsuarioSolicitud = Convert.ToDecimal(Session["Usuario"]);
            modelo.RSPSeguimientos.NombreUsuarioSolicitud = Session["NombreUsuario"].ToString();
            modelo.RSPSeguimientos.AliadoSolicitud = Session["AliadoLogeado"].ToString();
            modelo.RSPSeguimientos.OperacionSolicitud = Session["OperacionUsuarioHolos"].ToString();
            modelo.RSPSeguimientos.LineaSolicitud = Session["LineaLogeado"].ToString();
            modelo.RSPSeguimientos.CuentaCliente = modelo.ClientesTodo.Cuenta;

            retencionservice.RegistrarSolicitudRetencionFormulario(modelo.RSPSeguimientos);
            return RedirectToAction("RegistroSetguimientos");
        }
        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundservice.TraerClienteCompletoPorCuenta(CuentaCliente)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        [HttpPost]
        public JsonResult TraerInformacionClienteCedula(string Cedula)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(inboundservice.ConsultarCuentasPorcedula(Cedula)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ArbolesDeTipificacion(int IdPadre)
        {
         
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(retencionservice.ListasDeArbolesRetencion(IdPadre)),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
        }
    }
}