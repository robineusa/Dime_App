using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class RecurrenciaCargaBase
    {
        public decimal Id { get; set; }
        public decimal Cuenta { get; set; }
        public decimal Marcaciones { get; set;}
        public System.DateTime? FechaUltimaMarcacion { get; set; }
        public System.DateTime? FechaUltimaGestion { get; set; }
        public string IncluyeClaroVideo { get; set; }
        public string UsoClaroVideo { get; set; }
        public string ClienteNagra { get; set; }
        public string Ofrecimiento1 { get; set; }
        public string Ofrecimiento2 { get; set; }
        public string Ofrecimiento3 { get; set; }
        public string Diferenciador { get; set; }
        public decimal Prioridad{ get; set; }
        public decimal Veces_Gestionado{ get; set; }
        public decimal Usuario_gestionando { get; set; }
        public System.DateTime? FechaCargueBase { get; set; }

    }
}
