
namespace Telmexla.Servicios.DIME.Entity
{
    public class FidelizacionRecursiva
    {
        public decimal Id { get; set; }
        public string Nombre { get; set; }
        public decimal ParentId { get; set; }
        public string VerNivel { get; set; }
        public decimal Nivel { get; set; }
        public string Label { get; set; }
    }
}
