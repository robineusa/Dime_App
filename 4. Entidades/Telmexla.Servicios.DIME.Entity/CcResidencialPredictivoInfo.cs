
namespace Telmexla.Servicios.DIME.Entity
{
    public class CcResidencialPredictivoInfo
    {
        public int Id { get; set; } // ID (Primary key)
        public double? Cuenta { get; set; } // CUENTA
        public string Nombre { get; set; } // NOMBRE (length: 100)
        public string Direccion { get; set; } // DIRECCION (length: 100)
        public double? NotasDeExperto { get; set; } // NOTAS_DE_EXPERTO
        public string Comunidad { get; set; } // COMUNIDAD (length: 100)
        public string EstadoInicial { get; set; } // ESTADO_INICIAL (length: 100)
        public double? CuentaMatriz { get; set; } // CUENTA_MATRIZ
        public string ProblemaDelEdificio { get; set; } // PROBLEMA_DEL_EDIFICIO (length: 300)
        public string ServicioAfectado { get; set; } // SERVICIO_AFECTADO (length: 100)
        public double? Telefono1 { get; set; } // TELEFONO1
        public double? Telefono2 { get; set; } // TELEFONO2
        public double? Telefono3 { get; set; } // TELEFONO3
        public double? Celular { get; set; } // CELULAR
        public double? Celular2 { get; set; } // CELULAR2
        public string MarcacionBd { get; set; } // Marcacion_BD (length: 100)
        public string MarcacionBdIi { get; set; } // Marcacion_BD_II (length: 100)
        public string LoginId { get; set; } // Login_ID (length: 150)
    }

}
// </auto-generated>
