using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelDistribucionesBlending
    {


        #region Fuera de Niveles

        ClientesTodo datosDelCliente;
        BlendingFueraNivel fueraNiveles;
        GBPFueraNiveles gBPFueradeNiveles;
        GBLFueraNiveles gBLFueradeNiveles;
        GBLFueraNiveles ultimoGBLFuera_Niveles;
        List<GBPFueraNiveles> listaGBPFueradeNiveles;
        List<GBLFueraNiveles> listaGBLFueradeNiveles;
        #endregion

        #region Rentabilizacion
        GBC_Rentabilizacion gBCRentabilizacion;
        GBPRentabilizacion gBPRentabilizacion;
        GBLRentabilizacion gBLRentabilizacion;
        GBLRentabilizacion ultimoGBLRentabilizacion;
        List<GBPRentabilizacion> listaGBPRentabilizacion;
        List<GBLRentabilizacion> listaGBLRentabilizacion;
        #endregion

        #region Constructores
        public ViewModelDistribucionesBlending()
        {
            datosDelCliente = new ClientesTodo();
            fueraNiveles = new BlendingFueraNivel();
            gBLFueradeNiveles = new GBLFueraNiveles();
            gBPFueradeNiveles = new GBPFueraNiveles();
            listaGBLFueradeNiveles = new List<GBLFueraNiveles>();
            listaGBPFueradeNiveles = new List<GBPFueraNiveles>();
            ultimoGBLFuera_Niveles = new GBLFueraNiveles();
            //RENTABILIZACION
            gBCRentabilizacion = new GBC_Rentabilizacion();
            gBPRentabilizacion = new GBPRentabilizacion();
            gBLRentabilizacion = new GBLRentabilizacion();
            ultimoGBLRentabilizacion = new GBLRentabilizacion();
            listaGBPRentabilizacion = new List<GBPRentabilizacion>();
            listaGBLRentabilizacion = new List<GBLRentabilizacion>();
        }
        #endregion

        #region Encapsulamientos

        public ClientesTodo DatosDelCliente
        {
            get
            {
                return datosDelCliente;
            }

            set
            {
                datosDelCliente = value;
            }
        }

        public BlendingFueraNivel FueraNiveles
        {
            get
            {
                return fueraNiveles;
            }

            set
            {
                fueraNiveles = value;
            }
        }

        public GBPFueraNiveles GBPFueradeNiveles
        {
            get
            {
                return gBPFueradeNiveles;
            }

            set
            {
                gBPFueradeNiveles = value;
            }
        }

        public GBLFueraNiveles GBLFueradeNiveles
        {
            get
            {
                return gBLFueradeNiveles;
            }

            set
            {
                gBLFueradeNiveles = value;
            }
        }

        public List<GBPFueraNiveles> ListaGBPFueradeNiveles
        {
            get
            {
                return listaGBPFueradeNiveles;
            }

            set
            {
                listaGBPFueradeNiveles = value;
            }
        }

        public List<GBLFueraNiveles> ListaGBLFueradeNiveles
        {
            get
            {
                return listaGBLFueradeNiveles;
            }

            set
            {
                listaGBLFueradeNiveles = value;
            }
        }

        public GBLFueraNiveles UltimoGBLFuera_Niveles
        {
            get
            {
                return ultimoGBLFuera_Niveles;
            }

            set
            {
                ultimoGBLFuera_Niveles = value;
            }
        }

        public GBC_Rentabilizacion GBCRentabilizacion
        {
            get
            {
                return gBCRentabilizacion;
            }

            set
            {
                gBCRentabilizacion = value;
            }
        }

        public GBPRentabilizacion GBPRentabilizacion
        {
            get
            {
                return gBPRentabilizacion;
            }

            set
            {
                gBPRentabilizacion = value;
            }
        }

        public GBLRentabilizacion GBLRentabilizacion
        {
            get
            {
                return gBLRentabilizacion;
            }

            set
            {
                gBLRentabilizacion = value;
            }
        }

        public GBLRentabilizacion UltimoGBLRentabilizacion
        {
            get
            {
                return ultimoGBLRentabilizacion;
            }

            set
            {
                ultimoGBLRentabilizacion = value;
            }
        }

        public List<GBPRentabilizacion> ListaGBPRentabilizacion
        {
            get
            {
                return listaGBPRentabilizacion;
            }

            set
            {
                listaGBPRentabilizacion = value;
            }
        }

        public List<GBLRentabilizacion> ListaGBLRentabilizacion
        {
            get
            {
                return listaGBLRentabilizacion;
            }

            set
            {
                listaGBLRentabilizacion = value;
            }
        }
        #endregion
    }
}
