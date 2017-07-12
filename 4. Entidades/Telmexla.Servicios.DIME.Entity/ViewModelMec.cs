using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelMec
    {
        #region Mec
        MecMonitoreosP mecMonitoreosP;
        MecMonitoreosL mecMonitoreosL;
        MecProcesos mecProcesos;
        MecLineas mecLineas;
        MecListasDistribucion mecListasDistribucion;
        MecTipoAlarmas mecTipoAlarmas;

        
        #endregion

        #region Constructores
        public ViewModelMec()
        {
            mecMonitoreosP = new MecMonitoreosP();
            mecMonitoreosL = new MecMonitoreosL();
            mecProcesos = new MecProcesos();
            mecLineas = new MecLineas();
            mecListasDistribucion = new MecListasDistribucion();
            mecTipoAlarmas = new MecTipoAlarmas();
        }
        #endregion

        #region Encapsulamientos
        public MecMonitoreosP MecMonitoreosP
        {
            get
            {
                return mecMonitoreosP;
            }

            set
            {
                mecMonitoreosP = value;
            }
        }

        public MecMonitoreosL MecMonitoreosL
        {
            get
            {
                return mecMonitoreosL;
            }

            set
            {
                mecMonitoreosL = value;
            }
        }

        public MecProcesos MecProcesos
        {
            get
            {
                return mecProcesos;
            }

            set
            {
                mecProcesos = value;
            }
        }

        public MecLineas MecLineas
        {
            get
            {
                return mecLineas;
            }

            set
            {
                mecLineas = value;
            }
        }

        public MecListasDistribucion MecListasDistribucion
        {
            get
            {
                return mecListasDistribucion;
            }

            set
            {
                mecListasDistribucion = value;
            }
        }

        public MecTipoAlarmas MecTipoAlarmas
        {
            get
            {
                return mecTipoAlarmas;
            }

            set
            {
                mecTipoAlarmas = value;
            }
        }
        #endregion
    }
}
