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
    public class BannerController : Controller
    {
        WSD.BannerAlertasServiceClient bannerservice;

        public BannerController()
        {
            bannerservice = new WSD.BannerAlertasServiceClient();
            bannerservice.ClientCredentials.Authenticate();
        }
        
        public ActionResult BannerAlertas()
        {
            
            if (Session["CuentaBanner"] != null)
            {
               decimal Cuenta = Convert.ToDecimal(Session["CuentaBanner"].ToString());
            //Verificacion convenio electronico
            if (bannerservice.ValidarClienteEnConvenioElectronico(Cuenta))
            {ViewBag.ConvenioElectronico = true;}else { ViewBag.ConvenioElectronico = false; }

            //Verificacion claro video
            if (bannerservice.ValidarClienteEnClaroVideo(Cuenta))
            { ViewBag.ClaroVideo = true; }
            else { ViewBag.ClaroVideo = false; }

            //Verificacion siguiente mejor oferta
            if (bannerservice.ValidarClienteEnMejorOferta(Cuenta))
            { ViewBag.MejorOferta = true; }
            else { ViewBag.MejorOferta = false; }

            //Verificacion Siembra HD
            if (bannerservice.ValidarClienteEnSiembraHD(Cuenta))
            { ViewBag.SiembraHD = true; }
            else { ViewBag.SiembraHD = false; }

            //Verificacion Mejoras Tecnicas
            if (bannerservice.ValidarClienteEnMejorasTecnicas(Cuenta))
            { ViewBag.MejorasTecnicas = true; }
            else { ViewBag.MejorasTecnicas = false; }

            //Verificacion Fox
            if (bannerservice.ValidarClienteEnFox(Cuenta))
            { ViewBag.Fox = true; }
            else { ViewBag.Fox = false; }
            }
            else {  }


            return PartialView();

        }
        [HttpGet]
        public ActionResult ConvenioElectronico()
        {
            return View();
        }
        [HttpGet]
        public ActionResult ClaroVideo()
        {
            return View();
        }
        [HttpGet]
        public ActionResult MejorOferta(string CuentaCliente)
        {
            return View();
        }
        [HttpGet]
        public ActionResult SiembraHD()
        {
            return View();
        }
        [HttpGet]
        public ActionResult MejorasTecnicas()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Fox()
        {
            return View();
        }
    }
}