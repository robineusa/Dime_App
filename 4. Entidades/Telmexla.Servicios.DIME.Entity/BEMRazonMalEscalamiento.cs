using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BEMRazonMalEscalamiento
    {
        public decimal Id { get; set; }
        public decimal IdTipo { get; set; }
        public string NombreRazonEscalamiento { get; set; }
        public string Estado { get; set; }
    }
}
