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

namespace Telmexla.Servicios.DIME.Entity
{

    // TBL_USUARIOS_X_PREGUNTAS_DESB
    public class UsuariosXPreguntasDesb
    {
        public int Id { get; set; } // ID (Primary key)
        public int IdPregunta { get; set; } // ID_PREGUNTA (Primary key)
        public int IdUsuario { get; set; } // ID_USUARIO (Primary key)
        public string Respuesta { get; set; } // RESPUESTA (length: 200)

        // Foreign keys
        public virtual PreguntasDesbloqueo PreguntasDesbloqueo { get; set; } // FK__TBL_USUAR__ID_PR__3A4CA8FD
        public virtual Usuario Usuario { get; set; } // FK__TBL_USUAR__ID_US__3B40CD36
    }

}
