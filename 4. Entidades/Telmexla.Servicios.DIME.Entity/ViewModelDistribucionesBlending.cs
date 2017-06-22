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

        #region Producto
        GBCProducto gBCProducto;
        GBPProducto gBPProducto;
        GBLProducto gBLProducto;
        GBLProducto ultimoGBLProducto;
        List<GBPProducto> listaGBPProducto;
        List<GBLProducto> listaGBLProducto;
        #endregion

        #region Docsis
        GBCDocsis gBCDocsis;
        GBPDocsis gBPDocsis;
        GBLDocsis gBLDocsis;
        GBLDocsis ultimoGBLDocsis;
        List<GBPDocsis> listaGBPDocsis;
        List<GBLDocsis> listaGBLDocsis;
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
            //PRODUCTO
            gBCProducto = new GBCProducto();
            gBLProducto = new GBLProducto();
            gBPProducto = new GBPProducto();
            ultimoGBLProducto = new GBLProducto();
            listaGBLProducto = new List<GBLProducto>();
            listaGBPProducto = new List<GBPProducto>();
            //DOCSIS
            gBCDocsis = new GBCDocsis();
            gBLDocsis = new GBLDocsis();
            gBPDocsis = new GBPDocsis();
            ultimoGBLDocsis = new GBLDocsis();
            listaGBLDocsis = new List<GBLDocsis>();
            listaGBPDocsis = new List<GBPDocsis>();
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

        public GBCProducto GBCProducto
        {
            get
            {
                return gBCProducto;
            }

            set
            {
                gBCProducto = value;
            }
        }

        public GBPProducto GBPProducto
        {
            get
            {
                return gBPProducto;
            }

            set
            {
                gBPProducto = value;
            }
        }

        public GBLProducto GBLProducto
        {
            get
            {
                return gBLProducto;
            }

            set
            {
                gBLProducto = value;
            }
        }

        public GBLProducto UltimoGBLProducto
        {
            get
            {
                return ultimoGBLProducto;
            }

            set
            {
                ultimoGBLProducto = value;
            }
        }

        public List<GBPProducto> ListaGBPProducto
        {
            get
            {
                return listaGBPProducto;
            }

            set
            {
                listaGBPProducto = value;
            }
        }

        public List<GBLProducto> ListaGBLProducto
        {
            get
            {
                return listaGBLProducto;
            }

            set
            {
                listaGBLProducto = value;
            }
        }

        public GBCDocsis GBCDocsis
        {
            get
            {
                return gBCDocsis;
            }

            set
            {
                gBCDocsis = value;
            }
        }

        public GBPDocsis GBPDocsis
        {
            get
            {
                return gBPDocsis;
            }

            set
            {
                gBPDocsis = value;
            }
        }

        public GBLDocsis GBLDocsis
        {
            get
            {
                return gBLDocsis;
            }

            set
            {
                gBLDocsis = value;
            }
        }

        public GBLDocsis UltimoGBLDocsis
        {
            get
            {
                return ultimoGBLDocsis;
            }

            set
            {
                ultimoGBLDocsis = value;
            }
        }

        public List<GBPDocsis> ListaGBPDocsis
        {
            get
            {
                return listaGBPDocsis;
            }

            set
            {
                listaGBPDocsis = value;
            }
        }

        public List<GBLDocsis> ListaGBLDocsis
        {
            get
            {
                return listaGBLDocsis;
            }

            set
            {
                listaGBLDocsis = value;
            }
        }
        #endregion
    }
}
