
using System.Collections.Generic;

using System.Web.Mvc;


namespace Telmexla.Servicios.DIME.Entity
{
    public class InboundModel
    {
        #region index
        private ClientesTodo clientesTodos;
        private DatosAdicionalesCliente datosAdcionalesCliente;
        private List<ClientesTodo> cuentasConsultadas;
        private List<SelectListItem> rangoEdadOptions;
        private List<SelectListItem> hobbyOptions;
        private List<SelectListItem> numHijosOptions;
        private List<SelectListItem> nivelEstudiosOptions;
        private List<SelectListItem> rangoEdadOptionsHijos;
        private List<CuentasSiembraHD> listaSiembraHD;
        private List<CuentasSiguienteMejorOferta> listaSMO;
        private List<CuentasMejorasTecnicas> listaMejorasTecnicas;
        private Retencion retencion;
        #endregion index

        #region actualizar
        private List<TablaActualizarInbound> historialCaso;
        private int marcacionEntrada;
        #endregion actualizar

        private ViewModelTipificacionMarcaciones modelTipiMarca;
        private string lineaDeUsuarioActual;
        public InboundModel()
        {
           
            listaSiembraHD = new List<CuentasSiembraHD>();
            listaSMO = new List<CuentasSiguienteMejorOferta>();
            listaMejorasTecnicas = new List<CuentasMejorasTecnicas>();
            DatosAdcionalesCliente = new DatosAdicionalesCliente();
            CuentasConsultadas = new List<ClientesTodo>();
            ClientesTodos = new ClientesTodo();
            retencion = new Retencion();
            ModelTipiMarca = new ViewModelTipificacionMarcaciones();
            string defaultRangoEdad = "Datos adicionales no cargados";
            rangoEdadOptions = new List<SelectListItem>();
            rangoEdadOptions.Add(new SelectListItem { Text = defaultRangoEdad, Value = defaultRangoEdad });
            if (!defaultRangoEdad.Equals("00-05")) rangoEdadOptions.Add(new SelectListItem { Text = "00-05", Value = "00-05" });
            if (!defaultRangoEdad.Equals("06-10")) rangoEdadOptions.Add(new SelectListItem { Text = "06-10", Value = "06-10" });

            for (int i = 11; i < 80; i += 5)
            {
                string valor = i.ToString() + "-" + (i + 4).ToString();
                if (!defaultRangoEdad.Equals(valor))
                    rangoEdadOptions.Add(new SelectListItem { Text = valor, Value = valor });
            }


            string defaultRangoEdadHijos = "Datos adicionales no cargados";
            RangoEdadOptionsHijos = new List<SelectListItem>();
            RangoEdadOptionsHijos.Add(new SelectListItem { Text = defaultRangoEdadHijos, Value = defaultRangoEdadHijos });
            if (!defaultRangoEdadHijos.Equals("00-05")) RangoEdadOptionsHijos.Add(new SelectListItem { Text = "00-05", Value = "00-05" });
            if (!defaultRangoEdadHijos.Equals("06-10")) RangoEdadOptionsHijos.Add(new SelectListItem { Text = "06-10", Value = "06-10" });

            for (int i = 11; i < 80; i += 5)
            {
                string valor = i.ToString() + "-" + (i + 4).ToString();
                if (!defaultRangoEdadHijos.Equals(valor))
                    RangoEdadOptionsHijos.Add(new SelectListItem { Text = valor, Value = valor });
            }


            string numHijosDefault = "Datos adicionales no cargados";
            numHijosOptions = new List<SelectListItem>();
            numHijosOptions.Add(new SelectListItem { Text = numHijosDefault, Value = numHijosDefault });
            for (int i = 0; i <= 10; i++)
            {
                string valor = i.ToString();
                if (!numHijosDefault.Equals(valor))
                    numHijosOptions.Add(new SelectListItem { Text = valor, Value = valor });
            }


            string nivEstudiosDefault = "Datos adicionales no cargados";
         
            nivelEstudiosOptions = new List<SelectListItem>();
            nivelEstudiosOptions.Add(new SelectListItem { Text = nivEstudiosDefault, Value = nivEstudiosDefault });
            if (!nivelEstudiosOptions.Equals("PRIMARIA"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "PRIMARIA", Value = "PRIMARIA" });
            if (!nivelEstudiosOptions.Equals("SECUNDARIA"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "SECUNDARIA", Value = "SECUNDARIA" });
            if (!nivelEstudiosOptions.Equals("BACHILLER"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "BACHILLER", Value = "BACHILLER" });
            if (!nivelEstudiosOptions.Equals("TÉCNICO"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "TÉCNICO", Value = "TÉCNICO" });
            if (!nivelEstudiosOptions.Equals("TECNÓLOGO"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "TECNÓLOGO", Value = "TECNÓLOGO" });
            if (!nivelEstudiosOptions.Equals("PROFESIONAL"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "PROFESIONAL", Value = "PROFESIONAL" });




        }







