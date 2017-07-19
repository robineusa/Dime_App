using Dime.Helpers;
using Newtonsoft.Json;
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
                decimal cuentaCliente = model.Multiplay.Cuenta;
                var result = multiplay.BuscarDatosMultiplay(cuentaCliente);
                if ((model.Multiplay.Cuenta != 0 || model.Multiplay.Cuenta.Equals(true)) && result != null)
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
                model.Multiplay.FechaCargueBase = Convert.ToDateTime(model.Multiplay.FechaCargueBase);
                DateTime fecha = Convert.ToDateTime(model.Multiplay.FechaGestion, CultureInfo.InvariantCulture);
                DateTime fechaCarge = Convert.ToDateTime(model.Multiplay.FechaCargueBase, CultureInfo.InvariantCulture);
                model.Multiplay.FechaGestion = fecha;
                model.Multiplay.FechaCargueBase = fechaCarge;
                multiplay.EliminaCuentaDatosMultiplay(model.Multiplay.IdSubReg, model.Multiplay.Cuenta);
                multiplay.InsertarMultiPlay(model.Multiplay);
                model = new ViewModelMultiPlay();
            }

            return View(model);
        }
        [HttpGet]
        public ActionResult ConsultasAdminMultiPlay()
        {
            return View();
        }
        public JsonResult JsonConsultaBasePresidencial(string fechaInicial, string fechaFinal)
        {
            DateTime inicial = Convert.ToDateTime(fechaInicial);
            DateTime final = Convert.ToDateTime(fechaFinal);
            var result = multiplay.ConsultaAdminBasePresidencial(inicial, final);
            var jsonResult = Json(JsonConvert.SerializeObject(result), JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}