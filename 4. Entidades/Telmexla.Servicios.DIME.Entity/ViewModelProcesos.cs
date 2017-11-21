using System.Collections.Generic;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelProcesos
    {
        private Nodo nodo;
        private List<Nodo> listarnodos;
        private List<Nodo> nodoshijos;
        private List<ViewModelProcesos> coleccionvmp;
        private string nombrearbol;
        public ViewModelProcesos()
        {
            nodo = new Nodo();
            listarnodos = new List<Nodo>();
            nodoshijos = new List<Nodo>();
            coleccionvmp = new List<ViewModelProcesos>();
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

        public List<Nodo> NodosHijos
        {
            get
            {
                return nodoshijos;
            }

            set
            {
                nodoshijos = value;
            }
        }

        public List<ViewModelProcesos> ColeccionVmp
        {
            get
            {
                return coleccionvmp;
            }

            set
            {
                coleccionvmp = value;
            }
        }

        public string NombreArbol
        {
            get
            { return nombrearbol; }
            set
            { nombrearbol = value; }
        }

    }
}
