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
            var listado = fidelizacionServicio.getTipificacionAll();

            foreach (var tmp in listado)
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
            ViewModelRecursiva modelo = new ViewModelRecursiva();
            modelo.Recursiva = fidelizacionServicio.getRecursivaById(id);
            //modelo.ListRecursiva = fidelizacionServicio.getRecursivaVistaAll();

            ViewBag.Lista = fidelizacionServicio.getRecursivaVistaAll();

            return View(modelo);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult ActualizarRecursiva(ViewModelRecursiva objRecursiva)
        {

            if (objRecursiva.Recursiva.Nombre == "" || objRecursiva.Recursiva.Nombre == null)
            {
                ViewBag.errorMotivo = "Escriba el título de la opción que desea crear";
            }
            else if (objRecursiva.Recursiva.ParentId < 1 || Convert.ToString(objRecursiva.Recursiva.ParentId) == "")
            {
                ViewBag.errorOtrosCampos = "Indique a cual opcion desea asociarlo (Escoja un padre)";
            }
            else if (objRecursiva.Recursiva.Label == "" || objRecursiva.Recursiva.Label == null)
            {
                ViewBag.errorOtrosOfrecimientos = "Indique La etiqueta que desea colocarle en el momento de seleccionarlo";
            }
            else
            {
                var Padre = fidelizacionServicio.getRecursivaVistaById(objRecursiva.Recursiva.ParentId);
                string recu = ((Request.Form["Recuperacion"] == "false") ? "0" : "1");
                string ret = ((Request.Form["Retencion"] == "false") ? "0" : "1");
                string cont = ((Request.Form["Contencion"] == "false") ? "0" : "1");

                objRecursiva.Recursiva.VerNivel = cont + ret + recu;
                fidelizacionServicio.updateRecursiva(objRecursiva.Recursiva);
                return RedirectToAction("ListarRecursiva");
            }
            return View(objRecursiva);
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
                //modelo.Recursiva.Label = "Test";
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
            var listado = fidelizacionServicio.getOtrosCamposAll();
            
            foreach (var tmp in listado) {
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
        [HttpGet]
        public ActionResult RegistrarSolicitud()
        {
            //ViewModelRegistrarSolicitud modelo = new ViewModelRegistrarSolicitud();
            ViewBag.sltMotivos = fidelizacionServicio.getMotivosCancelacionAll(0);
            var s = fidelizacionServicio.getRecursivaAll(1);
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
            //var s = fidelizacionServicio.getRecursivaAll(1);
            var Motivos = fidelizacionServicio.getRecursivaAll(idPadre);
            return Json(Motivos, JsonRequestBehavior.AllowGet);
        }

    }
}