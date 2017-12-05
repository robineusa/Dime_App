using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization.Formatters.Binary;

namespace Telmexla.Servicios.DIME.Entity
{
    public class IMGOfertasComeciales
    {
        public decimal IdImagen { get; set; }
        public byte[] Imagen { get; set; }
        public string Link { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public decimal UsuarioCreacion { get; set; }
    }
}
