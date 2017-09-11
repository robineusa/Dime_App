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
    public class AdminUsuariosController : MyController
    {

        private WSD.LoginServiceClient loginService;

        public AdminUsuariosController()
        {
            loginService = new WSD.LoginServiceClient();
            loginService.ClientCredentials.Authenticate();
        }

        // GET: AdminUsuarios

        [HttpGet]
        public ActionResult Creacion()
        {   ViewModelAdminUsuario model = new ViewModelAdminUsuario();
            return View(model);
        }


        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Creacion(ViewModelAdminUsuario model, string opcionMando)
        { 
           
            ViewBag.UsuarioExiste = null;

            if (opcionMando.Equals("ExecProc"))
            {
                loginService.EjecutraProcedimiento();
                ViewBag.UsuarioExiste = "Se Actualizo BD Personal";
            }

            if (opcionMando.Equals("ConsultarCreando"))
            {
                if (loginService.RecibirIdUsuario(model.UsuarioHolos.Cedula) != 0)
                {
                    ViewBag.UsuarioExiste = "El usuario ya se encuentra registrado en DIME";
                    ViewBag.Valida2 = "Usuario existente 2";
                }
                else
                {
                    ViewBag.UsuarioExiste = "El usuario no se encuentra registrado en DIME";
                    model.UsuarioHolos = loginService.ConsultarUsuarioHolos(model.UsuarioHolos.Cedula);
                    if (model.UsuarioHolos == null) ViewBag.UsuarioExiste = "El usuario no se encuentra registrado en HOLOS";
                }
                  
            }

            if (opcionMando.Equals("ConsultarConsulta"))
            {
                ViewBag.SegundaPestañaAbierta = "True";
                int idUsuario = loginService.RecibirIdUsuario(model.UsuarioHolos.Cedula);
                if (idUsuario != 0)
                {
                    ViewBag.Valida = "Usuario existente";
                    model.UsuarioHolos = loginService.ConsultarUsuarioHolos(model.UsuarioHolos.Cedula);
                    model.NombreLinea = loginService.LineaDeUsuario(idUsuario);
                    model.NombrePerfil= loginService.PerfilDeUsuario(idUsuario);
                }
                else
                {
                    ViewBag.UsuarioExiste = "El usuario no se encuentra registrado en DIME";
                    model.UsuarioHolos = null;
                }

            }

            if (opcionMando.Equals("CrearUsuario"))
            {
                if (model.UsuarioHolos.Aliado != null && model.UsuarioHolos.Cedula != 0)
                {
                    if (model.IdLinea != 0 && model.IdPerfil != 0 && model.Contraseña != "")
                    {
                        string[] permisos = model.PermisosOtorgados.Split('-');
                        List<string> listaPermisos = permisos.OfType<string>().ToList();
                        loginService.CrearUsuario(model.IdLinea, model.IdPerfil, model.UsuarioHolos, listaPermisos, model.Contraseña, Session["IdUsuario"].ToString());
                        ViewBag.UsuarioExiste = "Usuario creado exitosamente";
                        model.UsuarioHolos = null;
                    }
                    else { ViewBag.UsuarioExiste = "Debe seleccionar el Perfil, Nombre Line y Contraseña antes de guardar"; }
                } else { ViewBag.UsuarioExiste = "Debe consultar primero el usuario a crear"; }
            }
            if (model.UsuarioHolos == null) {
                 model = new ViewModelAdminUsuario();
            } 
            return View(model);
        }
                
        [HttpGet]
        public ActionResult AccesosUsuarios()
        {
            ViewModelAdminUsuario model = new ViewModelAdminUsuario();
            return View(model);
        }



       
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AccesosUsuarios(ViewModelAdminUsuario model, string opcionMando)
        {

           
            ViewBag.UsuarioExiste = null;
            if (opcionMando.Equals("ConsultaActualizarAcceso"))
            {
                int idUsuario = loginService.RecibirIdUsuario(model.UsuarioHolos.Cedula);
                if (idUsuario != 0)
                {

                    if (loginService.ConsultarUsuarioHolos(model.UsuarioHolos.Cedula)!= null )
                    {

                        model.UsuarioHolos = loginService.ConsultarUsuarioHolos(model.UsuarioHolos.Cedula);
                        model.IdPerfil = loginService.IdPerfilDeUsuario(idUsuario);
                        model.NombreLinea = loginService.LineaDeUsuario(idUsuario);
                        model.IdLinea = loginService.IdLineaDeUsuario(idUsuario);
                    }
                    else
                    {
                        model.UsuarioHolos = new BasePersonalHolo();
                        model.IdPerfil = 0;
                        model.NombreLinea = "Vacio";
                        model.IdLinea = 0;
                        ViewBag.UsuarioNoHolos = "El usuario no se encuentra registrado en Holos";
                    }
                   
                }
                else
                {
                    ViewBag.UsuarioExiste = "El usuario ingresado no existe ";
                }
            }

            if(opcionMando.Equals("ActualizarAcceso"))
            {
                if (model.UsuarioHolos.Aliado != null)
                {
                    string[] permisos;
                    List<string> listaPermisos = new List<string>();
                    if (model.PermisosOtorgados != null)
                    {
                        permisos = model.PermisosOtorgados.Split('-');
                        listaPermisos = permisos.OfType<string>().ToList();
                    }
                    int idUsuario = loginService.RecibirIdUsuario(model.UsuarioHolos.Cedula);
                    if (idUsuario != 0)
                    {
                        loginService.ActualizarAccesosUsuario(idUsuario, model.IdPerfil, model.IdLinea, listaPermisos, model.Contraseña, Session["IdUsuario"].ToString());
                        model = new ViewModelAdminUsuario();
                        ViewBag.UsuarioExiste = "El usuario ha sido actualizado ";
                    }
                    else
                    {
                        ViewBag.UsuarioExiste = "El usuario ingresado no existe ";
                    }
                }
                else { ViewBag.UsuarioExiste = "Consulte primero el usuario "; }
            }
          if (opcionMando.Equals("ActualizarAccesosMasivos"))
            {
                string[] permisos = model.PermisosOtorgadosMasivos.Split('-');
                List<string> listaPermisos = permisos.OfType<string>().ToList();
                List<string> listaUsuariosCambiados = model.UsuariosACambiarMasivo.Split('-').OfType<string>().ToList();
                if (model.UsuariosACambiarMasivo.Count() > 0)
                {
                   loginService.ActualizarAccesosUsuarioMasivo(listaUsuariosCambiados, model.IdLineaMasivo, listaPermisos, Session["IdUsuario"].ToString());
                    model = new ViewModelAdminUsuario();
                    ViewBag.UsuarioExiste = "Actualización realizada";
                }
                else
                {
                    ViewBag.UsuarioExiste = "El usuario ingresado no existe ";
                }
            }

            return View(model);
        }

        [HttpGet]
        public JsonResult PosiblesAccesosYLineasDePerfil(int idPerfil)
        {

            var result = new
            {
                lineas = loginService.ListaLineasDePerfil(idPerfil),
                accesos = loginService.ListaAccesosDePerfil(idPerfil)
            };
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public JsonResult PosiblesAccesosDeLineas(int idLinea)
        {
            var result = new
            {
                lineas = "",
                accesos = loginService.ListaAccesosDeLinea(idLinea)
            };
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        [HttpGet]
        public JsonResult JsonUsuariosDeAliadoYPerfil(string aliado, int idPerfil)
        {
           
            var result = loginService.ListaUsuariosDePerfilYAliado(idPerfil, aliado);
            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }



        [HttpGet]
        public JsonResult PosiblesAccesosDeUsuario(int cedUsuario)
        {
            if (cedUsuario != 0 )
            {
                
                var result = new
                {
                    accesos = loginService.ListaAccesosDeUsuario(cedUsuario)
                };
                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(result),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
            return new JsonResult
            {
            };
        }

        
        [HttpGet]
        public ViewResult UsuariosMasivos()
        {
            return View("AdminUsuariosMasivo");
        }
                
        [HttpPost]
        public JsonResult CotejarInformacionMasivo(IList<string> cedulas)
        {
            

            var result0 = loginService.ListaDatosUsuariosHolosPorCedulas(cedulas.ToList());
            var cedulasSinError = result0.Where(c => c.InfoRegistro  == null );
            bool datosValidos = cedulasSinError.ToList().Count == result0.ToList().Count;
            var result = new
            {   DataUsuario = result0,
                DataValid = datosValidos
             };

            return new JsonResult
            {
                Data = JsonConvert.SerializeObject(result),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }
        
        [HttpPost]
        public JsonResult GuardarUsuariosMasivos(IList<string> cedulas, string accesosCrear, int perfilCrear, int lineaCrear, string contraMasiva  )
        {
            try
            { 
           
            string[] permisos = accesosCrear.Split('-');
            List<string> listaPermisos = permisos.OfType<string>().ToList();
            loginService.GuardarUsuariosMasivosConAccesos(cedulas.ToList(), listaPermisos, perfilCrear, lineaCrear, contraMasiva,Convert.ToInt32(Session["IdUsuario"]));

                return new JsonResult
            {
                Data = JsonConvert.SerializeObject("Datos correctamente creados"),
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };

            }catch(Exception e)
            {
                return new JsonResult
                {
                    Data = JsonConvert.SerializeObject(e.Message),
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };
            }
        }

        //[HttpPost]
        //public JsonResult ConsultaUsuariosAccesosMasivos(IList<string> cedulas)
        //{
        //    var result0 = loginService.ListaDatosUsuariosDimePorCedulas(cedulas.ToList());
        //    //var cedulasSinError = result0.Where(c => c.InfoRegistro == null);
        //    bool datosValidos = result0.ToList().Count == result0.ToList().Count;
        //    var result = new
        //    {
        //        DataUsuario = result0,
        //        DataValid = datosValidos
        //    };

        //    return new JsonResult
        //    {
        //        Data = JsonConvert.SerializeObject(result),
        //        JsonRequestBehavior = JsonRequestBehavior.AllowGet
        //    };
        //}

        [HttpPost]
        public JsonResult ConsultaUsuariosAccesosMasivos(IList<string> cedulas)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(loginService.ListaDatosUsuariosDimePorCedulas(cedulas.ToList())), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

    }
}
