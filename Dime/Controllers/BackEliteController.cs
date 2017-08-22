﻿using Dime.Helpers;
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
    public class BackEliteController : MyController
    {
        WSD.BackEliteServiceClient backeliteservice;
        WSD.MaestroNodoServiceClient maestronodosservice;

        public BackEliteController()
        {
            backeliteservice = new WSD.BackEliteServiceClient();
            backeliteservice.ClientCredentials.Authenticate();
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();
        }
        public JsonResult ListaTipoDeEscalamientosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaTipoDeEscalamientos()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDetalleDeEscalamientosJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDetalleDeEscalamientos(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult SolicitudBackElite()
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            return View(modelo);
        }
        [HttpPost]
        public ActionResult SolicitudBackElite(ViewModelBackElite modelo)
        {

            modelo.BEPSolicitudes.UsuarioQueSolicita = Convert.ToString(Session["Usuario"].ToString());
            modelo.BEPSolicitudes.NombreUsuarioQueSolicita = Session["NombreUsuario"].ToString();
            modelo.BEPSolicitudes.AliadoQueSolicita = Session["AliadoLogeado"].ToString();
            modelo.BEPSolicitudes.OperacionQueSolicita = Session["OperacionUsuarioHolos"].ToString();

            var CuentaEscalada = backeliteservice.ValidarCuentaEnBackElite(Convert.ToDecimal(modelo.BEPSolicitudes.CuentaCliente), Convert.ToDecimal(modelo.BEPSolicitudes.LlsOt), modelo.BEPSolicitudes.TipoDeSolicitud);
            if (CuentaEscalada == true)
            {
                ViewBag.ExisteCuentaEscalada = "Ya existe una solicitud escalada con esta Cuenta, Orden de Trabajo o Llamada de Servicio por la misma tipología.";
                return View(modelo);
            }
            else
            {
                modelo.NodosZonificados = backeliteservice.TraerNodoPorId(modelo.BEPSolicitudes.Nodo);
                if (modelo.NodosZonificados != null)
                {
                    if (modelo.BEPSolicitudes.CuentaCliente == 0 || modelo.BEPSolicitudes.LlsOt == 0)
                    {
                        ViewBag.ExisteCuentaEscalada = "La Cuenta del Cliente, la Ordern de Trabajo o Llamada de Servicio no pueden ser Cero (0).";
                        return View(modelo);
                    }
                    else
                    {
                        ViewBag.ExisteCuentaEscalada = null;
                        backeliteservice.RegistrarSolicitud(modelo.BEPSolicitudes);
                        return RedirectToAction("SolicitudBackElite");
                    }
                }
                else
                {
                    ViewBag.ExisteCuentaEscalada = "El nodo ingresado no existe en la base de nodos zonificados, por favor verifíquelo nuevamente.";
                    return View(modelo);
                }

            }
        }
        public JsonResult ListaGestionPorIdJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDetallesDeGestion(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaMalEscaladodJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaRazonesMalEscalamiento(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult EstadoGestionId(string idGestion)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.DetalleGestionPorId(Convert.ToDecimal(idGestion))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult ListaInteraccionesSolicitudJson(string IdSolicitud)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaInteraccionesSolicitud(Convert.ToDecimal(IdSolicitud))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public ActionResult GestionarSolicitud(string IdSolicitud)
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            int norecu = 0;

            if (IdSolicitud == null || IdSolicitud.Equals(""))
            {

                modelo.BEPSolicitudes = backeliteservice.ApartarCuentadeSolcitudBackElita(Convert.ToDecimal(Session["Usuario"].ToString()), norecu);
                Session["TipoDireccionamiento"] = 0;
            }
            else
            {
                modelo.BEPSolicitudes = backeliteservice.ConsultarSolicitudPorId(Convert.ToDecimal(IdSolicitud));
                Session["TipoDireccionamiento"] = IdSolicitud;
            }

            if (modelo.BEPSolicitudes != null)
            {
                modelo.BEPSolicitudes.Observaciones = "";

                modelo.NodosZonificados = backeliteservice.TraerNodoPorId(modelo.BEPSolicitudes.Nodo);
                modelo.BEMTipoDeEscalamientos = backeliteservice.TipoEscalamientoPorNombre(modelo.BEPSolicitudes.TipoDeSolicitud);
                ViewBag.NohayBase = null;
            }
            else
            {
                modelo.BEPSolicitudes = new BEPSolicitudes();
                ViewBag.NohayBase = "NO HAY REGISTROS DISPONIBLES";
            }

            return View(modelo);
        }
        [HttpPost]
        public ActionResult GestionarSolicitud(ViewModelBackElite modelo)
        {
            modelo.BEPSolicitudes.UsuarioQueSolicita = Convert.ToString(Session["Usuario"].ToString());
            modelo.BEPSolicitudes.NombreUsuarioQueSolicita = Session["NombreUsuario"].ToString();
            modelo.BEPSolicitudes.AliadoQueSolicita = Session["AliadoLogeado"].ToString();
            modelo.BEPSolicitudes.OperacionQueSolicita = Session["OperacionUsuarioHolos"].ToString();

            backeliteservice.ActualizaSolicitud(modelo.BEPSolicitudes);
            decimal direccionPagina = Convert.ToDecimal(Session["TipoDireccionamiento"]);
            Session.Remove("TipoDireccionamiento");
            if (direccionPagina > 0)
            {
                return RedirectToAction("SeguimientoSolicitudes");
            }
            else
            {
                return RedirectToAction("GestionarSolicitud");
            }

        }
        [HttpGet]
        public ActionResult SeguimientoSolicitudes()
        {
            return View();
        }
        public JsonResult ListaSeguimientosBackEliteJson()
        {
            decimal Cedula = Convert.ToDecimal(Session["Usuario"].ToString());
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaSeguimientosAgente(Cedula)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaDeGestion()
        {
            return View();
        }
        public JsonResult ConsultaDeGestionBackEliteJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ConsultadeGestionAgente(Session["Usuario"].ToString(), FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaAdministradorLog()
        {
            return View();

        }
        public JsonResult ConsultaAdministradorLogJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ConsultaSolicitudesAdminLog(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ConsultaAdminstradorPrincipal()
        {
            return View();
        }
        public JsonResult ConsultaAdminstradorPrincipalJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ConsultaSolicitudesAdminPricipal(FechaInicial, FechaFinal)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult ListaDistribucionUsuario()
        {
            return View();
        }
        public JsonResult ListaProcesosAsignadosUsuarioJson(string Cedula)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDistribucionPorIdCedula(Convert.ToDecimal(Cedula))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult AdministrarDistrubucionBackElite(string Id)
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            if (Id == null || Id.Equals(""))
            {
                modelo.BEMDistribuciones = new BEMDistribuciones();
                ViewBag.Eliminar = null;
            }
            else
            {
                modelo.BEMDistribuciones = backeliteservice.DistribucionPorId(Convert.ToDecimal(Id));
                ViewBag.Eliminar = "si";
            }
            return View(modelo);

        }
        [HttpPost]
        public ActionResult AdministrarDistrubucionBackElite(ViewModelBackElite modelo)
        {
            if (modelo.BEMDistribuciones.Id > 0)
            {
                backeliteservice.EliminarUsuarioDistribucion(modelo.BEMDistribuciones.CedulaUsuario, modelo.BEMDistribuciones.TipoEscalamientoAsignado);
                return RedirectToAction("ListaDistribucionUsuario");
            }
            else
            {
                var Result = backeliteservice.ValidarUsuarioDistribucion(modelo.BEMDistribuciones.CedulaUsuario, modelo.BEMDistribuciones.TipoEscalamientoAsignado);

                if (Result == true)
                {
                    ViewBag.Validacion = "El usuario ya tiene este tipo de trabajo asignado, por favor asigne uno diferente";
                    return View(modelo);
                }
                else
                {
                    backeliteservice.RegistrarUsuarioDistribucion(modelo.BEMDistribuciones);
                    ViewBag.Validacion = null;
                    return RedirectToAction("ListaDistribucionUsuario");
                }
            }

        }
        [HttpGet]
        public ActionResult CierreMasivo()
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            return View(modelo);
        }
        [HttpPost]
        public JsonResult ConsultarSolicitudesMasivo(IList<string> Solicitudes)
        {
            var result0 = backeliteservice.ConsultarSolicitudesMasivo(Solicitudes.ToList());

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result0),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        [HttpPost]
        public JsonResult ActualizarSolicitudesMasivoJson(IList<string> Solicitudes, string TipoDeSolicitud, string AplicaMalEscalado, string DetalleMalEscalado, string Gestion, string Estado, string FechaAgenda, string Observaciones)
        {
            try
            {
                if (TipoDeSolicitud == "--SELECCIONE--" || AplicaMalEscalado == "--SELECCIONE--" || DetalleMalEscalado == "--SELECCIONE--" || Gestion== "--SELECCIONE--") {
                    return new JsonResult
                    {
                        Data = JsonConvert.SerializeObject("Debes seleccionar algun valor"),
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
                else
                {
                    BEPSolicitudes Solicitud = new BEPSolicitudes();
                    Solicitud.UsuarioQueSolicita = Convert.ToString(Session["Usuario"].ToString());
                    Solicitud.NombreUsuarioQueSolicita = Session["NombreUsuario"].ToString();
                    Solicitud.TipoDeSolicitud = TipoDeSolicitud;
                    Solicitud.Malescalado = AplicaMalEscalado;
                    Solicitud.DetalleMalEscalado = DetalleMalEscalado;
                    Solicitud.Gestion = Gestion;
                    Solicitud.EstadoEscalamiento = Estado;
                    if (FechaAgenda != "")
                    {
                        Solicitud.FechaDeAgenda = Convert.ToDateTime(FechaAgenda);
                    }
                    Solicitud.Observaciones = Observaciones;


                    backeliteservice.ActualizarSolicitudesMasivo(Solicitudes.ToList(), Solicitud);

                    return new JsonResult
                    {
                        Data = JsonConvert.SerializeObject("Datos Actualizados Correctamente"),
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                } 
            }
            catch (Exception e)
            {
                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(e.Message),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
        }
        [HttpPost]
        public ActionResult ActualizarZolicitudesMasivo(ViewModelBackElite modelo)
        {
            return RedirectToAction("CierreMasivo", "BackElite");
        }

    }
}