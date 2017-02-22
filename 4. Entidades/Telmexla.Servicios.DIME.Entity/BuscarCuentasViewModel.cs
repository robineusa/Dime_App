using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BuscarCuentasViewModel
    {

        private List<ClientesTodo> cuentas;

        private string cedula;

        public List<ClientesTodo> Cuentas
        {
            get
            {
                return cuentas;
            }

            set
            {
                cuentas = value;
            }
        }

        public string Cedula
        {
            get
            {
                return cedula;
            }

            set
            {
                cedula = value;
            }
        }
    }
}
