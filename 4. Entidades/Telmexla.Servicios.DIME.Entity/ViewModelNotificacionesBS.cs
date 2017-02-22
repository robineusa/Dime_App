
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelNotificacionesBS
    {
        private NotificacionesBuenServicio notificacionBuenServicio;
        private List<NotificacionesBuenServicio> listaNotificacionesBS;
        private NotificacionesBuenServicioCollection notificacionescollection;
        private UsuariosNotificados usuariosNotificados;

        public NotificacionesBuenServicio NotificacionBuenServicio
        {
            get
            {
                return notificacionBuenServicio;
            }

            set
            {
                notificacionBuenServicio = value;
            }
        }

        public List<NotificacionesBuenServicio> ListaNotificacionesBSGetSet
        {
            get
            {
                return listaNotificacionesBS;
            }

            set
            {
                listaNotificacionesBS = value;
            }
        }

        public NotificacionesBuenServicioCollection Notificacionescollection
        {
            get
            {
                return notificacionescollection;
            }

            set
            {
                notificacionescollection = value;
            }
        }

        public UsuariosNotificados UsuariosNotificados
        {
            get
            {
                return usuariosNotificados;
            }

            set
            {
                usuariosNotificados = value;
            }
        }
    }
}
