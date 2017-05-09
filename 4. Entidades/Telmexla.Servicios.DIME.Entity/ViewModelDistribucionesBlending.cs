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
        #endregion
    }
}
