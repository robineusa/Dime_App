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
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegistrarImagen([Bind(Include = "Link,Descripcion,Estado")] IMGOfertasComeciales modelo, HttpPostedFileBase Archivo)
        {
            modelo.UsuarioCreacion = Convert.ToDecimal(Session["Usuario"]);

            if (Archivo != null && Archivo.ContentLength > 0)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    Archivo.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();

                    modelo.Imagen = array;
                    OfertasComercialesService.RegistrarImagen(modelo);
                }

            }

            return RedirectToAction("RegistrarImagen");
        }
        [HttpGet]
        public ActionResult EditarImagen(decimal IdImagen)
        {
            IMGOfertasComeciales modelo = OfertasComercialesService.ConsultarImagenPorId(IdImagen);
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditarImagen(IMGOfertasComeciales modelo, HttpPostedFileBase Archivo)
        {
            modelo.UsuarioCreacion = Convert.ToDecimal(Session["Usuario"]);

            if (Archivo != null && Archivo.ContentLength > 0)
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    Archivo.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();

                    modelo.Imagen = array;
                }
            }
            OfertasComercialesService.ActualizarImagen(modelo);
            return RedirectToAction("EditarImagen", "OfertasComerciales", new { IdImagen = modelo.IdImagen });
        }
        public ActionResult ConvertirImagen(decimal IdImagen)
        {
            IMGOfertasComeciales ImagenTraida = OfertasComercialesService.ConsultarImagenPorId(IdImagen);

            byte[] imageData = ImagenTraida.Imagen;
            if (imageData != null)
            {
                return File(imageData, "image/png");
            }
            return null;
        }
        public ActionResult ListaDeImagenesAdmin()
        {
            return View();
        }
        public JsonResult ListaDeImagenesAdminJson()
        {
            decimal Cedula = Convert.ToDecimal(Session["Usuario"].ToString());
            var jsonResult = Json(JsonConvert.SerializeObject(OfertasComercialesService.ListaDeImagenesAdmin()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}