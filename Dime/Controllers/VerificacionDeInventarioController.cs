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
        public ActionResult GestionarSolicitud(string IdSolicitud)
        {
            ViewModelVerificacionInventario modelo = new ViewModelVerificacionInventario();
            int norecu = 0;

            if (IdSolicitud == null || IdSolicitud.Equals(""))
            {
                modelo.VIPSolicitudes = VerificacionInventarioService.ApartarCuentaVerificacionInventario(Convert.ToDecimal(Session["Usuario"].ToString()), norecu);
                Session["TipoDireccionamiento"] = 0;
            }
            else
            {
                modelo.VIPSolicitudes = VerificacionInventarioService.ConsultarSolicitudPorIdInventario(Convert.ToDecimal(IdSolicitud));
                Session["TipoDireccionamiento"] = IdSolicitud;
            }
            if (modelo.VIPSolicitudes != null)
            {
                modelo.VIPSolicitudes.Observaciones = "";
                modelo.NodosZonificados = backeliteservice.TraerNodoPorId(modelo.VIPSolicitudes.Nodo);
                ViewBag.NohayBase = null;
            }
            else
            {
                modelo.VIPSolicitudes = new VIPSolicitudes();
                ViewBag.NohayBase = "NO HAY REGISTROS DISPONIBLES";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult GestionarSolicitud(ViewModelVerificacionInventario modelo)
        {
            modelo.VIPSolicitudes.UsuarioUltimaActualizacion = Convert.ToDecimal(Session["Usuario"]);
            modelo.VIPSolicitudes.NombreUsuarioUltimaActualizacion = Session["NombreUsuario"].ToString();


            VerificacionInventarioService.ActualizarSolicitud(modelo.VIPSolicitudes);

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
        public JsonResult ListaDeInteraccionesPorSolicitud(string IdSolicitud)
        {
            decimal Id = Convert.ToDecimal(IdSolicitud);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaDeInteraccionesPorSolicitud(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult TraeListaDeGestiones()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaDeGestion()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult TraeListaDeSubrazones(string IdGestion)
        {
            decimal Id = Convert.ToDecimal(IdGestion);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaSubrazon(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult TraeListaDeAliadosTecnicos()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaAliadosTecnicos()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult TraeListaDeEquiposPorSolicitud(string IdSolicitud)
        {
            decimal Id = Convert.ToDecimal(IdSolicitud);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaDeEquiposPorSolicitud(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult TraerEstadoCaso(string IdSubrazon)
        {
            int Id = Convert.ToInt32(IdSubrazon);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.TraeSubrazonporIdGestion(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult SolicitudesEnSeguimiento()
        {
            return View();
        }
        public JsonResult TraeListaDeSolicitudesEnSeguimiento()
        {
            decimal Cedula = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.SolicitudesEnSeguimiento(Cedula)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult ConsultaDeGestion()
        {
            return View();
        }
        public JsonResult ConsultaDeGestionJson(string F1, string F2)
        {
            decimal Cedula = Convert.ToDecimal(Session["Usuario"]);
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ConsultaDeGestionBack(Cedula, FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        //procesos admin
        [HttpGet]
        public ActionResult ListaTiposDeRequerimientos()
        {
            return View();
        }
        public JsonResult ListaTiposDeRequerimientosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaTiposDeRequerimientosAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult AdministrarTipodeRequerimientos(string Id)
        {
            VIMTipoDeRequerimiento modelo = new VIMTipoDeRequerimiento();
            int IdTipo = Convert.ToInt32(Id);
            if (IdTipo > 0)
            {
                modelo = VerificacionInventarioService.TipoDeRequerimientoPorId(IdTipo);

            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarTipodeRequerimientos(VIMTipoDeRequerimiento modelo)
        {
            if (modelo.Id > 0)
            {
                VerificacionInventarioService.ActualizarTiposDeRequerimientos(modelo);
            }
            else
            {
                VerificacionInventarioService.AgregarTiposDeRequerimientos(modelo);
            }
            return RedirectToAction("ListaTiposDeRequerimientos");
        }
        [HttpGet]
        public ActionResult ListaTipoDeEquipos()
        {
            return View();
        }
        [HttpGet]
        public ActionResult AdministrarTipoDeEquipos(string Id)
        {
            VIMTipoDeEquipos modelo = new VIMTipoDeEquipos();
            int IdTipo = Convert.ToInt32(Id);
            if (IdTipo > 0)
            {
                modelo = VerificacionInventarioService.TipoDeEquiposPorId(IdTipo);

            }
            return View(modelo);
        }
        public JsonResult AdministrarTipoDeEquiposJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaTipoDeEquiposAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarTipoDeEquipos(VIMTipoDeEquipos modelo)
        {
            if (modelo.Id > 0)
            {
                VerificacionInventarioService.ActualizarTipoDeEquipos(modelo);
            }
            else
            {
                VerificacionInventarioService.AgregarTipoDeEquipos(modelo);
            }
            return RedirectToAction("ListaTipoDeEquipos");
        }
        [HttpGet]
        public ActionResult ListaDeGestion()
        {
            return View();
        }
        public JsonResult ListaDeGestionJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaDeGestionAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult AdministrarGestiones(string Id)
        {
            VIMGestion modelo = new VIMGestion();
            int IdTipo = Convert.ToInt32(Id);
            if (IdTipo > 0)
            {
                modelo = VerificacionInventarioService.GestionPorId(IdTipo);

            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarGestiones(VIMGestion modelo)
        {
            if (modelo.IdGestion > 0)
            {
                VerificacionInventarioService.ActualizarGestion(modelo);
            }
            else
            {
                VerificacionInventarioService.AgregarGestion(modelo);
            }
            return RedirectToAction("ListaDeGestion");
        }
        [HttpGet]
        public ActionResult ListaSubrazones(string IdGestion)
        {
            VIMSubrazon modelo = new VIMSubrazon();
            modelo.IdGestion = Convert.ToDecimal(IdGestion);
            return View(modelo);
        }
        public JsonResult ListaSubrazonesJson(string IdGestion)
        {
            decimal Id = Convert.ToDecimal(IdGestion);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaSubrazonAdmin(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult AdministrarSubrazones(string IdSubrazon, string IdGestion)
        {
            VIMSubrazon modelo = new VIMSubrazon();
            int IdTipo = Convert.ToInt32(IdSubrazon);
            if (IdTipo > 0)
            {
               
                modelo = VerificacionInventarioService.SubrazonPorId(IdTipo);
                return View(modelo);
            }
            else
            {
                modelo.IdGestion = Convert.ToDecimal(IdGestion);
                return View(modelo);

            }
            
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarSubrazones(VIMSubrazon modelo)
        {
            if (modelo.IdSubrazon > 0)
            {
                VerificacionInventarioService.ActualizarSubrazon(modelo);
            }
            else
            {
                VerificacionInventarioService.AgregarSubrazon(modelo);
            }
            return RedirectToAction("ListaSubrazones", "VerificacionDeInventario", new { IdGestion = modelo.IdGestion });
            
        }
        [HttpGet]
        public ActionResult ListaAliadosTecnicos()
        {
            return View();
        }
        public JsonResult ListaAliadosTecnicosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaAliadosTecnicosAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult AdministrarAliadosTecnicos(string IdAliado)
        {
            VIMAliadoTecnico modelo = new VIMAliadoTecnico();
            int IdTipo = Convert.ToInt32(IdAliado);
            if (IdTipo > 0)
            {
                modelo = VerificacionInventarioService.AliadoTecnicoPorId(IdTipo);

            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarAliadosTecnicos(VIMAliadoTecnico modelo)
        {
            if (modelo.IdAliado > 0)
            {
                VerificacionInventarioService.ActualizarAliadoTecnico(modelo);
            }
            else
            {
                VerificacionInventarioService.AgregarAliadoTecnico(modelo);
            }
            return RedirectToAction("ListaAliadosTecnicos");
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
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ConsultaAdminSolicitudesPrincipal(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public ActionResult ConsultaAdminLog()
        {
            return View();
        }
        public JsonResult ConsultaAdminLogJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ConsultaAdminSolicitudesLog(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ReasignacionDeSolicitudes()
        {
            return View();
        }
        public JsonResult ListaSolicitudesPorBackJson(string Cedula)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.SolicitudesEnGestionPorBack(Convert.ToDecimal(Cedula))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaUsuariosBackJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(VerificacionInventarioService.ListaDeUsuariosVerificacionInventario()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult ReasignacionDeSolicitudesJson(IList<string> Solicitudes, string Usuario)
        {
            if (Solicitudes != null && Usuario != "")
            {
                decimal Cedula = Convert.ToDecimal(Usuario);
                VerificacionInventarioService.ReasignarGestionBackInventario(Solicitudes.ToList(), Cedula);

                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject("Solicitudes Reasignadas Correctamente"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet

                };
            }
            else
            {
                return null;
            }
        }

    }
}