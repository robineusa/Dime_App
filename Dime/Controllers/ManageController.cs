using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Dime.Models;
using Dime.Helpers;
using Telmexla.Servicios.DIME.Entity;
using System;
using System.Collections.Generic;

namespace Dime.Controllers
{
    [ExpiringFilter]
    public class ManageController : MyController
    {


        private WSD.LoginServiceClient loginService;

        public ManageController()
        {
        }



        public async Task<ActionResult> Index(ManageMessageId? message)
        {
            ViewBag.StatusMessage =
                message == ManageMessageId.ChangePasswordSuccess ? "Su contraseña fue cambiada."
                : message == ManageMessageId.ChangeDataSuccess ? "Sus datos personales se han cambiado."
                : message == ManageMessageId.ChangeQuestionsSuccess ? "Sus preguntas de seguridad han sido cambiadas."
                : message == ManageMessageId.Error ? "An error has occurred."
                : message == ManageMessageId.AddPhoneSuccess ? "Your phone number was added."
                : message == ManageMessageId.RemovePhoneSuccess ? "Your phone number was removed."
                : "";
            loginService = new WSD.LoginServiceClient();
            loginService.ClientCredentials.Authenticate();
            var model = await loginService.RecibirUsuarioConIdAsync(Convert.ToInt32(Session["IdUsuario"].ToString()));
            return View(model);
        }


        public ActionResult ChangeDataUser()
        {
           
            return View();
        }

        public ActionResult ChangeSecurityQuestions()
        {

            loginService = new WSD.LoginServiceClient();
            loginService.ClientCredentials.Authenticate();
            List<PreguntasDesbloqueo> opcionesPreguntas = loginService.ObtenerPosiblesPreguntas();
            List<SelectListItem> selectItems = new List<SelectListItem>();
            ViewBag.IdUsuario = Session["IdUsuario"].ToString();
            ViewBag.DatosFullUsuario = "False";
            ViewBag.SesionUsuario = "0";
            foreach (var item in opcionesPreguntas)
            {
                selectItems.Add(new SelectListItem
                {
                    Text = item.Nombre,
                    Value = item.Id.ToString()
                });
            }

            return View(selectItems);
        }


        /*
          public async Task<ActionResult> VerifyPhoneNumber(string phoneNumber)
          {
              var code = await UserManager.GenerateChangePhoneNumberTokenAsync(User.Identity.GetUserId(), phoneNumber);
              // Send an SMS through the SMS provider to verify the phone number
              return phoneNumber == null ? View("Error") : View(new VerifyPhoneNumberViewModel { PhoneNumber = phoneNumber });
          }
    [HttpPost]
          [ValidateAntiForgeryToken]
          public async Task<ActionResult> VerifyPhoneNumber(VerifyPhoneNumberViewModel model)
          {
              if (!ModelState.IsValid)
              {
                  return View(model);
              }
              var result = await UserManager.ChangePhoneNumberAsync(User.Identity.GetUserId(), model.PhoneNumber, model.Code);
              if (result.Succeeded)
              {
                  var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                  if (user != null)
                  {
                      await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                  }
                  return RedirectToAction("Index", new { Message = ManageMessageId.AddPhoneSuccess });
              }
              // If we got this far, something failed, redisplay form
              ModelState.AddModelError("", "Failed to verify phone");
              return View(model);
          }
          */


        public ActionResult ChangePassword()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            loginService = new WSD.LoginServiceClient();
            loginService.ClientCredentials.Authenticate();
            Usuario usuario = new Usuario();
            usuario.Id = Convert.ToInt32(Session["IdUsuario"].ToString());
            usuario.Cedula = Convert.ToInt32(Session["Usuario"].ToString());
            usuario.Contrasena = model.OldPassword;
            int sesion = await loginService.AutenticarUsuarioEnSesionAsync(usuario);
            if (sesion != 0 && sesion != -1)
            {
                if (model.NewPassword.Equals(model.ConfirmPassword))
                {   await loginService.RestablecerContraseñaAsync(model.NewPassword, usuario.Id);
                    return RedirectToAction("Index", new { Message = ManageMessageId.ChangePasswordSuccess });
                }
                else
                {
                    ModelState.AddModelError("", "La nueva contraseña no es identica a su confirmación");
                }

            }else
            {
                ModelState.AddModelError("", "Contraseña antigua incorrecta");
            }

            return View(model);
        }






        public enum ManageMessageId
        {
            AddPhoneSuccess,
            ChangePasswordSuccess,
            ChangeQuestionsSuccess,
            ChangeDataSuccess,
            RemoveLoginSuccess,
            RemovePhoneSuccess,
            Error
        } 

    }
}