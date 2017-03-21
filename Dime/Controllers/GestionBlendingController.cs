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
    [ExpiringFilter]
    public class GestionBlendingController : MyController
    {
        // GET: GestionBlending
        WSD.MaestrosServiceClient mastersServices;
        WSD.BlendingServiceClient blendingServices;
        WSD.InboundServiceClient inboundServices;
  
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cierre_Ciclo(string cuentaSeleccionada, string idaGestionar)
        {

            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.DatosCliente = blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "CIERRE_CICLO");
                if(model.DatosCliente!= null)
                model.GestionOutInfo = blendingServices.TraerGestionOutboundInfoDeCuenta(model.DatosCliente.Cuenta, "CIERRE_CICLO");
            }
            else
            {
                inboundServices = new WSD.InboundServiceClient();
                inboundServices.ClientCredentials.Authenticate();
                model.DatosCliente = inboundServices.TraerClienteCompletoPorCuenta(Int32.Parse(cuentaSeleccionada));
                if (model.DatosCliente != null)
                model.GestionOutInfo = blendingServices.TraerGestionOutboundInfoDeCuenta(model.DatosCliente.Cuenta, "CIERRE_CICLO");
                model.CierreCicloGestionado = blendingServices.TraerCierreCicloGestionado(Int32.Parse(idaGestionar));
            }
            //Setea que no existen datos cliente si no encuentra nada en la base de datos para gestionar.
            if (model.DatosCliente == null)
            {
                model.DatosCliente = new ClientesTodo();
                model.DatosCliente.Cuenta = 0;
                model.DatosCliente.Nombre = "No existen datos";
            }

            model.HistoricoCierreCiclo.AddRange(blendingServices.TraerHistorialCierreCicloDeAsesor(idUsuarioActual));
            model.AgregarNombreClienteAHistoricoCierreCiclo(blendingServices.TraerNombresDeClientesCierreCiclo(model.HistoricoCierreCiclo));
            return View(model);
        }




        [HttpPost]
        public ActionResult Guardar_Cierre_Ciclo(ViewModelBlending model)
        {

            if (!ModelState.IsValid)
            {
                return View(model);
            }
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            model.CierreCicloGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            blendingServices.GuardarCierreCiclo(idUsuarioActual, model.DatosCliente, model.CierreCicloGestionado);
            return RedirectToAction("Cierre_Ciclo", "GestionBlending");
        }
  
        public ActionResult Convenio_Electronico(string  cuentaSeleccionada, string idConvenioGestionado)
        {
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            { 
            model.DatosCliente= blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "CONVENIO_ELECTRONICO");
            }
            else
            {
                inboundServices = new WSD.InboundServiceClient();
                inboundServices.ClientCredentials.Authenticate();
                model.DatosCliente = inboundServices.TraerClienteCompletoPorCuenta(Int32.Parse( cuentaSeleccionada));
                model.ConvenioElecGestionado = blendingServices.TraerConvenioElectronicoGestionado(Int32.Parse(idConvenioGestionado));
            }
            //Setea que no existen datos cliente si no encuentra nada en la base de datos para gestionar.
            if (model.DatosCliente == null)
            { 
                model.DatosCliente = new ClientesTodo();
                model.DatosCliente.Cuenta = 0;
                model.DatosCliente.Nombre = "No existen datos";
            }

            model.HistoricoConvenioElectronico.AddRange(blendingServices.TraerHistorialConvenioElectroDeAsesor(idUsuarioActual));


            return View(model);
        }


        [HttpPost]
        public ActionResult Guarda_Convenio_Electronico(ViewModelBlending model)
        {
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            model.ConvenioElecGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.ConvenioElecGestionado.LineaGestion = Session["LineaLogeado"].ToString();
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            blendingServices.GuardarGestionConvenioElectronico(idUsuarioActual, model.DatosCliente, model.ConvenioElecGestionado);
            return RedirectToAction("Convenio_Electronico", "GestionBlending");

        }


        public ActionResult Docsis(string cuentaSeleccionada, string idaGestionar)
        {
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.DatosCliente = blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "DOCSIS_OVERLAP");
            }
            else
            {
                inboundServices = new WSD.InboundServiceClient();
                inboundServices.ClientCredentials.Authenticate();
                model.DatosCliente = inboundServices.TraerClienteCompletoPorCuenta(Int32.Parse(cuentaSeleccionada));
                model.DocsisOverlapGestionado = blendingServices.TraerDocsisGestionado(Int32.Parse(idaGestionar));
            }
            //Setea que no existen datos cliente si no encuentra nada en la base de datos para gestionar.
            if (model.DatosCliente == null)
            {
                model.DatosCliente = new ClientesTodo();
                model.DatosCliente.Cuenta = 0;
                model.DatosCliente.Nombre = "No existen datos";
            }

            model.HistoricoDocsisOverlap.AddRange(blendingServices.TraerHistorialDocsisDeAsesor(idUsuarioActual));


            return View(model);
        }


        [HttpPost]
        public ActionResult GuardaDocsis(ViewModelBlending model)
        {
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            model.DocsisOverlapGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
            //Session de prueba remover cuando se hagan sesiones //////////
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
           blendingServices.GuardarGestionDocsis(idUsuarioActual, model.DatosCliente, model.DocsisOverlapGestionado);
            return RedirectToAction("Docsis", "GestionBlending");
        }


        public ActionResult Claro_Video(string cuentaSeleccionada, string idaGestionar)
        {  
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.DatosCliente = blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "CLARO_VIDEO");
            }
            else
            {
                inboundServices = new WSD.InboundServiceClient();
                inboundServices.ClientCredentials.Authenticate();
                model.DatosCliente = inboundServices.TraerClienteCompletoPorCuenta(Int32.Parse(cuentaSeleccionada));
                model.ClaroVideoGestionado = blendingServices.TraerClaroVideoGestionado(Int32.Parse(idaGestionar));
            }
            //Setea que no existen datos cliente si no encuentra nada en la base de datos para gestionar.
            if (model.DatosCliente == null)
            {
                model.DatosCliente = new ClientesTodo();
                model.DatosCliente.Cuenta = 0;
                model.DatosCliente.Nombre = "No existen datos";
            }

            model.HistoricoClaroVideo.AddRange(blendingServices.TraerHistorialClaroVideoDeAsesor(idUsuarioActual));

            return View(model);
        }

        [HttpPost]
        public ActionResult Guarda_Claro_Video(ViewModelBlending model)
        {
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            model.ClaroVideoGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            blendingServices.GuardarGestionClaroVideo(idUsuarioActual, model.DatosCliente, model.ClaroVideoGestionado);
            return RedirectToAction("Claro_Video", "GestionBlending");
        }


         public JsonResult TiposDeContactoList(decimal gestion)
        {
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            return new JsonResult()
            {   Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeContactoDeGestion(gestion)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


         public JsonResult TiposCierresList(decimal idContacto)
        {
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeCierresDeContacto(idContacto)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult TiposRazonesList(decimal idCierre)
        {
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeRazonDeCierres(idCierre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

        public JsonResult TiposCausasList(decimal idRazon)
        {
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeCausasDeRazon(idRazon)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult TiposMotivosList(decimal idCausa)
        {
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeMotivoDeCausas(idCausa)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


    }
}