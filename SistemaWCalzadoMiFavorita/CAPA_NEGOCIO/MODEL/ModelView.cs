using CAPA_DATOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAPA_NEGOCIO.MODEL
{
    public class ViewModuloCompra : EntityClass
    {
        public int? IdCompra { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdProveedor { get; set; }
        public int? CódigoArticulo { get; set; }
        public string NombreArticulo { get; set; }
        public string Nombreproveedor { get; set; }
        public string NombreUsuario { get; set; }
        public DateTime? Fecha { get; set; }
        public int? Cantidad { get; set; }
        public Decimal? TotalCostoDetalle { get; set; }
        public Decimal? TotalCosto { get; set; }
        public Decimal? SubTotal { get; set; }
        public Decimal? IVA { get; set; }
        public Decimal? Descuento { get; set; }
        public int? IdArticulo { get; set; }
        public int? IdDetalleCompra { get; set; }
    }

}
