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
        
        public VerificacionDeInventarioController()
        {
            VerificacionInventarioService = new WSD.VerificacionDeInventarioServiceClient();
            VerificacionInventarioService.ClientCredentials.Authenticate();
            Maestronodosservice = new WSD.MaestroNodoServiceClient();
            Maestronodosservice.ClientCredentials.Authenticate();
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


            decimal IdRegistrado =  VerificacionInventarioService.ReistrarSolicitud(modelo.VIPSolicitudes);

            return RedirectToAction("RegistrarSolicitud");
        }
        [HttpGet]
        public ActionResult EquiposPorSolicitud()
        {
            return View();
        }
    }
}