using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelTipificacionMarcaciones
    {

        private Ingreso ingresoTipMarcacion;
        private IngresosSoporte ingresoSoporte;
        private string observaciones;
        private string llamadaCliente;

        public ViewModelTipificacionMarcaciones()
        {
            ingresoTipMarcacion = new Ingreso();
            IngresoSoporte = new IngresosSoporte();
        }

        public Ingreso IngresoTipMarcacion
        {
            get
            {
                return ingresoTipMarcacion;
            }

            set
            {
                ingresoTipMarcacion = value;
            }
        }

        public string Observaciones
        {
            get
            {
                return observaciones;
            }

            set
            {
                observaciones = value;
            }
        }

        public string LlamadaCliente
        {
            get
            {
                return LlamadaCliente1;
            }

            set
            {
                LlamadaCliente1 = value;
            }
        }

        public string LlamadaCliente1
        {
            get
            {
                return llamadaCliente;
            }

            set
            {
                llamadaCliente = value;
            }
        }

        public IngresosSoporte IngresoSoporte
        {
            get
            {
                return ingresoSoporte;
            }

            set
            {
                ingresoSoporte = value;
            }
        }
    }
}
