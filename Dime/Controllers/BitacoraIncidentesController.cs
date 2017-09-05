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
            var result = bitacoraservice.ValidarSolicitudIncidente(modelo.BIPBitacoraIncidentes.CasoSD);
            if (result == true) {
                ViewBag.Validacio = "El Caso SD Ingresado ya se encuentra registrado en el sistema";
                return View(modelo);
            }
            else
            {

                modelo.BIPBitacoraIncidentes.UsuarioCreacion = Convert.ToString(Session["Usuario"].ToString());
                modelo.BIPBitacoraIncidentes.NombreUsuarioCreacion = Session["NombreUsuario"].ToString();
                modelo.BIPBitacoraIncidentes.UsuarioUltimaActualizacion = Convert.ToString(Session["Usuario"].ToString());
                modelo.BIPBitacoraIncidentes.NombreUsuarioUltimaActualizacion = Session["NombreUsuario"].ToString();
                decimal IdRegistrado = bitacoraservice.RegistrarIncidente(modelo.BIPBitacoraIncidentes);

                return RedirectToAction("RegistrarOperacionesIncidente", "BitacoraIncidentes", new { IdRegistro = IdRegistrado });
            }
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
            decimal Cedula = Convert.ToDecimal(Session["Usuario"].ToString());
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeIncidentesEnGestion(Cedula)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ActualizacionDeIncidentes(string IdRegistro)
        {
            ViewModelBitacoraIncidentes modelo = new ViewModelBitacoraIncidentes();
            decimal Id = Convert.ToInt32(IdRegistro);

            var Validacion = bitacoraservice.TransaccionIncidenteEnGestion(Session["Usuario"].ToString(), Id);

            if (Validacion == true)
            {
                return RedirectToAction("ListaIncidentesEnGestion");
            }
            else
            {
                modelo.BIPBitacoraIncidentes = bitacoraservice.TraeIncidentePorId(Convert.ToInt32(Id));
                modelo.BIPBitacoraIncidentes.DescripcionAfectacion = "";
                return View(modelo);
            }
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
        [HttpGet]
        public ActionResult VisualizadordeIncidentes(string IdRegistro)
        {
            ViewModelBitacoraIncidentes modelo = new ViewModelBitacoraIncidentes();
            //modelo.BIPBitacoraIncidentes = bitacoraservice.TraeIncidentePorId(Convert.ToInt32(IdRegistro));
            decimal Id = Convert.ToDecimal(IdRegistro);

            var logBitacora = bitacoraservice.LogDeIncidentesPorId(Convert.ToInt32(Id));
            modelo.ListaBILBitacoraIncidentes = logBitacora.Select(x => new BILBitacoraIncidentes
            {
                Id= x.Id,
                IdRegistro= x.IdRegistro,
                UsuarioCreacion= x.UsuarioCreacion,
                NombreUsuarioCreacion=x.NombreUsuarioCreacion,
                FechaDeRegistro=x.FechaDeRegistro,
                FechaUltimaActualizacion = x.FechaUltimaActualizacion,
                UsuarioUltimaActualizacion= x.UsuarioUltimaActualizacion,
                NombreUsuarioUltimaActualizacion=x.NombreUsuarioUltimaActualizacion,
                CasoSD=x.CasoSD,
                IM = x.IM,
                FechaDeCreacionTicket =x.FechaDeCreacionTicket,
                FechaDeCierreTicket=x.FechaDeCierreTicket,
                FechaDeCierreAfectacion = x.FechaDeCierreAfectacion,
                Herramienta=x.Herramienta,
                TipoDeFalla= x.TipoDeFalla,
                ModuloAfectado = x.ModuloAfectado,
                DescripcionAfectacion = x.DescripcionAfectacion,
                Prioridad=x.Prioridad,
                EscaladoA = x.EscaladoA,
                CantidadUsuariosAfectados = x.CantidadUsuariosAfectados,
                ComentariosDeCierre = x.ComentariosDeCierre,
                EstadoDelCaso = x.EstadoDelCaso
            }).ToList();

            decimal maxId = modelo.ListaBILBitacoraIncidentes.Max(c => c.Id);
            decimal minId = modelo.ListaBILBitacoraIncidentes.Min(c => c.Id);
            
            modelo.BIPBitacoraIncidentesFinal = modelo.ListaBILBitacoraIncidentes.Find(c => c.Id == maxId);
            modelo.BIPBitacoraIncidentesInicial = modelo.ListaBILBitacoraIncidentes.Find(c => c.Id == minId);
            //datos para inicio y avance
            DateTime fecha = Convert.ToDateTime(modelo.BIPBitacoraIncidentesFinal.FechaDeCreacionTicket);
            var horaa = fecha.TimeOfDay;
            ViewBag.Fecha = fecha.ToShortDateString();
            ViewBag.Hora = horaa;
            ViewBag.Prioridad = modelo.BIPBitacoraIncidentesFinal.Prioridad;
            ViewBag.SD = modelo.BIPBitacoraIncidentesFinal.CasoSD;
            var Modulo = modelo.BIPBitacoraIncidentesFinal.ModuloAfectado;
            ViewBag.Plataforma = modelo.BIPBitacoraIncidentesFinal.Herramienta + " - " + Modulo;
            ViewBag.Afectacion = modelo.BIPBitacoraIncidentesFinal.DescripcionAfectacion;
            //datos para la parte de cierre
            DateTime FechaCierretotal = Convert.ToDateTime(modelo.BIPBitacoraIncidentesFinal.FechaDeCierreAfectacion);
            var HoraCierre = FechaCierretotal.TimeOfDay;
            ViewBag.FechaCierre = FechaCierretotal.ToShortDateString();
            ViewBag.HoraCierre = HoraCierre;
            ViewBag.ComentariosCierre = modelo.BIPBitacoraIncidentesFinal.ComentariosDeCierre;
            
            if (modelo.ListaBILBitacoraIncidentes.Count > 1)
            {
                if (modelo.BIPBitacoraIncidentesFinal.EstadoDelCaso == "FINALIZADO")
                {
                    ViewBag.TipoVisu = "VERDE";
                }
                else
                {
                    ViewBag.TipoVisu = "NARANJA";
                }
                
            }
            else
            {
                ViewBag.TipoVisu = "ROJO";
            }

            return View(modelo);
        }
        public JsonResult ListaAliadosAfectadosJson(string IdRegistro)
        {
            decimal Id = Convert.ToDecimal(IdRegistro);
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeAliadosAfectados(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult LogDeIncidentesJson(string IdRegistro)
        {
            decimal Id = Convert.ToDecimal(IdRegistro);
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.LogDeIncidentesPorId(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult HerramientasActuales()
        {
            return View();
        }
        [HttpGet]
        public JsonResult HerramientasActualesAdminJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDeHerramientasAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarHerramientas(string IdHerramienta)
        {
            BIMHerramientas modelo = new BIMHerramientas();
            int Id = Convert.ToInt32(IdHerramienta);
            if (Id > 0)
            {
                modelo = bitacoraservice.HerramientasPorId(Id);

            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AdministrarHerramientas(BIMHerramientas modelo)
        {
            if (modelo.IdHerramienta > 0)
            {
                bitacoraservice.ActualizarHerramienta(modelo);
            }
            else
            {
                bitacoraservice.AgregarHerramienta(modelo);
            }
            return RedirectToAction("HerramientasActuales");
        }
        [HttpGet]
        public ActionResult PrioridadesActuales()
        {
            return View();
        }
        [HttpGet]
        public JsonResult PrioridadesActualesAdminJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaDePrioridadesAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarPrioridades(string IdPrioridad)
        {
            BIMPrioridades modelo = new BIMPrioridades();
            int Id = Convert.ToInt32(IdPrioridad);
            if (Id > 0)
            {
                modelo = bitacoraservice.PrioridadesPorId(Id);

            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AdministrarPrioridades(BIMPrioridades modelo)
        {
            if (modelo.IdPrioridad > 0)
            {
                bitacoraservice.ActualizarPrioridad(modelo);
            }
            else
            {
                bitacoraservice.AgregarPrioridad(modelo);
            }
            return RedirectToAction("PrioridadesActuales");
        }
        [HttpGet]
        public ActionResult TipodeFallasActuales()
        {
            return View();
        }
        [HttpGet]
        public JsonResult TipodeFallasActualesAdminJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ListaTiposDeFallasAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarTiposDeFalla(string IdTipoFalla)
        {
            BIMTipoFalla modelo = new BIMTipoFalla();
            int Id = Convert.ToInt32(IdTipoFalla);
            if (Id > 0)
            {
                modelo = bitacoraservice.TipoFallaPorId(Id);

            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AdministrarTiposDeFalla(BIMTipoFalla modelo)
        {
            if (modelo.IdTipoFalla > 0)
            {
                bitacoraservice.ActualizarTipoFalla(modelo);
            }
            else
            {
                bitacoraservice.AgregarTipoFalla(modelo);
            }
            return RedirectToAction("TipodeFallasActuales");
        }
        [HttpGet]
        public ActionResult ConsultaDeIncidentes() {
        return View();
        }
        [HttpGet]
        public JsonResult TraerIncidentePorSDJson(string CasoSD)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(bitacoraservice.ConsultaDeIncidentePorSD(CasoSD)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaIncidentesGeneral()
        {
            return View();
        }
    }
}