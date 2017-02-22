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
    public class CasosCelulaController : Controller
    {


        WSD.CasosCelulaServiceClient casosCellService;
        WSD.InboundServiceClient inboundService;
        WSD.MarcacionesServiceClient marcacionwebservice ;
         



        [AllowAnonymous]
        public ActionResult CasosAbiertos()
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            List<Ingreso> model;
            model = casosCellService.ListaCasosAbiertosDeCelulaUser(Session["LineaLogeado"].ToString(), Session["AliadoLogeado"].ToString());
            return View(model);
        }

        [AllowAnonymous]
        public ActionResult ConsultaCasos()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult CasosSeguimientos()
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            List<Ingreso> model;
            model = casosCellService.ListaCasosEnSeguimiento( Session["IdUsuario"].ToString());
            return View(model);
        }


        [AllowAnonymous]
        public JsonResult JsonListHistorialCaso(int idIngreso)
        {
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            var result = inboundService.ListaHistorialCaso(idIngreso);
            return new JsonResult
            {   Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }


        [AllowAnonymous]
        public JsonResult JsonDatosClienteYMarcacion(int cuenta, string marcacion)
        {
            inboundService = new WSD.InboundServiceClient();marcacionwebservice = new WSD.MarcacionesServiceClient();
            inboundService.ClientCredentials.Authenticate(); marcacionwebservice.ClientCredentials.Authenticate();
            int idMarcacion = marcacionwebservice.GetIdMarcacionPorNombre(marcacion);
            var result = new {
                         clienteInfo = inboundService.TraerClienteCompletoPorCuenta(cuenta),
                         marcacionInfo = marcacionwebservice.GetMarcacionPorId(idMarcacion)
                           };
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [AllowAnonymous]
        public JsonResult AccesoACaso(int idIngreso)
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            bool result = casosCellService.CasoTomadoPorUsrBackActualizar(idIngreso, Session["IdUsuario"].ToString());
            result = !result;
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [AllowAnonymous]
        public JsonResult LineaLogeado()
        {
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(Session["LineaLogeado"].ToString()),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [AllowAnonymous]
        public JsonResult SubmitDataDepuraCasos(Ingreso ingreso, string observaciones, string aplicaRechazo, string razonRechazo, IngresosSoporte ingresoSoporte, string razonSoporte, string subrazon1Soporte, string subrazon2Soporte)
        {
            try
            {
                ingresoSoporte.Razon = razonSoporte; ingresoSoporte.Subrazon1 = subrazon1Soporte; ingresoSoporte.Subrazon2 = subrazon2Soporte;
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            ingreso.UsuarioApertura = Session["IdUsuario"].ToString(); ingreso.AliadoApertura = Session["AliadoLogeado"].ToString(); ingreso.NombreLineaIngreso = Session["LineaLogeado"].ToString();
                casosCellService.ActualizarIngresoPorCelula(ingreso, aplicaRechazo, razonRechazo, observaciones, ingresoSoporte);
                return new JsonResult
            {
                Data = "Datos guardados",
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
            }catch(Exception e)
            {
                return new JsonResult
                {
                    Data = "Error al guardar los datos con referencia: "+ e.InnerException,
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }

        [AllowAnonymous]
        public JsonResult RazonesSoporteIngresos()
        {
             casosCellService = new WSD.CasosCelulaServiceClient();
             casosCellService.ClientCredentials.Authenticate();
            var result =  casosCellService.ListaRazonesSoporteIngresos();
             return new JsonResult
              {
                    Data = JsonConvert.SerializeObject(result),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
              };

        }



        [AllowAnonymous]
        public JsonResult Subrazones1DeRazonSoporteIngresos(int idRazon)
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            var result = casosCellService.ListaSubrazon1SoporteIngresos(idRazon);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

        [AllowAnonymous]
        public JsonResult Subrazones2DeSubrazonSoporteIngresos(int idSubrazon1)
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            var result = casosCellService.ListaSubrazon2SoporteIngresos(idSubrazon1);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

        [AllowAnonymous]
        public JsonResult InformacionSoporteIngreso(int idIngreso)
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            var result = casosCellService.IngresoSoportePorId(idIngreso);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

    }
}
