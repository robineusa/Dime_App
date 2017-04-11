using Dime.Helpers;
using Dime.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;
using static Dime.Controllers.ManageController;

namespace Dime.Controllers
{

    public enum IDS_MODOS_ACCESOS
    {
        IngresoAdministrador = (int)41,
        IngresoAsesor = (int)42,
        IngresoCelula = (int)43,

    }
    public class AccountController : Controller
    {
        private WSD.LoginServiceClient loginService;
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController()
        {
            loginService = new WSD.LoginServiceClient();
            loginService.ClientCredentials.Authenticate();
        }


         [AllowAnonymous]
        public ActionResult RecordarContrasena()
        {
            return View();
        }

        [AllowAnonymous]
        public PartialViewResult ObtenerRecordarContra(string cedula)
        {
            List<string> preguntasIngreso;
            decimal temp;
            decimal? cedulaDecimal = decimal.TryParse(cedula, out temp) ? temp : default(decimal?);
            int idUsuario = loginService.RecibirIdUsuario(cedulaDecimal);
            if (idUsuario != 0)
            {
                preguntasIngreso = loginService.ObtenerPreguntasRegistradas(idUsuario);
                ViewBag.Id = idUsuario;
                return PartialView("SRecordarcontraseña", preguntasIngreso);
            }
            else
            {
                return PartialView("_ErrorView", "El usuario ingresado no existe, actualice la página para intentar de nuevo");
            }
        }


        [AllowAnonymous]
        public ActionResult SRecordarContraseña()
        {
            return View("Login");
        }




        [AllowAnonymous]
        public PartialViewResult RestablecerContraseña(List<string> respuestas, string id)
        {

            int idUsuario = int.Parse(id);
            if ( idUsuario != 0)
            {
                if (loginService.RespuestasValidas(respuestas, idUsuario))
                {
                    ViewBag.Id = idUsuario;
                    Session["UserBackward"] = idUsuario;
                    return PartialView("RestablecerContraseña");
                }
                else
                {
                    return PartialView("_ErrorView", "Las respuestas ingresadas no son válidas, actualice la página para intentar de nuevo");
                }
            }
            else
            {
                return PartialView("_ErrorView", "El usuario ingresado no existe, actualice la página para intentar de nuevo");
            }
        }

        [AllowAnonymous]
        public ActionResult ContraseñaCaducada()
        {
            ViewBag.Id = Session["UserBackward"].ToString();
            return View();
        }

        [AllowAnonymous]
        public PartialViewResult RegistrarNuevaContraseña(string contrasena, string id)
        {
 
            int idUsuario = int.Parse(id);
            if (idUsuario != 0)
            {
                if (loginService.RestablecerContraseña(contrasena, idUsuario))
                    return PartialView("_ErrorView", "Su contraseña fue restablecida satisfactoriamente, pulsa continuar para iniciar sesión nuevamente");
            }
            else
            {
                return PartialView("_ErrorView", "El usuario ingresado no existe, actualice la página para intentar de nuevo");
            }
            return PartialView("_ErrorView", "Error desconocido");
        }

        [AllowAnonymous]
        public ActionResult RegistroPreguntasDesbloqueo(string idPassed, string datosFullUsuario, string sesionUsuario )
        {

            ViewBag.IdUsuario = idPassed;
            ViewBag.DatosFullUsuario = datosFullUsuario;
            ViewBag.SesionUsuario = sesionUsuario;
            return View();
        }

        [AllowAnonymous]
        public PartialViewResult SRegistroPreguntasDesbloqueo(string idUsuario, string datosFullUsuario, string sesionUsuario)
        {

            List<PreguntasDesbloqueo> opcionesPreguntas = loginService.ObtenerPosiblesPreguntas();
            List<SelectListItem> selectItems = new List<SelectListItem>();
            ViewBag.IdUsuario = idUsuario;
            ViewBag.DatosFullUsuario = datosFullUsuario;
            ViewBag.SesionUsuario = sesionUsuario;
            foreach(var item in opcionesPreguntas)
            {       selectItems.Add(new SelectListItem {
                    Text = item.Nombre,
                    Value = item.Id.ToString()
                });
            }
            return PartialView(selectItems);
        }


