
namespace Telmexla.Servicios.DIME.Entity
{
    public class CEPAsigSuspenciones
    {
        public decimal IdAsignacion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string CanalDeIngreso { get; set; }
        public System.DateTime? FechaCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public decimal UsuarioGestionando { get; set; }
    }
}
