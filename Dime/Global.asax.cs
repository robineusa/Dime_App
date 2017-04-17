﻿using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace Dime
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            GlobalHost.Configuration.ConnectionTimeout = TimeSpan.FromDays(910);
            GlobalHost.Configuration.DisconnectTimeout = TimeSpan.FromDays(270);
            GlobalHost.Configuration.KeepAlive = TimeSpan.FromDays(90);

            //RouteTable.Routes.MapHubs();
        }
    }
}
