
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelMultiPlay
    {
        #region MultiPlayCelula

        private MultiplayCargue datosmultiplay;
        private MultiPlayRegistro multiplay;

        #endregion index

        public ViewModelMultiPlay()
        {
            datosmultiplay = new MultiplayCargue();
            multiplay = new MultiPlayRegistro();
        }

        public MultiplayCargue DatosMultiplay
        {
            get
            {
                return datosmultiplay;
            }

            set
            {
                datosmultiplay = value;
            }
        }

        public MultiPlayRegistro Multiplay
        {
            get
            {
                return multiplay;
            }

            set
            {
                multiplay = value;
            }
        }
    }
}
