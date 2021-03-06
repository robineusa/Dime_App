﻿
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BEPSolicitudes
    {
        public decimal IdSolicitud { get; set; }
        [Required(ErrorMessage = "Ingrese Información")]
        public decimal? CuentaCliente { get; set; }
        [Required(ErrorMessage = "Ingrese Información")]
        public decimal? LlsOt { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoDeSolicitud { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string DetalleDeSolicitud { get; set; }
        public System.DateTime? FechaDeSolicitud { get; set; }
        public string UsuarioQueSolicita { get; set; }
        public string NombreUsuarioQueSolicita { get; set; }
        public string AliadoQueSolicita { get; set; }
        public string OperacionQueSolicita { get; set; }
        public System.DateTime? FechaUltimaActualizacion { get; set; }
        public string UsuarioUltimaActualizacion { get; set; }
        public string NombreUsuarioUltimaActualizacion { get; set; }
        public System.DateTime? FechaDeFinalizacion { get; set; }
        public string UsuarioQueFinaliza { get; set; }
        public string NombreUsuarioQueFinaliza { get; set; }
        [Required(ErrorMessage = "Ingrese Información")]
        public string Nodo { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Malescalado { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string DetalleMalEscalado { get; set; }
        [Required(ErrorMessage = "Seleccione una opción")]
        public string Gestion { get; set; }
        public string EstadoEscalamiento { get; set; }
        public System.DateTime? FechaDeAgenda { get; set; }
        [Required(ErrorMessage = "Ingrese Información")]
        public string Observaciones { get; set; }
        public decimal UsuarioGestionando { get; set; }
    }
}
