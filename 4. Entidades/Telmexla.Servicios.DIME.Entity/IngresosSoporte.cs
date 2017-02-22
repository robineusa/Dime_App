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

    // TBL_INGRESOS_SOPORTE
    public class IngresosSoporte
    {
        public int Id { get; set; } // ID (Primary key)
        public decimal? IdIngreso { get; set; } // ID_INGRESO
        public decimal Cuenta { get; set; } // CUENTA
        public string Nombre { get; set; } // NOMBRE (length: 30)
        public string Apellido { get; set; } // APELLIDO (length: 30)
        public string TipoSegumiento { get; set; } // TIPO_SEGUMIENTO (length: 100)
        public decimal IncidenciaCcaa { get; set; } // INCIDENCIA_CCAA
        public string NombreAutoriza { get; set; } // NOMBRE_AUTORIZA (length: 200)
        public string CcaaIndicaVisitaTecnica { get; set; } // CCAA_INDICA_VISITA_TECNICA (length: 2)
        public int? IdServicio { get; set; } // ID_SERVICIO
        public string Razon { get; set; } // RAZON (length: 100)
        public string Subrazon1 { get; set; } // SUBRAZON1 (length: 100)
        public string Subrazon2 { get; set; } // SUBRAZON2 (length: 100)
    }

}
