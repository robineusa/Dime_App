using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GPMMidas
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public decimal UsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string Gestion { get; set; }
        public string Cierre { get; set; }
        public string Razon { get; set; }
        public string Motivo { get; set; }
        public string FallaServPrincipalesSoporte { get; set; }
        public string FallaServAdicionalesSoporte { get; set; }
        public string TipoFallaSoporte { get; set; }
        public string SolucionEspecificaSoporte { get; set; }
        public string EstadoSoporte { get; set; }
        public System.DateTime? FechaSeguimientoSoporte { get; set; }
        public string ObservacionesSoporte { get; set; }
        public string ProblemaFacturacion { get; set; }
        public string SolucionFacturacion { get; set; }
        public string EstadoFacturacion { get; set; }
        public System.DateTime? FechaSeguimientoFacturacion { get; set; }
        public string ObservacionesFacturacion { get; set; }
        public string ClienteIntencionCancelacion { get; set; }
        public string MotivoCancelacion { get; set; }
        public string RazonCancelacion { get; set; }
        public string ObservacionesCancelacion { get; set; }
        public string Ofrecimiento1 { get; set; }
        public string AceptacionOfrecimiento1 { get; set; }
        public string Ofrecimiento2 { get; set; }
        public string AceptacionOfrecimiento2 { get; set; }
        public string Ofrecimiento3 { get; set; }
        public string AceptacionOfrecimiento3 { get; set; }
        public string Campaña1 { get; set; }
        public string Campaña2 { get; set; }
        public string Campaña3{ get; set; }

    }
}
