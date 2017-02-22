
namespace Telmexla.Servicios.DIME.Entity
{
    public class BalanceScoreCard
    {
        public decimal Cedula { get; set; }
        public string Nombre { get; set; }
        public string Aliado { get; set; }
        public string Canal { get; set; }
        public string Operacion { get; set; }
        public string Grupo { get; set; }
        public string Cargo { get; set; }
        public string Segmento { get; set; }
        public string Supervisor { get; set; }
        public decimal Acdcalls { get; set; }
        public decimal Tmo { get; set; }
        public decimal Espera { get; set; }
        public decimal Marcacion { get; set; }
        public decimal AjustesCorrectos { get; set; }
        public double PqrsCorrectos { get; set; }
        public decimal MetaVentas { get; set; }
        public decimal ReincidenciaAsesor { get; set; }
        public decimal NpsSolucion { get; set; }
        public decimal NpsSatisfaccion { get; set; }
        public decimal CalificacionMec { get; set; }
        public decimal ActivacionesClaroVideo { get; set; }
        public decimal ActivacionesConvenioFactura { get; set; }
        public decimal CalificacionTmo { get; set; }
        public decimal? PuntajeTotal { get; set; }
        public System.DateTime? Fecha { get; set; }
        public decimal Periodo { get; set; }

    }
}
