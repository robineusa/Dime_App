using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Helpers
{
    public class ExpiringFilter : ActionFilterAttribute
    {

        //Aca igual se puede hacer vencimiento de sesion a 30 min if Session["timeCheck"] -Date.Now() >30 then ctx.Session= null;
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            if (HttpContext.Current.Session["ModoLogin"] == null)
            {
                filterContext.Result = new RedirectResult("~/Account/Login");
                return;
            }

            base.OnActionExecuting(filterContext);
        }

    }
}