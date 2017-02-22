using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class UsuariosNotificados
    {
        public int Id_Visto { get; set; } 
        public int Id_Notificado { get; set; }
        public string Usuario { get; set; }
        public System.DateTime? Fecha_Visto { get; set; } 
        public string Nombre_Imagen_Vista { get; set; }
        public string Link_Direccionamiento { get; set; }
        public string Descripcion_Imagen_Vista { get; set; }
        public string Aliado_Usuario { get; set; }
        public string Perfil_Usario { get; set; }
        public string Nombre_Linea_Usuario { get; set; }
    }
}
