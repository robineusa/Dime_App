using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telmexla.Servicios.DIME.Entity;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelMejorOferta
    {
        #region Entidades
        SiguienteMejorOferta siguienteMejorOferta;
        CuentasSiguienteMejorOferta cuentasMejorOferta;
        ClientesTodo clientesTodo;
        #endregion
        #region Constructores
        public ViewModelMejorOferta()
        {
            siguienteMejorOferta = new SiguienteMejorOferta();
            clientesTodo = new ClientesTodo();
            cuentasMejorOferta = new CuentasSiguienteMejorOferta();
        }
        #endregion
        #region Encapsulamientos
        public SiguienteMejorOferta SiguienteMejorOferta
        {
            get
            {
                return siguienteMejorOferta;
            }

            set
            {
                siguienteMejorOferta = value;
            }
        }

        public ClientesTodo ClientesTodo
        {
            get
            {
                return clientesTodo;
            }

            set
            {
                clientesTodo = value;
            }
        }

        public CuentasSiguienteMejorOferta CuentasMejorOferta
        {
            get
            {
                return cuentasMejorOferta;
            }

            set
            {
                cuentasMejorOferta = value;
            }
        }
        #endregion
    }
}
