
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GestionMatriz
    {
        public decimal Id { get; set; } // ID INCREMENTAL DE LA TABLA
        public decimal? IdTransaccion { get; set; } // ID DE LA TRANSACCION GLOBAL
        public string UsuarioTransaccion { get; set; } //USUARIO QUE GENERA LA TRANSACCION
        public string CanalTransaccion { get; set; } //CANAL DONDE SE GENERA LA TRANSACCION
        public System.DateTime? FechaTransaccion { get; set; } // FECHA DE LA TRANSACCION
        public string NombreLineaTransaccion { get; set; } // NOMBRE DE LA LINEA DE LA TRANSACCION
        public string TipoGestionMatriz { get; set; } //TIPO GESTION MATRIZ
        [StringLength(5, ErrorMessage = "Este campo no debe ser superior a 5 caracteres.")]
        public string TipoCliente { get; set; } //TIPO CLIENTE
        public decimal CuentaCliente { get; set; } // CUENTA DEL CLIENTE
        public decimal CuentaMatriz { get; set; } // CUENTA MATRIZ
        public decimal OrdenTrabajo { get; set; } // ORDEN DE TRABAJO
        public string Direccion { get; set; } //DIRECCION A CREAR
        public string Nodo { get; set; } // NODO
        [StringLength(100, ErrorMessage = "Este campo no debe ser superior a 100 caracteres.")]
        public string NombreConjuntoEdificio { get; set; } // NOMBRE CONJUNTO O EDIFICIO
        [StringLength(20, ErrorMessage = "Este campo no debe ser superior a 20 caracteres.")]
        public string TelefonoCLiente { get; set; } // TELEFONO DEL CLIENTE
        [StringLength(20, ErrorMessage = "Este campo no debe ser superior a 20 caracteres.")]
        public string TelefonoAdministrador { get; set; }// TELEFONO DEL ADMINMISTRADOR
        [StringLength(100, ErrorMessage = "Este campo no debe ser superior a 100 caracteres.")]
        public string NombreAdministrador { get; set; }// TELEFONO FIJO DEL CLIENTE
        public string Razon { get; set; }// RAZON
       
        public string Subrazon { get; set; }//SUBRAZON
        public string Observacion { get; set; }// OBSERVACION REALIZADA
       
        public string EstadoTransaccion { get; set; } // ESTADO DE LA TRANSACCION
        public string UsuarioBackOfficeCreacion { get; set; }//USUARIO DEL BACK DE CREACION
        public string UsuarioBackOfficeGestion { get; set; }//USUARIO DEL BACK DE GESTION
    }
}
