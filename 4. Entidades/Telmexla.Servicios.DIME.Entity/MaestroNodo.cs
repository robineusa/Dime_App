using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    //[TBL_INFORMACION_NODOS]
    public class  MaestroNodo
    {
        public decimal IdNodo { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Nodo { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string NombreNodo { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Div { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Com { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Divisional { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Area { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Zona { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Distrito { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Ugestion { get; set; }

        public string Usuario { get; set; }
        public System.DateTime? FechaCreacion { get; set; }

        [Required(ErrorMessage = "Debe Seleccionar una Opción")]
        public string Estado { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Red { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Aliado { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string NombreComunidad { get; set; }

        [Required(ErrorMessage = "Este campo no puede ser vacio")]
        public string Departamento { get; set; }

    }
}
