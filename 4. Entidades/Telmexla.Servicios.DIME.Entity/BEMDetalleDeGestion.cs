using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BEMDetalleDeGestion
    {
        public decimal IdGestion { get; set; }
        public decimal IdTipo { get; set; }
        public string NombreGestion { get; set; }
        public string EstadoGestion { get; set; }
        public string Estado { get; set; }
    }
}
