using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GPrincipalRecurrencia
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public decimal CuentaCliente { get; set; }
        public string NombreCliente { get; set; }
        public string ApellidoCliente { get; set; }
        public string Division { get; set; }
        public string Area { get; set; }
        public string Zona { get; set; }
        public decimal Marcaciones { get; set; }
        public System.DateTime? FechaUltimaMarcacion { get; set; }
        public System.DateTime? FechaUltimaGestion { get; set; }
        public  string Telefono1{ get; set; }
        public string Telefono2 { get; set; }
        public string Telefono3 { get; set; }
        public string TelefonoTelmex { get; set; }
        public string IncluyeClaroVideo { get; set; }
        public string UsoClaroVideo { get; set; }
        public string ClienteNagra { get; set; }
        public string Ofrecimiento1 { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string AceptacionPrimerOfrecimiento { get; set; }
        public string Ofrecimiento2 { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string AceptacionSegundoOfrecimiento { get; set; }
        public string Ofrecimiento3 { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string AceptacionTercerOfrecimiento { get; set; }
        public string Diferenciador { get; set; }
        public decimal Prioridad { get; set; }
        public decimal VecesGestionado { get; set; }
        public string MarcacionInicialAfectacion { get; set; }
        public string MarcacionReincidenteRecurrencia { get; set; }
        public string ClieComunicaRealizadaGestRecu { get; set; }
        public string PorQue { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Contacto { get; set; }
        public string VozClienteCausaRaiz { get; set; }
        public string Solucionado { get; set; }
        public string AreaParticipaSolucion { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ClientePresentaNovedades { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Proceso { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Macroproceso { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ServicioAfectado{ get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ServicioAfectadoR { get; set; }
        public string FallaEspecificaArbolCCAA { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string FallaEspecificaArbolCCAAR { get; set; }
        public string FallaCausaRaiz { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string FallaCausaRaizR { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string SolucionEspecifica { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string Estado { get; set; }
        public string MarcaEquiposFalla { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string UbicacionModem { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string DispositivosInalambricosAlrededorModem { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string CantEquiposConecInternet { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string TipoDispConectaInternet { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string UsoBrindaInternet { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ActivacionClaroVideoNagra { get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string ServicioOfrecido{ get; set; }

        [Required(ErrorMessage = "Seleccione una opción")]
        public string AceptacionServicioOfrecido { get; set; }
        public string Observaciones { get; set; }
        public decimal UsuarioGestionando { get; set; }

    }
}
