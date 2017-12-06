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
    public class OfertasComercialesController : Controller
    {
        WSD.OfertasComercialesServiceClient OfertasComercialesService;

        public OfertasComercialesController()
        {
            OfertasComercialesService = new WSD.OfertasComercialesServiceClient();
            OfertasComercialesService.ClientCredentials.Authenticate();
        }
         [HttpGet]
        public ActionResult RegistrarImagen()
        {
            IMGOfertasComeciales modelo = new IMGOfertasComeciales();
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
<<<<<<< HEAD
        public ActionResult RegistrarImagen([Bind(Include ="Link,Descripcion,Estado")] IMGOfertasComeciales modelo, HttpPostedFileBase Archivo)
        {
            modelo.UsuarioCreacion = Convert.ToDecimal(Session["Usuario"]);

            if (Archivo != null)
=======
        public ActionResult RegistrarImagen([Bind(Include ="Link,Descripcion,Estado")] IMGOfertasComeciales modelo, HttpPostedFileBase Imagen)
        {
            if(Imagen != null && Imagen.ContentLength > 0)
>>>>>>> e1491aa137168c7671457a526cc0f68afee7b631
            {
                byte[] imagendata = null;
                using (var binaryimagen = new BinaryReader(Imagen.InputStream))
                {
<<<<<<< HEAD
                    Archivo.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();

                    modelo.Imagen = array;
                    OfertasComercialesService.RegistrarImagen(modelo);
=======
                    imagendata = binaryimagen.ReadBytes(Imagen.ContentLength);
>>>>>>> e1491aa137168c7671457a526cc0f68afee7b631
                }
                modelo.Imagen = imagendata;
            }
<<<<<<< HEAD
            
            return RedirectToAction("RegistrarImagen");
        }
        public ActionResult EditarImagen(decimal IdImagen)
        {
            IMGOfertasComeciales modelo = OfertasComercialesService.ConsultarImagenPorId(IdImagen);
            return View(modelo);
        }
        public ActionResult ConvertirImagen(decimal IdImagen)
        {
            IMGOfertasComeciales ImagenTraida = OfertasComercialesService.ConsultarImagenPorId(IdImagen);
=======
>>>>>>> e1491aa137168c7671457a526cc0f68afee7b631

            return View();
        }
<<<<<<< HEAD
        public JsonResult PrecargarImagen(HttpPostedFileBase Archivo)
        {
            
            if (Archivo != null)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    Archivo.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                    var jsonResult = Json(JsonConvert.SerializeObject(File(array, "image/png")), JsonRequestBehavior.AllowGet);
                    jsonResult.MaxJsonLength = int.MaxValue;
                    return jsonResult;

                }
            }
            return null;
        }
=======
        //public ActionResult ConvertirImagen (decimal IdImagen)
        //{
            
        //    var ResultImagen =OfertasComercialesService.ConsultarImagenPorId(IdImagen);
        //    return File(ResultImagen.Imagen, "image/jpeg");
        //}
>>>>>>> e1491aa137168c7671457a526cc0f68afee7b631
    }
}