namespace Telmexla.Servicios.DIME.Entity
{
    public class CEPDesconexiones
    {
        public decimal IdGestion { get; set; }
        public System.DateTime? FechaDeGestion { get; set; }
        public decimal UsuarioDeGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string CanalDeIngreso { get; set; }
        public decimal CuentaCliente { get; set; }
        public string Nota1 { get; set; }
        public string Nota2 { get; set; }
        public System.DateTime? FechaDeSolicitud { get; set; }
        public System.DateTime? FechaDeCorte { get; set; }
        public System.DateTime? FechaDePreaviso { get; set; }
        public System.DateTime? FechaDeAsignacion { get; set; }
        public string Gestion { get; set; }
        public string Subrazon { get; set; }
        public string Estado { get; set; }
        public System.DateTime? FechaDeSeguimiento { get; set; }
        public decimal MovieLetter { get; set; }
        public string Ajuste { get; set; }
        public decimal CantidadServicio { get; set; }
        public string ErrorSolicitud { get; set; }
        public string UsuarioSolicitud { get; set; }
        public string TipoDeError { get; set; }
        public string Observaciones { get; set; }

    }
}
