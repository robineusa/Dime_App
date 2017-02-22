
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

    // TBL_PREGUNTAS_DESBLOQUEO
    public class PreguntasDesbloqueo
    {
        public int Id { get; set; } // ID (Primary key)
        public string Nombre { get; set; } // NOMBRE (length: 300)

        // Reverse navigation
        public virtual System.Collections.Generic.ICollection<UsuariosXPreguntasDesb> UsuariosXPreguntasDesbs { get; set; } // Many to many mapping

        public PreguntasDesbloqueo()
        {
            UsuariosXPreguntasDesbs = new System.Collections.Generic.List<UsuariosXPreguntasDesb>();
        }
    }

}

