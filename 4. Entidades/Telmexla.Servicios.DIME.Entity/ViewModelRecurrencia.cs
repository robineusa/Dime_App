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
        private RecurrenciaCargaBase cargueBase;

        public ViewModelRecurrencia()
        {
            ClientesTodos = new ClientesTodo();
            CargueBase = new RecurrenciaCargaBase();
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

        public RecurrenciaCargaBase CargueBase
        {
            get
            {
                return cargueBase;
            }

            set
            {
                cargueBase = value;
            }
        }
    }
}
