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
  
        public GestionBlendingController()
        {
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
            blendingServices = new WSD.BlendingServiceClient();
            blendingServices.ClientCredentials.Authenticate();
            inboundServices = new WSD.InboundServiceClient();
            inboundServices.ClientCredentials.Authenticate();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Cierre_Ciclo(string cuentaSeleccionada, string idaGestionar)
        {

            
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.DatosCliente = blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "CIERRE_CICLO", Session["AliadoLogeado"].ToString(), Session["LineaLogeado"].ToString());
                if(model.DatosCliente!= null)
                model.GestionOutInfo = blendingServices.TraerGestionOutboundInfoDeCuenta(model.DatosCliente.Cuenta, "CIERRE_CICLO", Session["AliadoLogeado"].ToString(), Session["LineaLogeado"].ToString());
            }
            else
            {
                
                model.DatosCliente = inboundServices.TraerClienteCompletoPorCuenta(Int32.Parse(cuentaSeleccionada));
                if (model.DatosCliente != null)
                model.GestionOutInfo = blendingServices.TraerGestionOutboundInfoDeCuenta(model.DatosCliente.Cuenta, "CIERRE_CICLO", Session["AliadoLogeado"].ToString(), Session["LineaLogeado"].ToString());
                model.CierreCicloGestionado = blendingServices.TraerCierreCicloGestionado(Int32.Parse(idaGestionar));
            }   
            //Setea que no existen datos cliente si no encuentra nada en la base de datos para gestionar.
            if (model.DatosCliente == null || model.GestionOutInfo == null)
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
            if (model.DatosCliente.Cuenta.Equals(0))
            {
                ViewBag.NoDatos = "ERROR: No se puede guardar por que no hay cuentas para gestionar";
            }
            else {
                int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
                model.CierreCicloGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
              
                blendingServices.GuardarCierreCiclo(idUsuarioActual, model.DatosCliente, model.CierreCicloGestionado);
                
            }
            return RedirectToAction("Cierre_Ciclo", "GestionBlending");
        }
  
        public ActionResult Convenio_Electronico(string  cuentaSeleccionada, string idConvenioGestionado)
        {
            
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            { 
            model.DatosCliente= blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "CONVENIO_ELECTRONICO", Session["AliadoLogeado"].ToString(), Session["LineaLogeado"].ToString());
            }
            else
            {
               
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
            if (model.DatosCliente.Cuenta.Equals(0))
            {
                ViewBag.NoDatos = "ERROR: No se puede guardar por que no hay cuentas para gestionar";
            }
            else
            {
                int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
                model.ConvenioElecGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
                model.ConvenioElecGestionado.LineaGestion = Session["LineaLogeado"].ToString();
               
                blendingServices.GuardarGestionConvenioElectronico(idUsuarioActual, model.DatosCliente, model.ConvenioElecGestionado);
            }
            return RedirectToAction("Convenio_Electronico", "GestionBlending");

        }


        public ActionResult Docsis(string cuentaSeleccionada, string idaGestionar)
        {
            
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.DatosCliente = blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "DOCSIS_OVERLAP", Session["AliadoLogeado"].ToString(), Session["LineaLogeado"].ToString());
            }
            else
            {
               
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
            if (model.DatosCliente.Cuenta.Equals(0))
            {
                ViewBag.NoDatos = "ERROR: No se puede guardar por que no hay cuentas para gestionar";
            }
            else
            {
                int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
                model.DocsisOverlapGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
                //Session de prueba remover cuando se hagan sesiones //////////
               
                blendingServices.GuardarGestionDocsis(idUsuarioActual, model.DatosCliente, model.DocsisOverlapGestionado);
            }
            return RedirectToAction("Docsis", "GestionBlending");
        }


        public ActionResult Claro_Video(string cuentaSeleccionada, string idaGestionar)
        {  
           
            ViewModelBlending model = new ViewModelBlending();
            int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
            if (cuentaSeleccionada == null || cuentaSeleccionada.Equals(""))
            {
                model.DatosCliente = blendingServices.TraerMisDatosClienteAutomaticos(idUsuarioActual, "CLARO_VIDEO", Session["AliadoLogeado"].ToString(), Session["LineaLogeado"].ToString());
            }
            else
            {
                
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
            if (model.DatosCliente.Cuenta.Equals(0))
            {
                ViewBag.NoDatos = "ERROR: No se puede guardar por que no hay cuentas para gestionar";
            }
            else
            {
                int idUsuarioActual = Int32.Parse(Session["IdUsuario"].ToString());
                model.ClaroVideoGestionado.AliadoGestion = Session["AliadoLogeado"].ToString();
                
                blendingServices.GuardarGestionClaroVideo(idUsuarioActual, model.DatosCliente, model.ClaroVideoGestionado);
            }
            return RedirectToAction("Claro_Video", "GestionBlending");
        }


         public JsonResult TiposDeContactoList(decimal gestion)
        {
            
            return new JsonResult()
            {   Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeContactoDeGestion(gestion)),
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

        public ActionResult AsignarBasesAdmin()
        {
            return View();
        }


        public ActionResult SkillsUsuariosAdmin()
        {
            ViewModelBlending model = new ViewModelBlending();
          
            return View(model);
        }
        public JsonResult SkillsUsuariosAdminJson()
        {
            
            var jsonResult = Json(JsonConvert.SerializeObject(mastersServices.TraerListaLineasBlending(Session["AliadoLogeado"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            
        }
        public JsonResult UsuariosporOperacion( string Operacion)
        {

            var jsonResult = Json(JsonConvert.SerializeObject(blendingServices.ListaUsuariosAdminBlending(Operacion)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

    }
}