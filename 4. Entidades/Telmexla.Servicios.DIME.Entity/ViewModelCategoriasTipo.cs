
using Telmexla.Servicios.DIME.Entity;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelCategoriasTipo
    {
        Macroprocesos categorias;
        TiposMacroprocesos tipos;
        List<Macroprocesos> listaCategorias;
        public ViewModelCategoriasTipo()
        {
            categorias = new Macroprocesos();
            tipos = new TiposMacroprocesos();
            listaCategorias = new List<Macroprocesos>();
        }

        public Macroprocesos Categorias
        {

            get
            {
                return categorias;
            }
            set
            {
                categorias = value;
            }
        }

        public TiposMacroprocesos Tipos

        {

            get
            {
                return tipos;
            }
            set
            {
                tipos = value;
            }
        }

       
    }
}
