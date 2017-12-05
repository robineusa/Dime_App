using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telmexla.Servicios.DIME.Entity;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelBanner
    {
        #region Entidades
        SiguienteMejorOferta siguienteMejorOferta;
        CuentasSiguienteMejorOferta cuentasMejorOferta;
        ClientesTodo clientesTodo;
        ActivacionClaroVideo activacionClaroVideo;
        SiembraHD siembraHD;
        CuentasSiembraHD cuentasSiembraHD;
        CuentasMejorasTecnicas cuentasMejorasTecnicas;
        MejorasTecnicas mejorasTecnicas;
        CargaBaseFoxInbound cuentasFox;
        GestionFoxInbound gestionFox;
        BACActualizarDatos bACActualizarDatos;
        BAPActualizarDatos bAPActualizarDatos;

        #endregion

        #region Constructores
        public ViewModelBanner()
        {
            siguienteMejorOferta = new SiguienteMejorOferta();
            clientesTodo = new ClientesTodo();
            cuentasMejorOferta = new CuentasSiguienteMejorOferta();
            activacionClaroVideo = new ActivacionClaroVideo();
            siembraHD = new SiembraHD();
            cuentasSiembraHD = new CuentasSiembraHD();
            cuentasMejorasTecnicas = new CuentasMejorasTecnicas();
            mejorasTecnicas = new MejorasTecnicas();
            cuentasFox = new CargaBaseFoxInbound();
            gestionFox = new GestionFoxInbound();
            bACActualizarDatos = new BACActualizarDatos();
            bAPActualizarDatos = new BAPActualizarDatos();
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

        public ActivacionClaroVideo ActivacionClaroVideo
        {
            get
            {
                return activacionClaroVideo;
            }

            set
            {
                activacionClaroVideo = value;
            }
        }

        public SiembraHD SiembraHD
        {
            get
            {
                return siembraHD;
            }

            set
            {
                siembraHD = value;
            }
        }

        public CuentasSiembraHD CuentasSiembraHD
        {
            get
            {
                return cuentasSiembraHD;
            }

            set
            {
                cuentasSiembraHD = value;
            }
        }

        public CuentasMejorasTecnicas CuentasMejorasTecnicas
        {
            get
            {
                return cuentasMejorasTecnicas;
            }

            set
            {
                cuentasMejorasTecnicas = value;
            }
        }

        public MejorasTecnicas MejorasTecnicas
        {
            get
            {
                return mejorasTecnicas;
            }

            set
            {
                mejorasTecnicas = value;
            }
        }

        public CargaBaseFoxInbound CuentasFox
        {
            get
            {
                return cuentasFox;
            }

            set
            {
                cuentasFox = value;
            }
        }

        public GestionFoxInbound GestionFox
        {
            get
            {
                return gestionFox;
            }

            set
            {
                gestionFox = value;
            }
        }

        public BACActualizarDatos BACActualizarDatos
        {
            get
            {
                return bACActualizarDatos;
            }

            set
            {
                bACActualizarDatos = value;
            }
        }

        public BAPActualizarDatos BAPActualizarDatos
        {
            get
            {
                return bAPActualizarDatos;
            }

            set
            {
                bAPActualizarDatos = value;
            }
        }
        #endregion
    }
}
