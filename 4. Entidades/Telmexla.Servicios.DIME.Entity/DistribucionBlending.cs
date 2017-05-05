
namespace Telmexla.Servicios.DIME.Entity
{
    public class DistribucionBlending
    {
        public decimal  Id { get; set; }
        public decimal CuentaCliente { get; set; }
        public string FormularioDestino { get; set; }
        public string AliadoDestino { get; set; }
        public string OperacionDestino { get; set; }
        public string CampanaDestino { get; set; }
        public int UsuarioGestionando { get; set; }
        public System.DateTime? FechaAsignacion { get; set; }
        public string UsuarioAsignacion { get; set; }
    }
}
