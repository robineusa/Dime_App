
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class VIPSolicitudes
    {
        public decimal IdSolicitud { get; set; }
        public System.DateTime? FechaSolicitud { get; set; }
        public decimal UsuarioSolicitud { get; set; }
        public string NombreUsuarioSolicitud { get; set; }
        public string AliadoSolicitud { get; set; }
        public string OperacionSolicitud { get; set; }
        public System.DateTime? FechaUltimaActualizacion { get; set; }
        public decimal UsuarioUltimaActualizacion { get; set; }
        public string NombreUsuarioUltimaActualizacion { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public decimal CuentaCliente { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoDeRequerimiento { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string RequiereAjuste { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Nodo { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Gestion { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Subrazon { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string EstadoSolicitud { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string AliadoTecnico { get; set; }
        public string Observaciones { get; set; }
        public decimal UsuarioGestionando { get; set; }
    }
}
