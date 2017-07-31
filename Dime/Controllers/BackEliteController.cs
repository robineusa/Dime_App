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
    public class BackEliteController : MyController
    {
        WSD.BackEliteServiceClient backeliteservice;
        WSD.MaestroNodoServiceClient maestronodosservice;

        public BackEliteController()
        {
            backeliteservice = new WSD.BackEliteServiceClient();
            backeliteservice.ClientCredentials.Authenticate();
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();
        }
        public JsonResult ListaTipoDeEscalamientosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaTipoDeEscalamientos()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDetalleDeEscalamientosJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDetalleDeEscalamientos(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult SolicitudBackElite()
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            return View(modelo);
        }
        [HttpPost]
        public ActionResult SolicitudBackElite(ViewModelBackElite modelo)
        {

            modelo.BEPSolicitudes.UsuarioQueSolicita = Convert.ToString(Session["Usuario"].ToString());
            modelo.BEPSolicitudes.NombreUsuarioQueSolicita = Session["NombreUsuario"].ToString();
            modelo.BEPSolicitudes.AliadoQueSolicita = Session["AliadoLogeado"].ToString();
            modelo.BEPSolicitudes.OperacionQueSolicita = Session["OperacionUsuarioHolos"].ToString();

            var CuentaEscalada = backeliteservice.ValidarCuentaEnBackElite(Convert.ToDecimal(modelo.BEPSolicitudes.CuentaCliente), Convert.ToDecimal(modelo.BEPSolicitudes.LlsOt));
            if (CuentaEscalada == true)
            {
                ViewBag.ExisteCuentaEscalada = "Ya existe una solicitud escalada con esta Cuenta, Orden de Trabajo o Llamada de Servicio";
                return View(modelo);
            }
            else
            {
                if (modelo.BEPSolicitudes.CuentaCliente == 0 || modelo.BEPSolicitudes.LlsOt == 0)
                {
                    ViewBag.ExisteCuentaEscalada = "La Cuenta del Cliente, la Ordern de Trabajo o Llamada de Servicio no pueden ser Cero (0)";
                    return View(modelo);
                }
                else
                {
                    ViewBag.ExisteCuentaEscalada = null;
                    backeliteservice.RegistrarSolicitud(modelo.BEPSolicitudes);
                    return RedirectToAction("SolicitudBackElite");
                }

            }
        }
        public JsonResult ListaGestionPorIdJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDetallesDeGestion(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaMalEscaladodJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaRazonesMalEscalamiento(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult EstadoGestionId(string idGestion)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.DetalleGestionPorId(Convert.ToDecimal(idGestion))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult ListaInteraccionesSolicitudJson(string IdSolicitud)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaInteraccionesSolicitud(Convert.ToDecimal(IdSolicitud))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public ActionResult GestionarSolicitud(string IdSolicitud)
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            int norecu = 0;

            if (IdSolicitud == null || IdSolicitud.Equals(""))
            {

                modelo.BEPSolicitudes = backeliteservice.ApartarCuentadeSolcitudBackElita(Convert.ToDecimal(Session["Usuario"].ToString()), norecu);
                Session["TipoDireccionamiento"] = 0;
            }
            else
            {
                modelo.BEPSolicitudes = backeliteservice.ConsultarSolicitudPorId(Convert.ToDecimal(IdSolicitud));
                Session["TipoDireccionamiento"] = IdSolicitud;
            }

            if (modelo.BEPSolicitudes != null)
            {
                modelo.BEPSolicitudes.Observaciones = "";
                modelo.BEPSolicitudes.Malescalado = "";
                modelo.NodosZonificados = backeliteservice.TraerNodoPorId(modelo.BEPSolicitudes.Nodo);
                modelo.BEMTipoDeEscalamientos = backeliteservice.TipoEscalamientoPorNombre(modelo.BEPSolicitudes.TipoDeSolicitud);
                ViewBag.NohayBase = null;
            }
            else
            {
                modelo.BEPSolicitudes = new BEPSolicitudes();
                ViewBag.NohayBase = "NO HAY REGISTROS DISPONIBLES";
            }

            return View(modelo);
        }
        [HttpPost]
        public ActionResult GestionarSolicitud(ViewModelBackElite modelo)
        {
            modelo.BEPSolicitudes.UsuarioQueSolicita = Convert.ToString(Session["Usuario"].ToString());
            modelo.BEPSolicitudes.NombreUsuarioQueSolicita = Session["NombreUsuario"].ToString();
            modelo.BEPSolicitudes.AliadoQueSolicita = Session["AliadoLogeado"].ToString();
            modelo.BEPSolicitudes.OperacionQueSolicita = Session["OperacionUsuarioHolos"].ToString();

            backeliteservice.ActualizaSolicitud(modelo.BEPSolicitudes);
            decimal direccionPagina = Convert.ToDecimal(Session["TipoDireccionamiento"]);
            Session.Remove("TipoDireccionamiento");
            if (direccionPagina > 0)
            {
                return RedirectToAction("SeguimientoSolicitudes");
            }
            else
            {
                return RedirectToAction("GestionarSolicitud");
            }

        }
        [HttpGet]
        public ActionResult SeguimientoSolicitudes()
        {
            return View();
        }
        public JsonResult ListaSeguimientosBackEliteJson()
        {
            decimal Cedula = Convert.ToDecimal(Session["Usuario"].ToString());
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaSeguimientosAgente(Cedula)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}