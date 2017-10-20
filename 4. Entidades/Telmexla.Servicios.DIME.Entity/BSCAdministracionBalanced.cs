using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BSCAdministracionBalanced
    {
        public decimal Skill { get; set; }
        public string NombreSkill { get; set; }
        public string Tmo { get; set; }
        public decimal LlamadasAtendidas { get; set; }
        public decimal Marcaciones { get; set; }
        public decimal AjustesCorrectos { get; set; }
        public decimal PqrEscalados { get; set; }
        public decimal VolumenDeVentas { get; set; }
        public decimal Reincidencia { get; set; }
        public decimal Recomendacion { get; set; }
        public decimal NotaCalidad { get; set; }
        public decimal NotaBuenServicio { get; set; }
        public decimal ActivacionClaroVideo { get; set; }
        public decimal ActivacionConvenioElectronico { get; set; }
        public decimal UsoCCAA { get; set; }       
    }
}
