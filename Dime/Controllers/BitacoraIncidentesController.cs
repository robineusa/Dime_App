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
    public class BitacoraIncidentesController : MyController
    {
        WSD.BitacoraIncidentesServiceClient bitacoraservice; 
        public BitacoraIncidentesController()
        {
            bitacoraservice = new WSD.BitacoraIncidentesServiceClient();
            bitacoraservice.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult RegistrodeIncidentes()
        {
            ViewModelBitacoraIncidentes modelo = new ViewModelBitacoraIncidentes();
            return View(modelo);
        }
        [HttpPost]
        public ActionResult RegistrodeIncidentes(ViewModelBitacoraIncidentes modelo)
        {
            modelo.BIPBitacoraIncidentes.UsuarioCreacion = Convert.ToString(Session["Usuario"].ToString());
            modelo.BIPBitacoraIncidentes.NombreUsuarioCreacion = Session["NombreUsuario"].ToString();
            modelo.BIPBitacoraIncidentes.UsuarioUltimaActualizacion = Convert.ToString(Session["Usuario"].ToString());
            modelo.BIPBitacoraIncidentes.NombreUsuarioUltimaActualizacion = Session["NombreUsuario"].ToString();
            decimal IdRegistrado = bitacoraservice.RegistrarIncidente(modelo.BIPBitacoraIncidentes);
            
            return RedirectToAction("RegistrarOperacionesIncidente", "BitacoraIncidentes", new { IdRegistro = IdRegistrado });
        }
        [HttpGet]
        public ActionResult RegistrarOperacionesIncidente(string IdRegistro)
        {
            decimal IdRegistroAGestionar = Convert.ToDecimal(IdRegistro);
            ViewModelBitacoraIncidentes modelo = new ViewModelBitacoraIncidentes();
            modelo.BIPIncidentesPorOperacion.IdRegistro = IdRegistroAGestionar;
            return View(modelo);
        }
        [HttpGet]
        public JsonResult ListaDeGerenciasJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeGerencias()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public JsonResult ListaDeAliadosPorgerenciaJson(IList<string> Gerencias)
        {
            var result0 = bitacoraservice.ListaDeAliadosPorGerencia(Gerencias.ToList());

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result0),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpGet]
        public JsonResult ListaOperacionesJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeOperaciones()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public JsonResult ListaHerramientasJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeHerramientas()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public JsonResult ListaTipoDeFallaJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaTiposDeFallas()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public JsonResult ListaPrioridadesJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDePrioridades()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}