using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class NotificacionSignalR
    {
        public decimal Id { get; set; }
        public string TipoNotificacion { get; set; }
        public string ContenidoAlerta{ get; set; }
        public string UsuarioNotifica { get; set; }
        public System.DateTime? FechaEntrega { get; set; }

        public virtual System.Collections.Generic.ICollection<UsuariosNotificadosSignalR> usersNoti { get; set; }
    }
}
