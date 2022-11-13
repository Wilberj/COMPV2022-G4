using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class FacturaVenta
    {
        public int? IdVenta { get; set; }
        public DateTime? FechaFactura { get; set; }
        public string NombreCliente { get; set; }
        public Decimal? DescuentoVenta { get; set; }
        public Decimal? SumaRecibida { get; set; }
        public Decimal? SumaCambio { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? TotalVenta { get; set; }

        //public List<String> Params { get; set; }
        public Object TakeInforme(FacturaVenta Inst)
        {
            try
            {
                List<Object> SqlParams = new List<Object>();
                //SqlParams.Add(Convert.ToInt64(Params[0]));
                SqlADOConexion.IniciarConexion("sa", "123");
                var Informe = SqlADOConexion.SQLM.TakeListWithProcedure<FacturaVenta>(
                    "usp_facturaVentaCompleta", Inst, SqlParams);
                return Informe;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
