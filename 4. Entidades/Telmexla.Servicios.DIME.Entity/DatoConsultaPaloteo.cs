using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Business
{
     public class DatoConsultaPaloteo
    {
        public decimal? IdIngreso { get; set; } // ID_INGRESO
        public decimal CuentaCliente { get; set; } // CUENTA_CLIENTE
        public decimal? Ticket { get; set; } // TICKET
        public string LlamadaCliente { get; set; } // LLAMADA_CLIENTE (length: 2)
        public System.DateTime? FechaInteraccion { get; set; } // FECHA_NOTA
        public System.DateTime? HoraInteraccion { get; set; } // HORA_NOTA
        public string NombreLineaNota { get; set; } // NOMBRE_LINEA_NOTA (length: 50)
        public string UsuarioNotaCC { get; set; } // USUARIO (length: 100)
        public string NombreUsuarioNota { get; set; }
        public string RolUsuarioNota { get; set; }
        public string AliadoApertura { get; set; } // ALIADO_APERTURA (length: 50)
        public string Macroproceso { get; set; } // MACROPROCESO (length: 100)
        public string Marcacion { get; set; } // MARCACION (length: 100)
        public string Division { get; set; } // DIVISION (length: 50)
        public string Area { get; set; } // AREA (length: 50)
        public string Zona { get; set; } // ZONA (length: 50)
        public string Distrito { get; set; } // DISTRITO (length: 50)
        public string NombreComunidad { get; set; } // NOMBRE_COMUNIDAD (length: 50)
        public string Nodo { get; set; } // NODO (length: 10)
        public string Nota { get; set; } // NOTA (length: 1073741823)
        public int? Estado { get; set; } // ID_ESTADO

    }
}