        public ClientesTodo ClientesTodos
        {
            get
            {
                return clientesTodos;
            }

            set
            {
                clientesTodos = value;
            }
        }

        public DatosAdicionalesCliente DatosAdcionalesCliente
        {
            get
            {
                return datosAdcionalesCliente;
            }

            set
            {
                datosAdcionalesCliente = value;
            }
        }

        public List<ClientesTodo> CuentasConsultadas
        {
            get
            {
                return cuentasConsultadas;
            }

            set
            {
                cuentasConsultadas = value;
            }
        }

        public List<SelectListItem> RangoEdadOptions
        {
            get
            {
                return rangoEdadOptions;
            }

            set
            {
                rangoEdadOptions = value;
            }
        }

        public List<SelectListItem> HobbyOptions
        {
            get
            {
                return hobbyOptions;
            }

            set
            {
                hobbyOptions = value;
            }
        }

        public List<SelectListItem> NumHijosOptions
        {
            get
            {
                return numHijosOptions;
            }

            set
            {
                numHijosOptions = value;
            }
        }

        public List<SelectListItem> NivelEstudiosOptions
        {
            get
            {
                return nivelEstudiosOptions;
            }

            set
            {
                nivelEstudiosOptions = value;
            }
        }

        public List<SelectListItem> RangoEdadOptionsHijos
        {
            get
            {
                return rangoEdadOptionsHijos;
            }

            set
            {
                rangoEdadOptionsHijos = value;
            }
        }

   

        public ViewModelTipificacionMarcaciones ModelTipiMarca
        {
            get
            {
                return modelTipiMarca;
            }

            set
            {
                modelTipiMarca = value;
            }
        }

        public List<TablaActualizarInbound> HistorialCaso
        {
            get
            {
                return historialCaso;
            }

            set
            {
                historialCaso = value;
            }
        }

        public int MarcacionEntrada
        {
            get
            {
                return marcacionEntrada;
            }

            set
            {
                marcacionEntrada = value;
            }
        }

        public string LineaDeUsuarioActual
        {
            get
            {
                return lineaDeUsuarioActual;
            }

            set
            {
                lineaDeUsuarioActual = value;
            }
        }

        public List<CuentasSiembraHD> ListaSiembraHD
        {
            get
            {
                return listaSiembraHD;
            }

            set
            {
                listaSiembraHD = value;
            }
        }

        public List<CuentasSiguienteMejorOferta> ListaSMO
        {
            get
            {
                return listaSMO;
            }

            set
            {
                listaSMO = value;
            }
        }

        public List<CuentasMejorasTecnicas> ListaMejorasTecnicas
        {
            get
            {
                return listaMejorasTecnicas;
            }

            set
            {
                listaMejorasTecnicas = value;
            }
        }

        public Retencion Retencion
        {
            get
            {
                return retencion;
            }

            set
            {
                retencion = value;
            }
        }

