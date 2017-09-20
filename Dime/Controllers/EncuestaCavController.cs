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
        public ActionResult EncuestadeSatisfaccion()
        {
            POMSolicitudes modelo = new POMSolicitudes();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EncuestadeSatisfaccion(POMSolicitudes modelo)
        {
            modelo.UsuarioTransaccion = Session["Usuario"].ToString();
            POMSolicitudes EncuestaRegistrada =  PomService.RegistrarSolicitudPom(modelo);
            
            //envia encuesta poom
            EntidadEncuesta.id = Convert.ToString(EncuestaRegistrada.IdTansaccion);
            EntidadEncuesta.canal = Convert.ToString(EncuestaRegistrada.CanalTransaccion);
            EntidadEncuesta.zona = Convert.ToString(EncuestaRegistrada.ZonaTransaccion);
            EntidadEncuesta.fecha = Convert.ToString(EncuestaRegistrada.FechaTransaccion);
            EntidadEncuesta.min = Convert.ToString(EncuestaRegistrada.TelefonoCeluar);
            EntidadEncuesta.minContacto = Convert.ToString(EncuestaRegistrada.TelefonoDeContacto);
            EntidadEncuesta.email = Convert.ToString(EncuestaRegistrada.CorreoElectronico);
            EntidadEncuesta.cuenta = Convert.ToString(EncuestaRegistrada.CuentaCliente);
            EntidadEncuesta.operacion = Convert.ToString(EncuestaRegistrada.Operacion);
            EntidadEncuesta.tokenId = Convert.ToString(EncuestaRegistrada.TokenId);
            EntidadEncuesta.usuarioRegistra = Convert.ToString(EncuestaRegistrada.UsuarioTransaccion);

            EncuestaService.enviarEncuesta(EntidadEncuesta);
            return RedirectToAction("EncuestadeSatisfaccion", "EncuestaCav");
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