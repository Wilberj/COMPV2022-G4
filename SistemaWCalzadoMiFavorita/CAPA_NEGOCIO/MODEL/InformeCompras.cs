using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class InformeCompras
    {

        public string NombreArticulo { get; set; }
        public string NombreUsuario { get; set; }
        public string Nombreproveedor { get; set; }
        public DateTime Fecha { get; set; }
        public Decimal? PrecioCompra { get; set; }
        public int CantidadCompra { get; set; }
        public List<String> Params { get; set; }
        public Object TakeInforme(InformeCompras Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                SqlParams.Add(Convert.ToDateTime(Params[0]));
                SqlParams.Add(Convert.ToDateTime(Params[1]));
                SqlADOConexion.IniciarConexion("sa", "123");
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<InformeCompras>(
                    "usp_informeCompras", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
