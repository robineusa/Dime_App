using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class CELLiberaciones
    {
        public decimal IdTransaccion { get; set; }
        public decimal IdGestion { get; set; }
        public System.DateTime? FechaDeTransaccion { get; set; }
        public decimal UsuarioDeTransaccion { get; set; }
        public string NombreUsuarioTransaccion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string RegistroModulo { get; set; }
        public string CanalDeIngreso { get; set; }
        public string UsarioEscala { get; set; }
        public decimal NumeroServicios { get; set; }
        public System.DateTime? FechaSolicitud { get; set; }
        public string SolicitudModulo { get; set; }
        public string MotivoDesconexion { get; set; }
        public string Vendedor { get; set; }
        public string Grupo { get; set; }
        public string Gestion { get; set; }
        public string Subrazon { get; set; }
        public string MotivoLiberacion { get; set; }
        public string UsuarioQueLibero { get; set; }
        public string Estado { get; set; }
        public System.DateTime? FechaSeguimiento { get; set; }
        public string Observaciones { get; set; }
    }
}
