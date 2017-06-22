using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class Retencion
    {
        public int Id { get; set; } // ID (Primary key)
        public System.DateTime? FechaGestion { get; set; } // FECHA_GESTION
        public string UsuarioGestion { get; set; } // USUARIO_GESTION (length: 30)
        public string NombreUsuarioGestion { get; set; } // NOMBRE_USUARIO_GESTION (length: 255)
        public string AliadoGestion { get; set; } // ALIADO_GESTION (length: 50)
        public int Cuenta { get; set; } // CUENTA

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Razon { get; set; } // RAZON (length: 100)

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string SubRazon { get; set; } // SUBRAZON    (length: 100)
        public string Observaciones { get; set; } // OBERVACIONES (length: 1000)
    }
}
