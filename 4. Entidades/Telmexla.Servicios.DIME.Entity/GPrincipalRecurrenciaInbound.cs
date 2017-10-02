using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GPrincipalRecurrenciaInbound
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public decimal CuentaCliente { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Macroproceso { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ServicioAfectadoR { get; set; }
        public string ServicioAfectado { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ArbolSoporteR { get; set; }
        public string ArbolSoporte { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string FallaCausaRaizR { get; set; }
        public string FallaCausaRaiz { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string SolucionEspecifica { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Estado { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string FallaAtribuibleA { get; set; }
        public string PorQue { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ActivacionClaroVideoNagra { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ServicioOfrecido { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string AceptacionServicioOfrecido { get; set; }
        public string Observaciones { get; set; }
    }
}
