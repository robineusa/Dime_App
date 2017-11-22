using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionSubmotivosCancelacion
    {
        public decimal Id { get; set; }
        [Required(ErrorMessage = "Por favor escriba un Submotivo")]
        public string Submotivo { get; set; }
        [Range(0, 1, ErrorMessage = "Debe seleccionar SI o NO")]
        [Required(ErrorMessage = "El campo Eliminado es obligatorio")]
        public decimal Eliminado { get; set; }
        [Range(1, 10000, ErrorMessage = "Debe seleccionar una opción válida")]
        [Required(ErrorMessage = "Indique a que motivo pertenece")]
        public decimal FIDMotivoId { get; set; }
        public System.DateTime?  Registro { get; set; }
    }
}
