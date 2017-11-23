using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionOtrosCampos
    {

        public decimal Id { get; set; }
        [Required(ErrorMessage = "Por favor indique el nombre del campo")]
        public string Nombre { get; set; }
        [Range(1, 3, ErrorMessage = "Debe seleccionar una opcion del listado")]
        [Required(ErrorMessage = "El tipo de campo es obligatorio")]
        public string Tipo { get; set; }
        [Required(ErrorMessage = "Si es de tipo listado indique las opciones separadas por coma (,) o la longitud del camporrrrrrrr.......")]
        public string Opciones { get; set; }
        public string Nivel { get; set; }
        public decimal Eliminado { get; set; }
    }
}
