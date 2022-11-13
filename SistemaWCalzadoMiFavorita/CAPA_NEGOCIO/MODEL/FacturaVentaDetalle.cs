using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class FacturaVentaDetalle
    {
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public int? IdArticuloExistencia { get; set; }
        public Decimal? PrecioVenta { get; set; }
        public Decimal? DescuentoDetalleVenta { get; set; }
        public Decimal? TotalCostoVenta { get; set; }
        public int? CantidadVenta { get; set; }
        //public List<String> Params { get; set; }
        public Object TakeInforme(FacturaVentaDetalle Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                //SqlParams.Add(Convert.ToInt64(Params[0]));
                SqlADOConexion.IniciarConexion("sa", "123");
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<FacturaVentaDetalle>(
                    "usp_facturaVentaCompletaDetalle", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
