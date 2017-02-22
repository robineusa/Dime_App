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
    public class CasosAdminController : MyController
    {

        WSD.CasosAdminServiceClient casosAdminService;
        WSD.CasosCelulaServiceClient casosCelulaService;

      
        [HttpGet]
        public JsonResult GetUsuariosCelula()
        {
            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
            var result = casosAdminService.ListaUsuariosCelulaActual();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        
        [HttpGet]
        public JsonResult GetInfoCaso(string  idIngreso)
        {
            casosCelulaService = new WSD.CasosCelulaServiceClient();
            casosCelulaService.ClientCredentials.Authenticate();
            var result = casosCelulaService.ListaIngresosPorId(idIngreso).FirstOrDefault();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        [HttpPost]
        public JsonResult GuardarCambioIngreso(Ingreso ingreso, string notas, string cambioHecho, string lineaEscalado, string usuarioCambiado, string estadoNuevo )
        {  
            try
            {
                ingreso.NombreLineaEscalado = lineaEscalado;
                ingreso.UsuarioBackoffice = usuarioCambiado;
                ingreso.IdEstado = Convert.ToInt32(estadoNuevo);
                ingreso.UsuarioUltimaActualizacion = Session["IdUsuario"].ToString();
                ingreso.NombreLineaIngreso = Session["LineaLogeado"].ToString();
            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
             casosAdminService.ActualizarIngresoPorAdmin(ingreso, notas, cambioHecho);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject("Actualización realizada"),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
            }catch(Exception e)
            {
                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(e.Message),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }

        }


    }
}