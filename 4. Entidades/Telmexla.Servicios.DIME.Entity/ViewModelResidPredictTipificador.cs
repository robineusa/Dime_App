using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelResidPredictTipificador
    {

        private CcBaseMejoramiento baseMejoramiento;
        private CcGestionResidencialPredictivo gestionResdPredict;
        private CcResidencialPredictivoInfo resdPredictInfo;

        public ViewModelResidPredictTipificador() 
        {
            baseMejoramiento = new CcBaseMejoramiento();
            gestionResdPredict = new CcGestionResidencialPredictivo();
            ResdPredictInfo = new CcResidencialPredictivoInfo();
        }

        public CcBaseMejoramiento BaseMejoramiento
        {
            get
            {
                return baseMejoramiento;
            }

            set
            {
                baseMejoramiento = value;
            }
        }

        public CcGestionResidencialPredictivo GestionResdPredict
        {
            get
            {
                return gestionResdPredict;
            }

            set
            {
                gestionResdPredict = value;
            }
        }

        public CcResidencialPredictivoInfo ResdPredictInfo
        {
            get
            {
                return resdPredictInfo;
            }

            set
            {
                resdPredictInfo = value;
            }
        }
    }
}
