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

    // TBL_CLIENTES_TODOS
    public class ClientesTodo
    {
        [Required(ErrorMessage = "La cuenta no puede ser vacía")]
        public int Cuenta { get; set; } // CUENTA (Primary key)
        public double? HomePass { get; set; } // HOME_PASS
        public string Estado { get; set; } // ESTADO (length: 8)
        public string Nombre { get; set; } // NOMBRE (length: 30)
        public string Apellido { get; set; } // APELLIDO (length: 30)
        public string Cedula { get; set; } // CEDULA (length: 30)
        public double? TelefonoTelmex { get; set; } // TELEFONO_TELMEX
        public string Telefono1 { get; set; } // TELEFONO_1 (length: 20)
        public string Telefono2 { get; set; } // TELEFONO_2 (length: 20)
        public string Telefono3 { get; set; } // TELEFONO_3 (length: 20)
        public string Celular1 { get; set; } // CELULAR_1 (length: 30)
        public string Celular2 { get; set; } // CELULAR_2 (length: 30)
        public string TelefonoConv { get; set; } // TELEFONO_CONV (length: 100)
        public string DirInstalacion { get; set; } // DIR_INSTALACION (length: 100)
        public string DirCorrespondencia { get; set; } // DIR_CORRESPONDENCIA (length: 1000)
        public string Correo { get; set; } // CORREO (length: 100)
        public string Nodo { get; set; } // NODO (length: 10)
        public string Red { get; set; } // RED (length: 50)
        public string Division { get; set; } // DIVISION (length: 50)
        public string Area { get; set; } // AREA (length: 50)
        public string Zona { get; set; } // ZONA (length: 50)
        public string Distrito { get; set; } // DISTRITO (length: 50)
        public string NombreComunidad { get; set; } // NOMBRE_COMUNIDAD (length: 50)
        public string Departamento { get; set; } // DEPARTAMENTO (length: 50)
        public string Estrato { get; set; } // ESTRATO (length: 5)
        public string TipoCliente { get; set; } // TIPO_CLIENTE (length: 4)
        public string Descripcion { get; set; } // DESCRIPCION (length: 30)
        public string GrupoSeg { get; set; } // GRUPO_SEG (length: 30)
        public string Productos { get; set; } // PRODUCTOS (length: 30)
        public string Convenio { get; set; } // CONVENIO (length: 30)
        public string Cortesia { get; set; } // CORTESIA (length: 30)
        public string SrvHd { get; set; } // SRV_HD (length: 30)
        public double? NumSrvBasicos { get; set; } // NUM_SRV_BASICOS
        public string Dth { get; set; } // DTH (length: 30)
        public string Clarovideo { get; set; } // CLAROVIDEO (length: 30)
        public string CategoriaRenta { get; set; } // CATEGORIA_RENTA (length: 30)
    }

}
