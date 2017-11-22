using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class RSLSeguimientos
    {
        public decimal IdTransaccion { get; set; }
        public decimal IdSolicitud { get; set; }
        public System.DateTime? FechaTransaccion { get; set; }
        public decimal UsuarioTransaccion { get; set; }
        public string NombreUsuarioTransaccion { get; set; }
        public string AliadoTransaccion { get; set; }
        public string OperacionTransaccion { get; set; }
        public string LineaTransaccion { get; set; }
        public decimal? CuentaCliente { get; set; }
        public string TipoEscalamiento { get; set; }
        public string DetalleEscalamiento { get; set; }
        public string MotivoEscalamiento { get; set; }
        public string RazonEscalamiento { get; set; }
        public string SubRazonEscalamiento { get; set; }
        public string Estrategia1 { get; set; }
        public string Estrategia2 { get; set; }
        public string Estrategia3 { get; set; }
        public decimal? TicketRr { get; set; }
        public string EstadoSolicitud { get; set; }
        public string Observaciones { get; set; }
    }
}
