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
    public class MidasController : Controller
    {
        WSD.MidasServiceClient midasService;
        WSD.InboundServiceClient inboundservice;

        public MidasController()
        {
            midasService = new WSD.MidasServiceClient();
            midasService.ClientCredentials.Authenticate();
            inboundservice = new WSD.InboundServiceClient();
            inboundservice.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult Tipificador()
        {
            ViewModelMidas model = new ViewModelMidas();
            return View(model);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Tipificador(ViewModelMidas modelo, string BotonEnvia)
        {
            if (BotonEnvia == "GuardaDatos")
            {
                modelo.GPMMidas.UsuarioGestion = Convert.ToDecimal(Session["Usuario"]);
                modelo.GPMMidas.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
                modelo.GPMMidas.AliadoGestion = Session["AliadoLogeado"].ToString();
                if (modelo.GPMMidas.Cierre == "SEGUIMIENTO")
                    modelo.GPMMidas.EstadoCaso = "SEGUIMIENTO";
                else
                    modelo.GPMMidas.EstadoCaso = "FINALIZADO";

                if (modelo.GPMMidas.Id > 0)
                {
                    midasService.ActualizarMidasTipificador(modelo.GPMMidas);
                    modelo.GPMMidas = new GPMMidas();
                    modelo.ClientesTodo = new ClientesTodo();
                }
                else
                {
                    midasService.RegistrarMidasTipificador(modelo.GPMMidas);
                    modelo.GPMMidas = new GPMMidas();
                    modelo.ClientesTodo = new ClientesTodo();
                }
            }
            return View(modelo);
        }
        [HttpGet]
        public ActionResult AdministrarArboles(string IdPadre, string IdArbol)
        {
            ArbolesMidas modelo = new ArbolesMidas();
            decimal Padre = Convert.ToDecimal(IdPadre);
            decimal Id = Convert.ToDecimal(IdArbol);
            if (Id > 0)
            {
                modelo = midasService.TraerArbolMidasPorId(Id);
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarArboles(ArbolesMidas modelo)
        {
            if (modelo.IdArbol > 0)
            {
                midasService.ActualizarArbolesMidas(modelo);
            }
            else
            {
                midasService.RegistrarNuevoArbolesMidas(modelo);
            }
            return RedirectToAction("ArbolesMidas", "Midas", new { IdPadre = modelo.IdPadre });
        }
        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            CargueBaseMidas cargueBaseMidas = new CargueBaseMidas();
            cargueBaseMidas = midasService.TraeCuentaMidas(Convert.ToDecimal(CuentaCliente));

            if (cargueBaseMidas != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(cargueBaseMidas),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                cargueBaseMidas = new CargueBaseMidas();
                cargueBaseMidas.Id = 0;
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(cargueBaseMidas),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        public JsonResult TraerInformacionClienteClientesTodo(int CuentaCliente)
        {
            ClientesTodo Cliente = new ClientesTodo();
            Cliente = inboundservice.TraerClienteCompletoPorCuenta(CuentaCliente);

            if (Cliente != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(Cliente),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                Cliente = new ClientesTodo();
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(Cliente),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        [HttpGet]
        public ActionResult ArbolesMidas(string IdPadre)
        {
            ArbolesMidas model = new ArbolesMidas();
            model.IdPadre = Convert.ToDecimal(IdPadre);
            return View(model);
        }
        [HttpPost]
        public JsonResult ArbolesDeTipificacionaAdmin(int IdPadre)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(midasService.ListasDeArbolesMidasAdmin(IdPadre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult RetornarPagina(int IdArbol)
        {
            ArbolesMidas Arbol = new ArbolesMidas();
            Arbol = midasService.TraerArbolMidasPorId(IdArbol);
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(Arbol.IdPadre),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult ArbolesDeTipificacionTipificador(int IdPadre)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(midasService.ArbolDeGestionAgenteMidas(IdPadre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult ListaSeguimientosTipificador()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(midasService.TraerSeguimientosTipificador()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaHistorialCuentasTpificador(string CuentaCliente)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(midasService.CargaHistorialCuenta(Convert.ToDecimal(CuentaCliente))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult VerificarCLiente(string CuentaCliente)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(midasService.VerificaCliente(Convert.ToDecimal(CuentaCliente))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}
