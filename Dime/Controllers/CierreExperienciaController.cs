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
    public class CierreExperienciaController : Controller
    {
        WSD.CierreExperienciaServiceClient CierreService;
        WSD.InboundServiceClient inboundservice;

        public CierreExperienciaController()
        {
            CierreService = new WSD.CierreExperienciaServiceClient();
            CierreService.ClientCredentials.Authenticate();
            inboundservice = new WSD.InboundServiceClient();
            inboundservice.ClientCredentials.Authenticate();
        }
        public ActionResult Desconexiones(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            ViewBag.Asignacion = null;
            if (IdGestion == null || IdGestion.Equals(""))
            {
                modelo.CEPAsigDesconexiones = CierreService.TraeRegistroAsignacion(1);
                if (modelo.CEPAsigDesconexiones != null)
                {
                    modelo.CEPDesconexiones.CanalDeIngreso = modelo.CEPAsigDesconexiones.CanalDeIngreso;
                    modelo.CEPDesconexiones.CuentaCliente = modelo.CEPAsigDesconexiones.CuentaCliente;
                    modelo.CEPDesconexiones.MotivoDeDesconexion = modelo.CEPAsigDesconexiones.MotivoDeDesconexion;
                    modelo.CEPDesconexiones.Codigo = modelo.CEPAsigDesconexiones.Codigo;
                    modelo.CEPDesconexiones.Nota1 = modelo.CEPAsigDesconexiones.Nota1;
                    modelo.CEPDesconexiones.Nota2 = modelo.CEPAsigDesconexiones.Nota2;
                    modelo.CEPDesconexiones.Nota3 = modelo.CEPAsigDesconexiones.Nota3;
                    modelo.CEPDesconexiones.Nota4 = modelo.CEPAsigDesconexiones.Nota4;
                    modelo.CEPDesconexiones.Nota5 = modelo.CEPAsigDesconexiones.Nota5;
                    modelo.CEPDesconexiones.Red = modelo.CEPAsigDesconexiones.Red;
                    modelo.CEPDesconexiones.Servicios = modelo.CEPAsigDesconexiones.Servicios;
                    modelo.CEPDesconexiones.FechaDeSolicitud = modelo.CEPAsigDesconexiones.FechaDeSolicitud;
                    modelo.CEPDesconexiones.FechaDeCorte = modelo.CEPAsigDesconexiones.FechaDeCorte;
                    modelo.CEPDesconexiones.FechaDePreaviso = modelo.CEPAsigDesconexiones.FechaDePreaviso;
                    modelo.CEPDesconexiones.DiaDeDesconexion = modelo.CEPAsigDesconexiones.DiaDeDesconexion;
                    modelo.CEPDesconexiones.TarifaAnterior = modelo.CEPAsigDesconexiones.TarifaAnterior;
                    modelo.CEPDesconexiones.FechaDeAsignacion = modelo.CEPAsigDesconexiones.FechaDeAsignacion;
                    
                }
                else
                {
                    ViewBag.Asignacion = "No Existen Mas Registros Cargados";
                }
            }
            else
            {
                modelo.CEPDesconexiones = CierreService.TraeDesconexionPorId(Convert.ToDecimal(IdGestion));
            }
            return View(modelo);
        }
    }
}