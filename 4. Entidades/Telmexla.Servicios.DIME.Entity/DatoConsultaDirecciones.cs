using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class DatoConsultaDirecciones
    {
        private IngresoTraslado ingresoTraslado;
        private NotasTraslado notaTraslado;
        private MaestroNodo maestroNodo;
        private CambioEstrato cambioEstrato;
        private LiberacionHomePass liberacionHomePass;
        private GestionMatriz gestionMatrices;
        private GestionMatriz gestionMatriz;
        public DatoConsultaDirecciones()
        {
            ingresoTraslado = new IngresoTraslado();
            notaTraslado = new NotasTraslado();
            maestroNodo = new MaestroNodo();
            cambioEstrato = new CambioEstrato();
            liberacionHomePass = new LiberacionHomePass();
            gestionMatrices = new GestionMatriz();
            gestionMatriz = new GestionMatriz();
        }

        public IngresoTraslado IngresoTrasladoGetSet
        {
            get
            {
                return ingresoTraslado;
            }

            set
            {
                ingresoTraslado = value;
            }
        }

        public NotasTraslado NotaTrasladoGetSet
        {
            get
            {
                return notaTraslado;
            }

            set
            {
                notaTraslado = value;
            }
        }

        public MaestroNodo MaestroNodo
        {
            get
            {
                return maestroNodo;
            }

            set
            {
                maestroNodo = value;
            }
        }

        public CambioEstrato CambioEstrato
        {
            get
            {
                return cambioEstrato;
            }

            set
            {
                cambioEstrato = value;
            }
        }

        public LiberacionHomePass LiberacionHomePass
        {
            get
            {
                return liberacionHomePass;
            }

            set
            {
                liberacionHomePass = value;
            }
        }

        public GestionMatriz GestionMatrices
        {
            get
            {
                return gestionMatrices;
            }

            set
            {
                gestionMatrices = value;
            }
        }

        public GestionMatriz GestionMatriz
        {
            get
            {
                return gestionMatriz;
            }

            set
            {
                gestionMatriz = value;
            }
        }
    }
}
