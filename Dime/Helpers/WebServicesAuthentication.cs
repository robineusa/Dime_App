using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Description;
using System.Web;

namespace Dime.Helpers
{
    public static class WebServicesAuthentication
    {


        public static bool Authenticate(this ClientCredentials credencials)
        {  try
            {
                credencials.ServiceCertificate.Authentication.CertificateValidationMode = System.ServiceModel.Security.X509CertificateValidationMode.None;
                credencials.UserName.UserName = "acc1";
                credencials.UserName.Password = "123";
                return true;
            }catch(Exception e)
            {
                return false;
            }
        }


    }
}