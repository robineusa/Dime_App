using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelRegistrarSolicitud
    {
        private FidelizacionMotivosCancelacion fidelizacionMotivos;
        private FidelizacionSubmotivosCancelacion fidelizacionSubmotivos;
        private FidelizacionRecursiva fidelizacionRecursivaA;
        private FidelizacionMaestroServicios fidelizacionServicios;
        private FidelizacionTipificacion fidelizacionTipificacion;
        private FidelizacionMaestroServicios fidelizacionServiciosRetenidos;
        private FidelizacionRecursiva fidelizacionRecursivaB;
        private FidelizacionRecursiva fidelizacionRecursivaC;
        private FidelizacionRegistro fidelizacionRegistro;
        private FidelizacionOtrosCampos otrosCampos;

        public ViewModelRegistrarSolicitud()
        {
            FidelizacionMotivos = new FidelizacionMotivosCancelacion();
            FidelizacionSubmotivos = new FidelizacionSubmotivosCancelacion();
            FidelizacionRecursivaA = new FidelizacionRecursiva();
            FidelizacionRecursivaB = new FidelizacionRecursiva();
            FidelizacionRecursivaC = new FidelizacionRecursiva();
            FidelizacionServicios = new FidelizacionMaestroServicios();
            FidelizacionTipificacion = new FidelizacionTipificacion();
            FidelizacionServiciosRetenidos = new FidelizacionMaestroServicios();
            FidelizacionRegistro = new FidelizacionRegistro();
            FidelizacionOtrosCampos = new FidelizacionOtrosCampos();

        }

        public FidelizacionSubmotivosCancelacion FidelizacionSubmotivos
        {
            get
            {
                return fidelizacionSubmotivos;
            }

            set
            {
                fidelizacionSubmotivos = value;
            }
        }
        public FidelizacionRecursiva FidelizacionRecursivaA
        {
            get
            {
                return fidelizacionRecursivaA;
            }

            set
            {
                fidelizacionRecursivaA = value;
            }
        }
        public FidelizacionRecursiva FidelizacionRecursivaB
        {
            get
            {
                return fidelizacionRecursivaB;
            }

            set
            {
                fidelizacionRecursivaB = value;
            }
        }
        public FidelizacionRecursiva FidelizacionRecursivaC
        {
            get
            {
                return fidelizacionRecursivaC;
            }

            set
            {
                fidelizacionRecursivaC = value;
            }
        }
        public FidelizacionMaestroServicios FidelizacionServicios
        {
            get
            {
                return fidelizacionServicios;
            }

            set
            {
                fidelizacionServicios = value;
            }
        }
        public FidelizacionTipificacion FidelizacionTipificacion
        {
            get
            {
                return fidelizacionTipificacion;
            }

            set
            {
                fidelizacionTipificacion = value;
            }
        }
        public FidelizacionMaestroServicios FidelizacionServiciosRetenidos
        {
            get
            {
                return fidelizacionServiciosRetenidos;
            }

            set
            {
                fidelizacionServiciosRetenidos = value;
            }
        }
        public FidelizacionRegistro FidelizacionRegistro
        {
            get
            {
                return fidelizacionRegistro;
            }

            set
            {
                fidelizacionRegistro = value;
            }
        }
        public FidelizacionMotivosCancelacion FidelizacionMotivos
        {
            get
            {
                return fidelizacionMotivos;
            }

            set
            {
                fidelizacionMotivos = value;
            }
        }
        public FidelizacionOtrosCampos FidelizacionOtrosCampos
        {
            get
            {
                return otrosCampos;
            }

            set
            {
                otrosCampos = value;
            }
        }


    }
}
