using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class RSPSeguimientos
    {
        public decimal IdSolicitud { get; set; }
        public System.DateTime? FechaSolicitud { get; set; }
        public decimal UsuarioSolicitud { get; set; }
        public string NombreUsuarioSolicitud { get; set; }
        public string AliadoSolicitud { get; set; }
        public string OperacionSolicitud { get; set; }
        public string LineaSolicitud { get; set; }
        public System.DateTime? FechaActualizacion { get; set; }
        public decimal UsuarioActualizacion { get; set; }
        public string NombreUsuarioActualizacion { get; set; }
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
