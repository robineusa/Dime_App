using System;
using System.Collections.Generic;
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
        public string Ofrecimiento2 { get; set; }
        public string Ofrecimiento3 { get; set; }
        public string Diferenciador { get; set; }
        public decimal Prioridad { get; set; }
        public decimal VecesGestionado { get; set; }
        public string MacroProcesoRecurrencia1{ get; set; }
        public string MacroProcesoRecurrencia2 { get; set; }
        public string MacroProcesoRecurrencia3 { get; set; }
        public string MarcacionRecurrente1 { get; set; }
        public string MarcacionRecurrente2 { get; set; }
        public string MarcacionRecurrente3 { get; set; }
        public string VolvioLlamar { get; set; }
        public string PorQue { get; set; }
        public string Contacto { get; set; }
        public string VozCliente { get; set; }
        public string ClientePresentaNovedades { get; set; }
        public string Proceso { get; set; }
        public string Macroproceso { get; set; }
        public string ServicioAfectado{ get; set; }
        public string FallaEspecificaArbolCCAA { get; set; }
        public string FallaCausaRaiz { get; set; }
        public string SolucionEspecifica { get; set; }
        public string Solucionado { get; set; }
        public string Estado { get; set; }
        public string ActivacionClaroVideoNagra { get; set; }
        public string AceptacionPrimerOfrecimiento { get; set; }        
        public string AceptacionSegundoOfrecimiento { get; set; }
        public string AceptacionTercerOfrecimiento { get; set; }
        public string Observaciones { get; set; }
        public decimal UsuarioGestionando { get; set; }

    }
}
