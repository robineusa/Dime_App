using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelRecurrencia
    {
        private ClientesTodo clientesTodos;

        public ViewModelRecurrencia()
        {
            ClientesTodos = new ClientesTodo();
        }

        public ClientesTodo ClientesTodos
        {
            get
            {
                return clientesTodos;
            }

            set
            {
                clientesTodos = value;
            }
        }
    }
}
