
using System.Collections.Generic;

using System.Web.Mvc;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelNodos
    {
        private MaestroNodo maestroNodo;
        private List<MaestroNodo> listaNodos;


        public MaestroNodo MaestroNodo
        {
            get
            {
                return maestroNodo;
            }

            set
            {
                maestroNodo = value;
            }
        }

        public List<MaestroNodo> ListaNodos
        {
            get
            {
                return listaNodos;
            }

            set
            {
                listaNodos = value;
            }
        }
    }
}
