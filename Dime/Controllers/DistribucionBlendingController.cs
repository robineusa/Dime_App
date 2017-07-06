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
        //ESTA PARTE ES GLOBAL PARA TODOS LOS PROCESOS DE BLENDING
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
        public JsonResult TiposMotivoList(decimal idCausa)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(mastersServices.ObtenerTiposDeMotivoDeCausas(idCausa)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        //CABLE MODEM FUERA DE NIVELES
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
                ViewBag.ValidacionBase = "NO EXISTEN MAS CUENTAS ASIGNADAS PARA ESTA CAMPAÑA";

                ViewBag.CantidadToques = 0;
                ViewBag.Cierre = "";
                ViewBag.Razon = "";

            }
            else
            {
                int DatoContactos = distribucionBlendingService.CantidadToquesCuentaFueraNiveles(model.DatosDelCliente.Cuenta);
                ViewBag.ValidacionBase = null;
                ViewBag.CantidadToques = DatoContactos;
                model.UltimoGBLFuera_Niveles = distribucionBlendingService.TraeUltimaGestionCuenta(model.DatosDelCliente.Cuenta);
                if (model.UltimoGBLFuera_Niveles != null)
                {
                    ViewBag.Cierre = model.UltimoGBLFuera_Niveles.Cierre;
                    ViewBag.Razon = model.UltimoGBLFuera_Niveles.Razon;
                }
                else
                {
                    ViewBag.Cierre = "SIN GESTION";
                    ViewBag.Razon = "SIN GESTION";
                }
            }
            return View(model);
            
        }

        public JsonResult HistoricoGestionFueraNiveles()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaGestionUsuarioFueraNiveles(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult SeguimientosFueraNiveles()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaSeguimientosUsuarioFueraNiveles(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
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
            

            var validacion = distribucionBlendingService.ValidarCuentaEnFueraNiveles(model.GBPFueradeNiveles.CuentaCliente);

            if (validacion== true) {
                distribucionBlendingService.ActualizarGestionFueraNiveles(model.GBPFueradeNiveles);
            }
            else {
                distribucionBlendingService.InsertarRegistroFueraNiveles(model.GBPFueradeNiveles);
            }
            //genera el registro para insertar o actualizar
            DistribucionBlending Registro = new DistribucionBlending();
            Registro.CuentaCliente = model.DatosDelCliente.Cuenta;
            Registro.FormularioDestino = "FUERANIVELES";
            Registro.AliadoDestino = Session["AliadoLogeado"].ToString();
            Registro.OperacionDestino = Session["OperacionBlending"].ToString();
            Registro.CampanaDestino = Session["CampañaBlending"].ToString();

            int DatoContactos = distribucionBlendingService.CantidadToquesCuentaFueraNiveles(model.DatosDelCliente.Cuenta);

            //elimina la cuenta luego de 3 toques
            if (DatoContactos >= 3)
            {
                distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
            }
            else
            {

                if (model.GBPFueradeNiveles.Cierre == "130" || model.GBPFueradeNiveles.Cierre == "131" || model.GBPFueradeNiveles.Cierre == "132" || model.GBPFueradeNiveles.Cierre == "135")
                {
                    distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
                }
                else if (model.GBPFueradeNiveles.Cierre == "133" || model.GBPFueradeNiveles.Cierre == "134")
                {
                    distribucionBlendingService.InsertarCuentaColaDistribucionBlending(Registro);
                }
            }


            return RedirectToAction("CableModemFueradeNiveles");
        }
        [HttpGet]
        public ActionResult ConsultaAdminFueraNivelesPrincipal()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        [HttpGet]
        public ActionResult ConsultaAdminFueraNivelesLog()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        public JsonResult ConsultaAdminFueraNivelesPrincipalJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminFueraNivelesP(FI,FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaAdminFueraNivelesLogJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminFueraNivelesL(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

       

        //RENTABILIZACION
        [HttpGet]
        public ActionResult Rentabilizacion(string CuentaCliente)
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            GBPRentabilizacion ClienteGestionado = new GBPRentabilizacion();
            

            if (CuentaCliente == null || CuentaCliente.Equals(""))
            {
                model.DatosDelCliente = distribucionBlendingService.TraerInformacionCuentaBlending(Convert.ToInt32(Session["IdUsuario"].ToString()), "RENTABILIZACION", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString());
                if (model.DatosDelCliente != null)
                    model.GBCRentabilizacion = distribucionBlendingService.TraerInformacionCuentaRentabilizacion(Convert.ToDecimal(model.DatosDelCliente.Cuenta));
            }
            else
            {
                model.DatosDelCliente = distribucionBlendingService.AsignarIdCuentaDistribucionBlending(Convert.ToDecimal(CuentaCliente), "RENTABILIZACION", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString(), Convert.ToInt32(Session["IdUsuario"].ToString()));
                if (model.DatosDelCliente != null)

                    ClienteGestionado = distribucionBlendingService.TraerDatosCuentaSelectRentabilizacion(model.DatosDelCliente.Cuenta);
                if (ClienteGestionado != null)
                {
                    model.GBCRentabilizacion.CuentaCiente = ClienteGestionado.CuentaCliente;
                    model.GBCRentabilizacion.ConsumosPpv = ClienteGestionado.ConsumosPpv;
                    model.GBCRentabilizacion.UltimaPpv = ClienteGestionado.UltimaPpv;
                    model.GBCRentabilizacion.SiembraHd = ClienteGestionado.SiembraHd;
                    model.GBCRentabilizacion.SiembraVoz = ClienteGestionado.SiembraVoz;
                    model.GBCRentabilizacion.BindajeInternet = ClienteGestionado.BlindajeInternet;
                    model.GBCRentabilizacion.UltimaMarcacion = ClienteGestionado.UltimaMarcacion;
                    model.GBCRentabilizacion.Ofrecimiento1 = ClienteGestionado.OfrecimientoAceptado;
                    
                }
                else
                {
                    model.GBCRentabilizacion.CuentaCiente = 0;
                    model.GBCRentabilizacion.ConsumosPpv = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.UltimaPpv = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.SiembraHd = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.SiembraVoz = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.BindajeInternet = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.UltimaMarcacion = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.Ofrecimiento1 = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.Ofrecimiento2 = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.Ofrecimiento3 = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.Campana1 = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.Campana2 = "NO EXISTE INFORMACION";
                    model.GBCRentabilizacion.Campana2 = "NO EXISTE INFORMACION";
                }

            }
            if (model.DatosDelCliente == null)
            {
                model.DatosDelCliente = new ClientesTodo();
                model.DatosDelCliente.Cuenta = 0;
                ViewBag.ValidacionBase = "NO EXISTEN MAS CUENTAS ASIGNADAS PARA ESTA CAMPAÑA";

                ViewBag.CantidadToques = 0;
                ViewBag.Cierre = "";
                ViewBag.Razon = "";

            }
            else
            {
                int DatoContactos = distribucionBlendingService.CantidadToquesCuentaRentabilizacion(model.DatosDelCliente.Cuenta);
                ViewBag.ValidacionBase = null;
                ViewBag.CantidadToques = DatoContactos;
                model.UltimoGBLRentabilizacion = distribucionBlendingService.TraeUltimaGestionCuentaRentabilizacion(model.DatosDelCliente.Cuenta);
                if (model.UltimoGBLRentabilizacion != null)
                {
                    ViewBag.Cierre = model.UltimoGBLRentabilizacion.Cierre;
                    ViewBag.Razon = model.UltimoGBLRentabilizacion.Causa;
                }
                else
                {
                    ViewBag.Cierre = "SIN GESTION";
                    ViewBag.Razon = "SIN GESTION";
                }
                
            }
            if (model.GBCRentabilizacion.Campana1 != null){ ViewBag.Campana1 = model.GBCRentabilizacion.Campana1; }
            else{ViewBag.Campana1 = "SIN INFORMACION";}
            if (model.GBCRentabilizacion.Campana2 != null) { ViewBag.Campana2 = model.GBCRentabilizacion.Campana2; }
            else { ViewBag.Campana2 = "SIN INFORMACION"; }
            if (model.GBCRentabilizacion.Campana3 != null) { ViewBag.Campana3 = model.GBCRentabilizacion.Campana3; }
            else { ViewBag.Campana3 = "SIN INFORMACION"; }

            return View(model);
            
        }

        public JsonResult HistoricoGestionRentabilizacion()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaGestionUsuarioRentabilizacion(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult SeguimientosRentabilizacion()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaSeguimientosUsuarioRentabilizacion(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpPost]
        public ActionResult Rentabilizacion(ViewModelDistribucionesBlending model)
        {
            model.GBPRentabilizacion.UsuarioGestion = Session["IdUsuario"].ToString();
            model.GBPRentabilizacion.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.GBPRentabilizacion.OperacionGestion = Session["OperacionBlending"].ToString();
            model.GBPRentabilizacion.CuentaCliente = model.DatosDelCliente.Cuenta;
            model.GBPRentabilizacion.ConsumosPpv = model.GBCRentabilizacion.ConsumosPpv;
            model.GBPRentabilizacion.UltimaPpv = model.GBCRentabilizacion.UltimaPpv;
            model.GBPRentabilizacion.SiembraHd = model.GBCRentabilizacion.SiembraHd;
            model.GBPRentabilizacion.SiembraVoz = model.GBCRentabilizacion.SiembraVoz;
            model.GBPRentabilizacion.BlindajeInternet = model.GBCRentabilizacion.BindajeInternet;
            model.GBPRentabilizacion.UltimaMarcacion = model.GBCRentabilizacion.UltimaMarcacion;
           

            var validacion = distribucionBlendingService.ValidarCuentaEnRentabilizacion(model.GBPRentabilizacion.CuentaCliente);

            if (validacion == true)
            {
                distribucionBlendingService.ActualizarGestionRentabilizacion(model.GBPRentabilizacion);
            }
            else
            {
                distribucionBlendingService.InsertarRegistroRentabilizacion(model.GBPRentabilizacion);
            }

            //inserta o elimina el registro de las pilas y colas

            DistribucionBlending Registro = new DistribucionBlending();
            Registro.CuentaCliente = model.DatosDelCliente.Cuenta;
            Registro.FormularioDestino = "RENTABILIZACION";
            Registro.AliadoDestino = Session["AliadoLogeado"].ToString();
            Registro.OperacionDestino = Session["OperacionBlending"].ToString();
            Registro.CampanaDestino = Session["CampañaBlending"].ToString();
            
            int DatoContactos = distribucionBlendingService.CantidadToquesCuentaRentabilizacion(model.DatosDelCliente.Cuenta);

            if (DatoContactos >= 3) {
                distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
            }
            else
            {

                if (model.GBPRentabilizacion.Cierre == "89" || model.GBPRentabilizacion.Cierre == "90" || model.GBPRentabilizacion.Cierre == "91"  || model.GBPRentabilizacion.Cierre == "94")
                {
                    distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
                }
                else if (model.GBPRentabilizacion.Cierre == "92" || model.GBPRentabilizacion.Cierre == "93")
                {
                    distribucionBlendingService.InsertarCuentaColaDistribucionBlending(Registro);
                }
            }
            return RedirectToAction("Rentabilizacion");
        }
        [HttpGet]
        public ActionResult ConsultaAdminRentabilizacionPrincipal()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        [HttpGet]
        public ActionResult ConsultaAdminRentabilizacionLog()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        public JsonResult ConsultaAdminRentabilizacionPrincipalJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminRentabilizacionP(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaAdminRentabilizacionLogJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminRentabilizacionL(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }



        //PRODUCTO
        [HttpGet]
        public ActionResult Producto(string CuentaCliente)
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            GBPProducto ClienteGestionado = new GBPProducto();


            if (CuentaCliente == null || CuentaCliente.Equals(""))
            {
                model.DatosDelCliente = distribucionBlendingService.TraerInformacionCuentaBlending(Convert.ToInt32(Session["IdUsuario"].ToString()), "PRODUCTO", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString());
                if (model.DatosDelCliente != null)
                    model.GBCProducto = distribucionBlendingService.TraerInformacionCuentaProducto(Convert.ToDecimal(model.DatosDelCliente.Cuenta));
            }
            else
            {
                model.DatosDelCliente = distribucionBlendingService.AsignarIdCuentaDistribucionBlending(Convert.ToDecimal(CuentaCliente), "PRODUCTO", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString(), Convert.ToInt32(Session["IdUsuario"].ToString()));
                if (model.DatosDelCliente != null)

                    ClienteGestionado = distribucionBlendingService.TraerDatosCuentaSelectProducto(model.DatosDelCliente.Cuenta);
                if (ClienteGestionado != null)
                {
                    model.GBCProducto.CuentaCliente = ClienteGestionado.CuentaCliente;
                    
                }
                else
                {
                    model.GBCProducto.CuentaCliente = 0;
                   
                }

            }
            if (model.DatosDelCliente == null)
            {
                model.DatosDelCliente = new ClientesTodo();
                model.DatosDelCliente.Cuenta = 0;
                ViewBag.ValidacionBase = "NO EXISTEN MAS CUENTAS ASIGNADAS PARA ESTA CAMPAÑA";

                ViewBag.CantidadToques = 0;
                ViewBag.Cierre = "";
                ViewBag.Razon = "";

            }
            else
            {
                int DatoContactos = distribucionBlendingService.CantidadToquesCuentaProducto(model.DatosDelCliente.Cuenta);
                ViewBag.ValidacionBase = null;
                ViewBag.CantidadToques = DatoContactos;
                model.UltimoGBLProducto = distribucionBlendingService.TraeUltimaGestionCuentaProducto(model.DatosDelCliente.Cuenta);
                if (model.UltimoGBLProducto != null)
                {
                    ViewBag.Cierre = model.UltimoGBLProducto.Cierre;
                    ViewBag.Razon = model.UltimoGBLProducto.Causa;
                }
                else
                {
                    ViewBag.Cierre = "SIN GESTION";
                    ViewBag.Razon = "SIN GESTION";
                }
            }
            return View(model);

        }

        public JsonResult HistoricoGestionProducto()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaGestionUsuarioProucto(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult SeguimientosProducto()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaSeguimientosUsuarioProducto(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpPost]
        public ActionResult Producto(ViewModelDistribucionesBlending model)
        {
            model.GBPProducto.UsuarioGestion = Session["IdUsuario"].ToString();
            model.GBPProducto.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.GBPProducto.OperacionGestion = Session["OperacionBlending"].ToString();
            model.GBPProducto.CampanaGestion = Session["CampañaBlending"].ToString();
            model.GBPProducto.CuentaCliente = model.DatosDelCliente.Cuenta;
            model.GBPProducto.NombreUsuarioGestion= Session["NombreUsuario"].ToString();
            var validacion = distribucionBlendingService.ValidarCuentaEnProducto(model.GBPProducto.CuentaCliente);

            if (validacion == true)
            {
                distribucionBlendingService.ActualizarGestionProducto(model.GBPProducto);
            }
            else
            {
                distribucionBlendingService.InsertarRegistroProducto(model.GBPProducto);
            }

            //inserta o elimina registro de las pilas y colas
            DistribucionBlending Registro = new DistribucionBlending();
            Registro.CuentaCliente = model.DatosDelCliente.Cuenta;
            Registro.FormularioDestino = "PRODUCTO";
            Registro.AliadoDestino = Session["AliadoLogeado"].ToString();
            Registro.OperacionDestino = Session["OperacionBlending"].ToString();
            Registro.CampanaDestino = Session["CampañaBlending"].ToString();

            int DatoContactos = distribucionBlendingService.CantidadToquesCuentaProducto(model.DatosDelCliente.Cuenta);

            if (DatoContactos >= 3)
            {
                distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
            }
            else
            {

                if (model.GBPProducto.Cierre == "136" || model.GBPProducto.Cierre == "137" || model.GBPProducto.Cierre == "138" || model.GBPProducto.Cierre == "141")
                {
                    distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
                }
                else if (model.GBPProducto.Cierre == "139" || model.GBPProducto.Cierre == "140")
                {
                    distribucionBlendingService.InsertarCuentaColaDistribucionBlending(Registro);
                }
            }
            return RedirectToAction("Producto");
        }
        [HttpGet]
        public ActionResult ConsultaAdminProductoPrincipal()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        [HttpGet]
        public ActionResult ConsultaAdminProductoLog()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        public JsonResult ConsultaAdminProductoPrincipalJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminProductoP(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaAdminProductoLogJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminProductoL(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }


        //DOCSIS Y OVERLAP
        [HttpGet]
        public ActionResult Docsis(string CuentaCliente)
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            GBPDocsis ClienteGestionado = new GBPDocsis();


            if (CuentaCliente == null || CuentaCliente.Equals(""))
            {
                model.DatosDelCliente = distribucionBlendingService.TraerInformacionCuentaBlending(Convert.ToInt32(Session["IdUsuario"].ToString()), "DOCSIS", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString());
                if (model.DatosDelCliente != null)
                    model.GBCDocsis = distribucionBlendingService.TraerInformacionCuentaDocsis(Convert.ToDecimal(model.DatosDelCliente.Cuenta));
            }
            else
            {
                model.DatosDelCliente = distribucionBlendingService.AsignarIdCuentaDistribucionBlending(Convert.ToDecimal(CuentaCliente), "DOCSIS", Session["AliadoLogeado"].ToString(), Session["OperacionBlending"].ToString(), Session["CampañaBlending"].ToString(), Convert.ToInt32(Session["IdUsuario"].ToString()));
                if (model.DatosDelCliente != null)

                    ClienteGestionado = distribucionBlendingService.TraerDatosCuentaSelectDocsis(model.DatosDelCliente.Cuenta);
                if (ClienteGestionado != null)
                {
                    model.GBCDocsis.CuentaCliente = ClienteGestionado.CuentaCliente;
                    model.GBCDocsis.Aliado = ClienteGestionado.Aliado;

                }
                else
                {
                    model.GBCDocsis.CuentaCliente = 0;
                    model.GBCDocsis.Aliado = "SIN INFORMACION";

                }

            }
            if (model.DatosDelCliente == null)
            {
                model.DatosDelCliente = new ClientesTodo();
                model.DatosDelCliente.Cuenta = 0;
                ViewBag.ValidacionBase = "NO EXISTEN MAS CUENTAS ASIGNADAS PARA ESTA CAMPAÑA";

                ViewBag.CantidadToques = 0;
                ViewBag.Cierre = "";
                ViewBag.Razon = "";

            }
            else
            {
                int DatoContactos = distribucionBlendingService.CantidadToquesCuentaDocsis(model.DatosDelCliente.Cuenta);
                ViewBag.ValidacionBase = null;
                ViewBag.CantidadToques = DatoContactos;
                model.UltimoGBLDocsis = distribucionBlendingService.TraeUltimaGestionCuentaDocsis(model.DatosDelCliente.Cuenta);
                if (model.UltimoGBLDocsis != null)
                {
                    ViewBag.Cierre = model.UltimoGBLDocsis.Cierre;
                    ViewBag.Razon = model.UltimoGBLDocsis.Razon;
                }
                else
                {
                    ViewBag.Cierre = "SIN GESTION";
                    ViewBag.Razon = "SIN GESTION";
                }
            }
            return View(model);

        }

        public JsonResult HistoricoGestionDocsis()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaGestionUsuarioDocsis(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult SeguimientosDocsis()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.TraeListaSeguimientosUsuarioDocsis(Session["IdUsuario"].ToString())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpPost]
        public ActionResult Docsis(ViewModelDistribucionesBlending model)
        {
            model.GBPDocsis.UsuarioGestion = Session["IdUsuario"].ToString();
            model.GBPDocsis.AliadoGestion = Session["AliadoLogeado"].ToString();
            model.GBPDocsis.OperacionGestion = Session["OperacionBlending"].ToString();
            model.GBPDocsis.CampanaGestion = Session["CampañaBlending"].ToString();
            model.GBPDocsis.CuentaCliente = model.DatosDelCliente.Cuenta;
            model.GBPDocsis.Aliado = model.GBCDocsis.Aliado;
            model.GBPDocsis.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            var validacion = distribucionBlendingService.ValidarCuentaEnDocsis(model.GBPDocsis.CuentaCliente);

            if (validacion == true)
            {
                distribucionBlendingService.ActualizarGestionDocsis(model.GBPDocsis);
            }
            else
            {
                distribucionBlendingService.InsertarRegistroDocsis(model.GBPDocsis);
            }

            //inserta o elimina registro de las pilas y colas
            DistribucionBlending Registro = new DistribucionBlending();
            Registro.CuentaCliente = model.DatosDelCliente.Cuenta;
            Registro.FormularioDestino = "DOCSIS";
            Registro.AliadoDestino = Session["AliadoLogeado"].ToString();
            Registro.OperacionDestino = Session["OperacionBlending"].ToString();
            Registro.CampanaDestino = Session["CampañaBlending"].ToString();

            int DatoContactos = distribucionBlendingService.CantidadToquesCuentaDocsis(model.DatosDelCliente.Cuenta);

            if (DatoContactos >= 3)
            {
                distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
            }
            else
            {

                if (model.GBPDocsis.Cierre == "95" || model.GBPDocsis.Cierre == "96" || model.GBPDocsis.Cierre == "97" || model.GBPDocsis.Cierre == "100")
                {
                    distribucionBlendingService.EliminaCuentaGestionadaDistribucion(Registro);
                }
                else if (model.GBPDocsis.Cierre == "98" || model.GBPDocsis.Cierre == "99")
                {
                    distribucionBlendingService.InsertarCuentaColaDistribucionBlending(Registro);
                }
            }
            return RedirectToAction("Docsis");

        }
        [HttpGet]
        public ActionResult ConsultaAdminDocsisPrincipal()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        [HttpGet]
        public ActionResult ConsultaAdminDocsisLog()
        {
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            return View(model);
        }
        public JsonResult ConsultaAdminDocsisPrincipalJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminDocsisP(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultaAdminDocsisLogJson(string fechaInicial, string fechaFinal)
        {
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            var jsonResult = Json(JsonConvert.SerializeObject(distribucionBlendingService.ConsultaAdminDocsisL(FI, FF)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}