
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class VisitasAutorizadas
    {
        public decimal IdVisita { get; set; }
        public System.DateTime? FechaRegistro { get; set; }
        public decimal UsuarioRegistro { get; set; }
        public string AliadoRegistro { get; set; }
        public string OperacionRegistro { get; set; }
        [Required(ErrorMessage = "Ingrese un número de cuenta")]
        public decimal CuentaCliente { get; set; }
        [Required(ErrorMessage = "Ingrese la llamada de servicio")]
        public string LlamadaServicio { get; set; }
        public string Aviso { get; set; }
        [Required(ErrorMessage = "Seleccione un motivo")]
        public string Motivo { get; set; }
        [Required(ErrorMessage = "Ingrese la cédula del usuario")]
        public decimal CedulaUsuarioGestion { get; set; }
    }
}
