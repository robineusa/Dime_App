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

    // TBL_ACCESOS
    public class Acceso
    {
        public int Id { get; set; } // ID (Primary key)
        public string Nombre { get; set; } // NOMBRE (length: 50)
        public int? IdModoLogin { get; set; } // ID_MODO_LOGIN
        public string Descripcion { get; set; }

        // Reverse navigation
        public virtual System.Collections.Generic.ICollection<UsuariosXAcceso> UsuariosXAccesoes { get; set; } // Many to many mapping

        // Foreign keys
        public virtual ModosLogin ModosLogin { get; set; } // FK__TBL_ACCES__ID_MO__7A3223E8

        public Acceso()
        {
            UsuariosXAccesoes = new System.Collections.Generic.List<UsuariosXAcceso>();
        }
    }

}
