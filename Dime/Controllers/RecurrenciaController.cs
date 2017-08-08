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
                }
                else
                {
                    model.ClientesTodos.Cuenta = 0;
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
                }
                else
                {
                    ViewBag.NoDatos = "Otro Usuario esta gestionando esta cuenta";
                    model.ClientesTodos.Cuenta = Convert.ToInt32(model.GPrincipalRecurrencia.CuentaCliente);
                    model.CargueBase = new RecurrenciaCargaBase();
                    model.GPrincipalRecurrencia = new GPrincipalRecurrencia();
                } 
            }
            if (model.ClientesTodos.Cuenta == 0)
            {
                model.ClientesTodos = new ClientesTodo();
                model.CargueBase = new RecurrenciaCargaBase();
                model.GPrincipalRecurrencia = new GPrincipalRecurrencia();
                ViewBag.NoDatos2 = "No existen Datos en la Base";
            }
            return View(model);
        }
        [HttpPost]
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
    }
}
