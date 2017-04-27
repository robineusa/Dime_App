
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class SkillsUsuariosBlending
    {
        public int Id { get; set; } // ID (Primary key)
        public int Cedula { get; set; } // Fecha de la publicaion
        public string Operacion { get; set; }// Usuario de publicacion (varchar 30)
        public string Campaña { get; set; }// Nombre Imgen
        public System.DateTime? Fecha_Actualizacion { get; set; }// Link Direccionamiento
        public int Id_Usuario_Actualizacion { get; set; }
    }
}
