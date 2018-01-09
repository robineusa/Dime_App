using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelMidas
    {
        private ClientesTodo clientesTodo;
        private CargueBaseMidas cargueBaseMidas;
        private GPMMidas gPMMidas;
        private ArbolesMidas arbolesMidas;

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

        public CargueBaseMidas CargueBaseMidas
        {
            get
            {
                return cargueBaseMidas;
            }

            set
            {
                cargueBaseMidas = value;
            }
        }

        public GPMMidas GPMMidas
        {
            get
            {
                return gPMMidas;
            }

            set
            {
                gPMMidas = value;
            }
        }

        public ArbolesMidas ArbolesMidas
        {
            get
            {
                return arbolesMidas;
            }

            set
            {
                arbolesMidas = value;
            }
        }
    }
}
