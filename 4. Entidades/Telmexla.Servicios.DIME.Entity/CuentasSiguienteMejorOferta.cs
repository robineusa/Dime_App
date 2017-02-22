
namespace Telmexla.Servicios.DIME.Entity
{
    public class CuentasSiguienteMejorOferta
    {
        public decimal Id { get; set; } //Id 
        public decimal CuentaCliente { get; set; } //Cuenta Cliente
        public string Ofrecimiento1 { get; set; } //Ofrecimiento (Length: 200)
        public string Ofrecimiento2 { get; set; } //Ofrecimiento (Length: 200)
        public string Ofrecimiento3 { get; set; } //Ofrecimiento (Length: 200)

    }
}
