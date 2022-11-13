using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class InformeDevoluciones
    {
        public int? IdVenta { get; set; }
        public string NombreUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string Descripcion { get; set; }
        public int? Cantidad { get; set; }
        public int? IdArticuloExistencia { get; set; }
        public List<String> Params { get; set; }

        public Object TakeInforme(InformeDevoluciones Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                SqlParams.Add(Convert.ToDateTime(Params[0]));
                SqlParams.Add(Convert.ToDateTime(Params[1]));
                SqlADOConexion.IniciarConexion("sa", "123");
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<InformeDevoluciones>(
                    "usp_informeDevoluciones", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
