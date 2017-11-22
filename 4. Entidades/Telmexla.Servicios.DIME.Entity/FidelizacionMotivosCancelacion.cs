using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionMotivosCancelacion
    {
        public decimal Id { get; set; }
        [Required(ErrorMessage = "Por favor escriba un motivo")]
        public string Motivo { get; set; }
        [Range(0, 1, ErrorMessage = "Debe seleccionar SI o NO")]
        [Required(ErrorMessage = "El campo Eliminado Es obligatorio")]
        public decimal Eliminado { get; set; }
        public System.DateTime?  Registro { get; set; }
        [Range(0, 1, ErrorMessage = "Debe seleccionar SI o NO")]
        [Required(ErrorMessage = "Indique si desea mostrar campos adicionales")]
        public decimal OtrosCampos { get; set; }
        public decimal OtrosOfrecimientos { get; set; }
    }
}
