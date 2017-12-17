
namespace Telmexla.Servicios.DIME.Entity
{
    public class CEPAsigDesconexiones
    {
       public decimal Id { get; set; }
        public string CanalDeIngreso { get; set; }
        public decimal CuentaCliente { get; set; }
        public string MotivoDeDesconexion { get; set; }
        public string Codigo { get; set; }
        public string Nota1 { get; set; }
        public string Nota2 { get; set; }
        public string Nota3 { get; set; }
        public string Nota4 { get; set; }
        public string Nota5 { get; set; }
        public string Red { get; set; }
        public string Servicios { get; set; }
        public System.DateTime? FechaDeSolicitud { get; set; }
        public System.DateTime? FechaDeCorte { get; set; }
        public System.DateTime? FechaDePreaviso { get; set; }
        public decimal DiaDeDesconexion { get; set; }
        public string TarifaAnterior { get; set; }
        public System.DateTime? FechaDeAsignacion { get; set; }
        public decimal UsuarioGestionando { get; set; }

    }
}
