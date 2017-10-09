using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelVerificacionInventario
    {
        #region Entidades

        VIPSolicitudes vIPSolicitudes;
        VIPSolicitudesPorEquipo vIPSolicitudesPorEquipo;
        VILSolicitudes vILSolicitudes;
        VIMAliadoTecnico vIMAliadoTecnico;
        VIMGestion vIMGestion;
        VIMSubrazon vIMSubrazon;
        VIMTipoDeEquipos vIMTipoDeEquipos;
        VIMTipoDeRequerimiento vIMTipoDeRequerimiento;
        NodosZonificados nodosZonificados;

        #endregion

        #region Constructores

        public ViewModelVerificacionInventario()
        {
            vIPSolicitudes = new VIPSolicitudes();
            vIPSolicitudesPorEquipo = new VIPSolicitudesPorEquipo();
            vILSolicitudes = new VILSolicitudes();
            vIMAliadoTecnico = new VIMAliadoTecnico();
            vIMGestion = new VIMGestion();
            vIMSubrazon = new VIMSubrazon();
            vIMTipoDeEquipos = new VIMTipoDeEquipos();
            vIMTipoDeRequerimiento = new VIMTipoDeRequerimiento();
            nodosZonificados = new NodosZonificados();
        }

        #endregion

        #region Encapsulamientos

        public VIPSolicitudes VIPSolicitudes
        {
            get
            {
                return vIPSolicitudes;
            }

            set
            {
                vIPSolicitudes = value;
            }
        }

        public VIPSolicitudesPorEquipo VIPSolicitudesPorEquipo
        {
            get
            {
                return vIPSolicitudesPorEquipo;
            }

            set
            {
                vIPSolicitudesPorEquipo = value;
            }
        }

        public VILSolicitudes VILSolicitudes
        {
            get
            {
                return vILSolicitudes;
            }

            set
            {
                vILSolicitudes = value;
            }
        }

        public VIMAliadoTecnico VIMAliadoTecnico
        {
            get
            {
                return vIMAliadoTecnico;
            }

            set
            {
                vIMAliadoTecnico = value;
            }
        }

        public VIMGestion VIMGestion
        {
            get
            {
                return vIMGestion;
            }

            set
            {
                vIMGestion = value;
            }
        }

        public VIMSubrazon VIMSubrazon
        {
            get
            {
                return vIMSubrazon;
            }

            set
            {
                vIMSubrazon = value;
            }
        }

        public VIMTipoDeEquipos VIMTipoDeEquipos
        {
            get
            {
                return vIMTipoDeEquipos;
            }

            set
            {
                vIMTipoDeEquipos = value;
            }
        }

        public VIMTipoDeRequerimiento VIMTipoDeRequerimiento
        {
            get
            {
                return vIMTipoDeRequerimiento;
            }

            set
            {
                vIMTipoDeRequerimiento = value;
            }
        }

        public NodosZonificados NodosZonificados
        {
            get
            {
                return nodosZonificados;
            }

            set
            {
                nodosZonificados = value;
            }
        }

        #endregion
    }
}
