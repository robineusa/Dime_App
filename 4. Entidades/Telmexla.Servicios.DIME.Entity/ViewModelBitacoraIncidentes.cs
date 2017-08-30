using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelBitacoraIncidentes
    {
        #region Entidades
        BIPBitacoraIncidentes bIPBitacoraIncidentes;
        BILBitacoraIncidentes bIPBitacoraIncidentesInicial;
        BILBitacoraIncidentes bIPBitacoraIncidentesFinal;
        BILBitacoraIncidentes bILBitacoraIncidentes;
       List<BILBitacoraIncidentes> listaBILBitacoraIncidentes;
        BIMGerencias bIMGerencias;
        BIMAliados bIMAliados;
        BIMOperaciones bIMOperaciones;
        BIPIncidentesPorOperacion bIPIncidentesPorOperacion;
        BIMTipoFalla bIMTipoFalla;
        BIMPrioridades bIMPrioridades;
        BIMHerramientas bIMHerramientas;

      
        #endregion

        #region Constructores
        public ViewModelBitacoraIncidentes()
        {
            bILBitacoraIncidentes = new BILBitacoraIncidentes();
            bIPBitacoraIncidentes = new BIPBitacoraIncidentes();
            bIPBitacoraIncidentesFinal = new BILBitacoraIncidentes();
            bIPBitacoraIncidentesInicial = new BILBitacoraIncidentes();
            listaBILBitacoraIncidentes = new List<BILBitacoraIncidentes>();
            bIMGerencias = new BIMGerencias();
            bIMAliados = new BIMAliados();
            bIMOperaciones = new BIMOperaciones();
            bIPIncidentesPorOperacion = new BIPIncidentesPorOperacion();
            bIMTipoFalla = new BIMTipoFalla();
            bIMPrioridades = new BIMPrioridades();
            bIMHerramientas = new BIMHerramientas();
        }


        #endregion

        #region Encapsulamientos
        public BIPBitacoraIncidentes BIPBitacoraIncidentes
        {
            get
            {
                return bIPBitacoraIncidentes;
            }

            set
            {
                bIPBitacoraIncidentes = value;
            }
        }

        public BILBitacoraIncidentes BILBitacoraIncidentes
        {
            get
            {
                return bILBitacoraIncidentes;
            }

            set
            {
                bILBitacoraIncidentes = value;
            }
        }

        public BIMGerencias BIMGerencias
        {
            get
            {
                return bIMGerencias;
            }

            set
            {
                bIMGerencias = value;
            }
        }

        public BIMAliados BIMAliados
        {
            get
            {
                return bIMAliados;
            }

            set
            {
                bIMAliados = value;
            }
        }

        public BIMOperaciones BIMOperaciones
        {
            get
            {
                return bIMOperaciones;
            }

            set
            {
                bIMOperaciones = value;
            }
        }

        public BIPIncidentesPorOperacion BIPIncidentesPorOperacion
        {
            get
            {
                return bIPIncidentesPorOperacion;
            }

            set
            {
                bIPIncidentesPorOperacion = value;
            }
        }

        public BIMTipoFalla BIMTipoFalla
        {
            get
            {
                return bIMTipoFalla;
            }

            set
            {
                bIMTipoFalla = value;
            }
        }

        public BIMPrioridades BIMPrioridades
        {
            get
            {
                return bIMPrioridades;
            }

            set
            {
                bIMPrioridades = value;
            }
        }

        public BIMHerramientas BIMHerramientas
        {
            get
            {
                return bIMHerramientas;
            }

            set
            {
                bIMHerramientas = value;
            }
        }

        public List<BILBitacoraIncidentes> ListaBILBitacoraIncidentes
        {
            get
            {
                return listaBILBitacoraIncidentes;
            }

            set
            {
                listaBILBitacoraIncidentes = value;
            }
        }

        public BILBitacoraIncidentes BIPBitacoraIncidentesInicial
        {
            get
            {
                return bIPBitacoraIncidentesInicial;
            }

            set
            {
                bIPBitacoraIncidentesInicial = value;
            }
        }

        public BILBitacoraIncidentes BIPBitacoraIncidentesFinal
        {
            get
            {
                return bIPBitacoraIncidentesFinal;
            }

            set
            {
                bIPBitacoraIncidentesFinal = value;
            }
        }

        #endregion
    }
}
