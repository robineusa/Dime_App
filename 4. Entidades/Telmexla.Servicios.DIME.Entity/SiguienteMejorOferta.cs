using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class SiguienteMejorOferta
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public decimal Ofrecimiento1 { get; set; }
        public decimal Ofrecimiento2 { get; set; }
        public decimal Ofrecimiento3 { get; set; }

        [Required(ErrorMessage = "Seleccione un Tipo de Contacto")]
        public string TipoContacto { get; set; }

        [Required(ErrorMessage = "Seleccione una Gestión")]
        public string Gestion { get; set; }

        [Required(ErrorMessage = "Seleccione un Cierre")]
        public string Cierre { get; set; }

        [Required(ErrorMessage = "Seleccione una Razón")]
        public string Razon { get; set; }
        public string Observaciones { get; set; }

    }
}
