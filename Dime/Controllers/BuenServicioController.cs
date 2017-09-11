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
    [ExpiringFilter]
    public class BuenServicioController : MyController
    {
         WSD.NotificacionesBuenServicioServiceClient BuenServicioServices;
        public BuenServicioController()
        {
            BuenServicioServices = new WSD.NotificacionesBuenServicioServiceClient();
            BuenServicioServices.ClientCredentials.Authenticate();
        }
        // GET: BuenServicio

        [HttpGet]
        public ActionResult Notificaciones()
        {
            
            ViewModelNotificacionesBS modelo = new ViewModelNotificacionesBS();
            modelo.ListaNotificacionesBSGetSet = BuenServicioServices.ListaImagenesBuenServicio();
            return View(modelo);
        }

        
        [HttpPost]
        public ActionResult Notificaciones(HttpPostedFileBase file)
        {
            try
            {
                string path = Path.Combine(Server.MapPath("../ImagesClient"), Path.GetFileName(file.FileName));
                file.SaveAs(path);
            }
            catch (Exception ex)
            {
                ViewBag.Message = "ERROR:" + ex.Message.ToString();
            }
            return Content("../ImagesClient/" + file.FileName);
        }

    
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult GuardaImagen(ViewModelNotificacionesBS model, HttpPostedFileBase file)
        {
            var name = file.FileName;
            
            model.NotificacionBuenServicio.Usuario_Publicacion = Session["Usuario"].ToString();
            model.NotificacionBuenServicio.Nombre_Imagen = name;
            
            BuenServicioServices.RegistrarNotificado(model.NotificacionBuenServicio);
            return RedirectToAction("Notificaciones", "BuenServicio");
        }
  
        [HttpGet]
        public ActionResult Visualizador_Imagenes(string Id_Imagen)
        {
           
            ViewModelNotificacionesBS model = new ViewModelNotificacionesBS();
            model.NotificacionBuenServicio = BuenServicioServices.ImagenporId(Convert.ToInt32(Id_Imagen));
            ViewBag.NombreImagen = "../ImagesClient/" + model.NotificacionBuenServicio.Nombre_Imagen;
            ViewBag.Url = model.NotificacionBuenServicio.Link_Direccionamiento;
            return View(model);
        }

    
        [HttpGet]
        public ActionResult Guardar_Usuario_Notificado(string Imagen, string Ruta, string Id, string Descripcion)
        {
           
           
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

        [HttpGet]
        public ActionResult Mensajes_BuenServicio()
        {
            return View();
        }
    }
}
