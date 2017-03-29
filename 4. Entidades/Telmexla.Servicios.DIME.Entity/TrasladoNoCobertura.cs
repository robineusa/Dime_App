using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class TrasladoNoCobertura
    {
        public decimal Id { get; set; } // ID INCREMENTAL DE LA TABLA
        public decimal? IdTransaccion { get; set; } // ID DE LA TRANSACCION GLOBAL
        public string UsuarioTransaccion { get; set; } //USUARIO QUE GENERA LA TRANSACCION
        public string CanalTransaccion { get; set; } //CANAL DONDE SE GENERA LA TRANSACCION
        public System.DateTime? FechaTransaccion { get; set; } // FECHA DE LA TRANSACCION
        public string NombreLineaTransaccion { get; set; } // NOMBRE DE LA LINEA DE LA TRANSACCION
        [Required(ErrorMessage = "El campo Cuenta Cliente no puede ser vacio")]
        public decimal CuentaCliente { get; set; } // CUENTA DEL CLIENTE
        [Required(ErrorMessage = "El campo Direccion no puede ser vacio")]
        public string DireccionTraslado { get; set; } //DIRECCION 
        [Required(ErrorMessage = "El campo Estrato no puede ser vacio")]
        public string Estrato { get; set; }// ESTRATO DEL CLIENTE
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
        
    }
}
