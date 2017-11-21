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
        // GET: Fidelizacion
        public FidelizacionController()
        {
            fidelizacionServicio = new WSD.FidelizacionServiceClient();
            fidelizacionServicio.ClientCredentials.Authenticate();
        }
        public ActionResult CrearMotivoCancelacion()
        {
            FidelizacionMotivosCancelacion modelo = new FidelizacionMotivosCancelacion();
            fidelizacionServicio.setMotivosCancelacion(modelo);
            return View(modelo);
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
            var jsonResult = Json(JsonConvert.SerializeObject(fidelizacionServicio.getRecursivaVistaAll()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult ListarMotivosCancelacionJson()
        {

            List<FidelizacionMotivosCancelacion> modelo = new List<FidelizacionMotivosCancelacion>();
            //modelo = maestroNodosWebService.ListaNodosCreados();
            var jsonResult = Json(JsonConvert.SerializeObject(fidelizacionServicio.getMotivosCancelacionAll()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public JsonResult ListarSubmotivosCancelacionJson()
        {

            List<ViewModelSubmotivosCancelacion> modelo = new List<ViewModelSubmotivosCancelacion>();

            var jsonResult = Json(JsonConvert.SerializeObject(fidelizacionServicio.getSubmotivosCancelacionAll()), JsonRequestBehavior.AllowGet);

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
            modelo.FidelizacionMotivos = fidelizacionServicio.getMotivosCancelacionAll();



            IList<SelectListItem> selectItems = new List<SelectListItem>();
            foreach (var role in modelo.FidelizacionMotivos)
            {
                if (role.Eliminado == 0)
                {
                    SelectListItem listItem = new SelectListItem();
                    listItem.Value = Convert.ToString(role.Id);
                    listItem.Text = role.Motivo;
                    selectItems.Add(listItem);
                }

            }

            ViewBag.sltMotivos = selectItems;
            return View(modelo);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarSubmotivoCancelacion(ViewModelSubmotivosCancelacion objFidelizacion)
        {
            //objFidelizacion.Eliminado;
            //objFidelizacion.FIDMotivoId;
            //objFidelizacion.Id;
            //objFidelizacion.Registro;

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
            ViewBag.Lista = fidelizacionServicio.getRecursivaVistaAll();
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
                //return View(modelo);
            }
            else if (modelo.Recursiva.ParentId == 0)
            {
                ViewBag.errorPadre = "Seleccione el padre de esta opción";
            }
            else
            {
                var Padre = fidelizacionServicio.getRecursivaVistaById(modelo.Recursiva.ParentId);
                string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
                string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
                string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");
                modelo.Recursiva.Label = "Test";
                modelo.Recursiva.VerNivel = cont + ret + recu;
                modelo.Recursiva.Nivel = Padre.Nivel - 1;
                fidelizacionServicio.setRecursiva(modelo.Recursiva);
                return RedirectToAction("CrearRecursiva");
            }
            return View(modelo);
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

    }
}