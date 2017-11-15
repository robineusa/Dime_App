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
    public class BannerController : MyController
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
       public static class GlobalVariable{
            public static decimal CuentaParaBanner { get; set; }
        }
        public ActionResult BannerAlertas()
        {
          
            if (Session["CuentaBanner"] != null)
            {
               
                GlobalVariable.CuentaParaBanner = Convert.ToDecimal(Session["CuentaBanner"].ToString());
                Session.Remove("CuentaBanner");
                //Verificacion convenio electronico
            if (bannerservice.ValidarClienteEnConvenioElectronico(GlobalVariable.CuentaParaBanner))
            {ViewBag.ConvenioElectronico = true;}else { ViewBag.ConvenioElectronico = false; }

            //Verificacion claro video
            if (bannerservice.ValidarClienteEnClaroVideo(GlobalVariable.CuentaParaBanner))
            { ViewBag.ClaroVideo = true; }
            else { ViewBag.ClaroVideo = false; }

            //Verificacion siguiente mejor oferta
            if (bannerservice.ValidarClienteEnMejorOferta(GlobalVariable.CuentaParaBanner))
            { ViewBag.MejorOferta = true; }
            else { ViewBag.MejorOferta = false; }

            //Verificacion Siembra HD
            if (bannerservice.ValidarClienteEnSiembraHD(GlobalVariable.CuentaParaBanner))
            { ViewBag.SiembraHD = true; }
            else { ViewBag.SiembraHD = false; }

            //Verificacion Mejoras Tecnicas
            if (bannerservice.ValidarClienteEnMejorasTecnicas(GlobalVariable.CuentaParaBanner))
            { ViewBag.MejorasTecnicas = true; }
            else { ViewBag.MejorasTecnicas = false; }

            //Verificacion Fox
            if (bannerservice.ValidarClienteEnFox(GlobalVariable.CuentaParaBanner))
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
            ViewModelBanner modelo = new ViewModelBanner();

            if (GlobalVariable.CuentaParaBanner != 0)
            {
                
                //int CuentaCliente = Convert.ToInt32(Session["CuentaBanner"].ToString());
                modelo.ClientesTodo.Cuenta = Convert.ToInt32(GlobalVariable.CuentaParaBanner);
            }
            else
            {}
            ViewBag.GuardadoClaroVideo = "SIN GUARDAR";
            return View(modelo);
            
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ClaroVideo(ViewModelBanner modelo)
        {
            modelo.ActivacionClaroVideo.UsuarioGestion = Session["Usuario"].ToString();
            modelo.ActivacionClaroVideo.NombreUsuario = Session["NombreUsuario"].ToString();
            modelo.ActivacionClaroVideo.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.ActivacionClaroVideo.CuentaCliente = GlobalVariable.CuentaParaBanner;

            bannerservice.RegistrarClaroVideo(modelo.ActivacionClaroVideo);
            ViewBag.GuardadoClaroVideo = "GUARDADO";
            return View();
        }
        [HttpGet]
        public ActionResult MejorOferta()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (GlobalVariable.CuentaParaBanner != 0)
            {
                //int CuentaIn = Convert.ToInt32(Session["CuentaBanner"].ToString());
                //decimal CuentaCliente = Convert.ToInt32(Session["CuentaBanner"].ToString());
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(Convert.ToInt32(GlobalVariable.CuentaParaBanner));
                modelo.CuentasMejorOferta = bannerservice.ConsultarClienteMejorOferta(GlobalVariable.CuentaParaBanner);
              
            }
            else
            {
              
            }
            ViewBag.GuardadoSMO = "SIN GUARDAR";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult MejorOferta(ViewModelBanner modelo)
        {
            modelo.SiguienteMejorOferta.UsuarioGestion = Session["Usuario"].ToString();
            modelo.SiguienteMejorOferta.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.SiguienteMejorOferta.CuentaCliente = GlobalVariable.CuentaParaBanner;

            bannerservice.RegistrarSMO(modelo.SiguienteMejorOferta);
            ViewBag.Guardado = "SI";
            ViewBag.GuardadoSMO = "GUARDADO";
            return View();
        }
        [HttpGet]
        public ActionResult SiembraHD()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (GlobalVariable.CuentaParaBanner != 0)
            {
                //int CuentaIn = Convert.ToInt32(Session["CuentaBanner"].ToString());
                //decimal CuentaCliente = Convert.ToInt32(Session["CuentaBanner"].ToString());
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(Convert.ToInt32(GlobalVariable.CuentaParaBanner));
                modelo.CuentasSiembraHD = bannerservice.ConsultarCuentaSiembraHD(GlobalVariable.CuentaParaBanner);
                
            }
            else
            {

            }
            ViewBag.GuardadoSiembraHD = "SIN GUARDAR";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SiembraHD(ViewModelBanner modelo)
        {
            modelo.SiembraHD.UsuarioGestion = Session["Usuario"].ToString();
            modelo.SiembraHD.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            modelo.SiembraHD.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.SiembraHD.CuentaCliente = GlobalVariable.CuentaParaBanner;
            modelo.SiembraHD.Ofrecimiento = modelo.CuentasSiembraHD.Ofrecimiento;

            bannerservice.RegistrarSiembraHD(modelo.SiembraHD);
            ViewBag.GuardadoSiembraHD = "GUARDADO";
            return View();
        }
        [HttpGet]
        public ActionResult MejorasTecnicas()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (GlobalVariable.CuentaParaBanner != 0)
            {
                //int CuentaIn = Convert.ToInt32(Session["CuentaBanner"].ToString());
                //decimal CuentaCliente = Convert.ToInt32(Session["CuentaBanner"].ToString());
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(Convert.ToInt32(GlobalVariable.CuentaParaBanner));
                modelo.CuentasMejorasTecnicas = bannerservice.ConsultarCuentaMejorasTecnicas(GlobalVariable.CuentaParaBanner);
            }
            else
            {

            }
            ViewBag.GuardadoMejorasTecnicas = "SIN GUARDAR";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult MejorasTecnicas(ViewModelBanner modelo)
        {
            modelo.MejorasTecnicas.UsuarioGestion = Session["Usuario"].ToString();
            modelo.MejorasTecnicas.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            modelo.MejorasTecnicas.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.MejorasTecnicas.CuentaCliente = GlobalVariable.CuentaParaBanner;
            modelo.MejorasTecnicas.Accionable = modelo.CuentasMejorasTecnicas.Accionable;

            bannerservice.RegistrarMejorasTecnicas(modelo.MejorasTecnicas);
            ViewBag.GuardadoMejorasTecnicas = "GUARDADO";
            return View();
        }
        [HttpGet]
        public ActionResult Fox()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (GlobalVariable.CuentaParaBanner != 0)
            {
                //int CuentaIn = Convert.ToInt32(Session["CuentaBanner"].ToString());
                //decimal CuentaCliente = Convert.ToInt32(Session["CuentaBanner"].ToString());
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(Convert.ToInt32(GlobalVariable.CuentaParaBanner));
                modelo.CuentasFox = bannerservice.ConsultaCuentaBaseFox(GlobalVariable.CuentaParaBanner);
            }
            else
            {

            }
            ViewBag.GuardadoFox = "SIN GUARDAR";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Fox(ViewModelBanner modelo)
        {
            modelo.GestionFox.UsuarioGestion = Session["Usuario"].ToString();
            modelo.GestionFox.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            modelo.GestionFox.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.GestionFox.CuentaCliente = GlobalVariable.CuentaParaBanner;
            modelo.GestionFox.FechaVencimiento = Convert.ToString(modelo.CuentasFox.FechaVencimiento);
            modelo.GestionFox.Ofrecimiento = modelo.CuentasFox.Ofrecimiento;

            bannerservice.RegistraFox(modelo.GestionFox);
            ViewBag.GuardadoFox = "GUARDADO";
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
        //Guarda Usabilidad Banner
        [HttpPost]
        public JsonResult RegistrarUsabilidadBanner(string Alerta)
        {
            UsabilidadAlertasInbound modelo = new UsabilidadAlertasInbound();
            modelo.Id = 0;
            modelo.FechaRevision = DateTime.Now;
            modelo.IdUsuarioRevision = Convert.ToInt32(Session["IdUsuario"].ToString());
            modelo.NombreUsuarioRevision = Session["NombreUsuario"].ToString();
            modelo.Aliado = Session["AliadoLogeado"].ToString();
            modelo.CuentaRevisoTabla = Convert.ToInt32(GlobalVariable.CuentaParaBanner);
            modelo.Alerta = Alerta;
            bannerservice.RegistraUsabilidadBanner(modelo);

            return new JsonResult
                {
                    Data = JsonConvert.SerializeObject("Usabilidad Registrada"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet

                };
        }
        //Guarda Usabilidad Banner
        [HttpPost]
        public JsonResult RecargaCuentaBanner(string CuentaCliente)
        {
            GlobalVariable.CuentaParaBanner = Convert.ToDecimal(CuentaCliente);
            BannerAlertas();
            ClaroVideo();
            MejorOferta();
            SiembraHD();
            MejorasTecnicas();
            Fox();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(""),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet

            };
        }
    }
}