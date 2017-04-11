using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class InboundController : MyController
    {
      
        WSD.InboundServiceClient inboundService;
        WSD.MarcacionesServiceClient marcacionService;
        WSD.ActivacionSiembraHDServiceClient acsiembrahdwebservice;
        
        public InboundController()
        {
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            acsiembrahdwebservice = new WSD.ActivacionSiembraHDServiceClient();
            acsiembrahdwebservice.ClientCredentials.Authenticate();
           marcacionService = new WSD.MarcacionesServiceClient();
            marcacionService.ClientCredentials.Authenticate();
        }


        // GET: Inbound
        /// <summary>
        /// 
        /// </summary>
        /// <param name="choosenCuenta"></param>
        /// <returns></returns>

        [HttpGet]
        public ActionResult Index(string choosenCuenta)
        {
            
            InboundModel model = new InboundModel();
            List<string> hobbieOptions = inboundService.ConsultarHobbiesOptions();
            model.HobbyOptions = new List<SelectListItem>();
            model.HobbyOptions.Add(new SelectListItem { Text = "Datos adicionales no cargados", Value = "Datos adicionales no cargados" });
            string createText = "Hello and Welcome" + Environment.NewLine;
            model.LineaDeUsuarioActual = Session["LineaLogeado"].ToString();
            if (choosenCuenta != null) { model.ModelTipiMarca.IngresoTipMarcacion.IdServicio = 0; model.ClientesTodos.Cuenta = int.Parse(choosenCuenta); RedirectToAction("Index", "Inbound", model); }
  
            return View(model);
        }


     
      
        [HttpPost]
        public ActionResult Index(InboundModel model, string cambiarDatos)
        {
           
            
            int cuentaCliente = model.ClientesTodos.Cuenta;
            model.ClientesTodos = inboundService.TraerClienteCompletoPorCuenta(cuentaCliente);
            if ( cambiarDatos!=null && cambiarDatos.Equals("true"))
            {   if(model.ModelTipiMarca.IngresoTipMarcacion.IdServicio!= 0)
                {

                model.DatosAdcionalesCliente.Cuenta = model.ClientesTodos.Cuenta;
                inboundService.RegistrarActualizarDatosAdicionalesCliente(model.DatosAdcionalesCliente);
                model.ModelTipiMarca.IngresoTipMarcacion.UsuarioApertura = Session["IdUsuario"].ToString();   model.ModelTipiMarca.IngresoTipMarcacion.AliadoApertura = Session["AliadoLogeado"].ToString();         model.ModelTipiMarca.IngresoTipMarcacion.NombreLineaIngreso = Session["LineaLogeado"].ToString();
                    model.ModelTipiMarca.Observaciones = model.ModelTipiMarca.Observaciones.ToUpper();


                    if (model.ModelTipiMarca.IngresoSoporte != null && (model.ModelTipiMarca.IngresoSoporte.TipoSegumiento.Equals("CELULA VISITA SOPORTE") || model.ModelTipiMarca.IngresoSoporte.TipoSegumiento.Equals("CELULA SEGUIMIENTO SOPORTE")))
                    {
                        if(model.ModelTipiMarca.IngresoSoporte.IncidenciaCcaa!= 0 && model.ModelTipiMarca.IngresoSoporte.NombreAutoriza != "" 
                               && model.ModelTipiMarca.IngresoSoporte.TipoSegumiento != "0" && model.ModelTipiMarca.IngresoSoporte.CcaaIndicaVisitaTecnica != "0")
                           inboundService.RegistrarIngresoInbound(model.ClientesTodos, model.ModelTipiMarca.IngresoTipMarcacion, model.ModelTipiMarca.Observaciones, model.ModelTipiMarca.IngresoSoporte);
                        else ViewBag.ErrorTextBoxServicio = "Complete todos los datos de soporte";
                    }
                    else
                    {
                        inboundService.RegistrarIngresoInbound(model.ClientesTodos, model.ModelTipiMarca.IngresoTipMarcacion, model.ModelTipiMarca.Observaciones, model.ModelTipiMarca.IngresoSoporte);
                    }
                
                }
                else
                {
                    ViewBag.ErrorTextBoxServicio = "Datos no guardados, seleccione una opción";
                }
            }

            if(model.ClientesTodos== null)  model = new InboundModel();
            List<string> hobbieOptions = inboundService.ConsultarHobbiesOptions();
            model.HobbyOptions = new List<SelectListItem>();
            foreach (var item in hobbieOptions)
            model.HobbyOptions.Add(new SelectListItem { Text = item, Value = item });

            ///consulta siembra HD
            var siembraHD = acsiembrahdwebservice.BuscarCuentaSiembraHD(Convert.ToDecimal(cuentaCliente));
            model.ListaSiembraHD = siembraHD.Select(x => new CuentasSiembraHD
            {
                Id = x.Id,
                CuentaCliente = x.CuentaCliente,
                Ofrecimiento = x.Ofrecimiento
            }).ToList();

            ///consulta SMO
            var SMO = acsiembrahdwebservice.BuscarCuentaSMO(Convert.ToDecimal(cuentaCliente));
            model.ListaSMO = SMO.Select(x => new CuentasSiguienteMejorOferta
            {
                Id = x.Id,
                CuentaCliente = x.CuentaCliente,
                Ofrecimiento1 = x.Ofrecimiento1,
                Ofrecimiento2 = x.Ofrecimiento2,
                Ofrecimiento3 = x.Ofrecimiento3
            }).ToList();


            model.DatosAdcionalesCliente = inboundService.TraerDatosAdicionalesCliente(cuentaCliente)?? new DatosAdicionalesCliente();
            model.iniciarOptionsVista();
            model.LineaDeUsuarioActual = Session["LineaLogeado"].ToString();
            //model.ModelTipiMarca.IngresoTipMarcacion.IdServicio = 0;
            //model.ModelTipiMarca.IngresoTipMarcacion.Macroproceso = "";
            //model.ModelTipiMarca.IngresoTipMarcacion.Marcacion = "";
            model.ModelTipiMarca = null;
            //model.ModelTipiMarca.IngresoTipMarcacion.IdServicio = 0;
            return View(model);
        }




      
        public JsonResult IngresosListDeCuenta(string cuenta)
        {
            
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundService.ListaIngresosDeCuenta(cuenta)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }




   
        [HttpGet]
        public ActionResult Actualizar(string id, string nombMarcacion)
        {   
          
            InboundModel model = new InboundModel();
            var tablaHistorialCaso = inboundService.ListaHistorialCaso(Convert.ToInt32(id));
            model.HistorialCaso = tablaHistorialCaso.Select(x => new TablaActualizarInbound { CuentaCliente = x.CuentaCliente, FechaNota = x.FechaNota, HoraNota = x.HoraNota,
                                                                  Usuario = x.Usuario, IdEstado = x.IdEstado, IdIngreso = x.IdIngreso, LlamadaCliente = x.LlamadaCliente,
                                                                    NombreLineaNota = x.NombreLineaNota, Nota= x.Nota, PerfilUsuario= x.PerfilUsuario, Ticket=x.Ticket }).ToList() ;

            model.MarcacionEntrada = marcacionService.GetIdMarcacionPorNombre(nombMarcacion);
            model.ModelTipiMarca.IngresoTipMarcacion = new Ingreso();
            model.ModelTipiMarca.IngresoSoporte = new IngresosSoporte();
            model.ModelTipiMarca.IngresoTipMarcacion.UsuarioApertura = Session["IdUsuario"].ToString(); model.ModelTipiMarca.IngresoTipMarcacion.AliadoApertura = Session["AliadoLogeado"].ToString(); model.ModelTipiMarca.IngresoTipMarcacion.NombreLineaIngreso = Session["LineaLogeado"].ToString();
            model.ModelTipiMarca.IngresoTipMarcacion.IdIngreso = Convert.ToDecimal(id);
            model.LineaDeUsuarioActual = Session["LineaLogeado"].ToString();
            return View(model);
        }


        
        [HttpPost]
        public ActionResult Actualizar(InboundModel model)
        {
           
            if (model.ModelTipiMarca.Observaciones == null)
            {
                model.ModelTipiMarca.Observaciones = "SIN NOTAS";
            }
            model.ModelTipiMarca.IngresoTipMarcacion.UsuarioUltimaActualizacion = Session["IdUsuario"].ToString(); model.ModelTipiMarca.IngresoTipMarcacion.NombreLineaIngreso = Session["LineaLogeado"].ToString();
            inboundService.ActualizarIngresoInbound( model.ModelTipiMarca.IngresoTipMarcacion, model.ModelTipiMarca.Observaciones, model.ModelTipiMarca.LlamadaCliente, model.ModelTipiMarca.IngresoSoporte);
            var tablaHistorialCaso = inboundService.ListaHistorialCaso(Convert.ToInt32(model.ModelTipiMarca.IngresoTipMarcacion.IdIngreso));
            model.HistorialCaso = tablaHistorialCaso.Select(x => new TablaActualizarInbound        {             CuentaCliente = x.CuentaCliente,      FechaNota = x.FechaNota,
                HoraNota = x.HoraNota,                Usuario = x.Usuario,                IdEstado = x.IdEstado,                IdIngreso = x.IdIngreso,                LlamadaCliente = x.LlamadaCliente,
                NombreLineaNota = x.NombreLineaNota,                Nota = x.Nota,                PerfilUsuario = x.PerfilUsuario,                Ticket = x.Ticket
            }).ToList();
            model.MarcacionEntrada =Convert.ToInt32(model.ModelTipiMarca.IngresoTipMarcacion.IdIngreso);
            model.LineaDeUsuarioActual = Session["LineaLogeado"].ToString();
            return RedirectToAction("Index", "Inbound");/*, new { id = model.ModelTipiMarca.IngresoTipMarcacion.IdIngreso, nombMarcacion= model.ModelTipiMarca.IngresoTipMarcacion.Marcacion*/ 
        }




     
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }


    }
}