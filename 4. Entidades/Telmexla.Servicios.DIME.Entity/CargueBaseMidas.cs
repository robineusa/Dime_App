using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class CargueBaseMidas
    {
        public decimal Id { get; set; }
        public decimal CuentaCliente { get; set; }
        public System.DateTime? FechaAsignacion { get; set; }
        public decimal ConsumosPPV { get; set; }
        public string UltimoPPV{ get; set; }
        public string SiembraHD { get; set; }
        public string SiembraVoz { get; set; }
        public string BlindajeInternet { get; set; }
        public string UltimaMarca1 { get; set; }
        public System.DateTime? FechaUltimaMarca1 { get; set; }
        public string UltimaMarca2 { get; set; }
        public System.DateTime? FechaUltimaMarca2 { get; set; }
        public string UltimaMarcaCancelacion { get; set; }
        public System.DateTime? FechaUltimaMarcaCancelacion { get; set; }
        public string Ofrecimiento1 { get; set; }
        public string Ofrecimiento2 { get; set; }
        public string Ofrecimiento3 { get; set; }
        public string Campaña1 { get; set; }
        public string Campaña2 { get; set; }
        public string Campaña3 { get; set; }
        public decimal UsuarioGestionando{ get; set; }
    }
}
