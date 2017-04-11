using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class AdminNodosController : MyController
    {
        // GET: AdminNodos
        WSD.MaestroNodoServiceClient maestroNodosWebService;

        public AdminNodosController()
        {
            maestroNodosWebService = new WSD.MaestroNodoServiceClient();
            maestroNodosWebService.ClientCredentials.Authenticate();
        }
        [HttpGet]
        public ActionResult RegistrarNodo()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult RegistrarNodo(MaestroNodo modelo)
        {

            //servicio maestro nodos
           

            if (maestroNodosWebService.ExisteNodo(modelo.Nodo.Trim()) == false)
            {
                modelo.Usuario = Session["Usuario"].ToString();
                modelo.Nodo = modelo.Nodo.Trim().ToUpper();
                modelo.NombreNodo = modelo.NombreNodo.Trim().ToUpper();
                modelo.Div = modelo.Div.Trim().ToUpper();
                modelo.Com = modelo.Com.Trim().ToUpper();
                modelo.Red = modelo.Red.Trim().ToUpper();
                modelo.Aliado = modelo.Aliado.Trim().ToUpper();
                modelo.NombreComunidad = modelo.NombreComunidad.Trim().ToUpper();
                modelo.Departamento = modelo.Departamento.Trim().ToUpper();
                maestroNodosWebService.InsertarNodo(modelo);
                return RedirectToAction("RegistrarNodo");
            }
            else
            {
                ViewBag.nodoExisteError="El nodo ingresado ya existe en la base de datos";
            }
            return View(modelo);
           
        }
       
        public ActionResult ListaNodosCreados()
        {
            List<MaestroNodo> modelo = new List<MaestroNodo>();
            return View(modelo);
        }
     
        public JsonResult ListaNodosCreadosJson()
        {
           
            List<MaestroNodo> modelo = new List<MaestroNodo>();
            //modelo = maestroNodosWebService.ListaNodosCreados();
            var jsonResult = Json(JsonConvert.SerializeObject(maestroNodosWebService.ListaNodosCreados()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        [HttpGet]
        public ActionResult ActualizarNodo(int id)
        {
            ViewModelNodos model = new ViewModelNodos();
           
            model.MaestroNodo= maestroNodosWebService.GetInformacionNodoId(Convert.ToInt32(id));
            return View(model);
        }
        
        [HttpPost]
        public ActionResult ActualizarNodo(ViewModelNodos model)
        {

            model.MaestroNodo.Usuario = Session["Usuario"].ToString();
         
            maestroNodosWebService.ActualizarInformacionNodo(model.MaestroNodo);
            return RedirectToAction("ListaNodosCreados");
        }

    }
}