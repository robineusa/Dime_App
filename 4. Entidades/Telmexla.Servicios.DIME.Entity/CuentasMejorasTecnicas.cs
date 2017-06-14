using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class CuentasMejorasTecnicas
    {
        public decimal Id { get; set; } //Id 
        public decimal Cuenta { get; set; } //Cuenta
        public string Accionable { get; set; } //Accionbable (Length: 300)
    }
}