        [AllowAnonymous]
        public ActionResult SRegistroPreguntasDesbloqueoConfirmation(List<string> respuestas, List<string> preguntas,  string idUsuario, string datosFullUsuario, string sesionUsuario )
        {
            List<PreguntasDesbloqueo> preguntasDesbloqueo = new List<PreguntasDesbloqueo>();
            foreach (var item in preguntas)
            { preguntasDesbloqueo.Add(new PreguntasDesbloqueo() { Id = Convert.ToInt32(item) });
            }
            loginService.RegistrarActualizarPreguntas(preguntasDesbloqueo, respuestas, new Usuario() { Id = Convert.ToInt32(idUsuario) }, 5);

            if (datosFullUsuario == "True")
            {
                bool existeUsuarioEnHolos = false;
                RegistrarVariablesDeSesion(Convert.ToInt32(idUsuario), out existeUsuarioEnHolos);
                if (existeUsuarioEnHolos == false)
                {
                    ViewBag.Error = "El usuario no registra en la base personal holos como activo";
                    return View("Login");
                }
                switch (Convert.ToInt32(sesionUsuario))
                         {
                    case (int)IDS_MODOS_ACCESOS.IngresoAdministrador:
                                return Json(Url.Action("ReporteAdministrador", "Reportes"));
                    case (int)IDS_MODOS_ACCESOS.IngresoAsesor:
                         return  Json(Url.Action("ReporteAsesor", "Reportes"));
                    case (int)IDS_MODOS_ACCESOS.IngresoCelula:
                        return   Json(Url.Action("ReporteCelula", "Reportes"));
                    default:
                          ModelState.AddModelError("", "Código de ingreso del usuario no valido");
                             return View();
                            }
               }
            if (sesionUsuario.Equals("0")) return Json(Url.Action("Index", "Manage", new { message = ManageMessageId.ChangeQuestionsSuccess })); 

           return  Json(Url.Action("RegistroDatosUsuario", "Account", new {idUsuario = idUsuario, sesionUsuario= sesionUsuario }));
        }



