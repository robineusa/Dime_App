using System;

namespace Telmexla.Servicios.DIME.Entity
{
    public class Nodo
    {
        public int Id { get; set; }
        public int IdPadre { get; set; }
        public int IdArbol { get; set; }
        public string NombreNodo { get; set; }
        public string CodigoHtml { get; set; }
        public DateTime  FechaCreacion { get; set; }

        public bool EsNodoFinal { get; set; }
    
    }
}
