using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    public class BuenServicioController : Controller
    {
         WSD.NotificacionesBuenServicioServiceClient BuenServicioServices;
        // GET: BuenServicio
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Notificaciones()
        {
            BuenServicioServices = new WSD.NotificacionesBuenServicioServiceClient(); BuenServicioServices.ClientCredentials.Authenticate();
            ViewModelNotificacionesBS modelo = new ViewModelNotificacionesBS();
            modelo.ListaNotificacionesBSGetSet = BuenServicioServices.ListaImagenesBuenServicio();
            return View(modelo);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Notificaciones(HttpPostedFileBase file)
        {
            try
            {
                string path = Path.Combine(Server.MapPath("~/ImagesClient"), Path.GetFileName(file.FileName));
                file.SaveAs(path);
            }
            catch (Exception ex)
            {
                ViewBag.Message = "ERROR:" + ex.Message.ToString();
            }
            return Content("/ImagesClient/" + file.FileName);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult GuardaImagen(ViewModelNotificacionesBS model, HttpPostedFileBase file)
        {
            var name = file.FileName;
            BuenServicioServices = new WSD.NotificacionesBuenServicioServiceClient();
            BuenServicioServices.ClientCredentials.Authenticate();

            model.NotificacionBuenServicio.Usuario_Publicacion = Session["Usuario"].ToString();
            model.NotificacionBuenServicio.Nombre_Imagen = name;
            
            BuenServicioServices.RegistrarNotificado(model.NotificacionBuenServicio);
            return RedirectToAction("Notificaciones", "BuenServicio");
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult Visualizador_Imagenes(string Id_Imagen)
        {
            BuenServicioServices = new WSD.NotificacionesBuenServicioServiceClient();
            BuenServicioServices.ClientCredentials.Authenticate();
            ViewModelNotificacionesBS model = new ViewModelNotificacionesBS();
            model.NotificacionBuenServicio = BuenServicioServices.ImagenporId(Convert.ToInt32(Id_Imagen));
            ViewBag.NombreImagen = "/ImagesClient/" + model.NotificacionBuenServicio.Nombre_Imagen;
            ViewBag.Url = model.NotificacionBuenServicio.Link_Direccionamiento;
            return View(model);
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Guardar_Usuario_Notificado(string Imagen, string Ruta, string Id, string Descripcion)
        {
           
            BuenServicioServices = new WSD.NotificacionesBuenServicioServiceClient();
            BuenServicioServices.ClientCredentials.Authenticate();
            UsuariosNotificados model = new UsuariosNotificados();
            model.Id_Notificado = Convert.ToInt32(Id);
            model.Usuario = Session["Usuario"].ToString();
            model.Nombre_Imagen_Vista = Imagen;
            model.Link_Direccionamiento = Ruta;
            model.Descripcion_Imagen_Vista = Descripcion;
            model.Aliado_Usuario = Session["AliadoLogeado"].ToString();
            model.Perfil_Usario = Session["ModoLogin"].ToString();
            model.Nombre_Linea_Usuario = Session["LineaLogeado"].ToString();
            BuenServicioServices.RegistrarUsuarionotificado(model);
            return View();
        }
    }
}
