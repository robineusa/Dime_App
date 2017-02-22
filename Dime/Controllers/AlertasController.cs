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
    public class AlertasController : Controller
    {
        WSD.ActivacionClaroVideoServiceClient clarovideowebservice;
        WSD.ActivacionSiembraHDServiceClient acsiembrahdwebservice;

        // GET: Alertas
        [AllowAnonymous]
        public ActionResult Convenio_Electronico()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult Elegido_Fijo_Movil()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Claro_Video()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Claro_Video(ActivacionClaroVideo model)
        {

            clarovideowebservice = new WSD.ActivacionClaroVideoServiceClient();
            clarovideowebservice.ClientCredentials.Authenticate();

            model.UsuarioGestion = Session["Usuario"].ToString();
            model.NombreUsuario = Session["NombreUsuario"].ToString();
            model.AliadoGestion = Session["AliadoLogeado"].ToString();

            clarovideowebservice.InsertarClaroVideoInbound(model);

            return RedirectToAction("Index", "Inbound");
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Siguiente_Mejor_Oferta()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Siguiente_Mejor_Oferta(SiguienteMejorOferta model , string TipCon, string Gest, string Cier, string Raz)
        {
            acsiembrahdwebservice = new WSD.ActivacionSiembraHDServiceClient();
            acsiembrahdwebservice.ClientCredentials.Authenticate();

            model.UsuarioGestion = Session["Usuario"].ToString();
            model.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.TipoContacto =TipCon;
            model.Gestion = Gest;
            model.Cierre = Cier;
            model.Razon = Raz;

            acsiembrahdwebservice.InsertarSMOInbound(model);

            return RedirectToAction("Index", "Inbound");
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Siembra_HD(ViewModelCuentasSiembraHD model, string cuentaCliente, string Ofrecimiento)
        {
            acsiembrahdwebservice = new WSD.ActivacionSiembraHDServiceClient();
            acsiembrahdwebservice.ClientCredentials.Authenticate();

            model.EntidadSiembraHD.UsuarioGestion = Session["Usuario"].ToString();
            model.EntidadSiembraHD.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            model.EntidadSiembraHD.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.EntidadSiembraHD.CuentaCliente = Convert.ToDecimal(cuentaCliente);
            model.EntidadSiembraHD.Ofrecimiento = Ofrecimiento;
            acsiembrahdwebservice.InsertarSiembraHDInbound(model.entidadSiembraHD);

            return RedirectToAction("Index", "Inbound");
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Siembra_HD()
        {
            return View();
        }
    }
}
