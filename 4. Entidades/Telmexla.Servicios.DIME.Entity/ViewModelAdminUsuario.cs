using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelAdminUsuario
    {

        private BasePersonalHolo usuarioHolos;
        private int idPerfil;
        private int idLinea;
        private string contraseña;
        private string nombrePerfil;
        private string nombreLinea;
        private bool usuarioBloqueado;
        private string permisosOtorgados;
        private string permisosOtorgadosMasivos;
        private string usuariosACambiarMasivo;
        private int idLineaMasivo;
        private int idPerfilMasivo;

        public ViewModelAdminUsuario()
        {
            usuarioHolos = new BasePersonalHolo();
            usuariosACambiarMasivo = "";
            permisosOtorgadosMasivos = "";
            permisosOtorgados = "";
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

        public int IdPerfil
        {
            get
            {
                return idPerfil;
            }

            set
            {
                idPerfil = value;
            }
        }

        public int IdLinea
        {
            get
            {
                return idLinea;
            }

            set
            {
                idLinea = value;
            }
        }
        public string Contraseña
        {
            get
            {
                return contraseña;
            }

            set
            {
                contraseña = value;
            }
        }

        public string NombrePerfil
        {
            get
            {
                return nombrePerfil;
            }

            set
            {
                nombrePerfil = value;
            }
        }

        public string NombreLinea
        {
            get
            {
                return nombreLinea;
            }

            set
            {
                nombreLinea = value;
            }
        }

        public bool UsuarioBloqueado
        {
            get
            {
                return usuarioBloqueado;
            }

            set
            {
                usuarioBloqueado = value;
            }
        }

        public string PermisosOtorgados
        {
            get
            {
                return permisosOtorgados;
            }

            set
            {
                permisosOtorgados = value;
            }
        }

        public string PermisosOtorgadosMasivos
        {
            get
            {
                return permisosOtorgadosMasivos;
            }

            set
            {
                permisosOtorgadosMasivos = value;
            }
        }

        public string UsuariosACambiarMasivo
        {
            get
            {
                return usuariosACambiarMasivo;
            }

            set
            {
                usuariosACambiarMasivo = value;
            }
        }

        public int IdLineaMasivo
        {
            get
            {
                return idLineaMasivo;
            }

            set
            {
                idLineaMasivo = value;
            }
        }

        public int IdPerfilMasivo
        {
            get
            {
                return idPerfilMasivo;
            }

            set
            {
                idPerfilMasivo = value;
            }
        }
    }
}
