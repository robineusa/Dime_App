
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GBLFueraNiveles
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string NombreCliente { get; set; }
        public string ApellidoCliente { get; set; }
        public string DirInstalacion { get; set; }
        public string DirCorrespondencia { get; set; }
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string Telefono3 { get; set; }
        public string Movil1 { get; set; }
        public string Movil2 { get; set; }
        public string MovilPostpago { get; set; }
        public string CorreoActual { get; set; }
        public string EstratoCliente { get; set; }
        public string ServiciosActuales { get; set; }
        public string Nodo { get; set; }
        public string NombreComunidad { get; set; }
        public string Division { get; set; }
        public string TipoCliente { get; set; }
        public string DescripcionTPC { get; set; }
        public string Cmts { get; set; }
        public string TipoModem { get; set; }
        public int Prioridad { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoContacto { get; set; }

        [Required(ErrorMessage = "Seleccione una opcion")]
        public string Gestion { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Cierre { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Razon { get; set; }
        public System.DateTime? FechaSeguimiento { get; set; }
        public string Observaciones { get; set; }
    }
}
