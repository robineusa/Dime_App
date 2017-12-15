using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class UsuariosNotificadosSignalR
    {
        public decimal Id { get; set; }
        public decimal IdNotificacion { get; set; }
        public decimal UsuarioNotificado{ get; set; }

        // Foreign keys
        public virtual NotificacionSignalR notificacionSignalR { get; set; }

    }
}