        public void iniciarOptionsVista()
        {

            string defaultRangoEdad = DatosAdcionalesCliente.RangoDeEdad ?? "";
            rangoEdadOptions = new List<SelectListItem>();
            rangoEdadOptions.Add(new SelectListItem { Text = defaultRangoEdad, Value = defaultRangoEdad });
            if(!defaultRangoEdad.Equals("00-05")) rangoEdadOptions.Add(new SelectListItem { Text = "00-05", Value = "00-05" });
            if (!defaultRangoEdad.Equals("06-10")) rangoEdadOptions.Add(new SelectListItem { Text = "06-10", Value = "06-10" });

            for (int i = 11; i < 80; i += 5)
            {
                string valor = i.ToString() + "-" + (i + 4).ToString();
                if (!defaultRangoEdad.Equals(valor))
                    rangoEdadOptions.Add(new SelectListItem { Text = valor, Value = valor });
            }


            string defaultRangoEdadHijos = DatosAdcionalesCliente.EdadHijos ?? "";
            RangoEdadOptionsHijos  = new List<SelectListItem>();
            RangoEdadOptionsHijos.Add(new SelectListItem { Text = defaultRangoEdadHijos, Value = defaultRangoEdadHijos });
            if (!defaultRangoEdadHijos.Equals("00-05")) RangoEdadOptionsHijos.Add(new SelectListItem { Text = "00-05", Value = "00-05" });
            if (!defaultRangoEdadHijos.Equals("06-10")) RangoEdadOptionsHijos.Add(new SelectListItem { Text = "06-10", Value = "06-10" });

            for (int i = 11; i < 80; i += 5)
            {
                string valor = i.ToString() + "-" + (i + 4).ToString();
                if (!defaultRangoEdadHijos.Equals(valor))
                    RangoEdadOptionsHijos.Add(new SelectListItem { Text = valor, Value = valor });
            }


            string numHijosDefault = DatosAdcionalesCliente.NumeroHijos ?? " ";
            numHijosOptions = new List<SelectListItem>();
            numHijosOptions.Add(new SelectListItem { Text = numHijosDefault, Value = numHijosDefault });
            for (int i = 0; i <= 10; i++)
            {
                string valor = i.ToString();
                if (!numHijosDefault.Equals(valor))
                    numHijosOptions.Add(new SelectListItem { Text = valor, Value = valor });
            }


            string nivEstudiosDefault = DatosAdcionalesCliente.NivelEstudios ?? "";
       
            nivelEstudiosOptions = new List<SelectListItem>();
            nivelEstudiosOptions.Add(new SelectListItem { Text = nivEstudiosDefault, Value = nivEstudiosDefault });
            if (!nivEstudiosDefault.Equals("PRIMARIA"))
            nivelEstudiosOptions.Add(new SelectListItem { Text = "PRIMARIA", Value = "PRIMARIA" });
            if (!nivEstudiosDefault.Equals("SECUNDARIA"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "SECUNDARIA", Value = "SECUNDARIA" });
            if (!nivEstudiosDefault.Equals("BACHILLER"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "BACHILLER", Value = "BACHILLER" });
            if (!nivEstudiosDefault.Equals("TÉCNICO"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "TÉCNICO", Value = "TÉCNICO" });
            if (!nivEstudiosDefault.Equals("TECNÓLOGO"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "TECNÓLOGO", Value = "TECNÓLOGO" });
            if (!nivEstudiosDefault.Equals("PROFESIONAL"))
                nivelEstudiosOptions.Add(new SelectListItem { Text = "PROFESIONAL", Value = "PROFESIONAL" });





            string  hobbieDefault = DatosAdcionalesCliente.Hobbie ?? "";
            List<SelectListItem>  HobbyOptionsBefore = HobbyOptions;
            HobbyOptions = new List<SelectListItem>();
            HobbyOptions.Add(new SelectListItem { Text = hobbieDefault, Value = hobbieDefault});
            for (int i = 0; i < HobbyOptionsBefore.Count; i++)
            {   string valor = HobbyOptionsBefore[i].Text;
                if (!hobbieDefault.Equals(valor))
                    HobbyOptions.Add(new SelectListItem { Text = valor, Value = valor });
                
            }
        }

    }
}
