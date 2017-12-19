

namespace Telmexla.Servicios.DIME.Entity
{
    public class CELTickets
    {
        public decimal IdTransaccion { get; set; }
        public decimal IdGestion { get; set; }
        public System.DateTime? FechaDeTransaccion { get; set; }
        public decimal UsuarioDeTransaccion { get; set; }
        public string NombreUsuarioTransaccion { get; set; }
        public string CanaldeIngreso { get; set; }
        public decimal CuentaCliente { get; set; }
        public decimal NumeroDeTicket { get; set; }
        public string UsuarioDeCreacion { get; set; }
        public System.DateTime? FechaDeCreacion { get; set; }
        public string Srcaus { get; set; }
        public string Srreas { get; set; }
        public string Nota1 { get; set; }
        public string Nota2 { get; set; }
        public string Gestion { get; set; }
        public string Razon { get; set; }
        public string Subrazon { get; set; }
        public string Estado { get; set; }
        public string Ajuste { get; set; }
        public System.DateTime? FechaDeSeguimiento { get; set; }
        public System.DateTime? FechaDeCancelacion { get; set; }
        public string MarcacionCancelacion { get; set; }
        public string UsuarioDeCancelacion { get; set; }
        public string UsuarioDeRetencion { get; set; }
        public decimal ServiciosDesconectados { get; set; }
        public string Observaciones { get; set; }
    }
}
