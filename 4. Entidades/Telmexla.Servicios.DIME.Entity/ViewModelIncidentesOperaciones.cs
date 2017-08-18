using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelIncidentesOperaciones
    {
        public decimal Id { get; set; }
        public decimal IdRegistro { get; set; }
        public decimal IdGerencia { get; set; }
        public string NombreGerencia { get; set; }
        public decimal IdAliado { get; set; }
        public string NombreAliado { get; set; }
        public decimal IdOperacion { get; set; }
        public string NombreOperacion { get; set; }
        public string Estado { get; set; }
    }
}
