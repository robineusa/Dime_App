using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GBPRentabilizacion
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public string OperacionGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string ConsumosPpv { get; set; }
        public string UltimaPpv { get; set; }
        public string SiembraHd { get; set; }
        public string SiembraVoz { get; set; }
        public string BlindajeInternet { get; set; }
        public string UltimaMarcacion { get; set; }
        public string OfrecimientoAceptado { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoContacto { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Gestion { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Cierre { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Causa { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Motivo { get; set; }
        public string Observaciones { get; set; }
        public System.DateTime? FechaSeguimiento { get; set; }
    }
}
