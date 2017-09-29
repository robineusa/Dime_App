using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GPrincipalRecurrenciaInbound
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string Macroproceso { get; set; }
        public string ServicioAfectado { get; set; }
        public string ArbolSoporte { get; set; }
        public string FallaCausaRaiz { get; set; }
        public string SolucionEspecifica { get; set; }
        public string Estado { get; set; }
        public string FallaAtribuibleA { get; set; }
        public string PorQue { get; set; }
        public string ActivacionClaroVideoNagra { get; set; }
        public string ServicioOfrecido { get; set; }
        public string AceptacionServicioOfrecido { get; set; }
        public string Observaciones { get; set; }
    }
}
