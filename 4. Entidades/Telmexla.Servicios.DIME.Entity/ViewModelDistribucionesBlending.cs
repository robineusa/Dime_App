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

        #endregion

        #region Constructores
        public ViewModelDistribucionesBlending()
        {
            datosDelCliente = new ClientesTodo();
            fueraNiveles = new BlendingFueraNivel();
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
        #endregion
    }
}
