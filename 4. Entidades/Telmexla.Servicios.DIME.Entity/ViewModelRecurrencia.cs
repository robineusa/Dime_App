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
        private GPrincipalRecurrencia gPrincipalRecurrencia;
        private GLogRecurrencia gLogRecurrencia;
        private GPrincipalRecurrenciaInbound gPrincipalRecurrenciaInbound;

        public ViewModelRecurrencia()
        {
            ClientesTodos = new ClientesTodo();
            CargueBase = new RecurrenciaCargaBase();
            GPrincipalRecurrencia = new GPrincipalRecurrencia();
            GLogRecurrencia = new GLogRecurrencia();
            GPrincipalRecurrenciaInbound = new GPrincipalRecurrenciaInbound();

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

        public GPrincipalRecurrencia GPrincipalRecurrencia
        {
            get
            {
                return gPrincipalRecurrencia;
            }

            set
            {
                gPrincipalRecurrencia = value;
            }
        }

        public GLogRecurrencia GLogRecurrencia
        {
            get
            {
                return gLogRecurrencia;
            }

            set
            {
                gLogRecurrencia = value;
            }
        }

        public GPrincipalRecurrenciaInbound GPrincipalRecurrenciaInbound
        {
            get
            {
                return gPrincipalRecurrenciaInbound;
            }

            set
            {
                gPrincipalRecurrenciaInbound = value;
            }
        }
    }
}
