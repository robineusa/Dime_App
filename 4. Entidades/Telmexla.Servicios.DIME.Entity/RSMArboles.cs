using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class RSMArboles
    {
        public decimal IdArbol { get; set; }
        public decimal IdPadre { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
    }
}
