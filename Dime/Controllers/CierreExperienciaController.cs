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
        [HttpGet]
        public ActionResult Desconexiones(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            ViewBag.Asignacion = null;
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            if (IdGestion == null || IdGestion.Equals(""))
            {
                modelo.CEPAsigDesconexiones = CierreService.ApartarCuentadeDesconexiones(Usuario,0);
                if (modelo.CEPAsigDesconexiones != null)
                {
                    modelo.CEPDesconexiones.CanalDeIngreso = modelo.CEPAsigDesconexiones.CanalDeIngreso;
                    modelo.CEPDesconexiones.CuentaCliente = modelo.CEPAsigDesconexiones.CuentaCliente;
                    modelo.CEPDesconexiones.Nota1 = modelo.CEPAsigDesconexiones.Nota1;
                    modelo.CEPDesconexiones.Nota2 = modelo.CEPAsigDesconexiones.Nota2;
                    modelo.CEPDesconexiones.FechaDeSolicitud = modelo.CEPAsigDesconexiones.FechaDeSolicitud;
                    modelo.CEPDesconexiones.FechaDeCorte = modelo.CEPAsigDesconexiones.FechaDeCorte;
                    modelo.CEPDesconexiones.FechaDePreaviso = Convert.ToDateTime(modelo.CEPAsigDesconexiones.FechaDePreaviso);
                    modelo.CEPDesconexiones.FechaDeAsignacion = Convert.ToDateTime(modelo.CEPAsigDesconexiones.FechaDeAsignacion);
                    
                }
                else
                {
                    ViewBag.Asignacion = "No Existen Mas Registros Cargados";
                }
            }
            else
            {
                modelo.CEPDesconexiones = CierreService.TraeDesconexionPorId(Convert.ToDecimal(IdGestion));
                modelo.CEPDesconexiones.Observaciones = "";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Desconexiones(ViewModelCierreExperiencia modelo)
        {
            modelo.CEPDesconexiones.UsuarioDeGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.CEPDesconexiones.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            if (modelo.CEPDesconexiones.IdGestion > 0) {
                CierreService.ActualizarDesconexion(modelo.CEPDesconexiones);
            }
            else
            {
                CierreService.RegistrarDesconexion(modelo.CEPDesconexiones, Convert.ToDecimal(modelo.CEPAsigDesconexiones.Id));
            }
            return RedirectToAction("Desconexiones", "CierreExperiencia");
        }
        [HttpGet]
        public ActionResult DesconexionesIn(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            ViewBag.Asignacion = null;
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            if (IdGestion == null || IdGestion.Equals(""))
            {
               
            }
            else
            {
                modelo.CEPDesconexiones = CierreService.TraeDesconexionPorId(Convert.ToDecimal(IdGestion));
                modelo.CEPDesconexiones.Observaciones = "";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DesconexionesIn(ViewModelCierreExperiencia modelo)
        {
            modelo.CEPDesconexiones.UsuarioDeGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.CEPDesconexiones.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            if (modelo.CEPDesconexiones.IdGestion > 0)
            {
                CierreService.ActualizarDesconexion(modelo.CEPDesconexiones);
            }
            else
            {
                CierreService.RegistrarDesconexion(modelo.CEPDesconexiones, Convert.ToDecimal(modelo.CEPAsigDesconexiones.Id));
            }
            return RedirectToAction("DesconexionesIn", "CierreExperiencia");
        }
        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            CEPDesconexiones clientegestionado = new CEPDesconexiones();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            decimal cuenta = Convert.ToDecimal(CuentaCliente);
            clientegestionado = CierreService.ConsultarCuentaDesconexionporCuenta(cuenta);

            if (clientegestionado != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clientegestionado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                clientegestionado = new CEPDesconexiones();
                clientegestionado.IdGestion = 0;
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clientegestionado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        public ActionResult ConsultaGestionUsuario()
        {
            return View();
        }
        public JsonResult TraerInformacionCliente2(int CuentaCliente)
        {
            CEPAsigDesconexiones clienteasignado = new CEPAsigDesconexiones();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            decimal cuenta = Convert.ToDecimal(CuentaCliente);
            clienteasignado = CierreService.ValidarCuentaAsignada(Usuario, 0, cuenta);

            if (clienteasignado != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clienteasignado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                ClientesTodo Cliente = new ClientesTodo();
                clienteasignado = new CEPAsigDesconexiones();
                Cliente = inboundservice.TraerClienteCompletoPorCuenta(CuentaCliente);
                if (Cliente != null)
                {
                    clienteasignado.Nota1 = Convert.ToString(Cliente.Cuenta + " - TEL: " + Cliente.Telefono1 + " - " + Cliente.Telefono2 + " - " + Cliente.Telefono3);
                    clienteasignado.Nota2 = Convert.ToString(Cliente.Nombre + " " + Cliente.Apellido);
                }
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clienteasignado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        public JsonResult ListaDeGestionDesconexionesAgente()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaDeGestionAgenteCierreExperiencia(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeSeguimientosDesconexionesAgente()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSeguimientosAgenteCierreExperiencia(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ArbolesDeTipificacionDesconexion(int IdPadre)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(CierreService.ArbolDeGestionAgente(IdPadre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult TraerDatosDelArbol(decimal IdArbol)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.TraerArbolCierreExperienciaPorId(IdArbol)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        [HttpGet]
        public ActionResult Tickets(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            if (IdGestion == null || IdGestion.Equals(""))
            {
                
            }
            else
            {
                modelo.CEPTickets = CierreService.ConsultaDeTicketPorNumero(Convert.ToDecimal(IdGestion));
                modelo.CEPTickets.Observaciones = "";
            }
               
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Tickets(ViewModelCierreExperiencia modelo)
        {
            modelo.CEPTickets.UsuarioDeGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.CEPTickets.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            if (modelo.CEPTickets.IdGestion > 0)
            {
                CierreService.ActualizarTicket(modelo.CEPTickets);
            }
            else
            {
                CierreService.RegistrarTicketBase(modelo.CEPTickets);
            }
            return RedirectToAction("Tickets", "CierreExperiencia");
        }
        [HttpGet]
        public ActionResult SuspensionesTemporales(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            ViewBag.Asignacion = null;
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            if (IdGestion == null || IdGestion.Equals(""))
            {
                modelo.CEPAsigSuspensiones = CierreService.ApartarCuentadeSuspensiones(Usuario, 0);
                if (modelo.CEPAsigSuspensiones != null)
                {
                    modelo.CEPSuspensiones.CanalDeIngreso = modelo.CEPAsigSuspensiones.CanalDeIngreso;
                    modelo.CEPSuspensiones.CuentaCliente = modelo.CEPAsigSuspensiones.CuentaCliente;
                    modelo.CEPSuspensiones.FechaCreacion = modelo.CEPAsigSuspensiones.FechaCreacion;
                    modelo.CEPSuspensiones.UsuarioCreacion = modelo.CEPAsigSuspensiones.UsuarioCreacion;
                }
                else
                {
                    ViewBag.Asignacion = "No Existen Mas Registros Cargados";
                }
            }
            else
            {
                modelo.CEPSuspensiones = CierreService.TraeSuspensionPorId(Convert.ToDecimal(IdGestion));
                modelo.CEPSuspensiones.Observaciones = "";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuspensionesTemporales(ViewModelCierreExperiencia modelo)
        {
            modelo.CEPSuspensiones.UsuarioDeGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.CEPSuspensiones.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            if (modelo.CEPSuspensiones.IdGestion > 0)
            {
                CierreService.ActualizarSuspencion(modelo.CEPSuspensiones);
            }
            else
            {
                CierreService.RegistrarSuspencion(modelo.CEPSuspensiones,modelo.CEPAsigSuspensiones.IdAsignacion);
            }
            return RedirectToAction("SuspensionesTemporales", "CierreExperiencia");
        }
        [HttpGet]
        public ActionResult SuspensionesTemporalesIn(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            if (IdGestion == null || IdGestion.Equals(""))
            {

            }
            else
            {
                modelo.CEPSuspensiones = CierreService.TraeSuspensionPorId(Convert.ToDecimal(IdGestion));
                modelo.CEPSuspensiones.Observaciones = "";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SuspensionesTemporalesIn(ViewModelCierreExperiencia modelo)
        {
            modelo.CEPSuspensiones.UsuarioDeGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.CEPSuspensiones.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            if (modelo.CEPSuspensiones.IdGestion > 0)
            {
                CierreService.ActualizarSuspencion(modelo.CEPSuspensiones);
            }
            else
            {
                CierreService.RegistrarSuspencion(modelo.CEPSuspensiones, Convert.ToDecimal(modelo.CEPAsigSuspensiones.IdAsignacion));
            }
            return RedirectToAction("SuspensionesTemporalesIn", "CierreExperiencia");
        }
        [HttpGet]
        public ActionResult ListaArboles(string IdPadre)
        {
            CEMArbolesDeGestion modelo = new CEMArbolesDeGestion();
            modelo.IdPadre = Convert.ToDecimal(IdPadre);
            return View(modelo);
        }
        [HttpGet]
        public ActionResult AdministrarArboles(string IdPadre, string IdArbol)
        {
            CEMArbolesDeGestion modelo = new CEMArbolesDeGestion();
            decimal Padre = Convert.ToDecimal(IdPadre);
            decimal Id = Convert.ToDecimal(IdArbol);
            if (Id > 0)
            {
                modelo = CierreService.TraerArbolCierreExperienciaPorId(Id);
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdministrarArboles(CEMArbolesDeGestion modelo)
        {
            if (modelo.IdArbol > 0)
            {
                CierreService.ActualizarArbolCierreExperiencia(modelo);
            }
            else
            {
                CierreService.RegistrarNuevoArbolCierreExperiencia(modelo);
            }
            return RedirectToAction("ListaArboles", "CierreExperiencia", new { IdPadre = modelo.IdPadre });
        }
        public JsonResult ArbolesDeTipificacionaAdmin(int IdPadre)
        {

            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(CierreService.ListasDeArbolesCierreExperienciaAdmin(IdPadre)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult RetornarPagina(int IdArbol)
        {
            CEMArbolesDeGestion Arbol = new CEMArbolesDeGestion();
            Arbol = CierreService.TraerArbolCierreExperienciaPorId(IdArbol);
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(Arbol.IdPadre),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult ConsultaDeGestionDesconexionesJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            decimal usuario = Convert.ToDecimal(Session["Usuario"]);

            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ConsultaDeGestionDesconexionesAgente(FechaInicial, FechaFinal,usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeGestionAgenteTickets()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaDeGestionAgenteTicketsCierreExperiencia(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeSeguimientosAgenteTickets()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSeguimientosAgenteTicketCierreExperiencia(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult TraerInformacionClienteTicket(int CuentaCliente)
        {
            ClientesTodo Cliente = new ClientesTodo();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            Cliente = inboundservice.TraerClienteCompletoPorCuenta(CuentaCliente);

            if (Cliente != null)
            {
                CEPTickets ticket = new CEPTickets();
                ticket.Nota1 = Convert.ToString(Cliente.Cuenta + " - TEL: " + Cliente.Telefono1 + " - " + Cliente.Telefono2 + " - " + Cliente.Telefono3);
                ticket.Nota2 = Convert.ToString(Cliente.Nombre + " " + Cliente.Apellido);
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(ticket),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                Cliente = new ClientesTodo();
                CEPTickets ticket = new CEPTickets();
                ticket.Nota1 = "";
                ticket.Nota2 = "";

                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(ticket),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        public JsonResult ListaSrcaus()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSrcaus()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaSrreas(string Razon)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSrreas(Razon)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeMarcaciones()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaMarcacionesTickets()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultarTicketBaseDeGestion(decimal Ticket)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ConsultaDeTicketPorTicket(Ticket)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeGestionAgenteSuspensiones()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaDeGestionAgenteSuspensiones(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeSeguimientosAgenteSuspensiones()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSeguimientosAgenteSuspensiones(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ValidarGestionDeClienteEnSuspensiones(int CuentaCliente)
        {
            CEPSuspensiones clientegestionado = new CEPSuspensiones();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            decimal cuenta = Convert.ToDecimal(CuentaCliente);
            clientegestionado = CierreService.ConsultarGestionCuentaSuspensiones(cuenta);

            if (clientegestionado != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clientegestionado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                clientegestionado = new CEPSuspensiones();
                clientegestionado.IdGestion = 0;
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clientegestionado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        public JsonResult ValidarAsignacionDeClienteEnSuspensiones(int CuentaCliente)
        {
            CEPAsigSuspenciones clienteasignado = new CEPAsigSuspenciones();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            decimal cuenta = Convert.ToDecimal(CuentaCliente);
            clienteasignado = CierreService.ValidarCuentaAsigSuspension(Usuario,cuenta);

            if (clienteasignado != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clienteasignado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                clienteasignado = new CEPAsigSuspenciones();
                clienteasignado.IdAsignacion = 0;
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clienteasignado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
        public JsonResult ConsultaDeGestionTicketsJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            decimal usuario = Convert.ToDecimal(Session["Usuario"]);

            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ConsultaLogDeGestionTicketsAgente(FechaInicial, FechaFinal, usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public ActionResult ConsultaGestionTickets()
        {
            return View();
        }
        public ActionResult ConsultaGestionSuspensiones()
        {
            return View();
        }
        public JsonResult ConsultaDeGestionSuspensionesJson(string F1, string F2)
        {
            DateTime FechaInicial = Convert.ToDateTime(F1);
            DateTime FechaFinal = Convert.ToDateTime(F2);
            decimal usuario = Convert.ToDecimal(Session["Usuario"]);

            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ConsultaLogDeGestionSuspensionesAgente(FechaInicial, FechaFinal, usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult LiberacionesDeHomePass(string IdGestion)
        {
            ViewModelCierreExperiencia modelo = new ViewModelCierreExperiencia();
            
            if (IdGestion == null || IdGestion.Equals(""))
            {

            }
            else
            {
                modelo.CEPLiberaciones = CierreService.TraeLiberacionPorId(Convert.ToDecimal(IdGestion));
                modelo.CEPLiberaciones.Observaciones = "";
            }
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LiberacionesDeHomePass(ViewModelCierreExperiencia modelo)
        {
            modelo.CEPLiberaciones.UsuarioDeGestion = Convert.ToDecimal(Session["Usuario"]);
            modelo.CEPLiberaciones.NombreUsuarioGestion = Session["NombreUsuario"].ToString();

            if (modelo.CEPLiberaciones.IdGestion > 0)
            {
                CierreService.ActualizarLiberaciones(modelo.CEPLiberaciones);
            }
            else
            {
                CierreService.RegistrarLiberaciones(modelo.CEPLiberaciones);
            }
            return RedirectToAction("LiberacionesDeHomePass", "CierreExperiencia");
        }
        public JsonResult ListaDeGestionAgenteLiberaciones()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaDeGestionAgenteLiberaciones(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDeSeguimientosAgenteLiberaciones()
        {
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            var jsonResult = Json(JsonConvert.SerializeObject(CierreService.ListaSeguimientosAgenteLiberaciones(Usuario)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ValidarGestionDeClienteEnLiberaciones(int CuentaCliente)
        {
            CEPLiberaciones clientegestionado = new CEPLiberaciones();
            decimal Usuario = Convert.ToDecimal(Session["Usuario"]);
            decimal cuenta = Convert.ToDecimal(CuentaCliente);
            clientegestionado = CierreService.ConsultarGestionCuentaLiberaciones(cuenta);

            if (clientegestionado != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clientegestionado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                clientegestionado = new CEPLiberaciones();
                clientegestionado.IdGestion = 0;
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(clientegestionado),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
    }
}