
namespace Telmexla.Servicios.DIME.Entity
{
    public class CEPAsigDesconexiones
    {
       public decimal Id { get; set; }
        public string CanalDeIngreso { get; set; }
        public decimal CuentaCliente { get; set; }
        public string Nota1 { get; set; }
        public string Nota2 { get; set; }
        public System.DateTime? FechaDeSolicitud { get; set; }
        public System.DateTime? FechaDeCorte { get; set; }
        public System.DateTime? FechaDePreaviso { get; set; }
        public System.DateTime? FechaDeAsignacion { get; set; }
        public decimal UsuarioGestionando { get; set; }

    }
}
