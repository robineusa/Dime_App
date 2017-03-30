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
    [ExpiringFilter]
    public class TrasladosController : MyController
    {
        WSD.TrasladosServiceClient trasladowebservice;
        WSD.MaestroNodoServiceClient maestronodosservice;

        // GET: Traslados
        [HttpGet]
        public ActionResult SolicitudCrearDireccion()
        {
            Session["FechaInicial"] = DateTime.Now;
            return View();
        }
        [HttpPost]
        public ActionResult SolicitudCrearDireccion(ViewModelTraslados modelo)
        {
            //servicio maestro nodos
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();

            //servicio ingreso traslados
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now; 
            
            modelo.IngresoTraslado.UsuarioApertura = Session["Usuario"].ToString(); modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();

            modelo.IngresoTraslado.NombreLineaIngreso = Session["LineaLogeado"].ToString(); modelo.IngresoTraslado.AliadoApertura = Session["AliadoLogeado"].ToString();


            if (trasladowebservice.ExisteCuentaEscalada(modelo.IngresoTraslado.CuentaCliente) == false)
            {
                if (maestronodosservice.ExisteNodo(modelo.NotaTraslado.Nodo) == true)
                {


                    if (ModelState.IsValid == true)
                    {
                        if (modelo.NotaTraslado.Observacion == null || modelo.NotaTraslado.Observacion == "") { modelo.NotaTraslado.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else {  modelo.NotaTraslado.Observacion = modelo.NotaTraslado.Observacion.ToUpper(); }
                        modelo.NotaTraslado.DireccionACrear = modelo.NotaTraslado.DireccionACrear.ToUpper();
                        modelo.NotaTraslado.Nodo = modelo.NotaTraslado.Nodo.ToUpper();

                        //datos de transaccion
                        modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
                        modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
                        modelo.TraficoTraslados.TipoTransaccion = "CREACION DE DIRECCION";
                        modelo.TraficoTraslados.CanalTransaccion = "SOLICITUD INBOUND";
                        //fin de transaccion

                        trasladowebservice.RegistrarIngresoTraslado(modelo.IngresoTraslado, modelo.NotaTraslado, modelo.TraficoTraslados);
                        Session.Remove("FechaInicial");
                        return RedirectToAction("SolicitudCrearDireccion");
                    }
                    }
                else
                {
                    ViewBag.NodoRepetidoError = "El nodo que ingreso no existe, por favor verifíquelo, o solicite su creación";
                }
            }
            else
            {
                ViewBag.CuentayaescaladaError = "La cuenta ingresada ya tiene un escalamiento pendiente para dar respuesta, verifique las solicitudes asociadas a esta cuenta.";
            }
            return View(modelo);
        }

        public ActionResult DireccionesCreadasTraslados()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSolicitudesCrearDireccion(Session["Usuario"].ToString());
            return View(modelo);
        }

        [HttpGet]
        public ActionResult GestionarDireccionCelula(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionEnGestion(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("DireccionesCreadasTraslados");
            }

            Session["FechaInicial"] = DateTime.Now;


            var notasTraslado = trasladowebservice.ListaInteraccionesCrearDireccion(Convert.ToInt32(id));
            model.ListaNotasCrearDireccion = notasTraslado.Select(x => new NotasTraslado
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                CuentaCliente = x.CuentaCliente,
                DireccionACrear = x.DireccionACrear,
                Estrato = x.Estrato,
                Nodo = x.Nodo,
                TelefonoCelular = x.TelefonoCelular,
                TelefonoFijo = x.TelefonoFijo,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion
            }).ToList();

            decimal maxId = model.ListaNotasCrearDireccion.Max(c => c.Id);
            decimal minId = model.ListaNotasCrearDireccion.Min(c => c.Id);


            model.NotaTraslado = model.ListaNotasCrearDireccion.Find(c => c.Id == maxId);
            model.NotaTrasladoInicial = model.ListaNotasCrearDireccion.Find(c => c.Id == minId);
            string nodo = model.NotaTrasladoInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }

        [HttpPost]
        public ActionResult GestionarDireccionCelula(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            modelo.NotaTrasladoVacia.IdTransaccion = modelo.NotaTrasladoInicial.IdTransaccion;
            modelo.NotaTrasladoVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.NotaTrasladoVacia.CanalTransaccion = "CELULA CREACION DIRECCION";
            modelo.NotaTrasladoVacia.FechaTransaccion = DateTime.Now;
            modelo.NotaTrasladoVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.NotaTrasladoVacia.CuentaCliente = modelo.NotaTrasladoInicial.CuentaCliente;
            modelo.NotaTrasladoVacia.DireccionACrear = modelo.NotaTrasladoInicial.DireccionACrear;
            modelo.NotaTrasladoVacia.Estrato = modelo.NotaTrasladoInicial.Estrato;
            modelo.NotaTrasladoVacia.Nodo = modelo.NotaTrasladoInicial.Nodo;
            modelo.NotaTrasladoVacia.TelefonoCelular = modelo.NotaTrasladoInicial.TelefonoCelular;
            modelo.NotaTrasladoVacia.TelefonoFijo = modelo.NotaTrasladoInicial.TelefonoFijo;
            modelo.NotaTrasladoVacia.Razon = "GESTION BACKOFFICE";
            modelo.NotaTrasladoVacia.UsuarioBackOffice = Session["Usuario"].ToString();
            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.NotaTrasladoInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.NotaTrasladoVacia.EstadoTransaccion;

            if (modelo.NotaTrasladoVacia.Observacion==null || modelo.NotaTrasladoVacia.Observacion == ""){ modelo.NotaTrasladoVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.NotaTrasladoVacia.Observacion = modelo.NotaTrasladoVacia.Observacion.ToUpper(); }


            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "CREACION DE DIRECCION";
            modelo.TraficoTraslados.CanalTransaccion = "CELULA CREACION DIRECCION";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudCrearDireccion(modelo.IngresoTraslado, modelo.NotaTrasladoVacia,modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("DireccionesCreadasTraslados");

        }
    
        public ActionResult SeguimientosSolicitudesCreacionDireccion()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosDireccionesCelula(Session["Usuario"].ToString());
            return View(modelo);
        }
      
        [HttpGet]
        public ActionResult DireccionesCreadasOutbound()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaDireccionesCreadasOutbound(Session["Usuario"].ToString());
            return View(modelo);

        }
       
        [HttpGet]
        public ActionResult GestionarDireccionOutbound(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionEnGestionOut(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("DireccionesCreadasOutbound");
            }

            Session["FechaInicial"] = DateTime.Now;

            var notasTraslado = trasladowebservice.ListaInteraccionesCrearDireccion(Convert.ToInt32(id));
            model.ListaNotasCrearDireccion = notasTraslado.Select(x => new NotasTraslado
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                CuentaCliente = x.CuentaCliente,
                DireccionACrear = x.DireccionACrear,
                Estrato = x.Estrato,
                Nodo = x.Nodo,
                TelefonoCelular = x.TelefonoCelular,
                TelefonoFijo = x.TelefonoFijo,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion
            }).ToList();

            decimal maxId = model.ListaNotasCrearDireccion.Max(c => c.Id);
            decimal minId = model.ListaNotasCrearDireccion.Min(c => c.Id);


            model.NotaTraslado = model.ListaNotasCrearDireccion.Find(c => c.Id == maxId);
            model.NotaTrasladoInicial = model.ListaNotasCrearDireccion.Find(c => c.Id == minId);
            string nodo = model.NotaTrasladoInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }
       
        [HttpPost]
        public ActionResult GestionarDireccionOutbound(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();

            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            modelo.NotaTrasladoVacia.IdTransaccion = modelo.NotaTrasladoInicial.IdTransaccion;
            modelo.NotaTrasladoVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.NotaTrasladoVacia.CanalTransaccion = "OUTBOUND CREACION DIRECCION";
            modelo.NotaTrasladoVacia.FechaTransaccion = DateTime.Now;
            modelo.NotaTrasladoVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.NotaTrasladoVacia.CuentaCliente = modelo.NotaTrasladoInicial.CuentaCliente;
            modelo.NotaTrasladoVacia.DireccionACrear = modelo.NotaTrasladoInicial.DireccionACrear;
            modelo.NotaTrasladoVacia.Estrato = modelo.NotaTrasladoInicial.Estrato;
            modelo.NotaTrasladoVacia.Nodo = modelo.NotaTrasladoInicial.Nodo;
            modelo.NotaTrasladoVacia.TelefonoCelular = modelo.NotaTrasladoInicial.TelefonoCelular;
            modelo.NotaTrasladoVacia.TelefonoFijo = modelo.NotaTrasladoInicial.TelefonoFijo;
            modelo.NotaTrasladoVacia.Razon = "GESTION OUTBOUND";
            modelo.NotaTrasladoVacia.UsuarioBackOutbound = Session["Usuario"].ToString();
            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.NotaTrasladoInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.NotaTrasladoVacia.EstadoTransaccion;

            if (modelo.NotaTrasladoVacia.Observacion == null || modelo.NotaTrasladoVacia.Observacion == "") { modelo.NotaTrasladoVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.NotaTrasladoVacia.Observacion = modelo.NotaTrasladoVacia.Observacion.ToUpper(); }

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "CREACION DE DIRECCION";
            modelo.TraficoTraslados.CanalTransaccion = "OUTBOUND CREACION DIRECCION";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudCrearDireccion(modelo.IngresoTraslado, modelo.NotaTrasladoVacia,modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("DireccionesCreadasOutbound");

        }
   
        [HttpGet]
        public ActionResult SeguimientosSolicitudesCreacionDireccionOutbound()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosDireccionesOutbound(Session["Usuario"].ToString());
            return View(modelo);
        }
    
        [HttpPost]
        public ActionResult ConsultaGestionCreacionDr(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListGestionCrearDireccion(FI,FF, Session["Usuario"].ToString());
            return View(modelo);

        }
    
        [HttpGet]
        public ActionResult ConsultaGestionCreacionDr()
        {
            return View();
        }
        //proceso cambio de estrato

     
        [HttpGet]
        public ActionResult SolicitudCambioDeEstrato()
        {
            Session["FechaInicial"] = DateTime.Now;
            return View();
        }
     
        [HttpPost]
        public ActionResult SolicitudCambioDeEstrato(ViewModelTraslados modelo)
        {
            //servicio maestro nodos
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();

            //servicio ingreso traslados
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();

            modelo.IngresoTraslado.UsuarioApertura = Session["Usuario"].ToString(); modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.NombreLineaIngreso = Session["LineaLogeado"].ToString(); modelo.IngresoTraslado.AliadoApertura = Session["AliadoLogeado"].ToString();


            if (trasladowebservice.ExisteCuentaEscaladaCambioEstrato(modelo.IngresoTraslado.CuentaCliente) == false)
            {
                if (maestronodosservice.ExisteNodo(modelo.CambioEstrato.Nodo) == true)
                {


                    if (ModelState.IsValid == true)
                    {
                        DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
                        DateTime fechafintransaccion = DateTime.Now;

                        //datos de transaccion
                        modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
                        modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
                        modelo.TraficoTraslados.TipoTransaccion = "CAMBIO DE ESTRATO";
                        modelo.TraficoTraslados.CanalTransaccion = "SOLICITUD INBOUND";
                        //fin de transaccion

                        if (modelo.CambioEstrato.Observacion==null || modelo.CambioEstrato.Observacion == "") { modelo.CambioEstrato.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.CambioEstrato.Observacion = modelo.CambioEstrato.Observacion.ToUpper(); }
                        modelo.CambioEstrato.Direccion = modelo.CambioEstrato.Direccion.ToUpper();
                        modelo.CambioEstrato.Nodo = modelo.CambioEstrato.Nodo.ToUpper();

                        trasladowebservice.InsertIngresoCambioEstrato(modelo.IngresoTraslado, modelo.CambioEstrato,modelo.TraficoTraslados);
                        Session.Remove("FechaInicial");

                        return RedirectToAction("SolicitudCambioDeEstrato");
                    }


                }
                else
                {
                    ViewBag.NodoRepetidoError = "El nodo que ingreso no existe, por favor verifíquelo, o solicite su creación";
                }
            }
            else
            {
                ViewBag.CuentayaescaladaError = "La cuenta ingresada ya tiene un escalamiento pendiente para dar respuesta, verifique las solicitudes asociadas a esta cuenta.";
            }
            return View(modelo);
        }
     
        public ActionResult SolicitudesCambioDeEstrato()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSolicitudesCambioEstrato(Session["Usuario"].ToString());
            return View(modelo);
        }
 
        [HttpGet]
        public ActionResult GestionarCambioDeEstratoCelula(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionEnGestionCambioEstrato(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("SolicitudesCambioDeEstrato");
            }

            Session["FechaInicial"] = DateTime.Now;

            var cambioEstrado = trasladowebservice.ListaInteraccionesCambioEstrato(Convert.ToInt32(id));
            model.ListaCambioEstrato = cambioEstrado.Select(x => new CambioEstrato
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                CuentaCliente = x.CuentaCliente,
                Direccion = x.Direccion,
                Estrato = x.Estrato,
                Nodo = x.Nodo,
                TelefonoCelular = x.TelefonoCelular,
                TelefonoFijo = x.TelefonoFijo,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion,
                CorreoElectronico=x.CorreoElectronico
            }).ToList();

            decimal maxId = model.ListaCambioEstrato.Max(c => c.Id);
            decimal minId = model.ListaCambioEstrato.Min(c => c.Id);


            model.CambioEstrato = model.ListaCambioEstrato.Find(c => c.Id == maxId);
            model.CambioEstratoInicial = model.ListaCambioEstrato.Find(c => c.Id == minId);
            string nodo = model.CambioEstratoInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }
   
        [HttpPost]
        public ActionResult GestionarCambioDeEstratoCelula(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();

            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            modelo.CambioEstratoVacia.IdTransaccion = modelo.CambioEstratoInicial.IdTransaccion;
            modelo.CambioEstratoVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.CambioEstratoVacia.CanalTransaccion = "CELULA CAMBIO DE ESTRATO";
            modelo.CambioEstratoVacia.FechaTransaccion = DateTime.Now;
            modelo.CambioEstratoVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.CambioEstratoVacia.CuentaCliente = modelo.CambioEstratoInicial.CuentaCliente;
            modelo.CambioEstratoVacia.Direccion = modelo.CambioEstratoInicial.Direccion;
            modelo.CambioEstratoVacia.Estrato = modelo.CambioEstratoInicial.Estrato;
            modelo.CambioEstratoVacia.Nodo = modelo.CambioEstratoInicial.Nodo;
            modelo.CambioEstratoVacia.TelefonoCelular = modelo.CambioEstratoInicial.TelefonoCelular;
            modelo.CambioEstratoVacia.TelefonoFijo = modelo.CambioEstratoInicial.TelefonoFijo;
            modelo.CambioEstratoVacia.Razon = "GESTION BACKOFFICE";
            modelo.CambioEstratoVacia.UsuarioBackOffice = Session["Usuario"].ToString();
            modelo.CambioEstratoVacia.CorreoElectronico = modelo.CambioEstratoInicial.CorreoElectronico;
            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.CambioEstratoInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.CambioEstratoVacia.EstadoTransaccion;

            if (modelo.CambioEstratoVacia.Observacion == null || modelo.CambioEstratoVacia.Observacion == "") { modelo.CambioEstratoVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.CambioEstratoVacia.Observacion = modelo.CambioEstratoVacia.Observacion.ToUpper(); }

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "CAMBIO DE ESTRATO";
            modelo.TraficoTraslados.CanalTransaccion = "CELULA CAMBIO DE ESTRATO";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudCambioEstrato(modelo.IngresoTraslado, modelo.CambioEstratoVacia,modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("SolicitudesCambioDeEstrato");

        }
      
        public ActionResult SeguimientosCambioDeEstrato()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosCambiodeEstratoCelula(Session["Usuario"].ToString());
            return View(modelo);
        }
      
        [HttpPost]
        public ActionResult ConsultaGestionCambioDeEstrato(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListGestionCambioDeEstrato(FI, FF, Session["Usuario"].ToString());
            return View(modelo);

        }
      
        [HttpGet]
        public ActionResult ConsultaGestionCambioDeEstrato()
        {
            return View();
        }
        ///PROCESO LIBERACION DE HOME PASS
        
        [HttpGet]
        public ActionResult SolicitudLiberacionHomePass()
        {
            Session["FechaInicial"] = DateTime.Now;
            return View();
        }
  
        [HttpPost]
        public ActionResult SolicitudLiberacionHomePass(ViewModelTraslados modelo)
        {
            //servicio maestro nodos
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();

            //servicio ingreso traslados
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();


            modelo.IngresoTraslado.UsuarioApertura = Session["Usuario"].ToString(); modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();

            modelo.IngresoTraslado.NombreLineaIngreso = Session["LineaLogeado"].ToString(); modelo.IngresoTraslado.AliadoApertura = Session["AliadoLogeado"].ToString();


            if (trasladowebservice.ExisteCuentaEscaladaLiberacionHomePass(modelo.IngresoTraslado.CuentaCliente) == false)
            {
                if (maestronodosservice.ExisteNodo(modelo.LiberacionHomePass.Nodo) == true)
                {


                    if (ModelState.IsValid == true)
                    {
                        DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
                        DateTime fechafintransaccion = DateTime.Now;

                        //datos de transaccion
                        modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
                        modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
                        modelo.TraficoTraslados.TipoTransaccion = "LIBERACION DE HOMEPASS";
                        modelo.TraficoTraslados.CanalTransaccion = "SOLICITUD INBOUND";
                        //fin de transaccion

                        if (modelo.LiberacionHomePass.Observacion==null || modelo.LiberacionHomePass.Observacion == "") { modelo.LiberacionHomePass.Observacion = "SIN OBSERVACIONES -AUTOMATICO SISTEMAS"; } else { modelo.LiberacionHomePass.Observacion = modelo.LiberacionHomePass.Observacion.ToUpper();}
                        modelo.LiberacionHomePass.CuentaOcupa = modelo.IngresoTraslado.CuentaCliente;
                        modelo.LiberacionHomePass.Direccion = modelo.LiberacionHomePass.Direccion.ToUpper();
                        modelo.LiberacionHomePass.Nodo = modelo.LiberacionHomePass.Nodo.ToUpper();

                        trasladowebservice.InsertIngresoLiberacionHomePass(modelo.IngresoTraslado, modelo.LiberacionHomePass, modelo.TraficoTraslados);
                        Session.Remove("FechaInicial");

                        return RedirectToAction("SolicitudLiberacionHomePass");
                    }


                }
                else
                {
                    ViewBag.NodoRepetidoError = "El nodo que ingreso no existe, por favor verifíquelo, o solicite su creación";
                }
            }
            else
            {
                ViewBag.CuentayaescaladaError = "La cuenta ingresada ya tiene un escalamiento pendiente para dar respuesta, verifique las solicitudes asociadas a esta cuenta.";
            }
            return View(modelo);
        }
   
        public ActionResult SolicitudesLiberacionHomePass()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSolicitudesLiberacionesHomePass(Session["Usuario"].ToString());
            return View(modelo);
        }
 
        [HttpGet]
        public ActionResult GestionarLiberacionHomePassCelula(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionEnGestionLiberacionHomePass(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("SolicitudesLiberacionHomePass");
            }

            Session["FechaInicial"] = DateTime.Now;

            var liberacionHomePass = trasladowebservice.ListaInteraccionesLiberacionHomePass(Convert.ToInt32(id));
            model.ListaLiberacionHomePass = liberacionHomePass.Select(x => new LiberacionHomePass
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                CuentaOcupa = x.CuentaOcupa,
                CuentaTraslada = x.CuentaTraslada,
                Direccion = x.Direccion,
                Nodo = x.Nodo,
                TelefonoCelular = x.TelefonoCelular,
                TelefonoFijo = x.TelefonoFijo,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion,
                MotivoLiberacion = x.MotivoLiberacion
            }).ToList();

            decimal maxId = model.ListaLiberacionHomePass.Max(c => c.Id);
            decimal minId = model.ListaLiberacionHomePass.Min(c => c.Id);


            model.LiberacionHomePass = model.ListaLiberacionHomePass.Find(c => c.Id == maxId);
            model.LiberacionHomePassInicial = model.ListaLiberacionHomePass.Find(c => c.Id == minId);
            string nodo = model.LiberacionHomePassInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }

        [HttpPost]
        public ActionResult GestionarLiberacionHomePassCelula(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();

            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();

            modelo.LiberacionHomePassVacia.IdTransaccion = modelo.LiberacionHomePassInicial.IdTransaccion;
            modelo.LiberacionHomePassVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.LiberacionHomePassVacia.CanalTransaccion = "CELULA LIBERACION DE HOMEPASS";
            modelo.LiberacionHomePassVacia.FechaTransaccion = DateTime.Now;
            modelo.LiberacionHomePassVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.LiberacionHomePassVacia.CuentaOcupa = modelo.LiberacionHomePassInicial.CuentaOcupa;
            modelo.LiberacionHomePassVacia.CuentaTraslada = modelo.LiberacionHomePassInicial.CuentaTraslada;
            modelo.LiberacionHomePassVacia.Direccion = modelo.LiberacionHomePassInicial.Direccion;
            modelo.LiberacionHomePassVacia.Nodo = modelo.LiberacionHomePassInicial.Nodo;
            modelo.LiberacionHomePassVacia.TelefonoCelular = modelo.LiberacionHomePassInicial.TelefonoCelular;
            modelo.LiberacionHomePassVacia.TelefonoFijo = modelo.LiberacionHomePassInicial.TelefonoFijo;
            modelo.LiberacionHomePassVacia.Razon = "GESTION BACKOFFICE";
            modelo.LiberacionHomePassVacia.UsuarioBackOffice = Session["Usuario"].ToString();
            modelo.LiberacionHomePassVacia.MotivoLiberacion = modelo.LiberacionHomePassInicial.MotivoLiberacion;
            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.LiberacionHomePassInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.LiberacionHomePassVacia.EstadoTransaccion;

            if (modelo.LiberacionHomePassVacia.Observacion==null || modelo.LiberacionHomePassVacia.Observacion == "") { modelo.LiberacionHomePassVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.LiberacionHomePassVacia.Observacion = modelo.LiberacionHomePassVacia.Observacion.ToUpper(); }

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "LIBERACION DE HOMEPASS";
            modelo.TraficoTraslados.CanalTransaccion = "CELULA LIBERACION DE HOMEPASS";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudLiberacionesHomePass(modelo.IngresoTraslado, modelo.LiberacionHomePassVacia, modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("SolicitudesLiberacionHomePass");

        }
    
        public ActionResult SeguimientosLiberacionHomePass()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosLiberacionHomePassCelula(Session["Usuario"].ToString());
            return View(modelo);
        }
 
        [HttpPost]
        public ActionResult ConsultaGestionLiberaciondeHomePass(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListGestionLiberacionHomePass(FI, FF, Session["Usuario"].ToString());
            return View(modelo);

        }
      
        [HttpGet]
        public ActionResult ConsultaGestionLiberaciondeHomePass()
        {
            return View();
        }

        ///PROCESO GESTION DE MATRICES
        ///
  
        [HttpGet]
        public ActionResult SolicitudMatrices()
        {
            Session["FechaInicial"] = DateTime.Now;
            return View();
        }
  
        [HttpPost]
        public ActionResult SolicitudMatrices(ViewModelTraslados modelo)
        {
            //servicio maestro nodos
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();

            //servicio ingreso traslados
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            modelo.IngresoTraslado.UsuarioApertura = Session["Usuario"].ToString(); modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();

            modelo.IngresoTraslado.NombreLineaIngreso = Session["LineaLogeado"].ToString(); modelo.IngresoTraslado.AliadoApertura = Session["AliadoLogeado"].ToString();

            
            if (trasladowebservice.ExisteCuentaEscaladaMatriz(modelo.IngresoTraslado.CuentaCliente) == false)
            {
                if (maestronodosservice.ExisteNodo(modelo.GestionMatriz.Nodo) == true)
                {


                    if (ModelState.IsValid == true)
                    {
                        //ingreso traslado
                        if(modelo.GestionMatriz.Observacion==null || modelo.GestionMatriz.Observacion == "") { modelo.GestionMatriz.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.GestionMatriz.Observacion = modelo.GestionMatriz.Observacion.ToUpper(); }
                        modelo.GestionMatriz.Direccion = modelo.GestionMatriz.Direccion.ToUpper();
                        modelo.GestionMatriz.Nodo = modelo.GestionMatriz.Nodo.ToUpper();

                        //datos de transaccion
                        modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
                        modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
                        modelo.TraficoTraslados.TipoTransaccion = "GESTION DE MATRICES";
                        modelo.TraficoTraslados.CanalTransaccion = "SOLICITUD INBOUND";
                        //fin de transaccion

                        trasladowebservice.InsertIngresoGestionMatriz(modelo.IngresoTraslado, modelo.GestionMatriz, modelo.TraficoTraslados);
                        Session.Remove("FechaInicial");
                        return RedirectToAction("SolicitudMatrices");
                    }
                }
                else
                {
                    ViewBag.NodoRepetidoError = "El nodo que ingreso no existe, por favor verifíquelo, o solicite su creación";
                }
            }
            else
            {
                ViewBag.CuentayaescaladaError = "La cuenta ingresada ya tiene un escalamiento pendiente para dar respuesta, verifique las solicitudes asociadas a esta cuenta.";
            }
            return View(modelo);
        }

        public ActionResult SolicitudesCreacionMatrices()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSolicitudesCreaciondeMatriz(Session["Usuario"].ToString());
            return View(modelo);
        }
     
        [HttpGet]
        public ActionResult GestionarCreacionDeMatriz(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionCrearMatrizEnGestion(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("SolicitudesCreacionMatrices");
            }

            Session["FechaInicial"] = DateTime.Now;


            var notasgestionmatriz = trasladowebservice.ListaInteraccionesMatrices(Convert.ToInt32(id));
            model.ListaGestionMatriz = notasgestionmatriz.Select(x => new GestionMatriz
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                TipoGestionMatriz = x.TipoGestionMatriz,
                TipoCliente = x.TipoCliente,
                CuentaCliente = x.CuentaCliente,
                CuentaMatriz = x.CuentaMatriz,
                OrdenTrabajo = x.OrdenTrabajo,
                Direccion = x.Direccion,
                Nodo = x.Nodo,
                NombreConjuntoEdificio = x.NombreConjuntoEdificio,
                TelefonoCLiente = x.TelefonoCLiente,
                TelefonoAdministrador = x.TelefonoAdministrador,
                NombreAdministrador = x.NombreAdministrador,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion,
                UsuarioBackOfficeCreacion = x.UsuarioBackOfficeCreacion,
                UsuarioBackOfficeGestion = x.UsuarioBackOfficeGestion
            }).ToList();

            decimal maxId = model.ListaGestionMatriz.Max(c => c.Id);
            decimal minId = model.ListaGestionMatriz.Min(c => c.Id);


            model.GestionMatriz = model.ListaGestionMatriz.Find(c => c.Id == maxId);
            model.GestionMatrizInicial = model.ListaGestionMatriz.Find(c => c.Id == minId);
            string nodo = model.GestionMatrizInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }

        [HttpPost]
        public ActionResult GestionarCreacionDeMatriz(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();

            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            modelo.GestionMatrizVacia.IdTransaccion = modelo.GestionMatrizInicial.IdTransaccion;
            modelo.GestionMatrizVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.GestionMatrizVacia.CanalTransaccion = "CELULA CREACION MATRICES";
            modelo.GestionMatrizVacia.FechaTransaccion = DateTime.Now;
            modelo.GestionMatrizVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.GestionMatrizVacia.TipoGestionMatriz = modelo.GestionMatrizInicial.TipoGestionMatriz;
            modelo.GestionMatrizVacia.TipoCliente = modelo.GestionMatrizInicial.TipoCliente;
            modelo.GestionMatrizVacia.CuentaCliente = modelo.GestionMatrizInicial.CuentaCliente;
            modelo.GestionMatrizVacia.CuentaMatriz = modelo.GestionMatriz.CuentaMatriz;
            modelo.GestionMatrizVacia.OrdenTrabajo = modelo.GestionMatriz.OrdenTrabajo;
            modelo.GestionMatrizVacia.Direccion = modelo.GestionMatrizInicial.Direccion;
            modelo.GestionMatrizVacia.Nodo = modelo.GestionMatrizInicial.Nodo;
            modelo.GestionMatrizVacia.NombreConjuntoEdificio = modelo.GestionMatrizInicial.NombreConjuntoEdificio;
            modelo.GestionMatrizVacia.TelefonoCLiente = modelo.GestionMatrizInicial.TelefonoCLiente;
            modelo.GestionMatrizVacia.TelefonoAdministrador = modelo.GestionMatrizInicial.TelefonoAdministrador;
            modelo.GestionMatrizVacia.NombreAdministrador = modelo.GestionMatrizInicial.NombreAdministrador;
            modelo.GestionMatrizVacia.Razon = "GESTION BACKOFFICE CREACION";
            modelo.GestionMatrizVacia.UsuarioBackOfficeCreacion = Session["Usuario"].ToString();

            if(modelo.GestionMatrizVacia.Observacion==null || modelo.GestionMatrizVacia.Observacion == "") { modelo.GestionMatrizVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.GestionMatrizVacia.Observacion = modelo.GestionMatrizVacia.Observacion.ToUpper(); }
            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.GestionMatrizInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.GestionMatrizVacia.EstadoTransaccion;

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "GESTION DE MATRICES";
            modelo.TraficoTraslados.CanalTransaccion = "CELULA CREACION MATRICES";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudMatrices(modelo.IngresoTraslado, modelo.GestionMatrizVacia, modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("SolicitudesCreacionMatrices");

        }

        public ActionResult SeguimientosSolicitudesCreacionMatriz()
        {

            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosCrearMatrizCelula(Session["Usuario"].ToString());
            return View(modelo);
        }

        [HttpGet]
        public ActionResult SolicitudesGestionMatrices()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSolicitudesGestionMatriz(Session["Usuario"].ToString());
            return View(modelo);

        }
 
        [HttpGet]
        public ActionResult GestionMatricesCelula(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionGestionMatrizEnGestion(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("SolicitudesGestionMatrices");
            }

            Session["FechaInicial"] = DateTime.Now;


            var notasgestionmatriz = trasladowebservice.ListaInteraccionesMatrices(Convert.ToInt32(id));
            model.ListaGestionMatriz = notasgestionmatriz.Select(x => new GestionMatriz
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                TipoGestionMatriz = x.TipoGestionMatriz,
                TipoCliente = x.TipoCliente,
                CuentaCliente = x.CuentaCliente,
                CuentaMatriz = x.CuentaMatriz,
                OrdenTrabajo = x.OrdenTrabajo,
                Direccion = x.Direccion,
                Nodo = x.Nodo,
                NombreConjuntoEdificio = x.NombreConjuntoEdificio,
                TelefonoCLiente = x.TelefonoCLiente,
                TelefonoAdministrador = x.TelefonoAdministrador,
                NombreAdministrador = x.NombreAdministrador,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion,
                UsuarioBackOfficeCreacion = x.UsuarioBackOfficeCreacion,
                UsuarioBackOfficeGestion = x.UsuarioBackOfficeGestion
            }).ToList();

            decimal maxId = model.ListaGestionMatriz.Max(c => c.Id);
            decimal minId = model.ListaGestionMatriz.Min(c => c.Id);


            model.GestionMatriz = model.ListaGestionMatriz.Find(c => c.Id == maxId);
            model.GestionMatrizInicial = model.ListaGestionMatriz.Find(c => c.Id == minId);
            string nodo = model.GestionMatrizInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }

        [HttpPost]
        public ActionResult GestionMatricesCelula(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            modelo.GestionMatrizVacia.IdTransaccion = modelo.GestionMatrizInicial.IdTransaccion;
            modelo.GestionMatrizVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.GestionMatrizVacia.CanalTransaccion = "CELULA GESTION MATRICES";
            modelo.GestionMatrizVacia.FechaTransaccion = DateTime.Now;
            modelo.GestionMatrizVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.GestionMatrizVacia.TipoGestionMatriz = modelo.GestionMatrizInicial.TipoGestionMatriz;
            modelo.GestionMatrizVacia.TipoCliente = modelo.GestionMatrizInicial.TipoCliente;
            modelo.GestionMatrizVacia.CuentaCliente = modelo.GestionMatrizInicial.CuentaCliente;
            modelo.GestionMatrizVacia.CuentaMatriz = modelo.GestionMatriz.CuentaMatriz;
            modelo.GestionMatrizVacia.OrdenTrabajo = modelo.GestionMatriz.OrdenTrabajo;
            modelo.GestionMatrizVacia.Direccion = modelo.GestionMatrizInicial.Direccion;
            modelo.GestionMatrizVacia.Nodo = modelo.GestionMatrizInicial.Nodo;
            modelo.GestionMatrizVacia.NombreConjuntoEdificio = modelo.GestionMatrizInicial.NombreConjuntoEdificio;
            modelo.GestionMatrizVacia.TelefonoCLiente = modelo.GestionMatrizInicial.TelefonoCLiente;
            modelo.GestionMatrizVacia.TelefonoAdministrador = modelo.GestionMatrizInicial.TelefonoAdministrador;
            modelo.GestionMatrizVacia.NombreAdministrador = modelo.GestionMatrizInicial.NombreAdministrador;
            modelo.GestionMatrizVacia.Razon = "GESTION BACKOFFICE GESTION";
            modelo.GestionMatrizVacia.UsuarioBackOfficeCreacion = modelo.GestionMatriz.UsuarioBackOfficeCreacion;
            modelo.GestionMatrizVacia.UsuarioBackOfficeGestion = Session["Usuario"].ToString();

            if (modelo.GestionMatrizVacia.Observacion == null || modelo.GestionMatrizVacia.Observacion == "") { modelo.GestionMatrizVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.GestionMatrizVacia.Observacion = modelo.GestionMatrizVacia.Observacion.ToUpper(); }

            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.GestionMatrizInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.GestionMatrizVacia.EstadoTransaccion;

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "GESTION DE MATRICES";
            modelo.TraficoTraslados.CanalTransaccion = "CELULA GESTION MATRICES";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudMatrices(modelo.IngresoTraslado, modelo.GestionMatrizVacia, modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("SolicitudesGestionMatrices");

        }

        [HttpGet]
        public ActionResult SeguimientosSolicitudesGestionMatrices()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosGestionMatricesCelula(Session["Usuario"].ToString());
            return View(modelo);
        }

        [HttpPost]
        public ActionResult ConsultaGestionMatrices(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListGestionMatrices(FI, FF, Session["Usuario"].ToString());
            return View(modelo);

        }

        [HttpGet]
        public ActionResult ConsultaGestionMatrices()
        {
            return View();
        }
  
        [HttpGet]
        public ActionResult ConsultaAdminIngresosTraslados()
        {
            return View();
        }
  
        [HttpPost]
        public ActionResult ConsultaAdminIngresosTraslados(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaGeneralIngresosTraslados(FI, FF);
            return View(modelo);
        }
   
        [HttpGet]
        public ActionResult ConsultaAdminIngresosCrearDireccion()
        {
            return View();
        }
      
        [HttpPost]
        public ActionResult ConsultaAdminIngresosCrearDireccion(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaGeneralIngresosCrearDireccion(FI, FF);
            return View(modelo);
        }
      
        [HttpGet]
        public ActionResult ConsultaAdminIngresosCambioEstrato()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ConsultaAdminIngresosCambioEstrato(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaGeneralIngresosCambiEstrato(FI, FF);
            return View(modelo);
        }
   
        [HttpGet]
        public ActionResult ConsultaAdminIngresosLiberaciones()
        {
            return View();
        }
     
        [HttpPost]
        public ActionResult ConsultaAdminIngresosLiberaciones(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaGeneralIngresosLiberaciones(FI, FF);
            return View(modelo);
        }
     
        [HttpGet]
        public ActionResult ConsultaAdminIngresosMatrices()
        {
            return View();
        }
   
        [HttpPost]
        public ActionResult ConsultaAdminIngresosMatrices(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaGeneralIngresosmatrices(FI, FF);
            return View(modelo);
        }
        [HttpGet]
        public ActionResult ConsultaIngresosTraslados()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaIngresosTraslados(string CuentaCliente)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            if(CuentaCliente!=null && CuentaCliente!="")
            {
                modelo = trasladowebservice.ConsultaIngresosTrasladosAsesor(Convert.ToDecimal(CuentaCliente));
            }
            else {
                return RedirectToAction("ConsultaIngresosTraslados");
            }
            
            return View(modelo);
        }
        [HttpGet]
        public ActionResult ConsultaClienteCreacionDireccion()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaClienteCreacionDireccion(string CuentaCliente)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            if (CuentaCliente != null && CuentaCliente != "")
            {
                modelo = trasladowebservice.ListaGeneralIngresosCrearDireccionAsesor(Convert.ToDecimal(CuentaCliente));
            }
            else
            {
                return RedirectToAction("ConsultaClienteCreacionDireccion");
            }

            return View(modelo);

        }
        [HttpGet]
        public ActionResult ConsultaClienteCambiodeEstrato()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaClienteCambiodeEstrato(string CuentaCliente)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            if (CuentaCliente != null && CuentaCliente != "")
            {
                modelo = trasladowebservice.ListaGeneralIngresosCambiEstratoAsesor(Convert.ToDecimal(CuentaCliente));
            }
            else
            {
                return RedirectToAction("ConsultaClienteCambiodeEstrato");
            }

            return View(modelo);

        }
        [HttpGet]
        public ActionResult ConsultaClienteLiberacionHomePass()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaClienteLiberacionHomePass(string CuentaCliente)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            if (CuentaCliente != null && CuentaCliente != "")
            {
                modelo = trasladowebservice.ListaGeneralIngresosLiberacionesAsesor(Convert.ToDecimal(CuentaCliente));
            }
            else
            {
                return RedirectToAction("ConsultaClienteLiberacionHomePass");
            }

            return View(modelo);

        }
        [HttpGet]
        public ActionResult ConsultaClienteMatrices()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaClienteMatrices(string CuentaCliente)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            if (CuentaCliente != null && CuentaCliente != "")
            {
                modelo = trasladowebservice.ListaGeneralIngresosmatricesAsesor(Convert.ToDecimal(CuentaCliente));
            }
            else
            {
                return RedirectToAction("ConsultaClienteMatrices");
            }

            return View(modelo);

        }

        //PROCESO DE TRASLADOS NO COBERTURA
        public ActionResult SolicitudTrasladoNoCobertura()
        {
            Session["FechaInicial"] = DateTime.Now;
            return View();
        }
        [HttpPost]
        public ActionResult SolicitudTrasladoNoCobertura(ViewModelTraslados modelo)
        {
            //servicio maestro nodos
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();

            //servicio ingreso traslados
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();

            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            modelo.IngresoTraslado.UsuarioApertura = Session["Usuario"].ToString(); modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();

            modelo.IngresoTraslado.NombreLineaIngreso = Session["LineaLogeado"].ToString(); modelo.IngresoTraslado.AliadoApertura = Session["AliadoLogeado"].ToString();


            if (trasladowebservice.ExisteCuentaEscaladaTrasladoNoCobertura(modelo.IngresoTraslado.CuentaCliente) == false)
            {
                if (maestronodosservice.ExisteNodo(modelo.TrasladosNoCobertura.Nodo) == true)
                {


                    if (ModelState.IsValid == true)
                    {
                        if (modelo.TrasladosNoCobertura.Observacion == null || modelo.TrasladosNoCobertura.Observacion == "") { modelo.TrasladosNoCobertura.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.TrasladosNoCobertura.Observacion = modelo.TrasladosNoCobertura.Observacion.ToUpper(); }
                        modelo.TrasladosNoCobertura.DireccionTraslado = modelo.TrasladosNoCobertura.DireccionTraslado.ToUpper();
                        modelo.TrasladosNoCobertura.Nodo = modelo.TrasladosNoCobertura.Nodo.ToUpper();

                        //datos de transaccion
                        modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
                        modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
                        modelo.TraficoTraslados.TipoTransaccion = "TRASLADO NO COBERTURA";
                        modelo.TraficoTraslados.CanalTransaccion = "SOLICITUD INBOUND";
                        //fin de transaccion

                        trasladowebservice.InsertIngresoTrasladoNoCobertura(modelo.IngresoTraslado, modelo.TrasladosNoCobertura, modelo.TraficoTraslados);
                        Session.Remove("FechaInicial");
                        return RedirectToAction("SolicitudTrasladoNoCobertura");
                    }
                }
                else
                {
                    ViewBag.NodoRepetidoError = "El nodo que ingreso no existe, por favor verifíquelo, o solicite su creación";
                }
            }
            else
            {
                ViewBag.CuentayaescaladaError = "La cuenta ingresada ya tiene un escalamiento pendiente para dar respuesta, verifique las solicitudes asociadas a esta cuenta.";
            }
            return View(modelo);
        }

        public ActionResult SolicitudesTrasladosNoCobertura()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSolicitudesTrasladoNoCobertura(Session["Usuario"].ToString());
            return View(modelo);
        }

        [HttpGet]
        public ActionResult GestionarTrasladoNoCobertura(int id)
        {
            ViewModelTraslados model = new ViewModelTraslados();
            trasladowebservice = new WSD.TrasladosServiceClient(); maestronodosservice = new WSD.MaestroNodoServiceClient();
            trasladowebservice.ClientCredentials.Authenticate(); maestronodosservice.ClientCredentials.Authenticate();

            if (trasladowebservice.TransaccionEnGestionTrasladoNoCobertura(id, Session["Usuario"].ToString()) == true)
            {
                return RedirectToAction("SolicitudesTrasladosNoCobertura");
            }

            Session["FechaInicial"] = DateTime.Now;


            var notasTraslado = trasladowebservice.ListaInteraccionesTrasladosNoCobertura(Convert.ToInt32(id));
            model.ListaTrasladosNoCobertura = notasTraslado.Select(x => new TrasladoNoCobertura
            {
                Id = x.Id,
                IdTransaccion = x.IdTransaccion,
                UsuarioTransaccion = x.UsuarioTransaccion,
                CanalTransaccion = x.CanalTransaccion,
                FechaTransaccion = x.FechaTransaccion,
                NombreLineaTransaccion = x.NombreLineaTransaccion,
                CuentaCliente = x.CuentaCliente,
                DireccionTraslado = x.DireccionTraslado,
                Estrato = x.Estrato,
                Nodo = x.Nodo,
                TelefonoCelular = x.TelefonoCelular,
                TelefonoFijo = x.TelefonoFijo,
                Razon = x.Razon,
                Subrazon = x.Subrazon,
                Observacion = x.Observacion,
                EstadoTransaccion = x.EstadoTransaccion
            }).ToList();

            decimal maxId = model.ListaTrasladosNoCobertura.Max(c => c.Id);
            decimal minId = model.ListaTrasladosNoCobertura.Min(c => c.Id);


            model.TrasladosNoCobertura = model.ListaTrasladosNoCobertura.Find(c => c.Id == maxId);
            model.TrasladosNoCoberturaInicial = model.ListaTrasladosNoCobertura.Find(c => c.Id == minId);
            string nodo = model.TrasladosNoCoberturaInicial.Nodo;
            model.InformacionNodo = maestronodosservice.GetInformacionNodo(nodo);
            return View(model);
        }

        [HttpPost]
        public ActionResult GestionarTrasladoNoCobertura(ViewModelTraslados modelo)
        {
            modelo.IngresoTraslado = new IngresoTraslado();
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            modelo.TrasladosNoCoberturaVacia.IdTransaccion = modelo.TrasladosNoCoberturaInicial.IdTransaccion;
            modelo.TrasladosNoCoberturaVacia.UsuarioTransaccion = Session["Usuario"].ToString();
            modelo.TrasladosNoCoberturaVacia.CanalTransaccion = "CELULA TRASLADO NO COBERTURA";
            modelo.TrasladosNoCoberturaVacia.FechaTransaccion = DateTime.Now;
            modelo.TrasladosNoCoberturaVacia.NombreLineaTransaccion = Session["LineaLogeado"].ToString();
            modelo.TrasladosNoCoberturaVacia.CuentaCliente = modelo.TrasladosNoCoberturaInicial.CuentaCliente;
            modelo.TrasladosNoCoberturaVacia.DireccionTraslado = modelo.TrasladosNoCoberturaInicial.DireccionTraslado;
            modelo.TrasladosNoCoberturaVacia.Estrato = modelo.TrasladosNoCoberturaInicial.Estrato;
            modelo.TrasladosNoCoberturaVacia.Nodo = modelo.TrasladosNoCoberturaInicial.Nodo;
            modelo.TrasladosNoCoberturaVacia.TelefonoCelular = modelo.TrasladosNoCoberturaInicial.TelefonoCelular;
            modelo.TrasladosNoCoberturaVacia.TelefonoFijo = modelo.TrasladosNoCoberturaInicial.TelefonoFijo;
            modelo.TrasladosNoCoberturaVacia.Razon = "GESTION BACKOFFICE";
            modelo.TrasladosNoCoberturaVacia.UsuarioBackOffice = Session["Usuario"].ToString();
            modelo.IngresoTraslado.IdTransaccion = Convert.ToDecimal(modelo.TrasladosNoCoberturaInicial.IdTransaccion);
            modelo.IngresoTraslado.UsuarioUltimaActualizacion = Session["Usuario"].ToString();
            modelo.IngresoTraslado.EstadoTransaccion = modelo.TrasladosNoCoberturaVacia.EstadoTransaccion;

            if (modelo.TrasladosNoCoberturaVacia.Observacion == null || modelo.TrasladosNoCoberturaVacia.Observacion == "") { modelo.TrasladosNoCoberturaVacia.Observacion = "SIN OBSERVACIONES - AUTOMATICO SISTEMAS"; } else { modelo.TrasladosNoCoberturaVacia.Observacion = modelo.TrasladosNoCoberturaVacia.Observacion.ToUpper(); }


            DateTime fechainiciotransaccion = Convert.ToDateTime(Session["FechaInicial"].ToString());
            DateTime fechafintransaccion = DateTime.Now;

            //datos de transaccion
            modelo.TraficoTraslados.InicioTransaccion = fechainiciotransaccion;
            modelo.TraficoTraslados.FinTransaccion = fechafintransaccion;
            modelo.TraficoTraslados.TipoTransaccion = "TRASLADO NO COBERTURA";
            modelo.TraficoTraslados.CanalTransaccion = "CELULA TRASLADO NO COBERTURA";
            //fin de transaccion

            trasladowebservice.ActualizarSolicitudTrasladosNoCobertura(modelo.IngresoTraslado, modelo.TrasladosNoCoberturaVacia, modelo.TraficoTraslados);
            Session.Remove("FechaInicial");
            return RedirectToAction("SolicitudesTrasladosNoCobertura");

        }
        [HttpGet]
        public ActionResult SeguimientosTrasladoNoCobertura()
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaSeguimientosTrasladoNoCoberturaCelula(Session["Usuario"].ToString());
            return View(modelo);
        }
        [HttpPost]
        public ActionResult ConsultaGestionTrasladoNoCobertura(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListGestionTrasladoNoCobertura(FI, FF, Session["Usuario"].ToString());
            return View(modelo);

        }
        [HttpGet]
        public ActionResult ConsultaAdminIngresosTrasladosNoCobertura()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ConsultaAdminIngresosTrasladosNoCobertura(string fechaInicial, string fechaFinal)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            DateTime FI = Convert.ToDateTime(fechaInicial);
            DateTime FF = Convert.ToDateTime(fechaFinal);
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            modelo = trasladowebservice.ListaGeneralIngresosTrasladoNoCobertura(FI, FF);
            return View(modelo);
        }
        [HttpGet]
        public ActionResult ConsultaClienteTrasladoNoCobertura()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ConsultaClienteTrasladoNoCobertura(string CuentaCliente)
        {
            trasladowebservice = new WSD.TrasladosServiceClient();
            trasladowebservice.ClientCredentials.Authenticate();
            List<DatoConsultaDirecciones> modelo = new List<DatoConsultaDirecciones>();
            if (CuentaCliente != null && CuentaCliente != "")
            {
                modelo = trasladowebservice.ListaGeneralIngresosTrasladoNoCoberturaAsesor(Convert.ToDecimal(CuentaCliente));
            }
            else
            {
                return RedirectToAction("ConsultaClienteTrasladoNoCobertura");
            }

            return View(modelo);

        }


    }
}
