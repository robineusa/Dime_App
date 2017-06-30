
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelMultiPlay
    {
        #region MultiPlayCelula

        private DatosMultiplay datosmultiplay;
        private MultiPlay multiplay;

        #endregion index

        public ViewModelMultiPlay()
        {
            datosmultiplay = new DatosMultiplay();
            multiplay = new MultiPlay();
        }

        public DatosMultiplay DatosMultiplay
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

        public MultiPlay Multiplay
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
