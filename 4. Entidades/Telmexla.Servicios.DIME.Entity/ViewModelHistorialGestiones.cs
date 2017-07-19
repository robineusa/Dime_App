using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelHistorialGestiones
    {

        public List<DatoConsultaCCResidencialPredictivo> predictivoModel { get; set; }

        public ViewModelHistorialGestiones()
        {
            predictivoModel = new List<DatoConsultaCCResidencialPredictivo>();
        }





    }
}
