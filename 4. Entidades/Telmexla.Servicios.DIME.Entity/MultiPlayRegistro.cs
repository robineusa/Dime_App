
#pragma warning disable 1591    
using System.ComponentModel.DataAnnotations;

namespace Telmexla.Servicios.DIME.Entity
{
    public class MultiPlayRegistro
    {
        public decimal IdSubReg { get; set; }
        public System.DateTime? FechaGestion { get; set; }
        public string UsuarioGestion { get; set; }
        public string NombreUsuarioGestion { get; set;}
        public string AliadoGestion { get; set; }
        public string RegBaGen { get; set; }
        public decimal Cuenta { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal Custcode { get; set; }
        public string TipoCuscode { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal Min { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal CustomerId { get; set; }
        public string NombreCliente { get; set; }
        public decimal Cedula { get; set; }
        public string EstratoCliente { get; set; }
        public string EstadoAC { get; set; }
        public string EstadoRR { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal SaldoActualAC { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal SaldoEquipoAC { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal SaldoEquipoAscard { get; set; }
        public decimal SaldoGrupo1 { get; set; }
        public decimal SaldoGrupo2 { get; set; }
        public decimal SaldoGrupo3 { get; set; }
        public decimal SaldoTotalRR { get; set; }
        public string EscVentaCliente { get; set; }
        public string AplicAjusteRR { get; set; }
        public string CampañaCaida { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValoraAjustarInternet { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValoraAjustarTv { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValoraAjustarTel { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValAjuOtrosConcep { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValTotAjuFijo { get; set; }
        public string PerCamNoApliRR { get; set; }
        public string ObservacionesAjustes { get; set; }
        public string AjusteAC { get; set; }
        public string CamOfComApliCliente { get; set; }
        public string CamAplACDiVenta { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal CfmDatosAntesIva { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal CfmDatosAntesIva4Ipoc { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal CfmVozAntesIva4Ipoc { get; set; }
        public string FechaACTMultAC { get; set; }
        public string TiempoCampañaCFMAAjustar { get; set; }
        public string PagosACNoRefleRR { get; set; }
        public string FechaPago1 { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValorPago1 { get; set; }
        public string PagosRRNoRefleAC { get; set; }
        public string FechaPago2 { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal ValorPago2 { get; set; }
        public string PagoCambiarGrupo { get; set; }
        public string Fecha1 { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal Valor1 { get; set; }
        public string GrupoActual { get; set; }
        public string GrupoDebeQuedar { get; set; }
        public string PagAnuACNoApliACy_0RR { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal Valor2 { get; set; }
        public string FechaIngresoPago { get; set; }
        public string PlataformaRepPagoAnulado { get; set; }
        public string AnularPago { get; set; }
        public string Fecha2 { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Solo Numeros Enteros")]
        //[DataType(DataType.Custom)]
        public decimal Valor3 { get; set; }
        public string Plataforma { get; set; }
        public string ArrPropClieRR { get; set; }
        public string Escenario1 { get; set; }
        public string NotasAdicionales { get; set; }
        public System.DateTime? FechaCargueBase { get; set; }
        public string NombreBase { get; set; }
    }
}
