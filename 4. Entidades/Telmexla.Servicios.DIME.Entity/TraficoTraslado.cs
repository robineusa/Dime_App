
namespace Telmexla.Servicios.DIME.Entity
{
    public class TraficoTraslado
    {
        public decimal Id { get; set; } // ID INCREMENTAL DE LA TABLA
        public decimal? IdTransaccion { get; set; } // ID DE LA TRANSACCION GLOBAL
        public string UsuarioTransaccion { get; set; } //USUARIO QUE GENERA LA TRANSACCION
        public System.DateTime? InicioTransaccion { get; set; } // INICIO DE TRANSACCION
        public System.DateTime? FinTransaccion { get; set; } // FIN TRANSACCION
        public string TipoTransaccion { get; set; } // TIPO TRANSACCION
        public string CanalTransaccion { get; set; } //CANAL DONDE SE GENERA LA TRANSACCION
        public string EstadoTransaccion { get; set; } // ESTADO DE LA TRANSACCION
        
    }
}
