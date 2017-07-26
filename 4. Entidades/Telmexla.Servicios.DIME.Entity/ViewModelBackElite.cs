using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelBackElite
    {
        #region Entidades
        BELSolicitudes bELSolicitudes;
        BEMDetalleDeGestion bEMDetalleDeGestion;
        BEMDetalleEscalamientos bEMDetalleEscalamientos;
        BEMDistribuciones bEMDistribuciones;
        BEMRazonMalEscalamiento bEMRazonMalEscalamiento;
        BEMTipoDeEscalamientos bEMTipoDeEscalamientos;
        BEPSolicitudes bEPSolicitudes;
        #endregion

        #region Constructores
        public ViewModelBackElite()
        {
            bELSolicitudes = new BELSolicitudes();
            bEMDetalleDeGestion = new BEMDetalleDeGestion();
            bEMDetalleEscalamientos = new BEMDetalleEscalamientos();
            bEMDistribuciones = new BEMDistribuciones();
            bEMRazonMalEscalamiento = new BEMRazonMalEscalamiento();
            bEMTipoDeEscalamientos = new BEMTipoDeEscalamientos();
            bEPSolicitudes = new BEPSolicitudes();
        }
        
        #endregion

        #region Encapsulamientos
        public BELSolicitudes BELSolicitudes
        {
            get
            {
                return bELSolicitudes;
            }

            set
            {
                bELSolicitudes = value;
            }
        }

        public BEMDetalleDeGestion BEMDetalleDeGestion
        {
            get
            {
                return bEMDetalleDeGestion;
            }

            set
            {
                bEMDetalleDeGestion = value;
            }
        }

        public BEMDetalleEscalamientos BEMDetalleEscalamientos
        {
            get
            {
                return bEMDetalleEscalamientos;
            }

            set
            {
                bEMDetalleEscalamientos = value;
            }
        }

        public BEMDistribuciones BEMDistribuciones
        {
            get
            {
                return bEMDistribuciones;
            }

            set
            {
                bEMDistribuciones = value;
            }
        }

        public BEMRazonMalEscalamiento BEMRazonMalEscalamiento
        {
            get
            {
                return bEMRazonMalEscalamiento;
            }

            set
            {
                bEMRazonMalEscalamiento = value;
            }
        }

        public BEMTipoDeEscalamientos BEMTipoDeEscalamientos
        {
            get
            {
                return bEMTipoDeEscalamientos;
            }

            set
            {
                bEMTipoDeEscalamientos = value;
            }
        }

        public BEPSolicitudes BEPSolicitudes
        {
            get
            {
                return bEPSolicitudes;
            }

            set
            {
                bEPSolicitudes = value;
            }
        }
        #endregion
    }
}
