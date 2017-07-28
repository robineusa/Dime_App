﻿using Dime.Helpers;
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
    public class BackEliteController : MyController
    {
        WSD.BackEliteServiceClient backeliteservice;
        WSD.MaestroNodoServiceClient maestronodosservice;

        public BackEliteController()
        {
            backeliteservice = new WSD.BackEliteServiceClient();
            backeliteservice.ClientCredentials.Authenticate();
            maestronodosservice = new WSD.MaestroNodoServiceClient();
            maestronodosservice.ClientCredentials.Authenticate();
        }
        public JsonResult ListaTipoDeEscalamientosJson()
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaTipoDeEscalamientos()), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaDetalleDeEscalamientosJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDetalleDeEscalamientos(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpGet]
        public ActionResult SolicitudBackElite()
        {
            ViewModelBackElite modelo = new ViewModelBackElite();
            return View(modelo);
        }
        [HttpPost]
        public ActionResult SolicitudBackElite(ViewModelBackElite modelo)
        {
            
            modelo.BEPSolicitudes.UsuarioQueSolicita = Convert.ToString(Session["Usuario"].ToString());
            modelo.BEPSolicitudes.NombreUsuarioQueSolicita = Session["NombreUsuario"].ToString();
            modelo.BEPSolicitudes.AliadoQueSolicita = Session["AliadoLogeado"].ToString();
            modelo.BEPSolicitudes.OperacionQueSolicita = Session["OperacionUsuarioHolos"].ToString();

            backeliteservice.RegistrarSolicitud(modelo.BEPSolicitudes);
            return RedirectToAction("SolicitudBackElite");
        }
        public JsonResult ListaGestionPorIdJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaDetallesDeGestion(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult ListaMalEscaladodJson(string IdTipo)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.ListaRazonesMalEscalamiento(Convert.ToDecimal(IdTipo))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        public JsonResult EstadoGestionId(string idGestion)
        {
            var jsonResult = Json(JsonConvert.SerializeObject(backeliteservice.DetalleGestionPorId(Convert.ToDecimal(idGestion))), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
       

        [HttpGet]
        public ActionResult GestionarSolicitud(ViewModelBackElite modelo)
        {
            var TipoTrabajo = "FALLA MODULO DE GESTION";
            int norecu = 0;
            
            modelo.BEPSolicitudes = backeliteservice.ApartarCuentadeSolcitudBackElita(Convert.ToDecimal(Session["Usuario"].ToString()),TipoTrabajo,norecu);
            if (modelo.BEPSolicitudes != null) 
            {
                modelo.NodosZonificados = backeliteservice.TraerNodoPorId(modelo.BEPSolicitudes.Nodo);
                modelo.BEMTipoDeEscalamientos = backeliteservice.TipoEscalamientoPorNombre(modelo.BEPSolicitudes.TipoDeSolicitud);
                ViewBag.NohayBase = null;
            }
            else
            {
                modelo.BEPSolicitudes = new BEPSolicitudes();
                ViewBag.NohayBase = "NO HAY REGISTROS DISPONIBLES";
            }
            return View(modelo);
        }

    }
}