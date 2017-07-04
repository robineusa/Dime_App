using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telmexla.Servicios.DIME.Entity;

namespace Dime.Controllers
{
    
    public class MultiPlayController : Controller
    {
        WSD.MultiPlayServiceClient multiplay;

        public MultiPlayController()
        {
            multiplay = new WSD.MultiPlayServiceClient();
            multiplay.ClientCredentials.Authenticate();
        }

        [HttpGet]
        public ActionResult MultiPlayCelula()
        {
            ViewModelMultiPlay model = new ViewModelMultiPlay();
            return View(model);
        }
        [HttpPost]
        public ActionResult MultiPlayCelula(ViewModelMultiPlay model, string BotonEnvia)
        {
            
            if (BotonEnvia.Equals("Buscar"))
            {
                int cuentaCliente = model.DatosMultiplay.Cuenta;
                model.DatosMultiplay = multiplay.BuscarDatosMultiplay(cuentaCliente);

            }
            return View(model);
        }
    }
}