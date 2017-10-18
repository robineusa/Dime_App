
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class POMSolicitudes
    {
        public decimal IdTansaccion { get; set; }
        public System.DateTime? FechaTransaccion { get; set; }
        public string UsuarioTransaccion { get; set; }
        public string CanalTransaccion { get; set; }
        public string ZonaTransaccion { get; set; }
        public decimal TelefonoCeluar { get; set; }
        public decimal TelefonoDeContacto { get; set; }
        public string CorreoElectronico { get; set; }
        public decimal CuentaCliente { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Operacion { get; set; }
        public string TokenId { get; set; }
        public string SubCanal { get; set; }
        public System.DateTime? FechaEnvioEncuesta { get; set; }
        public decimal MinOrigen { get; set; }
        public decimal EnviaReintento { get; set; }
        public string EnviaSoloEmail { get; set; }
        public decimal IdEncuesta { get; set; }
    }
}
