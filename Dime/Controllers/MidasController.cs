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
    public class MidasController : Controller
    {
        WSD.MidasServiceClient midasService;

        public MidasController()
        {
            midasService = new WSD.MidasServiceClient();
            midasService.ClientCredentials.Authenticate();
        }

        [HttpGet]
        public ActionResult Tipificador()
        {
            ViewModelMidas model = new ViewModelMidas();
            return View(model);
        }
        [HttpGet]
        public ActionResult AdministrarArboles()
        {
            return View();
        }
        public JsonResult TraerInformacionCliente(int CuentaCliente)
        {
            CargueBaseMidas cargueBaseMidas = new CargueBaseMidas();
            cargueBaseMidas = midasService.TraeCuentaMidas(Convert.ToDecimal(CuentaCliente));

            if (cargueBaseMidas != null)
            {
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(cargueBaseMidas),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
            else
            {
                cargueBaseMidas = new CargueBaseMidas();
                cargueBaseMidas.Id = 0;
                return new JsonResult()
                {
                    Data = JsonConvert.SerializeObject(cargueBaseMidas),
                    JsonRequestBehavior = JsonRequestBehavior.DenyGet
                };
            }
        }
    }
}
