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
    public class DistribucionBlendingController : MyController
    {
        WSD.DistribucionBlendingServiceClient distribucionBlendingService;
        WSD.MaestrosServiceClient mastersServices;
        public DistribucionBlendingController()
        {
            distribucionBlendingService = new WSD.DistribucionBlendingServiceClient();
            distribucionBlendingService.ClientCredentials.Authenticate();
            mastersServices = new WSD.MaestrosServiceClient();
            mastersServices.ClientCredentials.Authenticate();
        }
        public ActionResult CableModemFueradeNiveles(string CuentaCliente)
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            GBPFueraNiveles ClienteGestionado = new GBPFueraNiveles();

            if (CuentaCliente == null || CuentaCliente.Equals("")) {
                model.DatosDelCliente = distribucionBlendingService.TraerInformacionCuentaBlending(Convert.ToInt32(Session["IdUsuario"].ToString()), "FUERANIVELES", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString());
                if (model.DatosDelCliente != null)
                    model.FueraNiveles = distribucionBlendingService.TraerInformacionCuentaFueraNiveles(Convert.ToDecimal(model.DatosDelCliente.Cuenta));
            }
            else
            {
               model.DatosDelCliente= distribucionBlendingService.AsignarIdCuentaDistribucionBlending(Convert.ToDecimal(CuentaCliente), "FUERANIVELES", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString(), Convert.ToInt32(Session["IdUsuario"].ToString()));
                if (model.DatosDelCliente != null)

                ClienteGestionado = distribucionBlendingService.TraerDatosCuentaSelectFueraNivel(model.DatosDelCliente.Cuenta);
                if (ClienteGestionado != null)
                {
                    model.FueraNiveles.Cmts = ClienteGestionado.Cmts;
                    model.FueraNiveles.TipoModem = ClienteGestionado.TipoModem;
                    model.FueraNiveles.Prioridad = ClienteGestionado.Prioridad;
                }
                else
                {
                    model.FueraNiveles.Cmts = "CUENTA NO CARGADA";
                    model.FueraNiveles.TipoModem = "CUENTA NO CARGADA";
                    model.FueraNiveles.Prioridad = 1;

                }
                
            }
            if (model.DatosDelCliente == null)
            {
                model.DatosDelCliente = new ClientesTodo();
                model.DatosDelCliente.Cuenta = 0;
                model.DatosDelCliente.Nombre = "NO EXISTEN MAS CUENTAS";
                ViewBag.ValidacionBase = "NO EXISTEN MAS CUENTAS ASIGNADAS PARA ESTA CAMPAÑA";

                ViewBag.CantidadToques = 0;
                ViewBag.Cierre = "";
                ViewBag.Razon = "";

            }
            else
            {
                int DatoContactos = distribucionBlendingService.CantidadToquesCuentaFueraNiveles(model.DatosDelCliente.Cuenta);
                model.UltimoGBLFuera_Niveles = distribucionBlendingService.TraeUltimaGestionCuenta(model.DatosDelCliente.Cuenta);
                ViewBag.ValidacionBase = null;
                ViewBag.CantidadToques = DatoContactos;
                ViewBag.Cierre = model.UltimoGBLFuera_Niveles.Cierre;
                ViewBag.Razon = model.UltimoGBLFuera_Niveles.Razon;
            }
            return View(model);
            
        }
        [HttpPost]
        public ActionResult CableModemFueradeNiveles(ViewModelDistribucionesBlending model)
        {
            model.GBPFueradeNiveles.UsuarioGestion = Session["IdUsuario"].ToString();
            model.GBPFueradeNiveles.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.GBPFueradeNiveles.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.GBPFueradeNiveles.CuentaCliente = model.DatosDelCliente.Cuenta;
            model.GBPFueradeNiveles.NombreCliente = model.DatosDelCliente.Nombre;
            model.GBPFueradeNiveles.ApellidoCliente = model.DatosDelCliente.Apellido;
            model.GBPFueradeNiveles.DirInstalacion = model.DatosDelCliente.DirInstalacion;
            model.GBPFueradeNiveles.DirCorrespondencia = model.DatosDelCliente.DirCorrespondencia;
            model.GBPFueradeNiveles.Telefono1 = model.DatosDelCliente.Telefono1;
            model.GBPFueradeNiveles.Telefono2 = model.DatosDelCliente.Telefono2;
            model.GBPFueradeNiveles.Telefono3 = model.DatosDelCliente.Telefono3;
            model.GBPFueradeNiveles.Movil1 = model.DatosDelCliente.Celular1;
            model.GBPFueradeNiveles.Movil2 = model.DatosDelCliente.Celular2;
            model.GBPFueradeNiveles.MovilPostpago = model.DatosDelCliente.TelefonoConv;
            model.GBPFueradeNiveles.CorreoActual = model.DatosDelCliente.Correo;
            model.GBPFueradeNiveles.EstratoCliente = model.DatosDelCliente.Estrato;
            model.GBPFueradeNiveles.ServiciosActuales = model.DatosDelCliente.Productos;
            model.GBPFueradeNiveles.Nodo = model.DatosDelCliente.Nodo;
            model.GBPFueradeNiveles.NombreComunidad = model.DatosDelCliente.NombreComunidad;
            model.GBPFueradeNiveles.Division = model.DatosDelCliente.Division;
            model.GBPFueradeNiveles.TipoCliente = model.DatosDelCliente.TipoCliente;
            model.GBPFueradeNiveles.DescripcionTPC = model.DatosDelCliente.Descripcion;
            model.GBPFueradeNiveles.Cmts = model.FueraNiveles.Cmts;
            model.GBPFueradeNiveles.TipoModem = model.FueraNiveles.TipoModem;
            model.GBPFueradeNiveles.Prioridad = model.FueraNiveles.Prioridad;
            model.GBPFueradeNiveles.FechaSeguimiento = DateTime.Now;

            var validacion = distribucionBlendingService.ValidarCuentaEnFueraNiveles(model.GBPFueradeNiveles.CuentaCliente);

            if (validacion== true) {
                distribucionBlendingService.ActualizarGestionFueraNiveles(model.GBPFueradeNiveles);
            }
            else {
                distribucionBlendingService.InsertarRegistroFueraNiveles(model.GBPFueradeNiveles);
            }
            DistribucionBlending Registro = new DistribucionBlending();
            Registro.CuentaCliente = model.DatosDelCliente.Cuenta;
            Registro.FormularioDestino = "FUERANIVELES";
            Registro.AliadoDestino = Session["AliadoLogeado"].ToString();
            Registro.OperacionDestino = Session["OperacionBlending"].ToString();
            Registro.CampanaDestino = Session["CampañaBlending"].ToString();
            
            if (model.GBPFueradeNiveles.Cierre=="130"|| model.GBPFueradeNiveles.Cierre == "131" || model.GBPFueradeNiveles.Cierre == "135")
            {
                distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
            }
            else if (model.GBPFueradeNiveles.Cierre == "132" || model.GBPFueradeNiveles.Cierre == "133" || model.GBPFueradeNiveles.Cierre == "134")
            {
                distribucionBlendingService.InsertarCuentaColaDistribucionBlending(Registro);
            }

                return RedirectToAction("CableModemFueradeNiveles"); ;
        }

        public JsonResult TiposDeContactoList(decimal gestion)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeContactoDeGestion(gestion)),
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
       
    }
}