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

    public class Linea
    {
        public int Id { get; set; } // ID (Primary key)
        public string Nombre { get; set; } // NOMBRE (length: 50)
        public int? IdModoLogin { get; set; } // ID_MODO_LOGIN

        // Reverse navigation
        public virtual System.Collections.Generic.ICollection<AccesosXLinea> AccesosXLineas { get; set; } // TBL_ACCESOS_X_LINEA.FK__TBL_ACCES__ID_LI__5CE1B823
        public virtual System.Collections.Generic.ICollection<Usuario> Usuarios { get; set; } // TBL_USUARIOS.FK__TBL_USUAR__ID_LI__68D28DBC
        public virtual ModosLogin ModosLogin { get; set; }

        public Linea()
        {
            AccesosXLineas = new System.Collections.Generic.List<AccesosXLinea>();
            Usuarios = new System.Collections.Generic.List<Usuario>();
        }
    }

}
