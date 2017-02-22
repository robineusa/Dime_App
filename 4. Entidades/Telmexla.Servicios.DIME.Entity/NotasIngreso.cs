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

    // TBL_NOTAS_INGRESO
    public class NotasIngreso
    {
        public decimal IdNota { get; set; } // ID_NOTA
        public decimal? IdIngreso { get; set; } // ID_INGRESO
        public decimal CuentaCliente { get; set; } // CUENTA_CLIENTE
        public decimal? Ticket { get; set; } // TICKET
        public string Usuario { get; set; } // USUARIO (length: 100)
        public string NombreLineaNota { get; set; } // NOMBRE_LINEA_NOTA (length: 50)
        public System.DateTime? FechaNota { get; set; } // FECHA_NOTA
        public System.DateTime? HoraNota { get; set; } // HORA_NOTA
        public string LlamadaCliente { get; set; } // LLAMADA_CLIENTE (length: 2)
        public string Nota { get; set; } // NOTA (length: 1073741823)
        public int? IdEstado { get; set; } // ID_ESTADO
    }

}
