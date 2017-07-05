using Dime.Helpers;
using System;
using System.Collections.Generic;
using System.Globalization;
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
                var result = multiplay.BuscarDatosMultiplay(cuentaCliente);
                if ((model.DatosMultiplay.Cuenta != 0 || model.DatosMultiplay.Cuenta.Equals(true)) && result != null)
                {
                    model.DatosMultiplay = result;
                }
                else
                {
                    ViewBag.Error = "Cuenta Digitada No Existe"; model = new ViewModelMultiPlay();
                }
            }
            if (BotonEnvia.Equals("GuardaDatos"))
            {
                model.Multiplay.AliadoGestion = Session["AliadoLogeado"].ToString();
                model.Multiplay.UsuarioGestion = Session["IdUsuario"].ToString();
                model.Multiplay.NombreUsuarioGestion = Session["NombreUsuario"].ToString();
                model.Multiplay.FechaGestion = Convert.ToDateTime(model.Multiplay.FechaGestion);
                DateTime fecha = Convert.ToDateTime(model.Multiplay.FechaGestionRemplazo, CultureInfo.InvariantCulture);
                model.Multiplay.FechaGestion = fecha;
                multiplay.EliminaCuentaDatosMultiplay(model.Multiplay.Id, model.Multiplay.Cuenta);
                multiplay.InsertarMultiPlay(model.Multiplay);
                model = new ViewModelMultiPlay();
            }
            
            return View(model);
        }
    }
}