
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class POMSolicitudes
    {
        public decimal IdRegistro { get; set; }
        public System.DateTime? FechaSolicitud { get; set; }
        public string UsuarioSolicitud { get; set; }
        [Required(ErrorMessage = "Ingrese la cuenta del cliente")]
        public decimal CuentaCliente { get; set; }
        [Required(ErrorMessage = "Ingrese el número móvil")]
        public decimal TelefonoCeluar { get; set; }
        [Required(ErrorMessage = "Ingrese un correo")]
        public string CorreoElectronico { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string MovilClaro { get; set; }
    }
}
