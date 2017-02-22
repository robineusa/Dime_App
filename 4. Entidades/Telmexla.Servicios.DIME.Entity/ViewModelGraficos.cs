using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelGraficos
    {
        private List<Graficos> listaGrafico;
        private List<Graficos> graficoIngresos;
        private List<Graficos> graficoNotasIngreso;


        public ViewModelGraficos()
        {
            listaGrafico = new List<Graficos>();
            graficoIngresos = new List<Graficos>();
            graficoNotasIngreso = new List<Graficos>();
        }

        public List<Graficos> ListaGrafico
        {
            get
            {
                return listaGrafico;
            }

            set
            {
                listaGrafico = value;
            }
        }

        public List<Graficos> GraficoIngresos
        {
            get
            {
                return graficoIngresos;
            }

            set
            {
                graficoIngresos = value;
            }
        }

        public List<Graficos> GraficoNotasIngreso
        {
            get
            {
                return graficoNotasIngreso;
            }

            set
            {
                graficoNotasIngreso = value;
            }
        }
    }
}
