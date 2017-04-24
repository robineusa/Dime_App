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
    public class CasosCelulaController : MyController
    {


        WSD.CasosCelulaServiceClient casosCellService;
        WSD.InboundServiceClient inboundService;
        WSD.MarcacionesServiceClient marcacionwebservice ;
         
        public CasosCelulaController()
        {
            casosCellService = new WSD.CasosCelulaServiceClient();
            casosCellService.ClientCredentials.Authenticate();
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
        }


        public ActionResult CasosAbiertos()
        {          
            List<Ingreso> model;
            model = casosCellService.ListaCasosAbiertosDeCelulaUser(Session["LineaLogeado"].ToString(), Session["AliadoLogeado"].ToString());
            return View(model);
        }


        public JsonResult ConsultaCasosAbiertos()
        {
            var jsonResult = Json(casosCellService.ListaCasosAbiertosDeCelulaUser(Session["LineaLogeado"].ToString(), Session["AliadoLogeado"].ToString()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public ActionResult ConsultaCasos()
        {
            return View();
        }

        public ActionResult CasosSeguimientos()
        {
            List<Ingreso> model;
            model = casosCellService.ListaCasosEnSeguimiento( Session["IdUsuario"].ToString());
            return View(model);
        }



        public JsonResult JsonListHistorialCaso(int idIngreso)
        {
           
            var result = inboundService.ListaHistorialCaso(idIngreso);
            return new JsonResult
            {   Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        public JsonResult JsonDatosClienteYMarcacion(int cuenta, string marcacion)
        {
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

  
        public JsonResult AccesoACaso(int idIngreso)
        {
           
            bool result = casosCellService.CasoTomadoPorUsrBackActualizar(idIngreso, Session["IdUsuario"].ToString());
            result = !result;
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

  
        public JsonResult LineaLogeado()
        {
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(Session["LineaLogeado"].ToString()),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

 
        public JsonResult SubmitDataDepuraCasos(Ingreso ingreso, string observaciones, string aplicaRechazo, string razonRechazo, IngresosSoporte ingresoSoporte, string razonSoporte, string subrazon1Soporte, string subrazon2Soporte)
        {
            try
            {
                ingresoSoporte.Razon = razonSoporte; ingresoSoporte.Subrazon1 = subrazon1Soporte; ingresoSoporte.Subrazon2 = subrazon2Soporte;
            
            ingreso.UsuarioApertura = Session["IdUsuario"].ToString(); ingreso.AliadoApertura = Session["AliadoLogeado"].ToString(); ingreso.NombreLineaIngreso = Session["LineaLogeado"].ToString();
                ingreso.UsuarioUltimaActualizacion = Session["IdUsuario"].ToString();
                casosCellService.ActualizarIngresoPorCelula(ingreso, aplicaRechazo, razonRechazo, observaciones, ingresoSoporte);
                return new JsonResult
            {
                Data = "Datos guardados.",
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
            }catch(Exception e)
            {
                return new JsonResult
                {
                    Data = "Error al guardar los datos, verifique sus casos en seguimiento. "+ e.InnerException,
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }

 
        public JsonResult RazonesSoporteIngresos()
        {
            
            var result =  casosCellService.ListaRazonesSoporteIngresos();
             return new JsonResult
              {
                    Data = JsonConvert.SerializeObject(result),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
              };

        }



        public JsonResult Subrazones1DeRazonSoporteIngresos(int idRazon)
        {
           
            var result = casosCellService.ListaSubrazon1SoporteIngresos(idRazon);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }


        public JsonResult Subrazones2DeSubrazonSoporteIngresos(int idSubrazon1)
        {
            
            var result = casosCellService.ListaSubrazon2SoporteIngresos(idSubrazon1);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

        public JsonResult InformacionSoporteIngreso(int idIngreso)
        {
            
            var result = casosCellService.IngresoSoportePorId(idIngreso);
            if (result == null) result = new IngresosSoporte();

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }

    }
}
