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
    public class MecController : MyController
    {
        WSD.MecServiceClient MecService;
        WSD.InboundServiceClient inboundService;
        WSD.LoginServiceClient Usuarios;
        public MecController()
        {
            MecService = new WSD.MecServiceClient();
            MecService.ClientCredentials.Authenticate();
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            Usuarios = new WSD.LoginServiceClient();
            Usuarios.ClientCredentials.Authenticate();
        }

        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundService.TraerClienteCompletoPorCuenta(CuentaCliente)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListaProcesos()
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListaProcesosMec()),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListaLineas(int IdProceso)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListaLineasMec(IdProceso)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListasDistribucion(int IdLinea)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListasCorreosMec(IdLinea)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListaTiposAlarmas()
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListaTipoAlarmasMec()),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerInformacionUsuarioHolos(decimal Cedula)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(Usuarios.ConsultarUsuarioHolos(Cedula)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
       
        [HttpGet]
        public ActionResult RegistrarMonitoreo()
        {
            ViewModelMec model = new ViewModelMec();

            return View(model);
        }
        [HttpPost]
        public ActionResult RegistrarMonitoreo(ViewModelMec model)
        {
            model.MecMonitoreosP.UsuarioGestion = Session["IdUsuario"].ToString();
            model.MecMonitoreosP.CedulaUsuarioGestion =Convert.ToDecimal(Session["Usuario"].ToString());
            model.MecMonitoreosP.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            model.MecMonitoreosP.AliadoGestion = Session["AliadoLogeado"].ToString();

            MecService.IsertarMonitoreo(model.MecMonitoreosP);
            return RedirectToAction("RegistrarMonitoreo");
        }

        }
}