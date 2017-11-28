using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class BAPActualizarDatos
    {
        public decimal Id { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public decimal UsuarioGestion { get; set; }
        public string AliadoGestion { get; set;}
        public string OperacionGestion { get; set; }
        public decimal Telefono { get; set; }
        public decimal CuentaAsociada { get; set; }
        public string Direccion { get; set; }
        public string Ciudad { get; set; }
        public string PropiedadCliente { get; set; }
    }
}
