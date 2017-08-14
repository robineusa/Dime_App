
namespace Telmexla.Servicios.DIME.Entity
{
    public class BILBitacoraIncidentes
    {
        public decimal Id { get; set; }
        public decimal IdRegistro { get; set; }
        public string UsuarioCreacion { get; set; }
        public string NombreUsuarioCreacion { get; set; }
        public System.DateTime? FechaDeRegistro { get; set; }
        public System.DateTime? FechaUltimaActualizacion { get; set; }
        public string UsuarioUltimaActualizacion { get; set; }
        public string NombreUsuarioUltimaActualizacion { get; set; }
        public string CasoSD { get; set; }
        public string IM { get; set; }
        public System.DateTime? FechaDeCreacionTicket { get; set; }
        public System.DateTime? FechaDeCierreTicket { get; set; }
        public System.DateTime? FechaDeCierreAfectacion { get; set; }
        public string Herramienta { get; set; }
        public string TipoDeFalla { get; set; }
        public string ModuloAfectado { get; set; }
        public string DescripcionAfectacion { get; set; }
        public string Prioridad { get; set; }
        public string EscaladoA { get; set; }
        public decimal CantidadUsuariosAfectados { get; set; }
        public string ComentariosDeCierre { get; set; }
        public string EstadoDelCaso { get; set; }
    }
}
