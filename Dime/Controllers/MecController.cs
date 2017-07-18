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
    public class MecController : MyController
    {
        WSD.MecServiceClient MecService;
        WSD.InboundServiceClient inboundService;
        WSD.LoginServiceClient Usuarios;
        public MecController()
        {
            MecService = new WSD.MecServiceClient();
            MecService.ClientCredentials.Authenticate();
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
            Usuarios = new WSD.LoginServiceClient();
            Usuarios.ClientCredentials.Authenticate();
        }

        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundService.TraerClienteCompletoPorCuenta(CuentaCliente)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListaProcesos()
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListaProcesosMec()),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListaLineas(int IdProceso)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListaLineasMec(IdProceso)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListasDistribucion(int IdLinea)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListasCorreosMec(IdLinea)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerListaTiposAlarmas()
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(MecService.ListaTipoAlarmasMec()),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerInformacionUsuarioHolos(decimal Cedula)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(Usuarios.ConsultarUsuarioHolos(Cedula)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

        [HttpGet]
        public ActionResult RegistrarMonitoreo()
        {
            ViewModelMec model = new ViewModelMec();

            return View(model);
        }
        [HttpPost]
        public ActionResult RegistrarMonitoreo(ViewModelMec model)
        {
            model.MecMonitoreosP.UsuarioGestion = Session["IdUsuario"].ToString();
            model.MecMonitoreosP.CedulaUsuarioGestion = Convert.ToDecimal(Session["Usuario"].ToString());
            model.MecMonitoreosP.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            model.MecMonitoreosP.AliadoGestion = Session["AliadoLogeado"].ToString();
            decimal nota = model.MecMonitoreosP.NotaObtenida;
            model.MecMonitoreosP.NotaObtenida = nota;
            MecService.IsertarMonitoreo(model.MecMonitoreosP);
            return RedirectToAction("RegistrarMonitoreo");
        }
        [HttpGet]
        public ActionResult ConsultaMonitoreosAgente()
        {
            return View();
        }
        public JsonResult ConsultaMonitoreosAgenteJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(MecService.ConsultaAgenteMonitoreosPrincipal(FI, FF, Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ActualizarMonitoreo(int IdMonitoreo)
        {
            ViewModelMec modelo = new ViewModelMec();
            modelo.MecMonitoreosP = MecService.ConsultarMonitoreoPorId(IdMonitoreo);

            return View(modelo);
        }

        [HttpPost]
        public ActionResult ActualizarMonitoreo(ViewModelMec model)
        {
            MecMonitoreosP monitoreo = model.MecMonitoreosP;
            monitoreo.IdMonitoreo = model.MecMonitoreosP.IdMonitoreo;
            monitoreo.UsuarioGestion = Session["IdUsuario"].ToString();
            monitoreo.CedulaUsuarioGestion = Convert.ToDecimal(Session["Usuario"].ToString());
            monitoreo.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
            monitoreo.AliadoGestion = Session["AliadoLogeado"].ToString();

            decimal nota = monitoreo.NotaObtenida;
            monitoreo.NotaObtenida = nota;

            MecService.ActualizarMonitoreo(monitoreo);
            return RedirectToAction("ConsultaMonitoreosAgente");

        }
        [HttpGet]
        public ActionResult AdministrarProcesosMec()
        {
            ViewModelMec modelo = new ViewModelMec();
            return View();
        }
        public JsonResult ListaProcesosMecJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(MecService.ListaProcesosMecAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AgregarNuevoProceso(string IdProceso)
        {
            ViewModelMec modelo = new ViewModelMec();


            if (IdProceso == null || IdProceso.Equals(""))
            {
                modelo.MecProcesos = new MecProcesos();
            }
            else
            {
                decimal Id = Convert.ToDecimal(IdProceso);
                modelo.MecProcesos = MecService.ProcesoPorId(Id);
            }
            return View(modelo);
        }
        [HttpPost]
        public ActionResult AgregarNuevoProceso(ViewModelMec modelo)
        {
            if (modelo.MecProcesos.IdProceso > 0)
            {
                MecService.ActualizarMacroproceso(modelo.MecProcesos);
            }
            else { MecService.RegistrarMacroproceso(modelo.MecProcesos); }
            return RedirectToAction("AdministrarProcesosMec");
        }
        [HttpGet]
        public ActionResult AdministrarLineasMec(string IdProceso)
        {
            ViewModelMec modelo = new ViewModelMec();
            modelo.MecProcesos.IdProceso = Convert.ToDecimal(IdProceso);
            return View(modelo);
        }
        public JsonResult ListaLineasPorProcesoJson(string IdProceso)
        {
            int Id = Convert.ToInt32(IdProceso);
            var jsonResult = Json(JsonConvert.SerializeObject(MecService.ListaLineasMecAdmin(Id)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ActualizarLineasMec(string IdProceso, string IdLinea)
        {
            ViewModelMec modelo = new ViewModelMec();
            if (IdLinea == null || IdLinea.Equals(""))
            {
                modelo.MecProcesos.IdProceso = Convert.ToDecimal(IdProceso);
                modelo.MecLineas = new MecLineas();
            }
            else
            {
                modelo.MecProcesos.IdProceso = Convert.ToDecimal(IdProceso);
                modelo.MecLineas = MecService.LineaPorId(Convert.ToDecimal(IdLinea));
            }

            return View(modelo);

        }
        [HttpPost]
        public ActionResult ActualizarLineasMec(ViewModelMec modelo)
        {
            modelo.MecLineas.IdProceso = modelo.MecProcesos.IdProceso;

            if (modelo.MecLineas.IdLinea > 0)
            {
                MecService.ActualizarLinea(modelo.MecLineas);
            }
            else { MecService.RegistrarLinea(modelo.MecLineas); }
            return RedirectToAction("AdministrarLineasMec", "Mec",  new { IdProceso=modelo.MecProcesos.IdProceso } );
        }
        [HttpGet]
        public ActionResult ListasdeDistribucion(string IdLinea, string IdProceso)
        {
            ViewModelMec modelo = new ViewModelMec();
            if (IdLinea == null || IdLinea.Equals(""))
            {
                modelo.MecLineas.IdLinea = Convert.ToDecimal(IdLinea);
                modelo.MecProcesos.IdProceso = Convert.ToDecimal(IdProceso);
                modelo.MecListasDistribucion = new MecListasDistribucion();
            }
            else
            {
                modelo.MecLineas.IdLinea = Convert.ToDecimal(IdLinea);
                modelo.MecProcesos.IdProceso = Convert.ToDecimal(IdProceso);
                modelo.MecListasDistribucion = MecService.ListaCorreosPorId(Convert.ToDecimal(IdLinea));
            }

            return View(modelo);
        }
       [HttpPost]
        public ActionResult ListasdeDistribucion(ViewModelMec modelo)
        {
            modelo.MecListasDistribucion.IdLinea = modelo.MecLineas.IdLinea;

            if (modelo.MecListasDistribucion.IdLista > 0)
            {
                MecService.ActualizarListaDistribucion(modelo.MecListasDistribucion);
            }
            else { MecService.RegistrarListaDistribucion(modelo.MecListasDistribucion); }
            return RedirectToAction("AdministrarLineasMec", "Mec", new { IdProceso = modelo.MecProcesos.IdProceso });

        }
    }
}