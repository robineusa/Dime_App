
namespace Telmexla.Servicios.DIME.Entity
{
    public class MecMonitoreosP
    {
        public decimal IdMonitoreo { get; set; } 
        public System.DateTime? FechaGestion { get; set; } 
        public string UsuarioGestion { get; set; }
        public decimal CedulaUsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public int IdProceso { get; set; }
        public string NombreProceso { get; set; }
        public int IdLinea { get; set; }
        public string NombreLinea { get; set; }
        public decimal UsuarioMonitoreado { get; set; }
        public string NombreUsuarioMonitoreado { get; set; }
        public string OperacionUsuarioMonitoreado { get; set; }
        public string AliadoUsuarioMonitoreado { get; set; }
        public decimal CuentaCliente { get; set; }
        public string Division { get; set; }
        public string Area { get; set; }
        public string Zona { get; set; }
        public string Comunidad { get; set; }
        public string TipoCliente { get; set; }
        public string DescripcionTipoCliente { get; set; }
        public string MarcacionRegistradaRR { get; set; }
        public string MarcacionCorrectaRR { get; set; }
        public string CampoOpcional1 { get; set; }
        public string CampoOpcional2 { get; set; }
        public string CampoOpcional3 { get; set; }
        public string CampoOpcional4 { get; set; }
        public string CampoOpcional5 { get; set; }
        public decimal NotaObtenida { get; set; }
        public string TipoDeAlarma { get; set; }
        public string RegistroMonitoreo { get; set; }
        public string MotivoAlarma { get; set; }
        public string AnalisisDeGestion { get; set; }
        public string AccionEmprender { get; set; }
        public string EtiquetaDeLlamada { get; set; }
        public int IdListaDistribucion { get; set; }
        public string EstadoMonitoreo { get; set; }
    }
}
