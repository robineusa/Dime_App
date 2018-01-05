
using System.Collections.Generic;


namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelNodoArbol
    {
        private Nodo nodo;
        private List<Nodo> nodosHijos;

        public ViewModelNodoArbol()
        {
            nodo = new Nodo();
            nodosHijos = new List<Nodo>();
        }
        public Nodo Nodo
        {
            get
            {
                return nodo;
            }
            set
            {
                nodo = value;
            }

        }
        public List<Nodo> NodosHijos
        {
            get
            { return nodosHijos; }
            set
            {
                nodosHijos = value;
            }
        }
    }
}
