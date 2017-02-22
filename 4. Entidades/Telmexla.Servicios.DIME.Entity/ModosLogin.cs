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

    // TBL_MODOS_LOGINS
    public class ModosLogin
    {
        public int Id { get; set; } // ID (Primary key)
        public string Nombre { get; set; } // NOMBRE (length: 20)

        // Reverse navigation
        public virtual System.Collections.Generic.ICollection<Acceso> Accesoes { get; set; } // TBL_ACCESOS.FK__TBL_ACCES__ID_MO__7A3223E8
        public virtual System.Collections.Generic.ICollection<Linea> Lineas { get; set; } // TBL_LINEA.FK__TBL_LINEA__ID_MO__7755B73D

        public ModosLogin()
        {
            Accesoes = new System.Collections.Generic.List<Acceso>();
            Lineas = new System.Collections.Generic.List<Linea>();
        }
    }

}
