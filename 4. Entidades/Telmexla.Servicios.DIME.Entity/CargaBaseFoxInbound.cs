
namespace Telmexla.Servicios.DIME.Entity
{
    public class CargaBaseFoxInbound
    {
        public decimal Id { get; set; } //Id 
        public decimal Cuenta { get; set; } //Cuenta
        public System.DateTime? FechaVencimiento { get; set; } //Fecha_Vencimiento Datetime
        public string Ofrecimiento { get; set; } //Ofrecimiento (Length 1000)
        public string FechaVencimiento2 { get; set; }
    }
}
