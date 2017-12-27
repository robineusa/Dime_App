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
    public class ProcesosController : Controller
    {
        WSD.ProcesosServiceClient ProcesosService;

        public ProcesosController()
        {
            ProcesosService = new WSD.ProcesosServiceClient();
            ProcesosService.ClientCredentials.Authenticate();
        }

        [HttpGet]
        public ActionResult GestionNoCheck()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AdminArboles()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult AdminArboles(Arbol model, string Envia)
        {
            if (Envia == "Guardar" && model.NombreArbol != "")
            {
                model.CodigoHtml = string.Empty;
                ProcesosService.CrearArbol(model);
                ViewBag.Mensaje = "Arbol Guardado";
            }
            else
            {
                ViewBag.Mensaje = "El Nombre del Arbol NO Puede ser Vacio";
            }
            return View(model);
        }

        [HttpGet]
        public ActionResult EditarArbol()
        {
            Macroprocesos macro = new Macroprocesos();
            return View(macro);
        }
        [HttpGet]
        public ActionResult Categorias(string IdPadre, string Tipo, bool EsIdPadre = true)
        {
            Macroprocesos macro = new Macroprocesos();
            int idpadre = Convert.ToInt32(IdPadre);
            int tipo = Convert.ToInt32(Tipo);

            tipo = tipo > 0 ? tipo : 1;

            macro.IdCategoriaPadre = idpadre;
            macro.TipoMacroproceso = tipo;
            return View(macro);
        }
        [HttpGet]
        public ActionResult CrearElementoMacroprocesos(string IdPadre, string Tipo)
        {

            return View();
        }

        public JsonResult LLamarArbolId(string IDdArbol)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarArbol(Convert.ToInt32(IDdArbol))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult RetornaIdNodo(string IDPadre, string IDdArbol, string NombreNodo)
        {
            Nodo model = new Nodo();
            if (IDPadre == "NombreArbol") { model.IdPadre = 0; } else { model.IdPadre = Convert.ToInt32(IDPadre); }
            model.IdArbol = Convert.ToInt32(IDdArbol);
            model.NombreNodo = NombreNodo;
            ProcesosService.CrearNodo(model);

            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarNodoCreado(Convert.ToInt32(IDdArbol))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult ActualizaCodigoHTMLArbol(string CodigoHTML, string IDdArbol)
        {
            Arbol model = new Arbol();

            model.Id = Convert.ToInt32(IDdArbol);
            model.CodigoHtml = CodigoHTML;
            ProcesosService.ActualizaHTMLArbol(model);

            var jsonResult = Json(JsonConvert.SerializeObject("Proceso Exitoso"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult ConsultaArboles()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ListaArboles()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult EliminarNodo(string IdNodo)
        {
            int idNodo = Convert.ToInt32(IdNodo);
            ProcesosService.EliminaNodo(idNodo);

            var jsonResult = Json(JsonConvert.SerializeObject("Se eliminó exitosamente"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult CambiarNombreNodo(string IdNodo, string NombreNuevo)
        {
            int idNodo = Convert.ToInt32(IdNodo);
            ProcesosService.CambiarNombreNodo(idNodo, NombreNuevo);

            var jsonResult = Json(JsonConvert.SerializeObject("Cambio de nombre exitoso"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult GuardarCodigoHtmlNodo(int IdNodo, string CodigoHtml, bool NodoFinal, int Categoria, int SubCategoria, int Tipo)
        {
            int idNodo = Convert.ToInt32(IdNodo);
            //ProcesosService.GuardarCodigoHtmlNodo(idNodo, CodigoHtml);

            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.GuardarCodigoHtmlNodo(idNodo, CodigoHtml, NodoFinal, Categoria, SubCategoria, Tipo)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ConsultarCodigoHtmlNodo(string IdNodo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarCodigoHtmlNodo(Convert.ToInt32(IdNodo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }


        public JsonResult ConsultarCategorias(string IdCategoria, string Tipo, bool EsIdPadre = true)
        {
            List<Macroprocesos> Categorias = new List<Macroprocesos>();
            int tipo = Convert.ToInt32(Tipo);
            int categoria = Convert.ToInt32(IdCategoria);
            int idTipo = TiposCategorias(tipo, categoria);

            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarCategorias(categoria, idTipo, EsIdPadre)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult ConsultarTipoCategorias(string IdCategoria, string Tipo)
        {
            ViewModelCategoriasTipo categoriasTipo = new ViewModelCategoriasTipo();
            List<Macroprocesos> Categorias = new List<Macroprocesos>();
            TiposMacroprocesos tipo = new TiposMacroprocesos();
            int valorTipo = Convert.ToInt32(Tipo);
            int CategoriaValor = Convert.ToInt32(IdCategoria);
            int tipoConsultar = 0;

            Categorias = ProcesosService.ConsultarCategorias(CategoriaValor, valorTipo, false);
            tipoConsultar = TiposCategorias(valorTipo, CategoriaValor);

            tipo = ProcesosService.ConsultarTipoMacroproceso(tipoConsultar);

            if (Categorias.Count > 0)
            {
                categoriasTipo.Categorias = Categorias.FirstOrDefault();
            }
            else
            {
                Macroprocesos elementoVacio = new Macroprocesos();
                categoriasTipo.Categorias = elementoVacio;
            }

            categoriasTipo.Tipos = tipo;

            var jsonResult = Json(JsonConvert.SerializeObject(categoriasTipo), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public void CrearTipoCategorias(string IdPadre, string Tipo, string Descripcion)
        {
            int IdCategPadre = Convert.ToInt32(IdPadre);
            int IdTipo = Convert.ToInt32(Tipo);

            Macroprocesos crearElemento = new Macroprocesos();
            crearElemento.IdCategoriaPadre = IdCategPadre;
            crearElemento.TipoMacroproceso = IdTipo;
            crearElemento.Descripcion = Descripcion;

            ProcesosService.CrearCategoria(crearElemento);
        }
        public int TiposCategorias(int Tipo, int IdPadre)
        {
            int idpadre = Convert.ToInt32(IdPadre);
            int tipo = Convert.ToInt32(Tipo); ;
            int idTipo = 0;

            if (idpadre == 0)
                idTipo = 1;
            else if (tipo == 1 && idpadre > 0)
                idTipo = 2;
            else if (tipo == 2 && idpadre > 0)
                idTipo = 3;

            return idTipo;
        }

        public JsonResult ConsultarTitulos(string IdCategoria, string Tipo)
        {
            int idCategoria = Convert.ToInt32(IdCategoria);
            int idTipo = TiposCategorias(Convert.ToInt32(Tipo), idCategoria);

            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarTitulos(idCategoria, idTipo)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
       
    }

}
