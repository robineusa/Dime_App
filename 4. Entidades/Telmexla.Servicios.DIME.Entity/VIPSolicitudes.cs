
namespace Telmexla.Servicios.DIME.Entity
{
    public class VIPSolicitudes
    {
        public decimal IdSolicitud { get; set; }
        public System.DateTime? FechaSolicitud { get; set; }
        public decimal UsuarioSolicitud { get; set; }
        public string NombreUsuarioSolicitud { get; set; }
        public string AliadoSolicitud { get; set; }
        public string OperacionSolicitud { get; set; }
        public System.DateTime? FechaUltimaActualizacion { get; set; }
        public decimal UsuarioUltimaActualizacion { get; set; }
        public string NombreUsuarioUltimaActualizacion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string TipoDeRequerimiento { get; set; }
        public string RequiereAjuste { get; set; }
        public string Nodo { get; set; }
        public string Gestion { get; set; }
        public string Subrazon { get; set; }
        public string EstadoSolicitud { get; set; }
        public string AliadoTecnico { get; set; }
        public string Observaciones { get; set; }
    }
}
