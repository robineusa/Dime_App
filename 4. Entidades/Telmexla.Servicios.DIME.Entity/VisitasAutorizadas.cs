
namespace Telmexla.Servicios.DIME.Entity
{
    public class VisitasAutorizadas
    {
        public decimal IdVisita { get; set; }
        public System.DateTime? FechaRegistro { get; set; }
        public decimal UsuarioRegistro { get; set; }
        public string AliadoRegistro { get; set; }
        public string OperacionRegistro { get; set; }
        public decimal CuentaCliente { get; set; }
        public string LlamadaServicio { get; set; }
        public string Aviso { get; set; }
        public string Motivo { get; set; }
        public decimal CedulaUsuarioGestion { get; set; }
    }
}
