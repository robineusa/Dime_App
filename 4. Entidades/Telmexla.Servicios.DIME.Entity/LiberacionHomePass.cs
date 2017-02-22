
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class LiberacionHomePass
    {

        public decimal Id { get; set; } // ID INCREMENTAL DE LA TABLA
        public decimal? IdTransaccion { get; set; } // ID DE LA TRANSACCION GLOBAL
        public string UsuarioTransaccion { get; set; } //USUARIO QUE GENERA LA TRANSACCION
        public string CanalTransaccion { get; set; } //CANAL DONDE SE GENERA LA TRANSACCION
        public System.DateTime? FechaTransaccion { get; set; } // FECHA DE LA TRANSACCION
        public string NombreLineaTransaccion { get; set; } // NOMBRE DE LA LINEA DE LA TRANSACCION
        [Required(ErrorMessage = "El campo Cuenta Ocupada no puede ser vacio")]
        public decimal CuentaOcupa { get; set; } // CUENTA DEL CLIENTE QUE OCUPA
        [Required(ErrorMessage = "El campo Cuenta Traslada no puede ser vacio")]
        public decimal CuentaTraslada { get; set; } // CUENTA DEL CLIENTE QUE TRASLADA
        [Required(ErrorMessage = "El campo Direccion no puede ser vacio")]
        public string Direccion { get; set; } //DIRECCION
        [Required(ErrorMessage = "El campo Nodo no puede ser vacio")]
        public string Nodo { get; set; } // NODO
        [Required(ErrorMessage = "El campo Telefono Celular no puede ser vacio")]
        public string TelefonoCelular { get; set; } // TELEFONO CELULAR DEL CLIENTE
        [Required(ErrorMessage = "El campo Telefono Fijo no puede ser vacio")]
        public string TelefonoFijo { get; set; }// TELEFONO FIJO DEL CLIENTE
        public string Razon { get; set; }// RAZON
        public string Subrazon { get; set; }//SUBRAZON
        public string Observacion { get; set; }// OBSERVACION REALIZADA
        public string EstadoTransaccion { get; set; } // ESTADO DE LA TRANSACCION
        public string UsuarioBackOffice { get; set; }//USUARIO DEL BACK
        public string MotivoLiberacion { get; set; }//MOTIVO LIBERACION
    }
}
