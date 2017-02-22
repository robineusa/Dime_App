// ReSharper disable ConvertPropertyToExpressionBody
// ReSharper disable DoNotCallOverridableMethodsInConstructor
// ReSharper disable InconsistentNaming
// ReSharper disable PartialMethodWithSinglePart
// ReSharper disable PartialTypeWithSinglePart
// ReSharper disable RedundantNameQualifier
// ReSharper disable RedundantOverridenMember
// ReSharper disable UseNameofExpression
// TargetFrameworkVersion = 4.51
#pragma warning disable 1591    //  Ignore "Missing XML Comment" warning

using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{

    // TBL_USUARIOS
    public class Usuario
    {
        public int Id { get; set; } // ID (Primary key)

        [Required (ErrorMessage = "El campo Cedula no puede ser vacio")]
        public decimal? Cedula { get; set; } // CEDULA
        public string Nombre { get; set; } // NOMBRE (length: 100)

        [Required(ErrorMessage = "El campo Contraseña no puede ser vacio")]
        public string Contrasena { get; set; } // CONTRASENA (length: 300)
        public string Genero { get; set; } // GENERO (length: 1)

        [Required(ErrorMessage = "El campo Correo no puede ser vacio")]
        [EmailAddress(ErrorMessage = "El correo no tiene el formato correcto")]
        public string Correo { get; set; } // CORREO (length: 200)

        [Required(ErrorMessage = "El campo Fecha de Nacimiento no puede ser vacio")]
        public System.DateTime? FechaNacimiento { get; set; } // FECHA_NACIMIENTO

        [Required(ErrorMessage = "El campo Teléfono no puede ser vacio")]
        public decimal? Telefono { get; set; } // TELEFONO
        public System.DateTime? FechaContrasena { get; set; } // FECHA_CONTRASENA
        public bool? Capacitado { get; set; } // Capacitado
        public int? IdLinea { get; set; } // ID_LINEA
        // Reverse navigation
        public virtual System.Collections.Generic.ICollection<RegistroSesion> RegistroSesions { get; set; } // TBL_REGISTRO_SESION.FK__TBL_REGIS__ID_US__50FB042B
        public virtual System.Collections.Generic.ICollection<UsuariosXAcceso> UsuariosXAccesoes { get; set; } // Many to many mapping
        public virtual System.Collections.Generic.ICollection<UsuariosXPreguntasDesb> UsuariosXPreguntasDesbs { get; set; } // Many to many mapping
        public virtual Linea Linea { get; set; } // FK__TBL_USUAR__ID_LI__0E6E26BF
        public Usuario()
        {
            RegistroSesions = new System.Collections.Generic.List<RegistroSesion>();
            UsuariosXAccesoes = new System.Collections.Generic.List<UsuariosXAcceso>();
            UsuariosXPreguntasDesbs = new System.Collections.Generic.List<UsuariosXPreguntasDesb>();
        }
    }

}
