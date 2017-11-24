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
        public JsonResult ArbolesDeTipificacionaAdmin(int IdPadre)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(retencionservice.ListasDeArbolesRetencionAdmin(IdPadre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        [HttpGet]
        public ActionResult ListaTipoEscalamientos(string IdPadre)
        {
            RSMArboles modelo = new RSMArboles();
            modelo.IdPadre = Convert.ToDecimal(IdPadre);
            return View(modelo);
        }
        [HttpGet]
        public ActionResult AdministrarArboles(string IdPadre,string IdArbol)
        {
            RSMArboles modelo = new RSMArboles();
            decimal Padre = Convert.ToDecimal(IdPadre);
            decimal Id = Convert.ToDecimal(IdArbol);
            if (Id > 0)
            {
                modelo = retencionservice.TraerArbolPorId(Id);
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarArboles(RSMArboles modelo)
        {
            if (modelo.IdArbol > 0)
            {
                retencionservice.ActualizarArbolRetencion(modelo);
            }
            else
            {
                retencionservice.RegistrarNuevoArbol(modelo);
            }
            return RedirectToAction("ListaTipoEscalamientos", "Retencion", new { IdPadre = modelo.IdPadre });
        }
        public JsonResult RetornarPagina(int IdArbol)
        {
            RSMArboles Arbol =  retencionservice.TraerArbolPorId(IdArbol);
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(Arbol.IdPadre),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        [HttpGet]
        public ActionResult ConsultaAdminPrincipal()
        {
            return View();
        }
        public JsonResult ConsultaAdminPrincipalJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(retencionservice.ConsultaAdministradorPricipal(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaAdminLog()
        {
            return View();
        }
        public JsonResult ConsultaAdminLogJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(retencionservice.ConsultaAdministradorLog(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}