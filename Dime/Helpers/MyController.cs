﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Dime.Helpers
{
    public class MyController : Controller
    {

        public void RedirectToAction()
        {
            Response.Redirect(Url.Action("Login", "Account"));
        }

    }
}