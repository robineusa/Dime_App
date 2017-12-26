using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telmexla.Servicios.DIME.Entity;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelCierreExperiencia
    {
        #region Entidades
        CELDesconexiones cELDesconexiones;
        CEMArbolesDeGestion cEMArbolesDeGestion;
        CEPAsigDesconexiones cEPAsigDesconexiones;
        CEPDesconexiones cEPDesconexiones;
        CEPTickets cEPTickets;
        CELTickets cELTickets;
        CELSuspensiones cELSuspensiones;
        CEPSuspensiones cEPSuspensiones;
        CEPAsigSuspenciones cEPAsigSuspensiones;
        CEPLiberaciones cEPLiberaciones;
        CELLiberaciones cELLiberaciones;
        #endregion

        #region Constructores
        public ViewModelCierreExperiencia()
        {
            cELDesconexiones = new CELDesconexiones();
            cEMArbolesDeGestion = new CEMArbolesDeGestion();
            cEPAsigDesconexiones = new CEPAsigDesconexiones();
            cEPDesconexiones = new CEPDesconexiones();
            cEPTickets = new CEPTickets();
            cELTickets = new CELTickets();
            cEPSuspensiones = new CEPSuspensiones();
            cELSuspensiones = new CELSuspensiones();
            cEPAsigSuspensiones = new CEPAsigSuspenciones();
            cELLiberaciones = new CELLiberaciones();
            cEPLiberaciones = new CEPLiberaciones();
        }


        #endregion

        #region Encapsulamientos
        public CELDesconexiones CELDesconexiones
        {
            get
            {
                return cELDesconexiones;
            }

            set
            {
                cELDesconexiones = value;
            }
        }

        public CEMArbolesDeGestion CEMArbolesDeGestion
        {
            get
            {
                return cEMArbolesDeGestion;
            }

            set
            {
                cEMArbolesDeGestion = value;
            }
        }

        public CEPAsigDesconexiones CEPAsigDesconexiones
        {
            get
            {
                return cEPAsigDesconexiones;
            }

            set
            {
                cEPAsigDesconexiones = value;
            }
        }

        public CEPDesconexiones CEPDesconexiones
        {
            get
            {
                return cEPDesconexiones;
            }

            set
            {
                cEPDesconexiones = value;
            }
        }

        public CEPTickets CEPTickets
        {
            get
            {
                return cEPTickets;
            }

            set
            {
                cEPTickets = value;
            }
        }

        public CELTickets CELTickets
        {
            get
            {
                return cELTickets;
            }

            set
            {
                cELTickets = value;
            }
        }

        public CELSuspensiones CELSuspensiones
        {
            get
            {
                return cELSuspensiones;
            }

            set
            {
                cELSuspensiones = value;
            }
        }

        public CEPSuspensiones CEPSuspensiones
        {
            get
            {
                return cEPSuspensiones;
            }

            set
            {
                cEPSuspensiones = value;
            }
        }

        public CEPAsigSuspenciones CEPAsigSuspensiones
        {
            get
            {
                return cEPAsigSuspensiones;
            }

            set
            {
                cEPAsigSuspensiones = value;
            }
        }

        public CEPLiberaciones CEPLiberaciones
        {
            get
            {
                return cEPLiberaciones;
            }

            set
            {
                cEPLiberaciones = value;
            }
        }

        public CELLiberaciones CELLiberaciones
        {
            get
            {
                return cELLiberaciones;
            }

            set
            {
                cELLiberaciones = value;
            }
        }
        #endregion

    }
}
