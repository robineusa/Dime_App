
namespace Telmexla.Servicios.DIME.Entity
{

    // TBL_ACCESOS_X_LINEA
    public class AccesosXLinea
    {
        public int Id { get; set; } // ID (Primary key)
        public int? IdAcceso { get; set; } // ID_ACCESO
        public int? IdLinea { get; set; } // ID_LINEA

        // Foreign keys
        public virtual Acceso Acceso { get; set; } // FK__TBL_ACCES__ID_AC__5BED93EA
        public virtual Linea Linea { get; set; } // FK__TBL_ACCES__ID_LI__5CE1B823
    }

}
