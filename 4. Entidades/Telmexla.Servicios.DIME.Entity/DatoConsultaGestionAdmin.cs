using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Business
{
    public class DatoConsultaGestionAdmin
    {
        public decimal? IdIngreso { get; set; } // ID_INGRESO
        public decimal CuentaCliente { get; set; } // CUENTA_CLIENTE
        public decimal? Ticket { get; set; } // TICKET
        public string NombreLineaIngreso { get; set; } // NOMBRE_LINEA_INGRESO (length: 50)
        public string NombreLineaEscalado { get; set; } // NOMBRE_LINEA_ESCALADO (length: 50)
        public string AliadoApertura { get; set; } // ALIADO_APERTURA (length: 50)
        public System.DateTime? FechaNota { get; set; } // FECHA_NOTA
        public System.DateTime? FechaApertura { get; set; } // FECHA_APERTURA
        public System.DateTime? HoraApertura { get; set; } // HORA_APERTURA
        public System.DateTime? FechaCierre { get; set; } // FECHA_CIERRE
        public string Usuario { get; set; } // USUARIO (length: 100)
        public string UsuarioApertura { get; set; } // USUARIO_APERTURA (length: 100)
        public string UsuarioCierre { get; set; } // USUARIO_CIERRE (length: 100)
        public System.DateTime? FechaUltimaActualizacion { get; set; } // FECHA_ULTIMA_ACTUALIZACION
        public string UsuarioUltimaActualizacion { get; set; } // USUARIO_ULTIMA_ACTUALIZACION (length: 100)
        public System.DateTime? HoraUltimaActualizacion { get; set; } // HORA_ULTIMA_ACTUALIZACION
        public string Macroproceso { get; set; } // MACROPROCESO (length: 100)
        public string Marcacion { get; set; } // MARCACION (length: 100)
        public string Nota { get; set; } // NOTA (length: 1073741823)
        public int? IdEstado { get; set; } // ID_ESTADO
    }
}
