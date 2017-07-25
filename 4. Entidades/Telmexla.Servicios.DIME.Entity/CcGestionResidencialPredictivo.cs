
namespace Telmexla.Servicios.DIME.Entity
{
    public class CcGestionResidencialPredictivo
    {
        public long Id { get; set; } // ID (Primary key)
        public int? IdResdPredInfo { get; set; } // ID_RESD_PRED_INFO
        public int? IdBaseMejora { get; set; } // ID_BASE_MEJORA
        public System.DateTime? FechaGestion { get; set; } // FECHA_GESTION
        public int? IdUsuarioGestion { get; set; } // ID_USUARIO_GESTION
        public string AliadoUsrGestion { get; set; } // ALIADO_USR_GESTION (length: 50)
        public string LineaUsrGestion { get; set; } // LINEA_USR_GESTION (length: 50)
        public string CedulaUsrGestion { get; set; } // CEDULA_USR_GESTION (length: 50)
        public double? Cuenta { get; set; } // CUENTA
        public string Ciudad { get; set; } // CIUDAD (length: 50)
        public string Nombre { get; set; } // NOMBRE (length: 100)
        public long? Telefono1 { get; set; } // TELEFONO_1
        public long? Telefono2 { get; set; } // TELEFONO_2
        public long? TelfAdicional1 { get; set; } // TELF_ADICIONAL_1
        public long? TelfAdicional2 { get; set; } // TELF_ADICIONAL_2
        public string NombreContacto { get; set; } // NOMBRE_CONTACTO (length: 100)
        public string Servicio { get; set; } // SERVICIO (length: 50)
        public int? TipoCliente { get; set; } // TIPO_CLIENTE
        public string Division { get; set; } // DIVISION (length: 10)
        public string Comunidad { get; set; } // COMUNIDAD (length: 50)
        public string Usuario { get; set; } // USUARIO (length: 50)
        public string Nodo { get; set; } // NODO (length: 10)
        public string Aliado { get; set; } // ALIADO (length: 50)
        public string Canal { get; set; } // CANAL (length: 100)
        public string Operacion { get; set; } // OPERACION (length: 100)
        public string DetalleInforme { get; set; } // DETALLE_INFORME (length: 50)
        public string Base { get; set; } // BASE (length: 50)
        public string DetalleMarcacion { get; set; } // DETALLE_MARCACION (length: 100)
        public string PersisteFalla { get; set; } // PERSISTE_FALLA (length: 10)
        public string ClasificacionPorServicio { get; set; } // CLASIFICACION_POR_SERVICIO (length: 100)
        public string ServicioAfectado { get; set; } // SERVICIO_AFECTADO (length: 50)
        public string FallaDelCliente { get; set; } // FALLA_DEL_CLIENTE (length: 100)
        public string SolucionFalla { get; set; } // SOLUCION_FALLA (length: 100)
        public string MotivosNoSolucion { get; set; } // MOTIVOS_NO_SOLUCION (length: 100)
        public string ProblemaDelCliente { get; set; } // PROBLEMA_DEL_CLIENTE (length: 100)
        public string Atributo { get; set; } // ATRIBUTO (length: 100)
        public System.DateTime? FechaInstalacion { get; set; } // FECHA_INSTALACION
        public string ClaveWifi { get; set; } // CLAVE_WIFI (length: 100)
        public string EquiposInternet { get; set; } // EQUIPOS_INTERNET (length: 50)
        public string ReferenciaEquiInternet { get; set; } // REFERENCIA_EQUI_INTERNET (length: 50)
        public string EquiposTelevision { get; set; } // EQUIPOS_TELEVISION (length: 50)
        public string ReferenciaEquiTelevision { get; set; } // REFERENCIA_EQUI_TELEVISION (length: 50)
        public string SerialEquiFalla { get; set; } // SERIAL_EQUI_FALLA (length: 50)
        public string Observacion { get; set; } // OBSERVACION (length: 1073741823)
    }

}
// </auto-generated>
