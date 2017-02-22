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

    // TBL_INGRESOS
    public class Ingreso
    {
        public decimal IdIngreso { get; set; } // ID_INGRESO (Primary key)
        public decimal Cuenta { get; set; } // CUENTA
        public double? HomePass { get; set; } // HOME_PASS
        public string Nombre { get; set; } // NOMBRE (length: 30)
        public string Apellido { get; set; } // APELLIDO (length: 30)
        public string Cedula { get; set; } // CEDULA (length: 30)
        public string Nodo { get; set; } // NODO (length: 10)
        public string Red { get; set; } // RED (length: 50)
        public string Division { get; set; } // DIVISION (length: 50)
        public string Area { get; set; } // AREA (length: 50)
        public string Zona { get; set; } // ZONA (length: 50)
        public string Distrito { get; set; } // DISTRITO (length: 50)
        public string NombreComunidad { get; set; } // NOMBRE_COMUNIDAD (length: 50)
        public string Departamento { get; set; } // DEPARTAMENTO (length: 50)
        public string Estrato { get; set; } // ESTRATO (length: 15)
        public string TipoCliente { get; set; } // TIPO_CLIENTE (length: 15)
        public string Descripcion { get; set; } // DESCRIPCION (length: 30)
        public string GrupoSeg { get; set; } // GRUPO_SEG (length: 30)
        public string Productos { get; set; } // PRODUCTOS (length: 30)
        public decimal Ticket { get; set; } // TICKET
        public System.DateTime? FechaApertura { get; set; } // FECHA_APERTURA
        public System.DateTime? HoraApertura { get; set; } // HORA_APERTURA
        public System.DateTime? FechaCierre { get; set; } // FECHA_CIERRE
        public System.DateTime? HoraCierre { get; set; } // HORA_CIERRE
        public string UsuarioApertura { get; set; } // USUARIO_APERTURA (length: 100)
        public string UsuarioCierre { get; set; } // USUARIO_CIERRE (length: 100)
        public System.DateTime? FechaUltimaActualizacion { get; set; } // FECHA_ULTIMA_ACTUALIZACION
        public string UsuarioUltimaActualizacion { get; set; } // USUARIO_ULTIMA_ACTUALIZACION (length: 100)
        public System.DateTime? HoraUltimaActualizacion { get; set; } // HORA_ULTIMA_ACTUALIZACION
        public string Macroproceso { get; set; } // MACROPROCESO (length: 100)
        public string Proceso { get; set; } // PROCESO (length: 100)
        public string Subproceso { get; set; } // SUBPROCESO (length: 500)
        public string Marcacion { get; set; } // MARCACION (length: 100)
        public int? IdEstado { get; set; } // ID_ESTADO
        public string Semaforo { get; set; } // SEMAFORO (length: 100)
        public decimal? TiempoRespuesta { get; set; } // TIEMPO_RESPUESTA
        public string UsuarioBackoffice { get; set; } // USUARIO_BACKOFFICE (length: 50)
        public string AliadoApertura { get; set; } // ALIADO_APERTURA (length: 50)
        public string NombreLineaIngreso { get; set; } // NOMBRE_LINEA_INGRESO (length: 50)
        public string NombreLineaEscalado { get; set; } // NOMBRE_LINEA_ESCALADO (length: 50)
        public int? IdServicio { get; set; } // ID_SERVICIO
    }

}
