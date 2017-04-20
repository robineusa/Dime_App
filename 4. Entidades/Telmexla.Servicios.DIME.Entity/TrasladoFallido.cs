
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class TrasladoFallido
    {
        public decimal Id { get; set; }
        public decimal? IdTransaccion { get; set; }
        public string UsuarioTransaccion { get; set; }
        public string CanalTransaccion { get; set; }
        public System.DateTime? FechaTransaccion { get; set; }
        public string NombreLineaTransaccion { get; set; }
        [Required(ErrorMessage = "Debe seleccionar una opción")]
        public string MotivoTrasladoFallido { get; set; }
        public decimal CuentaCliente { get; set; }
        public decimal CuentaOcupa { get; set; } 
        public decimal CuentaTraslada { get; set; }
        public decimal CuentaMatriz { get; set; }
        public string NombreConjunto { get; set; }
        public string EstadoMatriz { get; set; }
        [Required(ErrorMessage = "El campo Dirección no puede ser vacio")]
        public string Direccion { get; set; }
        public string EstratoOrigen { get; set; }
        public string EstratoDestino { get; set; }
        public string TarifaActual { get; set; }
        public string TarifaNueva { get; set; }
        public string GestionPorTraslado { get; set; }
        public string Nodo { get; set; }
        public string TelefonoCelular { get; set; }
        public string TelefonoFijo { get; set; }
        public string CorreoElectronico { get; set; }
        public string Observacion { get; set; }
        
    }
}
