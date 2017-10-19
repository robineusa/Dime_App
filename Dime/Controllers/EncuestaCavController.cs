using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class EncuestaCavController : MyController
    {
        WSD.POMSolicitudesServiceClient PomService;
        WSP.GeneracionEncuestaClient EncuestaService;
        WSP.reqGenerarEncuesta EntidadEncuesta;
        public EncuestaCavController()
        {
            PomService = new WSD.POMSolicitudesServiceClient();
            PomService.ClientCredentials.Authenticate();
            EncuestaService = new WSP.GeneracionEncuestaClient();
            EncuestaService.ClientCredentials.Authenticate();
            EntidadEncuesta = new WSP.reqGenerarEncuesta();
            
        }
        [HttpGet]
        public ActionResult EncuestadeSatisfaccion(string data)
        {
            POMSolicitudes modelo = new POMSolicitudes();
            if (data!=null)
            {
                ViewBag.Mensaje = "Registro almacenado";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EncuestadeSatisfaccion(POMSolicitudes modelo)
        {
            var FechaTransaccion = DateTime.Now;
            modelo.FechaTransaccion = FechaTransaccion;
            modelo.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.CanalTransaccion = Session["LineaLogeado"].ToString();
            modelo.SubCanal = Session["OperacionUsuarioHolos"].ToString();
            modelo.ZonaTransaccion = Session["LineaUsuarioHolos"].ToString();
            
            POMSolicitudes EncuestaRegistrada =  PomService.RegistrarSolicitudPom(modelo);
            //dia/mes/año hora:min:seg am o pm
            //18/10/2017 10:44:00 AM

            var FechaParaEncuesta = FechaTransaccion.ToString(@"dd/MM/yyyy hh:mm:ss tt", new CultureInfo("en-US"));
            
            //envia encuesta poom
            EntidadEncuesta.idtransaccion = Convert.ToString(EncuestaRegistrada.IdTansaccion);
            EntidadEncuesta.canal = Convert.ToString(EncuestaRegistrada.CanalTransaccion);
            EntidadEncuesta.subCanal = EncuestaRegistrada.SubCanal;
            EntidadEncuesta.zona = EncuestaRegistrada.ZonaTransaccion;
            EntidadEncuesta.fechaAtencionCliente = FechaParaEncuesta;
            //EntidadEncuesta.fechaEnvioEncuesta = "";
            EntidadEncuesta.min = Convert.ToString(EncuestaRegistrada.TelefonoCeluar);
            EntidadEncuesta.minContacto = Convert.ToString(EncuestaRegistrada.TelefonoDeContacto);
            EntidadEncuesta.minOrigen = Convert.ToString(EncuestaRegistrada.MinOrigen);
            EntidadEncuesta.email = Convert.ToString(EncuestaRegistrada.CorreoElectronico);
            EntidadEncuesta.cuenta = Convert.ToString(EncuestaRegistrada.CuentaCliente);
            EntidadEncuesta.operacion = Convert.ToString(EncuestaRegistrada.Operacion);
            EntidadEncuesta.tokenId = "";
            EntidadEncuesta.usuarioRegistra = Convert.ToString(EncuestaRegistrada.UsuarioTransaccion);
            EntidadEncuesta.enviaReintento = Convert.ToString(EncuestaRegistrada.EnviaReintento);
            EntidadEncuesta.enviaSoloEmail = EncuestaRegistrada.EnviaSoloEmail;
            EntidadEncuesta.idEncuesta = Convert.ToInt32(EncuestaRegistrada.IdEncuesta);
            

           var respuesta = EncuestaService.enviarEncuesta(EntidadEncuesta);
            if (respuesta.codigo == 0)
            {
                return RedirectToAction("EncuestadeSatisfaccion", "EncuestaCav", new { data = "true" });
               
            }
            else
            {
                PomService.EliminarEncuestaDime(EncuestaRegistrada);
                ViewBag.Mensaje = "No se pudo registrar la encuesta, por favor verifique la información suministrada y vuelva a intentarlo.";
                return View(modelo);
            }
          
        }
        [HttpGet]
        public ActionResult ConsultaEncuestaCavs()
        {
            return View();
        }
        public JsonResult ConsultaEncuestaCavsJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(PomService.ListaSolicitudesPom(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }


    }
}