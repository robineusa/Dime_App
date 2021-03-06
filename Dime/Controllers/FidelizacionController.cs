﻿using Dime.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class FidelizacionController : MyController
    {
        WSD.FidelizacionServiceClient fidelizacionServicio;
        WSD.InboundServiceClient inboundService;
        
        // GET: Fidelizacion

        public FidelizacionController()
        {
            fidelizacionServicio = new WSD.FidelizacionServiceClient();
            fidelizacionServicio.ClientCredentials.Authenticate();
            inboundService = new WSD.InboundServiceClient();
            inboundService.ClientCredentials.Authenticate();
        }


        [HttpGet]
        public ActionResult CrearMotivoCancelacion()
        {
            FidelizacionMotivosCancelacion modelo = new FidelizacionMotivosCancelacion();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CrearMotivoCancelacion(FidelizacionMotivosCancelacion modelo)
        {

            if (modelo.Motivo == "" || modelo.Motivo == null)
            {
                ViewBag.errorMotivo = "Escriba el Motivo que desea crear";
            }
            else if (modelo.OtrosCampos < 0 || modelo.OtrosCampos > 1)
            {
                ViewBag.errorOtrosCampos = "Indique si se visualizan otros campos";
            }
            else if (modelo.OtrosOfrecimientos < 0 || modelo.OtrosOfrecimientos > 1)
            {
                ViewBag.errorOtrosOfrecimientos = "Indique si se visualizan otros ofrecimientos";
            }
            else
            {
                FidelizacionMotivosCancelacion MotivoCancelacion = new FidelizacionMotivosCancelacion();
                MotivoCancelacion.Eliminado = 0;
                MotivoCancelacion.Motivo = modelo.Motivo;
                MotivoCancelacion.OtrosCampos = ((modelo.OtrosCampos == 1) ? 1 : 0);
                MotivoCancelacion.OtrosOfrecimientos = ((modelo.OtrosOfrecimientos == 1) ? 1 : 0);
                MotivoCancelacion.Registro = DateTime.Now;

                fidelizacionServicio.setMotivosCancelacion(MotivoCancelacion);
                return RedirectToAction("CrearMotivoCancelacion");
            }


            return View(modelo);



            //    return RedirectToAction("RegistrarOperacionesIncidente", "BitacoraIncidentes", new { IdRegistro = IdRegistrado });
            //}

        }
        [HttpGet]
        public ActionResult CrearSubmotivoCancelacion()
        {
            ViewModelSubmotivosCancelacion modelo = new ViewModelSubmotivosCancelacion();
            var Motivos = fidelizacionServicio.getMotivosCancelacionAll(0);
            List<FidelizacionMotivosCancelacion> listado = new List<FidelizacionMotivosCancelacion>();

            ViewBag.sltMotivos = Motivos;
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CrearSubmotivoCancelacion(ViewModelSubmotivosCancelacion modelo)
        {
            if (modelo.FidelizacionSubmotivos.Submotivo == "" || modelo.FidelizacionSubmotivos.Submotivo == null)
            {
                ViewBag.errorSubmotivo = "Escriba el submotivo que desea crear";
            }
            else if (modelo.FidelizacionSubmotivos.FIDMotivoId == 0)
            {
                ViewBag.errorMotivo = "Seleccione un motivo";
            }
            else
            {
                modelo.FidelizacionSubmotivos.Eliminado = 0;
                modelo.FidelizacionSubmotivos.Registro = DateTime.Now;
                fidelizacionServicio.setSubmotivoCancelacion(modelo.FidelizacionSubmotivos);
                return RedirectToAction("CrearSubmotivoCancelacion");
            }
            //return Json(JsonConvert.SerializeObject(0), JsonRequestBehavior.AllowGet);

            ViewModelSubmotivosCancelacion model = new ViewModelSubmotivosCancelacion();
            return View(model);
        }

        public ActionResult ListarMotivosCancelacion()
        {
            List<FidelizacionMotivosCancelacion> modelo = new List<FidelizacionMotivosCancelacion>();
            return View(modelo);
        }
        public ActionResult ListarSubmotivosCancelacion()
        {

            List<ViewModelSubmotivosCancelacion> modelo = new List<ViewModelSubmotivosCancelacion>();

            return View(modelo);
        }
        public ActionResult ListarTipificacion()
        {
            List<FidelizacionTipificacion> modelo = new List<FidelizacionTipificacion>();
            return View(modelo);
        }
        public JsonResult ListarTipificacionJson()
        {

            List<FidelizacionTipificacion> modelo = new List<FidelizacionTipificacion>();
            var listado = fidelizacionServicio.getTipificacionAll(0,1);
            var listado1 = fidelizacionServicio.getTipificacionAll(0, 2);
            var listado2 = fidelizacionServicio.getTipificacionAll(0, 3);

            foreach (var tmp in listado)
            {
                if (tmp.Eliminado == 0)
                {
                    modelo.Add(tmp);
                }
            }
            foreach (var tmp in listado1)
            {
                if (tmp.Eliminado == 0)
                {
                    modelo.Add(tmp);
                }
            }
            foreach (var tmp in listado2)
            {
                if (tmp.Eliminado == 0)
                {
                    modelo.Add(tmp);
                }
            }
            var jsonResult = Json(JsonConvert.SerializeObject(modelo), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult ListarMotivosCancelacionJson()
        {

            List<FidelizacionMotivosCancelacion> modelo = new List<FidelizacionMotivosCancelacion>();
            var listado = fidelizacionServicio.getMotivosCancelacionAll(0);

            var jsonResult = Json(JsonConvert.SerializeObject(listado), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult ListarSubmotivosCancelacionJson()
        {

            var jsonResult = Json(JsonConvert.SerializeObject(fidelizacionServicio.getSubmotivosCancelacionAll(0,0)), JsonRequestBehavior.AllowGet);

            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult ActualizarTipificacion(decimal id)
        {
            FidelizacionTipificacion modelo = new FidelizacionTipificacion();
            var modeloObtenido = fidelizacionServicio.getTipificacionById(id);
            return View(modeloObtenido);
        }
        [HttpGet]
        public ActionResult ActualizarRecursiva(decimal id)
        {
            var idNivel = 0;
            

            ViewModelRecursiva modelo = new ViewModelRecursiva();
            modelo.Recursiva = fidelizacionServicio.getRecursivaById(id);
            List<FidelizacionRecursiva> test = new List<FidelizacionRecursiva>();
            if (modelo.Recursiva.ParentId == 1)
                test = fidelizacionServicio.getRecursivaArbol(modelo.Recursiva.Id);
            else
                test = fidelizacionServicio.getRecursivaArbol(modelo.Recursiva.Id);

            string [] labelList = new string[test.Count];
            //IEnumerable<SelectListItem> [] termsList = new IEnumerable<SelectListItem>[test.Count];
            List<FidelizacionRecursiva> [] termsList = new List<FidelizacionRecursiva>[test.Count];
            for (int i = 0; i < test.Count; i++)
            {
                var listado = fidelizacionServicio.getRecursivaAll(test[i].ParentId, idNivel);
                List<FidelizacionRecursiva> otra = new List<FidelizacionRecursiva>();
                termsList[i] = GetSelectListItems(listado, test[i].Id);
                labelList[i] = test[i].Label;
                //termsList[i] = otra;
            }

            
            
            ViewBag.Lista = termsList;
            ViewBag.Label = labelList;

            //var est = "";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarRecursiva(ViewModelRecursiva objRecursiva)
        {
            if (objRecursiva.Recursiva.Nombre == "" || objRecursiva.Recursiva.Nombre == null)
            {
                ViewBag.errorNombre = "Escriba el nuevo dato que desea crear";
                return View(objRecursiva);
            }
            var idPadre = 1;
            if (Request.Form["sltEstrategias_1"] == "0")
            {
                objRecursiva.Recursiva.ParentId = idPadre;
                //ViewBag.errorPadre = "Seleccione el padre de esta opción";
            }
            else
            {

                var c1 = 1;

                do
                {
                    c1++;
                }
                while (Request.Form["sltEstrategias_" + c1] != null && Request.Form["sltEstrategias_" + c1] != "0");
                if (c1 - 1 == 1)
                    idPadre = Convert.ToInt32(Request.Form["sltEstrategias_1"]);
                else
                    idPadre = Convert.ToInt32(Request.Form["sltEstrategias_" + (c1 - 1)]);


                var E1 = fidelizacionServicio.getRecursivaAll(Convert.ToInt32(Request.Form["sltEstrategias_" + (c1 - 1)]), 0);

                //idPadre = Convert.ToInt32(Request.Form["sltEstrategias_" + (c1 - 1)]);
                //modelo.Recursiva.ParentId = idPadre;


            }
            var nivelPadre = 1;
            if (idPadre != 1)
            {
                var Padre = fidelizacionServicio.getRecursivaById(idPadre);
                nivelPadre = Convert.ToInt32(Padre.Nivel + 1);
            }
            objRecursiva.Recursiva.ParentId = idPadre;

            string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
            string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
            string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");
            //modelo.Recursiva.Label = "Test";
            objRecursiva.Recursiva.VerNivel = cont + ret + recu;
            objRecursiva.Recursiva.Nivel = nivelPadre;
            fidelizacionServicio.updateRecursiva(objRecursiva.Recursiva);
            return RedirectToAction("ListarRecursiva");

            /*return View(modelo)*/
            ;




            //if (objRecursiva.Recursiva.Nombre == "" || objRecursiva.Recursiva.Nombre == null)
            //{
            //    ViewBag.errorMotivo = "Escriba el título de la opción que desea crear";
            //}
            //else if (objRecursiva.Recursiva.ParentId < 1 || Convert.ToString(objRecursiva.Recursiva.ParentId) == "")
            //{
            //    ViewBag.errorOtrosCampos = "Indique a cual opcion desea asociarlo (Escoja un padre)";
            //}
            //else if (objRecursiva.Recursiva.Label == "" || objRecursiva.Recursiva.Label == null)
            //{
            //    ViewBag.errorOtrosOfrecimientos = "Indique La etiqueta que desea colocarle en el momento de seleccionarlo";
            //}
            //else
            //{
            //    var Padre = fidelizacionServicio.getRecursivaVistaById(objRecursiva.Recursiva.ParentId);
            //    string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
            //    string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
            //    string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");

            //    objRecursiva.Recursiva.VerNivel = cont + ret + recu;
            //    fidelizacionServicio.updateRecursiva(objRecursiva.Recursiva);
            //    return RedirectToAction("ListarRecursiva");
            //}
            //return View(objRecursiva);
        }

        [HttpGet]
        public ActionResult ActualizarMotivoCancelacion(decimal id)
        {
            FidelizacionMotivosCancelacion modelo = new FidelizacionMotivosCancelacion();
            var modeloObtenido = fidelizacionServicio.getMotivosCancelacionById(id);
            return View(modeloObtenido);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarTipificacion(FidelizacionTipificacion objTipificacion)
        {
            if (objTipificacion.Nombre == "" || objTipificacion.Nombre == null)
            {
                ViewBag.errorNombre = "Escriba el título de la nota";

            }
            else if ((objTipificacion.Nota).Length < 20 || (objTipificacion.Nota).Length > 1000)
            {
                ViewBag.errorNota = "La nota no tiene un formato adecuado";
            }
            else
            {
                var recu = Request.Form["Recuperacion"];
                var ret = Request.Form["Retencion"];
                var cont = Request.Form["Contencion"];
                objTipificacion.Nivel3 = ((recu == "false") ? 0 : 1);
                objTipificacion.Nivel2 = ((ret == "false") ? 0 : 1);
                objTipificacion.Nivel1 = ((cont == "false") ? 0 : 1);
                objTipificacion.UsuarioId = Convert.ToInt32(Session["IdUsuario"]);
                objTipificacion.Registro = DateTime.Now;
                fidelizacionServicio.updateTipificacion(objTipificacion);
                //var test = ";;";
                return RedirectToAction("ListarTipificacion");

            }
            return View(objTipificacion);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarMotivoCancelacion(FidelizacionMotivosCancelacion objFidelizacion)
        {
            if (objFidelizacion.Motivo == "" || objFidelizacion.Motivo == null)
            {
                ViewBag.errorMotivo = "Escriba el Motivo que desea crear";
            }
            else if (objFidelizacion.OtrosCampos < 0 || objFidelizacion.OtrosCampos > 1)
            {
                ViewBag.errorOtrosCampos = "Indique si se visualizan otros campos";
            }
            else if (objFidelizacion.OtrosOfrecimientos < 0 || objFidelizacion.OtrosOfrecimientos > 1)
            {
                ViewBag.errorOtrosOfrecimientos = "Indique si se visualizan otros ofrecimientos";
            }
            else
            {
                fidelizacionServicio.updateMotivoCancelacion(objFidelizacion);// .updateMotivoCancelacion(objFidelizacion);
                return RedirectToAction("ListarMotivosCancelacion");
            }
            return View(objFidelizacion);

        }
        [HttpGet]
        public ActionResult ActualizarSubmotivoCancelacion(decimal id)
        {
            ViewModelSubmotivosCancelacion modelo = new ViewModelSubmotivosCancelacion();
            modelo.FidelizacionSubmotivos = fidelizacionServicio.getSubmotivosCancelacionById(id);
            modelo.FidelizacionMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);



            IList<SelectListItem> selectItems = new List<SelectListItem>();
            foreach (var role in modelo.FidelizacionMotivos)
            {
                
                    SelectListItem listItem = new SelectListItem();
                    listItem.Value = Convert.ToString(role.Id);
                    listItem.Text = role.Motivo;
                    selectItems.Add(listItem);
                

            }

            ViewBag.sltMotivos = selectItems;
            return View(modelo);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarSubmotivoCancelacion(ViewModelSubmotivosCancelacion objFidelizacion)
        {
            if (objFidelizacion.FidelizacionSubmotivos.Submotivo == "" || objFidelizacion.FidelizacionSubmotivos.Submotivo == null)
            {
                ViewBag.errorMotivo = "Escriba el submotivo que desea crear";
            }
            else if (objFidelizacion.FidelizacionSubmotivos.FIDMotivoId < 1 || Convert.ToString(objFidelizacion.FidelizacionSubmotivos.FIDMotivoId) == "")
            {
                ViewBag.errorOtrosCampos = "Indique a cual motivo desea asociarlo";
            }
            else if (objFidelizacion.FidelizacionSubmotivos.Eliminado < 0 || objFidelizacion.FidelizacionSubmotivos.Eliminado > 1)
            {
                ViewBag.errorOtrosOfrecimientos = "Indique si ddesea eliminarlo";
            }
            else
            {
                objFidelizacion.FidelizacionSubmotivos.Registro = DateTime.Now; ;
                fidelizacionServicio.updateSubmotivoCancelacion(objFidelizacion.FidelizacionSubmotivos);
                return RedirectToAction("ListarSubmotivosCancelacion");
            }
            return View(objFidelizacion);

        }

        [HttpGet]
        public ActionResult CrearRecursiva()
        {
            ViewModelRecursiva modelo = new ViewModelRecursiva();
            ViewBag.Lista = fidelizacionServicio.getRecursivaAll(1,0);
            //var y = "";
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CrearRecursiva(ViewModelRecursiva modelo)
        {
            if (modelo.Recursiva.Nombre == "" || modelo.Recursiva.Nombre == null)
            {
                ViewBag.errorNombre = "Escriba el nuevo dato que desea crear";
                //ViewModelRecursiva modelo = new ViewModelRecursiva();
                //ViewBag.Lista = fidelizacionServicio.getRecursivaVistaAll();
                return View(modelo);
            }
            var idPadre = 1;
            if (modelo.Recursiva.ParentId == 0)
            {
                modelo.Recursiva.ParentId = idPadre;
                //ViewBag.errorPadre = "Seleccione el padre de esta opción";
            }
            else {
                
                    var c1 = 1;

                    do
                    {
                        c1++;
                    }
                    while (Request.Form["sltEstrategias_" + c1] != null && Request.Form["sltEstrategias_" + c1] != "0");
                if (c1 - 1 == 1)
                    idPadre = Convert.ToInt32(modelo.Recursiva.ParentId);
                else
                    idPadre = Convert.ToInt32(Request.Form["sltEstrategias_" + (c1 - 1)]);
                

                    var E1 = fidelizacionServicio.getRecursivaAll(Convert.ToInt32(Request.Form["sltEstrategias_" + (c1 - 1)]), 0);
                    
                        //idPadre = Convert.ToInt32(Request.Form["sltEstrategias_" + (c1 - 1)]);
                //modelo.Recursiva.ParentId = idPadre;

                
            }
            var nivelPadre = 1;
            if (idPadre != 1) {
                var Padre = fidelizacionServicio.getRecursivaById(idPadre);
                nivelPadre = Convert.ToInt32(Padre.Nivel + 1);
            }
            modelo.Recursiva.ParentId = idPadre;

            string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
                string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
                string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");
                //modelo.Recursiva.Label = "Test";
                modelo.Recursiva.VerNivel = cont + ret + recu;
                modelo.Recursiva.Nivel = nivelPadre;
                fidelizacionServicio.setRecursiva(modelo.Recursiva);
                return RedirectToAction("CrearRecursiva");

            /*return View(modelo)*/;
        }
        [HttpGet]
        public ActionResult CrearTipificacion()
        {
            FidelizacionTipificacion modelo = new FidelizacionTipificacion();
            return View(modelo);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CrearTipificacion(FidelizacionTipificacion modelo)
        {

            if (modelo.Nombre == "" || modelo.Nombre == null)
            {
                ViewBag.errorNombre = "Escriba el título de la nota";

            }
            else if ((modelo.Nota).Length < 20 || (modelo.Nota).Length > 1000)
            {
                ViewBag.errorNota = "La nota no tiene un formato adecuado";
            }
            else
            {
                var recu = Request.Form["Recuperacion"];
                var ret = Request.Form["Retencion"];
                var cont = Request.Form["Contencion"];
                modelo.Nivel3 = ((recu == "false") ? 0 : 1);
                modelo.Nivel2 = ((ret == "false") ? 0 : 1);
                modelo.Nivel1 = ((cont == "false") ? 0 : 1);
                modelo.UsuarioId = Convert.ToInt32(Session["IdUsuario"]);
                modelo.Registro = DateTime.Now;
                fidelizacionServicio.setTipificacion(modelo);
                return RedirectToAction("CrearTipificacion");

            }
            return View(modelo);
        }

        public ActionResult ListarRecursiva()
        {
            List<ViewModelRecursiva> modelo = new List<ViewModelRecursiva>();
            return View(modelo);
        }
        public JsonResult ListarRecursivaJson()
        {

            List<ViewModelRecursiva> modelo = new List<ViewModelRecursiva>();
            var jsonResult = Json(JsonConvert.SerializeObject(fidelizacionServicio.getRecursivaVistaAll()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult CrearOtrosCampos()
        {
            FidelizacionOtrosCampos modelo = new FidelizacionOtrosCampos();
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CrearOtrosCampos(FidelizacionOtrosCampos objOtrosCampos)
        {
            if (objOtrosCampos.Nombre == "" || objOtrosCampos.Nombre == null)
            {
                ViewBag.errorNombre = "Escriba la etiqueta del campo";
            }
            else if (objOtrosCampos.Tipo == "0")
            {
                ViewBag.errorTipo = "Seleccione el tipo de campo que se va a crear";
            }
            else if (objOtrosCampos.Opciones == "" || objOtrosCampos.Opciones == null)
            {
                ViewBag.errorOpcion = "Si es de tipo listado indique las opciones separadas por coma (,) o la longitud del campo.";
            }
            else
            {
                string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
                string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
                string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");

                objOtrosCampos.Nivel = cont + ret + recu;
                objOtrosCampos.Eliminado = 0;
                fidelizacionServicio.setOtrosCampos(objOtrosCampos);
                return RedirectToAction("CrearOtrosCampos");
            }
            return View(objOtrosCampos);

        }
        public ActionResult ListarOtrosCampos()
        {
            List<FidelizacionOtrosCampos> modelo = new List<FidelizacionOtrosCampos>();
            return View(modelo);
        }
        public JsonResult ListarOtrosCamposJson()
        {

            List<FidelizacionOtrosCampos> modelo = new List<FidelizacionOtrosCampos>();
            var listado = fidelizacionServicio.getOtrosCamposAll(0,1);
            var listado1 = fidelizacionServicio.getOtrosCamposAll(0, 2);
            var listado2 = fidelizacionServicio.getOtrosCamposAll(0, 3);

            foreach (var tmp in listado) {
                if (tmp.Eliminado == 0)
                {
                    modelo.Add(tmp);
                }
            }
            foreach (var tmp in listado1)
            {
                if (tmp.Eliminado == 0)
                {
                    modelo.Add(tmp);
                }
            }
            foreach (var tmp in listado2)
            {
                if (tmp.Eliminado == 0)
                {
                    modelo.Add(tmp);
                }
            }
            var jsonResult = Json(JsonConvert.SerializeObject(modelo), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        [HttpGet]
        public ActionResult ActualizarOtrosCampos(decimal id)
        {
            FidelizacionOtrosCampos modelo = new FidelizacionOtrosCampos();
            modelo = fidelizacionServicio.getOtrosCamposById(id);
            
            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarOtrosCampos(FidelizacionOtrosCampos objFidelizacion)
        {
            //objFidelizacion.Eliminado;
            //objFidelizacion.Id;
            //objFidelizacion.Nivel;
            //objFidelizacion.Nombre;
            //objFidelizacion.Opciones;
            //objFidelizacion.Tipo;



            
            if (objFidelizacion.Nombre == "" || objFidelizacion.Nombre == null)
            {
                ViewBag.errorNombre = "Escriba la etiqueta del campo";
            }
            else if (objFidelizacion.Tipo == "0" || objFidelizacion.Tipo == "")
            {
                ViewBag.errorOtrosTipo = "Seleccione el tipo de campo que se va a crear";
            }
            else if (objFidelizacion.Opciones == "" || objFidelizacion.Opciones == null)
            {
                ViewBag.errorOpcion = "Si es de tipo listado indique las opciones separadas por coma (,) o la longitud del campo.";
            }
            else
            {
                string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
                string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
                string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");

                objFidelizacion.Nivel = cont + ret + recu;
                fidelizacionServicio.updateOtrosCampos(objFidelizacion);
                return RedirectToAction("ListarOtrosCampos");
            }
            return View(objFidelizacion);
        }
        [HttpGet]
        public ActionResult EliminarOtrosCampos(decimal id)
        {
            FidelizacionOtrosCampos modelo = new FidelizacionOtrosCampos();
            modelo = fidelizacionServicio.getOtrosCamposById(id);
            modelo.Eliminado = 1;
            fidelizacionServicio.updateOtrosCampos(modelo);
            return RedirectToAction("ListarOtrosCampos");
        }
        [HttpGet]
        public ActionResult EliminarMotivos(decimal id)
        {
            FidelizacionMotivosCancelacion modelo = new FidelizacionMotivosCancelacion();
            modelo = fidelizacionServicio.getMotivosCancelacionById(id);
            modelo.Eliminado = 1;
            fidelizacionServicio.updateMotivoCancelacion(modelo);
            return RedirectToAction("ListarMotivosCancelacion");
        }

        [HttpGet]
        public ActionResult EliminarSubmotivoCancelacion(decimal id)
        {
            FidelizacionSubmotivosCancelacion modelo = new FidelizacionSubmotivosCancelacion();
            modelo = fidelizacionServicio.getSubmotivosCancelacionById(id);
            modelo.Eliminado = 1;
            fidelizacionServicio.updateSubmotivoCancelacion(modelo);
            return RedirectToAction("ListarSubmotivosCancelacion");
        }
        [HttpGet]
        public ActionResult EliminarTipificacion(decimal id)
        {
            FidelizacionTipificacion modelo = new FidelizacionTipificacion();
            modelo = fidelizacionServicio.getTipificacionById(id);
            modelo.Eliminado = 1;
            fidelizacionServicio.updateTipificacion(modelo);
            return RedirectToAction("ListarTipificacion");
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RegistrarSolicitud(ViewModelRegistrarSolicitud r)
        {
            var interRet = (((r.FidelizacionRegistro.InternetRet == null || r.FidelizacionRegistro.InternetRet == false)) ? "0" : "1");
            var televRet = (((r.FidelizacionRegistro.TelevisionRet == null || r.FidelizacionRegistro.TelevisionRet == false)) ? "0" : "1");
            var telefRet = (((r.FidelizacionRegistro.TelevisionRet == null || r.FidelizacionRegistro.TelevisionRet == false)) ? "0" : "1");

            var idEstrategiaA = 1;
            var idEstrategiaB = 1;
            var idEstrategiaC = 1;

            var inter = (((r.FidelizacionRegistro.Internet == false)) ? "0" : "1");
            var telev = (((r.FidelizacionRegistro.Television == false)) ? "0" : "1");
            var telef = (((r.FidelizacionRegistro.Telefonia == false)) ? "0" : "1");

            var idNivel = 0;
            if (Session["Formulario Recuperacion"] != null)
                idNivel = 3;
            if (Session["Formulario Retencion"] != null)
                idNivel = 2;
            if (Session["Formulario Contencion"] != null)
                idNivel = 1;

            int n;
            bool isNumeric = int.TryParse(Convert.ToString(r.FidelizacionRegistro.Renta), out n);

            if ((r.FidelizacionRegistro.TipificacionId == 0))
            {
                ViewBag.errorTipificacion = "Seleccione el acuerdo";
                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
               
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (r.FidelizacionRegistro.SubmotivoId == 0)
            {
                ViewBag.errorTipificacion = "Seleccione un submotivo";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (r.FidelizacionMotivos.Id == 0) {
                //seleccionar Motivo
                ViewBag.errorMotivo = "Seleccione un Motivo";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (inter == "0" && telev == "0" && telef == "0")
            {
                //seleccionar Servicios
                ViewBag.errorServicios = "Indique la intención de cancelacion";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (Request.Form["rbPermanencia"] == null)
            {
                //seleccionar permanencia
                ViewBag.errorPermanencia = "Indique Si el clliente tiene o no permanencia";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (Request.Form["rbCorte"] == null)
            {
                //seleccionar corte
                ViewBag.errorCorte = "Seleccione el día de corte";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (r.FidelizacionRegistro.Ticket == null || r.FidelizacionRegistro.Ticket == 0)
            {
                //dIGITE TICKET
                ViewBag.errorTicket = "Digite el número del ticket";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (Session["Formulario Contencion"] != null && (r.FidelizacionRegistro.UsuarioTransfiere == null || r.FidelizacionRegistro.UsuarioTransfiere == ""))
            {
                //dIGITE TICKET
                ViewBag.errorUsuario = "Escriba el usuario de la presona que transfiere";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (r.FidelizacionRegistro.Notas == null)
            {
                //seleccionar Notas

                ViewBag.errorCorte = "Genere la notas para esta solicitud";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                
                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1,0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            else if (r.FidelizacionRegistro.Renta == null || isNumeric == false)
            {
                //seleccionar Renta

                ViewBag.errorRenta = "Ingrese un valor para la renta";

                ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);

                ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                var s = fidelizacionServicio.getRecursivaAll(1, 0);
                ViewBag.slEstrategia = s;
                return View(r);
            }
            var Tipificacion = fidelizacionServicio.getTipificacionById(Convert.ToInt32(r.FidelizacionRegistro.TipificacionId));
            //var rest = ""
;
            var diasPreaviso = 5;
            var FechaSiguiente = "";

            var test = fidelizacionServicio.getMaestrosByCorteId(diasPreaviso, Convert.ToInt16(Request.Form["rbCorte"]));
            var iniciaConteo = Convert.ToDateTime(test[Convert.ToInt32(diasPreaviso - 1)].Fecha);
            var esteMes = DateTime.Compare(Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd")), iniciaConteo);
            if (esteMes < 0)///se puede radicar este mismo mes
                FechaSiguiente = Convert.ToString(((DateTime.Now).AddMonths(1)).Year) + "-" + Convert.ToString(((DateTime.Now).AddMonths(1)).Month.ToString("d2")) + "-0" + Request.Form["rbCorte"];
            else
                FechaSiguiente = Convert.ToString(((DateTime.Now).AddMonths(2)).Year) + "-" + Convert.ToString(((DateTime.Now).AddMonths(2)).Month.ToString("d2")) + "-0" + Request.Form["rbCorte"];

            if (Tipificacion.ValidaRetencion == 1)
             {//Contenido o retenido
                

                
                
                if (r.FidelizacionRegistro.RecursivaIdA == 0)
                {
                    //seleccionar Estrategia1
                    ViewBag.errorEstrategiaA = "Selecciona una estrategia";
                    ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                    
                    ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                    ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                    var s = fidelizacionServicio.getRecursivaAll(1,0);
                    ViewBag.slEstrategia = s;
                    return View(r);
                }
                else
                {
                    var c1 = 1;
                    
                    do
                    {
                        c1++;
                    }
                    while (Request.Form["sltEstrategiasA_" + c1] != null);var tmp = Convert.ToInt32(Request.Form["sltEstrategiasA_" + (c1 - 1)]);


                    var E1 = fidelizacionServicio.getRecursivaAll(Convert.ToInt32(Request.Form["sltEstrategiasA_" + (c1 - 1)]),0);
                    if (E1.Count > 0 || E1 == null)
                    {
                        //seleccionar hijo
                        ViewBag.errorHijoA = "Completa la estrategia N° 1";
                        ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                        
                        ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                        ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                        var s = fidelizacionServicio.getRecursivaAll(1,0);
                        ViewBag.slEstrategia = s;
                        return View(r);
                    }else
                        idEstrategiaA = Convert.ToInt32 (Request.Form["sltEstrategiasA_" + (c1 - 1)]);

                }
                if (r.FidelizacionRegistro.RecursivaIdB != 0)
                {
                    var c2 = 1;

                    do
                    {
                        c2++;
                    }
                    while (Request.Form["sltEstrategiasB_" + c2] != null);

                    var E2 = ((Request.Form["sltEstrategiasB_" + (c2 - 1)] != null)? fidelizacionServicio.getRecursivaAll(Convert.ToInt32(Request.Form["sltEstrategiasB_" + (c2 - 1)]),0):null) ;
                    
                    if (E2 == null) { }
                    else if (E2.Count > 0)

                    {
                        //seleccionar hijo
                        ViewBag.errorHijoB = "Completa la estrategia N° 2";
                        ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                        
                        ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                        ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                        var s = fidelizacionServicio.getRecursivaAll(1,0);
                        ViewBag.slEstrategia = s;
                        return View(r);
                    }else
                        idEstrategiaB = Convert.ToInt32 (Request.Form["sltEstrategiasB_" + (c2 - 1)]);
                }
                if (r.FidelizacionRegistro.RecursivaIdC != 0)
                {
                    var c3 = 1;

                    do
                    {
                        c3++;
                    }
                    while (Request.Form["sltEstrategiasA_" + c3] != null);

                    var E3 = ((Request.Form["sltEstrategiasC_" + (c3 - 1)] != null) ? fidelizacionServicio.getRecursivaAll(Convert.ToInt32(Request.Form["sltEstrategiasB_" + (c3 - 1)]),0) : null);
                    if (E3 == null) { }
                    else if (E3.Count > 0 || E3 == null)
                    {
                        //seleccionar hijo
                        ViewBag.errorHijoC = "Completa la estrategia N° 3";
                        ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                        
                        ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                        ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                        var s = fidelizacionServicio.getRecursivaAll(1,0);
                        ViewBag.slEstrategia = s;
                        return View();
                    }
                    else
                        idEstrategiaC = Convert.ToInt32(Request.Form["sltEstrategiasC_" + (c3 - 1)]);
                }
                
            if (interRet + televRet + telefRet == "000"  && idNivel != 1)
                {
                    //seleccionar servicios retenidos
                    ViewBag.errorServiciosRet = "Indique los servicios que desea mantener";
                    ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
                    
                    ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
                    ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
                    var s = fidelizacionServicio.getRecursivaAll(1,0);
                    ViewBag.slEstrategia = s;
                    return View();

                }
            }
            else {
                interRet = televRet = telefRet = "0";
                    }

            FidelizacionRegistro Registro = new FidelizacionRegistro();
            Registro.Cuenta = r.FidelizacionRegistro.Cuenta;
            Registro.DiaCorte = Convert.ToInt32( Request.Form["rbCorte"]);
            Registro.Direccion = "";
            Registro.FechaCorte = Convert.ToDateTime(FechaSiguiente);
            Registro.FechaRegistro = DateTime.Now;
            Registro.Nivel = idNivel;
            Registro.Notas = r.FidelizacionRegistro.Notas;
            Registro.Permanencia = Request.Form["rbPermanencia"];
            Registro.RecursivaIdA = idEstrategiaA;
            Registro.RecursivaIdB = idEstrategiaB;
            Registro.RecursivaIdC = idEstrategiaC;
            Registro.Renta = r.FidelizacionRegistro.Renta;
            Registro.ServiciosId = inter + telev + telef;
            Registro.ServiciosRetenidosId = interRet + televRet + telefRet;
            Registro.SubmotivoId = r.FidelizacionRegistro.SubmotivoId;
            Registro.Ticket = r.FidelizacionRegistro.Ticket;
            Registro.TipificacionId = r.FidelizacionRegistro.TipificacionId;
            Registro.UsuarioId = Convert.ToInt32(Session["IdUsuario"]);
            Registro.UsuarioTransfiere = r.FidelizacionRegistro.UsuarioTransfiere;
            fidelizacionServicio.setRegistro(Registro);

            
            return RedirectToAction
                ("RegistrarSolicitud");
        }
        [HttpGet]
        public ActionResult RegistrarSolicitud()
        {
            //ViewModelRegistrarSolicitud modelo = new ViewModelRegistrarSolicitud();
            ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
            var idNivel = 0;
            if (Session["Formulario Recuperacion"] != null)
                idNivel = 3;
            if (Session["Formulario Retencion"] != null)
                idNivel = 2;
            if (Session["Formulario Contencion"] != null)
                idNivel = 1;
            ViewBag.sltAcuerdo = fidelizacionServicio.getTipificacionAll(0, idNivel);
            ViewBag.fields = fidelizacionServicio.getOtrosCamposAll(0, 1);
            var s = fidelizacionServicio.getRecursivaAll(1,0);
            ViewBag.slEstrategia = s;
            return View();
            
        }
        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            return new JsonResult()
            {
                Data = JsonConvert.SerializeObject(inboundService.TraerClienteCompletoPorCuenta(CuentaCliente)),
                JsonRequestBehavior = JsonRequestBehavior.DenyGet
            };
        }
        public JsonResult getSubmotivosPorMotivoJson(int idMotivo)
        {
            var Motivos = fidelizacionServicio.getSubmotivosCancelacionAll(0,idMotivo);
            return Json(Motivos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getHijoRecursivaJson(int idPadre)
        {
            var nivel = 0;
            if (Session["Formulario Contencion"] != null)
                nivel = 1;
            else if (Session["Formulario Retencion"] != null)
                nivel = 2;
            else if (Session["Formulario Recuperacion"] != null)
                nivel = 3;

            //var s = fidelizacionServicio.getRecursivaAll(1);
            var Motivos = fidelizacionServicio.getRecursivaAll(idPadre, nivel);
            //var testc = "";
            return Json(Motivos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getHijoRecursivaAdmonJson(int idPadre)
        {
            //var s = fidelizacionServicio.getRecursivaAll(1);
            var Motivos = fidelizacionServicio.getRecursivaAll(idPadre, 0);
            //var testc = "";
            return Json(Motivos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getNotasJson(decimal idNota, decimal idSubmotivo, string idServicios, string idServiciosRet, decimal idE1, decimal idE2, decimal idE3, string permanencia, int idTicket, string userTransfer, int renta, int Corte, int Cuenta)
        {
            var DataCliente = inboundService.TraerClienteCompletoPorCuenta(Cuenta);
            var nomCliente = "";
            if (DataCliente != null)
                nomCliente = DataCliente.Nombre + " " + DataCliente.Apellido;
            else
                return Json("0", JsonRequestBehavior.AllowGet);


            decimal diasPreaviso = 5;
            var Tipificacion = fidelizacionServicio.getTipificacionById(Convert.ToInt32(idNota));
            //if (Tipificacion.ValidaRetencion == 1)
            var test = fidelizacionServicio.getMaestrosByCorteId(diasPreaviso, Corte);

            var iniciaConteo = Convert.ToDateTime(test[Convert.ToInt32(diasPreaviso - 1)].Fecha);
            var esteMes = DateTime.Compare(Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd")), iniciaConteo);
            var FechaSiguiente = "";
            if (esteMes < 0)///se puede radicar este mismo mes
                FechaSiguiente =  Convert.ToString(((DateTime.Now).AddMonths(1)).Year) + "-" + Convert.ToString(((DateTime.Now).AddMonths(1)).Month.ToString("d2")) + "-0" + Convert.ToString(Corte);
            else
                FechaSiguiente = Convert.ToString(((DateTime.Now).AddMonths(2)).Year) + "-" + Convert.ToString(((DateTime.Now).AddMonths(2)).Month.ToString("d2")) + "-0" + Convert.ToString(Corte);

            var txt = Tipificacion.Nota;
            var Submotivo = fidelizacionServicio.getSubmotivosCancelacionById(Convert.ToInt32(idSubmotivo));
            var Motivo = fidelizacionServicio.getMotivosCancelacionById(Submotivo.FIDMotivoId);
             
            //FidelizacionMaestroServicios ServRet = new FidelizacionMaestroServicios();
            //if (Session["Formulariio Contencion"] == null)
            var ServRet = fidelizacionServicio.getMaestroServiciosById(idServiciosRet);
            var Serv = fidelizacionServicio.getMaestroServiciosById(idServicios);
            
            List<FidelizacionRecursiva> E2 = new List<FidelizacionRecursiva>();
            List<FidelizacionRecursiva> E3 = new List<FidelizacionRecursiva>();
            List<FidelizacionRecursiva> E1 = new List<FidelizacionRecursiva>();
            if (idE1 == 0) { }
            else
                E1 = fidelizacionServicio.getRecursivaArbol(Convert.ToInt32(idE1));
            if (idE2 == 0) { }
            else {
                E2 = fidelizacionServicio.getRecursivaArbol(Convert.ToInt32(idE2));
            }
            if (idE3 == 0) { }
            else
            {
                E3 = fidelizacionServicio.getRecursivaArbol(Convert.ToInt32(idE3));
            }
            var txtE1 = "";
            var txtE2 = "";
            var txtE3 = "";
            for (var i = 0; i < E1.Count; i++) {
                txtE1 += E1[i].Nombre+", ";
            }
            for (var i = 0; i < E2.Count; i++)
            {
                txtE2 += E2[i].Nombre+",";
            }
            for (var i = 0; i < E3.Count; i++)
            {
                txtE3 += E3[i].Nombre+",";
            }
            var myClausula = "";
            if (permanencia == "conPermanencia")
            {
                myClausula = "con clausula de permanencia activa se confirma valor";
            }
            else if (permanencia == "sinPermanencia")
            {
                myClausula = "sin clausula de permanencia activa";
            }

            txt = txt.Replace("[:Motivo:]", Motivo.Motivo);
            txt = txt.Replace("[:Submotivo:]", Submotivo.Submotivo);
            txt = txt.Replace("[:Estrategia1:]", txtE1);
            txt = txt.Replace("[:Estrategia2:]", txtE2);
            txt = txt.Replace("[:Estrategia3:]", txtE3);
            if(Session["Formulario Contencion"] == null)
                txt = txt.Replace("[:ServiciosRet:]", ServRet.Nombre);
            txt = txt.Replace("[:Ticket:]", Convert.ToString(idTicket));
            txt = txt.Replace("[:Servicios:]", Serv.Nombre);
            txt = txt.Replace("[:Clausula:]", myClausula);
            txt = txt.Replace("[:UsuarioTransfiere:]", userTransfer);
            txt = txt.Replace("[:Ticket:]", Convert.ToString(idTicket));
            txt = txt.Replace("[:Renta:]", Convert.ToString(renta));
            txt = txt.Replace("[:Permanencia:]", myClausula);
            txt = txt.Replace("[:FechaCorte:]", FechaSiguiente);
            txt = txt.Replace("[:Titular:]", nomCliente);
            txt = txt.Replace("[:Cuenta:]", Convert.ToString(Cuenta));


            return Json(txt.ToUpper(), JsonRequestBehavior.AllowGet);
        }

        //private List<SelectListItem> ListaDesplegable(List<FidelizacionRecursiva> test, decimal idSeleccionado) {
        //    List<FidelizacionRecursiva> items = new List<FidelizacionRecursiva>();
        //    foreach (FidelizacionRecursiva temporal in test) {
        //        if (idSeleccionado == temporal.Id)
        //        items.Add(new SelectListItem { Text = temporal.Nombre, Value = Convert.ToString(temporal.Id), Selected = true });
        //        else
        //            items.Add(new SelectListItem { Text = temporal.Nombre, Value = Convert.ToString(temporal.Id)});
        //    }

        //    //items.Add(new SelectListItem { Text = "Action", Value = "0" });

        //    //items.Add(new SelectListItem { Text = "Drama", Value = "1" });

        //    //items.Add(new SelectListItem { Text = "Comedy", Value = "2", Selected = true });

        //    //items.Add(new SelectListItem { Text = "Science Fiction", Value = "3" });

        //    //ViewBag.MovieType = items;
        //    return items;
        //}
        private List<FidelizacionRecursiva> GetSelectListItems(List<FidelizacionRecursiva> elements, decimal idSeleccionado)
        {
            List<FidelizacionRecursiva> selectList = new List<FidelizacionRecursiva>();
            //var selectList = new Array();
            
            foreach (var element in elements)
            {
                if (idSeleccionado == element.Id)
                {
                    element.Label = "selected";
                    //selectList.Add(new SelectListItem
                    //{
                    //    Value = Convert.ToString(element.Id),
                    //    Text = element.Nombre,
                    //    Selected = true
                    //});
                }
                else
                {
                    element.Label = "";
                    //selectList.Add(new SelectListItem
                    //{
                    //    Value = Convert.ToString(element.Id),
                    //    Text = element.Nombre,
                    //    Selected = false
                    //});
                }
            }
            //var y = "";
            return elements;
            //var selectList = new List<SelectListItem>();

            //foreach (var element in elements)
            //{
            //    if (idSeleccionado == element.Id)
            //    {
            //        selectList.Add(new SelectListItem
            //        {
            //            Value = Convert.ToString(element.Id),
            //            Text = element.Nombre,
            //            Selected = true
            //        });
            //    }
            //    else
            //    {
            //        selectList.Add(new SelectListItem
            //        {
            //            Value = Convert.ToString(element.Id),
            //            Text = element.Nombre,
            //            Selected = false
            //        });
            //    }
            //}
            //var y = "";
            //return selectList;
        }

    }
}