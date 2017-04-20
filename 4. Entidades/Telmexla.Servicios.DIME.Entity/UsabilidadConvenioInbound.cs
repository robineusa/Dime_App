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
    public class UsabilidadConvenioInbound
    {
        public int? Id { get; set; } // ID (Primary key)
        public System.DateTime? FechaRevision { get; set; } 
        public int? IdUsuarioRevision { get; set; }
        public string NombreUsuarioRevision { get; set; }
        public int? CuentaRevisoTabla { get; set; }
    }
}
