using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class MaestroFestivos
    {
        public int Id { get; set; }
        public DateTime? Fecha { get; set; }
        public string FechaRR { get; set; }
        public string NumeroDia { get; set; }
        public string NombreDia { get; set; }
        public string NumeroMes { get; set; }
        public string NombreMes { get; set; }
        public string Ano { get; set; }
        public string TipoDiaLunVier { get; set; }
        public string TipoDiaLunSab { get; set; }
        public string TipoDiaFestivo { get; set; }
    }
}
