
using System.Collections.Generic;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelProcesos
    {
        private Nodo nodo;
        private List<Nodo> listarnodos;
        public ViewModelProcesos()
        {
            nodo = new Nodo();
            listarnodos = new List<Nodo>();
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

        public List<Nodo> ListarNodos
        {
            get
            {
                return listarnodos;
            }

            set
            {
                listarnodos = value;
            }
        }
    }
}




