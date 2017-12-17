﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telmexla.Servicios.DIME.Entity;

namespace Telmexla.Servicios.DIME.Entity
{
    public class ViewModelCierreExperiencia
    {
        #region Entidades
        CELDesconexiones cELDesconexiones;
        CEMArbolesDeGestion cEMArbolesDeGestion;
        CEPAsigDesconexiones cEPAsigDesconexiones;
        CEPDesconexiones cEPDesconexiones;
        #endregion

        #region Constructores
        public ViewModelCierreExperiencia()
        {
            cELDesconexiones = new CELDesconexiones();
            cEMArbolesDeGestion = new CEMArbolesDeGestion();
            cEPAsigDesconexiones = new CEPAsigDesconexiones();
            cEPDesconexiones = new CEPDesconexiones();
        }


        #endregion

        #region Encapsulamientos
        public CELDesconexiones CELDesconexiones
        {
            get
            {
                return cELDesconexiones;
            }

            set
            {
                cELDesconexiones = value;
            }
        }

        public CEMArbolesDeGestion CEMArbolesDeGestion
        {
            get
            {
                return cEMArbolesDeGestion;
            }

            set
            {
                cEMArbolesDeGestion = value;
            }
        }

        public CEPAsigDesconexiones CEPAsigDesconexiones
        {
            get
            {
                return cEPAsigDesconexiones;
            }

            set
            {
                cEPAsigDesconexiones = value;
            }
        }

        public CEPDesconexiones CEPDesconexiones
        {
            get
            {
                return cEPDesconexiones;
            }

            set
            {
                cEPDesconexiones = value;
            }
        }
        #endregion

    }
}
