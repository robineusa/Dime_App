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
    public class DistribucionBlendingController : MyController
    {
        WSD.DistribucionBlendingServiceClient distribucionBlendingService;
        public DistribucionBlendingController()
        {
            distribucionBlendingService = new WSD.DistribucionBlendingServiceClient();
            distribucionBlendingService.ClientCredentials.Authenticate();
        }

        [HttpGet]
        public ActionResult CableModemFueradeNiveles()
        {
            int idAsesor = 5301;
            ViewModelDistribucionesBlending model = new ViewModelDistribucionesBlending();
            model.DatosDelCliente = distribucionBlendingService.TraerInformacionCuentaBlending(idAsesor,"FUERANIVELES","BRM","FUERANIVELES","NIVELES");
            model.FueraNiveles = distribucionBlendingService.TraerInformacionCuentaFueraNiveles(Convert.ToDecimal(model.DatosDelCliente.Cuenta));
            return View(model);
        }
        [HttpPost]
        public ActionResult CableModemFueradeNiveles(ViewModelDistribucionesBlending model)
        {
            return View(model);

        }
    }
}