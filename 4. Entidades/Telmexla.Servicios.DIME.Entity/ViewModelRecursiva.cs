using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelRecursiva
    {
        private FidelizacionRecursiva recursiva;
        private List<FidelizacionRecursivaVista> listaRecursiva;

        public FidelizacionRecursiva Recursiva
        {
            get {
                return recursiva;
            }
            set {
                recursiva = value;
            }
        }
        public List<FidelizacionRecursivaVista> ListRecursiva {
            get {
                return listaRecursiva;
            }
            set {
                listaRecursiva = value;
            }
        }
    }
}
