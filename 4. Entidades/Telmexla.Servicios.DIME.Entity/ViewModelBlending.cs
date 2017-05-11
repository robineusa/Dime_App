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
        private SkillsUsuariosBlending skillsUsuariosBlending;
        private SkillsUsuariosBlending copiaSkillsUsuariosBlending;
        private string cedulasMasivo;
        private string operacion;
        private string campaña;
        private BasePersonalHolo copiaUsuarioHolos;
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
            copiaUsuarioHolos = new BasePersonalHolo();
            copiaSkillsUsuariosBlending = new SkillsUsuariosBlending();

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

        public SkillsUsuariosBlending SkillsUsuariosBlending
        {
            get
            {
                return skillsUsuariosBlending;
            }

            set
            {
                skillsUsuariosBlending = value;
            }
        }

        public string CedulasMasivo
        {
            get
            {
                return cedulasMasivo;
            }

            set
            {
                cedulasMasivo = value;
            }
        }

        public BasePersonalHolo CopiaUsuarioHolos
        {
            get
            {
                return copiaUsuarioHolos;
            }

            set
            {
                copiaUsuarioHolos = value;
            }
        }

        public SkillsUsuariosBlending CopiaSkillsUsuariosBlending
        {
            get
            {
                return copiaSkillsUsuariosBlending;
            }

            set
            {
                copiaSkillsUsuariosBlending = value;
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
