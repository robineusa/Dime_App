using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class GBLRentabilizacion
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string AliadoGestion { get; set; }
        public string OperacionGestion {get;set;}
        public decimal CuentaCliente { get; set; }
        public string ConsumosPpv { get; set; }
        public string UltimaPpv { get; set; }
        public string SiembraHd { get; set; }
        public string SiembraVoz { get; set; }
        public string BlindajeInternet { get; set; }
        public string UltimaMarcacion { get; set; }
        public string OfrecimientoAceptado { get; set; }
        public string TipoContacto { get; set; }
        public string Gestion { get; set; }
        public string Cierre { get; set; }
        public string Causa { get; set; }
        public string Motivo { get; set; }
        public string Observaciones { get; set; }
        public System.DateTime? FechaSeguimiento { get; set; }

    }
}
