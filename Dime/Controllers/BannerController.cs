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
                decimal CuentaConsulta = Convert.ToDecimal(Session["CuentaBanner"].ToString());
                if (CuentaConsulta !=0 )
                {
                    //Verificacion convenio electronico
                    if (bannerservice.ValidarClienteEnConvenioElectronico(CuentaConsulta))
                    { ViewBag.ConvenioElectronico = true; }
                    else { ViewBag.ConvenioElectronico = false; }

                    //Verificacion claro video
                    if (bannerservice.ValidarClienteEnClaroVideo(CuentaConsulta))
                    { ViewBag.ClaroVideo = true; }
                    else { ViewBag.ClaroVideo = false; }

                    //Verificacion siguiente mejor oferta
                    if (bannerservice.ValidarClienteEnMejorOferta(CuentaConsulta))
                    { ViewBag.MejorOferta = true; }
                    else { ViewBag.MejorOferta = false; }

                    //Verificacion Siembra HD
                    if (bannerservice.ValidarClienteEnSiembraHD(CuentaConsulta))
                    { ViewBag.SiembraHD = true; }
                    else { ViewBag.SiembraHD = false; }

                    //Verificacion Mejoras Tecnicas
                    if (bannerservice.ValidarClienteEnMejorasTecnicas(CuentaConsulta))
                    { ViewBag.MejorasTecnicas = true; }
                    else { ViewBag.MejorasTecnicas = false; }

                    //Verificacion Fox
                    if (bannerservice.ValidarClienteEnFox(CuentaConsulta))
                    { ViewBag.Fox = true; }
                    else { ViewBag.Fox = false; }

                    //Verificacion Actualizacion de Datos
                    if (bannerservice.ValidarClienteEnActualizaciondeDatos(CuentaConsulta))
                    { ViewBag.ActDatos = true; }
                    else { ViewBag.ActDatos = false; }

                }
            }
            else {  }
            

            return PartialView();

        }
        
       
        public ActionResult ConvenioElectronico()
        {
            return View();
        }
       
        public ActionResult ClaroVideo()
        {
            ViewModelBanner modelo = new ViewModelBanner();
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
            modelo.ActivacionClaroVideo.CuentaCliente = Convert.ToDecimal(Session["CuentaBanner"]);

            bannerservice.RegistrarClaroVideo(modelo.ActivacionClaroVideo);
            ViewBag.GuardadoClaroVideo = "GUARDADO";
            return View();
        }
      [HttpGet]
        public ActionResult MejorOferta()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (Session["CuentaBanner"] != null)
            {
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(Convert.ToInt32(Session["CuentaBanner"]));
                modelo.CuentasMejorOferta = bannerservice.ConsultarClienteMejorOferta(Convert.ToDecimal(Session["CuentaBanner"]));
            }
            else { }
            
            ViewBag.GuardadoSMO = "SIN GUARDAR";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult MejorOferta(ViewModelBanner modelo)
        {
            modelo.SiguienteMejorOferta.UsuarioGestion = Session["Usuario"].ToString();
            modelo.SiguienteMejorOferta.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.SiguienteMejorOferta.CuentaCliente = Convert.ToDecimal(Session["CuentaBanner"]);

            bannerservice.RegistrarSMO(modelo.SiguienteMejorOferta);
            ViewBag.Guardado = "SI";
            ViewBag.GuardadoSMO = "GUARDADO";
            return View();
        }
      
        public ActionResult SiembraHD()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (Session["CuentaBanner"] != null)
            {
                modelo.CuentasSiembraHD = bannerservice.ConsultarCuentaSiembraHD(Convert.ToDecimal(Session["CuentaBanner"]));
            }
            else { }
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
            modelo.SiembraHD.CuentaCliente = Convert.ToDecimal(Session["CuentaBanner"]);
            modelo.SiembraHD.Ofrecimiento = modelo.CuentasSiembraHD.Ofrecimiento;

            bannerservice.RegistrarSiembraHD(modelo.SiembraHD);
            ViewBag.GuardadoSiembraHD = "GUARDADO";
            return View();
        }
      [HttpGet]
        public ActionResult MejorasTecnicas()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (Session["CuentaBanner"] != null)
            {
                modelo.CuentasMejorasTecnicas = bannerservice.ConsultarCuentaMejorasTecnicas(Convert.ToDecimal(Session["CuentaBanner"]));
            }
            else { }
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
            modelo.MejorasTecnicas.CuentaCliente = Convert.ToDecimal(Session["CuentaBanner"]);
            modelo.MejorasTecnicas.Accionable = modelo.CuentasMejorasTecnicas.Accionable;

            bannerservice.RegistrarMejorasTecnicas(modelo.MejorasTecnicas);
            ViewBag.GuardadoMejorasTecnicas = "GUARDADO";
            return View();
        }
     [HttpGet]
        public ActionResult Fox()
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (Session["CuentaBanner"] != null)
            {
                modelo.CuentasFox = bannerservice.ConsultaCuentaBaseFox(Convert.ToDecimal(Session["CuentaBanner"]));
            }
            else { }
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
            modelo.GestionFox.CuentaCliente = Convert.ToDecimal(Session["CuentaBanner"]);
            modelo.GestionFox.FechaVencimiento = Convert.ToString(modelo.CuentasFox.FechaVencimiento);
            modelo.GestionFox.Ofrecimiento = modelo.CuentasFox.Ofrecimiento;

            bannerservice.RegistraFox(modelo.GestionFox);
            ViewBag.GuardadoFox = "GUARDADO";
            return View();
        }
        [HttpGet]
        public ActionResult ActualizacionDatos(string Data)
        {
            ViewModelBanner modelo = new ViewModelBanner();

            if (Session["CuentaBanner"] != null)
            {
                modelo.ClientesTodo = inboundservice.TraerClienteCompletoPorCuenta(Convert.ToInt32(Session["CuentaBanner"]));
            }
            else { }
            if (Data!= null)
            {
                ViewBag.GuardarActDatos = Data;
            }
            else
            {
                ViewBag.GuardarActDatos = "SIN GUARDAR";
            }
            
            return View(modelo);
        }
        public JsonResult ListaDeCuentasPorNumeroTelefonico()
        {
            decimal Telefono = bannerservice.ConsultarTelefonoPorCuenta(Convert.ToInt32(Session["CuentaBanner"]));
            var jsonResult = Json(JsonConvert.SerializeObject(bannerservice.ListaClientesPorTelefono(Telefono)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult RegistrarCuentasPorTelefono(IList<string> IAsociadosSi, IList<string> IAsociadosNo)
        {
            
            if (IAsociadosSi != null && IAsociadosSi != null)
            {
                BAPActualizarDatos Datos = new BAPActualizarDatos();
                bannerservice.RegistrarActualizaciondeDatos(IAsociadosSi.ToList(), IAsociadosNo.ToList(), Datos);

                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject("Informacion Almacenada Correctamente"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet

                };
               
            }
            else
            {
                return null;
            }
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizacionDatos(ViewModelBanner modelo)
        {
            modelo.BAPActualizarDatos.UsuarioGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.BAPActualizarDatos.AliadoGestion = Session["AliadoLogeado"].ToString();
            modelo.BAPActualizarDatos.OperacionGestion = Session["OperacionUsuarioHolos"].ToString();
            
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
            modelo.CuentaRevisoTabla = Convert.ToInt32(Session["CuentaBanner"]);
            modelo.Alerta = Alerta;
            bannerservice.RegistraUsabilidadBanner(modelo);

            return new JsonResult
                {
                    Data = JsonConvert.SerializeObject("Usabilidad Registrada"),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet

                };
        }
       
    }
}