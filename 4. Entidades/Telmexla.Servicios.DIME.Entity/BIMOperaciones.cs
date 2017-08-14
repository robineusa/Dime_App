using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BIMOperaciones
    {
        public decimal IdOperacion { get; set; }
        public decimal IdGerencia { get; set; }
        public decimal IdAliado { get; set; }
        public string NombreOperacion { get; set; }
        public string Estado { get; set; }
    }
}
