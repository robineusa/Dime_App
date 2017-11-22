using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telmexla.Servicios.DIME.Entity;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelRetencion
    {
        #region Entidades
        RSPSeguimientos rSPSeguimientos;
        RSLSeguimientos rSLSeguimientos;
        RSMArboles rSMArboles;
        ClientesTodo clientesTodo;

        #endregion

        #region Constructor
        public ViewModelRetencion()
        {
            rSLSeguimientos = new RSLSeguimientos();
            rSPSeguimientos = new RSPSeguimientos();
            rSMArboles = new RSMArboles();
            clientesTodo = new ClientesTodo();
        }
        #endregion

        #region Encapsilamientos
        public RSPSeguimientos RSPSeguimientos
        {
            get
            {
                return rSPSeguimientos;
            }

            set
            {
                rSPSeguimientos = value;
            }
        }

        public RSLSeguimientos RSLSeguimientos
        {
            get
            {
                return rSLSeguimientos;
            }

            set
            {
                rSLSeguimientos = value;
            }
        }

        public RSMArboles RSMArboles
        {
            get
            {
                return rSMArboles;
            }

            set
            {
                rSMArboles = value;
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
        #endregion
    }
}
