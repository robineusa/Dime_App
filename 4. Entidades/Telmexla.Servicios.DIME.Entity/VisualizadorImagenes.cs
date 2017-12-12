using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class VisualizadorImagenes
    {
        public decimal IdImagen { get; set; }
        public string src { get; set; }
        public string Descripcion { get; set; }
        public string Link { get; set; }
        public string Estado { get; set; }
        public System.DateTime? Fecha { get; set; }
    }
}
