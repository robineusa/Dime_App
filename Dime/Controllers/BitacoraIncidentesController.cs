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
        [HttpGet]
        public ActionResult ListaDeGerenciasActuales()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListaDeGerenciasAdminJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeGerenciasAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AgregarNuevaGerencia(string IdGerencia)
        {
            BIMGerencias modelo = new BIMGerencias();
            int Id = Convert.ToInt32(IdGerencia);
            if(Id > 0)
            {
                modelo = bitacoraservice.GerenciaPorId(Id);
                
            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AgregarNuevaGerencia(BIMGerencias modelo) {
            if (modelo.IdGerencia > 0)
            {
                bitacoraservice.ActualizarGerencia(modelo);
            }
            else {
                bitacoraservice.AgregarGerencia(modelo);
            }
            return RedirectToAction("ListaDeGerenciasActuales");
        }
        [HttpGet]
        public ActionResult ListaDeAliadosActuales()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListaDeAliadosAdminJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeAliadosAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarAliados(string IdAliado)
        {
            BIMAliados modelo = new BIMAliados();
            int Id = Convert.ToInt32(IdAliado);
            if (Id > 0)
            {
                modelo = bitacoraservice.AliadoPorId(Id);

            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AdministrarAliados(BIMAliados modelo)
        {
            if (modelo.IdAliado > 0)
            {
                bitacoraservice.ActualizarAliado(modelo);
            }
            else
            {
                bitacoraservice.AgregarAliado(modelo);
            }
            return RedirectToAction("ListaDeAliadosActuales");
        }
        public ActionResult ListaDeOperacionesActuales()
        {
            return View();
        }
        [HttpGet]
        public JsonResult ListaDeOperacionesAdminJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeOperacionesAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarOperaciones(string IdOperacion)
        {
            BIMOperaciones modelo = new BIMOperaciones();
            int Id = Convert.ToInt32(IdOperacion);
            if (Id > 0)
            {
                modelo = bitacoraservice.OperacionPorId(Id);

            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AdministrarOperaciones(BIMOperaciones modelo)
        {
            if (modelo.IdOperacion > 0)
            {
                bitacoraservice.ActualizarOperacion(modelo);
            }
            else
            {
                bitacoraservice.AgregarOperaciones(modelo);
            }
            return RedirectToAction("ListaDeOperacionesActuales");
        }
        [HttpGet]
        public JsonResult ListaDeAliadosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeAliados()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}