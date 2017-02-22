using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Dime.Startup))]
namespace Dime
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
