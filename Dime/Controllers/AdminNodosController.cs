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
    public class AdminNodosController : Controller
    {
        // GET: AdminNodos
        WSD.MaestroNodoServiceClient maestroNodosWebService;

        [AllowAnonymous]
        [HttpGet]
        public ActionResult RegistrarNodo()
        {
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult RegistrarNodo(MaestroNodo modelo)
        {

            //servicio maestro nodos
            maestroNodosWebService = new WSD.MaestroNodoServiceClient();
            maestroNodosWebService.ClientCredentials.Authenticate();

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
        [AllowAnonymous]
        public ActionResult ListaNodosCreados()
        {
            maestroNodosWebService = new WSD.MaestroNodoServiceClient();
            maestroNodosWebService.ClientCredentials.Authenticate();
            List<MaestroNodo> modelo = new List<MaestroNodo>();
            modelo = maestroNodosWebService.ListaNodosCreados();
            return View(modelo);
        }
        [AllowAnonymous]
        [HttpGet]
        public ActionResult ActualizarNodo(int id)
        {
            ViewModelNodos model = new ViewModelNodos();
            maestroNodosWebService = new WSD.MaestroNodoServiceClient();maestroNodosWebService.ClientCredentials.Authenticate();
            model.MaestroNodo= maestroNodosWebService.GetInformacionNodoId(Convert.ToInt32(id));
            return View(model);
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult ActualizarNodo(ViewModelNodos model)
        {

            model.MaestroNodo.Usuario = Session["Usuario"].ToString();
            maestroNodosWebService = new WSD.MaestroNodoServiceClient(); maestroNodosWebService.ClientCredentials.Authenticate();
            maestroNodosWebService.ActualizarInformacionNodo(model.MaestroNodo);
            return RedirectToAction("ListaNodosCreados");
        }

    }
}