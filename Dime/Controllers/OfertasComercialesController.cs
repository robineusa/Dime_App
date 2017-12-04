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
        public ActionResult RegistrarImagen(IMGOfertasComeciales modelo, HttpPostedFileBase imagen)
        {
            if(imagen!= null && imagen.ContentLength > 0)
            {
                byte[] imagendata = null;
                using (var binaryimagen = new BinaryReader(imagen.InputStream))
                {
                    imagendata = binaryimagen.ReadBytes(imagen.ContentLength);
                }
                modelo.Imagen =Convert.ToByte(imagendata);
            }

            return View();
        }
        //public ActionResult ConvertirImagen (decimal IdImagen)
        //{
            
        //    var ResultImagen =OfertasComercialesService.ConsultarImagenPorId(IdImagen);
        //    return File(ResultImagen.Imagen, "image/jpeg");
        //}
    }
}