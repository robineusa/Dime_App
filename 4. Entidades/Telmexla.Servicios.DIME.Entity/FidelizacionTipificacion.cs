using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionTipificacion
    {
        public decimal Id { get; set; }
        [Required(ErrorMessage = "Por favor colóquele un tìtulo a la nota")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "Por favor escriba una nota")]
        [StringLength(1000, MinimumLength = 20, ErrorMessage = "La  cantidad de caracteres debe ser mayor a 20 y menor a 1000")]
        public string Nota { get; set; }
        public decimal Eliminado { get; set; }
        public decimal Activo { get; set; }
        public decimal Modulo { get; set; }
        public decimal Nivel1 { get; set; }//te cambiamos estos tres tipos de datos por el error 
        public decimal Nivel2 { get; set; }//te cambiamos estos tres tipos de datos por el error 
        public decimal Nivel3 { get; set; }//te cambiamos estos tres tipos de datos por el error 
        public int UsuarioId { get; set; }
        public System.DateTime? Registro { get; set; }
        public decimal ValidaRetencion { get; set; }
    }
}
