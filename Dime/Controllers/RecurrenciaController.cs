using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class RecurrenciaController : Controller
    {
        WSD.InboundServiceClient inboundService;
        WSD.RecurrenciaServiceClient recurrencia;
        


        public RecurrenciaController()
        {
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            recurrencia = new WSD.RecurrenciaServiceClient();
            recurrencia.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult Recurrencia(string cuentaSeleccionada)
        {
            ViewModelRecurrencia model = new ViewModelRecurrencia();
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.ClientesTodos = recurrencia.TraerInformacionCuentaRecurrencia(Convert.ToInt32(Session["IdUsuario"].ToString()));

                if (model.ClientesTodos != null)
                {
                    var Cuenta = model.ClientesTodos.Cuenta;
                    model.CargueBase = recurrencia.TraerDatosRecurrencia(Convert.ToInt32(Session["IdUsuario"].ToString()), Cuenta);
                    model.NodosZonificados.AliadoZonificado = recurrencia.AliadoTecnico(Convert.ToString(model.ClientesTodos.Nodo)).AliadoZonificado;
                    ViewBag.Display = "none";
                    ViewBag.InventEquipos = "block";
                }
                else
                {
                    model.ClientesTodos = new ClientesTodo();
                    model.NodosZonificados = new NodosZonificados();
                    model.ClientesTodos.Cuenta = 0;
                    ViewBag.Display = "none";
                    ViewBag.InventEquipos = "none";
                }
            }
            else
            {
                model.GPrincipalRecurrencia = recurrencia.TraerGPrinRecurrencia(Convert.ToInt32(cuentaSeleccionada));
                var Usuario = Session["IdUsuario"].ToString();
                if (model.GPrincipalRecurrencia.UsuarioGestionando == 0 || model.GPrincipalRecurrencia.UsuarioGestionando == Convert.ToDecimal(Usuario))
                {
                    recurrencia.UsuarioGestionandoGRecurrencia(Convert.ToInt32(Usuario), Convert.ToInt32(model.GPrincipalRecurrencia.Id));
                    model.ClientesTodos = inboundService.TraerClienteCompletoPorCuenta(Convert.ToInt32(cuentaSeleccionada));

                    model.CargueBase.Marcaciones = model.GPrincipalRecurrencia.Marcaciones;
                    model.CargueBase.FechaUltimaMarcacion = model.GPrincipalRecurrencia.FechaUltimaMarcacion;
                    model.CargueBase.FechaUltimaGestion = model.GPrincipalRecurrencia.FechaUltimaGestion;
                    model.CargueBase.IncluyeClaroVideo = model.GPrincipalRecurrencia.IncluyeClaroVideo;
                    model.CargueBase.UsoClaroVideo = model.GPrincipalRecurrencia.UsoClaroVideo;
                    model.CargueBase.ClienteNagra = model.GPrincipalRecurrencia.ClienteNagra;
                    model.CargueBase.Ofrecimiento1 = model.GPrincipalRecurrencia.Ofrecimiento1;
                    model.CargueBase.Ofrecimiento2 = model.GPrincipalRecurrencia.Ofrecimiento2;
                    model.CargueBase.Ofrecimiento3 = model.GPrincipalRecurrencia.Ofrecimiento3;
                    model.CargueBase.Diferenciador = model.GPrincipalRecurrencia.Diferenciador;
                    model.CargueBase.Prioridad = model.GPrincipalRecurrencia.Prioridad;
                    model.CargueBase.Veces_Gestionado = model.GPrincipalRecurrencia.VecesGestionado;
                    model.NodosZonificados.AliadoZonificado = recurrencia.AliadoTecnico(Convert.ToString(model.ClientesTodos.Nodo)).AliadoZonificado;
                    ViewBag.Display = "block";
                    ViewBag.InventEquipos = "block";
                }
                else
                {
                    ViewBag.NoDatos = "Otro Usuario esta gestionando esta cuenta";
                    ViewBag.Display = "none";
                    ViewBag.InventEquipos = "none";
                    model.ClientesTodos.Cuenta = Convert.ToInt32(model.GPrincipalRecurrencia.CuentaCliente);
                    model.CargueBase = new RecurrenciaCargaBase();
                    model.GPrincipalRecurrencia = new GPrincipalRecurrencia();
                    model.NodosZonificados = new NodosZonificados();
                } 
            }
            if (model.ClientesTodos.Cuenta == 0)
            {
                model.ClientesTodos = new ClientesTodo();
                model.CargueBase = new RecurrenciaCargaBase();
                model.GPrincipalRecurrencia = new GPrincipalRecurrencia();
                model.NodosZonificados = new NodosZonificados();
                ViewBag.NoDatos2 = "No existen Datos en la Base";
            }
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Recurrencia(ViewModelRecurrencia model, string BotonEnvia)
        {

            if (model.GPrincipalRecurrencia.CuentaCliente.Equals(0))
            {
                ViewBag.NoDatos = "ERROR: No se puede guardar por que no hay cuentas para gestionar";
            }
            else
            {
                var result = recurrencia.TraerGPrinRecurrencia(Convert.ToInt32(model.GPrincipalRecurrencia.CuentaCliente));
                model.GPrincipalRecurrencia.UsuarioGestion = Session["IdUsuario"].ToString();
                model.GPrincipalRecurrencia.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
                model.GPrincipalRecurrencia.AliadoGestion = Session["AliadoLogeado"].ToString();
                model.GPrincipalRecurrencia.UsuarioGestionando = 0;
                if (result != null)
                {
                    recurrencia.ActualizarGRecurrencia(model.GPrincipalRecurrencia);

                }
                else
                {
                    recurrencia.InsertarGRecurrencia(model.GPrincipalRecurrencia);
                }
                recurrencia.EliminaCuentaRecurrencia(model.GPrincipalRecurrencia.CuentaCliente);
                
            }
            return RedirectToAction("Recurrencia");
        }
        public JsonResult MacroProcesoRecurrenciaList(int idProceso)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetOpcionesRecurrencia(idProceso)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ContactoList(int idProceso)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetOpcionesRecurrencia(idProceso)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult MacroProcesoList(int idProceso)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetOpcionesRecurrencia(idProceso)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ServicioAfectadoList(int idProceso)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetOpcionesRecurrencia(idProceso)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult FallaEspecificaList(int idOpcionesRecurrencia)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetFallaEspecifica(idOpcionesRecurrencia)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult FallaCausaRaiz(int idFallaEspecifica)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetFallaCausaRaiz(idFallaEspecifica)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult SolucionEspecifica(int idProceso)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.GetOpcionesRecurrencia(idProceso)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListSeguimientos()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.ListaSeguimientosRecurrencia()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public ActionResult ConsultaAdministradorLog()
        {
            return View();
        }
        public ActionResult ConsultaAdminstradorPrincipal()
        {
            return View();
        }
        public JsonResult ConsultaAdministradorLogJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.ConsultaAdminGLogRecurrencia(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaAdministradorPrincipalJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.ConsultaAdminGPrincipalRecurrencia(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaHistorialSeguimientoJson(string CuentaCliente)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.ListaHistorialSeguimientosRecurrencia(Convert.ToDecimal(CuentaCliente))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public ActionResult TipificadorAvaya(ViewModelRecurrencia model)
        {
            model.GPrincipalRecurrenciaInbound = new GPrincipalRecurrenciaInbound();
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult TipificadorAvaya(ViewModelRecurrencia model, string BotonEnvia, string NomClie)
        {
            if (BotonEnvia == "GuardaDatos")
            {
                if ((model.GPrincipalRecurrenciaInbound.CuentaCliente.Equals(0)))
                {
                    ViewBag.ErrorI = "ERROR: Busque un Cliente antes de Guardar";
                }
                else
                {
                    var result = recurrencia.TraerGPrinRecurrenciaInbound(Convert.ToInt32(model.GPrincipalRecurrenciaInbound.CuentaCliente));
                    model.GPrincipalRecurrenciaInbound.UsuarioGestion = Session["IdUsuario"].ToString();
                    model.GPrincipalRecurrenciaInbound.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
                    model.GPrincipalRecurrenciaInbound.AliadoGestion = Session["AliadoLogeado"].ToString();
                    //model.GPrincipalRecurrenciaInbound.UsuarioGestionando = 0;
                    if (result != null)
                    {
                        recurrencia.ActualizarGRecurrenciaInbound(model.GPrincipalRecurrenciaInbound);

                    }
                    else
                    {
                        recurrencia.InsertarGRecurrenciaInbound(model.GPrincipalRecurrenciaInbound);
                    }
                    //recurrencia.EliminaCuentaRecurrencia(model.GPrincipalRecurrencia.CuentaCliente);
                }
            }
            return RedirectToAction("Recurrencia", "Recurrencia");
        }
        public JsonResult BuscaCliente(string CuentaCliente)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(inboundService.TraerClienteCompletoPorCuenta(Convert.ToInt32(CuentaCliente))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListSeguimientosInbound()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.ListaSeguimientosRecurrenciaInbound()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult HistorialInbound(string CuentaCliente)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.ListaHistSeguiRecurrenciaInbound(Convert.ToDecimal(CuentaCliente))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaInventarioEquipos(string CuentaCliente)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.InventarioEquiposCuenta(Convert.ToDecimal(CuentaCliente))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult AliadoTecnico(string Nodo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(recurrencia.AliadoTecnico(Nodo)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}
