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
    [ExpiringFilter]
    public class AlertasController : MyController
    {
        WSD.ActivacionClaroVideoServiceClient clarovideowebservice;
        WSD.ActivacionSiembraHDServiceClient acsiembrahdwebservice;

        public AlertasController()
        {
            clarovideowebservice = new WSD.ActivacionClaroVideoServiceClient();
            clarovideowebservice.ClientCredentials.Authenticate();
            acsiembrahdwebservice = new WSD.ActivacionSiembraHDServiceClient();
            acsiembrahdwebservice.ClientCredentials.Authenticate();
        }

        // GET: Alertas

        public ActionResult Convenio_Electronico()
        {
            return View();
        }
        
        public ActionResult Elegido_Fijo_Movil()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult Claro_Video()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult Claro_Video(ActivacionClaroVideo model)
        {

          

            model.UsuarioGestion = Session["Usuario"].ToString();
            model.NombreUsuario = Session["NombreUsuario"].ToString();
            model.AliadoGestion = Session["AliadoLogeado"].ToString();

            clarovideowebservice.InsertarClaroVideoInbound(model);

            return RedirectToAction("Index", "Inbound");
        }
        
        [HttpGet]
        public ActionResult Siguiente_Mejor_Oferta()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult Siguiente_Mejor_Oferta(SiguienteMejorOferta model , string TipCon, string Gest, string Cier, string Raz)
        {
            

            model.UsuarioGestion = Session["Usuario"].ToString();
            model.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.TipoContacto =TipCon;
            model.Gestion = Gest;
            model.Cierre = Cier;
            model.Razon = Raz;

            acsiembrahdwebservice.InsertarSMOInbound(model);

            return RedirectToAction("Index", "Inbound");
        }
       
        [HttpPost]
        public ActionResult Siembra_HD(ViewModelCuentasSiembraHD model, string cuentaCliente, string Ofrecimiento)
        {
           

            model.EntidadSiembraHD.UsuarioGestion = Session["Usuario"].ToString();
            model.EntidadSiembraHD.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            model.EntidadSiembraHD.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.EntidadSiembraHD.CuentaCliente = Convert.ToDecimal(cuentaCliente);
            model.EntidadSiembraHD.Ofrecimiento = Ofrecimiento;
            acsiembrahdwebservice.InsertarSiembraHDInbound(model.entidadSiembraHD);

            return RedirectToAction("Index", "Inbound");
        }
       
        [HttpGet]
        public ActionResult Siembra_HD()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Mejoras_Tecnicas()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Mejoras_Tecnicas(MejorasTecnicas model)
        {
            model.UsuarioGestion = Session["Usuario"].ToString();
            model.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            model.AliadoGestion = Session["AliadoLogeado"].ToString();

            acsiembrahdwebservice.InsertarMejorasTecnicasInbound(model);

            return RedirectToAction("Index", "Inbound");
        }
    }
}
