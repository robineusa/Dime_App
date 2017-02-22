using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class TablaActualizarInbound
    {

        public decimal? IdIngreso { get; set; } // ID_INGRESO
        public decimal CuentaCliente { get; set; } // CUENTA_CLIENTE
        public decimal? Ticket { get; set; } // TICKET
        public string Usuario { get; set; } // USUARIO (length: 100)
        public string PerfilUsuario { get; set; }
        public string NombreLineaNota { get; set; } // NOMBRE_LINEA_NOTA (length: 50)
        public System.DateTime? FechaNota { get; set; } // FECHA_NOTA
        public System.DateTime? HoraNota { get; set; } // HORA_NOTA
        public string LlamadaCliente { get; set; } // LLAMADA_CLIENTE (length: 2)
        public string Nota { get; set; } // NOTA (length: 1073741823)
        public int? IdEstado { get; set; } // ID_ESTADO
    }
}
