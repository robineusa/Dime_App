
namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionSubmotivosCancelacion
    {
        public decimal Id { get; set; }
        public string Submotivo { get; set; }
        public decimal Eliminado { get; set; }
        public decimal FIDMotivoId { get; set; }
        public System.DateTime?  Registro { get; set; }
    }
}
