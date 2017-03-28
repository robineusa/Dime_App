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


using System;
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{

    // TBL_CLARO_VIDEO
    public class ClaroVideo
    {
        public int Id { get; set; } // ID (Primary key)
        public System.DateTime? FechaGestion { get; set; } // FECHA_GESTION
        public string UsuarioGestion { get; set; } // USUARIO_GESTION (length: 30)
        public string NombreUsuarioGestion { get; set; } // NOMBRE_USUARIO_GESTION (length: 50)
        public string AliadoGestion { get; set; } // ALIADO_GESTION (length: 50)
        public string OperacionGestion { get; set; } // OPERACION_GESTION (length: 100)
        public decimal? CuentaCliente { get; set; } // CUENTA_CLIENTE
        public string NombreCliente { get; set; } // NOMBRE_CLIENTE (length: 1000)
        public string ApellidoCliente { get; set; } // APELLIDO_CLIENTE (length: 100)
        public string DireccionInstalacion { get; set; } // DIRECCION_INSTALACION (length: 100)
        public string DireccionCorrespondencia { get; set; } // DIRECCION_CORRESPONDENCIA (length: 100)
        public string CorreoElectronico { get; set; } // CORREO_ELECTRONICO (length: 100)
        public decimal? Telefono1 { get; set; } // TELEFONO_1
        public decimal? Telefono2 { get; set; } // TELEFONO_2
        public decimal? Telefono3 { get; set; } // TELEFONO_3
        public decimal? Movil1 { get; set; } // MOVIL_1
        public decimal? Movil2 { get; set; } // MOVIL_2
        public string PaqueteActual { get; set; } // PAQUETE_ACTUAL (length: 100)

        [Required(ErrorMessage = "Seleccione una opci�n")]
        public string TipoDeContacto { get; set; } // TIPO_DE_CONTACTO (length: 100)

        [Required(ErrorMessage = "Seleccione una opci�n")]
        public string TipoDeGestion { get; set; } // TIPO_DE_GESTION (length: 100)

        [Required(ErrorMessage = "Seleccione una opci�n")]
        public string Cierre { get; set; } // CIERRE (length: 100)

        [Required(ErrorMessage = "Seleccione una opci�n")]
        public string Razon { get; set; } // RAZON (length: 100)
        public decimal? Attributo1 { get; set; } // ATTRIBUTO_1
        public decimal? Attributo2 { get; set; } // ATTRIBUTO_2
        public decimal? Attributo3 { get; set; } // ATTRIBUTO_3
        public decimal? Attributo4 { get; set; } // ATTRIBUTO_4
        public decimal? Attributo5 { get; set; } // ATTRIBUTO_5
        public decimal? Attributo6 { get; set; } // ATTRIBUTO_6
        public decimal? Attributo7 { get; set; } // ATTRIBUTO_7
        public decimal? Attributo8 { get; set; } // ATTRIBUTO_8
        public decimal? Attributo9 { get; set; } // ATTRIBUTO_9
        public decimal? Attributo10 { get; set; } // ATTRIBUTO_10
        public string Observaciones { get; set; } // OBSERVACIONES (length: 1000)
        public string Seguimiento { get; set; } // SEGUIMIENTO (length: 2)
        public System.DateTime? FechaSeguimiento { get; set; } // FECHA_SEGUIMIENTO

        public bool checkBoxAtribute1
        {
            get { return Convert.ToBoolean(Attributo1); }
             set {  Attributo1= Convert.ToDecimal(value);  }
        }

        public bool checkBoxAtribute2
        {
            get { return Convert.ToBoolean(Attributo2); }
            set { Attributo2 = Convert.ToDecimal(value); }
        }

    }

}
// </auto-generated>
