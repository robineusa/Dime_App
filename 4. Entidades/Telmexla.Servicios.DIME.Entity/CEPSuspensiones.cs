using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class CEPSuspensiones
    {
        public decimal IdGestion { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public decimal UsuarioDeGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string CanalDeIngreso { get; set; }
        public System.DateTime? FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public string ServiciosSuspender { get; set; }
        public string MotivosSuspension { get; set; }
        public string MesesSuspender { get; set; }
        public string Gestion { get; set; }
        public string Subrazon { get; set; }
        public string Estado { get; set; }
        public System.DateTime? FechaSeguimiento { get; set; }
        public string Observaciones { get; set; }
       
    }
}
