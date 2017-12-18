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
    public class CierreExperienciaController : Controller
    {
        WSD.CierreExperienciaServiceClient CierreService;
        WSD.InboundServiceClient inboundservice;

        public CierreExperienciaController()
        {
            CierreService = new WSD.CierreExperienciaServiceClient();
            CierreService.ClientCredentials.Authenticate();
            inboundservice = new WSD.InboundServiceClient();
            inboundservice.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult Desconexiones(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            ViewBag.Asignacion = null;
            if (IdGestion == null || IdGestion.Equals(""))
            {
                modelo.CEPAsigDesconexiones = CierreService.TraeRegistroAsignacion(1);
                if (modelo.CEPAsigDesconexiones != null)
                {
                    modelo.CEPDesconexiones.CanalDeIngreso = modelo.CEPAsigDesconexiones.CanalDeIngreso;
                    modelo.CEPDesconexiones.CuentaCliente = modelo.CEPAsigDesconexiones.CuentaCliente;
                    modelo.CEPDesconexiones.Nota1 = modelo.CEPAsigDesconexiones.Nota1;
                    modelo.CEPDesconexiones.Nota2 = modelo.CEPAsigDesconexiones.Nota2;
                    modelo.CEPDesconexiones.FechaDeSolicitud = modelo.CEPAsigDesconexiones.FechaDeSolicitud;
                    modelo.CEPDesconexiones.FechaDeCorte = modelo.CEPAsigDesconexiones.FechaDeCorte;
                    modelo.CEPDesconexiones.FechaDePreaviso = modelo.CEPAsigDesconexiones.FechaDePreaviso;
                    modelo.CEPDesconexiones.FechaDeAsignacion = modelo.CEPAsigDesconexiones.FechaDeAsignacion;
                    
                }
                else
                {
                    ViewBag.Asignacion = "No Existen Mas Registros Cargados";
                }
            }
            else
            {
                modelo.CEPDesconexiones = CierreService.TraeDesconexionPorId(Convert.ToDecimal(IdGestion));
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Desconexiones(ViewModelCierreExperiencia modelo)
        {
            return View();
        }
        public JsonResult ListaDeGestionDesconexionesAgente()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaDeGestionAgenteCierreExperiencia(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeSeguimientosDesconexionesAgente()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSeguimientosAgenteCierreExperiencia(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ArbolesDeTipificacionDesconexion(int IdPadre)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(CierreService.TraerArbolCierreExperienciaPorId(IdPadre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerDatosDelArbol(decimal IdArbol)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.TraerArbolCierreExperienciaPorId(IdArbol)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public ActionResult LiberacionesDeHomePass()
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LiberacionesDeHomePass(ViewModelCierreExperiencia modelo)
        {
        
            return View();
        }
        [HttpGet]
        public ActionResult Tickets()
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Tickets(ViewModelCierreExperiencia modelo)
        {
            return View();
        }
        [HttpGet]
        public ActionResult SuspencionesTemporales()
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuspencionesTemporales(ViewModelCierreExperiencia modelo)
        {
            return View();
        }
    }
}