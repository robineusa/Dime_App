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
    public class VerificacionDeInventarioController : MyController
    {
        WSD.VerificacionDeInventarioServiceClient VerificacionInventarioService;
        WSD.MaestroNodoServiceClient Maestronodosservice;
        WSD.BackEliteServiceClient backeliteservice;

        public VerificacionDeInventarioController()
        {
            VerificacionInventarioService = new WSD.VerificacionDeInventarioServiceClient();
            VerificacionInventarioService.ClientCredentials.Authenticate();
            Maestronodosservice = new WSD.MaestroNodoServiceClient();
            Maestronodosservice.ClientCredentials.Authenticate();
            backeliteservice = new WSD.BackEliteServiceClient();
            backeliteservice.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult RegistrarSolicitud()
        {
            ViewModelVerificacionInventario modelo = new ViewModelVerificacionInventario();
            return View(modelo);
        }
        public JsonResult ListaTipoDeRequerimientosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaTiposDeRequerimientos()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegistrarSolicitud(ViewModelVerificacionInventario modelo)
        {
            modelo.VIPSolicitudes.UsuarioSolicitud = Convert.ToDecimal(Session["Usuario"].ToString());
            modelo.VIPSolicitudes.NombreUsuarioSolicitud = Session["NombreUsuario"].ToString();
            modelo.VIPSolicitudes.AliadoSolicitud = Session["AliadoLogeado"].ToString();
            modelo.VIPSolicitudes.OperacionSolicitud = Session["OperacionUsuarioHolos"].ToString();
            modelo.VIPSolicitudes.UsuarioUltimaActualizacion = Convert.ToDecimal(Session["Usuario"].ToString());
            modelo.VIPSolicitudes.NombreUsuarioUltimaActualizacion = Session["NombreUsuario"].ToString();

            NodosZonificados Nodo = backeliteservice.TraerNodoPorId(modelo.VIPSolicitudes.Nodo);

            if (Nodo != null)
            {
                var cuentaescalada = VerificacionInventarioService.ExisteSolicitudEscalada(modelo.VIPSolicitudes.CuentaCliente);
                if (cuentaescalada == false)
                {
                    decimal IdRegistrado = VerificacionInventarioService.ReistrarSolicitud(modelo.VIPSolicitudes);
                    return RedirectToAction("EquiposPorSolicitud", "VerificacionDeInventario", new { IdSolicitud = IdRegistrado });
                }
                else
                {
                    ViewBag.ErrorCuenta = "La cuenta ya tiene una solicitud en trámite, por favor verifique su estado actual.";
                    return View(modelo);
                }

            }
            else
            {
                ViewBag.ErrorNodo = "El nodo ingresado no existe";
                return View(modelo);
            }
        }
        [HttpGet]
        public ActionResult EquiposPorSolicitud(string IdSolicitud)
        {
            VIPSolicitudes modelo = new VIPSolicitudes();
            modelo.IdSolicitud = Convert.ToDecimal(IdSolicitud);
            return View(modelo);
        }
        public JsonResult EquiposPorSolicitudJson(string IdSolicitud)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaDeEquiposPorSolicitud(Convert.ToDecimal(IdSolicitud))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarEquipos(string IdSolicitud, string IdEquipo)
        {
            int IdEquipoActual = Convert.ToInt32(IdEquipo);
            if (IdEquipoActual > 0)
            {
                VIPSolicitudesPorEquipo modelo = VerificacionInventarioService.TraeEquipoPorId(IdEquipoActual);
                return View(modelo);
            }
            else
            {
                VIPSolicitudesPorEquipo modelo = new VIPSolicitudesPorEquipo();
                modelo.IdSolicitud = Convert.ToDecimal(IdSolicitud);
                return View(modelo);
            }


        }
        [HttpPost]
        public JsonResult EliminarEquipoDeSolicitudJson(string IdRegistro)
        {
            decimal Id = Convert.ToDecimal(IdRegistro);
            VerificacionInventarioService.EliminarEquiposPorSolicitud(Id);

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject("Registro Eliminado"),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarEquipos(VIPSolicitudesPorEquipo modelo)
        {
            if (modelo.Id > 0)
            {
                VerificacionInventarioService.ActualizarEquiposPorSolicitud(modelo);
            }
            else
            {
                VerificacionInventarioService.RegistrarEquiposPorSolicitud(modelo);
            }

            return RedirectToAction("EquiposPorSolicitud", "VerificacionDeInventario", new { IdSolicitud = modelo.IdSolicitud });
        }
        public JsonResult ListaTipoDeEquiposJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaTipoDeEquipos()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaSolicitudesPorCliente()
        {
            return View();
        }
        public JsonResult ConsultaSolicitudesPorClienteJson(string CuentaCliente)
        {   
                decimal Cuenta = Convert.ToDecimal(CuentaCliente);
                var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ConsultaSolicitudesPorCliente(Cuenta)), JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            
        }
        [HttpGet]
        public ActionResult SolicitudesPendientes()
        {
            return View();
        }
        public JsonResult ListaDeSolicitudesPendientesJson(string CuentaCliente)
        {
            decimal Cuenta = Convert.ToDecimal(CuentaCliente);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ConsultaSolicitudesPorCliente(Cuenta)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
    }
}