
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelCuentasSiembraHD
    {
        private CuentasSiembraHD entidadCuentasSiembraHD;
        public SiembraHD entidadSiembraHD;
        private List<CuentasSiembraHD> listaCuentasSiembraHD;

        public CuentasSiembraHD EntidadCuentasSiembraHD
        {
            get
            {
                return entidadCuentasSiembraHD;
            }

            set
            {
                entidadCuentasSiembraHD = value;
            }
        }

        public SiembraHD EntidadSiembraHD
        {
            get
            {
                return entidadSiembraHD;
            }

            set
            {
                entidadSiembraHD = value;
            }
        }

        public List<CuentasSiembraHD> ListaCuentasSiembraHD
        {
            get
            {
                return listaCuentasSiembraHD;
            }

            set
            {
                listaCuentasSiembraHD = value;
            }
        }
    }
}
