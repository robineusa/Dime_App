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
        WSD.MaestrosServiceClient mastersServices;
        WSD.InboundServiceClient inboundservice;
        public BannerController()
        {
            bannerservice = new WSD.BannerAlertasServiceClient();
            bannerservice.ClientCredentials.Authenticate();
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            inboundservice = new WSD.InboundServiceClient();
            inboundservice.ClientCredentials.Authenticate();
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
        public ActionResult MejorOferta()
        {
            ViewModelMejorOferta modelo = new ViewModelMejorOferta();

            if (Session["CuentaBanner"] != null)
            {
                int CuentaIn = Convert.ToInt32(Session["CuentaBanner"].ToString());
                decimal CuentaCliente = Convert.ToInt32(Session["CuentaBanner"].ToString());
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(CuentaIn);
                modelo.CuentasMejorOferta = bannerservice.ConsultarClienteMejorOferta(CuentaCliente);
              
            }
            else
            {
              
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult MejorOferta(ViewModelMejorOferta modelo)
        {
            modelo.SiguienteMejorOferta.UsuarioGestion = Session["Usuario"].ToString();
            modelo.SiguienteMejorOferta.AliadoGestion = Session["AliadoLogeado"].ToString();
            bannerservice.RegistrarSMO(modelo.SiguienteMejorOferta);
            ViewBag.Guardado = "SI";
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
        public JsonResult TiposDeContactoList(decimal gestion)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeContactoDeGestion(gestion)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult TiposCierresList(decimal idContacto)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeCierresDeContacto(idContacto)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult TiposRazonesList(decimal idCierre)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeRazonDeCierres(idCierre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

        public JsonResult TiposCausasList(decimal idRazon)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeCausasDeRazon(idRazon)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult TiposMotivosList(decimal idCausa)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeMotivoDeCausas(idCausa)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

    }
}