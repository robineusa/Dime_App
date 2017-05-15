
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelTraslados
    {
        #region Traslados
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
        private TrasladoFallido trasladoFallido;
        private List<TrasladoFallido> listaTrasladoFallido;
        #endregion

        #region Constructores
        public ViewModelTraslados()
        {
            notaTraslado = new NotasTraslado();
            notaTrasladoInicial = new NotasTraslado();
            notaTrasladoVacia = new NotasTraslado();
            ingresoTraslado = new IngresoTraslado();
            listaNotasCrearDireccion = new List<NotasTraslado>();
            listaCambioEstrato = new List<CambioEstrato>();
            informacionNodo = new MaestroNodo();
            cambioEstrato = new CambioEstrato();
            cambioEstratoInicial = new CambioEstrato();
            cambioEstratoVacia = new CambioEstrato();
            traficoTraslados = new TraficoTraslado();
            liberacionHomePass = new LiberacionHomePass();
            liberacionHomePassInicial = new LiberacionHomePass();
            liberacionHomePassVacia = new LiberacionHomePass();
            listaLiberacionHomePass = new List<LiberacionHomePass>();
            gestionMatriz = new GestionMatriz();
            gestionMatrizInicial = new GestionMatriz();
            gestionMatrizVacia = new GestionMatriz();
            listaGestionMatriz = new List<GestionMatriz>();
            trasladoFallido = new TrasladoFallido();
            listaTrasladoFallido = new List<TrasladoFallido>();

        }
        #endregion

        #region Encapsulamientos
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

        public TrasladoFallido TrasladoFallido
        {
            get
            {
                return trasladoFallido;
            }

            set
            {
                trasladoFallido = value;
            }
        }

        public List<TrasladoFallido> ListaTrasladoFallido
        {
            get
            {
                return listaTrasladoFallido;
            }

            set
            {
                listaTrasladoFallido = value;
            }
        }
        #endregion
    }
}
