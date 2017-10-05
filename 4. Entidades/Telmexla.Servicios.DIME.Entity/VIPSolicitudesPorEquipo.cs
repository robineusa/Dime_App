

using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class VIPSolicitudesPorEquipo
    {
        public decimal Id { get; set; }
        public decimal IdSolicitud { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoDeEquipo { get; set; }
        [Required(ErrorMessage = "Ingrese información")]
        public string Mac { get; set; }
        [Required(ErrorMessage = "Ingrese información")]
        public string Tarjeta { get; set; }
    }
}
