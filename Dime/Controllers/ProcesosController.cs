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

        [HttpGet]
        public ActionResult EditarCategorias()
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
        public JsonResult ConsultarCategoriasArbol(string IdCategoria, string Tipo, bool EsIdPadre = true)
        {
            List<Macroprocesos> Categorias = new List<Macroprocesos>();
            int tipo = Convert.ToInt32(Tipo);
            int categoria = Convert.ToInt32(IdCategoria);

            var jsonResult = Json(JsonConvert.SerializeObject(ProcesosService.ConsultarCategorias(categoria, tipo, EsIdPadre)), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult ConsultarTipoCategorias(string IdCategoria, string Tipo, bool ConsultaTipoCategoria = true)
        {
            ViewModelCategoriasTipo categoriasTipo = new ViewModelCategoriasTipo();
            List<Macroprocesos> Categorias = new List<Macroprocesos>();
            TiposMacroprocesos tipo = new TiposMacroprocesos();
            int valorTipo = Convert.ToInt32(Tipo);
            int CategoriaValor = Convert.ToInt32(IdCategoria);
            int tipoConsultar = 0;

            Categorias = ProcesosService.ConsultarCategorias(CategoriaValor, valorTipo, false);
            tipoConsultar = ConsultaTipoCategoria == true ? TiposCategorias(valorTipo, CategoriaValor) : valorTipo;

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

        public JsonResult CrearTipoCategorias(string IdPadre, string Tipo, string Descripcion)
        {
            int IdCategPadre = Convert.ToInt32(IdPadre);
            int IdTipo = Convert.ToInt32(Tipo);

            Macroprocesos crearElemento = new Macroprocesos();
            crearElemento.IdCategoriaPadre = IdCategPadre;
            crearElemento.TipoMacroproceso = IdTipo;
            crearElemento.Descripcion = Descripcion;

            ProcesosService.CrearCategoria(crearElemento);
            var jsonResult = Json("Creacion exitosa", JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
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

        public JsonResult EliminarTiposMacroproceso(string IdCategoria)
        {
            ProcesosService.EliminarCategoria(Convert.ToInt32(IdCategoria));
            var jsonResult = Json(JsonConvert.SerializeObject("Se elimino satisfactoriamente"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult EditarCategoria(string IdCategoria, string nombreNuevo)
        {
            int idCategoria = Convert.ToInt32(IdCategoria);
            ProcesosService.EditarCategoria(idCategoria, nombreNuevo);

            var jsonResult = Json(JsonConvert.SerializeObject("modificacion exitosa"), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }

        public JsonResult ConsultarNodosArbol(string idArbol, string idPadre)
        {
            int IdArbol = 1;
            int IdPadre = Convert.ToInt32(idPadre);
            ViewModelNodoArbol nodo;
            List<ViewModelNodoArbol> resultado = new List<ViewModelNodoArbol>();
            List<Nodo> lista = new List<Nodo>();

            lista = ProcesosService.consultarNodosArbol(IdArbol, IdPadre);

            foreach (var item in lista)
            {
                nodo = new ViewModelNodoArbol();
                nodo.Nodo = item;
                nodo.NodosHijos = ProcesosService.consultarNodosArbol(IdArbol, item.Id);
                resultado.Add(nodo);
            }
            var jsonResult = Json(JsonConvert.SerializeObject(resultado), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult IndiceNodosArbol(string idNodoActual)
        {
            int IdArbol = 1;
            int IdNodoActual = Convert.ToInt32(idNodoActual);
            List<IndiceNodoArbol> resultadoFinal = new List<IndiceNodoArbol>();

            if (IdNodoActual != 0)
                resultadoFinal = ProcesosService.IndiceNodosArbol(IdNodoActual);
            else
                resultadoFinal.Add(new IndiceNodoArbol {IdNodo= -1, NombreNodo="NodosPrincipal" });

            var jsonResult = Json(JsonConvert.SerializeObject(resultadoFinal), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }


    }

}
