// <auto-generated>
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

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace Dime.Models
{

    // USUARIOS

    public class Usuario2
    {
        
        public int Id { get; set; } // ID (Primary key)

        [Display(Name = "Cedula de Ciudadania")]
        [Required]
        public decimal? Cedula { get; set; } // CEDULA

        
        [StringLength(5)]
        [Display(Name = "Correo Empresarial")]
        public string Nombre { get; set; } // NOMBRE (length: 20)
        
        public string Contraseña { get; set; } // CONTRASEÑA (length: 40)

   
        // Reverse navigation
 

        public Usuario2()
        {

        }
    }

}
// </auto-generated>
