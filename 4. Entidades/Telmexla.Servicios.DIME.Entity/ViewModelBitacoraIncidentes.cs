using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelBitacoraIncidentes
    {
        #region Entidades
        BitacoraIncidentes bitacoraIncidentes;
        BitacoraIncidentesLog bitacoraIncidentesLog;
        #endregion

        #region Constructores
        public ViewModelBitacoraIncidentes()
        {
            bitacoraIncidentes = new BitacoraIncidentes();
            bitacoraIncidentesLog = new BitacoraIncidentesLog();
        }


        #endregion

        #region Encapsulamientos
        public BitacoraIncidentes BitacoraIncidentes
        {
            get
            {
                return bitacoraIncidentes;
            }

            set
            {
                bitacoraIncidentes = value;
            }
        }

        public BitacoraIncidentesLog BitacoraIncidentesLog
        {
            get
            {
                return bitacoraIncidentesLog;
            }

            set
            {
                bitacoraIncidentesLog = value;
            }
        }

        #endregion
    }
}
