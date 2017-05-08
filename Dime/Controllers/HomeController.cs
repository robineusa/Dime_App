using Dime.Helpers;
using System.Web.Mvc;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class HomeController : MyController
    {

        public ActionResult DashboardAsesor()
        {
            return View();
        }

        public ActionResult DashboardCelula()
        {
            return View();
        }


        public ActionResult DashboardAdministrador()
        {
            return View();
        }

        public ActionResult DashboardAltoValor()
        {
            return View();
        }

        public ActionResult DashboardPotencial()
        {
            return View();
        }

        public ActionResult DefaultAlr()
        {
            return View();
        }
    }
}