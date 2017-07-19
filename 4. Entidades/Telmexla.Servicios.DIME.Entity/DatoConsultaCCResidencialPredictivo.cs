using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class DatoConsultaCCResidencialPredictivo
    {
        public int Id { get; set; } // ID (Primary key)
        public double? Cuenta { get; set; } // CUENTA
        public string Nombre { get; set; } // NOMBRE (length: 100)
        public string MarcacionBd { get; set; } // Marcacion_BD (length: 100)
        public string ProblemaDelEdificio { get; set; } // PROBLEMA_DEL_EDIFICIO (length: 300)
        public string MarcacionBdIi { get; set; } // Marcacion_BD_II (length: 100)
        public string EstadoInicial { get; set; } // ESTADO_INICIAL (length: 100)
        public bool Verificado { get; set; }

    }
}
