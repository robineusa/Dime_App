
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelTraslados
    {
        private NotasTraslado notaTraslado;
        private NotasTraslado notaTrasladoInicial;
        private NotasTraslado notaTrasladoVacia;
        private IngresoTraslado ingresoTraslado;
        private List<NotasTraslado> listaNotasCrearDireccion;
        private List<CambioEstrato> listaCambioEstrato;
        private MaestroNodo informacionNodo;
        private CambioEstrato cambioEstrato;
        private CambioEstrato cambioEstratoInicial;
        private CambioEstrato cambioEstratoVacia;
        private TraficoTraslado traficoTraslados;
        private LiberacionHomePass liberacionHomePass;
        private LiberacionHomePass liberacionHomePassInicial;
        private LiberacionHomePass liberacionHomePassVacia;
        private List<LiberacionHomePass> listaLiberacionHomePass;
        private GestionMatriz gestionMatriz;
        private GestionMatriz gestionMatrizInicial;
        private GestionMatriz gestionMatrizVacia;
        private List<GestionMatriz> listaGestionMatriz;


        public ViewModelTraslados()
        {
            traficoTraslados = new TraficoTraslado();
        }

        public IngresoTraslado IngresoTraslado
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

        public NotasTraslado NotaTraslado
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

        public List<NotasTraslado> ListaNotasCrearDireccion
        {
            get
            {
                return listaNotasCrearDireccion;
            }

            set
            {
                listaNotasCrearDireccion = value;
            }
        }

        public NotasTraslado NotaTrasladoInicial
        {
            get
            {
                return notaTrasladoInicial;
            }

            set
            {
                notaTrasladoInicial = value;
            }
        }

        public MaestroNodo InformacionNodo
        {
            get
            {
                return informacionNodo;
            }

            set
            {
                informacionNodo = value;
            }
        }

        public NotasTraslado NotaTrasladoVacia
        {
            get
            {
                return notaTrasladoVacia;
            }

            set
            {
                notaTrasladoVacia = value;
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

        public List<CambioEstrato> ListaCambioEstrato
        {
            get
            {
                return listaCambioEstrato;
            }

            set
            {
                listaCambioEstrato = value;
            }
        }

        public CambioEstrato CambioEstratoInicial
        {
            get
            {
                return cambioEstratoInicial;
            }

            set
            {
                cambioEstratoInicial = value;
            }
        }

        public CambioEstrato CambioEstratoVacia
        {
            get
            {
                return cambioEstratoVacia;
            }

            set
            {
                cambioEstratoVacia = value;
            }
        }

        public TraficoTraslado TraficoTraslados
        {
            get
            {
                return traficoTraslados;
            }

            set
            {
                traficoTraslados = value;
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

        public List<LiberacionHomePass> ListaLiberacionHomePass
        {
            get
            {
                return listaLiberacionHomePass;
            }

            set
            {
                listaLiberacionHomePass = value;
            }
        }

        public LiberacionHomePass LiberacionHomePassInicial
        {
            get
            {
                return liberacionHomePassInicial;
            }

            set
            {
                liberacionHomePassInicial = value;
            }
        }

        public LiberacionHomePass LiberacionHomePassVacia
        {
            get
            {
                return liberacionHomePassVacia;
            }

            set
            {
                liberacionHomePassVacia = value;
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

        public GestionMatriz GestionMatrizInicial
        {
            get
            {
                return gestionMatrizInicial;
            }

            set
            {
                gestionMatrizInicial = value;
            }
        }

        public GestionMatriz GestionMatrizVacia
        {
            get
            {
                return gestionMatrizVacia;
            }

            set
            {
                gestionMatrizVacia = value;
            }
        }

        public List<GestionMatriz> ListaGestionMatriz
        {
            get
            {
                return listaGestionMatriz;
            }

            set
            {
                listaGestionMatriz = value;
            }
        }
    }
}
