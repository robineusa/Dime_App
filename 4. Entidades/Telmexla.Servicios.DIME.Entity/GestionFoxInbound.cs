

using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GestionFoxInbound
    {
        public decimal Id { get; set; } //Id 
        public System.DateTime? FechaGestion { get; set; } //Fecha Gestion
        public string UsuarioGestion { get; set; } //Usuario_gestion (Length: 30)
        public string NombreUsuarioGestion { get; set; } //Nombre_Usuario_Gestion (length: 50)
        public string AliadoGestion { get; set; } //Aliado_Gestion (length: 30)
        public decimal CuentaCliente { get; set; } //Cuenta_Cliente
        public string FechaVencimiento { get; set; } //Ofrecimiento (Length: 500)
        public string Ofrecimiento { get; set; } //Ofrecimiento (Length: 500)

        [Required(ErrorMessage = "Seleccione una opción")]
        public string AceptacionFoxInbound { get; set; } //Aceptacion (Length: 2)
    }
}
