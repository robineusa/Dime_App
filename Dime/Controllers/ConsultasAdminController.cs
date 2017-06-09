using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
using System.Web.UI.WebControls;
using Telmexla.Servicios.DIME.Business;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ConsultasAdminController : MyController
    {

        WSD.CasosAdminServiceClient casosAdminService;
        WSD.BlendingServiceClient blendingService;

        public ConsultasAdminController()
        {
            casosAdminService = new WSD.CasosAdminServiceClient();
            casosAdminService.ClientCredentials.Authenticate();
            blendingService = new WSD.BlendingServiceClient();
            blendingService.ClientCredentials.Authenticate();
        }
        public ActionResult Paloteo()
        {
            return View();
        }


        public JsonResult PaloteoConsulta(string fechaInicial, string fechaFinal)
        {
            List<DatoConsultaPaloteo> modelo = new List<DatoConsultaPaloteo>();
            var jsonResult = Json(JsonConvert.SerializeObject(casosAdminService.ListaPaloteo(fechaInicial, fechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }



        public ActionResult ConsultasBlending()
        {
            return View();
        }



         public JsonResult JsonConvenioElectronico(string fechaInicio, string fechaFin)
        {
            
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(blendingService.ListaConveniosElectronicosGestionados(inicial, final)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
                
            };            
        }


        public JsonResult JsonClaroVideo(string fechaInicio, string fechaFin)
        {
            
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaClaroVideosGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior= JsonRequestBehavior.AllowGet

            };
        }


        public JsonResult JsonDocsisOverlap(string fechaInicio, string fechaFin)
        {
         
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaDocsisOverlapGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public JsonResult JsonCierreCiclo(string fechaInicio, string fechaFin)
        {
            
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            var result = blendingService.ListaCierresCicloGestionados(inicial, final);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

   
        public JsonResult JsonListaGestionAdmin(string fechaInicio, string fechaFin, string aliado)
        {
           
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);

            List<DatoConsultaGestionAdmin> modelo = new List<DatoConsultaGestionAdmin>();
            var result = casosAdminService.ListaGestionAdmin(inicial, final, aliado);
            var jsonResult = Json(JsonConvert.SerializeObject(result), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public ActionResult ExportExcelGestionAdmin(string fechaInicio, string fechaFin, string aliado)
        {
            DateTime inicial = DateTime.ParseExact(fechaInicio, "M/d/yyyy", CultureInfo.InvariantCulture);
            DateTime final = DateTime.ParseExact(fechaFin, "M/d/yyyy", CultureInfo.InvariantCulture);
            GridView gv = new GridView();
            var resultBefore = casosAdminService.ListaGestionAdmin(inicial, final, aliado);
            List<DatoConsultaGestionAdmin> listaResult = new List<DatoConsultaGestionAdmin>();
            foreach (var item in resultBefore)
            {
                DatoConsultaGestionAdmin nuevoDato = new DatoConsultaGestionAdmin();
                nuevoDato.AliadoApertura = item.AliadoApertura;
                nuevoDato.CuentaCliente = item.CuentaCliente;
                //nuevoDato.FechaApertura = Convert.ToDateTime(item.FechaApertura).Date.ToString();
                //nuevoDato.FechaCierre = Convert.ToDateTime(item.FechaCierre).Date.ToString();
                //nuevoDato.FechaNota = Convert.ToDateTime(item.FechaNota).Date.ToString();
                //nuevoDato.FechaUltimaActualizacion = Convert.ToDateTime(item.FechaUltimaActualizacion).Date.ToString();
                nuevoDato.HoraApertura = item.HoraApertura;
                nuevoDato.HoraUltimaActualizacion =item.HoraUltimaActualizacion;
                nuevoDato.IdEstado = item.IdEstado;
                nuevoDato.IdIngreso = item.IdIngreso;
                nuevoDato.Macroproceso = item.Macroproceso;
                nuevoDato.Marcacion = item.Marcacion;
                nuevoDato.NombreLineaEscalado = item.NombreLineaEscalado;
                nuevoDato.NombreLineaIngreso = item.NombreLineaIngreso;
                nuevoDato.Nota = item.Nota;
                nuevoDato.Ticket = item.Ticket;
                nuevoDato.Usuario = item.Usuario;
                nuevoDato.UsuarioApertura = item.UsuarioApertura;
                nuevoDato.UsuarioCierre = item.UsuarioCierre;
                nuevoDato.UsuarioUltimaActualizacion = item.UsuarioUltimaActualizacion;
                    //if (item.IdEstado == 1)
                    //{
                    //nuevoDato.Estado = "ABIERTO";
                    //}
                    //else
                    //{
                    //    if (item.IdEstado == 2)
                    //    nuevoDato.Estado = "CERRADO";
                    //    else
                    //    if (item.IdEstado == 3)
                    //        nuevoDato.Estado = "SEGUIMIENTO";
                    //}



                listaResult.Add(nuevoDato);
            }

            gv.DataSource = listaResult;
            gv.DataBind();
            Response.ClearContent();
            Response.Buffer = true;
            Response.AddHeader("content-disposition", "attachment; filename=Marklist.xls");
            Response.ContentType = "application/ms-excel";
            Response.Charset = "";
            StringWriter sw = new StringWriter();
            HtmlTextWriter htw = new HtmlTextWriter(sw);
            gv.RenderControl(htw);
            Response.Output.Write(sw.ToString());
            Response.Flush();
            Response.End();
            return View("ExportExcelView", "Consultas");
        }



        public JsonResult JsonAliadosNames()
        {
           
            var aliadosList = casosAdminService.ListaAliadosActualesDeHolos();
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(aliadosList),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

        }
    }
}