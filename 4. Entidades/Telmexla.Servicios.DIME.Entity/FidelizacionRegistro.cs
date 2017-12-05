
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionRegistro
    {
        public decimal Id { get; set; }
        [Required(ErrorMessage = "Por favor indique el submotivo")]
        public decimal SubmotivoId { get; set; }
        public decimal RecursivaIdA { get; set; }
        public decimal? RecursivaIdB { get; set; }
        public decimal? RecursivaIdC { get; set; }
        public string ServiciosId { get; set; }
        public string Permanencia{ get; set; }
        public decimal DiaCorte { get; set; }
        public System.DateTime? FechaCorte { get; set; }
        public System.DateTime? FechaRegistro { get; set; }
        public int UsuarioId { get; set; }
        [Required(ErrorMessage = "Por favor diigite una cuenta")]
        public decimal Cuenta { get; set; }
        [Required(ErrorMessage = "Seleccione por favor un acuerdo")]
        public decimal TipificacionId { get; set; }
        public string ServiciosRetenidosId { get; set; }
        [Required(ErrorMessage = "Genere las notas respectivas para este caso")]
        public string Notas { get; set; }
        public string UsuarioTransfiere { get; set; }
        public decimal Renta { get; set; }
        public string Direccion { get; set; }
        [Required(ErrorMessage = "Por favor digite el número del ticket que se genera ")]
        public decimal Ticket { get; set; }
        public bool Internet { get; set; }
        public bool Television { get; set; }
        public bool Telefonia { get; set; }
        public bool InternetRet { get; set; }
        public bool TelevisionRet { get; set; }
        public bool TelefoniaRet { get; set; }
        public decimal Nivel { get; set; }
    }
}
