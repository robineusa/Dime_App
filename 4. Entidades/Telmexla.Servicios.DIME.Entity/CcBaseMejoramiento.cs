
namespace Telmexla.Servicios.DIME.Entity
{
    public class CcBaseMejoramiento
    {
        public int Id { get; set; } // ID (Primary key)
        public double? Cuenta { get; set; } // CUENTA
        public System.DateTime? Fecha { get; set; } // FECHA
        public double? Hora { get; set; } // HORA
        public string Usuario { get; set; } // USUARIO (length: 100)
        public string CodDivision { get; set; } // COD_DIVISION (length: 100)
        public string Comunidad { get; set; } // COMUNIDAD (length: 100)
        public string Razon { get; set; } // RAZON (length: 100)
        public string Subrazon { get; set; } // SUBRAZON (length: 100)
        public string Motivo { get; set; } // MOTIVO (length: 100)
        public string Nodo { get; set; } // NODO (length: 100)
        public string TipoServicio { get; set; } // TIPO_SERVICIO (length: 100)
        public string Submarcacion { get; set; } // SUBMARCACION (length: 100)
        public string Area { get; set; } // AREA (length: 100)
        public string Division { get; set; } // DIVISION (length: 100)
        public string Nombre { get; set; } // NOMBRE (length: 100)
        public string TipoCliente { get; set; } // TIPO_CLIENTE (length: 100)
        public string Telefono1 { get; set; } // TELEFONO_1 (length: 100)
        public string Telefono2 { get; set; } // TELEFONO_2 (length: 100)
        public string Telefono3 { get; set; } // TELEFONO_3 (length: 100)
        public string NombreComunidad { get; set; } // NOMBRE_COMUNIDAD (length: 100)
        public string Aliado { get; set; } // ALIADO (length: 100)
        public string Canal { get; set; } // CANAL (length: 100)
        public string Operacion { get; set; } // OPERACION (length: 100)
        public double? Pqr { get; set; } // PQR
        public string Cun { get; set; } // CUN (length: 100)
        public string IncluyeClaroVideo { get; set; } // INCLUYE_CLARO_VIDEO (length: 100)
        public string UsoClaroVideo { get; set; } // USO_CLARO_VIDEO (length: 100)
        public string ClienteNagra { get; set; } // CLIENTE_NAGRA (length: 100)
        public string Ofrecimiento1 { get; set; } // OFRECIMIENTO_1 (length: 200)
        public string Ofrecimiento2 { get; set; } // OFRECIMIENTO_2 (length: 200)
        public string Ofrecimiento3 { get; set; } // OFRECIMIENTO_3 (length: 200)
    }

}
// </auto-generated>
