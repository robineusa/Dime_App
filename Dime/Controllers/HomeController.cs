using System.Web.Mvc;

namespace Dime.Controllers
{
    public class HomeController : Controller
    {

        [AllowAnonymous]
        public ActionResult DashboardAsesor()
        {
            return View();
        }
        [AllowAnonymous]
        public ActionResult DashboardCelula()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult DashboardAdministrador()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult DefaultAlr()
        {
            return View();
        }
    }
}