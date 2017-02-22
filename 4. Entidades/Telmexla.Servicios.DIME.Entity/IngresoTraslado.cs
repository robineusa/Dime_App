using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    //TBL_INGRESOS TRASLADOS
    public class IngresoTraslado
    {
        public decimal IdTransaccion { get; set; } // ID_TRASLADO (Primary key)
        public decimal CuentaCliente { get; set; } //CUENTA DEL CLIENTE
        public string TipoGestion { get; set; }// TIPO DE GESTION
        public System.DateTime? FechaApertura { get; set; } // FECHA_APERTURA
        public System.DateTime? HoraApertura { get; set; } // HORA APERTURA
        public System.DateTime? FechaCierre { get; set; } // FECHA CIERRE
        public System.DateTime? HoraCierre { get; set; } // HORA CIERRE
        public string UsuarioApertura { get; set; }// USUARIO APERTURA
        public string UsuarioCierre { get; set; }//USUARIO CIERRE
        public System.DateTime? FechaUltimaActualizacion { get; set; } // FECHA ULTIMA ACTUALIZACION
        public System.DateTime? HoraUltimaActualizacion { get; set; } // HORA ULTIMA ACTUALIZACION
        public string UsuarioUltimaActualizacion { get; set; } //USUARIO ULTIMA ACTUALIZACION
        public string EstadoTransaccion { get; set; }//ESTADO DE LA TRANSACCION
        public string AliadoApertura { get; set; }//ALIADO DE APERTURA
        public string NombreLineaIngreso { get; set; }//NOMBRE DE LINEA DE INGRESO
        public string NombreLineaEscalado { get; set; }//NOMBRE DE LINEA ESCALADO
    }
}
