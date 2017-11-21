
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelSubmotivosCancelacion
    {
        private FidelizacionSubmotivosCancelacion submotivosCancelacion;
        private List<FidelizacionMotivosCancelacion> listaMotivos;

        public FidelizacionSubmotivosCancelacion FidelizacionSubmotivos
        {
            get {
                return submotivosCancelacion;
            }
            set {
                submotivosCancelacion = value;
            }
        }
        public List<FidelizacionMotivosCancelacion> FidelizacionMotivos {
            get {
                return listaMotivos;
            }
            set {
                listaMotivos = value;
            }
        }
    }
}
