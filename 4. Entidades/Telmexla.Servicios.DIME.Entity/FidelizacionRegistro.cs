
namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionRegistro
    {
        public decimal Id { get; set; }
        public decimal SubmotivoId { get; set; }
        public decimal RecursivaId { get; set; }
        public string ServiciosId { get; set; }
        public string Permanencia{ get; set; }
        public decimal DiaCorte { get; set; }
        public System.DateTime? FechaCorte { get; set; }
        public System.DateTime? FechaRegistro { get; set; }
        public int UsuarioId { get; set; }
        public decimal Cuenta { get; set; }
        public decimal OtrosOfrecimientosId { get; set; }
        public decimal TipificacionId { get; set; }
        public string ServiciosRetenidosId { get; set; }
        public string Notas { get; set; }
    }
}
