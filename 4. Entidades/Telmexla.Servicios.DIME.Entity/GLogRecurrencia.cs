using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GLogRecurrencia
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
        public string Telefono1 { get; set; }
        public string Telefono2 { get; set; }
        public string Telefono3 { get; set; }
        public string TelefonoTelmex { get; set; }
        public string IncluyeClaroVideo { get; set; }
        public string UsoClaroVideo { get; set; }
        public string ClienteNagra { get; set; }
        public string Diferenciador { get; set; }
        public decimal Prioridad { get; set; }
        public decimal VecesGestionado { get; set; }
        public string MarcacionInicialAfectacion { get; set; }
        public string MarcacionReincidenteRecurrencia { get; set; }
        public string ClieComunicaRealizadaGestRecu { get; set; }
        public string PorQue { get; set; }
        public string Contacto { get; set; }
        public string VozClienteCausaRaiz { get; set; }
        public string Solucionado { get; set; }
        public string AreaParticipaSolucion { get; set; }
        public string ClientePresentaNovedades { get; set; }
        public string Proceso { get; set; }
        public string Macroproceso { get; set; }
        public string ServicioAfectado { get; set; }
        public string FallaEspecificaArbolCCAA { get; set; }
        public string FallaCausaRaiz { get; set; }
        public string SolucionEspecifica { get; set; }
        public string Estado { get; set; }
        public string MarcaEquiposFalla { get; set; }
        public string UbicacionModem { get; set; }
        public string DispositivosInalambricosAlrededorModem { get; set; }
        public string CantEquiposConecInternet { get; set; }
        public string TipoDispConectaInternet { get; set; }
        public string UsoBrindaInternet { get; set; }
        public string ActivacionClaroVideoNagra { get; set; }
        public string ServicioOfrecido { get; set; }
        public string AceptacionServicioOfrecido { get; set; }
        public string Observaciones { get; set; }
        public string FechaSesguimiento { get; set; }
        public decimal IdGprincipal { get; set; }

        //public virtual GPrincipalRecurrencia GPrincipalRecurrencia { get; set; }
    }
}
