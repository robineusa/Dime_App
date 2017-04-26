using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelBlending
    {
        private ClientesTodo datosCliente;
        private int cedula;
        private string operacion;
        private string campaña;
        private System.DateTime? fecha_Actualizacion;
        private string id_Usuario_Actualizacion;


        #region convenioElectronico
        private ConvenioElectronicoCollection historicoConvenioElectronico;
        private ConvenioElectronico convenioElecGestionado;
        #endregion

        #region docsisOverlap
        private DocsisOverlapCollection historicoDocsisOverlap;
        private DocsisOverlap docsisOverlapGestionado;
        #endregion

        #region claroVideo
        private ClaroVideoCollection historicoClaroVideo;
        private ClaroVideo claroVideoGestionado;
        #endregion

        #region cierreCiclo
        private CierreCicloCollection historicoCierreCiclo;
        private CierreCiclo cierreCicloGestionado;
        private GestionOutbound gestionOutInfo;
        #endregion

        #region NombreLBlending
        private List<MaestroLineasBlending> nombreLineasBlending;
        private MaestroLineasBlending maestrolineasblendingvacio;
        private BasePersonalHolo usuarioHolos;
        #endregion


        public ViewModelBlending()
        {
            datosCliente = new ClientesTodo();
            historicoConvenioElectronico = new ConvenioElectronicoCollection();
            convenioElecGestionado = new ConvenioElectronico();
            historicoDocsisOverlap = new DocsisOverlapCollection();
            docsisOverlapGestionado = new DocsisOverlap();
            historicoClaroVideo = new ClaroVideoCollection();
            claroVideoGestionado = new ClaroVideo();
            historicoCierreCiclo = new CierreCicloCollection();
            cierreCicloGestionado = new CierreCiclo();
            gestionOutInfo = new GestionOutbound();
            nombreLineasBlending = new List<MaestroLineasBlending>();
            maestrolineasblendingvacio = new MaestroLineasBlending();
            usuarioHolos = new BasePersonalHolo();

        }


        public ClientesTodo DatosCliente
        {
            get
            {
                return datosCliente;
            }

            set
            {
                datosCliente = value;
            }
        }

        public ConvenioElectronicoCollection HistoricoConvenioElectronico
        {
            get
            {
                return historicoConvenioElectronico;
            }

            set
            {
                historicoConvenioElectronico = value;
            }
        }

        public ConvenioElectronico ConvenioElecGestionado
        {
            get
            {
                return convenioElecGestionado;
            }

            set
            {
                convenioElecGestionado = value;
            }
        }

        public DocsisOverlapCollection HistoricoDocsisOverlap
        {
            get
            {
                return historicoDocsisOverlap;
            }

            set
            {
                historicoDocsisOverlap = value;
            }
        }

        public DocsisOverlap DocsisOverlapGestionado
        {
            get
            {
                return docsisOverlapGestionado;
            }

            set
            {
                docsisOverlapGestionado = value;
            }
        }

        public ClaroVideoCollection HistoricoClaroVideo
        {
            get
            {
                return historicoClaroVideo;
            }

            set
            {
                historicoClaroVideo = value;
            }
        }

        public ClaroVideo ClaroVideoGestionado
        {
            get
            {
                return claroVideoGestionado;
            }

            set
            {
                claroVideoGestionado = value;
            }
        }

        public CierreCicloCollection HistoricoCierreCiclo
        {
            get
            {
                return historicoCierreCiclo;
            }

            set
            {
                historicoCierreCiclo = value;
            }
        }

        public CierreCiclo CierreCicloGestionado
        {
            get
            {
                return cierreCicloGestionado;
            }

            set
            {
                cierreCicloGestionado = value;
            }
        }

        public GestionOutbound GestionOutInfo
        {
            get
            {
                return gestionOutInfo;
            }

            set
            {
                gestionOutInfo = value;
            }
        }
        public List<MaestroLineasBlending> NombreLineasBlending
        {
            get
            {
                return nombreLineasBlending;
            }

            set
            {
                nombreLineasBlending = value;
            }
        }
        public MaestroLineasBlending Maestrolineasblendingvacio
        {
            get
            {
                return maestrolineasblendingvacio;
            }

            set
            {
                maestrolineasblendingvacio = value;
            }
        }
        public BasePersonalHolo UsuarioHolos
        {
            get
            {
                return usuarioHolos;
            }

            set
            {
                usuarioHolos = value;
            }
        }
        public int Cedula
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

        public string Operacion
        {
            get
            {
                return operacion;
            }

            set
            {
                operacion = value;
            }
        }

        public DateTime? Fecha_Actualizacion
        {
            get
            {
                return fecha_Actualizacion;
            }

            set
            {
                fecha_Actualizacion = value;
            }
        }

        public string Id_Usuario_Actualizacion
        {
            get
            {
                return id_Usuario_Actualizacion;
            }

            set
            {
                id_Usuario_Actualizacion = value;
            }
        }

        public string Campaña
        {
            get
            {
                return campaña;
            }

            set
            {
                campaña = value;
            }
        }

        public void AgregarNombreClienteAHistoricoCierreCiclo(List<string> nombreClientes)
        {
            for(int i = 0; i< historicoCierreCiclo.Count;i++)
            {
                this.historicoCierreCiclo[i].NombreCliente = nombreClientes[i];
            }


        }


    }
}
