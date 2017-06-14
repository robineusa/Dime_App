
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GBPProducto
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public string OperacionGestion { get; set; }
        public string CampanaGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoContacto { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Gestion { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Cierre { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Causa { get; set; }
        public string Observaciones { get; set; }
        public System.DateTime? FechaSeguimiento { get; set; }
    }
}
