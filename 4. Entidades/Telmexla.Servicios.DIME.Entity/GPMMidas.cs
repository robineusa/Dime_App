using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        [Required(ErrorMessage = "Busque un Cliente antes de guardar")]
        public decimal CuentaCliente { get; set; }

        [Required(ErrorMessage = "Seleccione una Opcion")]
        public string GestionR { get; set; }
        public string Gestion { get; set; }

        [Required(ErrorMessage = "Seleccione una Opcion")]
        public string CierreR { get; set; }
        public string Cierre { get; set; }

        [Required(ErrorMessage = "Seleccione una Opcion")]
        public string RazonR { get; set; }
        public string Razon { get; set; }

        [Required(ErrorMessage = "Seleccione una Opcion")]
        public string MotivoR { get; set; }
        public string Motivo { get; set; }
        public string FallaServPrincipalesSoporteR { get; set; }
        public string FallaServPrincipalesSoporte { get; set; }
        public string FallaServAdicionalesSoporteR { get; set; }
        public string FallaServAdicionalesSoporte { get; set; }
        public string TipoFallaSoporteR { get; set; }
        public string TipoFallaSoporte { get; set; }
        public string SolucionEspecificaSoporteR { get; set; }
        public string SolucionEspecificaSoporte { get; set; }
        public string EstadoSoporte { get; set; }
        public string EstadoSoporteR { get; set; }
        public System.DateTime? FechaSeguimientoSoporte { get; set; }
        public string ObservacionesSoporte { get; set; }
        public string ProblemaFacturacionR { get; set; }
        public string ProblemaFacturacion { get; set; }
        public string SolucionFacturacionR { get; set; }
        public string SolucionFacturacion { get; set; }
        public string EstadoFacturacion { get; set; }
        public string EstadoFacturacionR { get; set; }
        public System.DateTime? FechaSeguimientoFacturacion { get; set; }
        public string ObservacionesFacturacion { get; set; }
        public string ClienteIntencionCancelacionR { get; set; }
        public string ClienteIntencionCancelacion { get; set; }
        public string MotivoCancelacionR { get; set; }
        public string MotivoCancelacion { get; set; }
        public string RazonCancelacionR { get; set; }
        public string RazonCancelacion { get; set; }
        public string ObservacionesCancelacion { get; set; }
        public string Ofrecimiento1 { get; set; }
        public string AceptacionOfrecimiento1 { get; set; }
        public string AceptacionOfrecimiento1R { get; set; }
        public string Ofrecimiento2 { get; set; }
        public string AceptacionOfrecimiento2 { get; set; }
        public string Ofrecimiento3 { get; set; }
        public string AceptacionOfrecimiento3 { get; set; }
        public string Campaña1 { get; set; }
        public string Campaña2 { get; set; }
        public string Campaña3{ get; set; }
        public string EstadoCaso { get; set; }

    }
}
