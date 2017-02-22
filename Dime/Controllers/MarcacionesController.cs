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
    public class MarcacionesController : MyController
    {
        WSD.MarcacionesServiceClient marcacionwebservice;
        

        public ActionResult NuevasMarcaciones(string idActualizar)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            MaestroMarcacione model = new MaestroMarcacione();
            if (idActualizar==null)
                    model.Id = 0;
            else model = marcacionwebservice.GetMarcacionPorId(Convert.ToInt32(idActualizar));
            return View(model);
        }



        [HttpPost, ValidateInput(false)]
        public ActionResult NuevasMarcaciones(MaestroMarcacione modelo)
        {  
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            modelo.UsuarioCreacion = Session["Usuario"].ToString();
            modelo.UsuarioActualizacion = Session["Usuario"].ToString();
            modelo.FechaActualizacion = DateTime.Now;
            modelo.FechaCreacion = DateTime.Now;
            if(ModelState.IsValid ==true)
            {
                if (modelo.Id == 0) 
                {
                    marcacionwebservice.RegistrarMarcacion(modelo); return RedirectToAction("NuevasMarcaciones", "Marcaciones");
                }
                else
                { marcacionwebservice.ActualizarMarcacion(modelo); return RedirectToAction("ActualizarMarcaciones", "Marcaciones");
                }
         
            }
            return View();
        }

        [HttpGet]
        public ActionResult ActualizarMarcaciones()
        {
            return View();
        }



        public ActionResult TipificacionMarcaciones(string cuenta)
        {

            return View();
        }


        public ActionResult TipificacionMarcacionesPost(ViewModelTipificacionMarcaciones model)
        {
            return View();
        }

        public ActionResult EliminarMarcacion(int idMarcacion)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            marcacionwebservice.EliminarMarcacion(idMarcacion);
            return RedirectToAction("ActualizarMarcaciones");
        }

        public ActionResult AgregarActuCodigoCierre(int? idCierre)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            PqrMaestroCodCierre modelo = new PqrMaestroCodCierre();
             if(idCierre!= null) modelo = marcacionwebservice.CodigoCierrePorId(idCierre?? 0);
            modelo.Id = idCierre ?? 0;
            return View(modelo);
        }


        [HttpPost]
        public ActionResult AgregarActuCodigoCierre(PqrMaestroCodCierre model)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            if(ModelState.IsValid == true)
            {  if (model.Id != 0)
                {
                    marcacionwebservice.ActualizarCodCierre(model);
                    return RedirectToAction("CodigosCierre");
                }
                else
                {
                    marcacionwebservice.AgregarCodigoCierre(model);
                }

            }
            return View(model);
        }


        public ActionResult CodigosCierre()
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            PqrMaestroCodCierreCollection modelo = new PqrMaestroCodCierreCollection();
            modelo.AddRange(marcacionwebservice.ListaCodigosDeCierre());
            return View(modelo);
        }

        public ActionResult EliminarCodigoCierre(int id)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            marcacionwebservice.EliminarCodigoCierre(id);
            return RedirectToAction("CodigosCierre");
        }

        public JsonResult ListaMarcaciones()
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(marcacionwebservice.ListaMarcaciones()),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult PosiblesMarcaciones(string key)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            return new JsonResult() {
                Data = JsonConvert.SerializeObject(marcacionwebservice.ObtenerMarcacionesPorPalabra(key)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }

        public JsonResult CodigosDeCierre(string submarcacion)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(marcacionwebservice.ListaNombreCodDeSubmarcacion(submarcacion)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }


        public JsonResult DatosDeMarcacion(int marcacion)
        {
            marcacionwebservice = new WSD.MarcacionesServiceClient();
            marcacionwebservice.ClientCredentials.Authenticate();
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(marcacionwebservice.TraerMarcacionPorId(marcacion)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }






    }
}