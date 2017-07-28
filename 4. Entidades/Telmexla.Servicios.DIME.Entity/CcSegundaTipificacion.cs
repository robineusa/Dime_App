
namespace Telmexla.Servicios.DIME.Entity
{
    public class CcSegundaTipificacion
    {
        public long Id { get; set; } // ID (Primary key)
        public int? IdGestionado { get; set; } // ID_GESTIONADO
        public string TipoCierre { get; set; } // TIPO_CIERRE (length: 50)
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
        public string Macroproceso { get; set; } // MACROPROCESO (length: 50)
        public string Clasificacion { get; set; } // CLASIFICACION (length: 50)
        public string ProblemaDelCliente { get; set; } // PROBLEMA_DEL_CLIENTE (length: 50)
        public string SoporteDado { get; set; } // SOPORTE_DADO (length: 50)
        public string EstadoCliente { get; set; } // ESTADO_CLIENTE (length: 50)
        public string Seguimiento { get; set; } // SEGUIMIENTO (length: 50)
        public string Observacion { get; set; } // OBSERVACION (length: 1073741823)
    }

}
// </auto-generated>
