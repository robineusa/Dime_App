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
        [HttpPost]
        public JsonResult ListaDeAliadosPorgerenciaJson(IList<string> Gerencias)
        {
            if (Gerencias != null)
            {
                var result0 = bitacoraservice.ListaDeAliadosPorGerencia(Gerencias.ToList());

                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(result0),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        public JsonResult ListaDeOperacionesPorAliadoYGerenciaJson(IList<string> Gerencias, IList<string> Aliados)
        {
            if (Gerencias != null && Aliados != null)
            {
                var result0 = bitacoraservice.ListaDeOperacionesPorgerenciaYAliado(Gerencias.ToList(),Aliados.ToList());

                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(result0),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        public JsonResult RegistrarOperacionesIncidenteJson(IList<string> Operaciones, string IdRegistro)
        {
            if (Operaciones != null && IdRegistro != "")
            {
                decimal Id = Convert.ToDecimal(IdRegistro);
               bitacoraservice.RegistrarOperacionesEnIncidente(Operaciones.ToList(),Id);

                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject("Datos Registrados Correctamente"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    
                };
            }
            else
            {
                return null;
            }
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
        [HttpGet]
        public ActionResult ListaIncidentesEnGestion()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListaIncidentesEnGestionJson() {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeIncidentesEnGestion()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ActualizacionDeIncidentes(string IdRegistro)
        {
            ViewModelBitacoraIncidentes modelo = new ViewModelBitacoraIncidentes();
            int Id = Convert.ToInt32(IdRegistro);
            modelo.BIPBitacoraIncidentes = bitacoraservice.TraeIncidentePorId(Id);
            return View(modelo);
        }
        [HttpPost]
        public ActionResult ActualizacionDeIncidentes(ViewModelBitacoraIncidentes modelo)
        {
           
            modelo.BIPBitacoraIncidentes.UsuarioUltimaActualizacion = Convert.ToString(Session["Usuario"].ToString());
            modelo.BIPBitacoraIncidentes.NombreUsuarioUltimaActualizacion = Session["NombreUsuario"].ToString();
            bitacoraservice.ActualizarRegistroIncidente(modelo.BIPBitacoraIncidentes);

            return RedirectToAction("ActualizarOperacionesIncidente", "BitacoraIncidentes", new { IdRegistro = modelo.BIPBitacoraIncidentes.IdRegistro });
        }
        [HttpGet]
        public ActionResult ActualizarOperacionesIncidente(string IdRegistro)
        {
            decimal Id = Convert.ToDecimal(IdRegistro);
            ViewModelBitacoraIncidentes modelo = new ViewModelBitacoraIncidentes();
            modelo.BILBitacoraIncidentes.IdRegistro = Id;
            return View(modelo);
        }
        [HttpGet]
        public JsonResult ActualizarOperacionesIncidenteJson(string IdRegistro)
        {
            decimal Id = Convert.ToDecimal(IdRegistro);
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeIncidentesOperacionPorRegistro(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult EliminarOperacionIncidente(string IdOperacion)
        {
            decimal Id = Convert.ToDecimal(IdOperacion);
            bitacoraservice.EliminarIncidenteOperacion(Id);

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject("Registro Eliminado"),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
    }
}