        [AllowAnonymous]
        [HttpGet]
        public JsonResult UnlockScreen(string cedula, string contra)
        {
            Usuario usuario = new Usuario();
            usuario.Id = (int)loginService.RecibirIdUsuario(Convert.ToDecimal(cedula));
            usuario.Cedula = Convert.ToDecimal(cedula);
            usuario.Contrasena = contra;
            int sesion = loginService.AutenticarUsuarioEnSesion(usuario);
            if (sesion != 0 && sesion != -1)
            {
                bool existeUsuarioEnHolos = true;
                RegistrarVariablesDeSesion(usuario.Id, out existeUsuarioEnHolos);
                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(true),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet

                };
            }else
            {
                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(false),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet

                };
            }
        }

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(Usuario mUsuario)
        {

            if (mUsuario.Cedula != null && mUsuario.Contrasena != null)
            {
                mUsuario.Id = (int)loginService.RecibirIdUsuario(mUsuario.Cedula);
                bool existeUsuarioEnHolos = false;
                //-1 bloqueado, diferente a 0 la sesion que tiene acceso
                if (mUsuario.Id != 0 )
                {
                    int sesion = loginService.AutenticarUsuarioEnSesion(mUsuario);
                    if (sesion != 0 && sesion != -1)
                    {
                        RegistrarVariablesDeSesion(mUsuario.Id, out existeUsuarioEnHolos);
                        if(existeUsuarioEnHolos == false)
                        {
                            ViewBag.Error = "El usuario no registra en la base personal holos como activo";
                            return View("Login");
                        }
                        if (loginService.ContraseñaCaducada(mUsuario.Id)) { Session["UserBackward"] = mUsuario.Id;   return RedirectToAction("ContraseñaCaducada", "Account"); }
                        bool registroCompletoPreguntas = loginService.PreguntasDesbloqueoCompletas(mUsuario.Id);
                        bool datosCompletoUsuario = loginService.DatosUsuarioCompleto(mUsuario.Id);
                        if (registroCompletoPreguntas && datosCompletoUsuario)
                        {
                            RegistrarVariablesDeSesion(mUsuario.Id, out existeUsuarioEnHolos);
                            if (existeUsuarioEnHolos == false)
                            {
                                ViewBag.Error = "El usuario no registra en la base personal holos como activo";
                                return View("Login");
                            }

                            if (!loginService.Capacitado(mUsuario.Id)) return RedirectToAction("Presentacion", "Account", new {sesion = sesion, id= mUsuario.Id });

                            switch (sesion)
                            {
                                case (int)IDS_MODOS_ACCESOS.IngresoAdministrador:
                                    return RedirectToAction("ReporteAdministrador", "Reportes");
                                case (int)IDS_MODOS_ACCESOS.IngresoAsesor:
                                    return RedirectToAction("ReporteAsesor", "Reportes");
                                case (int)IDS_MODOS_ACCESOS.IngresoCelula:
                                     return RedirectToAction("ReporteCelula", "Reportes");
                                default:
                                    ModelState.AddModelError("", "Código de ingreso del usuario no valido");
                                    return View(mUsuario);
                            }

                        }else
                        {
                            if (!registroCompletoPreguntas)  return RedirectToAction("RegistroPreguntasDesbloqueo", "Account", new { idPassed =mUsuario.Id , datosFullUsuario = datosCompletoUsuario.ToString(), sesionUsuario = sesion});
                            if(!datosCompletoUsuario) return RedirectToAction("RegistroDatosUsuario", "Account", new { idUsuario = mUsuario.Id, sesionUsuario = sesion });
                        }

                    }
                    else
                    {
                        if (Session["Intentos"] == null) Session["Intentos"] = 1; else Session["Intentos"] = (int.Parse(Session["Intentos"].ToString()) + 1);
                        Debug.Print(Session["Intentos"].ToString(), Session["Intentos"].ToString());
                        if (int.Parse(Session["Intentos"].ToString()) > 2)
                        {
                            loginService.BloquearUsuario(mUsuario.Id, mUsuario.Id, Session["IpPrivada"].ToString(), Session["IpPublica"].ToString());
                        }
                        if (sesion == -1) ViewBag.Error = "El usuario se encuentra bloqueado";
                        else
                            ViewBag.Error = "La contraseña ingresada no es valida";
                        return View("Login");
                    }
                }
                else
                { 
                    ViewBag.Error = "El usuario no se encuentra registrado";
                    return View("Login");
                }
            }
            return View("Login");
        }


        [AllowAnonymous]
        public ActionResult RegistroDatosUsuario(string idUsuario, string sesionUsuario)
        {
            ViewBag.IdUsuario = idUsuario;
            ViewBag.Sesion = sesionUsuario;
            return View();
        }

        [AllowAnonymous]
        public PartialViewResult SRegistroDatosUsuario(string idUsuario, string sesionUsuario)
        {
            Usuario usuario = new Usuario();
            usuario.Id = Convert.ToInt32(idUsuario);
            usuario.Contrasena = sesionUsuario;
            IEnumerable<String> genderOptions = new List<string>() {"--Seleccione--", "M", "F"};
            ViewBag.GenderOptions = genderOptions;
            ViewBag.Sesion = sesionUsuario;
            return PartialView(usuario);
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult SRegistroDatosUsuarioConfirmation(Usuario model)
        {  
            loginService.RegistrarActualizarDatosUsuario(model);
           
            if (!loginService.Capacitado(model.Id)) return RedirectToAction("Presentacion", "Account", new { sesion = model.Contrasena, id = model.Id });
            if (Session["IdUsuario"] != null) return RedirectToAction("Index", "Manage", new { message = ManageMessageId.ChangeDataSuccess });
           return RedirectToAction("Login", "Account");
        }

        [HttpGet]
        [AllowAnonymous]
        public PartialViewResult SLockScreen()
        {
         return PartialView("SLockScreen","Account");
        }

        [AllowAnonymous]
        public void RegistrarVariablesDeSesion(int idUsuario, out bool  usuarioEnHolos)
        {
            Usuario usuarioLogeado = loginService.RecibirUsuarioConId(idUsuario);
            if (loginService.ExisteUsuarioHolos(Convert.ToDecimal(usuarioLogeado.Cedula)))
            {
                string ipPrivada="";
                string ipPublica="";
            usuarioEnHolos = true;
                if(Session["IpPrivada"]!=null)
                {
                     ipPrivada = Session["IpPrivada"].ToString();  ipPublica = Session["IpPublica"].ToString();
                    RegistrarSesionUsuario(ipPrivada, ipPublica, usuarioLogeado.Id);
                }
            Session.Clear();
            Session["IdUsuario"] = usuarioLogeado.Id;
            Session["Usuario"] = Convert.ToInt32(usuarioLogeado.Cedula);
            Session["NombreUsuario"] = usuarioLogeado.Nombre.ToString();
            Session["AliadoLogeado"] = loginService.AliadoDeUsuario(usuarioLogeado.Cedula); //"BRM"
            Session["LineaLogeado"] = loginService.LineaDeUsuarioPorId(Convert.ToInt32(usuarioLogeado.IdLinea));   //  "CELULA VISITA SOPORTE";
            Session["ModoLogin"] = loginService.ModoLoginPorId(Convert.ToInt32(usuarioLogeado.IdLinea));  //1
                if (Session["IpPrivada"] != null)
                {
                    Session["IpPrivada"] = ipPrivada;
                    Session["IpPublica"] = ipPublica;
                }

            List<string> accesosDeUsuario = loginService.ListaAccesosDeUsuario( Convert.ToInt32(usuarioLogeado.Cedula));
            foreach(string acceso in accesosDeUsuario)
            {
                Session[acceso] = 0;
            }
            }else
            {
                usuarioEnHolos = false;
            }
        }

 
        

        [AllowAnonymous]
        [HttpPost]
        public ActionResult  RegistrarSesionUsuario(string ipPrivada, string ipPublica, int idUsuario)
        {       RegistroSesion registroSesion = new RegistroSesion();
                registroSesion.EsIngreso = true;
                registroSesion.IdUsuario = idUsuario;
                registroSesion.IpPrivadaCreacion = ipPrivada;
                registroSesion.IpPublicaCreacion = ipPublica;
                registroSesion.FechaCreacion = DateTime.Now;
                registroSesion.HoraCreacion = DateTime.Now.TimeOfDay;
                loginService.RegistrarSesionUsuario(registroSesion);
                return Json(true);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult AsignarIpsUsuario(string ipPrivada, string ipPublica)
        {
            Session["IpPublica"] = ipPublica;
            Session["IpPrivada"] = ipPrivada;
            return Json(true);
            //realizar try por si no funcionae exception retornar a error
        }



        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

 


        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

  



        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
           
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }



   

        public ActionResult LogOff()
        {
            Session.Clear();
            return RedirectToAction("Login", "Account");
        }




        [AllowAnonymous]
        [HttpGet]
        public ActionResult Presentacion(String sesion, String id)
        {

            ViewBag.Sesion = sesion;
            ViewBag.Id = id;
            return View();
        }


        [AllowAnonymous]
        [HttpPost]
        public ActionResult PresentacionPost(string sesionPassed, string id)
        {
            loginService.CapacitarUsuario(int.Parse(id));

            switch (int.Parse(sesionPassed))
            {
                case (int)IDS_MODOS_ACCESOS.IngresoAdministrador:
                    return RedirectToAction("ReporteAdministrador", "Reportes");
                case (int)IDS_MODOS_ACCESOS.IngresoAsesor:
                    return RedirectToAction("ReporteAsesor", "Reportes");
                case (int)IDS_MODOS_ACCESOS.IngresoCelula:
                    return RedirectToAction("ReporteCelula", "Reportes");
                default:
                    ModelState.AddModelError("", "Código de ingreso del usuario no valido");
                    return View("_ErrorView", "Página no encontrada al redirigir a la plataforma");
            }
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("DashboardAsesor", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}